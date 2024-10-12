const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');
const cron = require('node-cron');
const path = require('path'); // Import path
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;


// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://gjadmin:9030383020@prices.rnyaba9.mongodb.net/prices_history', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

// Handle MongoDB connection events
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Helper function to get date range
const getLastWeekDates = () => {
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    return { start: lastWeek, end: today };
  };

// Define Mongoose models for your collections
const GoldPrices = mongoose.model('GoldPrices', new mongoose.Schema({}, { strict: false }), 'gold_prices');
const SilverPrices = mongoose.model('SilverPrices', new mongoose.Schema({}, { strict: false }), 'silver_prices');
const collectionName = 'gold_prices';

const pushDatatoDB = async (gold_usa, silver_usa, goldRate, silverRate, dateTime, rate) => {
  try {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    const goldPrice = parseFloat(gold_usa.replace('$', '')) / 31.1034768 * rate;
    const goldAfterImportDuty = goldPrice * 1.06;
    const goldConsumerPriceGst = goldAfterImportDuty * 1.03;

    const silverPrice = parseFloat(silver_usa.replace('$', '')) / 31.1034768 * rate;
    const silverAfterImportDuty = silverPrice * 1.06;
    const silverConsumerPriceGst = silverAfterImportDuty * 1.03;

    const goldUpdate = await GoldPrices.findOneAndUpdate(
      { Date: todayDate },
      {
        $set: {
          Date: todayDate,
          GoldPrice_Gm: parseFloat(goldPrice.toFixed(2)),  // Convert only at the final step
          AfterImportDuty: parseFloat(goldAfterImportDuty.toFixed(2)),
          ConsumerPrice_gst: parseFloat(goldConsumerPriceGst.toFixed(2)),
          Gold916_gst: parseFloat(goldRate * 1.03),  // Ensure this is a number
          GoldPrice_Oz: parseFloat((parseFloat(gold_usa.replace('$', '')) * rate)).toFixed(2),
        }
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const silverUpdate = await SilverPrices.findOneAndUpdate(
      { Date: todayDate },
      {
        $set: {
          Date: todayDate,
          SilverPrice_Gm: parseFloat(silverRate.toFixed(2)),
          AfterImportDuty: parseFloat(silverAfterImportDuty.toFixed(2)),
          ConsumerPrice_gst: parseFloat(silverConsumerPriceGst.toFixed(2)),
          SilverPrice_Oz: parseFloat(silver_usa.replace('$', '')) // Ensure this is a number
        }
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    //console.log('Gold update result:', goldUpdate);
    //console.log('Silver update result:', silverUpdate);

    return { goldUpdate, silverUpdate };
  } catch (error) {
    console.error('Error updating database:', error);
    throw error;
  }
};

      
// Define a new route for a different endpoint
app.get('/silver', async (req, res) => {
    try {
     //const silverPricesData = await SilverPrices.find().sort({ Date: -1 });
      const firstPrice = await SilverPrices.findOne().sort({ Date: -1 }); // Get the latest document
        if (firstPrice) {
            res.json(firstPrice); // Return the first document as JSON
        } else {
            res.status(404).json({ message: 'No data found' });
        }

    } catch (error) {
      console.error('Error rendering silver prices HTML page:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/prices', async (req, res) => {
    try {
      const response = await axios.get('http://kjpl.in/').catch(error => {
        console.error('Error fetching data from the website:', error);
        throw error; // Re-throw to be caught in the outer catch block
      });
  
      const $ = cheerio.load(response.data);
      let goldRate, silverRate, goldPrice, silverPrice, dateTime, silver_pure, gold_pure, gold_usa, silver_usa, rate;
  
      try {
        const response2 = await axios.get('http://www.kjpl.in/index.php/C_booking/get_commodity_data');
  
        // Extract the data from the response
        const commodityDetails = response2.data.commoditydetails;
  
        if (commodityDetails && Array.isArray(commodityDetails) && commodityDetails.length >= 7) {
          // Extract sell_rate from 6th index (index 5)
          const sellRate6thIndex = parseFloat(commodityDetails[6].sell_rate);
          
          // Extract sell_rate from 1st index (index 0)
          const sellRate1stIndex = parseFloat(commodityDetails[1].sell_rate);
  
          // Calculate adjusted rates
          silver_pure = parseFloat((sellRate6thIndex * 1.01) / 1000).toFixed(2); // Add 1% and divide by 1000
          gold_pure = parseFloat((sellRate1stIndex * 1.001) / 10).toFixed(2); // Add 0.1%
        } else {
          console.error('Commodity details array is not in the expected format or length');
        }
      } catch (error) {
        console.error('Error fetching commodity data:', error.message);
        return res.status(500).json({ error: 'Failed to fetch commodity data' });
      }
  
      // Extract gold and silver rates
      goldRate = parseFloat($('span.gold-rate').text());
      silverRate = parseFloat($('span.silver-rate').text());
  
      // Find the table with the header "MJDTA RATE (With GST)"
      const table = $('table.chennairate_table').filter((i, el) => {
        return $(el).find('th.chennairate_head strong').text().trim() === 'MJDTA RATE (With GST)';
      });
  
      // If the table is found, extract the data
      if (table.length > 0) {
        table.find('tbody tr').each((index, element) => {
          const label = $(element).find('td').first().text().trim();
          const value = $(element).find('td').last().text().trim();
  
          if (label === 'GOLD:') {
            goldPrice = value.replace('(₹)', '').trim();
          } else if (label === 'SILVER:') {
            silverPrice = value.replace('(₹)', '').trim();
          } else if (label === 'UPDATED:') {
            dateTime = value;
          }
        });
      } else {
        console.error('Table "MJDTA RATE (With GST)" not found');
      }
  
      // Primary API (Free Currency API)
      const PRIMARY_API_URL = 'https://api.freecurrencyapi.com/v1/latest';
      const PRIMARY_API_KEY = 'fca_live_BCxjNm6l18TDWCF2K4jwOGXm9YVCk1k07ThajxcM';
  
      // Backup API (Currency Freaks)
      const BACKUP_API_URL = 'https://api.currencyfreaks.com/latest';
      const BACKUP_API_KEY = '4419bb9ef12142cfb97e67e755cab4be';
  
      try {
        // Try the primary API first
        const primaryResponse = await axios.get(PRIMARY_API_URL, {
          params: {
            apikey: PRIMARY_API_KEY,
            base_currency: 'USD',
            currencies: 'INR'
          }
        });
        
        rate = primaryResponse.data.data.INR;
        gold_usa = '$' + parseFloat(((gold_pure) * 0.92 * 31.1034768) / rate).toFixed(2);
        silver_usa = '$' + parseFloat(((silver_pure) * 0.92 * 31.1034768) / rate).toFixed(2);
      
      } catch (primaryError) {
        console.error('Error fetching from primary API:', primaryError.message);
      
        try {
          // If primary API fails, try the backup API
          const backupResponse = await axios.get(BACKUP_API_URL, {
            params: {
              apikey: BACKUP_API_KEY,
              symbols: 'INR'
            }
          });
      
          const backupRate = backupResponse.data.rates.INR;
          res.json({ rate: backupRate, source: 'Currency Freaks API' });
      
        } catch (backupError) {
          console.error('Error fetching from backup API:', backupError.message);
          return res.status(500).json({ error: 'Failed to fetch exchange rate from both APIs' });
        }
      }
  
      rate = parseFloat(rate).toFixed(2);
      const updateResult = await pushDatatoDB(gold_usa, silver_usa, goldRate, silverRate, dateTime, rate);
  
      // Prepare the data object
      const data = {
        rate,
        gold_usa,
        silver_usa,
        gold_pure,
        silver_pure,
        goldRate,
        silverRate,
        goldPrice,
        silverPrice,
        dateTime,
        updateResult // Include the update result in the response
      };
  
      // Send the response in JSON format
      res.json(data);
    
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  // Define another route for a different endpoint
  app.get('/gold', async (req, res) => {
    try {

      //const goldPricesData = await GoldPrices.find().sort({ Date: -1 });
      const firstPrice = await GoldPrices.findOne().sort({ Date: -1 }); // Get the latest document
        if (firstPrice) {
            res.json(firstPrice); // Return the first document as JSON
        } else {
            res.status(404).json({ message: 'No data found' });
        }
    } catch (error) {
      console.error('Error rendering gold prices HTML page:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Existing code...

// Define another route for getting gold prices in JSON format
app.get('/api/gold-prices', async (req, res) => {
    try {
      const goldPricesData = await GoldPrices.find().sort({ Date: -1 });
      res.json(goldPricesData); // Send data as JSON
    } catch (error) {
      console.error('Error fetching gold prices:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Define another route for getting silver prices in JSON format
  app.get('/api/silver-prices', async (req, res) => {
    try {
      const silverPricesData = await SilverPrices.find().sort({ Date: -1 });
      res.json(silverPricesData); // Send data as JSON
    } catch (error) {
      console.error('Error fetching silver prices:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Existing code...

  // Route to get default one-week gold prices
  app.get('/api/gold-prices/default', async (req, res) => {
    try {
      const { start, end } = getLastWeekDates();
      const goldPricesData = await GoldPrices.find({
        Date: { $gte: start, $lt: end }
      }).sort({ Date: -1 });
      res.json(goldPricesData); // Send one-week history as JSON
    } catch (error) {
      console.error('Error fetching default gold prices:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/api/gold-prices/all', async (req, res) => {
    try {
      // Your existing code to fetch and return data
      const goldPricesData = await GoldPrices.find({}).sort({ Date: -1 });
      res.json(goldPricesData);
    } catch (error) {
      console.error('Error fetching gold prices:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/api/silver-prices/all', async (req, res) => {
    try {
      // Your existing code to fetch and return data
      const silverPricesData = await SilverPrices.find({}).sort({ Date: -1 });
      res.json(silverPricesData);
    } catch (error) {
      console.error('Error fetching gold prices:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Route to get default one-week silver prices
  app.get('/api/silver-prices/default', async (req, res) => {
    try {
      const { start, end } = getLastWeekDates();
      const silverPricesData = await SilverPrices.find({
        Date: { $gte: start, $lt: end }
      }).sort({ Date: -1 });
      res.json(silverPricesData); // Send one-week history as JSON
    } catch (error) {
      console.error('Error fetching default silver prices:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.post('/api/gold-prices/by-dates', async (req, res) => {
    try {
      const { dates } = req.body; // Array of dates from the frontend
      const dateRanges = dates.map(date => {
        const startDate = new Date(date + 'T00:00:00.000+00:00');
        const endDate = new Date(date + 'T23:59:59.999+00:00');
        return { Date: { $gte: startDate, $lt: endDate } };
      });
      const goldPricesData = await GoldPrices.find({
        $or: dateRanges // Query the database by multiple date ranges
      }).sort({ Date: -1 });
      res.json(goldPricesData); // Send filtered data as JSON
    } catch (error) {
      console.error('Error fetching gold prices by dates:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  // Route to get silver prices by selected dates

  app.post('/api/silver-prices/by-dates', async (req, res) => {
    try {
      const { dates } = req.body; // Array of dates from the frontend
      const dateRanges = dates.map(date => {
        const startDate = new Date(date + 'T00:00:00.000+00:00');
        const endDate = new Date(date + 'T23:59:59.999+00:00');
        return { Date: { $gte: startDate, $lt: endDate } };
      });
      const silverPricesData = await SilverPrices.find({
        $or: dateRanges // Query the database by multiple date ranges
      }).sort({ Date: -1 });
      res.json(silverPricesData); // Send filtered data as JSON
    } catch (error) {
      console.error('Error fetching gold prices by dates:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  // ...
  
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});