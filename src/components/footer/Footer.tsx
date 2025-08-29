import mascot from "../../assets/images/mascot.png";


const Footer = () => {
  return (
      <footer className="max-w-6xl mx-auto px-6 pt-12 pb-16 border-t border-zinc-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <img src={mascot} className="w-8 h-8 rounded-full" alt="Mascot" />
              Werewolf Bot
            </h3>
            <p className="text-zinc-400 max-w-md">
              Play werewolf with your friends, become Spirit Master and experience thrilling social deduction games in your Discord server.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Website Pages</h4>
            <ul className="space-y-2 text-zinc-400">
              <li className="hover:text-violet-300 transition-colors cursor-pointer">Membership</li>
              <li className="hover:text-violet-300 transition-colors cursor-pointer">Dashboard</li>
              <li className="hover:text-violet-300 transition-colors cursor-pointer">Documentation</li>
              <li className="hover:text-violet-300 transition-colors cursor-pointer">Premium</li>
              <li className="hover:text-violet-300 transition-colors cursor-pointer">Commands</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Other Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/K0l4s"
                  className="text-zinc-400 hover:text-violet-300 transition-colors flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/kDkydXrtua"
                  className="text-zinc-400 hover:text-violet-300 transition-colors flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M18 1.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M18 5.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M12 1.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path fillRule="evenodd" d="M6.5 2a1.5 1.5 0 00-1.5 1.5v12a1.5 1.5 0 001.5 1.5h10a1.5 1.5 0 001.5-1.5v-12A1.5 1.5 0 0016.5 2h-10zm0 1h10a.5.5 0 01.5.5v12a.5.5 0 01-.5.5h-10a.5.5 0 01-.5-.5v-12a.5.5 0 01.5-.5z" clipRule="evenodd" />
                  </svg>
                  Discord Server
                </a>
              </li>
              <li>
                <a
                  href="https://top.gg/discord/servers/747894754633043968?s=0eaec2fe15c42"
                  className="text-zinc-400 hover:text-violet-300 transition-colors flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                  </svg>
                  Top.gg Listing
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-zinc-800 text-sm text-zinc-500">
          <p>© 2025 Werewolf Bot. All rights reserved.</p>
          <p className="mt-2">
            Developed by Huỳnh Trung Kiên (Kiên Học Code / Kolas)
          </p>
          <p className="mt-2">
            Contact for work:{" "}
            <a
              href="mailto:trungkienhuynh.contact@gmail.com?subject=Werewolf Bot Inquiry"
              className="text-violet-300 hover:text-violet-200 underline"
            >
              trungkienhuynh.contact@gmail.com
            </a>
          </p>
        </div>
      </footer>
  )
}

export default Footer
