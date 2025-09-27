import FeatureCard from "../../components/card/FeatureCard";
import ww1 from "../../assets/images/ww1.jpg"
import ww2 from "../../assets/images/ww2.jpg"
import ww3 from "../../assets/images/ww3.jpg"
import ww4 from "../../assets/images/ww4.jpg"
// import mascot from "../../assets/images/mascot.png"
import herobanner from "../../assets/images/herobanner.png"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosNoAuth } from "../../utils/axiosIntance";

const Homepage = () => {
    const [health, setHealth] = useState<{
        guildsCount: number;
        usersCount: number;
        topGuilds: { id: string; name: string; memberCount: number; guildIcon: string }[];
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

    return (
        <div className="">
            {/* HERO */}
            
            <section className="max-w-6xl mx-auto mt-2 px-6 py-12">
                <div className="grid xl:grid-cols-12 lg:grid-cols-12 gap-6 items-center">
                    <div className="col-span-12 lg:col-span-7">
                        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-sm">New: Werewolf Action</div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Play Werewolf <br />Easier!</h1>
                        <p className="text-zinc-400 max-w-xl mb-6">The Werewolf game, also known as Mafia, is a social deduction game where players are divided into two teams: a minority of werewolves (or the "mafia") and a majority of villagers.</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="px-5 py-3 rounded-md bg-violet-600 font-semibold cursor-pointer" onClick={() => window.open("https://discord.com/oauth2/authorize?client_id=1383209480560443392&scope=bot&permissions=8", "_blank")}>Add To Discord</button>
                            <Link to="mailto:trungkienhuynh.contact@gmail.com?subject=Contact%20letter%20">
                                <button className="px-5 py-3 rounded-md bg-zinc-800 text-zinc-200 cursor-pointer">Do you want Custom Discord Bot?</button>
                            </Link>
                        </div>

                        {/* trusted */}
                        <div className="mt-10 text-zinc-400">
                            <div className="text-xs uppercase mb-4 font-bold text-zinc-300">
                                Trusted by over {health?.guildsCount?.toLocaleString() || "9,000,000"} discord servers, including
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {(health?.topGuilds ?? Array.from({ length: 6 })).map((guild, i) => (
                                    <div key={guild?.id ?? i} className="flex items-center gap-3 bg-zinc-900/30 px-3 py-2 rounded-md">
                                        {/* <div className="w-10 h-10 rounded-md bg-zinc-800 flex items-center justify-center">
                                            {guild?.name?.charAt(0) ?? "A"}
                                        </div> */}
                                        {/* image from topGuid.guildIcon */}
                                        <img src={guild?.guildIcon ?? ""} alt="" className="w-15 h-15 rounded-md bg-zinc-800 flex items-center justify-center object-cover object-center " />
                                        <div className="text-sm">
                                            <div className="text-white font-medium">{guild?.name ?? `Community ${i + 1}`}</div>
                                            <div className="text-zinc-400 text-xs">
                                                {guild?.memberCount ? `${guild.memberCount.toLocaleString()} Members` : `${(i + 1) * 50}k Members`}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-5 mt-8 lg:mt-0">
                        <div className="rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-800 p-6 shadow-2xl">
                            <img src={herobanner} alt="banner" className="h-64 md:h-96 w-full rounded-xl bg-zinc-900/60 border border-zinc-700 object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES STACK */}
            <main className="max-w-6xl mx-auto px-6">
                <FeatureCard
                    title="Play Werewolf with your friend easier!"
                    text="With easy command, just click to the button. You can play Werewolf Game in the Discord."
                    imgSrc={ww1}
                />

                <FeatureCard
                    align="right"
                    title="Soul Land with Werewolf!"
                    text="You can awake your spirit and become SPIRIT MASTER with Werewolf Bot."
                    imgSrc={ww2}
                />

                <FeatureCard
                    title="More Minigames!"
                    text="More minigames you can play if you're boring!"
                    imgSrc={ww3}
                />

                <FeatureCard
                    align="right"
                    title="Daily Gift & More"
                    text="Reward active members with special level roles, privileged permissions, and channels as they reach a certain level!"
                    imgSrc={ww4}
                />
            </main>
        </div>
    );
}

export default Homepage;