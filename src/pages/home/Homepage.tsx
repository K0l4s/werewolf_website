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

            <section className="max-w-6xl mx-auto mt-2 px-6 py-12">
                <CustomSlideShow
                    slides={slidesWithCustomActions}
                    autoPlay={true}
                    interval={5000}
                    showIndicators={true}
                    showNavigation={true}
                />
                <div className="grid xl:grid-cols-12 lg:grid-cols-12 gap-6 items-center">
                    <div className="col-span-12 lg:col-span-7">
                        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-sm">
                            Multi-purpose Discord Bot
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                            Make Your Discord Server <br /> More Alive with <span className="text-violet-500">Keldo</span>!
                        </h1>
                        <p className="text-zinc-400 max-w-xl mb-6">
                            Keldo is a multi-purpose Discord bot designed to make your community more engaging and interactive.
                            From game integrations like Werewolf and Soul Land to server management tools, Keldo brings everything your community needs in one place.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                className="px-5 py-3 rounded-md bg-violet-600 font-semibold cursor-pointer"
                                onClick={() =>
                                    window.open(
                                        "https://discord.com/oauth2/authorize?client_id=1383209480560443392&scope=bot&permissions=8",
                                        "_blank"
                                    )
                                }
                            >
                                Add To Discord
                            </button>
                            <Link to="mailto:trungkienhuynh.contact@gmail.com?subject=Contact%20letter%20">
                                <button className="px-5 py-3 rounded-md bg-zinc-800 text-zinc-200 cursor-pointer">
                                    Want a Custom Discord Bot?
                                </button>
                            </Link>
                        </div>

                        {/* TRUSTED SERVERS */}
                        <div className="mt-10 text-zinc-400">
                            <div className="text-xs uppercase mb-4 font-bold text-zinc-300">
                                Trusted by over {health?.guildsCount?.toLocaleString() || "9,000+"} Discord servers, including
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {(health?.topGuilds ?? Array.from({ length: 6 })).map((guild, i) => (
                                    <div
                                        key={guild?.id ?? i}
                                        className="flex items-center gap-3 bg-zinc-900/30 px-3 py-2 rounded-md"
                                    >
                                        <img
                                            src={guild?.guildIcon ?? ""}
                                            alt=""
                                            className="w-15 h-15 rounded-md bg-zinc-800 object-cover object-center"
                                        />
                                        <div className="text-sm">
                                            <div className="text-white font-medium">
                                                {guild?.name ?? `Community ${i + 1}`}
                                            </div>
                                            <div className="text-zinc-400 text-xs">
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

                    {/* HERO IMAGE */}
                    <div className="col-span-12 lg:col-span-5 mt-8 lg:mt-0">
                        <div className="rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-800 p-6 shadow-2xl">
                            <img
                                src={herobanner}
                                alt="banner"
                                className="h-64 md:h-96 w-full rounded-xl bg-zinc-900/60 border border-zinc-700 object-cover"
                            />
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
                />

                <FeatureCard
                    align="right"
                    title="Play Werewolf Right in Discord"
                    text="Enjoy the classic Werewolf (Mafia) game with automated logic and smooth UI — no moderator needed!"
                    imgSrc={werewolf}
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
