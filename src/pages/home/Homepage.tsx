import FeatureCard from "../../components/card/FeatureCard";
import pet from "../../assets/images/pet.png";
import werewolf from "../../assets/images/werewolf.png";
import minigame from "../../assets/images/minigame.png";
import shop from "../../assets/images/shop.png";
import voice from "../../assets/images/voice.png";
import herobanner from "../../assets/images/herobanner.png";
import giveaway from "../../assets/images/giveaway.png";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosNoAuth } from "../../utils/axiosIntance";
import CustomSlideShow from "../../components/custom/CustomSlideShow";
import ScrollDownButton from "../../components/custom/ScrollDownButton";
import { ArrowRight, Users, Zap, GamepadIcon, Bot } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";


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
    const {language} = useLanguage()
    const t = language.homepage;

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
            image: 'https://www.innerdrive.co.uk/wp-content/uploads/2024/01/Why-its-good-to-ask-for-help.jpg',
            title: t.slides.ticketSystem.title,
            description: t.slides.ticketSystem.description,
            label: t.slides.ticketSystem.label,
            labelColor: 'bg-yellow-500',
            actionButton: {
                text: t.slides.ticketSystem.actionText,
                onClick: () => {
                    window.open('/guide/giveaway', '_blank');
                },
                variant: 'secondary' as const
            }
        },
        {
            image: 'https://img.freepik.com/premium-vector/giveaway-logo-template-social-media-post-website-banner_123447-3076.jpg',
            title: t.slides.giveawaySystem.title,
            description: t.slides.giveawaySystem.description,
            label: t.slides.giveawaySystem.label,
            labelColor: 'bg-blue-500',
            actionButton: {
                text: t.slides.giveawaySystem.actionText,
                onClick: () => {
                    window.open('/guide/giveaway', '_blank');
                },
                variant: 'secondary' as const
            }
        },
        {
            image: 'https://cdn2.tuoitre.vn/thumb_w/730/471584752817336320/2024/1/17/build-a-learning-habit-17054833388601968706382.png',
            title: t.slides.serverStreaks.title,
            description: t.slides.serverStreaks.description,
            label: t.slides.serverStreaks.label,
            labelColor: 'bg-orange-500',
            actionButton: {
                text: t.slides.serverStreaks.actionText,
                onClick: () => {
                    window.open('/guide/server', '_blank');
                },
                variant: 'secondary' as const
            }
        },
        {
            image: 'https://rare-gallery.com/mocahbig/420072-Zsolt-Kosa-werewolves-digital-art-open-mouth-creature.jpg',
            title: t.slides.werewolfGame.title,
            description: t.slides.werewolfGame.description,
            label: t.slides.werewolfGame.label,
            labelColor: 'bg-blue-500',
            actionButton: {
                text: t.slides.werewolfGame.actionText,
                onClick: () => {
                    window.open('/guide/werewolf', '_blank');
                },
                variant: 'secondary' as const
            }
        },
        {
            image: 'https://images.squarespace-cdn.com/content/v1/5c355789a2772c751fadfdd1/1547028490366-4QJEWJSLI379A13CTO4B/hello+goodbye+banner.png?format=2500w',
            title: t.slides.welcomeMessages.title,
            description: t.slides.welcomeMessages.description,
            label: t.slides.welcomeMessages.label,
            labelColor: 'bg-blue-500',
            actionButton: {
                text: t.slides.welcomeMessages.actionText,
                onClick: () => {
                    window.open('/guide/server', '_blank');
                },
                variant: 'secondary' as const
            }
        },
        {
            image: 'https://www.vip-polymers.com/wp-content/uploads/2015/04/Global-Banner.jpg',
            title: t.slides.voiceNotifications.title,
            description: t.slides.voiceNotifications.description,
            label: t.slides.voiceNotifications.label,
            labelColor: 'bg-blue-500',
            actionButton: {
                text: t.slides.voiceNotifications.actionText,
                onClick: () => {
                    window.open('/guide/server', '_blank');
                },
                variant: 'secondary' as const
            }
        },
        {
            image: 'https://t4.ftcdn.net/jpg/05/13/87/33/360_F_513873331_RKPiIG9gVUmVGzyeWj0nn9bHLvJHQNUf.jpg',
            title: t.slides.minigames.title,
            label: t.slides.minigames.label,
            labelColor: 'bg-purple-500',
            description: t.slides.minigames.description,
            actionButton: {
                text: t.slides.minigames.actionText,
                onClick: () => {
                    // Add minigames navigation
                },
                variant: 'secondary' as const
            }
        },
        {
            image: 'https://dbppl.com/wp-content/uploads/2020/09/banner-web-content-management-system.jpg',
            title: t.slides.serverManagement.title,
            label: t.slides.serverManagement.label,
            labelColor: 'bg-green-500',
            description: t.slides.serverManagement.description,
            actionButton: {
                text: t.slides.serverManagement.actionText,
                onClick: () => {
                    window.open('/guide/server', '_blank');
                }
            }
        }
    ];

    const slidesWithCustomActions = [
        ...slides,
    ];
    const clientId = import.meta.env.VITE_CLIENT_ID;
   

    return (
        <div className="min-h-screen overflow-hidden">
            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto px-6 py-12">
                <div className="mb-12">
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
                        {/* Online Status Badge - Neo Brutalism */}
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-cyan-100 border-2 border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse border border-black"></div>
                            <span className="font-black text-black text-sm">{t.hero.botOnline}</span>
                            <span className="text-gray-700 text-sm">• {health?.guildsCount?.toLocaleString() || "9,000+"} {t.hero.servers}</span>
                        </div>

                        {/* Main Title */}
                        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 leading-tight text-black">
                            {t.hero.mainTitle} <br />
                            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                                {t.hero.mainTitleHighlight}
                            </span>
                        </h1>

                        <p className="text-gray-700 text-lg max-w-2xl mb-8 leading-relaxed font-medium">
                            {t.hero.description}
                        </p>

                        {/* Stats Highlight - Neo Brutalism */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                            {[
                                {
                                    icon: <Bot className="w-6 h-6" />,
                                    value: health?.guildsCount ? health.guildsCount > 1000 ? Math.floor(health.guildsCount / 1000) + "k+" : health.guildsCount : "9k+",
                                    label: t.hero.stats.servers
                                },
                                {
                                    icon: <Zap className="w-6 h-6" />,
                                    value: "24/7",
                                    label: t.hero.stats.uptime
                                },
                                {
                                    icon: <GamepadIcon className="w-6 h-6" />,
                                    value: "20+",
                                    label: t.hero.stats.features
                                },
                                {
                                    icon: <Users className="w-6 h-6" />,
                                    value: health?.usersCount ? health.usersCount > 1000000 ? Math.floor(health.usersCount / 1000000) + "M+" : health.usersCount : "2M+",
                                    label: t.hero.stats.users
                                },
                            ].map((stat, index) => (
                                <div key={index} className="bg-white border-2 border-black rounded-xl p-4 text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
                                    <div className="flex justify-center mb-2 text-cyan-500">
                                        {stat.icon}
                                    </div>
                                    <div className="text-2xl font-black text-black">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs text-gray-600 mt-1 font-bold">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons - Neo Brutalism */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <button
                                className="group relative bg-gradient-to-r from-cyan-400 to-purple-500 border-2 border-black rounded-xl px-8 py-4 font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:from-cyan-300 hover:to-purple-400 flex items-center justify-center gap-2 cursor-pointer"
                                onClick={() =>
                                    window.open(
                                        `https://discord.com/oauth2/authorize?client_id=${clientId}&scope=bot&permissions=8`,
                                        "_blank"
                                    )
                                }
                            >
                                <span>{t.hero.ctaButtons.addToDiscord}</span>
                                <ArrowRight className="w-5 h-5 transform transition-transform group-hover:translate-x-1" />
                                {/* Button decoration */}
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 border border-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                            <Link to="mailto:trungkienhuynh.contact@gmail.com?subject=Custom%20Discord%20Bot%20Inquiry">
                                <button className="bg-white border-2 border-black rounded-xl px-8 py-4 font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 cursor-pointer">
                                    {t.hero.ctaButtons.customBotRequest}
                                </button>
                            </Link>
                        </div>

                        {/* Trusted Communities */}
                        <div className="border-t-2 border-black pt-10">
                            <div className="text-sm uppercase mb-6 font-black text-gray-800 tracking-wider">
                                {t.hero.trustedBy}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {(health?.topGuilds ?? Array.from({ length: 6 })).map((guild, i) => (
                                    <div
                                        key={guild?.id ?? i}
                                        className="group bg-white border-2 border-black rounded-xl p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 flex items-center gap-4"
                                    >
                                        <div className="relative">
                                            <img
                                                src={guild?.guildIcon ?? ""}
                                                alt=""
                                                className="w-12 h-12 rounded-lg bg-gray-200 border-2 border-black object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-black font-black truncate">
                                                {guild?.name ?? `${t.community} ${i + 1}`}
                                            </div>
                                            <div className="text-gray-600 text-xs flex items-center gap-1 font-bold">
                                                <Users className="w-3 h-3" />
                                                {guild?.memberCount
                                                    ? `${guild.memberCount.toLocaleString()} ${t.members}`
                                                    : `${(i + 1) * 50}k ${t.members}`}
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
                            <div className="transform transition-all duration-300 hover:rotate-[-1deg]">
                                <div className="relative bg-white border-2 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                                    {/* Decorative Elements */}
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-300 border-2 border-black rounded-full -translate-y-12 translate-x-12"></div>
                                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-purple-300 border-2 border-black rounded-full translate-y-10 -translate-x-10"></div>

                                    <img
                                        src={herobanner}
                                        alt="Keldo Discord Bot Dashboard Preview"
                                        className="relative w-full rounded-xl bg-gray-100 border-2 border-black object-cover shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] z-10"
                                    />

                                    {/* Floating Elements */}
                                    <div className="absolute bottom-4 left-4 bg-white border-2 border-black px-3 py-2 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-20">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse border border-black"></div>
                                            <span className="text-xs font-black text-black">{t.liveActivity}</span>
                                        </div>
                                        <div className="text-xs text-gray-600 mt-1 font-bold">
                                            {t.activeIn} {health?.guildsCount?.toLocaleString() || "9,000+"} {t.servers}
                                        </div>
                                    </div>

                                    {/* Corner decorations */}
                                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 border-2 border-black rounded-full"></div>
                                    <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-green-400 border-2 border-black rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <main className="max-w-6xl mx-auto px-6 py-12">
                <FeatureCard
                    title={t.features.giveaway.title}
                    text={t.features.giveaway.text}
                    imgSrc={giveaway}
                    linkTo="/guide/giveaway"
                />
                <FeatureCard
                    align="right"
                    title={t.features.voiceSystem.title}
                    text={t.features.voiceSystem.text}
                    imgSrc={voice}
                    linkTo="/guide/server"
                />

                <FeatureCard
                    title={t.features.werewolf.title}
                    text={t.features.werewolf.text}
                    imgSrc={werewolf}
                    linkTo="/guide/werewolf"
                />

                <FeatureCard
                    align="right"
                    title={t.features.minigames.title}
                    text={t.features.minigames.text}
                    imgSrc={minigame}
                />

                <FeatureCard
                    title={t.features.pets.title}
                    text={t.features.pets.text}
                    imgSrc={pet}
                />

                <FeatureCard
                    align="right"
                    title={t.features.shop.title}
                    text={t.features.shop.text}
                    imgSrc={shop}
                />
            </main>

            {/* EXTRA FEATURES SECTION */}
            <section className="max-w-6xl mx-auto px-6 py-16  border-t-2 border-b-2 border-black">
                <h2 className="text-4xl font-black text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    {t.extraFeatures.title}
                </h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {t.extraFeatures.features.map((feature:any, i:any) => (
                        <div
                            key={i}
                            className="bg-white border-2 border-black rounded-xl p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 flex items-start gap-3"
                        >
                            <div className="text-2xl flex-shrink-0">{feature.split(' ')[0]}</div>
                            <p className="text-sm text-gray-700 leading-relaxed font-medium">{feature}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div >
    );
};

export default Homepage;