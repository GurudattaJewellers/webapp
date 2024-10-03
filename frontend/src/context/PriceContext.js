import React, { useEffect, useState } from 'react';

const Prices = () => {
    const [prices, setPrices] = useState({ gold: 0, silver: 0 });
    
    // Fetch prices from backend
    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/prices'); // Adjust URL as needed
                const data = await response.json();
                setPrices(data);
            } catch (error) {
                console.error('Error fetching prices:', error);
            }
        };

        fetchPrices();
    }, []);

    return (
        <div>
            <h1>Current Prices</h1>
            <p>Gold: ${prices.gold}</p>
            <p>Silver: ${prices.silver}</p>
        </div>
    );
};

export default Prices;