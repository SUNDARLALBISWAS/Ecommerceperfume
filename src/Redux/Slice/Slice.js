import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import base_url from "../../Api/api";
import { end_point } from "../../Api/api";

let aug = base_url + end_point.authentication;
let pro = base_url + end_point.product;
let addtocart = base_url + end_point.addtoc;

console.log("api", pro);

const initial_value = {
    isLoading: false,
    status: 0,
    data: [],
    error: null,
};

// Register
export const fetchauthentication = createAsyncThunk("user/fetchauthentication",
    async (userdata) => {
        const response = await axios.post(aug, userdata);
        return {
            status: response.status,
            data: response.data
        };
    }
);

// Login
export const fetchlogin = createAsyncThunk("user/fetchlogin",
    async ({ email, pwd, role }) => {
        const response = await axios.get(`${aug}?email=${email}&pwd=${pwd}&role=${role}`);
        return {
            status: response.status,
            data: response.data
        };
    }
);

// Profile
export const fetchprofile = createAsyncThunk("user/fetchprofile",
    async (id) => {
        const response = await axios.get(`${aug}/${id}`);
        console.log("Profile", response);
        return {
            status: response.status,
            data: response.data
        };
    }
);

// AddProduct
export const addproduct = createAsyncThunk("prod/addproduct",
    async (adddata) => {
        const response = await axios.post(pro, adddata);
        return {
            status: response.status,
            data: response.data
        };
    }
);

// DeleteProduct
export const deleteproduct = createAsyncThunk("prod/deleteproduct",
    async (id) => {
        const response = await axios.delete(`${pro}/${id}`);
        return {
            status: response.status
        };
    }
);

// DeleteAddtoCart
export const deleteaddtocart = createAsyncThunk("addtocart/deleteaddtocart",
    async (id) => {
        const response = await axios.delete(`${addtocart}/${id}`);
        return {
            status: response.status
        };
    }    
)

// EditProduct
export const editproduct = createAsyncThunk("prod/editproduct",
    async ({ id, updatedData }) => {
        const response = await axios.put(`${pro}/${id}`, updatedData);
        return {
            status: response.status,
            data: response.data
        };
    }
);

// Addtocart
export const fetchaddtocart = createAsyncThunk("addtocart/fetchaddtocart",
    async (addto) => {
        const response = await axios.post(addtocart, addto);
        return {
            status: response.status,
            data: response.data
        };
    }
);

// Fetchdata for Addtocart
export const fetchdataaddtocart = createAsyncThunk("dataaddtocart/fetchdataaddtocart",
    async () => {
        const response = await axios.get(addtocart);
        return response.data
    }
)

// AllProduct
export const fetchproduct = createAsyncThunk("user/fetchproduct",
    async () => {
        const response = await axios.get(pro);
        console.log("Axios Response for Product Api", response);
        return Array.isArray(response.data) ? response.data : [];
    }
);

// SingleProduct
export const singleproduct = createAsyncThunk("user/singleproduct",
    async (id) => {
        const response = await axios.get(`${pro}/${id}`);
        console.log("Singleproduct", response);
        return {
            status: response.status,
            data: response.data
        };
    }
);

// Update Cart Quantity
export const updateCartQuantity = createAsyncThunk(
    "cart/updateCartQuantity",
    async ({ id, quantity }) => {
        const response = await axios.patch(`${addtocart}/${id}`, { quantity });
        return {
            status: response.status,
            data: response.data,
        };
    }
);

// Delete Cart Item
export const deleteCartItem = createAsyncThunk(
    "cart/deleteCartItem",
    async (id) => {
        const response = await axios.delete(`${addtocart}/${id}`);
        return {
            status: response.status,
            id,
        };
    }
);

export const authSlice = createSlice({
    name: "user",
    initialState: initial_value,

    extraReducers: (builder) => {

        // Registration
        builder.addCase(fetchauthentication.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchauthentication.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload?.status || 200;
            state.data = action.payload?.data || [];
            state.error = null;
        });
        builder.addCase(fetchauthentication.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // Login
        builder.addCase(fetchlogin.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchlogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload?.status || 200;
            state.data = action.payload?.data || [];
            state.error = null;
        });
        builder.addCase(fetchlogin.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // Profile
        builder.addCase(fetchprofile.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchprofile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload?.status || 200;
            state.data = action.payload?.data || [];
            state.error = null;
        });
        builder.addCase(fetchprofile.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // AddProduct
        builder.addCase(addproduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addproduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload?.status || 200;
            state.data = action.payload?.data || [];
            state.error = null;
        });
        builder.addCase(addproduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // DeleteProduct 
        builder.addCase(deleteproduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteproduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = state.data.filter((product) => product.id !== action.payload.id);
            state.status = action.payload.status;
            state.error = null;
        });
        builder.addCase(deleteproduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // Delete product from add to cart
        builder.addCase(deleteaddtocart.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteaddtocart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = state.data.filter((product) => product.id !== action.payload.id);
            state.status = action.payload.status;
            state.error = null;
        });
        builder.addCase(deleteaddtocart.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // EditProduct
        builder.addCase(editproduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(editproduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload?.status || 200;

            // Update the product in the state by replacing the old product with the updated one
            const updatedProduct = action.payload?.data;
            state.data = state.data.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
            );

            state.error = null;
        });
        builder.addCase(editproduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });


        // Addtocart
        builder.addCase(fetchaddtocart.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchaddtocart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload?.status || 200;
            state.data = action.payload?.data || [];
            state.error = null;
        });
        builder.addCase(fetchaddtocart.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // Addtocart data fetch
        builder.addCase(fetchdataaddtocart.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchdataaddtocart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload?.status || 200;
            state.data = action.payload?.data || [];
            state.error = null;
        });
        builder.addCase(fetchdataaddtocart.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // AllProduct
        builder.addCase(fetchproduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchproduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = 200;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(fetchproduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });


        // Singleproduct
        builder.addCase(singleproduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(singleproduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload?.status || 200;
            state.data = action.payload?.data || [];
            state.error = null;
        });
        builder.addCase(singleproduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });


        // Update Cart Quantity
        builder.addCase(updateCartQuantity.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateCartQuantity.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload?.status || 200;

            // Find and update the item quantity in the cart data
            const updatedCartItem = action.payload.data;
            state.data = state.data.map((item) =>
                item.id === updatedCartItem.id ? updatedCartItem : item
            );

            state.error = null;
        });
        builder.addCase(updateCartQuantity.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });


        // Delete Cart Item
        builder.addCase(deleteCartItem.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteCartItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload.status;

            // Remove the item from cart data
            state.data = state.data.filter((item) => item.id !== action.payload.id);

            state.error = null;
        });
        builder.addCase(deleteCartItem.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export default authSlice.reducer;
