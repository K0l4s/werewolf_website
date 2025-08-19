import FeatureCard from "../../components/card/FeatureCard";

const Homepage = () => {
    return (
        <div className="">
            {/* HERO */}
            <section className="max-w-6xl mx-auto mt-2 px-6 py-12">
                 <div className="grid grid-cols-12 gap-6 items-center">
                    <div className="col-span-7">
                        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-sm">New: Our Memberships Subscription</div>
                        <h1 className="text-5xl font-extrabold tracking-tight mb-6">Make A Professional <br />Discord Server!</h1>
                        <p className="text-zinc-400 max-w-xl mb-6">A very customizable multipurpose bot for welcome image, in-depth logs, Social commands, Moderation and many more...</p>
                        <div className="flex gap-4">
                            <button className="px-5 py-3 rounded-md bg-violet-600 font-semibold">Add To Discord</button>
                            <button className="px-5 py-3 rounded-md bg-zinc-800 text-zinc-200">Browse Features</button>
                        </div>

                        {/* trusted */}
                        <div className="mt-10 text-zinc-400">
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
                        </div>
                    </div>

                    <div className="col-span-5">
                        <div className="rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-800 p-6 shadow-2xl">
                            <div className="h-96 rounded-xl bg-zinc-900/60 border border-zinc-700 flex items-center justify-center text-zinc-400">Hero preview image</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES STACK */}
            <main className="max-w-6xl mx-auto px-6">
                <FeatureCard
                    title="Let's Welcome New Members with Style"
                    text="Create your own welcome images, which include the user's username and avatar, as well as a customizable background image!"
                />

                <FeatureCard
                    align="right"
                    title="Easily create embeds for your server!"
                    text="Illustrate your creativity in embeds by using ProBot's simple customization and sending it to any preferred channel."
                />

                <FeatureCard
                    title="React to the messages and get roles!"
                    text="Set up exclusive reaction roles & buttons, select menus, and let your members have the roles they deserve with a single click!"
                />

                <FeatureCard
                    align="right"
                    title="Reward your most Active and Engaged Members"
                    text="Reward active members with special level roles, privileged permissions, and channels as they reach a certain level!"
                />

                {/* CTA */}
                <section className="mt-12 rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-violet-600 to-indigo-500 p-8 rounded-2xl flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold">Let ProBot take care of your Server</h2>
                            <p className="text-zinc-100/90 mt-2">Join over 9,000,000 servers using ProBot</p>
                            <button className="mt-6 px-4 py-2 bg-white text-black rounded-md">Add To Discord</button>
                        </div>
                        <div className="w-56 h-56 bg-white/10 rounded-full flex items-center justify-center">Mascot</div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="mt-16 pb-10 text-zinc-400">
                    <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row md:justify-between gap-6">
                        <div>
                            {/* <Logo /> */}
                            <p className="mt-4 text-zinc-500 max-w-sm">A very customizable multipurpose bot for welcome image, in-depth logs, Social commands, Moderation and many more...</p>
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
                                    <li>Twitter</li>
                                    <li>Discord</li>
                                    <li>Top.gg</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 text-sm text-zinc-600">© 2025 All rights reserved.</div>
                </footer>
            </main>
        </div>
    );
}

export default Homepage;