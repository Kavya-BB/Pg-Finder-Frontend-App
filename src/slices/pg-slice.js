import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../config/axios';

export const fetchPgData = createAsyncThunk("pg/fetchPgData", async (undefined, { rejectWithValue }) => {
    try {
        const response = await axios.get('/get/allpgs', { headers: { Authorization: localStorage.getItem('token')} });
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }
});

export const fetchPublicPgData = createAsyncThunk("pg/fetchPublicPgData", async (undefined, { rejectWithValue }) => {
    try {
        const response = await axios.get('/get/pglists', { headers: { Authorization: localStorage.getItem('token')} });
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }
});

const pgSlice = createSlice({
    name: 'pg',
    initialState: {
        data: [],
        errors: null,
        loading: false
    },
    reducers: {
        resetPg: (state) => {
            state.data = [];
            state.errors = null;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPgData.pending, (state, action) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(fetchPgData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.errors = null;
            })
            .addCase(fetchPgData.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(fetchPublicPgData.pending, (state, action) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(fetchPublicPgData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.errors = null;
            })
            .addCase(fetchPublicPgData.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            });
    }
});

export const { resetPg } = pgSlice.actions;

export default pgSlice.reducer;