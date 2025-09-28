import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { axiosAuth, axiosNoAuth } from "../../utils/axiosIntance"
import type { GuildPet } from "../../models/pet"
import type { Guild } from "../../models/guild"
import Tooltip from "../../components/custom/Tooltip"
import { Pencil } from "lucide-react"

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
        if (type === 'exp') return 'from-purple-500 to-pink-500'
        if (percentage >= 70) return 'from-green-500 to-emerald-400'
        if (percentage >= 40) return 'from-yellow-500 to-amber-400'
        return 'from-red-500 to-orange-400'
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
        if (guild.owner) return { text: "Chủ Server", color: "from-red-500 to-pink-500", emoji: "👑" }
        if (guild.admin) return { text: "Quản Trị Viên", color: "from-orange-500 to-red-500", emoji: "⚡" }
        if (guild.manager) return { text: "Quản Lý", color: "from-blue-500 to-cyan-500", emoji: "🔧" }
        return { text: "Thành Viên", color: "from-green-500 to-emerald-500", emoji: "👤" }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <div className="text-yellow-400 text-xl font-bold animate-pulse">Đang tải thú cưng...</div>
                </div>
            </div>
        )
    }

    if (!pet) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🐲</div>
                    <div className="text-red-400 text-xl font-bold">Không tìm thấy pet!</div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4 overflow-auto">
            {/* Background Decoration */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-10 left-10 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                <div className="absolute top-20 right-20 w-6 h-6 bg-pink-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 left-20 w-8 h-8 bg-cyan-400 rounded-full animate-bounce"></div>
            </div>

            <div className="max-w-6xl mx-auto">
                {/* Header with Back Button and Guild Info */}
                <div className="flex items-center justify-between mb-8">
                    {/* Back Button */}
                    <Link
                        to="/dashboard"
                        className="group flex items-center gap-3 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-lg px-6 py-3 rounded-2xl border-2 border-slate-600 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105"
                    >
                        <div className="text-yellow-400 text-xl group-hover:animate-bounce">←</div>
                        <div className="text-white font-bold">Quay về Dashboard</div>
                    </Link>

                    {/* Guild Info */}
                    {guild && (
                        <div className="flex items-center gap-4 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-lg px-6 py-4 rounded-2xl border-2 border-purple-500/30">
                            {/* Guild Icon */}
                            <div className="relative">
                                {guild.icon ? (
                                    <img
                                        src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                                        alt={guild.name.toString()}
                                        className="w-16 h-16 rounded-full border-2 border-white/30 shadow-md"
                                    />
                                ) : (

                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center border-2 border-white/30 shadow-md">

                                        <span className="text-xl font-bold text-white">
                                            {guild.name.toString().charAt(0)}
                                        </span>

                                    </div>
                                )}

                            </div>

                            {/* Guild Details */}
                            <div className="text-white">
                                <h2 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                    {guild.name}
                                </h2>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`bg-gradient-to-r ${getPermissionBadge(guild).color} px-3 py-1 rounded-full text-xs font-bold border border-white/20`}>
                                        {getPermissionBadge(guild).emoji} {getPermissionBadge(guild).text}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Pet Header */}
                <div className="text-center mb-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent skew-y-3"></div>
                    <div className="relative inline-block">
                        <Tooltip text={pet.name} position="top">
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                                {pet.name}
                            </h1>
                        </Tooltip>
                        {(guild?.admin || guild?.manager || guild?.owner) && (
                            <div className="absolute top-5 -right-3 translate-x-full -translate-y-1/2">
                                <Tooltip text="Đổi tên pet" position="top">
                                    <Pencil className="w-4 h-4 cursor-pointer text-gray-300 hover:text-gray-700" />
                                </Tooltip>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center items-center gap-4 text-white/80 relative z-10">
                        <span className="bg-blue-600/50 px-3 py-1 rounded-full border border-blue-400">
                            Lv. {pet.lvl}
                        </span>
                        <span className="bg-purple-600/50 px-3 py-1 rounded-full border border-purple-400">
                            {pet.pet.type}
                        </span>
                        <span className="bg-green-600/50 px-3 py-1 rounded-full border border-green-400">
                            🍀 +{pet.pet.luckyBoost}%
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Left Column - Pet Display */}
                    <div className="relative">
                        {/* Pet Container */}
                        <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg rounded-3xl border-2 border-yellow-500/30 p-8 shadow-2xl">
                            {/* Action Effects */}
                            {actionEffect === 'feed' && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="text-6xl animate-bounce">🍖</div>
                                    <div className="absolute text-yellow-400 text-2xl animate-ping">+10</div>
                                </div>
                            )}
                            {actionEffect === 'play' && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="text-6xl animate-bounce">🎾</div>
                                    <div className="absolute text-green-400 text-2xl animate-ping">+5</div>
                                </div>
                            )}

                            {/* Pet Image */}
                            <div className="relative flex justify-center">
                                <div className="relative">
                                    <img
                                        src={pet.pet.image}
                                        alt={pet.name}
                                        className="w-80 h-80 object-cover rounded-2xl border-4 border-yellow-400 shadow-lg transform hover:scale-105 transition-transform duration-300"
                                    />
                                    {/* Level Badge */}
                                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full font-bold border-2 border-yellow-300 shadow-lg">
                                        Lv.{pet.lvl}
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 gap-6 mt-8">
                                <button
                                    onClick={feedPet}
                                    disabled={actionLoading === "feeding"}
                                    className={`relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 border-yellow-400 ${actionLoading === "feeding" ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    {actionLoading === "feeding" ? (
                                        <span className="animate-pulse">Đang cho ăn...</span>
                                    ) : (
                                        <>
                                            🍖 Cho ăn
                                            <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full">
                                                +{pet.pet.hungerStats}
                                            </div>
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={playWithPet}
                                    disabled={actionLoading === "playing"}
                                    className={`relative bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 border-emerald-400 ${actionLoading === "playing" ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    {actionLoading === "playing" ? (
                                        <span className="animate-pulse">Đang chơi...</span>
                                    ) : (
                                        <>
                                            🎾 Chơi cùng
                                            <div className="absolute -top-2 -right-2 bg-emerald-400 text-black text-xs px-2 py-1 rounded-full">
                                                +{pet.pet.happinessStats}
                                            </div>
                                        </>
                                    )}
                                </button>

                            </div>

                            {/* Last Action Times */}
                            <div className="mt-6 flex justify-between text-white/70 text-sm">
                                <div className="bg-slate-700/50 px-4 py-2 rounded-full border border-slate-600">
                                    ⏱️ Ăn: {getTimeSinceLastAction(pet.lastFed)}
                                </div>
                                <div className="bg-slate-700/50 px-4 py-2 rounded-full border border-slate-600">
                                    ⏱️ Chơi: {getTimeSinceLastAction(pet.lastPlayed)}
                                </div>
                            </div>

                            <div className="mt-6 bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-lg rounded-3xl border-2 border-purple-400/30 p-6 shadow-2xl">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                        ⭐ Kinh Nghiệm
                                    </h3>
                                    <span className="text-yellow-400 font-bold">
                                        {pet.exp}/{pet.pet.expStats}
                                    </span>
                                </div>
                                <div className="w-full bg-slate-700/50 rounded-full h-6 border-2 border-slate-600 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000 ease-out`}
                                        style={{ width: `${calculateExpPercentage()}%` }}
                                    ></div>
                                </div>
                                <div className="text-center text-white/70 text-sm mt-2">
                                    Cần {pet.pet.expStats - pet.exp} EXP để lên cấp {pet.lvl + 1}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column - Stats */}
                    <div className="space-y-6">
                        {guild && (
                            <div className="bg-gradient-to-br from-indigo-900/50 to-blue-900/50 backdrop-blur-lg rounded-3xl border-2 border-indigo-400/30 p-6 shadow-2xl">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                                    🏰 Thông Tin Server
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between bg-slate-700/30 px-4 py-3 rounded-xl border border-slate-600">
                                        <span className="text-white/80">Tên server:</span>
                                        <span className="text-yellow-400 font-bold">{guild.name}</span>
                                    </div>
                                    <div className="flex items-center justify-between bg-slate-700/30 px-4 py-3 rounded-xl border border-slate-600">
                                        <span className="text-white/80">Quyền hạn:</span>
                                        <span className={`font-bold px-3 py-1 rounded-full text-xs bg-gradient-to-r ${getPermissionBadge(guild).color}`}>
                                            {getPermissionBadge(guild).emoji} {getPermissionBadge(guild).text}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between bg-slate-700/30 px-4 py-3 rounded-xl border border-slate-600">
                                        <span className="text-white/80">Bot Status:</span>
                                        <span className={`font-bold ${guild.hasBot ? 'text-green-400' : 'text-red-400'}`}>
                                            {guild.hasBot ? 'Đã tham gia server' : 'Chưa tham gia server'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Hunger Card */}
                        <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 backdrop-blur-lg rounded-3xl border-2 border-orange-400/30 p-6 shadow-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    {getStatusEmoji(calculateHungerPercentage(), 'hunger')} Đói
                                </h3>
                                <span className="text-orange-400 font-bold">
                                    {pet.hunger}/{pet.pet.hungerStats}
                                </span>
                            </div>
                            <div className="w-full bg-slate-700/50 rounded-full h-6 border-2 border-slate-600 overflow-hidden">
                                <div
                                    className={`h-full rounded-full bg-gradient-to-r ${getStatusColor(calculateHungerPercentage(), 'hunger')} transition-all duration-1000 ease-out`}
                                    style={{ width: `${calculateHungerPercentage()}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Happiness Card */}
                        <div className="bg-gradient-to-br from-emerald-900/50 to-cyan-900/50 backdrop-blur-lg rounded-3xl border-2 border-emerald-400/30 p-6 shadow-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    {getStatusEmoji(calculateHappinessPercentage(), 'happiness')} Hạnh Phúc
                                </h3>
                                <span className="text-emerald-400 font-bold">
                                    {pet.happiness}/{pet.pet.happinessStats}
                                </span>
                            </div>
                            <div className="w-full bg-slate-700/50 rounded-full h-6 border-2 border-slate-600 overflow-hidden">
                                <div
                                    className={`h-full rounded-full bg-gradient-to-r ${getStatusColor(calculateHappinessPercentage(), 'happiness')} transition-all duration-1000 ease-out`}
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