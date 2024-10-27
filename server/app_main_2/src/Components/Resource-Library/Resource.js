import React, { useState, useEffect } from 'react';
import ResourceTab from './ResourceTab';
import axios from 'axios';
import ResourceCard from './ResourceCard';
import { Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './Resource.css';

/**
 * Resource component displays a resource library with categories and corresponding resources.
 */

function Resource() {

  // State variables
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Digital assets and NFTS');
  const [resources, setResources] = useState({});

  // Fetch resources from the server on component mount
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/resources');
        setResources(response.data);

        // Set active category to the first category if not already set
        const categories = Object.keys(response.data);
        if (!categories.includes(activeCategory)) {
          setActiveCategory(categories[0]);
        }
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchResources();

  }, []);

  // Filter resources based on search term and active category
  const filteredResources = resources[activeCategory] ? resources[activeCategory].filter((resource) =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className='resource-page'>
      <Box sx={{ width: '100%', p: 2 }}>
        <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
          <Grid item xs={12} lg={4} className="bg-[#3e4a6a] flex items-center justify-center">
            <div>
              <Typography align="center" variant="h4" className="pb-1 hidden sm:block" style={{ fontWeight: 'bold', color: 'white' }}>
                Resource Library
              </Typography>
              <Typography align="center" variant="h6" className="pb-2 pt-3 sm:hidden" style={{ fontWeight: 'bold', color: 'white' }}>
                Resource Library
              </Typography>
              <Typography align="center" className="pb-2" style={{ color: 'white' }}>Build your financial knowledge.</Typography>
            </div>
          </Grid>
          <Grid item xs={0} lg={8} className="hidden lg:block">
            <img src="https://mycreditunion.gov/sites/default/files/styles/banner_graphic_1600_/public/header-banner-images/fi-banner.png.webp?itok=zSHPDHfl" className="w-full h-auto" />
          </Grid>
        </Grid>
      </Box>
      <Divider />

      <div className='mx-auto'>
        <ResourceTab onCategoryChange={handleCategoryChange} />
        <div
          style={{
            display: 'grid'
          }}
          className=" grid-cols-1 md:grid-cols-3 gap-8"
        >
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} {...resource} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resource;
