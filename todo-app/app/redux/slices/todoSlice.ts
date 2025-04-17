'use client'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Todo} from "@/app/backend/entities/todo";

interface todoState {
    todos: Todo[]
    todoForm: {
        todo: string
    }
    loading: boolean
    error: string | null
}

const initialState: todoState = {
    todos: [],
    todoForm: {
        todo: ''
    },
    loading: false,
    error: null,
}

export const addTodo = createAsyncThunk(
    'todos/add',
    async (task: string, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                return rejectWithValue('No authentication token found');
            }

            const todoData = {task};

            const response = await fetch('/api/todo/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(todoData)
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to add todo');
            }

            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchTodos = createAsyncThunk(
    'todos/fetch',
    async (_, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                return rejectWithValue('No authentication token found');
            }

            const response = await fetch('/api/todo/all', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to fetch todos');
            }

            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteTodo = createAsyncThunk(
    'todos/delete',
    async (id: string, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                return rejectWithValue('No authentication token found');
            }

            const response = await fetch(`/api/todo/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const data = await response.json();
                return rejectWithValue(data.message || 'Failed to delete todo');
            }

            return id;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);


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
        },
        setTodoForm: (state, action: PayloadAction<{ field: string; value: string }>) => {
            const {field, value} = action.payload;
            state.todoForm = {
                ...state.todoForm,
                [field]: value,
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.loading = false;
            state.todos = action.payload;
        });
        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        builder.addCase(addTodo.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addTodo.fulfilled, (state, action) => {
            state.loading = false;
            state.todos.push(action.payload);
            state.todoForm.todo = '';
        });
        builder.addCase(addTodo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        builder.addCase(deleteTodo.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteTodo.fulfilled, (state, action) => {
            state.loading = false;
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        });
        builder.addCase(deleteTodo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    }
});

export const {setLoading, setError, setTodos, setTodoForm} = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
export default todoSlice.reducer;