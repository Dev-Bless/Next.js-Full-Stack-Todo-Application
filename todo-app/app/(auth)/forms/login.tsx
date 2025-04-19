'use client';

import React from 'react';
import {useRouter} from 'next/navigation';
import {useSelector} from 'react-redux';
import {loginUser, setLoginForm} from '@/app/redux/slices/authSlice';
import {AppDispatch, RootState} from '@/app/redux/store';
import Button from "@/app/components/ui/button/button";
import Link from "next/link";
import toast from "react-hot-toast";
import {useAppDispatch} from "@/app/redux/hooks/hooks";

const LoginForm = () => {
    const router = useRouter();
    const dispatch: AppDispatch = useAppDispatch();
    const {loading, loginForm, isFormValid} = useSelector((state: RootState) => state.auth);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await dispatch(loginUser(loginForm));

            if (loginUser.fulfilled.match(result)) {
                if (result.payload?.token) {
                    toast.success("Login successful!");
                    router.push("/dashboard");
                } else {
                    toast.error("Login failed: Invalid response format");
                }
            } else {
                toast.error("Login failed");
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        dispatch(setLoginForm({field: id, value}));
    };


    return (
        <div className="container flex items-center justify-center min-h-screen p-10">
            <div className=" shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Login here!</h1>
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
                            value={loginForm.email}
                            onChange={handleChange}
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
                            value={loginForm.password}
                            onChange={handleChange}
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
                        isLoading={loading}
                        disabled={!isFormValid || loading}
                        type="submit"
                    >
                        Sign in
                    </Button>

                    <div className="text-center text-sm">
                        Don't have an account?{" "}
                        <Link href="/register" className="text-blue-600 hover:underline">
                            Register now
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;