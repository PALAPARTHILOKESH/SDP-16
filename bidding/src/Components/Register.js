import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MenuItem, Select } from "@mui/material";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from "./Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const theme = createTheme();

export default function SignInSide() {
  const [usernameExists, setUsernameExists] = useState(false);
  const [gender, setGender] = useState('');

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const validateName = (name) => {
    return /^[a-zA-Z]+$/.test(name);
  };

  const validatePassword = (password) => {
    // Regex to check for at least one lowercase letter, one uppercase letter, one special character, and minimum length 8
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };

  const validateEmail = (email) => {
    // Regex to validate email format including @ symbol
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData);

    if (!validateName(userData.firstname) || !validateName(userData.lastname)) {
      toast.error("First name and last name must contain only alphabets!");
      return;
    }

    if (!validatePassword(userData.password)) {
      toast.error("Password must contain at least one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long!");
      return;
    }

    if (!validateEmail(userData.email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    if (!userData.firstname || !userData.lastname || !userData.username || !userData.password || !userData.gender || !userData.email || !userData.dateOfBirth) {
      toast.error("Please fill out all required fields!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8081/checkUsername", {
        username: userData.username,
      });

      if (response.data.exists) {
        toast.error("Username already exists!");
      } else {
        const registerResponse = await axios.post("http://localhost:8081/insert", userData);
        setUsernameExists(false);
        toast.success("User registered successfully!");
        event.target.reset();
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("An error occurred while registering!");
    }
  };

  return (
    <div style={{ overflowY: 'auto', height: '100vh' }}>
      <Header /><br></br><br></br>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "108vh", backgroundColor: '#f5f5f5' }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%" }}
          >
            <Grid item xs={12} sm={8} md={6} lg={4}>
              <Paper
                elevation={8}
                sx={{
                  padding: 6,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: 8,
                  backgroundColor: '#ffffff',
                }}
              >
                <Avatar sx={{ m: -5, bgcolor: 'primary.main' }}>
                  <LockOutlinedIcon />
                </Avatar><br></br><br></br>
                <Typography component="h1" variant="h5" sx={{ marginBottom: 3, fontFamily: 'cursive', color: '#1565C0' }}>
                  Sign up
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ width: '100%', textAlign: 'center' }}
                >
                  <Grid container spacing={0.9}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="firstname"
                        required
                        fullWidth
                        id="firstname"
                        label="First Name"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lastname"
                        label="Last Name"
                        name="lastname"
                        autoComplete="family-name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={gender}
                          label="Gender"
                          onChange={handleChange}
                          name="gender"
                        >
                          <MenuItem value={'Male'}>Male</MenuItem>
                          <MenuItem value={'Female'}>Female</MenuItem>
                          <MenuItem value={'Others'}>Others</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="dateOfBirth"
                        label="Date Of Birth"
                        required
                        type="date"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="email"
                        label="Email"
                        type="email"
                        id="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        error={usernameExists}
                        helperText={usernameExists ? 'Username already exists' : ''}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 4, mb: 2, backgroundColor: 'primary.main', color: '#fff' }}
                  >
                    Sign Up
                  </Button>
                  <Link to="/login" style={{ color: '#1976D2', textDecoration: 'none' }}>
                    Already have an account? Login
                  </Link>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
      <ToastContainer />
    </div>
  );
}
