import { configureStore } from "@reduxjs/toolkit";
import pgReducer from "../slices/pg-slice";

const createStore = () => {
    return configureStore({
        reducer: {
            pg: pgReducer
        }
    });
}

export default createStore;