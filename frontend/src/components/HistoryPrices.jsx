import React, { useState, useEffect } from 'react';
import Multiselect from 'react-multiselect-checkbox';
import DatePicker from 'react-datepicker';

const HistoryPrices = ({ historyPrices, onDateChange }) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [filteredHistoryPrices, setFilteredHistoryPrices] = useState(historyPrices);

  useEffect(() => {
    if (selectedDates.length > 0) {
      const filteredPrices = historyPrices.filter((price) => selectedDates.includes(price.date));
      setFilteredHistoryPrices(filteredPrices);
    } else {
      setFilteredHistoryPrices(historyPrices);
    }
  }, [selectedDates, historyPrices]);

  const handleDateChange = (dates) => {
    setSelectedDates(dates);
    onDateChange(dates);
  };

  return (
    <div className="history-prices">
      <h2>History Prices</h2>
      <Multiselect
        options={historyPrices.map((price) => ({ label: price.date, value: price.date }))}
        selectedValues={selectedDates}
        onChange={handleDateChange}
        multiple={true}
      />
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Gold</th>
            <th>Silver</th>
          </tr>
        </thead>
        <tbody>
          {filteredHistoryPrices.map((price) => (
            <tr key={price.date}>
              <td>{price.date}</td>
              <td>{price.gold}</td>
              <td>{price.silver}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryPrices;