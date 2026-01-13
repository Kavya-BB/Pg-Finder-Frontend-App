import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const createRating = createAsyncThunk("rating/createRating", async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post("/rating", formData, {
            headers: { Authorization: localStorage.getItem("token")}
        });
        console.log(response.data);
        return response.data;
    } catch(err) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }
});

export const fetchPgRatings = createAsyncThunk("rating/fetchPgRatings", async (pgId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/rating/${pgId}`, {
            headers: { Authorization: localStorage.getItem("token")}
        });
        console.log(response.data);
        return response.data;
    } catch(err) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }
});

const ratingSlice = createSlice({
    name: "rating",
    initialState: {
        data: [],
        loading: false,
        errors: null,
        successMsg: ""
    },
    reducers: {
        clearRatingStatus: (state) => {
            state.data = [];
            state.errors = null;
            state.successMsg = "";
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRating.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(createRating.fulfilled, (state, action) => {
                state.loading = false;
                state.errors = null;
                state.successMsg = action.payload.message;
            })
            .addCase(createRating.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(fetchPgRatings.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(fetchPgRatings.fulfilled, (state, action) => {
                state.loading = false;
                state.errors = null;
                state.data = action.payload;
            })
            .addCase(fetchPgRatings.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
    }
});

export const { clearRatingStatus } = ratingSlice.actions;
export default ratingSlice.reducer;