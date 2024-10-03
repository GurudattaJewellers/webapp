const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

const goldAndSilverPrices = {
    gold: 1800,  // Example gold price in USD
    silver: 24   // Example silver price in USD
};

// Route to get prices
app.get('/api/prices', (req, res) => {
    res.json(goldAndSilverPrices); // Send the data as JSON
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
