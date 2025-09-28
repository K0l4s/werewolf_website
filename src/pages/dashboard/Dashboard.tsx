import { useEffect, useState } from "react";
import { axiosAuth } from "../../utils/axiosIntance";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { PawPrint, Settings, UserRoundPlus } from "lucide-react";
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
    const getUserAvatarUrl = (user: User) => {
        if (user.avatar) {
            return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`;
        }
        return null;
    };

    return (
        <div className="min-h-screen p-6">
            {/* Header Section với User Info */}
            <div className="mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Welcome back{user ? `, ${user.global_name || user.username}` : ''}!
                        </h1>
                        <p className="text-gray-300 mt-2">Manage your Discord servers and bot settings</p>
                    </div>

                    {/* User Info Card */}
                    {user && (
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <div className="flex items-center space-x-3">
                                {getUserAvatarUrl(user) ? (
                                    <img
                                        src={getUserAvatarUrl(user) || 'https://cdn.discordapp.com/embed/avatars/0.png'}
                                        alt={user.username}
                                        className="w-12 h-12 rounded-full border-2 border-white/30"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center border-2 border-white/30">
                                        <span className="text-lg font-bold text-white">
                                            {user.username.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                )}
                                <div>
                                    <h3 className="font-semibold text-white">
                                        {user.global_name || user.username}
                                    </h3>
                                    <p className="text-gray-300 text-sm">
                                        {formatUsername(user)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-300 text-lg">Loading your servers...</p>
                </div>
            )}

            {/* Guilds Grid */}
            {!isLoading && (
                <>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white">Your Servers</h2>
                        <span className="bg-white/10 px-3 py-1 rounded-full text-sm">
                            {guilds.length} server{guilds.length !== 1 ? 's' : ''}
                        </span>
                    </div>

                    {guilds.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {guilds.map((guild) => (
                                <div
                                    key={guild.id.toString()}
                                    className={`rounded-xl p-5 shadow-lg transition-all duration-300 hover:shadow-xl backdrop-blur-sm border ${guild.hasBot
                                        ? "bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/30"
                                        : "bg-gradient-to-br from-gray-500/10 to-slate-600/10 border-gray-500/30"
                                        }`}
                                >
                                    {/* Server Icon and Name */}
                                    <div className="flex items-center space-x-4 mb-4">
                                        {guild.icon ? (
                                            <img
                                                src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                                                alt={guild.name.toString()}
                                                className="w-14 h-14 rounded-full border-2 border-white/30 shadow-md"
                                            />
                                        ) : (

                                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center border-2 border-white/30 shadow-md">

                                                <span className="text-xl font-bold text-white">
                                                    {guild.name.toString().charAt(0)}
                                                </span>

                                            </div>
                                        )}

                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-white truncate text-lg">{guild.name}</h3>
                                            {/* Status Badges */}
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${guild.owner || guild.admin
                                                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                                    : "bg-gray-500/20 text-gray-300 border border-gray-500/30"
                                                    }`}>
                                                    {guild.owner ? "👑 Owner" : guild.admin ? "👑 Admin" : guild.manager ? "👑 Manager" : "👤 Member"}
                                                </span>
                                            </div>
                                        </div>

                                    </div>



                                    {/* Invite Button */}

                                    <div className="mt-4 flex justify-end">
                                        <Tooltip text="Pets" delay={0}>
                                            <Link
                                                to={"/guild/pet/" + guild.id}
                                            >

                                                <PawPrint className="hover:bg-green-500 w-9 h-9 rounded-full p-2" />
                                            </Link>
                                        </Tooltip>

                                        {(guild.owner || guild.admin || guild.manager) && (
                                            <Tooltip text="Settings" delay={0}>
                                                <Link
                                                    to={"/guild/setting/" + guild.id}
                                                >

                                                    <Settings className="hover:bg-green-500 w-9 h-9 rounded-full p-2" />
                                                </Link>
                                            </Tooltip>
                                        )}
                                        {(guild.owner || guild.admin || guild.manager) && !guild.hasBot && (
                                            <Tooltip text="Invite bot to your server" delay={0}>
                                                <a
                                                    href={inviteBotUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >

                                                    <UserRoundPlus className="hover:bg-green-500 w-9 h-9 rounded-full p-2 bg-blue-500" />
                                                </a>
                                            </Tooltip>
                                        )}
                                    </div>

                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="text-center py-12">
                            <h2 className="text-2xl font-bold text-gray-300 mb-2">No servers found</h2>
                            <p className="text-gray-400">You need to be an admin of at least one server to see them here.</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Dashboard;