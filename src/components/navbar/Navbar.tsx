
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/images/mascot.png'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
interface NavItem {
    label: string;
    href: string;
}

interface NavbarProps {
    items?: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({
    items = [
        { label: 'Home', href: '/' },
        { label: 'Policy', href: '/policy' },
        { label: 'Terms', href: '/term' },
        { label: 'Document', href: '/doc' },
        // { label: 'About', href: '/about' },
        // { label: 'Services', href: '/services' },
        // { label: 'Portfolio', href: '/portfolio' },
        // { label: 'Contact', href: '/contact' }
    ]
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const currentHref = location.pathname;
    console.log("Current Href:", currentHref);
    // const [isDarkMode, setIsDarkMode] = useState(false);

    // useEffect(() => {
    //     // Check if dark mode is enabled in localStorage or system preference
    //     const savedTheme = localStorage.getItem('theme');
    //     const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    //     if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    //         setIsDarkMode(true);
    //         document.documentElement.classList.add('dark');
    //     } else {
    //         document.documentElement.classList.remove('dark');
    //     }
    // }, []);

    // const toggleDarkMode = () => {
    //     const newDarkMode = !isDarkMode;
    //     setIsDarkMode(newDarkMode);

    //     if (newDarkMode) {
    //         document.documentElement.classList.add('dark');
    //         localStorage.setItem('theme', 'dark');
    //     } else {
    //         document.documentElement.classList.remove('dark');
    //         localStorage.setItem('theme', 'light');
    //     }
    // };

    return (
        <nav className="bg-gray-900/80 backdrop-blur-xl shadow-2xl sticky w-11/12 max-w-6xl mx-auto top-4 z-50 rounded-2xl border border-yellow-500/50 hover:border-yellow-400/70 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo with enhanced styling */}
                    <div className="flex items-center flex-shrink-0">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 shadow-lg group-hover:shadow-yellow-500/25 transition-all duration-300">
                                <img
                                    src={logo}
                                    alt="logo"
                                    className='w-full h-full rounded-full object-cover transform group-hover:scale-110 transition-transform duration-300'
                                />
                                <div className="absolute inset-0 rounded-full border-2 border-yellow-400/30 group-hover:border-yellow-400/50 transition-colors duration-300"></div>
                            </div>
                            <span className="text-transparent bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-2xl font-bold tracking-tight">
                                Werewolf
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation with improved styling */}
                    <div className="hidden md:flex items-center space-x-1">
                        {items.map((item) => (
                            <Link
                                key={item.label}
                                to={item.href}
                                className={`relative text-gray-300 hover:text-yellow-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${currentHref === item.href ? 'font-bold text-yellow-400' : ''}`}
                            >
                                <span className="relative z-10">{item.label}</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-amber-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div
                                    className={`absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-yellow-500 to-amber-500 transform -translate-x-1/2 transition-all duration-300 ${currentHref === item.href
                                            ? 'w-3/4 opacity-100'
                                            : 'w-0 opacity-0 group-hover:w-3/4 group-hover:opacity-100'
                                        }`}
                                    style={{
                                        transitionProperty: 'width, opacity',
                                    }}
                                ></div>
                            </Link>
                        ))}
                    </div>

                    {/* Right side buttons with better layout */}
                    <div className="flex items-center space-x-3">

                        {/* Login button with enhanced styling and hover animation */}
                        <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900 font-semibold hover:from-yellow-400 hover:to-amber-500 transform transition-all duration-200 shadow-lg hover:shadow-yellow-500/25 relative overflow-hidden group">
                            <span className="relative z-10 ">Login</span>
                            <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                        </button>

                        {/* Mobile menu button with hover animation */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2.5 rounded-lg text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50 backdrop-blur-sm transition-all duration-200"
                                aria-label="Toggle menu"
                            >
                                {isOpen ? (
                                    <X size={24} className="transform rotate-180 transition-transform duration-200 group-hover:animate-spin" />
                                ) : (
                                    <Menu size={24} className="transform hover:rotate-90 transition-transform duration-200 group-hover:animate-spin" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation with enhanced styling */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-4 space-y-2 sm:px-3 rounded-xl mt-2 bg-gray-800/50 backdrop-blur-md border border-gray-700/50">
                            {items.map((item) => (
                                <Link
                                    key={item.label}
                                    to={item.href}
                                    className="flex items-center text-gray-300 hover:text-yellow-400 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 hover:bg-gray-700/30 group"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span className="ml-2">{item.label}</span>
                                    <div className="ml-auto w-1 h-1 bg-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;