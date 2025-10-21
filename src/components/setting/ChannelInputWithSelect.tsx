// components/ChannelInputWithSelect.tsx
import React, { useState } from 'react';

interface DiscordChannel {
  id: string;
  name: string;
  type: number;
  parentId: string | null;
}

interface ChannelInputWithSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  channels: DiscordChannel[];
  channelType?: 'text' | 'voice' | 'category';
  loading?: boolean;
}

export const ChannelInputWithSelect: React.FC<ChannelInputWithSelectProps> = ({
  label,
  value,
  onChange,
  placeholder,
  channels,
  channelType,
  loading = false
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter channels based on type and search term
  const filteredChannels = channels.filter(channel => {
    // Filter by channel type if specified
    if (channelType) {
      const typeMap = {
        'text': 0,
        'voice': 2,
        'category': 4
      };
      if (channel.type !== typeMap[channelType]) {
        return false;
      }
    }
    
    // Filter by search term
    return channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           channel.id.includes(searchTerm);
  });

  const getChannelTypeIcon = (type: number) => {
    switch (type) {
      case 0: return '💬'; // Text channel
      case 2: return '🔊'; // Voice channel
      case 4: return '📁'; // Category
      default: return '📢';
    }
  };

  const getSelectedChannelName = () => {
    if (!value) return '';
    const channel = channels.find(ch => ch.id === value);
    return channel ? `${getChannelTypeIcon(channel.type)} ${channel.name}` : '';
  };

  const handleSelectChannel = (channelId: string, channelName: string) => {
    onChange(channelId);
    setSearchTerm(channelName);
    setShowDropdown(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    
    // If input is empty, clear the value
    if (!newValue.trim()) {
      onChange('');
      return;
    }

    // Check if input is a channel ID (numeric)
    if (/^\d+$/.test(newValue)) {
      onChange(newValue);
    } else {
      // If it's a name search, try to find matching channel
      const matchingChannel = channels.find(ch => 
        ch.name.toLowerCase() === newValue.toLowerCase()
      );
      if (matchingChannel) {
        onChange(matchingChannel.id);
      }
    }
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
    // If we have a value but no search term, set search term to the channel name
    if (value && !searchTerm) {
      const channel = channels.find(ch => ch.id === value);
      if (channel) {
        setSearchTerm(channel.name);
      }
    }
  };

  return (
    <div className="space-y-3">
      <label className="font-black text-lg text-black">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={searchTerm || getSelectedChannelName() || value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          placeholder={placeholder}
          className="w-full p-4 bg-white border-2 border-black rounded-xl font-medium text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:border-cyan-400 focus:translate-x-0.5 focus:translate-y-0.5 placeholder:text-gray-500"
        />
        
        {/* Loading indicator */}
        {loading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50 max-h-60 overflow-y-auto">
            {filteredChannels.length === 0 ? (
              <div className="p-4 text-center text-gray-500 font-medium">
                {loading ? 'Đang tải kênh...' : 'Không tìm thấy kênh phù hợp'}
              </div>
            ) : (
              filteredChannels.map((channel) => (
                <button
                  key={channel.id}
                  type="button"
                  onClick={() => handleSelectChannel(channel.id, channel.name)}
                  className={`w-full text-left p-4 border-b-2 border-black last:border-b-0 transition-all duration-200 hover:bg-cyan-50 hover:translate-x-1 ${
                    value === channel.id ? 'bg-cyan-100 font-black' : 'font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{getChannelTypeIcon(channel.type)}</span>
                    <div className="flex-1">
                      <div className="text-black">{channel.name}</div>
                      <div className="text-sm text-gray-600 font-mono">ID: {channel.id}</div>
                    </div>
                    {value === channel.id && (
                      <span className="text-green-500 text-lg">✓</span>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        )}

        {/* Focus indicator dot */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 border border-black rounded-full opacity-0 transition-opacity duration-300 focus-within:opacity-100"></div>
      </div>
    </div>
  );
};