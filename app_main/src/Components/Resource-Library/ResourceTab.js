import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import axios from 'axios';

/**
 * ResourceTab component displays tabs for different resource categories.
 * @param {object} props - Properties passed to the component.
 * @param {function} props.onCategoryChange - Function to handle category change.
 */

export default function ResourceTab({ onCategoryChange }) {

  // State variables
  const [value, setValue] = useState(0);
  const [resources, setResources] = useState({});

  // Fetch resources from the server on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/resources');
        setResources(response.data);
      } catch (error) {
        console.error('There was an error fetching the resources data:', error);
      }
    };

    fetchData();

  }, []);

  // Get categories from resources object
  const categories = Object.keys(resources);

  //Handle tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
    onCategoryChange(categories[newValue]);
  };

  return (
    <Box sx={{ padding: "0px 0px 10px 0px", bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="resource tabs"
      >
        {categories.map((category, index) => (
          <Tab label={category} key={index} />
        ))}
      </Tabs>
    </Box>
  );
}

// Prop types validation
ResourceTab.propTypes = {
  onCategoryChange: PropTypes.func.isRequired, // Function to handle category change
};
