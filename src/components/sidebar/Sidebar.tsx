import React, { useState } from 'react';
import type { MenuItem, SidebarProps } from '../../models/Sidebar';
import { Bell, House, MessageCirclePlus, Mic, MoonStar, PawPrint, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([
        {
            id: 'user',
            label: 'User',
            icon: <User />,
            isOpen: true,
            children: [
                { id: 'profile', label: 'Profile', icon: <User /> },
                { id: 'pets', label: 'Pets', icon: <PawPrint /> },
                { id: 'spirits', label: 'Spirits', icon: <MoonStar /> },
            ]
        },
        {
            id: 'server',
            label: 'Server',
            icon: <House />,
            isOpen: false,
            children: [
                { id: 'notification', label: 'Notification', icon: <Bell /> },
                { id: 'voice', label: 'Voice', icon: <Mic /> },
                { id: 'message', label: 'Message', icon: <MessageCirclePlus /> },
                { id: 'pets', label: 'Pets', icon: <PawPrint /> },
            ]
        }
    ]);

    const toggleMenuItem = (id: string) => {
        setMenuItems(prev => prev.map(item =>
            item.id === id ? { ...item, isOpen: !item.isOpen } : item
        ));
    };

    const renderMenuItem = (item: MenuItem, level = 0) => {
        const hasChildren = item.children && item.children.length > 0;

        return (
            <div key={item.id} className="select-none">
                {/* Parent Item */}
                <div
                    className={`
            flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer
            transition-all duration-200 hover:bg-gray-700
            ${level > 0 ? 'ml-4' : ''}
          `}
                    onClick={() => hasChildren && toggleMenuItem(item.id)}
                >
                    <div className="flex items-center space-x-3">
                        {item.icon && <span className="text-lg">{item.icon}</span>}
                        <span className="font-medium">{item.label}</span>
                    </div>

                    {hasChildren && (
                        <svg
                            className={`w-4 h-4 transition-transform duration-200 ${item.isOpen ? 'rotate-180' : ''
                                }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    )}
                </div>

                {/* Children Items */}
                {hasChildren && item.isOpen && (
                    <div className="mt-1 space-y-1">
                        {item.children!.map(child => renderMenuItem(child, level + 1))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={onToggle}
                />
            )}

            {/* Sidebar */}
            <div
                className={`
          fixed md:static inset-y-0 left-0 z-50
          w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">M</span>
                        </div>
                        <h1 className="text-xl font-bold">Menu System</h1>
                    </div>

                    {/* Close button for mobile */}
                    <button
                        onClick={onToggle}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-700"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2">
                    {menuItems.map(item => renderMenuItem(item))}
                </nav>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
                    <div className="flex items-center space-x-3">
                        <img
                            src={user?.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png'}
                            alt="User Avatar"
                            className="w-8 h-8 rounded-full border-2 border-yellow-500/50"
                        />
                        <div>
                            <p className="text-sm font-medium">{user?.global_name}</p>
                            <p className="text-xs text-gray-400">{user?.username}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;