import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { axiosAuth, axiosNoAuth } from "../../utils/axiosIntance"
import type { GuildPet } from "../../models/Pet"
import type { Guild } from "../../models/Guild"
import Tooltip from "../../components/custom/Tooltip"
import { Pencil, ArrowLeft, Crown, Shield, Users, Bot } from "lucide-react"

const ServerPet = () => {
    const id = useParams().id
    const [pet, setPet] = useState<GuildPet>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [actionLoading, setActionLoading] = useState<string>("")
    const [actionEffect, setActionEffect] = useState<string>("")
    const [guild, setGuild] = useState<Guild>()

    useEffect(() => {
        getPets()
        getGuilds()
    }, [id])

    const getPets = async () => {
        try {
            setIsLoading(true)
            const response = await axiosNoAuth.get("pet/server?guildId=" + id)
            setPet(response.data)
        } catch (error) {
            console.error("Error fetching pets:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const getGuilds = async () => {
        try {
            const response = await axiosAuth.get("guild/" + id)
            setGuild(response.data)
        } catch (error) {
            console.error("Error fetching guilds:", error)
        }
    }

    const feedPet = async () => {
        if (!pet) return

        try {
            setActionLoading("feeding")
            setActionEffect("feed")
            await axiosNoAuth.post(`pet/server/${pet._id}/feed`)
            await getPets()
            setTimeout(() => setActionEffect(""), 2000)
        } catch (error) {
            console.error("Error feeding pet:", error)
        } finally {
            setActionLoading("")
        }
    }

    const playWithPet = async () => {
        if (!pet) return

        try {
            setActionLoading("playing")
            setActionEffect("play")
            await axiosNoAuth.post(`pet/server/${pet._id}/play`)
            await getPets()
            setTimeout(() => setActionEffect(""), 2000)
        } catch (error) {
            console.error("Error playing with pet:", error)
        } finally {
            setActionLoading("")
        }
    }

    const calculateExpPercentage = () => {
        if (!pet) return 0
        return (pet.exp / pet.pet.expStats) * 100
    }

    const calculateHungerPercentage = () => {
        if (!pet) return 0
        return (pet.hunger / pet.pet.hungerStats) * 100
    }

    const calculateHappinessPercentage = () => {
        if (!pet) return 0
        return (pet.happiness / pet.pet.happinessStats) * 100
    }

    const getStatusColor = (percentage: number, type: string) => {
        if (type === 'exp') return 'bg-gradient-to-r from-purple-500 to-pink-500'
        if (percentage >= 70) return 'bg-gradient-to-r from-green-400 to-emerald-400'
        if (percentage >= 40) return 'bg-gradient-to-r from-yellow-400 to-amber-400'
        return 'bg-gradient-to-r from-red-400 to-orange-400'
    }

    const getStatusEmoji = (percentage: number, type: string) => {
        if (type === 'hunger') {
            if (percentage >= 70) return '😋'
            if (percentage >= 40) return '😐'
            return '😫'
        }
        if (type === 'happiness') {
            if (percentage >= 70) return '😄'
            if (percentage >= 40) return '😊'
            return '😢'
        }
        return '⭐'
    }

    const getTimeSinceLastAction = (lastAction: string) => {
        const now = new Date()
        const last = new Date(lastAction)
        const diffInHours = (now.getTime() - last.getTime()) / (1000 * 60 * 60)

        if (diffInHours < 1) {
            const minutes = Math.floor(diffInHours * 60)
            return `${minutes}m ago`
        }
        return `${Math.floor(diffInHours)}h ago`
    }

    const getPermissionBadge = (guild: Guild) => {
        if (guild.owner) return { text: "Chủ Server", color: "bg-yellow-400", icon: <Crown size={12} /> }
        if (guild.admin) return { text: "Quản Trị Viên", color: "bg-red-400", icon: <Shield size={12} /> }
        if (guild.manager) return { text: "Quản Lý", color: "bg-blue-400", icon: <Users size={12} /> }
        return { text: "Thành Viên", color: "bg-gray-400", icon: <Users size={12} /> }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-4 overflow-hidden">
                <div className="bg-white border-2 border-black rounded-2xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center">
                    <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <div className="text-black text-xl font-black animate-pulse">Đang tải thú cưng...</div>
                </div>
            </div>
        )
    }

    if (!pet) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-4 overflow-hidden">
                <div className="bg-white border-2 border-black rounded-2xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center">
                    <div className="text-6xl mb-4">🐲</div>
                    <div className="text-black text-xl font-black">Không tìm thấy pet!</div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white p-4 overflow-hidden">
            {/* Background Decoration */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-10 left-10 w-4 h-4 bg-cyan-400 border-2 border-black rounded-full animate-ping"></div>
                <div className="absolute top-20 right-20 w-4 h-4 bg-purple-400 border-2 border-black rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 left-20 w-4 h-4 bg-yellow-400 border-2 border-black rounded-full animate-bounce"></div>
            </div>

            <div className="max-w-6xl mx-auto">
                {/* Header with Back Button and Guild Info */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
                    {/* Back Button */}
                    <Link
                        to="/dashboard"
                        className="group flex items-center gap-3 bg-white border-2 border-black rounded-xl px-6 py-3 font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 w-full lg:w-auto justify-center"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Quay về Dashboard</span>
                    </Link>

                    {/* Guild Info */}
                    {guild && (
                        <div className="flex items-center gap-4 bg-white border-2 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full lg:w-auto justify-center">
                            {/* Guild Icon */}
                            <div className="relative">
                                {guild.icon ? (
                                    <img
                                        src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                                        alt={guild.name.toString()}
                                        className="w-12 h-12 rounded-full border-2 border-black"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center border-2 border-black">
                                        <span className="text-lg font-black text-white">
                                            {guild.name.toString().charAt(0)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Guild Details */}
                            <div className="text-black">
                                <h2 className="text-lg font-black">
                                    {guild.name}
                                </h2>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`${getPermissionBadge(guild).color} border border-black rounded-full px-3 py-1 text-xs font-black flex items-center gap-1`}>
                                        {getPermissionBadge(guild).icon}
                                        {getPermissionBadge(guild).text}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Pet Header */}
                <div className="text-center mb-8 relative">
                    <div className="relative inline-block">
                        <Tooltip text={pet.name} position="top">
                            <h1 className="text-4xl lg:text-5xl font-black text-black mb-2">
                                {pet.name}
                            </h1>
                        </Tooltip>
                        {(guild?.admin || guild?.manager || guild?.owner) && (
                            <div className="absolute top-4 -right-2 translate-x-full -translate-y-1/2">
                                <Tooltip text="Đổi tên pet" position="top">
                                    <div className="bg-yellow-400 border-2 border-black rounded-lg p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:bg-yellow-300 transition-colors">
                                        <Pencil className="w-3 h-3 text-black" />
                                    </div>
                                </Tooltip>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-2 text-black relative z-10">
                        <span className="bg-cyan-100 border-2 border-black rounded-full px-3 py-1 text-sm font-black">
                            Lv. {pet.lvl}
                        </span>
                        <span className="bg-purple-100 border-2 border-black rounded-full px-3 py-1 text-sm font-black">
                            {pet.pet.type}
                        </span>
                        <span className="bg-green-100 border-2 border-black rounded-full px-3 py-1 text-sm font-black">
                            🍀 +{pet.pet.luckyBoost}%
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* Left Column - Pet Display */}
                    <div className="relative">
                        {/* Pet Container */}
                        <div className="relative bg-white border-2 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                            {/* Action Effects */}
                            {actionEffect === 'feed' && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                                    <div className="text-5xl animate-bounce">🍖</div>
                                    <div className="absolute text-yellow-400 text-xl animate-ping">+10</div>
                                </div>
                            )}
                            {actionEffect === 'play' && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                                    <div className="text-5xl animate-bounce">🎾</div>
                                    <div className="absolute text-green-400 text-xl animate-ping">+5</div>
                                </div>
                            )}

                            {/* Pet Image */}
                            <div className="relative flex justify-center">
                                <div className="relative">
                                    <img
                                        src={pet.pet.image}
                                        alt={pet.name}
                                        className="w-64 h-64 lg:w-80 lg:h-80 object-cover rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:scale-105 transition-transform duration-300"
                                    />
                                    {/* Level Badge */}
                                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-red-400 text-white px-3 py-1 rounded-full font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-sm">
                                        Lv.{pet.lvl}
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                <button
                                    onClick={feedPet}
                                    disabled={actionLoading === "feeding"}
                                    className={`group relative bg-orange-400 hover:bg-orange-300 text-black py-3 px-4 rounded-xl font-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${actionLoading === "feeding" ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    {actionLoading === "feeding" ? (
                                        <span className="animate-pulse">Đang cho ăn...</span>
                                    ) : (
                                        <>
                                            🍖 Cho ăn
                                            <div className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs px-1 py-0.5 rounded-full border border-black">
                                                +{pet.pet.hungerStats}
                                            </div>
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={playWithPet}
                                    disabled={actionLoading === "playing"}
                                    className={`group relative bg-green-400 hover:bg-green-300 text-black py-3 px-4 rounded-xl font-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${actionLoading === "playing" ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    {actionLoading === "playing" ? (
                                        <span className="animate-pulse">Đang chơi...</span>
                                    ) : (
                                        <>
                                            🎾 Chơi cùng
                                            <div className="absolute -top-1 -right-1 bg-emerald-400 text-black text-xs px-1 py-0.5 rounded-full border border-black">
                                                +{pet.pet.happinessStats}
                                            </div>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Last Action Times */}
                            <div className="mt-4 flex flex-col sm:flex-row justify-between gap-2 text-black text-sm">
                                <div className="bg-gray-100 border-2 border-black rounded-full px-3 py-2 text-center font-bold">
                                    ⏱️ Ăn: {getTimeSinceLastAction(pet.lastFed)}
                                </div>
                                <div className="bg-gray-100 border-2 border-black rounded-full px-3 py-2 text-center font-bold">
                                    ⏱️ Chơi: {getTimeSinceLastAction(pet.lastPlayed)}
                                </div>
                            </div>

                            {/* Experience Bar */}
                            <div className="mt-4 bg-white border-2 border-black rounded-xl p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-lg font-black text-black flex items-center gap-2">
                                        ⭐ Kinh Nghiệm
                                    </h3>
                                    <span className="text-black font-black text-sm">
                                        {pet.exp}/{pet.pet.expStats}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-4 border-2 border-black overflow-hidden">
                                    <div
                                        className={`h-full rounded-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-1000 ease-out`}
                                        style={{ width: `${calculateExpPercentage()}%` }}
                                    ></div>
                                </div>
                                <div className="text-center text-black text-xs mt-1 font-bold">
                                    Cần {pet.pet.expStats - pet.exp} EXP để lên cấp {pet.lvl + 1}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Stats */}
                    <div className="space-y-4">
                        {guild && (
                            <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <h3 className="text-lg font-black text-black flex items-center gap-2 mb-3">
                                    🏰 Thông Tin Server
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between bg-gray-100 border-2 border-black px-3 py-2 rounded-xl">
                                        <span className="text-black text-sm font-bold">Tên server:</span>
                                        <span className="text-black font-black text-sm">{guild.name}</span>
                                    </div>
                                    <div className="flex items-center justify-between bg-gray-100 border-2 border-black px-3 py-2 rounded-xl">
                                        <span className="text-black text-sm font-bold">Quyền hạn:</span>
                                        <span className={`font-black px-2 py-1 rounded-full text-xs ${getPermissionBadge(guild).color} border border-black flex items-center gap-1`}>
                                            {getPermissionBadge(guild).icon}
                                            {getPermissionBadge(guild).text}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between bg-gray-100 border-2 border-black px-3 py-2 rounded-xl">
                                        <span className="text-black text-sm font-bold">Bot Status:</span>
                                        <span className={`font-black text-sm flex items-center gap-1 ${guild.hasBot ? 'text-green-600' : 'text-red-600'}`}>
                                            <Bot size={12} />
                                            {guild.hasBot ? 'Đã tham gia' : 'Chưa tham gia'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Hunger Card */}
                        <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-lg font-black text-black flex items-center gap-2">
                                    {getStatusEmoji(calculateHungerPercentage(), 'hunger')} Đói
                                </h3>
                                <span className="text-black font-black text-sm">
                                    {pet.hunger}/{pet.pet.hungerStats}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-4 border-2 border-black overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${getStatusColor(calculateHungerPercentage(), 'hunger')} transition-all duration-1000 ease-out`}
                                    style={{ width: `${calculateHungerPercentage()}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Happiness Card */}
                        <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-lg font-black text-black flex items-center gap-2">
                                    {getStatusEmoji(calculateHappinessPercentage(), 'happiness')} Hạnh Phúc
                                </h3>
                                <span className="text-black font-black text-sm">
                                    {pet.happiness}/{pet.pet.happinessStats}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-4 border-2 border-black overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${getStatusColor(calculateHappinessPercentage(), 'happiness')} transition-all duration-1000 ease-out`}
                                    style={{ width: `${calculateHappinessPercentage()}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServerPet