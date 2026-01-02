import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const fetchAllBookings = createAsyncThunk("booking/fetchAllBookings", async (undefined, { rejectWithValue }) => {
    try {
        const response = await axios.get('/getAll/bookings', { headers: { Authorization: localStorage.getItem('token')} });
        console.log(response.data);
        return response.data.bookings;
    } catch(err) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }
});

export const fetchOwnerBookings = createAsyncThunk("booking/fetchOwnerBookings", async(undefined, { rejectWithValue }) => {
    try {
        const response = await axios.get('/getowner/bookings', { headers: { Authorization: localStorage.getItem("token") }});
        console.log(response.data);
        return response.data.bookings;
    } catch(err) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }
});

export const fetchUserBookings  = createAsyncThunk("booking/fetchUserBookings", async (undefined, { rejectWithValue }) => {
    try {
        const response = await axios.get('/getuser/bookings', { headers: { Authorization: localStorage.getItem("token") }});
        console.log(response.data);
        return response.data.bookings;
    } catch(err) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }
});

export const createBooking = createAsyncThunk("booking/createBooking", async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post('/create/booking', formData, { headers: { Authorization: localStorage.getItem("token") }});
        return response.data.booking;
    } catch(err) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }
});

export const confirmBooking  = createAsyncThunk("booking/confirmBooking", async (bookingId, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/confirm/${id}`, {}, { headers: { Authorization: localStorage.getItem("token") }});
        return response.data.booking;
    } catch(err) {
        console.log(err);
        return rejectWithValue(er4.response.data);
    }
});

export const cancelBooking = createAsyncThunk("booking/cancelBooking", async (bookingId, { rejectWithValue }) => {
    try{
        const response = await axios.put(`/cancel/${id}`, {}, {headers: { Authorization: localStorage.getItem("token") }});
        return response.data.booking;
    } catch(err) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }
})

const bookingSlice = createSlice({
    name: "booking",
    initialState: {
        data: [],
        loading: false,
        errors: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllBookings.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(fetchAllBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.errors = null;
            })
            .addCase(fetchAllBookings.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(fetchOwnerBookings.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(fetchOwnerBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.errors = null;
            })
            .addCase(fetchOwnerBookings.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(fetchUserBookings.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(fetchUserBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.errors = null;
            })
            .addCase(fetchUserBookings.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(createBooking.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.errors = null;
                state.data.unshift(action.payload);
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(confirmBooking.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(confirmBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.errors = null;
                const index = state.data.findIndex(ele => ele._id === action.payload._id);
                if(index !== -1) state.data[index] = action.payload;
            })
            .addCase(confirmBooking.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(cancelBooking.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(cancelBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.errors = null;
                const index = state.data.findIndex(ele => ele._id === action.payload._id);
                if(index !== -1) state.data[index] = action.payload;
            })
            .addCase(cancelBooking.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
    }
});

export default bookingSlice.reducer;