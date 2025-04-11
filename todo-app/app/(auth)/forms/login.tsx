'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import Button from "@/app/components/ui/button/button";
import {validateForm} from "@/app/libs/login-form";

const LoginForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    // Handle input changes
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setIsFormValid(validateForm(newEmail, password));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setIsFormValid(validateForm(email, newPassword));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setError('');

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);

            router.push('/sign-up');
        }, 2000);
    };

    return (
        <div className="container flex items-center justify-center min-h-screen p-10">
            <div className=" shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1 text-sm font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-1 text-sm font-medium">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                                Remember me
                            </label>
                        </div>
                        <a href="#" className="text-sm text-blue-600 hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    <Button
                        variant="default"
                        size="default"
                        isLoading={isLoading}
                        disabled={!isFormValid || isLoading}
                        type="submit"
                    >
                        Sign in
                    </Button>

                    <div className="text-center text-sm">
                        Don't have an account?{" "}
                        <Link href="/sign-up" className="text-blue-600 hover:underline">
                            Register now
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;