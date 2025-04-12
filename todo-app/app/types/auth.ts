export interface AuthState {
    user: null | { email: string };
    token: string | null;
    registerForm: {
        username: string,
        email: string,
        password: string,
        confirmPassword: string,
    };
    loginForm: {
        email: string,
        password: string
    };
    isFormValid: boolean;
    loading: boolean;
    error: string | null;
}