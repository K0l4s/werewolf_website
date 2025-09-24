import { useState } from "react";
import mascot from "../../assets/images/mascot.png";

const policies = [
  {
    title: "Privacy",
    icon: "🔒",
    content:
      "We respect your privacy. Werewolf Bot does not collect personal information beyond what is necessary for gameplay. No messages or server data are stored outside of Discord.",
  },
  {
    title: "Data Usage",
    icon: "📊",
    content:
      "All data is used solely to provide and improve the Werewolf game experience. We do not sell or share your data with third parties.",
  },
  {
    title: "Security",
    icon: "🛡️",
    content:
      "We use Discord's secure APIs and follow best practices to keep your data safe. If you find a vulnerability, please contact us immediately.",
  },
  {
    title: "Community Guidelines",
    icon: "👥",
    content:
      "Be respectful and follow Discord's Terms of Service. Abuse, harassment, or cheating will result in bans from the bot.",
  },
  {
    title: "Contact",
    icon: "📧",
    content:
      "For questions or concerns, email us at trungkienhuynh.contact@gmail.com.",
  },
];

const PolicyPage = () => {
  const [activePolicy, setActivePolicy] = useState(0);

  return (
    <div className="min-h-screen text-white">
      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <div className="inline-flex items-center mb-4 px-4 py-2 rounded-full bg-violet-900/30 text-violet-300 text-sm border border-violet-700/50">
              <span className="w-2 h-2 bg-violet-400 rounded-full mr-2 animate-pulse"></span>
              Policy & Privacy
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-300 to-violet-200 bg-clip-text text-transparent">
              Werewolf Bot <br />
              <span className="text-white">Policy & Privacy</span>
            </h1>
            <p className="text-zinc-300 text-lg max-w-xl mb-8">
              Learn how we protect your data and ensure a safe, fun experience for all players.
            </p>
            <button
              className="px-6 py-3 bg-violet-600 hover:bg-violet-700 transition-colors rounded-lg font-semibold flex items-center gap-2 cursor-pointer" 
              onClick={() =>
                window.open(
                  "https://discord.com/oauth2/authorize?client_id=1383209480560443392&scope=bot&permissions=8",
                  "_blank"
                )
              }
            >
              <span>Add to Discord</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex justify-center relative">
            <div className="relative">
              <div className="absolute -inset-6 bg-violet-600/20 rounded-full blur-xl"></div>
              <img
                src={mascot}
                alt="Werewolf Bot Mascot"
                className="relative w-64 h-64 rounded-full bg-zinc-800 border-4 border-violet-500 shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* POLICY CONTENT */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Policies</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            We're committed to transparency and your privacy. Below you'll find everything you need to know about how we handle your data and our community expectations.
          </p>
        </div>

        {/* DESKTOP: Accordion-style policies */}
        <div className="hidden md:block space-y-4">
          {policies.map((policy, index) => (
            <div
              key={policy.title}
              className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                activePolicy === index
                  ? "border-violet-500 bg-zinc-800/50"
                  : "border-zinc-700 bg-zinc-800/30 hover:bg-zinc-800/40 cursor-pointer"
              }`}
              onClick={() => setActivePolicy(index)}
            >
              <div className="flex items-center p-6">
                <div className="text-2xl mr-4">{policy.icon}</div>
                <h3 className="text-xl font-semibold flex-1">{policy.title}</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transition-transform duration-300 ${
                    activePolicy === index ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div
                className={`px-6 pb-6 transition-all duration-300 ${
                  activePolicy === index ? "block" : "hidden"
                }`}
              >
                <p className="text-zinc-300 pl-10">{policy.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE: Always expanded cards */}
        <div className="md:hidden space-y-6">
          {policies.map((policy) => (
            <div
              key={policy.title}
              className="rounded-xl bg-zinc-800/50 border border-zinc-700 p-6"
            >
              <div className="flex items-center mb-4">
                <div className="text-2xl mr-3">{policy.icon}</div>
                <h3 className="text-xl font-semibold">{policy.title}</h3>
              </div>
              <p className="text-zinc-300">{policy.content}</p>
            </div>
          ))}
        </div>
      </section>
     
    </div>
  );
};

export default PolicyPage;