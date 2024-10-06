import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/colors/maroon.css';
import usa from '../assets/usa.svg';
import uk from '../assets/uk.svg';
import uae from '../assets/uae.svg';
import india from '../assets/india.svg';

const PriceCard = () => {
  const [livePrices, setLivePrices] = useState({ gold: 0, silver: 0 });
  const [historyPrices, setHistoryPrices] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [loading, setLoading] = useState(false);  // Add a loading state     
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [userTimezone, setUserTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  useEffect(() => {
    // This will update the time based on the user's time zone when the component loads
    const updateLastUpdatedTime = () => {
      setLastUpdated(new Date());
    };
    updateLastUpdatedTime();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

  const getCityTime = (offset) => {
    const utc = lastUpdated.getTime() + (lastUpdated.getTimezoneOffset() * 60000);
    const cityTime = new Date(utc + (3600000 * offset));
    return cityTime.toLocaleTimeString();
  };

  return (
    <div className="price-card">
  {/* Last updated section outside the live-prices card */}
  <div className="last-updated">
    <p className="date">Last Updated: {lastUpdated.toLocaleDateString('en-US', { timeZone: userTimezone })}</p>
    <p className="clock">{lastUpdated.toLocaleTimeString('en-US', { timeZone: userTimezone })}</p>
  </div>

  {/* Live prices section */}
  <div className="live-prices">
    <div className="prices gold">
      <div className="price gold-price">
        <p>Gold 1g 916: {livePrices.gold}</p>
      </div>
      <div className="price gold-price">
        <p>Gold 10g 999: {livePrices.gold}</p>
      </div>
    </div>
    <div className="prices silver">
      <div className="price silver-price">
        <p>Silver 1kg 999: {livePrices.silver}</p>
      </div>
      <div className="price silver-price">
        <p>Silver 1g 925: {livePrices.silver}</p>
      </div>
    </div>
  </div>

  {/* City time section */}
  <div className="city-time-container">
    <div className="city-time">
      <img src={usa} alt="NYC Flag" />
      <p>{getCityTime(-4)}</p>
    </div>
    <div className="city-time">
      <img src={uk} alt="London Flag" />
      <p>{getCityTime(0)}</p>
    </div>
    <div className="city-time">
      <img src={uae} alt="Dubai Flag" />
      <p>{getCityTime(4)}</p>
    </div>
  </div>

  {/* History prices section */}
  <div className="history-prices">
    <h2>History Prices</h2>
    <div className="filters">
  <div className="left-section">
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
      className="gold-border maroon"
      placeholder="Select dates"
    />
    <button className="submit" onClick={handleSubmit}>
      Submit <i className="fas fa-arrow-right"></i> {/* Icon for submit */}
    </button>
  </div>
  <button className="refresh" onClick={handleRefresh}>Refresh</button>
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
