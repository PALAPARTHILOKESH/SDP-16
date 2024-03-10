import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login'
import About from './Components/About';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Index from './Components/Index';
import Register from './Components/Register';
import Admin from './Components/Admin';
import Profile from './Components/Profile';
import Messages from './Components/Messages';
import Contact from './Components/Contact';
import Items from './Components/Items'; // Import the Items component
import Products from './Components/Products/Products';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login"  element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about"  element={<About />} />
          <Route path="/index"  element={<Index />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/messages" element={<Messages/>}/>
          <Route path="/items" element={<Items />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
