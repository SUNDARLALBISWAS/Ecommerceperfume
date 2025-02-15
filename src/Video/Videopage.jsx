import React from 'react';
import { Container, Grid, Button } from '@mui/material';
import './Videopage.css';

const Videopage = () => {
    return (
        <Container fluid className="video-page-wrapper">
            <Grid container justifyContent="center" alignItems="center">
                <Grid item md={8} className="video-container">
                    <div className="video-overlay">
                        <h1 className="video-title">Discover Our Perfume Collection</h1>
                        <p className="video-description">
                            Watch our exclusive video to explore the scents that will transform your day.
                        </p>
                        <Button variant="contained" color="primary" href="/AllProduct" className="cta-button">
                            View Product
                        </Button>
                    </div>
                    <video autoPlay loop muted className="video-background">
                        <source src="About/Video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Videopage;
