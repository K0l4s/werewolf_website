import { Link } from "react-router-dom";
import mascot from "../../assets/images/mascot.png";
import Tooltip from "../custom/Tooltip";

const Footer = () => {
  return (
    <footer className="max-w-6xl mx-auto px-6 pt-12 pb-16">
      <div className="relative bg-white border-2 border-black rounded-2xl p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white border-2 border-black rounded-full p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <img src={mascot} className="w-8 h-8 rounded-full" alt="Mascot" />
              </div>
              <h3 className="text-2xl font-black text-black">
                Keldo Bot
              </h3>
            </div>
            <p className="text-gray-700 max-w-md font-medium leading-relaxed">
              Play werewolf with your friends, become Spirit Master and experience 
              thrilling social deduction games in your Discord server.
            </p>
            
            {/* Decorative Elements */}
            <div className="flex gap-2 mt-4">
              <div className="w-2 h-2 bg-cyan-400 border border-black rounded-full"></div>
              <div className="w-2 h-2 bg-purple-400 border border-black rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-400 border border-black rounded-full"></div>
            </div>
          </div>

          {/* Website Pages */}
          <div>
            <h4 className="text-lg font-black text-black mb-4 border-b-2 border-black pb-2">Website Pages</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-700 font-medium hover:text-black transition-colors duration-200 hover:underline"
                >
                  Home
                </Link>
              </li>
              <Tooltip text="Coming Soon" delay={0}>
                <li className="text-gray-400 font-medium cursor-not-allowed">
                  Membership
                </li>
              </Tooltip>
              <li>
                <Link 
                  to="/doc" 
                  className="text-gray-700 font-medium hover:text-black transition-colors duration-200 hover:underline"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link 
                  to="/policy" 
                  className="text-gray-700 font-medium hover:text-black transition-colors duration-200 hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/term" 
                  className="text-gray-700 font-medium hover:text-black transition-colors duration-200 hover:underline"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  to="/guide" 
                  className="text-gray-700 font-medium hover:text-black transition-colors duration-200 hover:underline"
                >
                  Guide
                </Link>
              </li>
              <Tooltip text="Coming Soon" delay={0}>
                <li className="text-gray-400 font-medium cursor-not-allowed">
                  Premium
                </li>
              </Tooltip>
            </ul>
          </div>

          {/* Other Links */}
          <div>
            <h4 className="text-lg font-black text-black mb-4 border-b-2 border-black pb-2">Other Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/K0l4s"
                  className="flex items-center gap-2 text-gray-700 font-medium hover:text-black transition-colors duration-200 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-5 h-5 bg-cyan-100 border border-black rounded p-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/kDkydXrtua"
                  className="flex items-center gap-2 text-gray-700 font-medium hover:text-black transition-colors duration-200 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-5 h-5 bg-purple-100 border border-black rounded p-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M18 1.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M18 5.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M12 1.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path fillRule="evenodd" d="M6.5 2a1.5 1.5 0 00-1.5 1.5v12a1.5 1.5 0 001.5 1.5h10a1.5 1.5 0 001.5-1.5v-12A1.5 1.5 0 0016.5 2h-10zm0 1h10a.5.5 0 01.5.5v12a.5.5 0 01-.5.5h-10a.5.5 0 01-.5-.5v-12a.5.5 0 01.5-.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  Discord Server
                </a>
              </li>
              <li>
                <a
                  href="https://top.gg/discord/servers/747894754633043968?s=0eaec2fe15c42"
                  className="flex items-center gap-2 text-gray-700 font-medium hover:text-black transition-colors duration-200 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-5 h-5 bg-yellow-100 border border-black rounded p-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  Top.gg Listing
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t-2 border-black">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            {/* Text Information */}
            <div className="flex-1 space-y-4">
              <p className="text-sm font-black text-black">
                © 2025 Keldo Bot. All rights reserved.
              </p>
              <p className="text-sm text-gray-700 font-medium">
                Developed by Huỳnh Trung Kiên (Kiên Học Code / Kolas)
              </p>
              <p className="text-sm text-gray-700 font-medium">
                Contact for work:{" "}
                <a
                  href="mailto:trungkienhuynh.contact@gmail.com?subject=Werewolf Bot Inquiry"
                  className="text-cyan-600 hover:text-cyan-700 font-bold underline transition-colors duration-200"
                >
                  trungkienhuynh.contact@gmail.com
                </a>
              </p>
            </div>

            {/* QR Code - Neo Brutalism Style */}
            <div className="flex-shrink-0">
              <div className="relative bg-white border-2 border-black rounded-xl p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-center mb-3">
                  <span className="text-sm font-black text-black">DONATE</span>
                </div>
                <img
                  src="https://i.ibb.co/5hyjcdXc/d843e510-f7ed-4b6d-ac8a-1f87aae068db.jpg"
                  alt="QR Code"
                  className="w-40 h-28 object-cover object-center mx-auto border border-black"
                />
                <div className="text-center mt-3">
                  <p className="text-xs font-bold text-black">HUYNH TRUNG KIEN</p>
                  <p className="text-xs font-bold text-gray-700">STK: 8888827626203</p>
                </div>
                
                {/* QR Code Decoration */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 border border-black rounded-full"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-400 border border-black rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Additional Links */}
          <div className="mt-8 pt-6 border-t-2 border-black">
            <div className="flex flex-wrap gap-6 text-sm font-bold">
              <Link to="/policy" className="text-gray-700 hover:text-black transition-colors duration-200 hover:underline">
                Privacy Policy
              </Link>
              <Link to="/term" className="text-gray-700 hover:text-black transition-colors duration-200 hover:underline">
                Terms of Service
              </Link>
              <Link to="/doc" className="text-gray-700 hover:text-black transition-colors duration-200 hover:underline">
                Documentation
              </Link>
              <a
                href="https://discord.gg/kDkydXrtua"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-black transition-colors duration-200 hover:underline"
              >
                Support Server
              </a>
            </div>
          </div>
        </div>

        {/* Footer Corner Decorations */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-400"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-400"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-400"></div>
      </div>
    </footer>
  )
}

export default Footer