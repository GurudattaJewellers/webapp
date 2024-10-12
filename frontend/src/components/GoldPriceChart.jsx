import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import '../PriceChart.css';

const GoldPriceChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState('1Y');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/gold-prices/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        const formattedData = jsonData
          .map((item, index, array) => {
            const price = parseFloat(item.Gold916_gst);
            const prevPrice = index > 0 ? parseFloat(array[index - 1].Gold916_gst) : price;
            const percentChange = ((price - prevPrice) / prevPrice) * 100;
            return {
              date: new Date(item.Date),
              price: price,
              percentChange: percentChange
            };
          })
          .sort((a, b) => a.date - b.date);
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching gold price data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    const end = new Date();
    let start = new Date();
    switch(dateRange) {
      case '1W':
        start.setDate(end.getDate() - 7);
        break;
      case '1M':
        start.setMonth(end.getMonth() - 1);
        break;
      case '3M':
        start.setMonth(end.getMonth() - 3);
        break;
      case '6M':
        start.setMonth(end.getMonth() - 6);
        break;
      case '1Y':
        start.setFullYear(end.getFullYear() - 1);
        break;
      case '3Y':
        start.setFullYear(end.getFullYear() - 3);
        break;
      case '5Y':
        start.setFullYear(end.getFullYear() - 5);
        break;
      case '10Y':
        start.setFullYear(end.getFullYear() - 10);
        break;
      case 'YTD':
        const currentYear = new Date().getFullYear();
        start.setFullYear(currentYear);
        start.setMonth(0);
        start.setDate(1);
        break;
      case 'MAX':
        return data;
      default:
        start.setFullYear(end.getFullYear() - 1);
    }
    return data.filter(item => item.date >= start && item.date <= end);
  }, [data, dateRange]);

  const getPercentageChange = () => {
    if (filteredData.length < 2) return 0;
    const firstPrice = filteredData[0].price;
    const lastPrice = filteredData[filteredData.length - 1].price;
    return ((lastPrice - firstPrice) / firstPrice) * 100;
  };

  const percentageChange = getPercentageChange().toFixed(2);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (loading) return <div className="flex justify-center items-center h-64 text-accent-color">Loading...</div>;
  if (error) return <div className="text-accent-color">Error: {error}</div>;

  return (
    <div className="gold-price-chart-container">
      <h2 className="chart-title">Gold 916 GST Price History</h2>
      <div className="date-range-buttons">
        {['1W', '1M', '3M', '6M', '1Y', '3Y', '5Y', '10Y', 'YTD', 'MAX'].map(range => (
          <button
            key={range}
            onClick={() => setDateRange(range)}
            className={`date-range-button ${dateRange === range ? 'active' : ''}`}
          >
            {range}
          </button>
        ))}
      </div>
      <div className="overall-change">
        <p>
          Overall change: <span className={`overall-change-value ${percentageChange >= 0 ? 'positive' : 'negative'}`}>
            {percentageChange}%
          </span>
        </p>
      </div>
      {filteredData.length > 0 ? (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 10 }} 
                tickFormatter={formatDate}
                minTickGap={30}
              />
              <YAxis 
                tick={{ fontSize: 10 }}
                domain={['auto', 'auto']}
                tickFormatter={(value) => `₹${value.toFixed(0)}`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--secondary-color)', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
                labelStyle={{ color: 'var(--text-color)' }}
                itemStyle={{ color: 'var(--accent-color)' }}
                labelFormatter={formatDate}
                formatter={(value, name, props) => {
                  if (name === 'price') return [`₹${value.toFixed(2)}`, "Price"];
                  if (name === 'percentChange') return [`${value.toFixed(2)}%`, "Daily % Change"];
                }}
              />
              <Line type="monotone" dataKey="price" stroke="var(--accent-color)" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="no-data-message">No data available for the selected range.</div>
      )}
    </div>
  );
};

export default GoldPriceChart;