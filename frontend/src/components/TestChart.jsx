import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TestChart = () => {
  const data = [
  { date: "2024-10-11", price: 7307.85 },
  { date: "2024-10-10", price: 7489.53 },
  { date: "2024-10-09", price: 7515.32 },
  { date: "2024-10-08", price: 7579.55 },
  { date: "2024-10-07", price: 7607.99 }
];

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TestChart;