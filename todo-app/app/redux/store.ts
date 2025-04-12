'use client'
import todoSliceReducer from "./slices/todoSlice";
import authReducer from "./slices/authSlice";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        todos: todoSliceReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;