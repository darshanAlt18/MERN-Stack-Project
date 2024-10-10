import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../tokens/storeTokens';
import { toast } from 'react-toastify';

export const Login = () => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    const [errors, setErrors] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate();
    const { storeTokens, isLoggedIn } = useAuth();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({ username: "", password: "" }); 

        if (!user.username || !user.password) {
            setErrors(prev => ({
                ...prev,
                username: !user.username ? "Username can't be empty." : "",
                password: !user.password ? "Password can't be empty." : ""
            }));
            return; 
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });

            const res_data = await res.json();

            if (res.ok) {
                storeTokens(res_data.token);
                setUser({ username: "", password: "" });
                toast.success(res_data.message || 'Login Successfully!');
                navigate('/');
            } else {
                if (res_data.message) {
                    setErrors(prev => ({
                        ...prev,
                        ...(res_data.message.includes("username") ? { username: res_data.message } : {}),
                        ...(res_data.message.includes("password") ? { password: res_data.message } : {}),
                    }));
                }
                toast.error(res_data.message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden">
            <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-200 p-6 md:p-8">
                <div className="max-w-md text-center text-gray-800">
                    <h1 className="text-5xl font-bold mb-4">Welcome to Our Site</h1>
                    <p className="text-lg mb-4">
                        Access our powerful APIs and build amazing applications.
                        Sign in to your account to get started!
                    </p>
                </div>
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-900 p-6 md:p-8">
                <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Sign In</h2>

                    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                        <div className="relative">
                            <input
                                placeholder="Username"
                                className={`peer h-12 w-full border-b-2 ${errors.username ? 'border-red-500' : 'border-gray-300'} text-white bg-transparent placeholder-transparent focus:outline-none focus:border-blue-500`}
                                required
                                id="username"
                                name="username"
                                value={user.username}
                                onChange={handleInput}
                            />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                            <label
                                htmlFor="username"
                                className={`absolute left-0 top-2 text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:left-2 peer-placeholder-shown:text-gray-500 peer-focus:top-[-10px] peer-focus:left-0 peer-focus:text-blue-500 peer-focus:text-sm transition-all duration-200 ease-in-out ${user.username ? 'top-[-10px] left-0 text-blue-500 text-sm' : ''}`}
                            >
                                Username
                            </label>
                        </div>
                        <div className="relative">
                            <input
                                placeholder="Password"
                                className={`peer h-12 w-full border-b-2 ${errors.password ? 'border-red-500' : 'border-gray-300'} text-white bg-transparent placeholder-transparent focus:outline-none focus:border-blue-500`}
                                required
                                id="password"
                                name="password"
                                type="password"
                                value={user.password}
                                onChange={handleInput}
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            <label
                                htmlFor="password"
                                className={`absolute left-0 top-2 text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:left-2 peer-placeholder-shown:text-gray-500 peer-focus:top-[-10px] peer-focus:left-0 peer-focus:text-blue-500 peer-focus:text-sm transition-all duration-200 ease-in-out ${user.password ? 'top-[-10px] left-0 text-blue-500 text-sm' : ''}`}
                            >
                                Password
                            </label>
                        </div>

                        <p className="text-white mt-4">
                            Don't have an account?
                            <NavLink className="text-sm text-blue-500 hover:underline" to="/register"> Register</NavLink>
                        </p>

                        <button
                            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                            type="submit"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
