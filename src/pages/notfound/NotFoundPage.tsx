import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import mascot from "../../assets/images/mascot.png";

type Season = "spring" | "summer" | "autumn" | "winter";

interface FallingElement {
    id: number;
    left: number;
    delay: number;
    size: number;
    duration: number;
    opacity: number;
}

interface SeasonConfig {
    gradient: string;
    textColor: string;
    borderColor: string;
    bgColor: string;
    hoverBg: string;
    accentColor: string;
    description: string;
}

const NotFoundPage = () => {
    const [moonPhase, setMoonPhase] = useState<number>(0);
    const [currentSeason, setCurrentSeason] = useState<Season>("spring");
    const [fallingElements, setFallingElements] = useState<FallingElement[]>([]);

    // Xác định mùa hiện tại dựa trên tháng
    useEffect(() => {
        const month = new Date().getMonth() + 1;
        if (month >= 1 && month <= 3) setCurrentSeason("spring");
        else if (month >= 4 && month <= 6) setCurrentSeason("summer");
        else if (month >= 7 && month <= 9) setCurrentSeason("autumn");
        else setCurrentSeason("winter");
    }, []);

    // Tạo hiệu ứng rơi cho các mùa
    useEffect(() => {
        let elementCount = 0;
        let elements: FallingElement[] = [];

        switch (currentSeason) {
            case "winter":
                elementCount = 50;
                elements = Array.from({ length: elementCount }, (_, i) => ({
                    id: i,
                    left: Math.random() * 100,
                    delay: Math.random() * 15,
                    size: Math.random() * 5 + 3,
                    duration: Math.random() * 15 + 15,
                    opacity: Math.random() * 0.8 + 0.2
                }));
                break;
            case "autumn":
                elementCount = 15;
                elements = Array.from({ length: elementCount }, (_, i) => ({
                    id: i,
                    left: Math.random() * 100,
                    delay: Math.random() * 12,
                    size: Math.random() * 8 + 6,
                    duration: Math.random() * 12 + 12,
                    opacity: Math.random() * 0.7 + 0.3
                }));
                break;
            case "spring":
                elementCount = 12;
                elements = Array.from({ length: elementCount }, (_, i) => ({
                    id: i,
                    left: Math.random() * 100,
                    delay: Math.random() * 10,
                    size: Math.random() * 6 + 4,
                    duration: Math.random() * 10 + 10,
                    opacity: Math.random() * 0.6 + 0.4
                }));
                break;
            default:
                elements = [];
        }

        setFallingElements(elements);
    }, [currentSeason]);

    // Animate the moon phases
    useEffect(() => {
        const interval = setInterval(() => {
            setMoonPhase(prev => (prev + 1) % 8);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const renderMoon = (): string => {
        const moons = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];
        return moons[moonPhase];
    };

    const renderCelestialBody = (): string => {
        switch (currentSeason) {
            case "spring":
                return "🌸";
            case "summer":
                return "☀️";
            case "autumn":
                return "🍂";
            case "winter":
                return "❄️";
            default:
                return renderMoon();
        }
    };

    const getFallingElement = (element: FallingElement): string => {
        switch (currentSeason) {
            case "winter":
                return "❄";
            case "autumn":
                return element.id % 3 === 0 ? "🍁" : element.id % 3 === 1 ? "🍂" : "🥮";
            case "spring":
                return element.id % 2 === 0 ? "🌸" : "💮";
            default:
                return "";
        }
    };

    const getSeasonConfig = (): SeasonConfig => {
        const configs: Record<Season, SeasonConfig> = {
            spring: {
                gradient: "from-green-900 via-emerald-900 to-green-950",
                textColor: "text-green-400",
                borderColor: "border-green-500",
                bgColor: "bg-green-500/20",
                hoverBg: "hover:bg-green-600/30",
                accentColor: "from-green-400 to-emerald-300",
                description: "You lost something in the spring flowers?"
            },
            summer: {
                gradient: "from-orange-900 via-amber-900 to-yellow-950",
                textColor: "text-yellow-400",
                borderColor: "border-yellow-500",
                bgColor: "bg-yellow-500/20",
                hoverBg: "hover:bg-yellow-600/30",
                accentColor: "from-yellow-400 to-orange-300",
                description: "You lost something in the summer sun?"
            },
            autumn: {
                gradient: "from-amber-900 via-orange-900 to-red-950",
                textColor: "text-orange-400",
                borderColor: "border-orange-500",
                bgColor: "bg-orange-500/20",
                hoverBg: "hover:bg-orange-600/30",
                accentColor: "from-orange-400 to-amber-300",
                description: "You lost something in the autumn leaves?"
            },
            winter: {
                gradient: "from-blue-900 via-indigo-900 to-cyan-950",
                textColor: "text-cyan-400",
                borderColor: "border-cyan-500",
                bgColor: "bg-cyan-500/20",
                hoverBg: "hover:bg-cyan-600/30",
                accentColor: "from-cyan-400 to-blue-300",
                description: "You lost something in the winter snow?"
            }
        };
        return configs[currentSeason];
    };
    const clientId = import.meta.env.VITE_CLIENT_ID;

    const seasonConfig = getSeasonConfig();

    return (
        <div className={`min-h-screen bg-gradient-to-b ${seasonConfig.gradient} text-white flex items-center justify-center px-4 relative overflow-hidden`}>

            {/* Hiệu ứng rơi cho các mùa */}
            {(currentSeason === "winter" || currentSeason === "autumn" || currentSeason === "spring") && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {fallingElements.map(element => (
                        <div
                            key={element.id}
                            className={`absolute ${currentSeason === "winter" ? "text-white" :
                                currentSeason === "autumn" ? "text-yellow-500" :
                                    "text-pink-300"
                                } animate-fall-fade`}
                            style={{
                                left: `${element.left}%`,
                                animationDelay: `${element.delay}s`,
                                fontSize: `${element.size}px`,
                                animationDuration: `${element.duration}s`,
                                opacity: element.opacity
                            }}
                        >
                            {getFallingElement(element)}
                        </div>
                    ))}
                </div>
            )}

            <div className="max-w-2xl w-full text-center relative z-10">
                {/* Celestial Body */}
                <div className="text-8xl mb-6 h-32 flex items-center justify-center">
                    <div className="relative">
                        <div className={`absolute inset-0 ${seasonConfig.bgColor} rounded-full blur-xl`}></div>
                        <span className="relative z-10 animate-pulse">
                            {renderCelestialBody()}
                        </span>
                    </div>
                </div>

                {/* 404 Text */}
                <h1 className={`text-9xl font-bold bg-gradient-to-r ${seasonConfig.accentColor} bg-clip-text text-transparent mb-4`}>
                    404
                </h1>

                <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>

                <p className="text-zinc-300 mb-10 max-w-md mx-auto">
                    {seasonConfig.description}
                </p>

                {/* Navigation Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                    <Link
                        to="/"
                        className={`p-4 bg-zinc-800/50 ${seasonConfig.hoverBg} border ${seasonConfig.borderColor} rounded-lg transition-all duration-300 flex flex-col items-center transform hover:scale-105`}
                    >
                        <span className="text-2xl mb-2">🏠</span>
                        <span>Home</span>
                    </Link>

                    <Link
                        to="/doc"
                        className={`p-4 bg-zinc-800/50 ${seasonConfig.hoverBg} border ${seasonConfig.borderColor} rounded-lg transition-all duration-300 flex flex-col items-center transform hover:scale-105`}
                    >
                        <span className="text-2xl mb-2">📖</span>
                        <span>Documents</span>
                    </Link>

                    <a
                        href={`https://discord.com/oauth2/authorize?client_id=${clientId}&scope=bot&permissions=8`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-4 ${seasonConfig.bgColor} ${seasonConfig.hoverBg} border ${seasonConfig.borderColor} rounded-lg transition-all duration-300 flex flex-col items-center transform hover:scale-105`}
                    >
                        <span className="text-2xl mb-2">🎮</span>
                        <span>Add Bot</span>
                    </a>
                </div>

                {/* Mascot Image */}
                <div className="relative inline-block">
                    <div className={`absolute -inset-4 ${seasonConfig.bgColor} rounded-full blur-xl`}></div>
                    <img
                        src={mascot}
                        alt="Keldo Bot Mascot"
                        className={`relative w-40 h-40 rounded-full bg-zinc-800 border-4 ${seasonConfig.borderColor} mx-auto object-cover transform transition-all duration-500 hover:scale-110`}
                    />
                </div>

                {/* Season Indicator */}
                <div className={`mt-6 inline-block px-4 py-2 rounded-full ${seasonConfig.bgColor} border ${seasonConfig.borderColor} text-sm capitalize`}>
                    {currentSeason} Season
                </div>

                {/* Footer */}
                <footer className="mt-12 pt-8 border-t border-zinc-700 text-sm text-zinc-400">
                    <p>© 2025 Keldo Bot. All rights reserved.</p>
                    <p className="mt-2">
                        Developed by Huỳnh Trung Kiên (Kiên Học Code / Kolas)
                        <a
                            href="mailto:trungkienhuynh.contact@gmail.com?subject=Keldo Bot Inquiry"
                            className="text-blue-400 hover:text-blue-300 hover:underline ml-1"
                        >
                            Contact here
                        </a>
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default NotFoundPage;