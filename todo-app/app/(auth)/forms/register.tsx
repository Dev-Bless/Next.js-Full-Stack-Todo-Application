'use client'
import Button from "@/app/components/ui/button/button";
import Link from "next/link";
import React from "react";
import {useRouter} from 'next/navigation';
import {useAppDispatch} from "@/app/redux/hooks/hooks";
import {useSelector} from "react-redux";
import {AppDispatch, RootState} from '@/app/redux/store';
import {registerUser, setRegisterForm} from "@/app/redux/slices/authSlice";
import toast from "react-hot-toast";

const RegisterForm = () => {
    const router = useRouter();
    const dispatch: AppDispatch = useAppDispatch();
    const {loading, registerForm, isFormValid} = useSelector((state: RootState) => state.auth);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        dispatch(setRegisterForm({field: id, value}));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await dispatch(registerUser(registerForm));
            router.push("/login");
        } catch (error: any) {
            toast.error(error.message || "Login failed");
        }
    };

    return (
        <div className="container flex items-center justify-center min-h-screen p-10">
            <div className=" shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1 text-sm font-medium">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Enter your username"
                            value={registerForm.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1 text-sm font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Enter your email"
                            value={registerForm.email}
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
                            value={registerForm.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-1 text-sm font-medium">
                            confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Enter your password again"
                            value={registerForm.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <Button
                        className="mt-2"
                        variant="default"
                        size="default"
                        type="submit"
                        isLoading={loading}
                        disabled={!isFormValid || loading}
                    >
                        Sign up
                    </Button>

                    <div className="text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-600 hover:underline">
                            Login here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;