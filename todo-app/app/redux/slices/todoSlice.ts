'use client'
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    todos: [],
    loading: false,
    error: null,
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setTodos: (state, action) => {
            state.todos = action.payload
        }
    }
});

export const {setLoading, setError, setTodos} = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
export default todoSlice.reducer;