const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');
const cron = require('node-cron');
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

// Helper function to get date range
const getLastWeekDates = () => {
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    return { start: lastWeek, end: today };
  };

// Define Mongoose models for your collections
const GoldPrices = mongoose.model('GoldPrices', new mongoose.Schema({}), 'gold_prices');
const SilverPrices = mongoose.model('SilverPrices', new mongoose.Schema({}), 'silver_prices');
const collectionName = 'gold_prices';

const scrapeData = async () => {
    try {
      // Fetch data from YCharts (update URL)
      const response = await axios.get('http://kjpl.in/').catch(error => {
        console.error('Error fetching data from the website:', error);
      });

      const $ = cheerio.load(response.data);
      // Extract data using XPath (replace with your XPath)
      const goldRate = parseFloat($('span.gold-rate').text()); // Assuming the text contains a numeric value
      const silverRate = parseFloat($('span.silver-rate').text());
      // Get today's date
      const todayDate = new Date().setHours(0, 0, 0, 0);
      const formattedDate = new Date(todayDate);

      console.log('Formatted Date:', formattedDate);

  
      const gst = parseFloat(goldRate + (goldRate * 0.0916)).toFixed(2);
      const Aid = parseFloat(gst - (goldRate * 0.03)).toFixed(2);
      const Gpgm = parseFloat(Aid * 0.8888).toFixed(2);
      const Gpoz = parseFloat(Gpgm * 31.1034768).toFixed(2);

  
      await db.collection('gold_prices').updateOne(
        { Date: formattedDate },
        {
          $set: {
            GoldPrice_Gm: parseFloat(Gpgm),
            AfterImportDuty: parseFloat(Aid),
            ConsumerPrice_gst: parseFloat(gst),
            Gold916_gst: goldRate, 
            GoldPrice_Oz: parseFloat(Gpoz),
          }
        },
        { upsert: true }
      );
  
      console.log('Data scraped');
    } catch (error) {
      console.error('Error scraping data:', error);
    }
  };
  
// ...
app.get('/', async (req, res) => {
    try {
      // Render an HTML page with the silver prices data
      const htmlPage = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Home Page</title>
        </head>
        <body><h1>Home Page</h1></body>
        </html>
      `;
  
      res.send(htmlPage);
    } catch (error) {
      console.error('Error rendering Home HTML page:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  const scrapeData_silver = async() => {
    try{
        
      const response = await axios.get('http://www.kjpl.in/index.php/C_booking/get_commodity_data');
  
      // Extract the data from the response
      const commodityDetails = response.data.commoditydetails;
      if (commodityDetails && Array.isArray(commodityDetails) && commodityDetails.length > 0) {
        // Extracting com_name and sell_rate from the first element
        //const { com_name, sell_rate } = commodityDetails[0];
        const { sell_rate } = commodityDetails[6]
        const todayDate = new Date().setHours(0, 0, 0, 0);
        const formattedDate = new Date(todayDate);
        
        await db.collection('silver_prices').updateOne(
            { Date: formattedDate },
            {
              $set: {
                SilverPrice_Gm: parseFloat((sell_rate/1000) * 0.8888).toFixed(2),
                AfterImportDuty: parseFloat(sell_rate/1000).toFixed(2),
                ConsumerPrice_gst: parseFloat(sell_rate/1000 + (sell_rate/1000 * 0.03)).toFixed(2),
                SilverPrice_Oz: '$'+ parseFloat(((sell_rate/1000) * 0.8888 * 31.1034768)/83).toFixed(2)
              }
            },
            { upsert: true }
          );}
        } catch (error) {
          console.error('Error scraping data:', error);
        }
      };

// Define a new route for a different endpoint
app.get('/silver', async (req, res) => {
    try {
    
      // Fetch data from silver_prices collection
      await scrapeData_silver();
     //const silverPricesData = await SilverPrices.find().sort({ Date: -1 });
      const firstPrice = await SilverPrices.findOne().sort({ Date: -1 }); // Get the latest document
        if (firstPrice) {
            res.json(firstPrice); // Return the first document as JSON
        } else {
            res.status(404).json({ message: 'No data found' });
        }
  
      // Render an HTML page with the silver prices data
    //   const htmlPage = `
    //     <!DOCTYPE html>
    //     <html lang="en">
    //     <head>
    //       <meta charset="UTF-8">
    //       <meta http-equiv="X-UA-Compatible" content="IE=edge">
    //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //       <title>Silver Prices</title>
    //     </head>
    //     <body>
    //       <h1>Silver Prices</h1>
    //       <pre>${JSON.stringify(silverPricesData, null, 2)}</pre>
    //     </body>
    //     </html>
    //   `;
  
      //res.json(silverPricesData);
    } catch (error) {
      console.error('Error rendering silver prices HTML page:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Define another route for a different endpoint
  app.get('/gold', async (req, res) => {
    try {
      // Fetch data from gold_prices collection
      await scrapeData();
      //const goldPricesData = await GoldPrices.find().sort({ Date: -1 });
      const firstPrice = await GoldPrices.findOne().sort({ Date: -1 }); // Get the latest document
        if (firstPrice) {
            res.json(firstPrice); // Return the first document as JSON
        } else {
            res.status(404).json({ message: 'No data found' });
        }
  
      // Render an HTML page with the gold prices data
    //   const htmlPage = `
    //     <!DOCTYPE html>
    //     <html lang="en">
    //     <head>
    //       <meta charset="UTF-8">
    //       <meta http-equiv="X-UA-Compatible" content="IE=edge">
    //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //       <title>Gold Prices</title>
    //     </head>
    //     <body>
    //       <h1>Gold Prices</h1>
    //       <pre>${JSON.stringify(goldPricesData, null, 2)}</pre>
    //     </body>
    //     </html>
    //   `;
  
      //res.json(goldPricesData);
    } catch (error) {
      console.error('Error rendering gold prices HTML page:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Existing code...

// Define another route for getting gold prices in JSON format
app.get('/api/gold-prices', async (req, res) => {
    try {
      await scrapeData(); // This will scrape new data
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
      await scrapeData_silver(); // This will scrape new data
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
      console.log(dates)
      const dateRanges = dates.map(date => {
        const startDate = new Date(date + 'T00:00:00.000+00:00');
        const endDate = new Date(date + 'T23:59:59.999+00:00');
        return { Date: { $gte: startDate, $lt: endDate } };
      });
      const goldPricesData = await GoldPrices.find({
        $or: dateRanges // Query the database by multiple date ranges
      }).sort({ Date: -1 });
      console.log(goldPricesData)
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
      console.log(dates)
      const silverPricesData = await SilverPrices.find({
        Date: { $in: dates.map(date => new Date(date)) } // Convert date strings to Date objects
      }).sort({ Date: -1 });
      console.log(silverPricesData)
      res.json(silverPricesData); // Send filtered data as JSON
    } catch (error) {
      console.error('Error fetching silver prices by dates:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // ...
  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});