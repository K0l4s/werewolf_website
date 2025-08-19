const FeatureCard: React.FC<{ title: string; text: string; align?: "left" | "right" }> = ({ title, text, align = "left" }) => (
    <div className={`flex items-center gap-8 py-8 ${align === "right" ? "flex-row-reverse" : ""}`}>
        <div className="w-1/2">
            <div className="rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 shadow-lg">
                <div className="h-48 rounded-md bg-zinc-900/50 border border-zinc-700 flex items-center justify-center text-zinc-400">Mock preview</div>
            </div>
        </div>
        <div className="w-1/2">
            <h3 className="text-white text-2xl font-semibold mb-3">{title}</h3>
            <p className="text-zinc-400 max-w-md">{text}</p>
            <button className="mt-6 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-md">Learn more</button>
        </div>
    </div>
);

export default FeatureCard;