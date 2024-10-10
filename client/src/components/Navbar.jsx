import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../tokens/storeTokens';

export const Navbar = () => {
    const { isLoggedIn, logoutUser } = useAuth(); 
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate(); 

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const themeClasses = isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800';
    const borderClasses = isDarkMode ? 'border-gray-700' : 'border-gray-300';

    const handleLogout = () => {
        logoutUser(); 
        navigate('/register'); 
    };

    return (
        <nav className={`${themeClasses} ${borderClasses} border-b sticky top-0 z-10`}>
            <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">

                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://images.shiksha.com/mediadata/images/1653286178phpXPRlva.jpeg" alt="API Logo" className="h-8" />
                    <span className="text-2xl font-semibold">CRUD API</span>
                </div>

                <button onClick={toggleMenu} className="md:hidden p-2">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>

                <div className={`md:flex space-x-8 ${isOpen ? 'flex' : 'hidden'} flex-col md:flex-row`}>
                    {isLoggedIn ? (
                        <>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                                        : 'hover:text-blue-600'
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                                        : 'hover:text-blue-600'
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                About
                            </NavLink>
                            <NavLink
                                to="/contact"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                                        : 'hover:text-blue-600'
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                Contact
                            </NavLink>
                            <button
                                onClick={handleLogout}
                                className="hover:text-blue-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                                        : 'hover:text-blue-600'
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                                        : 'hover:text-blue-600'
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                Register
                            </NavLink>
                        </>
                    )}
                </div>
                <label className="relative flex items-center cursor-pointer">
                    <input type="checkbox" className="hidden" checked={isDarkMode} onChange={toggleTheme} />
                    <div className="w-16 h-8 bg-gray-300 rounded-full shadow-inner transition duration-300 ease-in-out"></div>
                    <div className={`absolute w-8 h-8 bg-white rounded-full shadow transition duration-300 ease-in-out ${isDarkMode ? 'transform translate-x-8' : ''}`}></div>
                </label>
            </div>
        </nav>
    );
}
