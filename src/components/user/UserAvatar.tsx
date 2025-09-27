import React from 'react';
import type { User } from '../../models/User';

interface AvatarDecorationData {
    asset: string;
    expires_at: string | null;
    sku_id: string;
}

interface UserAvatarProps {
    user: User;
    size?: number;
    className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ 
    user, 
    size = 40,
    className = "" 
}) => {
    const baseAvatarUrl = user.avatar 
        ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=${size * 2}`
        : `https://cdn.discordapp.com/embed/avatars/${parseInt(user.discriminator) % 5 || 0}.png?size=${size * 2}`;

    const decorationUrl = user.avatar_decoration_data 
        ? `https://cdn.discordapp.com/avatar-decorations/${user.id}/${user.avatar_decoration_data.asset}.png?size=${size * 2}`
        : null;

    const displayName = user.global_name || user.username;

    return (
        <div className={`relative inline-block ${className}`}>
            {/* Avatar chính */}
            <img
                src={baseAvatarUrl}
                alt={`${displayName}'s avatar`}
                className="rounded-full border-2 border-yellow-500/50 hover:border-yellow-400/70 transition-all duration-300"
                style={{ 
                    width: size, 
                    height: size,
                    minWidth: size,
                    minHeight: size
                }}
            />
            
            {/* Avatar decoration (nếu có) */}
            {decorationUrl && (
                <img
                    src={decorationUrl}
                    alt={`${displayName}'s decoration`}
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ 
                        width: size, 
                        height: size,
                        minWidth: size,
                        minHeight: size
                    }}
                />
            )}
            
            {/* Badge bot (nếu là bot) */}
            {user.bot && (
                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                    </svg>
                </div>
            )}
        </div>
    );
};

// Component hiển thị đầy đủ thông tin user
interface UserProfileProps {
    user: User;
    showDecorationInfo?: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({ 
    user, 
    showDecorationInfo = false 
}) => {
    const displayName = user.global_name || user.username;
    const tag = user.discriminator !== "0" ? `#${user.discriminator}` : "";

    return (
        <div className="flex items-center space-x-3 p-3 bg-gray-900/50 rounded-lg">
            <UserAvatar user={user} size={48} />
            
            <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                    <span className="text-white font-semibold truncate">
                        {displayName}
                        {tag && <span className="text-gray-400 text-sm ml-1">{tag}</span>}
                    </span>
                    
                    {user.bot && (
                        <span className="px-2 py-1 bg-blue-500 text-xs text-white rounded-full">
                            BOT
                        </span>
                    )}
                </div>
                
                {showDecorationInfo && user.avatar_decoration_data && (
                    <div className="mt-1 text-xs text-gray-400">
                        <span>Decoration: {user.avatar_decoration_data.sku_id}</span>
                        {user.avatar_decoration_data.expires_at && (
                            <span className="ml-2">
                                Expires: {new Date(user.avatar_decoration_data.expires_at).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserAvatar;