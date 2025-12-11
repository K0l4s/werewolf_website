import { useEffect, useState } from "react";
import { axiosAuth } from "../../utils/axiosIntance";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { PawPrint, Settings, UserRoundPlus, Crown, Users, Loader, Bot, Shield } from "lucide-react";
import Tooltip from "../../components/custom/Tooltip";
import { Link } from "react-router-dom";
import type { Guild } from "../../models/Guild";

interface User {
    id: string;
    username: string;
    discriminator: string;
    avatar: string | null;
    bot?: boolean;
    system?: boolean;
    mfa_enabled: boolean;
    banner: string | null;
    accent_color: string | null;
    locale: string;
    verified: boolean;
    email: string | null;
    flags: number;
    premium_type: number;
    public_flags: number;
    global_name: string | null;
    display_name_styles: string | null;
    banner_color: string | null;
    avatar_decoration_data: any | null;
    primary_guild: any | null;
    collectibles: any | null;
    clan: any | null;
    pronouns?: string;
}

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [guilds, setGuilds] = useState<Guild[]>([]);
    const user = useSelector((state: RootState) => state.auth.user) as User | null;

    useEffect(() => {
        const getGuilds = async () => {
            try {
                setIsLoading(true);
                const response = await axiosAuth.get("guild");
                setGuilds(response.data);
            } catch (error) {
                console.error("Error fetching guilds:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getGuilds();
    }, []);

    const inviteBotUrl = "https://discord.gg/kDkydXrtua";

    // Format username with discriminator
    const formatUsername = (user: User) => {
        return user.discriminator && user.discriminator !== "0"
            ? `${user.username}#${user.discriminator}`
            : user.username;
    };

    // Get user avatar URL
    // const getUserAvatarUrl = (user: User) => {
    //     if (user.avatar) {
    //         return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`;
    //     }
    //     return null;
    // };

    const getRoleBadge = (guild: Guild) => {
        if (guild.owner) return { label: "Owner", icon: <Crown size={12} />, color: "bg-yellow-400" };
        if (guild.admin) return { label: "Admin", icon: <Shield size={12} />, color: "bg-red-400" };
        if (guild.manager) return { label: "Manager", icon: <Users size={12} />, color: "bg-blue-400" };
        return { label: "Member", icon: <Users size={12} />, color: "bg-gray-400" };
    };

    return (
        <div className="min-h-screen p-6 bg-white overflow-x-hidden text-black">
            {/* Header Section với User Info */}
            <div className="mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-black mb-2">
                            Welcome back{user ? `, ${user.global_name || user.username}` : ''}! 👋
                        </h1>
                        <p className="text-gray-700 text-lg font-medium">Manage your Discord servers and bot settings</p>
                    </div>

                    {/* User Info Card */}
                    {user && (
                        <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5">
                            <div className="flex items-center space-x-4">
                                 <div className="flex items-center space-x-3">
                        <div className="relative bg-white rounded-full p-1 transition-all duration-300 group-hover:scale-105">

                            {/* 1. Avatar (Nằm dưới) */}
                            <img
                                src={user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png'}
                                alt="User Avatar"
                                className="relative w-10 h-10 rounded-full object-cover z-0"
                            />

                            {user.avatar_decoration_data && user.avatar_decoration_data.asset && (
                                <img
                                    src={`https://cdn.discordapp.com/avatar-decoration-presets/${user.avatar_decoration_data.asset}.png`}
                                    alt="Avatar Decoration"
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[137%] h-[137%] max-w-none pointer-events-none z-10"
                                />
                            )}

                            {/* Online indicator */}
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full z-20"></div>
                        </div>
                        </div>
                                <div>
                                    <h3 className="font-black text-black text-lg">
                                        {user.global_name || user.username}
                                    </h3>
                                    <p className="text-gray-600 text-sm font-bold">
                                        {formatUsername(user)}
                                    </p>
                                </div>
                            </div>
                            {/* Status indicator */}
                            <div className="flex items-center gap-2 mt-3 p-2 bg-cyan-50 border-2 border-cyan-200 rounded-lg">
                                <div className="w-2 h-2 bg-green-500 border border-black rounded-full animate-pulse"></div>
                                <span className="text-xs font-black text-cyan-800">Connected</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex flex-col items-center justify-center py-16 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center justify-center">
                        <Loader size={32} className="animate-spin text-cyan-500" />
                    </div>
                    <p className="text-gray-700 text-lg font-bold mt-4">Loading your servers...</p>
                    <div className="w-48 h-2 bg-gray-200 border border-black rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse"></div>
                    </div>
                </div>
            )}

            {/* Guilds Grid */}
            {!isLoading && (
                <>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-black text-black">Your Servers</h2>
                        <div className="flex items-center gap-2 bg-white border-2 border-black rounded-full px-3 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <Users size={16} />
                            <span className="font-black">{guilds.length} server{guilds.length !== 1 ? 's' : ''}</span>
                        </div>
                    </div>

                    {guilds.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {guilds.map((guild) => {
                                const roleBadge = getRoleBadge(guild);
                                
                                return (
                                    <div
                                        key={guild.id.toString()}
                                        className={`group relative bg-white border-2 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 ${
                                            guild.hasBot 
                                                ? 'hover:border-cyan-400' 
                                                : 'hover:border-purple-400'
                                        }`}
                                    >
                                        {/* Server Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                                                {guild.icon ? (
                                                    <div className="flex-shrink-0">
                                                        <img
                                                            src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                                                            alt={guild.name.toString()}
                                                            className="w-12 h-12 rounded-full object-cover border-2 border-black"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center border-2 border-black flex-shrink-0">
                                                        <span className="text-xl font-black text-white">
                                                            {guild.name.toString().charAt(0)}
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-black text-black text-lg truncate">{guild.name}</h3>
                                                    {/* Role Badge */}
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <div className={`flex items-center gap-1 ${roleBadge.color} border border-black rounded-full px-2 py-1`}>
                                                            {roleBadge.icon}
                                                            <span className="text-xs font-black">{roleBadge.label}</span>
                                                        </div>
                                                        {guild.hasBot && (
                                                            <div className="flex items-center gap-1 bg-green-400 border border-black rounded-full px-2 py-1">
                                                                <Bot size={10} />
                                                                <span className="text-xs font-black">Bot</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center justify-end gap-2 pt-4 border-t-2 border-black">
                                            <Tooltip text="Pets" delay={0}>
                                                <Link
                                                    to={"/guild/pet/" + guild.id}
                                                    className="w-10 h-10 bg-cyan-400 border-2 border-black rounded-lg flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-cyan-300"
                                                >
                                                    <PawPrint size={18} color="black"/>
                                                </Link>
                                            </Tooltip>

                                            {(guild.owner || guild.admin || guild.manager) && (
                                                <Tooltip text="Settings" delay={0}>
                                                    <Link
                                                        to={"/guild/setting/" + guild.id+"/alert"}
                                                        className="w-10 h-10 bg-yellow-400 border-2 border-black rounded-lg flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-yellow-300"
                                                    >
                                                        <Settings size={18} color="black"/>
                                                    </Link>
                                                </Tooltip>
                                            )}
                                            
                                            {(guild.owner || guild.admin || guild.manager) && !guild.hasBot && (
                                                <Tooltip text="Invite bot to your server" delay={0}>
                                                    <a
                                                        href={inviteBotUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-10 h-10 bg-green-400 border-2 border-black rounded-lg flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-green-300"
                                                    >
                                                        <UserRoundPlus size={18} color="black"/>
                                                    </a>
                                                </Tooltip>
                                            )}
                                        </div>

                                        {/* Hover decoration */}
                                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 border-2 border-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="flex flex-col items-center justify-center py-16 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
                            <div className="text-6xl mb-4">🏰</div>
                            <h2 className="text-2xl font-black text-black mb-2">No servers found</h2>
                            <p className="text-gray-700 font-medium mb-6 max-w-md">
                                You need to be an admin of at least one server to see them here.
                            </p>
                            <button 
                                onClick={() => window.open(inviteBotUrl, '_blank')}
                                className="flex items-center bg-cyan-400 border-2 border-black rounded-xl px-6 py-3 font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-cyan-300"
                            >
                                <Bot size={18} className="mr-2" />
                                Add Bot to Your Server
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Dashboard;