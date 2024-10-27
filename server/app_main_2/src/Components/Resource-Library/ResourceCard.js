import React from 'react';
import { Card, CardMedia, CardContent, CardActionArea } from '@mui/material';

/**
 * ResourceCard component displays a card representing a resource.
 * @param {object} props - Properties passed to the component.
 * @param {string} props.image - URL of the resource image.
 * @param {string} props.title - Title of the resource.
 * @param {string} props.description - Description of the resource.
 * @param {string} props.url - URL of the resource.
 */

// Function to handle card click, opening the resource URL in a new tab
const ResourceCard = ({ image, title, description, url }) => {
  const handleCardClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="bg-white shadow-md rounded-lg overflow-hidden p-1" style={{ background: "#ecf0f4" }}>
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          component="img"
          className='max-h-72 min-h-72 rounded-sm'
          image={image}
          alt={title}
        />
        <CardContent>
          <div className="font-bold text-lg">{title}</div>
          <p className="text-gray-600 text-base">{description}</p>
        </CardContent>
        <button type="button" class="text-white bg-[#5990cb] hover:bg-[#0056b3] focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium border rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2">Learn More</button>
      </CardActionArea>
    </Card>
  );
};

export default ResourceCard;
