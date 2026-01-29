import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const createPayment = createAsyncThunk(
  "payment/create",
  async ({ amount, bookingId }, { rejectWithValue }) => {
    try {
      const { data: keyData } = await axios.get("/api/v1/getKey");

      const { data: orderData } = await axios.post(
        "/api/v1/payment/process",
        { amount, bookingId },
        { headers: { Authorization: localStorage.getItem("token") } }
      );

      return {
        key: keyData.key,
        order: orderData,
        bookingId
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchUserPayments = createAsyncThunk(
  "payment/user",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/user/payments", {
        headers: { Authorization: localStorage.getItem("token") }
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const fetchOwnerPayments = createAsyncThunk(
  "payment/owner",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/owner/payments", {
        headers: { Authorization: localStorage.getItem("token") }
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const fetchAdminPayments = createAsyncThunk(
  "payment/admin",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/admin/payments", {
        headers: { Authorization: localStorage.getItem("token") }
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    order: null,
    payments: [],
    loading: false,
    errors: null
  },
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(fetchUserPayments.pending, (state) => {
        state.loading = true;
        state.payments = [];
      })
      .addCase(fetchUserPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchUserPayments.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(fetchOwnerPayments.pending, (state) => {
        state.loading = true;
        state.payments = [];
      })
      .addCase(fetchOwnerPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchOwnerPayments.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(fetchAdminPayments.pending, (state) => {
        state.loading = true;
        state.payments = [];
      })
      .addCase(fetchAdminPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchAdminPayments.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
  }
});

export const { clearOrder } = paymentSlice.actions;
export default paymentSlice.reducer;
