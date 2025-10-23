import React, { useState } from 'react';
import { Menu, X, Loader, LogIn } from 'lucide-react';
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
                    className="flex items-center justify-center min-w-[140px] bg-gray-300 border-3 border-black rounded-xl px-6 py-3 font-black text-gray-600 shadow-brutal-sm cursor-not-allowed"
                >
                    <Loader size={18} className="animate-spin mr-2" />
                    <span>Loading...</span>
                </button>
            );
        }

        if (isLogin && user) {
            return (
                <Link to="/dashboard" className="flex items-center space-x-3 group">
                    <div className="flex items-center space-x-3">
                        <div className="relative bg-white border-2 border-black rounded-xl p-1 shadow-brutal-sm transition-all duration-300 group-hover:scale-105">
                            <img
                                src={user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png'}
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            {/* Online indicator */}
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        {/* User info for desktop */}
                        <div className="hidden lg:block">
                            <div className="text-sm font-black text-black">
                                {user.global_name || user.username}
                            </div>
                            <div className="text-xs text-gray-600 font-bold">
                                @{user.username}
                            </div>
                        </div>
                    </div>
                </Link>
                
            );
        }

        return (
            <a href={url} className="flex-shrink-0">
                <button className="relative group bg-gradient-to-r from-cyan-400 to-purple-500 border-3 border-black rounded-xl px-6 py-3 font-black text-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-brutal-lg transition-all duration-300 flex items-center">
                    <LogIn size={18} className="mr-2" />
                    <span>Login</span>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 border border-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
            </a>
        );
    };

    return (
        <nav className="relative bg-white border-3 border-black rounded-2xl shadow-brutal-xl sticky top-4 z-50 mx-auto w-[95%] max-w-6xl">
            {/* Background gradient */}
            <div className="absolute top-2 left-2 right-2 bottom-2 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-xl -z-10"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex items-center flex-shrink-0">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <div className="relative bg-white border-2 border-black rounded-xl p-2 shadow-brutal transition-all duration-300 group-hover:rotate-[-2deg]">
                                <img
                                    src={logo}
                                    alt="logo"
                                    className='w-12 h-12 object-cover'
                                />
                                {/* Decorative corner */}
                                <div className="absolute -top-1 -left-1 w-3 h-3 bg-cyan-400 border border-black rounded-sm"></div>
                                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-purple-400 border border-black rounded-sm"></div>
                            </div>
                            <span className="text-2xl font-black text-black tracking-tight">
                                Keldo
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        {items.map((item) => (
                            <Link
                                key={item.label}
                                to={item.href}
                                className={`relative group px-4 py-2 rounded-lg font-bold transition-all duration-300 border-2 ${
                                    currentHref === item.href 
                                        ? 'bg-gray-100 text-black border-black shadow-brutal-sm' 
                                        : 'text-black border-transparent hover:border-black hover:bg-gray-50 hover:shadow-brutal-xs'
                                }`}
                            >
                                <span className="relative z-10">{item.label}</span>
                                {currentHref === item.href && (
                                    <div className="absolute -bottom-1 left-2 right-2 h-1 bg-cyan-400 border border-black rounded-full"></div>
                                )}
                                {/* Hover dot */}
                                <div className="absolute -top-1 -right-1 w-1 h-1 bg-purple-400 border border-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Link>
                        ))}
                    </div>

                    {/* Right side buttons */}
                    <div className="flex items-center space-x-3">
                        {renderAuthButton()}

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="relative bg-white border-3 border-black rounded-lg p-2 text-black shadow-brutal-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-brutal-xs transition-all duration-300"
                                aria-label="Toggle menu"
                            >
                                {isOpen ? (
                                    <X size={24} />
                                ) : (
                                    <Menu size={24} />
                                )}
                                {/* Menu indicator dot */}
                                <div className={`absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 border border-black rounded-full transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}></div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="relative bg-white border-3 border-black rounded-2xl shadow-brutal-lg p-4 mt-2">
                            {/* Background gradient */}
                            <div className="absolute top-2 left-2 right-2 bottom-2 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-xl -z-10"></div>
                            
                            {items.map((item) => (
                                <Link
                                    key={item.label}
                                    to={item.href}
                                    className={`flex items-center justify-between group px-4 py-3 rounded-xl font-bold transition-all duration-300 border-2 mb-2 last:mb-0 ${
                                        currentHref === item.href 
                                            ? 'bg-gray-100 text-black border-black shadow-brutal-sm' 
                                            : 'text-black border-transparent hover:border-black hover:bg-gray-50 hover:shadow-brutal-xs'
                                    }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span>{item.label}</span>
                                    <div className={`w-2 h-2 bg-cyan-400 border border-black rounded-full opacity-0 group-hover:opacity-100 ${currentHref === item.href ? 'opacity-100' : ''}`}></div>
                                </Link>
                            ))}
                            
                            {/* Mobile auth section */}
                            <div className="border-t-2 border-black pt-4 mt-4">
                                {isLoadingAuth ? (
                                    <div className="flex items-center justify-center text-gray-600">
                                        <Loader size={18} className="animate-spin mr-2" />
                                        <span className="font-bold">Loading...</span>
                                    </div>
                                ) : isLogin && user ? (
                                    <Link 
                                        to="/dashboard" 
                                        className="flex items-center space-x-3 group"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div className="relative bg-white border-2 border-black rounded-lg p-1 shadow-brutal-xs">
                                            <img
                                                src={user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png'}
                                                alt="User Avatar"
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <div className="text-sm font-black text-black">
                                                {user.global_name || user.username}
                                            </div>
                                            <div className="text-xs text-gray-600 font-bold">View Dashboard</div>
                                        </div>
                                    </Link>
                                ) : (
                                    <a 
                                        href={url}
                                        className="flex items-center justify-center w-full bg-gradient-to-r from-cyan-400 to-purple-500 border-3 border-black rounded-xl px-4 py-3 font-black text-black shadow-brutal-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-brutal-xs transition-all duration-300"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <LogIn size={16} className="mr-2" />
                                        Login with Discord
                                    </a>
                                )}
                            </div>

                            {/* Mobile menu decoration */}
                            <div className="absolute top-2 right-2 w-4 h-4 bg-yellow-400 border border-black rounded-sm rotate-45"></div>
                            <div className="absolute bottom-2 left-2 w-3 h-3 bg-cyan-400 border border-black rounded-sm"></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Navbar corner decorations */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-400"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-400"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-400"></div>
        </nav>
    );
};

export default Navbar;