import { useState } from "react";
import mascot from "../../assets/images/mascot.png";
import { Shield, FileText, Users, Mail, Bot, CheckCircle } from "lucide-react";

const terms = [
  {
    title: "Privacy",
    icon: "🔒",
    content:
      "We respect your privacy. Keldo Bot does not collect personal information beyond what is necessary for gameplay. No messages or server data are stored outside of Discord.",
  },
  {
    title: "Data Usage",
    icon: "📊",
    content:
      "All data is used solely to provide and improve the Keldo game experience. We do not sell or share your data with third parties.",
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

const TermPage = () => {
  const [activeTerm, setActiveTerm] = useState(0);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <div className="inline-flex items-center mb-4 px-4 py-2 rounded-full bg-cyan-100 border-2 border-black text-black text-sm font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span className="w-2 h-2 bg-cyan-400 border border-black rounded-full mr-2 animate-pulse"></span>
              Terms & Conditions
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-black">
              Keldo Bot <br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Terms & Conditions</span>
            </h1>
            <p className="text-gray-700 text-lg max-w-xl mb-8 font-medium">
              Learn about our terms and how we ensure a safe, fun experience for all players.
            </p>
            <button
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-400 to-purple-500 border-2 border-black rounded-xl font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 flex items-center gap-3 cursor-pointer"
              onClick={() =>
                window.open(
                  "https://discord.com/oauth2/authorize?client_id=1383209480560443392&scope=bot&permissions=8",
                  "_blank"
                )
              }
            >
              <span>Add to Discord</span>
              <Bot size={20} className="group-hover:scale-110 transition-transform duration-300" />
              {/* Button decoration */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 border border-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
          <div className="flex-1 flex justify-center relative">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full blur-xl"></div>
              <div className="relative bg-white border-2 border-black rounded-full p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <img
                  src={mascot}
                  alt="Keldo Bot Mascot"
                  className="w-64 h-64 rounded-full object-cover"
                />
                {/* Decorative elements */}
                <div className="absolute -top-1 -left-1 w-4 h-4 bg-cyan-400 border border-black rounded-full"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 border border-black rotate-45"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-yellow-400 border border-black rounded-sm"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-400 border border-black rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TERMS CONTENT */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-12 text-center">
          <div className="bg-white border-2 border-black rounded-2xl p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8">
            <h2 className="text-4xl font-black mb-4 text-black">Our Terms & Policies</h2>
            <p className="text-gray-700 text-lg font-medium max-w-2xl mx-auto">
              We're committed to transparency and your privacy. Below you'll find everything you need to know about how we handle your data and our community expectations.
            </p>
          </div>
        </div>

        {/* DESKTOP: Accordion-style terms */}
        <div className="hidden md:block space-y-6">
          {terms.map((term, index) => (
            <div
              key={term.title}
              className={`bg-white border-2 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 overflow-hidden group cursor-pointer ${activeTerm === index
                  ? "border-cyan-400 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                  : "border-black hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                }`}
              onClick={() => setActiveTerm(index)}
            >
              <div className="flex items-center p-8">
                <div className="text-3xl mr-6">{term.icon}</div>
                <h3 className="text-2xl font-black flex-1 text-black">{term.title}</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 transition-transform duration-300 ${activeTerm === index ? "rotate-180 text-cyan-500" : "text-black"
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
                className={`px-8 pb-8 transition-all duration-300 ${activeTerm === index ? "block animate-fadeIn" : "hidden"
                  }`}
              >
                <div className="flex items-start gap-6">
                  <div className="w-1 h-auto bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full mt-2"></div>
                  <p className="text-gray-700 text-lg font-medium leading-relaxed">{term.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE: Always expanded cards */}
        <div className="md:hidden space-y-6">
          {terms.map((term) => (
            <div
              key={term.title}
              className="bg-white border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group relative"
            >
              <div className="flex items-center mb-4">
                <div className="text-2xl mr-4">{term.icon}</div>
                <h3 className="text-xl font-black text-black">{term.title}</h3>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-1 h-auto bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 font-medium leading-relaxed">{term.content}</p>
              </div>

              {/* Mobile decoration */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 border border-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Key Points Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {[
            {
              icon: <Shield className="w-8 h-8" />,
              title: "Secure",
              description: "Your data is protected with enterprise security"
            },
            {
              icon: <FileText className="w-8 h-8" />,
              title: "Transparent",
              description: "Clear terms you can read and understand"
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: "Fair",
              description: "Equal treatment for all community members"
            }
          ].map((item, index) => (
            <div key={index} className="bg-white border-2 border-black rounded-xl p-6 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 group">
              <div className="bg-cyan-100 border-2 border-black rounded-lg p-3 inline-flex mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="font-black text-black text-lg mb-2">{item.title}</h3>
              <p className="text-gray-700 font-medium text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Agreement Section */}
        <div className="bg-white border-2 border-black rounded-2xl p-8 mt-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-green-100 border-2 border-black rounded-lg p-2 flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-black mb-2">By using Keldo Bot, you agree to:</h3>
              <ul className="text-gray-700 font-medium space-y-2">
                <li className="flex items-center gap-2">• Follow Discord's Terms of Service</li>
                <li className="flex items-center gap-2">• Respect other community members</li>
                <li className="flex items-center gap-2">• Not exploit or abuse the bot</li>
                <li className="flex items-center gap-2">• Accept our data usage policies</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white border-2 border-black rounded-2xl p-8 mt-8 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-2xl font-black text-black mb-4">Questions About Our Terms?</h3>
          <p className="text-gray-700 font-medium mb-6">
            We're here to help clarify any questions you might have about our terms and conditions.
          </p>
          <a
            href="mailto:trungkienhuynh.contact@gmail.com?subject=Keldo Bot Terms Question"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white border-2 border-black rounded-xl font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
          >
            <Mail size={18} />
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
};

export default TermPage;