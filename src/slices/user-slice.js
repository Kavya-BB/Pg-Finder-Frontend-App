import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const updateUserProfile = createAsyncThunk("user/updateUserProfile", async ({ id, formData }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/user/update/${id}`, { formData }, { headers: { Authorization: localStorage.getItem('token')} });
        return response.data;
    } catch(err) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }
});

const userSclice = createSlice({
    name: 'user',
    initialState: {
        data: [],
        errors: null,
        loading: false
    },
    reducers: {
        resetUser: (state) => {
            state.data = [];
            state.loading = false;
            state.errors = null;
        }
    }, extraReducers: (builder) => {
        builder
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.errors = null;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
    }
});

export const { resetUser } = userSclice.actions;

export default userSclice.reducer;