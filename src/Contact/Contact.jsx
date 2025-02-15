import React from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Grid } from '@mui/material';
import { styled } from '@mui/system';
import './Contact.scss'

const ContactContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  backgroundColor: '#f9f9f9',
  minHeight: '100vh',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  width: '100%',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const Contact = () => {
  return (
    <ContactContainer>
      <Typography variant="h4" component="h2" gutterBottom
        sx={{
          background: 'linear-gradient(90deg, #8A2BE2, #DA70D6, #FF69B4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block'
        }}>
        Get in Touch
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph align="center" maxWidth="sm">
        We'd love to hear from you! Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Contact Us
              </Typography>
              <form>
                <StyledTextField fullWidth label="Name" variant="outlined" required />
                <StyledTextField fullWidth label="Email" variant="outlined" required />
                <StyledTextField fullWidth label="Message" multiline rows={4} variant="outlined" required />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ marginTop: 2, padding: 1 }}
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Our Location
              </Typography>
              <Typography variant="body2" color="textSecondary">
                HFQF+53W Deshbandhu Nagar, Jatragachhi, New Town, West Bengal
              </Typography>
              <Box sx={{ marginTop: 2 }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.1039987525837!2d88.4248595734904!3d22.575213332878047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275927b0061ad%3A0x496c2fab98874c86!2sWebskitters%20Technology%20Solutions%20Pvt.%20Ltd!5e0!3m2!1sen!2sin!4v1731209324638!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: '8px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </ContactContainer>
  );
};

export default Contact;
