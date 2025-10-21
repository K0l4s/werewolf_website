// components/GuildSettings.tsx (updated)
import React, { useState, useEffect } from 'react';
import type { GuildConfig } from '../../../models/Guild';
import { axiosAuth } from '../../../utils/axiosIntance';
import { ChannelManager } from '../../../components/setting/ChannelManager';
import { ToggleSetting } from '../../../components/setting/ToggleSetting';
import { ChannelInputWithSelect } from '../../../components/setting/ChannelInputWithSelect';
import { useParams } from 'react-router-dom';

interface DiscordChannel {
  id: string;
  name: string;
  type: number;
  parentId: string | null;
}

export const GuildSettingsPage: React.FC = () => {
  const { guildId } = useParams<{ guildId: string }>();
  if (!guildId) {
    return (
      <div className="min-h-screen  p-6 flex items-center justify-center">
        <div className="bg-white border-2 border-black rounded-2xl p-8 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-xl font-black text-red-600">❌ Không tìm thấy Server ID</div>
        </div>
      </div>
    );
  }

  const [config, setConfig] = useState<GuildConfig | null>(null);
  const [originalConfig, setOriginalConfig] = useState<GuildConfig | null>(null);
  const [channels, setChannels] = useState<DiscordChannel[]>([]);
  const [loading, setLoading] = useState(true);
  const [channelsLoading, setChannelsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchConfig();
    fetchChannels();
  }, [guildId]);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      const response = await axiosAuth.get(`/server/${guildId}`);
      const configData = response.data.data;
      setConfig(configData);
      setOriginalConfig(configData);
    } catch (error) {
      console.error('Error fetching config:', error);
      setMessage('Lỗi khi tải cấu hình');
    } finally {
      setLoading(false);
    }
  };

  const fetchChannels = async () => {
    try {
      setChannelsLoading(true);
      const response = await axiosAuth.get(`/server/${guildId}/channels`);
      if (response.data.success) {
        setChannels(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching channels:', error);
      setMessage('Lỗi khi tải danh sách kênh');
    } finally {
      setChannelsLoading(false);
    }
  };

  const hasChanges = (): boolean => {
    if (!config || !originalConfig) return false;
    return JSON.stringify(config) !== JSON.stringify(originalConfig);
  };

  const saveConfig = async () => {
    if (!config || !hasChanges()) return;

    try {
      setSaving(true);
      await axiosAuth.put(`/server/${guildId}`, config);
      setOriginalConfig(config);
      setMessage('✅ Cập nhật thành công!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving config:', error);
      setMessage('❌ Lỗi khi cập nhật');
    } finally {
      setSaving(false);
    }
  };

  const cancelConfig = () => {
    if (!originalConfig) return;
    
    setConfig(originalConfig);
    setMessage('❌ Đã hủy thay đổi!');
    setTimeout(() => setMessage(''), 3000);
  };

  const resetToDefault = async () => {
    if (!confirm('Bạn có chắc muốn reset về mặc định?')) return;

    try {
      setSaving(true);
      const response = await axiosAuth.post(`/server/${guildId}/reset`);
      const resetConfig = response.data.data;
      setConfig(resetConfig);
      setOriginalConfig(resetConfig);
      setMessage('✅ Đã reset về mặc định!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error resetting config:', error);
      setMessage('❌ Lỗi khi reset');
    } finally {
      setSaving(false);
    }
  };

  const updateConfig = (updates: Partial<GuildConfig>) => {
    setConfig(prev => prev ? { ...prev, ...updates } : null);
  };

  if (loading) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-2 border-black rounded-2xl p-8 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-xl font-black">Đang tải cấu hình...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-2 border-black rounded-2xl p-8 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-xl font-black text-red-600">Không thể tải cấu hình</div>
          </div>
        </div>
      </div>
    );
  }

  const isSaveDisabled = saving || !hasChanges();
  const showCancelButton = hasChanges() && !saving;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-black text-black">⚙️ Cấu Hình Server</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className={`w-2 h-2 rounded-full ${channelsLoading ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
                <span className="text-sm text-gray-600 font-medium">
                  {channelsLoading ? 'Đang tải kênh...' : `${channels.length} kênh có sẵn`}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={resetToDefault}
                disabled={saving}
                className="bg-red-400 text-black px-4 py-3 border-2 border-black rounded-xl font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-red-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                🔄 Reset
              </button>
              {showCancelButton && (
                <button
                  onClick={cancelConfig}
                  className="bg-yellow-400 text-black px-6 py-3 border-2 border-black rounded-xl font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300"
                >
                  ❌ Hủy
                </button>
              )}
              <button
                onClick={saveConfig}
                disabled={isSaveDisabled}
                className={`px-6 py-3 border-2 border-black rounded-xl font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ${
                  isSaveDisabled
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-400 text-black hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-green-300'
                }`}
              >
                {saving ? '💾 Đang lưu...' : '💾 Lưu thay đổi'}
              </button>
            </div>
          </div>
          {message && (
            <div className={`mt-4 p-4 border-2 border-black rounded-xl font-black text-center ${
              message.includes('✅') 
                ? 'bg-green-100 text-green-800' 
                : message.includes('❌')
                ? 'bg-red-100 text-red-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {message}
            </div>
          )}
          {!isSaveDisabled && (
            <div className="mt-3 p-3 bg-yellow-100 border-2 border-yellow-400 rounded-xl text-center">
              <span className="text-yellow-800 font-bold">⚠️ Bạn có thay đổi chưa lưu</span>
            </div>
          )}
        </div>

        {/* Channel Management */}
        <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <ChannelManager
            channels={config.channels}
            onChannelsChange={(channels) => updateConfig({ channels })}
            guildId={guildId}
            discordChannels={channels}
          />
        </div>

        {/* Toggle Settings Grid */}
        <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-black text-black mb-6">🎛️ Cài Đặt Hệ Thống</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ToggleSetting
              label="📢 Bật/Tắt Kênh"
              description="Kích hoạt hệ thống kênh thông báo"
              enabled={config.isChannelEnabled}
              onChange={(enabled) => updateConfig({ isChannelEnabled: enabled })}
            />
            <ToggleSetting
              label="🖼️ Hiển Thị Embed"
              description="Sử dụng embed message cho thông báo"
              enabled={config.isEmbedEnabled}
              onChange={(enabled) => updateConfig({ isEmbedEnabled: enabled })}
            />
            <ToggleSetting
              label="🔥 Bật Streak"
              description="Theo dõi streak hoạt động"
              enabled={config.isStreakEnabled}
              onChange={(enabled) => updateConfig({ isStreakEnabled: enabled })}
            />
            <ToggleSetting
              label="🔗 Chặn Link"
              description="Chặn gửi link trong server"
              enabled={config.isLinkDisable}
              onChange={(enabled) => updateConfig({ isLinkDisable: enabled })}
            />
            <ToggleSetting
              label="🎫 Chặn Invite"
              description="Chặn tạo invite server"
              enabled={config.isInviteDisable}
              onChange={(enabled) => updateConfig({ isInviteDisable: enabled })}
            />
            <ToggleSetting
              label="🚫 Chặn Spam"
              description="Chặn tin nhắn spam"
              enabled={config.isSpamMessageDisable}
              onChange={(enabled) => updateConfig({ isSpamMessageDisable: enabled })}
            />
          </div>
        </div>

        {/* Game Announcement Channels */}
        <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-black text-black mb-6">🎮 Kênh Thông Báo Giveaways</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ChannelInputWithSelect
              label="📢 Kênh gửi request"
              value={config.gaChannelId || ''}
              onChange={(value) => updateConfig({ gaChannelId: value || "" })}
              placeholder="Chọn hoặc nhập ID kênh..."
              channels={channels}
              channelType="text"
              loading={channelsLoading}
            />
            <ChannelInputWithSelect
              label="📥 Kênh gửi yêu cầu"
              value={config.gaReqChannelId || ''}
              onChange={(value) => updateConfig({ gaReqChannelId: value || "" })}
              placeholder="Chọn hoặc nhập ID kênh..."
              channels={channels}
              channelType="text"
              loading={channelsLoading}
            />
            <ChannelInputWithSelect
              label="📤 Kênh trả request"
              value={config.gaResChannelId || ''}
              onChange={(value) => updateConfig({ gaResChannelId: value || "" })}
              placeholder="Chọn hoặc nhập ID kênh..."
              channels={channels}
              channelType="text"
              loading={channelsLoading}
            />
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center gap-4 mt-8">
          <div className="w-4 h-4 bg-cyan-400 border-2 border-black rounded-full"></div>
          <div className="w-4 h-4 bg-purple-400 border-2 border-black rounded-full"></div>
          <div className="w-4 h-4 bg-yellow-400 border-2 border-black rounded-full"></div>
          <div className="w-4 h-4 bg-green-400 border-2 border-black rounded-full"></div>
        </div>
      </div>
    </div>
  );
};