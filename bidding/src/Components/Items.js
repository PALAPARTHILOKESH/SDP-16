import React from "react";
import { Link } from "react-router-dom"; // Import Link
import ImageCard from "./ImageCard";
import Button from "@mui/material/Button";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Header";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// Component for displaying an auction item
const AuctionItem = ({ name, price, image }) => {
  // State for the remaining time in seconds (1 hour)
  const [remainingTime, setRemainingTime] = React.useState(3600);
  const [open, setOpen] = React.useState(false);

  // Function to handle bidding
  const handleBid = () => {
    // Check if user is logged in
    const isLoggedIn = checkUserLoggedIn(); // Implement this function to check user login status
    if (!isLoggedIn) {
      setOpen(true);
    } else {
      // TODO: Implement bidding logic
      console.log("Bid Now clicked!");
    }
  };

  // Function to format seconds into HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}:${minutes}:${remainingSeconds}`;
  };

  React.useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime((prevTime) => prevTime - 1);
        // Check if time is ending (e.g., last 5 seconds)
        if (remainingTime === 5) {
          toast.warning(`Time is ending for ${name}`);
        }
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime, name]);

  // Dummy function to check user login status
  const checkUserLoggedIn = () => {
    // Implement your logic here to check if user is logged in
    return false; // Change this to true if user is logged in
  };

  return (
    <div>
      <ImageCard title={name} imageSrc={image}>
        <p>Price: ${price}</p>
        <p>Time Remaining: {formatTime(remainingTime)}</p>
        <Button variant="contained" color="primary" onClick={handleBid}>
          Bid Now
        </Button>
      </ImageCard>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <IconButton aria-label="close" onClick={() => setOpen(false)} sx={{ position: 'absolute', top: 8, right: 8, color: 'text.secondary' }}>
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
    </div>
  );
};

// Sample items data
const items = [
  { id: 1, name: "Item 1", price: 100, image: "/images/case.jpg" },
  { id: 2, name: "Item 2", price: 150, image: "/images/case.jpg" },
  { id: 3, name: "Item 3", price: 200, image: "/images/case.jpg" },
  // Add more items as needed
];

// Component for displaying multiple auction items
const Items = () => {
  return (
    <div>
      <Header />
      <div style={{ marginTop: "80px", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {items.map((item) => (
          <AuctionItem key={item.id} name={item.name} price={item.price} image={item.image} />
        ))}
      </div>
    </div>
  );
};

export default Items;
