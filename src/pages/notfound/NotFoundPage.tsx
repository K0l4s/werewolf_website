import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import mascot from "../../assets/images/mascot.png";

const NotFoundPage = () => {
    const [moonPhase, setMoonPhase] = useState(0);

    // Animate the moon phases
    useEffect(() => {
        const interval = setInterval(() => {
            setMoonPhase(prev => (prev + 1) % 8);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const renderMoon = () => {
        // Returns moon emoji based on phase
        const moons = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];
        return moons[moonPhase];
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 text-white flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                {/* Animated Moon */}
                <div className="text-8xl mb-6 h-32 flex items-center justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-violet-500/10 rounded-full blur-xl"></div>
                        <span className="relative z-10">{renderMoon()}</span>
                    </div>
                </div>

                {/* 404 Text */}
                <h1 className="text-9xl font-bold bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent mb-4">
                    404
                </h1>

                <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>

                <p className="text-zinc-400 mb-10 max-w-md mx-auto">
                    The page you're looking for seems to have been lost in the wilderness.
                    Perhaps a werewolf dragged it away?
                </p>

                {/* Navigation Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                    <Link
                        to="/"
                        className="p-4 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 rounded-lg transition-colors flex flex-col items-center"
                    >
                        <span className="text-2xl mb-2">🏠</span>
                        <span>Home</span>
                    </Link>

                    <Link
                        to="/doc"
                        className="p-4 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 rounded-lg transition-colors flex flex-col items-center"
                    >
                        <span className="text-2xl mb-2">📖</span>
                        <span>Documents</span>
                    </Link>

                    <a
                        href="https://discord.com/oauth2/authorize?client_id=1383209480560443392&scope=bot&permissions=8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 bg-violet-600/50 hover:bg-violet-600 border border-violet-500 rounded-lg transition-colors flex flex-col items-center"
                    >
                        <span className="text-2xl mb-2">🎮</span>
                        <span>Add Bot</span>
                    </a>
                </div>

                {/* Mascot Image */}
                <div className="relative inline-block">
                    <div className="absolute -inset-4 bg-violet-500/20 rounded-full blur-xl"></div>
                    <img
                        src={mascot}
                        alt="Werewolf Bot Mascot"
                        className="relative w-40 h-40 rounded-full bg-zinc-800 border-4 border-violet-500 mx-auto object-cover"
                    />
                </div>

                {/* Footer */}
                <footer className="mt-12 pt-8 border-t border-zinc-800 text-sm text-zinc-500">
                    <p>© 2025 Werewolf Bot. All rights reserved.</p>
                    <p className="mt-2">
                        Developed by Huỳnh Trung Kiên (Kiên Học Code / Kolas)  <a href="mailto:trungkienhuynh.contact@gmail.com?subject=Werewolf Bot Inquiry" className="text-blue-400 hover:text-blue-600 hover:underline">
                        Contact here
                    </a>
                    </p>
                    
                </footer>
            </div>
        </div>
    );
};

export default NotFoundPage;