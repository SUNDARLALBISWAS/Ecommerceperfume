import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography, Card, CardContent, CardMedia, Divider, IconButton, Button } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { fetchdataaddtocart, deleteaddtocart } from '../../../Redux/Slice/Slice';
import './AddtoCart.scss';

const AddtoCart = () => {
    const userid = window.sessionStorage.getItem("id");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState([]);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        dispatch(fetchdataaddtocart()).then(result => {
            let found = result?.payload?.filter((x) => x.userid === userid);
            setState(found || []);

            const initialQuantities = {};
            found?.forEach((item) => {
                initialQuantities[item.id] = 1;
            });
            setQuantities(initialQuantities);
        }).catch(error => {
            console.log("Error", error);
        });
    }, [dispatch, userid]);

    const calculateTotalCartPrice = () => {
        return state.reduce((sum, item) => {
            const quantity = quantities[item.id] || 1;
            return sum + (Number(item.price) || 0) * quantity;
        }, 0);
    };

    const handleIncrease = (id) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [id]: (prevQuantities[id] || 1) + 1
        }));
    };

    const handleDecrease = (id) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [id]: Math.max((prevQuantities[id] || 1) - 1, 1)
        }));
    };

    const deleteItem = (id) => {
        dispatch(deleteaddtocart(id)).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                console.log("Product deleted successfully");

                // Fetch the updated cart data
                dispatch(fetchdataaddtocart()).then((updatedResult) => {
                    const updatedState = updatedResult?.payload?.filter((x) => x.userid === userid);
                    setState(updatedState || []); // Update state with the latest data
                });

                // After the state is updated, navigate to the AddtoCart page
                navigate('/addtocart');
            } else {
                console.error("Failed to delete product");
            }
        });
    };

    // Handle Place Order button click
    const placeOrder = () => {
        // Clear session storage
        sessionStorage.clear();

        // Clear cart data by dispatching an action
        state.forEach(item => {
            dispatch(deleteaddtocart(item.id));
        });

        // Redirect to the homepage
        navigate('/');
    };

    return (
        <Box className="add-to-cart-container">
            <Typography variant="h4" className="cart-header">
                Your Cart
            </Typography>

            {/* Check if the cart is empty */}
            {state.length === 0 ? (
                <Box sx={{ textAlign: 'center', mt: 5 }}>
                    <Typography variant="h6" sx={{ mb: 3 }}>
                        Your cart is empty! Please add some products to the cart.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/AllProduct')}
                        sx={{ fontSize: '16px', padding: 'px 20px' }}
                    >
                        Shopping Now
                    </Button>
                </Box>
            ) : (
                <>
                    <Box className="cart-items">
                        {state.map((item) => (
                            <Card key={item.id} className="cart-item-card">
                                <CardMedia
                                    component="img"
                                    image={item.image}
                                    alt={item.name}
                                    className="cart-item-media"
                                />
                                <CardContent className="cart-item-details">
                                    <Typography className="item-name">{item.name}</Typography>
                                    <Typography className="item-brand">Brand: {item.brand}</Typography>
                                    <Typography className="item-price">Unit Price: ${item.price}</Typography>

                                    {/* Quantity Controls */}
                                    <Box className="quantity-controls" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                        <IconButton onClick={() => handleDecrease(item.id)} color="primary">
                                            <Remove />
                                        </IconButton>
                                        <Typography variant="body1" sx={{ mx: 2 }}>{quantities[item.id]}</Typography>
                                        <IconButton onClick={() => handleIncrease(item.id)} color="primary">
                                            <Add />
                                        </IconButton>
                                        <IconButton onClick={() => deleteItem(item.id)} color="primary">
                                            <Delete />
                                        </IconButton>
                                    </Box>

                                    {/* Product Total Price */}
                                    <Typography className="item-total-price" sx={{ mt: 1, fontWeight: 'bold' }}>
                                        Total for this item: ${(item.price * quantities[item.id]).toFixed(2)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                        <Divider sx={{ my: 2 }} />

                        {/* Overall Total Price Section */}
                        <Box className="total-price-section" sx={{ mt: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Cart Total Price: ${calculateTotalCartPrice().toFixed(2)}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Place Order Button */}
                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={placeOrder}
                            sx={{ fontSize: '16px', padding: '10px 20px' }}
                        >
                            Place Order
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default AddtoCart;

