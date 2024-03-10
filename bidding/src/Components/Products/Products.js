import React, { useState, useEffect } from "react";
import Search from './Search';
import AddProducts from "./AddProducts";
import CardBody from "./CardBody";
import Button from "./Button";
import Sidebar from '../Sidebar';
import "./Products.css";
import { Razorpay } from "razorpay-checkout";

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

const Products = () => {
  const [items, setItem] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [addedItems, setAddedItem] = useState([]);
  const [showAddProducts, setShowAddProducts] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, []);

  function changingSearchData(e) {
    setSearchValue(e.target.value);
  }

  const itemsFilter = items.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  function addItem(item) {
    item.addNumber = 1;
    setAddedItem([...addedItems, item]);
  }

  function removeItem(item) {
    const newItems = addedItems.filter((addedItem) => addedItem.id !== item.id);
    setAddedItem(newItems);
  }

  const handleBidNowClick = () => {
    const options = {
      key: 'rzp_test_xUIHrkrkhUtUlU',
      key_secret: "4iNHYNHaV6AeuHX73xdzHLje",
      amount: 100, // Example amount in paise (100 paise = ₹1)
      currency: 'INR',
      name: 'Product Name',
      description: 'Bid for Product',
      image: '/images/IOGO.jpg', // Replace with your logo image URL
      handler: function(response) {
        alert('Payment successful');
      },
      prefill: {
        name: 'KORLA SRIKARA TRIPURA SATHVIK',
        email: 'kstsathvik005@gmail.com',
        contact: '8897674181'
      }
    };
    // Check if Razorpay library is available
    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      // Handle case where Razorpay library is not available
      console.error('Razorpay library not found');
    }
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
    <div>
      <Sidebar />
      <div style={{ textAlign: 'center' }}>
        <div style={cardContainer}>
          {cardData.map((card, index) => (
            <div key={index} style={cardStyle}>
              <h3>{card.name}</h3>
              <img src={card.image} alt={card.name} style={{ width: '100%', marginBottom: '10px' }} />
              <p style={{ minHeight: '200px' }}>{card.description}</p>
              <button style={bidButton} onClick={handleBidNowClick}>Bid Now</button>
            </div>
          ))}
        </div>
      </div><br></br>
      <div className="body__container">
        <div className="nav">
          <div className="nav-right">
            <Search
              products={items}
              value={searchValue}
              onChangeData={changingSearchData}
            />
            <Button num={addedItems.length} click={setShowAddProducts} />
          </div>
        </div>

        {showAddProducts && (
          <AddProducts
            click={setShowAddProducts}
            items={addedItems}
            removeItem={removeItem}
            setAddedItem={setAddedItem}
          />
        )}
        <CardBody
          products={itemsFilter}
          addItem={addItem}
          removeItem={removeItem}
          addedItems={addedItems}
        />
      </div>
    </div>
  );
};

export default Products;
