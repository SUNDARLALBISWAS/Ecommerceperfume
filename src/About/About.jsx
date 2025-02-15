import React from 'react';
import { Container, Card, CardContent, Typography, Button, Avatar } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import './About.css';

const About = () => {
  const navigate = useNavigate();

  const handleredirect = () => {
    navigate('/AllProduct');
  }
  return (
    <div className="about-page-wrapper">
      <Container className="about-page" maxWidth="lg">
        {/* Introduction Section */}
        <Grid container justifyContent="center" textAlign="center" className="about-intro" sx={{ my: 5 }}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                background: 'linear-gradient(90deg, #8A2BE2, #DA70D6, #FF69B4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>
              About Us
            </Typography>

            <Typography variant="body1" className="intro-text">
              Welcome to <strong>Your Perfume Store</strong>, your premier online destination for luxury perfumes and unique scents. We believe that fragrance is more than just a product—it’s an experience, an expression of personality, and a lasting memory.
            </Typography>
          </Grid>
        </Grid>

        {/* Image Section */}
        <Container maxWidth="lg" style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              background: 'linear-gradient(90deg, #8A2BE2, #DA70D6, #FF69B4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}
          >
            Popular Perfumes
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {/* Card 1 */}
            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={3} style={{ padding: '1rem', textAlign: 'center' }}>
                <Avatar
                  src="About/About1.jpg" // Replace with actual image path
                  alt="Perfume 1"
                  sx={{ width: 120, height: 120, margin: '0 auto', marginBottom: '1rem' }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    Guerlain
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* Card 2 */}
            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={3} style={{ padding: '1rem', textAlign: 'center' }}>
                <Avatar
                  src="About/About2.jpg" // Replace with actual image path
                  alt="Perfume 2"
                  sx={{ width: 120, height: 120, margin: '0 auto', marginBottom: '1rem' }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    Lancôme
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* Card 3 */}
            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={3} style={{ padding: '1rem', textAlign: 'center' }}>
                <Avatar
                  src="About/About3.jpg" // Replace with actual image path
                  alt="Perfume 3"
                  sx={{ width: 120, height: 120, margin: '0 auto', marginBottom: '1rem' }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    Valentino
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* Card 4 */}
            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={3} style={{ padding: '1rem', textAlign: 'center' }}>
                <Avatar
                  src="About/About5.jpg" // Replace with actual image path
                  alt="Perfume 3"
                  sx={{ width: 120, height: 120, margin: '0 auto', marginBottom: '1rem' }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    GUESS                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={3} style={{ padding: '1rem', textAlign: 'center' }}>
                <Avatar
                  src="About/About10.jpg" // Replace with actual image path
                  alt="Perfume 3"
                  sx={{ width: 120, height: 120, margin: '0 auto', marginBottom: '1rem' }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    Lattafa
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        <Container maxWidth="lg" style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Grid container spacing={4} justifyContent="center">
            {/* Card 1 */}
            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={3} style={{ padding: '1rem', textAlign: 'center' }}>
                <Avatar
                  src="About/About6.jpg" // Replace with actual image path
                  alt="Perfume 1"
                  sx={{ width: 120, height: 120, margin: '0 auto', marginBottom: '1rem' }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    Mugler
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* Card 2 */}
            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={3} style={{ padding: '1rem', textAlign: 'center' }}>
                <Avatar
                  src="About/About7.jpg" // Replace with actual image path
                  alt="Perfume 2"
                  sx={{ width: 120, height: 120, margin: '0 auto', marginBottom: '1rem' }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    Gucci
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* Card 3 */}
            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={3} style={{ padding: '1rem', textAlign: 'center' }}>
                <Avatar
                  src="About/About8.jpg" // Replace with actual image path
                  alt="Perfume 3"
                  sx={{ width: 120, height: 120, margin: '0 auto', marginBottom: '1rem' }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    DKNY
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* Card 4 */}
            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={3} style={{ padding: '1rem', textAlign: 'center' }}>
                <Avatar
                  src="About/About9.jpg" // Replace with actual image path
                  alt="Perfume 3"
                  sx={{ width: 120, height: 120, margin: '0 auto', marginBottom: '1rem' }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    YEEJOK
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={3} style={{ padding: '1rem', textAlign: 'center' }}>
                <Avatar
                  src="About/About11.jpg" // Replace with actual image path
                  alt="Perfume 3"
                  sx={{ width: 120, height: 120, margin: '0 auto', marginBottom: '1rem' }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    Pacifica
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        {/* Customer Experience Section */}
        <Grid container justifyContent="center" textAlign="center" className="customer-experience" sx={{ my: 5 }}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom sx={{
              background: 'linear-gradient(90deg, #8A2BE2, #DA70D6, #FF69B4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>
              Your Fragrance Journey
            </Typography>
            <Typography variant="body1" className="experience-text" paragraph>
              Discover the art of fragrance with <strong>Your Perfume Store</strong>—where each scent is a story, and every bottle is a journey. Enjoy our detailed scent descriptions, personalized recommendations, and an effortless online shopping experience.
            </Typography>
            <Button variant="contained" className="explore-btn" size="large" onClick={() => handleredirect()}>
              Explore Our Collection
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default About;

