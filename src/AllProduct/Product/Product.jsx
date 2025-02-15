import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { singleproduct } from '../../Redux/Slice/Slice';
import { Box, Typography, Modal, Button } from '@mui/material';
import './Product.scss';

const Product = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();  // Initialize navigate hook
    const { data } = useSelector((state) => state.user);
    const [open, setOpen] = useState(true); // Open modal by default

    useEffect(() => {
        if (id) {
            dispatch(singleproduct(id)); // Fetch data when component loads
        }
    }, [dispatch, id]);

    // Handle close and navigate to AllProduct page
    const handleClose = () => {
        setOpen(false);
        navigate('/AllProduct');  // Redirect to /AllProduct
    };

    return (
        <div className="product-container">
            <Modal open={open} onClose={handleClose}>
                <Box className="modal-box" sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: '12px',
                    transition: 'transform 0.3s ease-in-out',
                }}>
                    <div className="modal-content">
                        {data.image && (
                            <img src={data.image} alt="Product" className="product-image" />
                        )}
                        <Typography variant="h5" component="h2" className="product-title">
                            {data.name}
                        </Typography>
                        <Typography variant="h6" className="product-quantity">
                        <strong>Quantity: </strong>{data.item_volume}
                        </Typography>
                        <Typography variant="h6" className="product-brand">
                            <strong>Brand: </strong>{data.brand}
                        </Typography>
                        <Typography variant="h6" className="product-price">
                            <strong>Price: </strong>${data.price}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClose} // Call handleClose on button click
                            sx={{ marginTop: 2 }}
                        >
                            Close
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default Product;
