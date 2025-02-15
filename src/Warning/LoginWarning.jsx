import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginWarning = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/Login'); // Redirect to login page
    };

    const handleGoBack = () => {
        navigate('/AllProduct'); // Go back to the AllProduct page
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '76vh',  // Full viewport height for vertical centering
                backgroundColor: '#f7f7f7',  // Soft background color for contrast
                padding: 4,
            }}
        >
            <Box
                sx={{
                    backgroundColor: '#fff',  // White background for the card
                    padding: '2rem',
                    borderRadius: '16px',
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
                    maxWidth: 600,  // Card's maximum width
                    width: '90%',  // Ensure the card is responsive
                    textAlign: 'center',
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 'bold',
                        mb: 2,
                        color: '#ff6b6b',
                        background: 'linear-gradient(90deg, #ff6b6b, #f0c27b)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Oops! You need to log in
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: '#666',
                        mb: 3,
                        lineHeight: 1.6,
                    }}
                >
                    You must be logged in to add items to your cart. Please log in to continue shopping and enjoy our exclusive offers!
                </Typography>
                <Box display="flex" justifyContent="center" gap={2}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#ff6b6b',
                            color: '#fff',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 12px rgba(255, 107, 107, 0.3)',
                            ':hover': {
                                backgroundColor: '#ff8a65',
                            },
                        }}
                        onClick={handleLogin}
                    >
                        Login Now
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            color: '#ff6b6b',
                            borderColor: '#ff6b6b',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            ':hover': {
                                borderColor: '#ff8a65',
                                color: '#ff8a65',
                                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                            },
                        }}
                        onClick={handleGoBack}
                    >
                        Go Back
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginWarning;
