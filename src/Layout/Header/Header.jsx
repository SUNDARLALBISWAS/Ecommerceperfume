import React, { useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate = useNavigate();

  // State for login status and profile image
  const isUserLogged = window.sessionStorage.getItem("isUserLogged")
  const image = window.sessionStorage.getItem("image")

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    window.sessionStorage.clear()
    navigate('/Login')
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        {/* Logo */}
        <Box component="img" src="Logo/logo.png" alt="Logo" sx={{ width: 50, height: 50, marginRight: 2 }} />

        {/* Brand Name */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Perfume</Typography>

        {/* Navigation Links */}
        <Link to='/'><Button sx={{ color: 'white', '&:hover': { backgroundColor: '#336699' } }}>Home</Button></Link>
        <Link to='/About'><Button sx={{ color: 'white', '&:hover': { backgroundColor: '#336699' }}}>About</Button></Link>
        <Link to='/AllProduct'><Button sx={{ color: 'white', '&:hover': { backgroundColor: '#336699' }}}>Products</Button></Link>
        <Link to='/Contact'><Button sx={{ color: 'white', '&:hover': { backgroundColor: '#336699' }}}>Contact</Button></Link>

        {/* Add to Cart Icon */}
        <IconButton color="inherit" onClick={() => navigate('/AddtoCart')}>
          <ShoppingCartIcon />
        </IconButton>

        {/* Profile Image or Menu Icon */}
        {isUserLogged ? (
          <>
            <IconButton color="inherit" sx={{ ml: 1 }} onClick={handleMenuOpen}>
              <Box
                component="img"
                src={image}
                alt="Profile"
                sx={{ width: 36, height: 36, borderRadius: '50%' }}
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >

              <MenuItem onClick={() => { navigate(`/Profile/${window.sessionStorage.getItem("id")}`); handleMenuClose(); }}>Profile</MenuItem>
              <MenuItem onClick={() => { handleLogout(); handleMenuClose(); }}>Log Out</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <IconButton color="inherit" sx={{ ml: 1 }} onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={() => { navigate('/Register'); handleMenuClose(); }}>Register</MenuItem>
              <MenuItem onClick={() => { navigate('/Login'); handleMenuClose(); }}>Login</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
