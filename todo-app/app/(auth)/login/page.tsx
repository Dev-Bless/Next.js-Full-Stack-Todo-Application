import Button from "@/app/components/ui/button/button";

const Login = () => {
    return (
        <div className="container flex items-center justify-center min-h-screen p-10">
            <div className="border border-blue-500 p-10 rounded-md shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                <form className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1 text-sm font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Enter your email"
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
                        className="w-full p-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  "
                        type="submit"
                        bgColor="#155dfc"
                        hoverBgColor="blue-700"
                        width="100%"
                        height="36px"

                    >
                        Sign in
                    </Button>

                    <div className="text-center text-sm">
                        Don't have an account?{" "}
                        <a href="/sign-up" className="text-blue-600 hover:underline">
                            Register now
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;