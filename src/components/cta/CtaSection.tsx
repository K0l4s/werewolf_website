import mascot from "../../assets/images/mascot.png";
import { ArrowRight, Bot } from "lucide-react"; 
import { useLanguage } from "../../context/LanguageContext";

const CtaSection = () => {
  const {language} = useLanguage()
  const t = language.ctaSection;
  const clientId = import.meta.env.VITE_CLIENT_ID;

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="relative bg-white border-2 border-black rounded-2xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-4 left-4 w-4 h-4 bg-cyan-400 border border-black rounded-full"></div>
        <div className="absolute top-4 right-4 w-3 h-3 bg-purple-400 border border-black rotate-45"></div>
        <div className="absolute bottom-4 left-4 w-3 h-3 bg-yellow-400 border border-black rounded-sm"></div>
        <div className="absolute bottom-4 right-4 w-2 h-2 bg-green-400 border border-black rounded-full"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          {/* Content Section */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-black leading-tight">
              {t.title}
            </h2>
            <p className="text-gray-700 mb-6 text-lg font-medium max-w-md">
              {t.description}
            </p>

            {/* Feature Highlights */}
            <div className="flex flex-wrap gap-3 mb-6">
              {[
                { icon: "🐺", text: t.featureHighlights.werewolf },
                { icon: "🎮", text: t.featureHighlights.minigames },
                { icon: "🐾", text: t.featureHighlights.petSystem },
                { icon: "🔥", text: t.featureHighlights.activityStreaks }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-cyan-100 border border-black rounded-full px-3 py-1 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                >
                  <span className="text-sm">{feature.icon}</span>
                  <span className="text-xs font-bold">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              className="group relative flex items-center bg-gradient-to-r from-cyan-400 to-purple-500 border-2 border-black rounded-xl px-6 py-4 font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gradient-to-r hover:from-cyan-300 hover:to-purple-400"
              onClick={() =>
                window.open(
                  `https://discord.com/oauth2/authorize?client_id=${clientId}&scope=bot&permissions=8`,
                  "_blank"
                )
              }
            >
              <Bot size={20} className="mr-2" />
              <span>{t.ctaButton}</span>
              <ArrowRight size={18} className="ml-2 transform transition-transform group-hover:translate-x-1" />

              {/* Button decoration */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 border border-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            {/* Stats */}
            <div className="flex items-center gap-4 mt-4 text-sm text-gray-600 font-bold">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 border border-black rounded-full"></div>
                <span>9,000+ {t.stats.servers}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 border border-black rounded-full"></div>
                <span>24/7 {t.stats.online}</span>
              </div>
            </div>
          </div>

          {/* Mascot Section */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="relative bg-white border-2 border-black rounded-xl p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <img
                  src={mascot}
                  alt="Keldo Bot Mascot"
                  className="w-48 h-48 rounded-lg object-cover"
                />

                {/* Floating elements around mascot */}
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-cyan-400 border border-black rounded-full animate-bounce"></div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 border border-black rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-yellow-400 border border-black rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border border-black rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
              </div>

              {/* Status indicator */}
              <div className="absolute bottom-2 right-2 bg-white border border-black px-2 py-1 rounded-full shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 border border-black rounded-full animate-pulse"></div>
                  <span className="text-xs font-black">{t.liveStatus}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorative border */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 border border-black rounded-full"></div>
      </div>
    </section>
  )
}

export default CtaSection