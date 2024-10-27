/**
 * StockSection component fetches and displays the currencies and stocks data from the server.
 * It uses the useState and useEffect hooks to manage state and perform side effects.
 * It uses the axios library to make GET requests to the server API endpoints.
 * @returns {JSX.Element} StockSection component
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StockSection.css';

// StockSection component
const StockSection = () => {
  // Define state variables for currencies and stocks data
  const [currencies, setCurrencies] = useState([]);
  const [stocks, setStocks] = useState([]);

  // Fetch currencies and stocks data from the server on component mount
  useEffect(() => {
    fetchCurrencies();
    fetchStocks();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/currencies");
      // Access the 'Currencies' array from the response data
      setCurrencies(response.data.map(obj => obj.Currencies).flat());
    } catch (error) {
      console.error('Error fetching currencies:', error);
    }
  };

  const fetchStocks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/stocks");
      // Access the 'Stocks' array from the response data
      setStocks(response.data.map(obj => obj.Stocks).flat());
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };

  // Render the StockSection component
  return (
    <div className="vertical-section">
      <h2 className='heading'>Currencies</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Current Price</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map((currency, index) => (
            <tr key={index}>
              <td>{currency.Name}</td>
              <td>{currency['Current Price']}</td>
              <td>{currency.Change}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <h2 className='heading'>Stocks</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Current Price</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={index}>
              <td>{stock.Name}</td>
              <td>{stock['Current Price']}</td>
              <td>{stock.Change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Export the StockSection component
export default StockSection;
