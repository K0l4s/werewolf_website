import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { MenuItem, SidebarProps } from '../../models/Sidebar';
import { 
    Bell, 
    House, 
    MessageCirclePlus, 
    Mic, 
    
    PawPrint, 
    User, 
    X, 
    ChevronDown, 
    Bot,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const [menuItems, setMenuItems] = useState<MenuItem[]>([
        {
            id: 'user',
            label: 'User',
            icon: <User size={18} />,
            isOpen: true,
            children: [
                { id: 'profile', label: 'Profile', icon: <User size={16} />, href: '/profile' },
            ]
        },
        {
            id: 'server',
            label: 'Server',
            icon: <House size={18} />,
            isOpen: false,
            children: [
                { id: 'notification', label: 'Notification', icon: <Bell size={16} />, href: '/notification' },
                { id: 'voice', label: 'Voice', icon: <Mic size={16} />, href: '/voice' },
                { id: 'message', label: 'Message', icon: <MessageCirclePlus size={16} />, href: '/message' },
                { id: 'server-pets', label: 'Pets', icon: <PawPrint size={16} />, href: '/server-pets' },
            ]
        }
    ]);

    const toggleMenuItem = (id: string) => {
        setMenuItems(prev => prev.map(item =>
            item.id === id ? { ...item, isOpen: !item.isOpen } : item
        ));
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleItemClick = (item: MenuItem) => {
        // Nếu item có href thì điều hướng
        if (item.href) {
            navigate(item.href);
            // Đóng sidebar trên mobile sau khi chọn item
            if (window.innerWidth < 768) {
                onToggle();
            }
        }
        // Nếu item có children thì toggle mở/đóng
        else if (item.children && item.children.length > 0) {
            toggleMenuItem(item.id);
        }
    };

    const isItemActive = (item: MenuItem): boolean => {
        if (item.href) {
            return location.pathname === item.href;
        }
        // Kiểm tra xem có children nào đang active không
        if (item.children) {
            return item.children.some(child => isItemActive(child));
        }
        return false;
    };

    const renderMenuItem = (item: MenuItem, level = 0) => {
        const hasChildren = item.children && item.children.length > 0;
        const isActive = isItemActive(item);
        const isClickable = item.href || hasChildren;

        if (isCollapsed && level === 0) {
            // Collapsed state - chỉ hiển thị icon
            return (
                <div key={item.id} className="select-none relative">
                    <div
                        className={`
                            relative group bg-white border-2 border-black rounded-lg p-3 shadow-brutal-sm transition-all duration-300 hover:scale-110 hover:shadow-brutal cursor-pointer mb-2
                            ${isActive ? 'bg-cyan-50 border-cyan-300 shadow-brutal' : ''}
                        `}
                        onClick={() => handleItemClick(item)}
                        title={item.label}
                    >
                        {item.icon}
                        {hasChildren && item.isOpen && (
                            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-cyan-400 border border-black rounded-full"></div>
                        )}
                        {isActive && (
                            <div className="absolute -top-1 -left-1 w-2 h-2 bg-green-500 border border-black rounded-full"></div>
                        )}
                    </div>
                </div>
            );
        }

        return (
            <div key={item.id} className="select-none">
                {/* Parent Item */}
                <div
                    className={`
                        relative group bg-white border-2 border-black rounded-xl p-4 transition-all duration-300
                        ${level > 0 ? 'ml-4' : ''}
                        ${isClickable ? 'cursor-pointer hover:-translate-y-1 hover:shadow-brutal' : 'cursor-default'}
                        ${isCollapsed ? 'justify-center' : ''}
                        ${hasChildren ? '' : 'shadow-brutal-sm'}
                        ${isActive ? 'bg-cyan-50 border-cyan-300 shadow-brutal' : ''}
                    `}
                    onClick={() => handleItemClick(item)}
                >
                    <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
                            <div className={`border-2 border-black rounded-lg p-2 ${isActive ? 'bg-cyan-100' : 'bg-gray-100'}`}>
                                {item.icon}
                            </div>
                            {!isCollapsed && (
                                <span className="font-black text-black">{item.label}</span>
                            )}
                        </div>

                        {hasChildren && !isCollapsed && (
                            <ChevronDown
                                size={16}
                                className={`transition-transform duration-200 ${item.isOpen ? 'rotate-180' : ''}`}
                            />
                        )}
                    </div>

                    {/* Hover dot */}
                    {!isCollapsed && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 border border-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}

                    {/* Active indicator */}
                    {isActive && !isCollapsed && (
                        <div className="absolute -top-1 -left-1 w-2 h-2 bg-green-500 border border-black rounded-full"></div>
                    )}
                </div>

                {/* Children Items - chỉ hiển thị khi không collapsed */}
                {hasChildren && item.isOpen && !isCollapsed && (
                    <div className="mt-2 space-y-2 ml-4">
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
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
                    onClick={onToggle}
                />
            )}

            {/* Sidebar */}
            <div
                className={`
                    fixed md:static inset-y-0 left-0 z-50
                    transform transition-all duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                    ${isCollapsed ? 'w-20' : 'w-80'}
                `}
            >
                <div className="relative bg-white border-3 border-black rounded-r-2xl shadow-brutal-xl h-full flex flex-col">
                    {/* Background gradient */}
                    <div className="absolute top-2 left-2 right-2 bottom-2 bg-gradient-to-br from-cyan-400/10 to-purple-500/10 rounded-r-xl -z-10"></div>
                    
                    {/* Header */}
                    <div className={`bg-white border-b-3 border-black p-6 ${isCollapsed ? 'flex flex-col space-y-4 items-center' : 'flex items-center justify-between'}`}>
                        <div className={`flex items-center ${isCollapsed ? 'flex-col space-y-3' : 'space-x-3'}`}>
                            <div 
                                className="relative bg-gradient-to-r from-cyan-400 to-purple-500 border-2 border-black rounded-xl p-2 shadow-brutal cursor-pointer"
                                onClick={() => navigate('/')}
                            >
                                <Bot size={24} className="text-black" />
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 border border-black rounded-full"></div>
                            </div>
                            {!isCollapsed && (
                                <h1 
                                    className="text-xl font-black text-black cursor-pointer"
                                    onClick={() => navigate('/')}
                                >
                                    Keldo Menu
                                </h1>
                            )}
                        </div>

                        <div className={`flex items-center ${isCollapsed ? 'flex-col space-y-2' : 'space-x-2'}`}>
                            {/* Toggle collapse button */}
                            <button
                                onClick={toggleSidebar}
                                className="bg-white border-2 border-black rounded-lg p-2 shadow-brutal-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-brutal-xs transition-all duration-300"
                                title={isCollapsed ? "Mở rộng" : "Thu gọn"}
                            >
                                {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                            </button>

                            {/* Close button for mobile */}
                            <button
                                onClick={onToggle}
                                className="bg-white border-2 border-black rounded-lg p-2 shadow-brutal-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-brutal-xs transition-all duration-300 md:hidden"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className={`flex-1 p-6 space-y-3 overflow-y-auto ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
                        {menuItems.map(item => renderMenuItem(item))}
                        
                        {/* Collapsed state hint */}
                        {isCollapsed && (
                            <div className="text-center mt-4">
                                <div className="w-6 h-1 bg-gray-400 border border-black rounded-full mx-auto mb-1"></div>
                                <div className="w-6 h-1 bg-gray-400 border border-black rounded-full mx-auto mb-1"></div>
                                <div className="w-6 h-1 bg-gray-400 border border-black rounded-full mx-auto"></div>
                            </div>
                        )}
                    </nav>

                    {/* User Footer - Ẩn khi collapsed */}
                    {!isCollapsed ? (
                        <div className="bg-white border-t-3 border-black p-6">
                            <div className="flex items-center space-x-3 mb-3">
                                <div 
                                    className="relative bg-white border-2 border-black rounded-xl p-1 shadow-brutal-sm cursor-pointer"
                                    onClick={() => navigate('/profile')}
                                >
                                    <img
                                        src={user?.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png'}
                                        alt="User Avatar"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    {/* Online indicator */}
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-black text-black truncate">
                                        {user?.global_name || user?.username}
                                    </p>
                                    <p className="text-xs text-gray-600 font-bold truncate">
                                        @{user?.username}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Status indicator */}
                            <div className="flex items-center gap-2 p-2 bg-cyan-50 border-2 border-cyan-200 rounded-lg">
                                <div className="w-2 h-2 bg-green-500 border border-black rounded-full animate-pulse"></div>
                                <span className="text-xs font-black text-cyan-800">Online</span>
                            </div>
                        </div>
                    ) : (
                        // Mini user info khi collapsed
                        <div className="bg-white border-t-3 border-black p-4 flex flex-col items-center">
                            <div 
                                className="relative bg-white border-2 border-black rounded-lg p-1 shadow-brutal-sm mb-2 cursor-pointer"
                                onClick={() => navigate('/profile')}
                            >
                                <img
                                    src={user?.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png'}
                                    alt="User Avatar"
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500 border border-white rounded-full"></div>
                            </div>
                            <div className="text-center">
                                <div className="w-2 h-2 bg-green-500 border border-black rounded-full animate-pulse mx-auto"></div>
                            </div>
                        </div>
                    )}

                    {/* Sidebar corner decorations */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-400"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-400"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-400"></div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;