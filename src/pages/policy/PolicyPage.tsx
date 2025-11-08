import { useState } from "react"
import mascot from "../../assets/images/mascot.png"
import { Shield, Lock, Users, Eye, Bot } from "lucide-react"
import { useLanguage } from "../../context/LanguageContext" // hoặc đường dẫn hook của mày

const clientId = import.meta.env.VITE_CLIENT_ID

const PolicyPage = () => {
  const [activePolicy, setActivePolicy] = useState(0)
  const { language } = useLanguage()
  const t = language.policy

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <div className="inline-flex items-center mb-4 px-4 py-2 rounded-full bg-cyan-100 border-2 border-black text-black text-sm font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span className="w-2 h-2 bg-cyan-400 border border-black rounded-full mr-2 animate-pulse"></span>
              {t.heroBadge}
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-black">
              {t.heroTitle} <br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">{t.heroHighlight}</span>
            </h1>
            <p className="text-gray-700 text-lg max-w-xl mb-8 font-medium">{t.heroDescription}</p>

            <button
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-400 to-purple-500 border-2 border-black rounded-xl font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 flex items-center gap-3 cursor-pointer"
              onClick={() =>
                window.open(
                  `https://discord.com/oauth2/authorize?client_id=${clientId}&scope=bot&permissions=8`,
                  "_blank"
                )
              }
            >
              <span>{t.addToDiscord}</span>
              <Bot size={20} className="group-hover:scale-110 transition-transform duration-300" />
            </button>
          </div>

          <div className="flex-1 flex justify-center relative">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full blur-xl"></div>
              <div className="relative bg-white border-2 border-black rounded-full p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <img src={mascot} alt="Keldo Bot Mascot" className="w-64 h-64 rounded-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POLICY CONTENT */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-12 text-center">
          <div className="bg-white border-2 border-black rounded-2xl p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8">
            <h2 className="text-4xl font-black mb-4 text-black">{t.ourPolicies}</h2>
            <p className="text-gray-700 text-lg font-medium max-w-2xl mx-auto">{t.ourPoliciesDesc}</p>
          </div>
        </div>

        {/* Accordion */}
        <div className="hidden md:block space-y-6">
          {t.policies.map((policy:any, index:any) => (
            <div
              key={policy.title}
              className={`bg-white border-2 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 overflow-hidden group cursor-pointer relative ${activePolicy === index
                ? "border-cyan-400 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                : "border-black hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                }`}
              onClick={() => setActivePolicy(index)}
            >
              <div className="flex items-center p-8">
                <div className="text-3xl mr-6">{policy.icon}</div>
                <h3 className="text-2xl font-black flex-1 text-black">{policy.title}</h3>
              </div>

              {activePolicy === index && (
                <div className="px-8 pb-8 transition-all duration-300 block animate-fadeIn">
                  <div className="flex items-start gap-6">
                    <div className="w-1 h-auto bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full mt-2"></div>
                    <p className="text-gray-700 text-lg font-medium leading-relaxed">{policy.content}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {t.extraCards.map((item:any, index:any) => (
            <div key={index} className="bg-white border-2 border-black rounded-xl p-6 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <div className="bg-cyan-100 border-2 border-black rounded-lg p-3 inline-flex mb-4">
                {[<Shield />, <Lock />, <Eye />][index]}
              </div>
              <h3 className="font-black text-black text-lg mb-2">{item.title}</h3>
              <p className="text-gray-700 font-medium text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="bg-white border-2 border-black rounded-2xl p-8 mt-12 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-2xl font-black text-black mb-4">{t.contactTitle}</h3>
          <p className="text-gray-700 font-medium mb-6">{t.contactDesc}</p>
          <a
            href="mailto:trungkienhuynh.contact@gmail.com?subject=Keldo Bot Privacy Question"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white border-2 border-black rounded-xl font-black"
          >
            <Users size={18} />
            {t.contactButton}
          </a>
        </div>
      </section>
    </div>
  )
}

export default PolicyPage
