import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-multi-date-picker';
import '../maroon.css';
import usa from '../assets/img/usa.svg';
import uk from '../assets/img/uk.svg';
import uae from '../assets/img/uae.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment-timezone';
import { Subscript } from 'lucide-react';
import GoldPriceChart from './GoldPriceChart';
import SilverPriceChart from './SilverPriceChart';

const PriceCard = () => {
  const [livePrices, setLivePrices] = useState({ gold: 0, silver: 0, gold_999: 0, silver_999: 0, updated: '',silver_usa:0, gold_usa:0 });
  const [historyGoldPrices, setHistoryGoldPrices] = useState([]);
  const [historySilverPrices, setHistorySilverPrices] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [loading, setLoading] = useState(false);  // Add a loading state     
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [userTimezone, setUserTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [currentGoldPage, setCurrentGoldPage] = useState(1);
  const [currentSilverPage, setCurrentSilverPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastGoldItem = currentGoldPage * itemsPerPage;
  const indexOfFirstGoldItem = indexOfLastGoldItem - itemsPerPage;
  const currentGoldItems = historyGoldPrices.slice(indexOfFirstGoldItem, indexOfLastGoldItem);

  const indexOfLastSilverItem = currentSilverPage * itemsPerPage;
  const indexOfFirstSilverItem = indexOfLastSilverItem - itemsPerPage;
  const currentSilverItems = historySilverPrices.slice(indexOfFirstSilverItem, indexOfLastSilverItem);

  const paginate = (pageNumber, setPage, totalPages) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  };

  const TimeDisplay = ({ updatedTimeString }) => {
    const [userTime, setUserTime] = useState('');
    const [userTimezone, setUserTimezone] = useState('');
  
    useEffect(() => {
      // Detect user's timezone
      const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setUserTimezone(detectedTimezone);
  
      // Parse the input time string (assumed to be in IST)
      const lastUpdated = moment.tz(updatedTimeString, "DD-MM-YYYY HH:mm:ss a", "Asia/Kolkata");
  
      // Format time for user's timezone
      const formattedTime = lastUpdated.tz(detectedTimezone).format('DD-MM-YYYY hh:mm:ss A');
      setUserTime(formattedTime);
    }, [updatedTimeString]);
  
    return (
      <div>
        <p className="clock">Last Updated: {userTime} ({userTimezone})</p>
      </div>
    );
  };

  // Render pagination
  const renderGoldPagination = (currentPage, setPage, totalItems) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="pagination-gold">
        <button onClick={() => paginate(1, setPage, totalPages)} disabled={currentPage === 1}>&lt;&lt;</button>
        <button onClick={() => paginate(currentPage - 1, setPage, totalPages)} disabled={currentPage === 1}>&lt;</button>
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number, setPage, totalPages)} className={currentPage === number ? 'active' : ''}>
            {number}
          </button>
        ))}
        <button onClick={() => paginate(currentPage + 1, setPage, totalPages)} disabled={currentPage === totalPages}>&gt;</button>
        <button onClick={() => paginate(totalPages, setPage, totalPages)} disabled={currentPage === totalPages}>&gt;&gt;</button>
      </div>
    );
  };

  const renderSilverPagination = (currentPage, setPage, totalItems) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="pagination-silver">
        <button onClick={() => paginate(1, setPage, totalPages)} disabled={currentPage === 1}>&lt;&lt;</button>
        <button onClick={() => paginate(currentPage - 1, setPage, totalPages)} disabled={currentPage === 1}>&lt;</button>
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number, setPage, totalPages)} className={currentPage === number ? 'active' : ''}>
            {number}
          </button>
        ))}
        <button onClick={() => paginate(currentPage + 1, setPage, totalPages)} disabled={currentPage === totalPages}>&gt;</button>
        <button onClick={() => paginate(totalPages, setPage, totalPages)} disabled={currentPage === totalPages}>&gt;&gt;</button>
      </div>
    );
  };

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
    }, 1000000);
    return () => clearInterval(timer);
  }, []);

  console.log(selectedDates);

  // Fetch live prices
  const fetchLivePrices = async () => {
    try {
      const prices = await axios.get('http://localhost:5000/prices');
      console.log(prices);
      //const goldPrice = await axios.get('http://localhost:5000/gold');
      //const silverPrice = await axios.get('http://localhost:5000/silver');
      
      setLivePrices({ gold: prices.data.goldRate, silver: prices.data.silverRate, 
                      gold_999: prices.data.gold_pure, silver_999: prices.data.silver_pure,
                      gold_usa: prices.data.gold_usa, silver_usa: prices.data.silver_usa,
                      rate: prices.data.rate,
                      updated: prices.data.dateTime});
    } catch (error) {
      console.error("Error fetching live prices:", error);
    }
  };

  // Fetch history prices for one week by default
  const fetchDefaultHistoryGoldPrices = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/gold-prices/default');
      setHistoryGoldPrices(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching default history prices:", error);
      setLoading(false);
    }
  };

  const fetchDefaultHistorySilverPrices = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/silver-prices/default');
      setHistorySilverPrices(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching default history prices:", error);
      setLoading(false);
    }
  };

  // Fetch history prices based on selected dates
  const fetchHistoryGoldPricesByDates = async (dates) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/gold-prices/by-dates', { dates });
      setHistoryGoldPrices(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching history prices by dates:", error);
      setLoading(false);
    }
  };

  const fetchHistorySilverPricesByDates = async (dates) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/silver-prices/by-dates', { dates });
      setHistorySilverPrices(response.data);
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
    fetchHistoryGoldPricesByDates(formattedDates);
    fetchHistorySilverPricesByDates(formattedDates);
  };

  // Handle submit
  const handleSubmit = () => {
    fetchHistoryGoldPricesByDates(selectedDates);
    fetchHistorySilverPricesByDates(selectedDates);
  };

  // Handle refresh to fetch default one-week prices
  const handleRefresh = () => {
    setSelectedDates([]);
    fetchDefaultHistoryGoldPrices();
    fetchDefaultHistorySilverPrices();
  };

  useEffect(() => {
    fetchLivePrices();
    fetchDefaultHistoryGoldPrices();
    fetchDefaultHistorySilverPrices(); // Fetch default one week prices on load
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
    <TimeDisplay  updatedTimeString={livePrices.updated} />
  </div>

  {/* Live prices section */}
  <div className="live-prices">
    <div className="prices gold">
      <div className="price gold-price">
        <p><span className="left-part">GOLD 1g 22K 916</span>  |  <span className="right-part">(₹) {livePrices.gold}</span></p> 
      </div>
      <div className="price gold-price">
        <p><span className="left-part">GOLD 1g 24K 999</span>  |  <span className="right-part">(₹) {livePrices.gold_999}</span></p> 
      </div>
      <div className="price gold-price">
        <p><span className="left-part">GOLD 1oz 24K 999</span>  |  <span className="right-part"> {livePrices.gold_usa}</span></p> 
      </div>
    </div>
    <div className="prices silver">
      <div className="price silver-price">
        <p><span className="left-part">SILVER 1g 925</span>  | <span className="right-part">(₹) {livePrices.silver}</span></p>
      </div>
      <div className="price silver-price">
        <p><span className="left-part">SILVER 1g 999</span>  |  <span className="right-part">(₹) {livePrices.silver_999}</span></p> 
      </div>
      <div className="price silver-price">
        <p><span className="left-part">SILVER 1oz 999</span>  |  <span className="right-part"> {livePrices.silver_usa}</span></p> 
      </div>
    </div>
    <p style={{ fontSize: '0.6rem', color: 'whitesmoke', margin: '0', padding: '0'  }}>* CGST 1.5% and SGST 1.5% Applicable after live rates </p>
    <p style={{ fontSize: '0.4rem', color: 'whitesmoke', margin: '0', padding: '0' }}><TimeDisplay updatedTimeString={livePrices.updated} /></p>
    <p style={{ fontSize: '0.4rem', color: '#666',margin: '0', padding: '0' }} >Disclaimer : liverates provided above are from sources we believe are reliable, but we cannot guarantee their accuracy. The prices are shared without any warranties. By using this site, you agree that any errors or missing information cannot be the basis for claims or legal action.</p>
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
    <h2 style={{color:"whitesmoke"}}>History Prices</h2>
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
             <FontAwesomeIcon icon={faArrowRight} />
            </button> &nbsp;
            <button className="refresh" onClick={handleRefresh}>
              <FontAwesomeIcon icon={faSync} /> 
    </button>
  </div>
  </div>


{loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="table-container gold-table">
              <h3 style={{color:"#ffd700"}}>Gold Prices</h3>
              {currentGoldItems.length > 0 ? (
                <>
                  <div className="table-scroll">
                    <table>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Gold Price 999 (g)</th>
                          <th>Gold Price 999 (oz)</th>
                          <th>After Import Duty 999</th>
                          <th>Consumer Price 999 (GST)</th>
                          <th>Gold 916 (GST)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentGoldItems.map((price) => (
                          <tr key={price._id}>
                            <td>{price.Date.split('T')[0]}</td>
                            <td>₹ {price.GoldPrice_Gm || 'N/A'}</td>
                            <td>₹ {price.GoldPrice_Oz || 'N/A'}</td>
                            <td>₹ {price.AfterImportDuty}</td>
                            <td>₹ {price.ConsumerPrice_gst}</td>
                            <td>₹ {price.Gold916_gst || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {renderGoldPagination(currentGoldPage, setCurrentGoldPage, historyGoldPrices.length)}
                  <div>
                  <GoldPriceChart></GoldPriceChart>
                  </div>
                </>
              ) : (
                <p>No Gold historical prices available for the selected dates.</p>
              )}
            </div>
            

            <div className="table-container silver-table">
              <h3 style={{color:"silver"}}>Silver Prices</h3>
              {currentSilverItems.length > 0 ? (
                <>
                  <div className="table-scroll">
                    <table>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Silver Price 999 (g)</th>
                          <th>Silver Price 999 (oz)</th>
                          <th>After Import Duty 999</th>
                          <th>Consumer Price 999 (GST)</th>
                          <th>Silver 925 (GST)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentSilverItems.map((price) => (
                          <tr key={price._id}>
                            <td>{price.Date.split('T')[0]}</td>
                            <td>₹ {((price.SilverPrice_Oz * livePrices.rate) / 31.1035).toFixed(2) || 'N/A'}</td>
                            <td>₹ {(price.SilverPrice_Oz * livePrices.rate).toFixed(2) || 'N/A'}</td>
                            <td>₹ {price.AfterImportDuty}</td>
                            <td>₹ {price.ConsumerPrice_gst}</td>
                            <td>₹ {price.SilverPrice_Gm || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {renderSilverPagination(currentSilverPage, setCurrentSilverPage, historySilverPrices.length)}
                  <div>
                  <SilverPriceChart></SilverPriceChart>
                  </div>
                </>
              ) : (
                <p>No Silver historical prices available for the selected dates.</p>
              )}
            </div>
          </>
        )}
  </div>
</div>

  );
};

export default PriceCard;
