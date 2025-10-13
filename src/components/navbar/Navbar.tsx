import React, { useState } from 'react';
import { Menu, X, Loader } from 'lucide-react';
import logo from '../../assets/images/mascot.png'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';

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
        { label: 'Guide', href: '/guide' },
    ]
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const currentHref = location.pathname;
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const redirectUri = encodeURIComponent(`${window.location.origin}/callback`);
    const url = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=identify%20guilds`;

    const user = useSelector((state: RootState) => state.auth.user);
    const isLogin = useSelector((state: RootState) => state.auth.isAuthenticated);
    const isLoadingAuth = useSelector((state: RootState) => state.auth.isLoading);

    // Render loading state
    const renderAuthButton = () => {
        if (isLoadingAuth) {
            return (
                <button 
                    disabled
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gray-600 to-gray-700 text-gray-400 font-semibold cursor-not-allowed transition-all duration-200 shadow-lg relative overflow-hidden flex items-center justify-center min-w-[120px]"
                >
                    <Loader size={18} className="animate-spin mr-2" />
                    <span className="relative z-10">Loading...</span>
                </button>
            );
        }

        if (isLogin && user) {
            return (
                <Link to="/dashboard" className="flex items-center space-x-3 group">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <img
                                src={user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png'}
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full border-2 border-yellow-500/50 hover:border-yellow-400/70 transition-all duration-300"
                            />
                            {/* Online indicator */}
                            <div className="absolute -bottom-0 -right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                        </div>
                        {/* User info for desktop */}
                        <div className="hidden lg:block">
                            <div className="text-sm font-medium text-white">
                                {user.global_name || user.username}
                            </div>
                            <div className="text-xs text-gray-400">
                                @{user.username}
                            </div>
                        </div>
                    </div>
                </Link>
            );
        }

        return (
            <a href={url} className="flex-shrink-0">
                <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900 font-semibold hover:from-yellow-400 hover:to-amber-500 transform transition-all duration-200 shadow-lg hover:shadow-yellow-500/25 relative overflow-hidden group">
                    <span className="relative z-10">Login</span>
                    <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                </button>
            </a>
        );
    };

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
                                Keldo
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
                        {renderAuthButton()}

                        {/* Mobile menu button with hover animation */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2.5 rounded-lg text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50 backdrop-blur-sm transition-all duration-200"
                                aria-label="Toggle menu"
                            >
                                {isOpen ? (
                                    <X size={24} className="transform rotate-180 transition-transform duration-200" />
                                ) : (
                                    <Menu size={24} className="transform hover:rotate-90 transition-transform duration-200" />
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
                            
                            {/* Mobile auth section */}
                            <div className="px-4 py-3 border-t border-gray-700/50 mt-2">
                                {isLoadingAuth ? (
                                    <div className="flex items-center justify-center text-gray-400">
                                        <Loader size={18} className="animate-spin mr-2" />
                                        <span>Loading...</span>
                                    </div>
                                ) : isLogin && user ? (
                                    <Link 
                                        to="/dashboard" 
                                        className="flex items-center space-x-3 group"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <img
                                            src={user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png'}
                                            alt="User Avatar"
                                            className="w-8 h-8 rounded-full border-2 border-yellow-500/50"
                                        />
                                        <div>
                                            <div className="text-sm font-medium text-white">
                                                {user.global_name || user.username}
                                            </div>
                                            <div className="text-xs text-gray-400">View Dashboard</div>
                                        </div>
                                    </Link>
                                ) : (
                                    <a 
                                        href={url}
                                        className="block text-center px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900 font-semibold transition-all duration-200"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Login with Discord
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;