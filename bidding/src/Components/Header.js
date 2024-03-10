import { AppBar, Button, Toolbar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const pages = [
  { label: 'Login', path: '/login' },
  { label: 'Register', path: '/register' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

const Header = () => {
  return (
    <AppBar style={{ background: '#1565C0' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/images/IOGO.jpg" alt="Logo" style={{ width: '50px', marginRight: '20px' ,borderRadius:'15px'}} />
          <h3 style={{ margin: 0, color: 'white' }}></h3>
        </div>
        {/* Navigation Links */}
        <div>
          {pages.map((page) => (
            <Button key={page.label} color="inherit" component={Link} to={page.path}>
              <h4>{page.label}</h4>
            </Button>
          ))}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
