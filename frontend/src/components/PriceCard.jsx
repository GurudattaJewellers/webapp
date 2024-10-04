import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/colors/purple.css';

const PriceCard = () => {
  const [livePrices, setLivePrices] = useState({ gold: 0, silver: 0 });
  const [historyPrices, setHistoryPrices] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(selectedDates);

  // Fetch live prices
  const fetchLivePrices = async () => {
    try {
      const goldPrice = await axios.get('http://localhost:5000/gold');
      const silverPrice = await axios.get('http://localhost:5000/silver');
      setLivePrices({ gold: goldPrice.data.GoldPrice_Gm, silver: silverPrice.data.SilverPrice_Gm });
    } catch (error) {
      console.error("Error fetching live prices:", error);
    }
  };

  // Fetch history prices for one week by default
  const fetchDefaultHistoryPrices = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/gold-prices/default');
      setHistoryPrices(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching default history prices:", error);
      setLoading(false);
    }
  };

  // Fetch history prices based on selected dates
  const fetchHistoryPricesByDates = async (dates) => {
    try {
        console.log(dates);
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/gold-prices/by-dates', { dates });
      setHistoryPrices(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching history prices by dates:", error);
      setLoading(false);
    }
  };
  // Handle date selection
  const handleDateChange = (dates) => {
    setSelectedDates(dates);
    const formattedDates = Array.isArray(dates)
      ? dates.map((date) => date.value)
      : [dates.value];
    fetchHistoryPricesByDates(formattedDates);
  };

  // Handle submit
  const handleSubmit = () => {
    fetchHistoryPricesByDates(selectedDates);
  };

  // Handle refresh to fetch default one-week prices
  const handleRefresh = () => {
    setSelectedDates([]);
    fetchDefaultHistoryPrices();
  };

  useEffect(() => {
    fetchLivePrices();
    fetchDefaultHistoryPrices(); // Fetch default one week prices on load
  }, []);

  return (
    <div className="price-card">
      <div className="live-prices">
        <h2>Live Prices</h2>
        <p>Gold: {livePrices.gold}</p>
        <p>Silver: {livePrices.silver}</p>
      </div>

      <div className="history-prices">
        <h2>History Prices</h2>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <DatePicker
            multiple
            value={selectedDates}
            onChange={(dates) => {
                const formattedDates = dates.map((date) => {
                return `${date.year}-${(date.month.number).toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`;
                });
                setSelectedDates(formattedDates);
            }}
            format="YYYY-MM-DD"
            className="purple"
            placeholder="Select dates"
            />
            <button onClick={handleSubmit} style={{ marginLeft: '10px' }}>Submit</button>
          </div>
          <button onClick={handleRefresh} style={{ marginRight: '10px' }}>Refresh</button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {historyPrices.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Gold Price (g)</th>
                    <th>Gold Price (oz)</th>
                    <th>After Import Duty</th>
                    <th>Consumer Price (GST)</th>
                    <th>Gold 916 (GST)</th>
                  </tr>
                </thead>
                <tbody>
                  {historyPrices.map((price) => (
                    <tr key={price._id}>
                      <td>{price.Date.split('T')[0]}</td>
                      <td>{price.GoldPrice_Gm || 'N/A'}</td>
                      <td>{price.GoldPrice_Oz || 'N/A'}</td>
                      <td>{price.AfterImportDuty}</td>
                      <td>{price.ConsumerPrice_gst}</td>
                      <td>{price.Gold916_gst || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No historical prices available.</p>
            )}
          </>
       
        )}
      </div>
    </div>
  );
};

export default PriceCard;
