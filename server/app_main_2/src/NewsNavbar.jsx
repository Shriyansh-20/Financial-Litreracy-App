/**
 * NewsNavbar Component
 * 
 * The NewsNavbar component displays buttons for selecting different categories of news.
 * When a category button is clicked, it updates the selected category and invokes
 * the onSelect callback function passed as a prop with the selected category.
 * 
 * @param {function} onSelect - Callback function to handle category selection.
 * @returns {JSX.Element} Component displaying category selection buttons.
 */

import React, { useState, useEffect } from 'react';
import './NewsNavbar.css'; 

const NewsNavbar = ({ onSelect }) => {
  // Define state variable for the selected category
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Function to handle category click event
  const handleCategoryClick = (category) => {
    onSelect(category); // Invoke the onSelect callback with the selected category
    setSelectedCategory(category); // Update the selected category state
  };

  // Effect to log the selected category when it changes
  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);

  // Render the NewsNavbar component
  return (
    <div className="navbar">
      {/* Button for global news category */}
      <button className={selectedCategory === 'global finance' ? 'selected' : ''} onClick={() => handleCategoryClick('global finance')}>Global News</button>
      {/* Button for India news category */}
      <button className={selectedCategory === 'india finance' ? 'selected' : ''} onClick={() => handleCategoryClick('india finance')}>India News</button>
      {/* Button for market category */}
      <button className={selectedCategory === 'market' ? 'selected' : ''} onClick={() => handleCategoryClick('market')}>Market</button>
      {/* Button for stocks category */}
      <button className={selectedCategory === 'stocks' ? 'selected' : ''} onClick={() => handleCategoryClick('stocks')}>Stocks</button>
      {/* Button for fintech category */}
      <button className={selectedCategory === 'fintech' ? 'selected' : ''} onClick={() => handleCategoryClick('fintech')}>Fintech</button>
    </div>
  );
};

// Export the NewsNavbar component
export default React.memo(NewsNavbar);
