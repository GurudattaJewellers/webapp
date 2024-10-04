import React from 'react';

const LivePrices = ({ livePrices }) => {
  return (
    <div className="live-prices">
      <h2>Live Prices</h2>
      <ul>
        <li>
          <span>Gold:</span> {livePrices.gold}
        </li>
        <li>
          <span>Silver:</span> {livePrices.silver}
        </li>
      </ul>
    </div>
  );
};

export default LivePrices;