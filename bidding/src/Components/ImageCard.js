import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const ImageCard = ({ title, imageSrc, children }) => {
  return (
    <Card sx={{ maxWidth: 300, margin: '20px' }}>
      <CardMedia
        component="img"
        height="150"
        image={imageSrc}
        alt={title}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
};

export default ImageCard;
