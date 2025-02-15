import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { editproduct } from '../../../Redux/Slice/Slice';
import { TextField, Button, CircularProgress, Grid, Typography } from '@mui/material';
import './Editproduct.scss'; // Optional: Add custom styles here

const Editproduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, isLoading, error } = useSelector((state) => state.user);

    const [productData, setProductData] = useState({
        name: '',
        price: '',
        brand: '',
        image: '', // Base64 image will go here
        item_volume: '',
        special_feature: ''
    });

    // Fetch the current product data when the component mounts
    useEffect(() => {
        const product = data.find((product) => product.id === id);
        if (product) {
            setProductData(product);
        }
    }, [data, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            getBase64(file)
                .then((base64) => {
                    setProductData((prevData) => ({
                        ...prevData,
                        image: base64
                    }));
                })
                .catch((error) => {
                    console.error('Error converting image to base64', error);
                });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editproduct({ id, updatedData: productData }))
            .then(() => {
                navigate('/AdminDashboard');
            });
    };

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    if (isLoading) return <CircularProgress />;

    return (
        <div className="edit-product-form">
            <Typography variant="h4" align="center" gutterBottom>
                Edit Product
            </Typography>
            {error && (
                <Typography variant="body2" color="error" align="center" gutterBottom>
                    Error: {error}
                </Typography>
            )}

            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Product Name"
                            name="name"
                            value={productData.name}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Price"
                            name="price"
                            value={productData.price}
                            onChange={handleChange}
                            variant="outlined"
                            type="number"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Brand"
                            name="brand"
                            value={productData.brand}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Item Volume"
                            name="item_volume"
                            value={productData.item_volume}
                            onChange={handleChange}
                            variant="outlined"
                            type="text"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Special Feature"
                            name="special_feature"
                            value={productData.special_feature}
                            onChange={handleChange}
                            variant="outlined"
                            type="text"
                        />
                    </Grid>

                    {/* Image Upload Field */}
                    <Grid item xs={12}>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                            style={{ margin: '10px 0' }}
                        />
                        {productData.image && (
                            <div>
                                <img
                                    src={productData.image}
                                    alt="Uploaded"
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                />
                            </div>
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            type="submit"
                        >
                            Save Changes
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default Editproduct;