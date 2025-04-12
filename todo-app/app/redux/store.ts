'use client'
import todoSliceReducer from "./slices/todoSlice";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        todos: todoSliceReducer,
    },
});
