import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const createPayment = createAsyncThunk("payment/create", async ({ amount, bookingId }, { rejectWithValue }) => {
    try {
        const { data: keyData } = await axios.get('/api/v1/getKey');
        const { data: orderData } = await axios.post("/api/v1/payment/process", { amount, bookingId }, { headers: { Authorization: localStorage.getItem("token") }});
        return {
            key: keyData.key,
            order: orderData.order,
            bookingId
        };
    } catch(err) {
        console.log(err);
        return rejectWithValue(err.response?.data || err.message);
    }
});

const paymentSlice = createSlice({
    name: "payment",
    initialState: {
        order: null,
        loading: false,
        errors: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPayment.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(createPayment.fulfilled, (state, action) => {
                state.loading = false;
                state.errors = null;
                state.order = action.payload;
            })
            .addCase(createPayment.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
    }
});

export default paymentSlice.reducer;