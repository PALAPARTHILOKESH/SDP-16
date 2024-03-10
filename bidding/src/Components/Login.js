import React, { useState } from 'react';
import axios from 'axios';
import { Paper, Stack, InputAdornment, TextField, Button, Typography, Box } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Check if username or password is empty
    if (!username || !password) {
      toast.error('Enter username and password');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/check', { username, password });
      const responseData = response.data;

      if (responseData === 'Login successful' && username !== 'admin') {
        navigate('/products');
        toast.success('Login successful');
      } else if (responseData === 'Login successful' && username === 'admin') {
        navigate('/admin');
        toast.success('Login successful');
      } else {
        toast.error(responseData);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Authentication failed');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
      <Header />
      <Box style={{ flex: 1, padding: '2rem', textAlign: 'center' }}>
        <Typography variant="h4" color="primary" style={{ fontFamily: 'YourDesiredFont', fontWeight: 'bold', marginBottom: '1rem', fontSize: '45px' }}>
          Online Bidding System
        </Typography>
      </Box>

      {/* Login Card on the right */}
      <Paper elevation={3} style={{ padding: '2rem', minWidth: '300px', maxWidth: '400px', width: '90%', backgroundColor: '#ffffff', borderRadius: '15px', boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)', marginRight: '30px' }}>
        <Stack spacing={3}>
          <Typography variant="h5" color="primary" style={{ fontFamily: 'YourDesiredFont', fontWeight: 'bold' }}>
            <center>Login</center>
          </Typography>

          <TextField
            label="Username"
            name="username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle color="primary" />
                </InputAdornment>
              ),
            }}
            fullWidth
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="primary" />
                </InputAdornment>
              ),
            }}
            fullWidth
            style={{ marginBottom: '1rem' }}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: '#2196F3', '&:hover': { backgroundColor: '#1565C0' } }}
            fullWidth
            onClick={handleLogin}
            style={{ marginBottom: '1rem' }}
          >
            Login
          </Button>
          <Link to="/register" style={{ color: '#1976D2', textDecoration: 'none' }}>Don't have an account? Register</Link>
        </Stack>
      </Paper>
      <ToastContainer /> {/* ToastContainer for displaying toast notifications */}
    </div>
  );
};

export default Login;
