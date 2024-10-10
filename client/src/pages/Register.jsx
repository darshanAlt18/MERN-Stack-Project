import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../tokens/storeTokens';
import { toast } from 'react-toastify';

const images = [
    "https://st4.depositphotos.com/1010613/20845/i/450/depositphotos_208457448-stock-photo-businessman-hand-filling-online-registration.jpg",
    "https://img.freepik.com/free-vector/geometric-gradient-futuristic-background_23-2149116406.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/009/690/713/small_2x/white-notepad-and-ink-pen-on-the-wooden-desk-register-now-concept-photo.jpg",
];

export const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const navigate = useNavigate();
    const { storeTokens } = useAuth();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({ username: "", email: "", password: "" });

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });

            const res_data = await res.json();
            console.log('Response from Server : ', res_data.autualError || res_data.message);

            if (res.ok) {
                storeTokens(res_data.token);
                setUser({ username: "", email: "", password: "" });
                toast.success('Registration Successful!');
                navigate('/login');
            } else {
                if (res_data.autualError) {
                    if (Array.isArray(res_data.autualError)) {
                        res_data.autualError.forEach((error) => {
                            toast.error(error.message);
                            if (error.field) {
                                setErrors((prev) => ({
                                    ...prev,
                                    [error.field]: error.message
                                }));
                            }
                        });
                    } else {
                        toast.error(res_data.autualError);
                    }
                } else {
                    toast.error(res_data.message || 'Failed to register');
                }
            }
        } catch (error) {
            console.log(error);
            toast.error('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden">
            <div className="w-full md:w-1/2 relative overflow-hidden bg-gray-200 flex items-center justify-center">
                <div className="absolute w-full h-full">
                    <img
                        src={images[currentImageIndex]}
                        alt={`Slide ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-800 p-6 md:p-8">
                <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-md p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-gray-200 mb-6">Registration</h2>

                    <form className="flex flex-col" onSubmit={handleSubmit} noValidate>
                        <input
                            placeholder="Username"
                            className={`bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 ${errors.username ? 'border-red-500' : ''}`}
                            name='username'
                            type="text"
                            value={user.username}
                            onChange={handleInput}
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

                        <input
                            placeholder="Email"
                            name='email'
                            className={`bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 ${errors.email ? 'border-red-500' : ''}`}
                            type="email"
                            value={user.email}
                            onChange={handleInput}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                        <input
                            placeholder="Password"
                            name='password'
                            className={`bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 ${errors.password ? 'border-red-500' : ''}`}
                            type="password"
                            value={user.password}
                            onChange={handleInput}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                        <p className="text-white mt-4">
                            Already have an Account?
                            <NavLink className="text-sm text-blue-500 hover:underline" to="/login"> Sign In</NavLink>
                        </p>

                        <button
                            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                            type="submit"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
