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

export const createPg = createAsyncThunk("pg/createPg", async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post("/pg/createpg", formData, { 
            headers: { 
                Authorization: localStorage.getItem('token')
            }
        });
        return response.data;
    } catch(err) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }
});

export const updatePg  = createAsyncThunk("pg/updatePg", async ({ id, formData }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/update/pg/${id}`, formData, { 
            headers: { 
                Authorization: localStorage.getItem('token')
            }
        });
        return response.data;
    } catch(err) {
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

export const approvePg  = createAsyncThunk("pg/approvePg", async ({ id, isApproved }, { rejectWithValue}) => {
    try {
        const response = await axios.put(`/approvePg/${id}`, { isApproved}, { headers: { Authorization: localStorage.getItem('token')}});
        console.log(response.data);
        return { id, isApproved: response.data.isApproved };
    } catch (err) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }
});

export const deletePg = createAsyncThunk("pg/deletePg", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/delete/pg/${id}`, { headers: { Authorization: localStorage.getItem('token')} });
        console.log(response.data);
        return response.data;
    } catch(err) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }
});

export const nearByPgs = createAsyncThunk("pg/nearByPgs", async ({ latitude, longitude, radius = 100 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/pgs/nearby?latitude=${latitude}&longitude=${longitude}&radius=${radius}`,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


const pgSlice = createSlice({
    name: 'pg',
    initialState: {
        data: [],
        selectedPg: null,
        errors: null,
        nearby: [],
        loading: false,
        searchText: ""
    },
    reducers: {
        resetPg: (state) => {
            state.data = [];
            state.selectedPg = null;
            state.nearby = [];
            state.errors = null;
            state.loading = false;
            state.searchText = "";
        },
        setSearchText: (state, action) => {
            state.searchText = action.payload;
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
            .addCase(createPg.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(createPg.fulfilled, (state, action) => {
                state.loading = false;
                state.data.push(action.payload);
                state.errors = null;
            })
            .addCase(createPg.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(updatePg.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(updatePg.fulfilled, (state, action) => {
                state.loading = false;
                const updatedPg = action.payload;
                const index = state.data.findIndex(pg => pg._id === updatedPg._id);
                if (index !== -1) state.data[index] = updatedPg;
                if (state.selectedPg?._id === updatedPg._id) state.selectedPg = updatedPg;
                state.errors = null;
            })
            .addCase(updatePg.rejected, (state, action) => {
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
                const { id, isVerified, isApproved } = action.payload;
                const pg = state.data.find(pg => pg._id === id);
                if (pg) {
                    pg.isVerified = isVerified;
                    pg.isApproved = isApproved;
                }
                if(state.selectedPg?._id === id) {
                    state.selectedPg.isVerified = isVerified;
                    state.selectedPg.isApproved = isApproved;
                }
                state.errors = null;
            })
            .addCase(verifyPgCertificate.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(approvePg.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(approvePg.fulfilled, (state, action) => {
                state.loading = false;
                const { id, isApproved } = action.payload;
                const pg = state.data.find(pg => pg._id === id);
                if (pg) {
                    pg.isApproved = isApproved;
                }
                if(state.selectedPg && state.selectedPg._id === id) {
                    state.selectedPg.isApproved = isApproved;
                }
                state.errors = null;
            })
            .addCase(approvePg.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(deletePg.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(deletePg.fulfilled, (state, action) => {
                state.loading = false;
                const deletedPgId = action.payload._id || action.payload.pg?._id;
                state.data = state.data.filter(pg => pg._id !== deletedPgId);
                if(state.selectedPg?._id === deletedPgId) {
                    state.selectedPg = null;
                }
                state.errors = null;
            })
            .addCase(deletePg.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(nearByPgs.pending, (state) => {
            state.loading = true;
            state.errors = null;
            })
            .addCase(nearByPgs.fulfilled, (state, action) => {
            state.loading = false;
            state.nearby = action.payload;
            })
            .addCase(nearByPgs.rejected, (state, action) => {
            state.loading = false;
            state.errors = action.payload;
            })
    }
});

export const { resetPg, setSearchText } = pgSlice.actions;

export default pgSlice.reducer;