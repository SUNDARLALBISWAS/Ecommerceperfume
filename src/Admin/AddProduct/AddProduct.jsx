import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Stack } from '@mui/material';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { addproduct } from '../../Redux/Slice/Slice';
import { useNavigate } from 'react-router-dom';
import './AddProduct.scss';

const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [inputData, setInputData] = useState({
        name: "",
        price: "",
        brand: "",
        item_volume: "",
        special_feature: ""
    });

    const [errors, setErrors] = useState({});
    const [image, setImage] = useState("");

    const validateField = (name, value) => {
        let error = "";
        if (!value) {
            error = "Required Field";
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputData((prevData) => ({ ...prevData, [name]: value }));
        validateField(name, value);
    };

    const handleImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const isFormValid = () => {
        return (
            Object.values(inputData).every((field) => field) &&
            Object.values(errors).every((error) => !error) &&
            image
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isFormValid()) {
            Swal.fire({
                title: 'Error',
                text: 'Please complete all fields correctly.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const formData = { ...inputData, image };
        dispatch(addproduct(formData)).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                Swal.fire({
                    title: 'Success',
                    text: 'Product added successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                navigate("/AdminDashboard");
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to add product.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    };

    return (
        <Box component="form" className="addproduct-form" onSubmit={handleSubmit}>
            <Typography variant="h5" align="center" className="form-title">
                Add Product
            </Typography>
            <Stack spacing={2} className="form-fields">
                {['name', 'price', 'brand', 'item_volume', 'special_feature'].map((field) => (
                    <TextField
                        key={field}
                        label={`Product ${field.replace('_', ' ').replace(/^\w/, c => c.toUpperCase())}`}
                        name={field}
                        variant="outlined"
                        fullWidth
                        required
                        value={inputData[field]}
                        onChange={handleChange}
                        error={!!errors[field]}
                        helperText={errors[field] || ''}
                    />
                ))}

                <Button variant="contained" component="label" color="secondary" className="upload-btn">
                    Upload Image
                    <input type="file" hidden accept="image/*" onChange={handleImage} />
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    className="submit-btn"
                    disabled={!isFormValid()}
                >
                    Add Product
                </Button>
            </Stack>
        </Box>
    );
};

export default AddProduct;
