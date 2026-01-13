import { configureStore } from "@reduxjs/toolkit";
import pgReducer from "../slices/pg-slice";
import userReducer from "../slices/user-slice";
import bookingReducer from "../slices/booking-slice";
import ratingReducer from "../slices/rating-slice";

const createStore = () => {
    return configureStore({
        reducer: {
            pg: pgReducer,
            user: userReducer,
            booking: bookingReducer,
            rating: ratingReducer
        }
    });
}

export default createStore;