// components/ChannelManager.tsx
import React, { useState } from 'react';
import type { ChannelConfig } from '../../models/Guild';
import { axiosAuth } from '../../utils/axiosIntance';
import { ChannelInputWithSelect } from './ChannelInputWithSelect';

interface DiscordChannel {
  id: string;
  name: string;
  type: number;
  parentId: string | null;
}

interface ChannelManagerProps {
    channels: ChannelConfig[];
    onChannelsChange: (channels: ChannelConfig[]) => void;
    guildId: string;
    discordChannels: DiscordChannel[];
    channelsLoading?: boolean;
}

// Danh sách biến có thể sử dụng
const AVAILABLE_VARIABLES = [
  { 
    variable: '{user}', 
    description: 'Tên đầy đủ của user (username#discriminator)',
    example: 'john_doe#1234'
  },
  { 
    variable: '{user.id}', 
    description: 'ID của user',
    example: '123456789012345678'
  },
  { 
    variable: '{user.mention}', 
    description: 'Tag mention user',
    example: '@john_doe'
  },
  { 
    variable: '{guild}', 
    description: 'Tên server',
    example: 'My Awesome Server'
  },
  { 
    variable: '{memberCount}', 
    description: 'Tổng số thành viên server',
    example: '150'
  },
];

export const ChannelManager: React.FC<ChannelManagerProps> = ({
    channels,
    onChannelsChange,
    guildId,
    discordChannels,
    channelsLoading = false
}) => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [newChannel, setNewChannel] = useState<Partial<ChannelConfig>>({
        channelType: 'welcome',
        title: '',
        description: '',
        imageUrl: '',
    });
    const [showVariables, setShowVariables] = useState(true);

    const addChannel = async () => {
        if (!newChannel.channelId || !newChannel.title) {
            alert('Vui lòng điền đầy đủ thông tin kênh');
            return;
        }

        try {
            const channelData: ChannelConfig = {
                channelId: newChannel.channelId!,
                channelType: newChannel.channelType!,
                title: newChannel.title!,
                description: newChannel.description!,
                imageUrl: newChannel.imageUrl!,
            };

            await axiosAuth.post(`/server/${guildId}/channels`, { channel: channelData });

            onChannelsChange([...channels, channelData]);
            setNewChannel({
                channelType: 'welcome',
                title: '',
                description: '',
                imageUrl: '',
            });
            setShowAddForm(false);
        } catch (error) {
            console.error('Error adding channel:', error);
            alert('Lỗi khi thêm kênh');
        }
    };

    const deleteChannel = async (channelId: string) => {
        if (!confirm('Bạn có chắc muốn xóa kênh này?')) return;

        try {
            await axiosAuth.delete(`/server/${guildId}/channels/${channelId}`);
            onChannelsChange(channels.filter(ch => ch.channelId !== channelId));
        } catch (error) {
            console.error('Error deleting channel:', error);
            alert('Lỗi khi xóa kênh');
        }
    };

    const getChannelTypeIcon = (type: string) => {
        switch (type) {
            case 'welcome': return '👋';
            case 'goodbye': return '👋';
            case 'booster': return '🚀';
            default: return '📢';
        }
    };

    const getChannelTypeName = (type: string) => {
        switch (type) {
            case 'welcome': return 'Chào mừng';
            case 'goodbye': return 'Tạm biệt';
            case 'booster': return 'Booster';
            default: return type;
        }
    };

    const getDiscordChannelName = (channelId: string) => {
        const channel = discordChannels.find(ch => ch.id === channelId);
        return channel ? channel.name : 'Không tìm thấy';
    };

    const getDiscordChannelIcon = (channelId: string) => {
        const channel = discordChannels.find(ch => ch.id === channelId);
        if (!channel) return '❓';
        
        switch (channel.type) {
            case 0: return '💬'; // Text channel
            case 2: return '🔊'; // Voice channel
            case 4: return '📁'; // Category
            default: return '📢';
        }
    };

    // Hàm chèn biến vào text field
    const insertVariable = (field: 'title' | 'description', variable: string) => {
        setNewChannel(prev => ({
            ...prev,
            [field]: (prev[field] || '') + variable
        }));
    };

    // Hàm chèn biến vào textarea với vị trí con trỏ
    const insertVariableAtCursor = (field: 'title' | 'description', variable: string) => {
        const textarea = document.getElementById(`${field}-textarea`) as HTMLTextAreaElement;
        if (textarea) {
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const text = textarea.value;
            const newText = text.substring(0, start) + variable + text.substring(end);
            
            setNewChannel(prev => ({
                ...prev,
                [field]: newText
            }));

            // Đặt lại vị trí con trỏ sau khi chèn
            setTimeout(() => {
                textarea.focus();
                textarea.setSelectionRange(start + variable.length, start + variable.length);
            }, 0);
        } else {
            // Fallback nếu không tìm thấy textarea
            insertVariable(field, variable);
        }
    };

    return (
        <div className="">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-black text-black">📢 Quản Lý Kênh Thông Báo</h2>
                    <div className="flex items-center gap-2 mt-2">
                        <div className={`w-2 h-2 rounded-full ${channelsLoading ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
                        <span className="text-sm text-gray-600 font-medium">
                            {channelsLoading ? 'Đang tải kênh...' : `${discordChannels.length} kênh có sẵn`}
                        </span>
                    </div>
                </div>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-cyan-400 text-black px-6 py-3 border-2 border-black rounded-xl font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-cyan-300"
                >
                    {showAddForm ? '❌ Hủy' : '➕ Thêm Kênh'}
                </button>
            </div>

            {/* Add Channel Form */}
            {showAddForm && (
                <div className="bg-yellow-100 border-2 border-black rounded-xl p-6 mb-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="font-black text-lg text-black mb-4">Thêm Kênh Mới</h3>
                    
                    {/* Variables Helper */}
                    <div className="mb-6 bg-white border-2 border-black rounded-xl p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="font-black text-black">🎯 Biến có thể sử dụng</h4>
                            <button
                                onClick={() => setShowVariables(!showVariables)}
                                className="bg-purple-400 text-black px-3 py-1 border-2 border-black rounded-lg font-black text-sm transition-all duration-300 hover:bg-purple-300"
                            >
                                {showVariables ? '📕 Ẩn' : '📖 Hiển thị'}
                            </button>
                        </div>
                        
                        {showVariables && (
                            <div className="space-y-3">
                                <p className="text-sm text-gray-700 font-medium">
                                    Các biến này sẽ tự động được thay thế khi gửi thông báo:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {AVAILABLE_VARIABLES.map((item, index) => (
                                        <div key={index} className="bg-gray-100 border border-black rounded-lg p-3">
                                            <div className="font-mono text-sm font-black bg-yellow-200 px-2 py-1 rounded border border-black inline-block mb-1">
                                                {item.variable}
                                            </div>
                                            <div className="text-xs text-gray-600 font-medium">
                                                {item.description}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                VD: {item.example}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block font-black text-black">Kênh Discord</label>
                            <ChannelInputWithSelect
                                value={newChannel.channelId || ''}
                                onChange={(value) => setNewChannel({ ...newChannel, channelId: value })}
                                placeholder="Chọn hoặc nhập ID kênh..."
                                channels={discordChannels}
                                channelType="text"
                                loading={channelsLoading}
                                label=""
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block font-black text-black">Loại Kênh</label>
                            <select
                                value={newChannel.channelType}
                                onChange={(e) => setNewChannel({ ...newChannel, channelType: e.target.value as any })}
                                className="w-full p-3 bg-white border-2 border-black rounded-lg font-medium text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:border-cyan-400 focus:translate-x-0.5 focus:translate-y-0.5"
                            >
                                <option value="welcome">👋 Chào mừng</option>
                                <option value="goodbye">👋 Tạm biệt</option>
                                <option value="booster">🚀 Booster</option>
                            </select>
                        </div>
                        
                        {/* Title with Variable Buttons */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="block font-black text-black">Tiêu đề</label>
                                <div className="flex gap-1">
                                    {AVAILABLE_VARIABLES.slice(0, 3).map((item, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => insertVariableAtCursor('title', item.variable)}
                                            className="bg-cyan-100 text-black px-2 py-1 border border-black rounded text-xs font-black hover:bg-cyan-200 transition-colors"
                                        >
                                            {item.variable}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <input
                                type="text"
                                id="title-textarea"
                                value={newChannel.title || ''}
                                onChange={(e) => setNewChannel({ ...newChannel, title: e.target.value })}
                                className="w-full p-3 bg-white border-2 border-black rounded-lg font-medium text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:border-cyan-400 focus:translate-x-0.5 focus:translate-y-0.5"
                                placeholder="Chào mừng {user.mention} đến với {guild}!"
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <label className="block font-black text-black">URL Ảnh</label>
                            <input
                                type="text"
                                value={newChannel.imageUrl || ''}
                                onChange={(e) => setNewChannel({ ...newChannel, imageUrl: e.target.value })}
                                className="w-full p-3 bg-white border-2 border-black rounded-lg font-medium text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:border-cyan-400 focus:translate-x-0.5 focus:translate-y-0.5"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                        
                        {/* Description with Variable Buttons */}
                        <div className="md:col-span-2 space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="block font-black text-black">Mô tả</label>
                                <div className="flex gap-1 flex-wrap">
                                    {AVAILABLE_VARIABLES.map((item, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => insertVariableAtCursor('description', item.variable)}
                                            className="bg-cyan-100 text-black px-2 py-1 border border-black rounded text-xs font-black hover:bg-cyan-200 transition-colors mb-1"
                                        >
                                            {item.variable}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <textarea
                                id="description-textarea"
                                value={newChannel.description || ''}
                                onChange={(e) => setNewChannel({ ...newChannel, description: e.target.value })}
                                className="w-full p-3 bg-white border-2 border-black rounded-lg font-medium text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:border-cyan-400 focus:translate-x-0.5 focus:translate-y-0.5 h-32 resize-none"
                                placeholder="Chào mừng {user.mention} đến với {guild}! Chúng tôi hiện có {memberCount} thành viên."
                            />
                            <div className="text-sm text-gray-600 font-medium">
                                💡 Nhấn vào các nút biến để chèn tự động vào vị trí con trỏ
                            </div>
                        </div>
                    </div>
                    
                    <button
                        onClick={addChannel}
                        className="mt-4 bg-green-400 text-black px-6 py-3 border-2 border-black rounded-xl font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-green-300"
                    >
                        ✅ Thêm Kênh
                    </button>
                </div>
            )}

            {/* Channels List */}
            <div className="space-y-4">
                {channels.length === 0 ? (
                    <div className="text-center p-6 border-2 border-dashed border-gray-400 rounded-xl bg-gray-50">
                        <div className="text-4xl mb-2">📭</div>
                        <div className="font-black text-gray-600">Chưa có kênh nào được cấu hình</div>
                    </div>
                ) : (
                    channels.map((channel) => (
                        <div key={channel.channelId} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
                            <div className="flex items-start sm:items-center space-x-4 flex-1">
                                <div className="text-3xl flex-shrink-0">{getChannelTypeIcon(channel.channelType)}</div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-black text-black text-lg">{getChannelTypeName(channel.channelType)}</div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xl">{getDiscordChannelIcon(channel.channelId)}</span>
                                        <span className="font-mono text-sm text-gray-700 font-medium">ID: {channel.channelId}</span>
                                        <span className="text-gray-600">•</span>
                                        <span className="text-sm text-gray-700 font-medium">{getDiscordChannelName(channel.channelId)}</span>
                                    </div>
                                    {channel.title && (
                                        <div className="text-gray-700 font-medium mt-2">
                                            <span className="font-black">Tiêu đề: </span>
                                            {channel.title}
                                        </div>
                                    )}
                                    {channel.description && (
                                        <div className="text-gray-600 text-sm mt-1">
                                            <span className="font-black">Mô tả: </span>
                                            {channel.description}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => deleteChannel(channel.channelId)}
                                className="mt-3 sm:mt-0 bg-red-400 text-black px-4 py-2 border-2 border-black rounded-lg font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:bg-red-300"
                            >
                                🗑️ Xóa
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};