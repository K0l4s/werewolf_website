import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import tokenI from "../../assets/images/token.png"
import lvlI from "../../assets/images/lvl.gif"
import coinsI from "../../assets/images/coin.png"
import Tooltip from '../../components/custom/Tooltip';

const ProfilePage: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="bg-white border-2 border-black p-6 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-lg font-bold">User not found</p>
                </div>
            </div>
        );
    }

    const getAvatarUrl = (userId: string, avatar: string | null, discriminator: string) => {
        if (avatar) {
            return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png?size=256`;
        }
        return `https://cdn.discordapp.com/embed/avatars/${parseInt(discriminator) % 5}.png`;
    };

    const getBannerUrl = (userId: string, banner: string | null) => {
        if (banner) {
            return `https://cdn.discordapp.com/banners/${userId}/${banner}.png?size=600`;
        }
        return null;
    };

    const bannerUrl = getBannerUrl(user.id, user.banner);
    const avatarUrl = getAvatarUrl(user.id, user.avatar, user.discriminator);

    return (
        <div className="min-h-screen p-4">
            {/* Main Profile Card */}
            <div className="max-w-4xl mx-auto bg-white border-2 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                {/* Banner Section */}
                {bannerUrl && (
                    <div
                        className="h-48 w-full bg-gray-300 border-b-2 border-black"
                        style={{ backgroundImage: `url(${bannerUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    />
                )}

                {/* Profile Header */}
                <div className={`p-6 border-b-2 border-black ${bannerUrl ? '-mt-16' : ''}`}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-32 h-32 border-2 border-black rounded-lg overflow-hidden bg-white  shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                <img
                                    src={avatarUrl}
                                    alt={`${user.username}'s avatar`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {user.premium && (
                                <div className="absolute -top-2 -right-2 bg-gradient-to-r  shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 border border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    PREMIUM
                                </div>
                            )}
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                <h1 className="text-3xl font-black text-gray-900">
                                    {user.global_name || user.username}
                                </h1>
                                {user.verified && (
                                    <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 border border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        VERIFIED
                                    </div>
                                )}
                            </div>

                            <p className="text-gray-600 font-medium mb-1">
                                #{user.username}
                            </p>

                            {user.pronouns && (
                                <div className="inline-block bg-gray-200 text-gray-700 text-sm font-medium px-3 py-1 border border-black rounded-full">
                                    {user.pronouns}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <h1 className='text-yellow-800 font-bold text-xl text-center mt-3'>Notice: Reset the page if the data is incorrect.</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b-2 border-black">
                    <div className="bg-yellow-100 border-2 border-black rounded-lg p-4 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2">
                        <Tooltip text={user.coin.toLocaleString("vi") + " Wolf Coin"} delay={0}>
                            <div className="text-2xl font-black text-yellow-900">{user.coin.toLocaleString("vi")}</div>

                            <img src={coinsI} alt="" className='w-8 h-8' />
                        </Tooltip>
                    </div>

                    <div className="bg-blue-200 border-2 border-black rounded-lg p-4 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2">
                        <Tooltip text={"Level: " + user.level.toLocaleString("vi")} delay={0}>
                            <div className="text-2xl font-black text-blue-900">{user.level.toLocaleString("vi")}</div>
                            <img src={lvlI} alt="" className='w-8 h-8' />
                        </Tooltip>
                    </div>

                    <div className="bg-green-100 border-2 border-black rounded-lg p-4 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2">
                        <Tooltip text={user.token.toLocaleString("vi") + " Token"} delay={0}>
                            <div className="text-2xl font-black text-green-900">{user.token.toLocaleString("vi")}</div>
                            <img src={tokenI} alt="" className='w-8 h-8' />
                        </Tooltip>
                    </div>

                    <div className="bg-purple-100 border-2 border-black rounded-lg p-4 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <div className="text-2xl font-black text-purple-900">
                            {user.premium_type > 0 ? 'YES' : 'NO'}
                        </div>
                        <div className="text-sm font-bold text-purple-700">NITRO</div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="p-6">
                    <h2 className="text-xl font-black mb-4 text-gray-900 border-b-2 border-black pb-2">
                        USER DETAILS
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div className="bg-gray-100 border-2 border-black rounded-lg p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <h3 className="font-black text-gray-900 mb-2">ACCOUNT INFO</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-gray-700">ID:</span>
                                        <code className="bg-gray-200 px-2 py-1 rounded border border-black text-sm font-mono">
                                            {user.id}
                                        </code>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-gray-700">Locale:</span>
                                        <span className="font-medium bg-gray-200 px-2 py-1 rounded border border-black">
                                            {user.locale.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-gray-700">MFA Enabled:</span>
                                        <span className={`font-bold px-2 py-1 rounded border border-black ${user.mfa_enabled
                                            ? 'bg-green-200 text-green-900'
                                            : 'bg-red-200 text-red-900'
                                            }`}>
                                            {user.mfa_enabled ? 'YES' : 'NO'}
                                        </span>
                                    </div>
                                </div>
                            </div>


                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;