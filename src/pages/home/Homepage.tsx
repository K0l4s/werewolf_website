import FeatureCard from "../../components/card/FeatureCard";
import pet from "../../assets/images/pet.png";
import werewolf from "../../assets/images/werewolf.png";
import minigame from "../../assets/images/minigame.png";
import shop from "../../assets/images/shop.png";
import voice from "../../assets/images/voice.png";
import herobanner from "../../assets/images/herobanner.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosNoAuth } from "../../utils/axiosIntance";
import CustomSlideShow from "../../components/custom/CustomSlideShow";
import ScrollDownButton from "../../components/custom/ScrollDownButton";

const Homepage = () => {
    const [health, setHealth] = useState<{
        guildsCount: number;
        usersCount: number;
        topGuilds: {
            id: string;
            name: string;
            memberCount: number;
            guildIcon: string;
        }[];
    } | null>(null);

    useEffect(() => {
        const getDetails = async () => {
            try {
                const response = await axiosNoAuth.get("health");
                setHealth(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching health details:", error);
            }
        };
        getDetails();
    }, []);
    const slides = [
        {
            image: 'https://cdn2.tuoitre.vn/thumb_w/730/471584752817336320/2024/1/17/build-a-learning-habit-17054833388601968706382.png',
            title: 'Server Streaks',
            description: 'Encourage daily activity with voice channel streaks and keep your community engaged.',
            label: 'New Feature',
            labelColor: 'bg-orange-500',
            actionButton: {
                text: 'Learn More',
                onClick: () => {
                    // console.log('Navigate to nature tours');
                    // window.open('/tours', '_blank');
                    window.open('/guide/server', '_blank');
                },
                variant: 'secondary' as const
            }
        },
        {
            image: 'https://rare-gallery.com/mocahbig/420072-Zsolt-Kosa-werewolves-digital-art-open-mouth-creature.jpg',
            title: 'Werewolf Game Integration',
            description: 'Host exciting Werewolf games directly in your Discord server with automated management.',
            label: 'Popular',
            labelColor: 'bg-blue-500',
            actionButton: {
                text: 'Explore Now',
                onClick: () => {
                    // console.log('Show adventure details');
                    // alert('Chi tiết phiêu lưu sẽ được hiển thị!');
                    window.open('/guide/werewolf', '_blank');
                },
                variant: 'secondary' as const
            }
        },
        {
            image: 'https://images.squarespace-cdn.com/content/v1/5c355789a2772c751fadfdd1/1547028490366-4QJEWJSLI379A13CTO4B/hello+goodbye+banner.png?format=2500w',
            title: 'Welcome/ Farewell Messages',
            description: 'Automate welcome and farewell messages for your Discord server members.',
            label: 'Popular',
            labelColor: 'bg-blue-500',
            actionButton: {
                text: 'Explore Now',
                onClick: () => {
                    // console.log('Show adventure details');
                    // alert('Chi tiết phiêu lưu sẽ được hiển thị!');
                    window.open('/guide/server', '_blank');
                },
                variant: 'secondary' as const
            }
        },
        {
            image: 'https://www.vip-polymers.com/wp-content/uploads/2015/04/Global-Banner.jpg',
            title: 'Join/ Leave Voice Channel Notifications',
            description: 'Automate join and leave voice channel notifications for your Discord server members.',
            label: 'Popular',
            labelColor: 'bg-blue-500',
            actionButton: {
                text: 'Explore Now',
                onClick: () => {
                    // console.log('Show adventure details');
                    // alert('Chi tiết phiêu lưu sẽ được hiển thị!');
                    window.open('/guide/server', '_blank');
                },
                variant: 'secondary' as const
            }
        },
        {
            image: 'https://t4.ftcdn.net/jpg/05/13/87/33/360_F_513873331_RKPiIG9gVUmVGzyeWj0nn9bHLvJHQNUf.jpg',
            title: 'Minigames & Soul Land',
            label: 'Fun',
            labelColor: 'bg-purple-500',
            description: 'Engage your community with fun minigames and immerse them in the world of Soul Land.',
            actionButton: {
                text: 'Explore Now',
                onClick: () => {
                    // console.log('Book tour');
                    // Thực hiện đặt tour
                },
                variant: 'secondary' as const
            }
        },
        {
            image: 'https://dbppl.com/wp-content/uploads/2020/09/banner-web-content-management-system.jpg',
            title: 'Server Management Tools',
            label: 'Admin',
            labelColor: 'bg-green-500',
            description: 'Powerful tools to help you manage and grow your Discord community effectively.',
            actionButton: {
                text: 'Learn More',
                onClick: () => {
                    //     console.log('Learn more about server management tools');
                    window.open('/guide/server', '_blank');
                }
            }
        }
    ];

    const slidesWithCustomActions = [
        ...slides,
    ];

    return (

        <div>
            {/* HERO SECTION */}

            <section className="max-w-7xl mx-auto px-6 py-6 overflow-x-hidden">
                <div className="overflow-x-visible">
                    <CustomSlideShow
                        slides={slidesWithCustomActions}
                        autoPlay
                        interval={5000}
                        showIndicators
                        showNavigation
                    />
                </div>

                <ScrollDownButton />

                <div className="grid xl:grid-cols-12 lg:grid-cols-12 gap-10 items-center">
                    {/* Content Section */}
                    <div className="col-span-12 lg:col-span-7">
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-violet-900/40 to-purple-900/40 border border-violet-700/30 text-violet-300 text-sm font-medium">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                            Bot Online • {health?.guildsCount?.toLocaleString() || "9,000+"} Servers
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                            Elevate Your Discord <br />
                            <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
                                Experience
                            </span>
                        </h1>

                        <p className="text-zinc-300 text-lg max-w-2xl mb-8 leading-relaxed">
                            Keldo is the ultimate multi-purpose Discord bot that transforms ordinary servers
                            into vibrant communities. With powerful features and seamless integrations,
                            we're redefining what a Discord bot can do.
                        </p>

                        {/* Stats Highlight */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                            <div className="text-center p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                                <div className="text-2xl font-bold text-white">
                                    {health?.guildsCount ? health.guildsCount > 1000 ? Math.floor(health.guildsCount / 1000) + "k+" : health.guildsCount : "9k+"}
                                </div>
                                <div className="text-xs text-zinc-400 mt-1">Servers</div>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                                <div className="text-2xl font-bold text-white">24/7</div>
                                <div className="text-xs text-zinc-400 mt-1">Uptime</div>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                                <div className="text-2xl font-bold text-white">20+</div>
                                <div className="text-xs text-zinc-400 mt-1">Features</div>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                                <div className="text-2xl font-bold text-white">{health?.usersCount ? health.usersCount > 1000000 ? Math.floor(health.usersCount / 1000000) + "M+" : health.usersCount : "2M+"}</div>
                                <div className="text-xs text-zinc-400 mt-1">Users</div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <button
                                className="group px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 font-semibold cursor-pointer transition-all duration-300 hover:from-violet-500 hover:to-purple-500 hover:shadow-2xl hover:shadow-violet-500/20 flex items-center justify-center gap-2"
                                onClick={() =>
                                    window.open(
                                        "https://discord.com/oauth2/authorize?client_id=1383209480560443392&scope=bot&permissions=8",
                                        "_blank"
                                    )
                                }
                            >
                                <span>Add To Discord</span>
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                            <Link to="mailto:trungkienhuynh.contact@gmail.com?subject=Custom%20Discord%20Bot%20Inquiry">
                                <button className="px-8 py-4 rounded-xl bg-zinc-800 text-zinc-200 cursor-pointer transition-all duration-300 hover:bg-zinc-700 hover:shadow-lg border border-zinc-700 hover:border-zinc-600">
                                    Custom Bot Request
                                </button>
                            </Link>
                        </div>

                        {/* Trusted Communities */}
                        <div className="border-t border-zinc-800 pt-10">
                            <div className="text-sm uppercase mb-6 font-bold text-zinc-300 tracking-wider">
                                Trusted by Top Communities
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {(health?.topGuilds ?? Array.from({ length: 6 })).map((guild, i) => (
                                    <div
                                        key={guild?.id ?? i}
                                        className="group flex items-center gap-4 bg-zinc-900/40 px-4 py-3 rounded-xl border border-zinc-800 hover:border-violet-500/30 transition-all duration-300"
                                    >
                                        <div className="relative">
                                            <img
                                                src={guild?.guildIcon ?? ""}
                                                alt=""
                                                className="w-12 h-12 rounded-lg bg-zinc-800 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-zinc-900"></div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-white font-medium truncate">
                                                {guild?.name ?? `Community ${i + 1}`}
                                            </div>
                                            <div className="text-zinc-400 text-xs flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                                </svg>
                                                {guild?.memberCount
                                                    ? `${guild.memberCount.toLocaleString()} Members`
                                                    : `${(i + 1) * 50}k Members`}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Hero Image Section */}
                    <div className="col-span-12 lg:col-span-5 mt-8 lg:mt-0">
                        <div className="relative">
                            <div className="absolute inset-0 sm:-inset-4 bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-3xl blur-xl"></div>
                            <div className="relative rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-8 shadow-2xl border border-zinc-800 overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full translate-y-12 -translate-x-12"></div>

                                <img
                                    src={herobanner}
                                    alt="Keldo Discord Bot Dashboard Preview"
                                    className="relative w-full rounded-xl bg-zinc-900/60 border border-zinc-700 object-cover shadow-lg z-10"
                                />

                                {/* Floating Elements */}
                                <div className="absolute bottom-6 left-6 bg-zinc-900/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-zinc-700 shadow-lg z-20">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                                        <span className="text-xs font-medium text-white">Live Activity</span>
                                    </div>
                                    <div className="text-xs text-zinc-400 mt-1">Active in {health?.guildsCount?.toLocaleString() || "9,000+"} servers</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* FEATURES SECTION */}
            <main className="max-w-6xl mx-auto px-6">
                <FeatureCard
                    title="Voice Channel & Activity System"
                    text="Keldo notifies when members join or leave voice channels, and keeps daily activity streaks alive across your server."
                    imgSrc={voice}
                    linkTo="/guide/server"
                />

                <FeatureCard
                    align="right"
                    title="Play Werewolf Right in Discord"
                    text="Enjoy the classic Werewolf (Mafia) game with automated logic and smooth UI — no moderator needed!"
                    imgSrc={werewolf}
                    linkTo="/guide/werewolf"
                />

                <FeatureCard
                    title="Minigames & Soul Land Integration"
                    text="Challenge friends in fun mini-games or awaken your spirit to become a Spirit Master in the Soul Land world."
                    imgSrc={minigame}
                />

                <FeatureCard
                    align="right"
                    title="Raise Pets Together"
                    text="Let your community raise adorable pets together, feed them, and compete on global and server leaderboards."
                    imgSrc={pet}
                />

                <FeatureCard
                    title="Item Shop & Profile System"
                    text="Buy food, boosters, and unique items in the store. Customize your profile and show off your achievements."
                    imgSrc={shop}
                />
            </main>
            {/* EXTRA FEATURES SECTION */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold text-center mb-8">
                    🌟 Explore All Keldo Features
                </h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-zinc-300">
                    {[
                        { icon: "🔔", text: "Real-time notifications for members joining or leaving voice channels." },
                        { icon: "👋", text: "Welcome and farewell messages for new or departing server members." },
                        { icon: "🔥", text: "Streak system – track user activity and maintain daily voice channel chains." },
                        { icon: "🐺", text: "Integrated Werewolf game mode for community fun." },
                        { icon: "🎮", text: "A variety of minigames to entertain users." },
                        { icon: "⚔️", text: "Soul Land (Đấu La Đại Lục) game integration." },
                        { icon: "🐾", text: "Server-wide Pet system – raise and feed pets together." },
                        { icon: "🏆", text: "Cross-server and in-server leaderboards for ranking users and pets." },
                        { icon: "🛒", text: "Item shop with foods, boosters, and utility items." },
                        { icon: "🧑‍💼", text: "Profile management commands and additional administrative tools." },
                        { icon: "💡", text: "And many other features designed to make servers more engaging and lively." },
                    ].map((feature, i) => (
                        <div
                            key={i}
                            className="flex items-start gap-3 bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 hover:bg-zinc-900/70 transition-all"
                        >
                            <div className="text-2xl">{feature.icon}</div>
                            <p className="text-sm text-zinc-300 leading-relaxed">{feature.text}</p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default Homepage;
