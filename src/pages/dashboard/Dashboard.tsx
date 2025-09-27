import { useEffect, useState } from "react";
import { axiosAuth } from "../../utils/axiosIntance";
import type { Guild } from "../../models/Guild";

const Dashboard = () => {
    const [guilds, setGuilds] = useState<Guild[]>([]);
    
    useEffect(() => {
        const getGuilds = async () => {
            try {
                const response = await axiosAuth.get("guild");
                setGuilds(response.data);
            } catch (error) {
                console.error("Error fetching guilds:", error);
            }
        };
        getGuilds();
    }, []);

    const inviteBotUrl = "https://discord.gg/kDkydXrtua";

    return (
        <div className="p-6 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 ">Your Servers</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {guilds.map((guild) => (
                    <div 
                        key={guild.id.toString()} 
                        className={`rounded-xl p-5 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                            guild.hasBot 
                                ? "bg-gradient-to-br from-green-50 to-emerald-100 border-l-4 border-green-500" 
                                : "bg-gradient-to-br from-gray-50 to-slate-100 border-l-4 border-gray-400"
                        }`}
                    >
                        {/* Server Icon and Name */}
                        <div className="flex items-center space-x-4 mb-4">
                            {guild.icon ? (
                                <img 
                                    src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} 
                                    alt={guild.name.toString()} 
                                    className="w-14 h-14 rounded-full border-2 border-white shadow-md"
                                />
                            ) : (
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center border-2 border-white shadow-md">
                                    <span className="text-xl font-bold text-white">
                                        {guild.name.toString().charAt(0)}
                                    </span>
                                </div>
                            )}
                            
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-800 truncate text-lg">{guild.name}</h3>
                            </div>
                        </div>
                        
                        {/* Status Badges */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                guild.owner  || guild.admin
                                    ? "bg-blue-100 text-blue-700 border border-blue-200" 
                                    : "bg-gray-100 text-gray-600 border border-gray-200"
                            }`}>
                                {guild.owner ? "👑 Owner" : guild.admin? "👑 Admin" : guild.manager? "👑  Manager":"👤 Member"}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                guild.hasBot 
                                    ? "bg-green-100 text-green-700 border border-green-200" 
                                    : "bg-red-100 text-red-700 border border-red-200"
                            }`}>
                                {guild.hasBot ? "🤖 Bot Added" : "❌ No Bot"}
                            </span>
                        </div>
                        
                        {/* Invite Button */}
                        {(guild.owner || guild.admin || guild.manager) && !guild.hasBot && (
                            <div className="mt-4">
                                <a 
                                    href={inviteBotUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-center py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                                >
                                    Invite Bot
                                </a>
                            </div>
                        )}
                        
                        {/* Success Message for servers with bot */}
                        {guild.hasBot && (
                            <div className="mt-3 text-center">
                                <span className="text-sm text-green-600 font-medium">✅ Bot is ready!</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {guilds.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🏰</div>
                    <h2 className="text-2xl font-bold text-gray-600 mb-2">No servers found</h2>
                    <p className="text-gray-500">You need to be an admin of at least one server to see them here.</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;