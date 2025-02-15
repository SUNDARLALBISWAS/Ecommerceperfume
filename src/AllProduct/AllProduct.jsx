import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box, Pagination, TextField, MenuItem, Select,InputLabel,FormControl} from '@mui/material';
import { fetchproduct, fetchaddtocart } from '../Redux/Slice/Slice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AllProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: products } = useSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
    const userid = window.sessionStorage.getItem("id");

    useEffect(() => {
        dispatch(fetchproduct());
    }, [dispatch]);

    useEffect(() => {
        setCurrentPage(1); // Reset to page 1 when search term or sort order changes
    }, [searchTerm, sortOrder]);

    const isProductsArray = Array.isArray(products);

    const handleAddToCart = (product) => {
        const cartdetails = { ...product, userid: userid };
        dispatch(fetchaddtocart(cartdetails)).then((response) => {
            if (response.meta.requestStatus === "fulfilled") {
                navigate('/AddtoCart');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to add to cart. Please try again.',
                });
            }
        });
    };

    const handleViewDetails = (productId) => {
        navigate(`/Singleproduct/${productId}`);
    };

    const handlePageChange = (_, value) => {
        setCurrentPage(value);
    };

    const reFresh = () => {
        window.location.reload();
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    const filteredProducts = isProductsArray ? products
        .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortOrder === 'low-to-high') return a.price - b.price;
            if (sortOrder === 'high-to-low') return b.price - a.price;
            return 0;
        }) : [];

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <Box sx={{ backgroundColor: '#f7f9fc', padding: 4 }}>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    mb: 4,
                    background: 'linear-gradient(90deg, #ff69b4, #8a2be2, #20b2aa)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                Our Exclusive Products
            </Typography>

            <Box display="flex" alignItems="center" justifyContent="space-between" mb={4} flexWrap="wrap">
                {/* Search Field on the Left */}
                <TextField
                    variant="outlined"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{
                        width: '250px',
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: '#8a2be2' },
                            '&:hover fieldset': { borderColor: '#6b1fb8' },
                        },
                    }}
                />

                {/* Centered Sort Menu */}
                <FormControl
                    variant="outlined"
                    sx={{
                        width: '180px',
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: '#8a2be2' },
                            '&:hover fieldset': { borderColor: '#6b1fb8' },
                            '&.Mui-focused fieldset': { borderColor: '#8a2be2' },
                        },
                    }}
                >
                    <InputLabel
                        sx={{
                            color: '#8a2be2',
                            '&.Mui-focused': {
                                color: '#8a2be2',
                            },
                        }}
                    >
                        Sort by Price
                    </InputLabel>
                    <Select
                        value={sortOrder}
                        onChange={handleSortChange}
                        label="Sort by Price"
                        sx={{
                            color: '#8a2be2',
                        }}
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="low-to-high">Low to High</MenuItem>
                        <MenuItem value="high-to-low">High to Low</MenuItem>
                    </Select>
                </FormControl>

                {/* Refresh Button on the Right */}
                <Button
                    variant="contained"
                    sx={{
                        fontWeight: 'bold',
                        textTransform: 'none',
                        bgcolor: '#8a2be2',
                        color: '#fff',
                        ':hover': { bgcolor: '#6b1fb8' },
                        borderRadius: '8px',
                    }}
                    onClick={reFresh}
                >
                    Refresh
                </Button>
            </Box>

            <Box display="flex" flexWrap="wrap" gap={4} justifyContent="center">
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <Card
                            key={product.id}
                            sx={{
                                maxWidth: 320,
                                boxShadow: 3,
                                borderRadius: 3,
                                padding: 2,
                                textAlign: 'center',
                                transition: 'transform 0.3s',
                                ':hover': { transform: 'scale(1.05)', boxShadow: 6 },
                                overflow: 'hidden',
                                bgcolor: '#fff',
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={product.image}
                                alt={product.name}
                                sx={{
                                    width: 140,
                                    height: 140,
                                    borderRadius: '50%',
                                    objectFit: 'contain',
                                    margin: '0 auto',
                                    boxShadow: 2,
                                }}
                            />
                            <CardContent>
                                <Typography variant="h6" color="text.primary" sx={{ fontWeight: 'bold' }}>
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Brand: {product.brand}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Price: ${product.price}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'center', gap: 1 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ fontWeight: 'bold', textTransform: 'none' }}
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Add to Cart
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    sx={{ fontWeight: 'bold', textTransform: 'none' }}
                                    onClick={() => handleViewDetails(product.id)}
                                >
                                    View Details
                                </Button>
                            </CardActions>
                        </Card>
                    ))
                ) : (
                    <Typography variant="h6" color="text.secondary" textAlign="center">
                        No products found
                    </Typography>
                )}
            </Box>

            {filteredProducts.length > productsPerPage && (
                <Box display="flex" justifyContent="center" mt={4}>
                    <Pagination
                        count={Math.ceil(filteredProducts.length / productsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        shape="rounded"
                        sx={{
                            '& .MuiPaginationItem-root': {
                                fontWeight: 'bold',
                            },
                        }}
                    />
                </Box>
            )}
        </Box>
    );
};

export default AllProduct;
