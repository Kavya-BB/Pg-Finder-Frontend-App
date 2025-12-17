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

export const fetchPgById  = createAsyncThunk("pg/fetchPgById", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/get/pgById/${id}`, { headers: { Authorization: localStorage.getItem('token')} });
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }
});

export const verifyPgCertificate  = createAsyncThunk("pg/verifyPgCertificate", async ({ id, isVerified }, { rejectWithValue}) => {
    try {
        const response = await axios.put(`/verify/${id}`, { isVerified}, { headers: { Authorization: localStorage.getItem('token')}});
        console.log(response.data);
        return { id, isVerified: response.data.isVerified };
    } catch (err) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }
});

const pgSlice = createSlice({
    name: 'pg',
    initialState: {
        data: [],
        selectedPg: null,
        errors: null,
        loading: false
    },
    reducers: {
        resetPg: (state) => {
            state.data = [];
            state.selectedPg = null;
            state.errors = null;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPgData.pending, (state) => {
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
            .addCase(fetchPublicPgData.pending, (state) => {
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
            })
            .addCase(fetchPgById.pending, (state) => {
                state.loading = true;
                state.errors = null;
                state.selectedPg = null;
            })
            .addCase(fetchPgById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedPg = action.payload;
                state.errors = null;
            })
            .addCase(fetchPgById.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(verifyPgCertificate.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(verifyPgCertificate.fulfilled, (state, action) => {
                state.loading = false;
                const { id, isVerified } = action.payload;
                const pgIndex = state.data.findIndex(pg => pg._id === id);
                if (pgIndex !== -1) {
                    state.data[pgIndex].isVerified = isVerified;
                }
                if(state.selectedPg && state.selectedPg._id === id) {
                    state.selectedPg.isVerified = isVerified;
                }
                state.errors = null;
            })
            .addCase(verifyPgCertificate.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            });
    }
});

export const { resetPg } = pgSlice.actions;

export default pgSlice.reducer;