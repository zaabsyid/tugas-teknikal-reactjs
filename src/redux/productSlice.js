import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../services/api';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await api.getProducts();
    return response.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (product) => {
    const response = await api.createProduct(product);
    return response.data;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, product }) => {
    const response = await api.updateProduct(id, product);
    return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
    await api.deleteProduct(id);
    return id;
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.items.findIndex(product => product.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter(product => product.id !== action.payload);
            });
    }
});

export default productSlice.reducer;