
import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import logo from '../../assets/images/logo.png'
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
        // { label: 'About', href: '/about' },
        // { label: 'Services', href: '/services' },
        // { label: 'Portfolio', href: '/portfolio' },
        // { label: 'Contact', href: '/contact' }
    ]
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Check if dark mode is enabled in localStorage or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);

        if (newDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <nav className="bg-gray-900 dark:bg-gray-800 shadow-lg sticky w-99/100 m-auto top-3 z-50 rounded-4xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <a href="/" className="flex-shrink-0 flex items-center w-full h-full">
                            <img src={logo} alt="logo" className='w-full h-full' />
                            <span className="text-yellow-400 text-2xl font-bold">Werewolf</span>
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {items.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="text-gray-300 hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* Right side buttons */}
                    <div className="flex items-center space-x-4">
                        {/* Dark/Light mode toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-md text-gray-300 hover:text-yellow-400 hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 rounded-md text-gray-300 hover:text-yellow-400 hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 dark:bg-gray-700 rounded-lg mt-2">
                            {items.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="text-gray-300 hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;