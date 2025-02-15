import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Avatar, TextField, Box, Pagination, Modal, Typography } from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteproduct, fetchproduct, singleproduct } from '../Redux/Slice/Slice';
import { Link } from 'react-router-dom';
import './AdminDashboard.scss';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { data: products = [], singleData } = useSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const itemsPerPage = 6;

    useEffect(() => {
        dispatch(fetchproduct());
    }, [dispatch]);

    const deleteItem = (id) => {
        dispatch(deleteproduct(id)).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                console.log("Product deleted successfully");
                dispatch(fetchproduct());
            } else {
                console.error("Failed to delete product");
            }
        });
    };

    const handleViewClick = (id) => {
        dispatch(singleproduct(id)).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                setSelectedProduct(result.payload.data);
                setOpen(true);
            }
        });
    };

    const filteredProducts = Array.isArray(products)
        ? products.filter((product) => {
            if (searchTerm === "") {
                return product;
            } else if (product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return product;
            }
            return null;
        })
        : [];

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedProduct(null);
        dispatch(fetchproduct());
    };

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-heading">
                <span className="tricolor-heading">Admin Dashboard</span>
            </h2>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <TextField
                    label="Search Products"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-field"
                />
                <Link to={`/AddProduct`}>
                    <Button
                        variant="contained"
                        color="primary"
                        className="add-product-button"
                    >
                        Add Product
                    </Button>
                </Link>
            </Box>
            <TableContainer component={Paper} className="dashboard-table-container">
                <Table aria-label="admin dashboard table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" className="table-header">Image</TableCell>
                            <TableCell align="center" className="table-header">Product Name</TableCell>
                            <TableCell align="center" className="table-header">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedProducts.map((product) => (
                            <TableRow key={product.id} className="table-row">
                                <TableCell align="center">
                                    <Avatar
                                        src={product.image}
                                        alt={product.name}
                                        sx={{ width: 60, height: 60 }}
                                    />
                                </TableCell>
                                <TableCell align="center" className="product-name">{product.name}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="contained"
                                        color="success"
                                        className="action-button view-button"
                                        onClick={() => handleViewClick(product.id)}
                                        startIcon={<Visibility />}
                                    >
                                        View
                                    </Button>
                                    <Link to={`/Editpage/${product.id}`}>
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            className="action-button edit-button"
                                            startIcon={<Edit />}
                                        >
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        className="action-button delete-button"
                                        onClick={() => deleteItem(product.id)}
                                        startIcon={<Delete />}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <Box display="flex" justifyContent="center" mt={3}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>

            {/* Centered Modal for Viewing Product */}
            <Modal open={open} onClose={handleClose}>
                <Box
                    className="modal-box"
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        borderRadius: '8px',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    {selectedProduct && (
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                {selectedProduct.name}
                            </Typography>
                            <Avatar
                                src={selectedProduct.image}
                                alt={selectedProduct.name}
                                sx={{ width: 120, height: 120, margin: '0 auto 20px' }}
                            />
                            <Typography>Brand: {selectedProduct.brand}</Typography>
                            <Typography>Price: ${selectedProduct.price}</Typography>
                            <Typography>Volume: {selectedProduct.item_volume}</Typography>
                            <Button onClick={handleClose} variant="contained" color="primary" sx={{ mt: 3 }}>
                                Close
                            </Button>
                        </Box>
                    )}
                </Box>
            </Modal>
        </div>
    );
};

export default AdminDashboard;
