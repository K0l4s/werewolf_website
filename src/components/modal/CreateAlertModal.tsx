import { useEffect, useState } from "react";
import CustomModal from "../custom/CustomModal";
import EmbedBuilder from "../custom/EmbedBuilder";
import { ToggleSetting } from "../setting/ToggleSetting";
import type { AlertModel } from "../../models/Alert";
import { ChannelInputWithSelect } from "../setting/ChannelInputWithSelect";
import { ChannelInput } from "../setting/ChannelInput";
import { axiosAuth } from "../../utils/axiosIntance";
import { useParams } from "react-router-dom";

interface DiscordChannel {
    id: string;
    name: string;
    type: number;
    parentId: string | null;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    channels: DiscordChannel[];
}

// ✅ Di chuyển defaultData ra ngoài component để tránh tạo lại mỗi lần render
const defaultData = {
    channelId: "",
    channelType: "welcome",
    message: "",
    isEmbed: false,
    embedData: {
        title: "",
        description: "",
        color: "#5865F2",
        footer: "",
        footerIcon: "",
        timestamp: false,
        image: "",
        thumbnail: "",
        fields: []
    }
};

const CreateAlertModal = (props: Props) => {
    const { guildId } = useParams<{ guildId: string }>();
    const [data, setData] = useState<AlertModel>(defaultData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const resetState = () => {
        setError(null);
        setSuccess(false);
        setLoading(false);
    };

    const addChannel = async () => {
        if (!data.channelId || !data.channelType) {
            setError("Vui lòng chọn kênh và loại thông báo");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const requestData = {
                channelId: data.channelId,
                channelType: data.channelType,
                message: data.message,
                isEmbed: data.isEmbed,
                embedData: data.isEmbed ? data.embedData : undefined
            };

            await axiosAuth.post(`/alert/${guildId}`, requestData);
            setSuccess(true);

            // Reset form after successful submission
            setTimeout(() => {
                setData({ ...defaultData }); // ✅ Tạo copy mới
                setSuccess(false);
                props.onClose();
            }, 1500);

        } catch (err: any) {
            console.error("Error creating alert:", err);
            setError(err.response?.data?.message || "Có lỗi xảy ra khi tạo thông báo");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (props.isOpen) {
            resetState();
            setData({ ...defaultData }); // ✅ Tạo copy mới
        }
    }, [props.isOpen]);

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <CustomModal
            title="Tạo Thông Báo Mới"
            onClose={props.onClose}
            isOpen={props.isOpen}
            size="full"
            animation="zoom"
            bottomComponent={
                (<div className="flex justify-end gap-2">
                    <button
                        onClick={props.onClose}
                        disabled={loading}
                        className="px-6 py-3 border-2 border-gray-300 rounded-lg font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        onClick={addChannel}
                        disabled={loading}
                        className="px-6 py-3 bg-green-500 border-2 border-green-600 rounded-lg font-medium text-white shadow-sm hover:bg-green-600 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Đang xử lý...</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Tạo thông báo</span>
                            </>
                        )}
                    </button>
                </div>)
            }
        >
            <div className="min-h-[600px]">
                {/* Error/Success Messages */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-green-700">Tạo thông báo thành công!</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Form Content */}
                <div className="space-y-6">
                    {/* Channel Selection */}
                    <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">📝 Cài đặt thông báo</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <ChannelInputWithSelect
                                    value={data.channelId}
                                    onChange={(value) => {
                                        setData(prev => ({
                                            ...prev,
                                            channelId: value
                                        }));
                                        setError(null);
                                    }}
                                    placeholder="Chọn hoặc nhập ID kênh..."
                                    channels={props.channels}
                                    channelType="text"
                                    loading={false}
                                    label="Kênh thông báo"
                                />

                                <div className="space-y-2">
                                    <label className="block font-bold text-gray-700">Loại thông báo</label>
                                    <select
                                        value={data.channelType || 'welcome'}
                                        className="w-full p-3 bg-white border-2 border-gray-300 rounded-lg font-medium text-gray-900 shadow-sm transition-all duration-300 focus:outline-none focus:shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                        onChange={(e) => {
                                            setData(prev => ({
                                                ...prev,
                                                channelType: e.target.value
                                            }));
                                        }}
                                    >
                                        <option value="welcome">👋 Chào mừng</option>
                                        <option value="goodbye">👋 Tạm biệt</option>
                                        <option value="booster">🚀 Booster</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <ChannelInput
                                    label="Nội dung tin nhắn"
                                    value={data.message}
                                    placeholder="Chào mừng {user} đến với server!"
                                    onChange={(value) => {
                                        setData(prev => ({
                                            ...prev,
                                            message: value
                                        }));
                                    }}
                                />

                                <ToggleSetting
                                    label="Gửi kèm Embed"
                                    description="Thêm embed để tin nhắn sinh động hơn"
                                    enabled={data?.isEmbed}
                                    onChange={() => {
                                        setData(prev => ({
                                            ...prev,
                                            isEmbed: !prev.isEmbed
                                        }));
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Embed Builder */}
                    {data.isEmbed && (
                        <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">🎨 Thiết kế Embed</h3>
                            <EmbedBuilder
                                embed={data.embedData}
                                setEmbed={(newEmbed) => {
                                    // ✅ Fix: Cập nhật đúng property embedData
                                    setData(prev => ({
                                        ...prev,
                                        embedData: newEmbed
                                    }));
                                }}
                            />
                        </div>
                    )}
                </div>


            </div>
        </CustomModal>
    );
};

export default CreateAlertModal;