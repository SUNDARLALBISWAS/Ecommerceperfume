import React from 'react';
import { Box, Typography, Link, Grid, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import './Footer.scss';

const Footer = () => {
  return (
    <Box component="footer" className="footer">
      <Box className="footer-top">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="footer-heading">About Us</Typography>
            <Typography variant="body2" className="footer-text">
              We provide quality products and excellent customer service. Join our community and explore our range of collections.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="footer-heading">Quick Links</Typography>
            <ul className="footer-links">
              <li><Link href="/" color="inherit">Home</Link></li>
              <li><Link href="/About" color="inherit">About</Link></li>
              <li><Link href="/AllProduct" color="inherit">Products</Link></li>
              <li><Link href="/Contact" color="inherit">Contact</Link></li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="footer-heading">Contact Us</Typography>
            <Typography variant="body2" className="footer-text">
              Webskitters Technology Solutions Pvt. Ltd, Plot-9, Eco Intelligent Park, Unit No- 7E, 7th Floor, EM Block, Sector V, Bidhannagar, Kolkata, West Bengal 700091<br />
              Email: info@webskittersacademy.in<br />
              Phone: 1800 419 9397
              (Toll Free)
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="footer-heading">Follow Us</Typography>
            <Box className="social-icons">
              <IconButton href="#" color="inherit"><Facebook /></IconButton>
              <IconButton href="#" color="inherit"><Twitter /></IconButton>
              <IconButton href="#" color="inherit"><Instagram /></IconButton>
              <IconButton href="#" color="inherit"><LinkedIn /></IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box className="footer-bottom">
        <Typography variant="body2" color="textSecondary" align="center">
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
