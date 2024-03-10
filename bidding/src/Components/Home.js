import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Modal from '@mui/material/Modal'; // Import the Modal component from Material-UI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [globalTimer, setGlobalTimer] = useState(30);
  const [timers, setTimers] = useState(Array(10).fill(3600));
  const [showBidModal, setShowBidModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 5000);

    const globalTimerInterval = setInterval(() => {
      setGlobalTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(globalTimerInterval);
    };
  }, []);

  useEffect(() => {
    const cardTimerIntervals = timers.map((timer, index) => {
      return setInterval(() => {
        setTimers((prevTimers) => {
          const updatedTimers = [...prevTimers];
          updatedTimers[index] = updatedTimers[index] - 1;
          return updatedTimers;
        });
      }, 1000);
    });

    return () => {
      cardTimerIntervals.forEach((interval) => clearInterval(interval));
    };
  }, [timers]);

  const handleBidNowClick = () => {
    setShowBidModal(true);
  };

  const handleLoginOrRegister = () => {
    // Implement your logic to redirect the user to login or register page
  };

  const handleBidClose = () => {
    setShowBidModal(false);
  };

  const cardData = [
    { name: 'IPhone 13', image: '/images/iphone13.jpeg', description: 'The latest iPhone model with advanced features.' },
    { name: 'OnePlus4R', image: '/images/oneplus.webp', description: 'A powerful smartphone with fast performance.' },
    { name: 'Refrigerator', image: '/images/fridge.jpg', description: 'Keep your food fresh and organized with this spacious and energy-efficient refrigerator.'},
    { name: 'Air Jordan 1', image: '/images/shoe.jpeg', description: 'Iconic shoes known for their timeless style and legendary performance.' },
    { name: 'Samsung Galaxy S22', image: '/images/S22.jpeg', description: 'Flagship Samsung smartphone with stunning display and camera.'},
    { name: 'Smart Watch', image: '/images/watch.jpeg', description: 'Track your fitness and stay connected with a smartwatch.'},
    { name: 'Amazon Gift Card', image: '/images/giftcard.jpeg', description: 'Get an Amazon gift card to shop for your favorite products.' },
    { name: 'Bluetooth Speaker', image: '/images/speaker.jpeg', description: 'Portable speaker with high-quality sound for music lovers.' },
  ];

  const cardContainer = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    marginTop: '20px',
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={imageSlider}>
        <Header/><br></br><br></br><br></br><br></br>
        <img src="/images/banner.jpg" alt="Image 1" style={currentImageIndex === 0 ? imageStyle : { display: 'none' }} />
        <img src="/images/banner.jpg" alt="Image 1" style={currentImageIndex === 1 ? imageStyle : { display: 'none' }} />
        <img src="/images/banner.jpg" alt="Image 1" style={currentImageIndex === 2 ? imageStyle : { display: 'none' }} />
      </div>
      <div style={cardContainer}>
        {cardData.map((card, index) => (
          <div key={index} style={cardStyle}>
            <h3>{card.name}</h3>
            <img src={card.image} alt={card.name} style={{ width: '100%', marginBottom: '10px' }} />
            <p style={{ minHeight: '60px' }}>{card.description}</p>
            <p>Timer: {formatTimer(timers[index])}</p><br></br>
            <button style={bidButton} onClick={handleBidNowClick}>Bid Now</button>
          </div>
        ))}
      </div>
      <Modal
        open={showBidModal}
        onClose={handleBidClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <IconButton aria-label="close" onClick={handleBidClose} sx={{ position: 'absolute', top: 8, right: 8, color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Welcome,
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You need to Login or Register before placing a bid.
          </Typography>
          <Button component={Link} to="/register" variant="contained" color="primary" sx={{ mr: 2, mt: 2 }}>
            Register
          </Button>
          <Button component={Link} to="/login" variant="contained" color="primary" sx={{ mr: 2, mt: 2 }}>
            Login
          </Button>
        </Box>
      </Modal>
      <br></br><br></br><br></br>
    </div>
  );
};

const imageSlider = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  overflowX: 'hidden',
  margin: '50px auto',
  width: '80%',
};

const imageStyle = {
  width: '900px',
  height: '200px',
  margin: '0 auto 20px',
};

const cardStyle = {
  width: '200px',
  padding: '20px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  transition: 'transform 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
};

const bidButton = {
  position: 'absolute',
  bottom: '10px',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '10px 20px',
  fontSize: '18px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const formatTimer = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default Home;
