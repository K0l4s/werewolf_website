import FeatureCard from "../../components/card/FeatureCard";
import ww1 from "../../assets/images/ww1.jpg"
import ww2 from "../../assets/images/ww2.jpg"
import ww3 from "../../assets/images/ww3.jpg"
import ww4 from "../../assets/images/ww4.jpg"
import mascot from "../../assets/images/mascot.png"
import herobanner from "../../assets/images/herobanner.png"
const Homepage = () => {
    return (
        <div className="">
            {/* HERO */}
            <section className="max-w-6xl mx-auto mt-2 px-6 py-12">
                <div className="grid xl:grid-cols-12 lg:grid-cols-12 gap-6  items-center">
                    <div className="col-span-7">
                        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-sm">New: Werewolf Action</div>
                        <h1 className="text-5xl font-extrabold tracking-tight mb-6">Play Werewolf <br />Easier!</h1>
                        <p className="text-zinc-400 max-w-xl mb-6">The Werewolf game, also known as Mafia, is a social deduction game where players are divided into two teams: a minority of werewolves (or the "mafia") and a majority of villagers.</p>
                        <div className="flex gap-4">
                            <button className="px-5 py-3 rounded-md bg-violet-600 font-semibold cursor-pointer" onClick={() => window.open("https://discord.com/oauth2/authorize?client_id=1383209480560443392&scope=bot&permissions=8", "_blank")}>Add To Discord</button>
                            <a href="mailto:trungkienhuynh.contact@gmail.com?subject=Contact%20letter%20">
                                <button className="px-5 py-3 rounded-md bg-zinc-800 text-zinc-200 cursor-pointer" >Do you want Custom Discord Bot?</button></a>
                        </div>

                        {/* trusted */}
                        {/* <div className="mt-10 text-zinc-400">
                            <div className="text-xs uppercase mb-4">Trusted by over 9,000,000 discord servers, including</div>
                            <div className="flex gap-5 items-center">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-zinc-900/30 px-3 py-2 rounded-md">
                                        <div className="w-10 h-10 rounded-md bg-zinc-800 flex items-center justify-center">A</div>
                                        <div className="text-sm">
                                            <div className="text-white font-medium">Community {i + 1}</div>
                                            <div className="text-zinc-400 text-xs">{(i + 1) * 50}k Members</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div> */}
                    </div>

                    <div className="col-span-5 hidden lg:block xl:block md:hidden sm:hidden">
                        <div className="rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-800 p-6 shadow-2xl ">
                            {/* <div className="h-96 rounded-xl bg-zinc-900/60 border border-zinc-700 flex items-center justify-center text-zinc-400">Hero preview image</div> */}
                            <img src={herobanner} alt="banner" className="h-96 w-full rounded-xl bg-zinc-900/60 border border-zinc-700 flex items-center justify-center" />
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

                {/* CTA */}
                <section className="mt-12 rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-violet-600 to-indigo-500 p-8 rounded-2xl flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold">Let play Werewolf with our bot!</h2>
                            <p className="text-zinc-100/90 mt-2">Join over 15 servers using Werewolf</p>
                            <button className="mt-6 px-4 py-2 bg-white text-black rounded-md cursor-pointer" onClick={() => window.open("https://discord.com/oauth2/authorize?client_id=1383209480560443392&scope=bot&permissions=8", "_blank")}>Add To Discord</button>
                        </div>
                        <div className="w-1/4 h-1/4 bg-white/10 rounded-full flex items-center justify-center">

                            <img src={mascot} alt="" className="rounded-b-full" />

                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="mt-16 pb-10 text-zinc-400">
                    <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row md:justify-between gap-6">
                        <div>
                            {/* <Logo /> */}
                            <p className="mt-4 text-zinc-500 max-w-sm">Play werewolf with your friends, become Spirit Master and many more...</p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-white font-semibold mb-3">Website Pages</h4>
                                <ul className="text-sm space-y-2">
                                    <li>Membership</li>
                                    <li>Dashboard</li>
                                    <li>Docs</li>
                                    <li>Premium</li>
                                    <li>Commands</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-white font-semibold mb-3">Other Links</h4>
                                <ul className="text-sm space-y-2">
                                    <li><a href="https://github.com/K0l4s" className="text-blue-200 hover:text-blue-500 hover:underline">Github</a></li>
                                    <li> <a href="https://discord.gg/kDkydXrtua" className="text-blue-200 hover:text-blue-500 hover:underline">Discord</a></li>
                                    <li><a href="https://top.gg/discord/servers/747894754633043968?s=0eaec2fe15c42" className="text-blue-200 hover:text-blue-500 hover:underline">Top.gg</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 text-sm text-zinc-600">© 2025 All rights reserved.</div>
                    <div className="text-sm text-zinc-600">Develop by Huỳnh Trung Kiên - Kiên Học Code - Kolas</div>
                    <div className="text-sm text-zinc-600">Contact for work:  <a href="mailto:trungkienhuynh.contact@gmail.com?subject=Contact%20letter%20" className="text-blue-200 hover:text-blue-500 hover:underline">trungkienhuynh.contact@gmail.com</a></div>

                </footer>
            </main>
        </div>
    );
}

export default Homepage;