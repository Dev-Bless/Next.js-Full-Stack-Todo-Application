import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "@reduxjs/toolkit/query";
import {AuthState} from "@/app/types/auth";
import {validateLoginForm, validateRegisterForm} from '@/app/libs/login-form';

const initialState: AuthState = {
    user: null,
    token: null,
    registerForm: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    },
    loginForm: {
        email: '',
        password: ''
    },
    isFormValid: false,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials: { email: string; password: string }, {rejectWithValue}) => {
        try {
            const {data} = await axios.post("/api/auth/login", credentials);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.message || "Login failed");
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/register",
    async (credentials: any, {rejectWithValue}) => {
        try {
            const {data} = await axios.post("api/auth/register", credentials)
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.message || "Register failed");
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
        setRegisterForm: (state, action: PayloadAction<{ field: string; value: string }>) => {
            const {field, value} = action.payload;
            state.registerForm = {
                ...state.registerForm,
                [field]: value,
            };
            const {username, email, password, confirmPassword} = state.registerForm;

            const validated = validateRegisterForm(username, email, password, confirmPassword);

            state.isFormValid =
                username.length > 0 &&
                validated &&
                password === confirmPassword;
        },
        resetForm: (state) => {
            state.registerForm = initialState.registerForm;
            state.isFormValid = initialState.isFormValid;
            state.error = initialState.error;
        },
        setLoginForm: (state, action: PayloadAction<{ field: string; value: string }>) => {
            const {field, value} = action.payload;
            state.loginForm = {
                ...state.loginForm,
                [field]: value,
            }

            const {email, password} = state.loginForm;

            state.isFormValid = validateLoginForm(email, password);
        },
        resetLoginForm: (state) => {
            state.loginForm = initialState.loginForm;
            state.isFormValid = initialState.isFormValid;
            state.error = initialState.error;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {logout, setRegisterForm, resetForm, setLoginForm, resetLoginForm} = authSlice.actions;
export const selectAuth = (state: RootState<any, any, any>) => state.auth;
export default authSlice.reducer;