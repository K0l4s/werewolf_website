// import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Guild } from '../../../models/Guild';
import { axiosAuth } from '../../../utils/axiosIntance';
import { Crown, Shield, Users, Trash2, Plus, Bell, MessageSquare, Hash, ExternalLink, Settings, AlertTriangle } from 'lucide-react';
import type { AlertModel } from '../../../models/Alert';
import DiscordEmbedPreview from '../../../components/custom/DiscordEmbedPreview';
// import { ChannelInputWithSelect } from '../../../components/setting/ChannelInputWithSelect';
import CreateAlertModal from '../../../components/modal/CreateAlertModal';

interface DiscordChannel {
    id: string;
    name: string;
    type: number;
    parentId: string | null;
}

const AlertPage = () => {
    const { guildId } = useParams<{ guildId: string }>();
    const [guild, setGuild] = useState<Guild>();
    const [alert, setAlert] = useState<AlertModel[]>([]);
    const [isOpenCreateAlertModal, setIsOpenCreateAlertModal] = useState(false);
    // const 
    const [channels, setChannels] = useState<DiscordChannel[]>([]);
    const [loading, setLoading] = useState(true);

    if (!guildId) {
        return (
            <div className="min-h-screen p-6 flex items-center justify-center">
                <div className="bg-white rounded-2xl p-10 text-center max-w-md shadow-xl border border-gray-200">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-lg">
                        <AlertTriangle className="w-10 h-10 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Server Not Found</h2>
                    <p className="text-gray-600 mb-6">Unable to retrieve server information. Please check the URL and try again.</p>
                    <button
                        onClick={() => window.history.back()}
                        className="bg-gradient-to-r from-gray-800 to-black text-white px-6 py-3 rounded-xl font-semibold hover:from-gray-900 hover:to-black transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const getGuilds = async () => {
        try {
            const response = await axiosAuth.get("guild/" + guildId);
            setGuild(response.data);
        } catch (error) {
            console.error("Error fetching guilds:", error);
        }
    }

    const getAlerts = async () => {
        try {
            const res = await axiosAuth.get(`/alert/${guildId}`);
            setAlert(res.data.message as AlertModel[]);
        } catch (error) {
            console.error("Error fetching alerts:", error);
        }
    };

    const fetchChannels = async () => {
        try {
            setLoading(true);
            const response = await axiosAuth.get(`/server/${guildId}/channels`);
            if (response.data.success) {
                setChannels(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching channels:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteAlert = async (alertId: string) => {
        if (window.confirm('Are you sure you want to delete this alert?')) {
            try {
                await axiosAuth.delete(`/alert/${guildId}/${alertId}`);
                // getAlerts(); // Refresh the list
                setAlert(prevAlerts => prevAlerts.filter(alert => alert._id !== alertId));
            } catch (error) {
                console.error('Error deleting alert:', error);
            }
        }
    };
    const closeAlertModal = () => {
        setIsOpenCreateAlertModal(false);
        getAlerts();
    }
    useEffect(() => {
        getGuilds();
        getAlerts();
        fetchChannels();
    }, [guildId]);

    const getPermissionBadge = (guild: Guild) => {
        if (guild.owner) return { text: "Owner", color: "bg-gradient-to-r from-yellow-500 to-amber-500", icon: <Crown size={14} /> }
        if (guild.admin) return { text: "Administrator", color: "bg-gradient-to-r from-red-500 to-pink-500", icon: <Shield size={14} /> }
        if (guild.manager) return { text: "Manager", color: "bg-gradient-to-r from-blue-500 to-cyan-500", icon: <Users size={14} /> }
        return { text: "Member", color: "bg-gradient-to-r from-gray-500 to-gray-700", icon: <Users size={14} /> }
    };

    const getAlertTypeIcon = (type: string) => {
        switch (type) {
            case 'welcome': return '👋';
            case 'goodbye': return '👋';
            case 'booster': return '🚀';
            default: return '🔔';
        }
    };

    const getAlertTypeColor = (type: string) => {
        switch (type) {
            case 'welcome': return 'bg-gradient-to-r from-green-500 to-emerald-500';
            case 'goodbye': return 'bg-gradient-to-r from-blue-500 to-indigo-500';
            case 'booster': return 'bg-gradient-to-r from-purple-500 to-pink-500';
            default: return 'bg-gradient-to-r from-gray-500 to-gray-700';
        }
    };

    const getAlertTypeName = (type: string) => {
        switch (type) {
            case 'welcome': return 'Welcome Message';
            case 'goodbye': return 'Goodbye Message';
            case 'booster': return 'Booster Announcement';
            default: return type;
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-6">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto">
                {/* Guild Info Card */}
                {guild && (
                    <div className="mb-8">
                        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                {/* Guild Icon */}
                                <div className="relative">
                                    {guild.icon ? (
                                        <img
                                            src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                                            alt={guild.name.toString()}
                                            className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg"
                                        />
                                    ) : (
                                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center border-4 border-white shadow-lg">
                                            <span className="text-2xl font-black text-white">
                                                {guild.name.toString().charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Guild Details */}
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                                {guild.name}
                                            </h1>
                                            <div className="flex items-center gap-3">
                                                <span className={`${getPermissionBadge(guild).color} text-white border border-gray-300 rounded-full px-4 py-2 text-xs font-bold flex items-center gap-2 shadow-md`}>
                                                    {getPermissionBadge(guild).icon}
                                                    {getPermissionBadge(guild).text}
                                                </span>
                                                <span className="flex items-center gap-2 text-gray-600">
                                                    <Hash size={14} />
                                                    {guildId}
                                                </span>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-xl border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Total Alerts</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{alert.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                                <Bell className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-xl border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Available Channels</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{channels.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                                <MessageSquare className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-xl border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Active Embeds</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">
                                    {alert.filter(a => a.isEmbed).length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                                <Settings className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Alerts Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Alert Configurations</h2>
                            <p className="text-gray-600 mt-1">Manage your server notifications and announcements</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 animate-pulse">
                                    <div className="h-6 bg-gray-200 rounded-lg mb-4"></div>
                                    <div className="h-4 bg-gray-200 rounded-lg mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded-lg mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded-lg"></div>
                                </div>
                            ))}
                        </div>
                    ) : alert.length === 0 ? (
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
                            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Bell className="w-10 h-10 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-700 mb-3">No Alerts Configured</h3>
                            <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                You haven't created any alerts yet. Start by creating your first alert to manage server notifications.
                            </p>
                            <button
                                onClick={() => setIsOpenCreateAlertModal(true)}
                                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-xl font-bold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex items-center gap-3 shadow-lg mx-auto"
                            >
                                <Plus size={20} />
                                Create Your First Alert
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1  gap-6">
                            {/* Create new */}
                            {
                                alert.length < 3 &&
                                <>
                                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 ">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm text-yellow-700">
                                                    Note: Tạo alert trùng loại sẽ ghi đè cấu hình cũ.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-blue-500 hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                                        onClick={() => setIsOpenCreateAlertModal(true)}
                                    >
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                                                <Plus className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <p className="text-gray-600 font-medium">Create New Alert</p>
                                            {/* Notice */}

                                        </div>
                                    </div>
                                </>
                            }
                            {alert.map((field, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                                >
                                    {/* Alert Header */}
                                    <div className="p-6 border-b border-gray-100">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 ${getAlertTypeColor(field.channelType)} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
                                                    {getAlertTypeIcon(field.channelType)}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{getAlertTypeName(field.channelType)}</h3>
                                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                                        <Hash size={12} />
                                                        {field.channelId ? 'Configured' : 'Not Configured'}
                                                    </p>
                                                </div>
                                            </div>
                                            {/* setting */}
                                            <div className='flex items-center'>
                                                <button
                                                    onClick={() => deleteAlert(field._id || '')}
                                                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-200 opacity-0 group-hover:opacity-100"
                                                >
                                                    <Settings size={18} />
                                                </button>
                                                <button
                                                    onClick={() => deleteAlert(field._id || index.toString())}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 opacity-0 group-hover:opacity-100"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Channel Selector */}
                                        <div className="mb-4">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Channel Destination
                                            </label>
                                            {/* <ChannelInputWithSelect
                                                value={field.channelId || ''}
                                                onChange={() => { }}
                                                placeholder="Select or enter channel ID..."
                                                channels={channels}
                                                channelType="text"
                                                loading={false}
                                                label=""
                                            /> */}
                                            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                                                {channels.find(c => c.id === field.channelId) ? (
                                                    <div className="flex items-center gap-3">
                                                        <Hash size={16} className="text-gray-500" />
                                                        <span className="font-medium text-gray-900">
                                                            {channels.find(c => c.id === field.channelId)?.name || field.channelId}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-500 italic">Channel not found or not configured</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* channel Message */}
                                        <div className="mb-4">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Message Preview
                                            </label>
                                            <p className="text-gray-600 text-sm whitespace-pre-wrap">
                                                {field.message || <span className="italic text-gray-400">No message configured.</span>}
                                            </p>
                                        </div>

                                        {/* Alert Type Badge */}
                                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-lg px-3 py-2">
                                            <div className={`w-2 h-2 ${getAlertTypeColor(field.channelType)} rounded-full`}></div>
                                            <span className="text-sm font-medium text-gray-700">
                                                {field.channelType.charAt(0).toUpperCase() + field.channelType.slice(1)} Alert
                                            </span>
                                        </div>
                                    </div>

                                    {/* Alert Preview */}
                                    <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
                                        {field.isEmbed && field.embed ? (
                                            <>
                                                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                                    <ExternalLink size={14} />
                                                    Embed Preview
                                                </h4>
                                                <div className="transform scale-95 origin-top">
                                                    <DiscordEmbedPreview embed={field.embed || {}} />
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center py-6">
                                                <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                                                    <MessageSquare className="w-6 h-6 text-gray-400" />
                                                </div>
                                                <p className="text-gray-500 text-sm">Simple text message alert</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Create Alert Modal */}
            <CreateAlertModal
                isOpen={isOpenCreateAlertModal}
                onClose={closeAlertModal}
                channels={channels}
            />
        </div>
    );
};

export default AlertPage;