const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (update connection string)
mongoose.connect('mongodb+srv://gjadmin:9030383020@prices.rnyaba9.mongodb.net/prices_history', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Specify the existing collection name (gold_prices) in the updateOne query
const collectionName = 'gold_prices';

// Scraper function
const scrapeData = async () => {
  try {
    // Fetch data from YCharts (update URL)
    const response = await axios.get('http://kjpl.in/').catch(error => {
      console.error('Error fetching data from the website:', error);
    }); // Replace with the actual URL
    const $ = cheerio.load(response.data);

    // Extract data using XPath (replace with your XPath)
    const goldRate = parseFloat($('span.gold-rate').text()); // Assuming the text contains a numeric value

    // Get today's date
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0); // Set time to midnight for accurate date comparison

    // Update existing record in the specified collection (gold_prices)
    await db.collection(collectionName).updateOne(
      { Date: todayDate },
      {
        $set: {
          GoldPrice_Gm: goldRate, // Update with the appropriate field names
          AfterImportDuty: 0,
          ConsumerPrice_gst: 0,
          Gold916_gst: 0,
          GoldPrice_Oz: 0,
        }
      },
      { upsert: true }
    );

    console.log('Data scraped and saved to MongoDB');
  } catch (error) {
    console.error('Error scraping data:', error);
  }
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
