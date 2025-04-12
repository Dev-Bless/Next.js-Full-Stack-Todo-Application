export const validateLoginForm = (email: string, password: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && password.length >= 8;
};

export const validateRegisterForm = (username: string, email: string, password: string, confirmPassword: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
        username.length > 0 &&
        emailRegex.test(email) &&
        password.length >= 8 &&
        password === confirmPassword
    );
};