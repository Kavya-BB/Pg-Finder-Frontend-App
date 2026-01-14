import { configureStore } from "@reduxjs/toolkit";
import pgReducer from "../slices/pg-slice";
import userReducer from "../slices/user-slice";
import bookingReducer from "../slices/booking-slice";
import ratingReducer from "../slices/rating-slice";
import paymentReducer from "../slices/payment-slice";

const createStore = () => {
    return configureStore({
        reducer: {
            pg: pgReducer,
            user: userReducer,
            booking: bookingReducer,
            rating: ratingReducer,
            payment: paymentReducer
        }
    });
}

export default createStore;