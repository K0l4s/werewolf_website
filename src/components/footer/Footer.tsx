import { Link } from "react-router-dom";
import mascot from "../../assets/images/mascot.png";
import Tooltip from "../custom/Tooltip";
import Momo from "../../assets/images/momo.png";
import { useLanguage } from "../../context/LanguageContext";

const Footer = () => {
  const { language } = useLanguage();
  const t = language.footer; // shortcut

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
              <h3 className="text-2xl font-black text-black">{t.brand.title}</h3>
            </div>
            <p className="text-gray-700 max-w-md font-medium leading-relaxed">
              {t.brand.description}
            </p>

            <div className="flex gap-2 mt-4">
              <div className="w-2 h-2 bg-cyan-400 border border-black rounded-full"></div>
              <div className="w-2 h-2 bg-purple-400 border border-black rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-400 border border-black rounded-full"></div>
            </div>
          </div>

          {/* Website Pages */}
          <div>
            <h4 className="text-lg font-black text-black mb-4 border-b-2 border-black pb-2">{t.sections.pages}</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:underline">{t.pages.home}</Link></li>
              <Tooltip text={t.tooltip.coming} delay={0}>
                <li className="text-gray-400 font-medium cursor-not-allowed">{t.pages.membership}</li>
              </Tooltip>
              <li><Link to="/doc" className="hover:underline">{t.pages.documentation}</Link></li>
              <li><Link to="/policy" className="hover:underline">{t.pages.privacy}</Link></li>
              <li><Link to="/term" className="hover:underline">{t.pages.terms}</Link></li>
              <li><Link to="/guide" className="hover:underline">{t.pages.guide}</Link></li>
              <Tooltip text={t.tooltip.coming} delay={0}>
                <li className="text-gray-400 font-medium cursor-not-allowed">{t.pages.premium}</li>
              </Tooltip>
            </ul>
          </div>

          {/* Other Links */}
          <div>
            <h4 className="text-lg font-black text-black mb-4 border-b-2 border-black pb-2">{t.sections.links}</h4>
            <ul className="space-y-3">
              <li><a href="https://github.com/K0l4s" target="_blank" className="hover:underline">{t.links.github}</a></li>
              <li><a href="https://discord.gg/kDkydXrtua" target="_blank" className="hover:underline">{t.links.discord}</a></li>
              <li><a href="https://top.gg/discord/servers/747894754633043968?s=0eaec2fe15c42" target="_blank" className="hover:underline">{t.links.topgg}</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t-2 border-black">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="flex-1 space-y-4">
              <p className="text-sm font-black text-black">{t.bottom.copyright}</p>
              <p className="text-sm text-gray-700 font-medium">{t.bottom.developer}</p>
              <p className="text-sm text-gray-700 font-medium">
                {t.bottom.contact}{" "}
                <a href="mailto:trungkienhuynh.contact@gmail.com" className="text-cyan-600 font-bold underline">
                  trungkienhuynh.contact@gmail.com
                </a>
              </p>
              <p className="text-sm text-gray-700 font-medium flex items-center">
                {t.sections.payment}{" "}
                {/* <Tooltip text={t.tooltip.momo} delay={0}> */}
                  <img src={Momo} alt="momo logo" className="w-8 h-8 ml-2" />
                {/* </Tooltip> */}
              </p>
            </div>

            {/* Donate Section */}
            <div className="flex-shrink-0">
              <div className="relative bg-white border-2 border-black rounded-xl p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-center mb-3">
                  <span className="text-sm font-black text-black">{t.sections.donate.toUpperCase()}</span>
                </div>
                <img
                  src="https://i.ibb.co/5hyjcdXc/d843e510-f7ed-4b6d-ac8a-1f87aae068db.jpg"
                  alt="QR Code"
                  className="w-40 h-28 object-cover mx-auto border border-black"
                />
                <div className="text-center mt-3">
                  <p className="text-xs font-bold text-black">{t.bottom.owner}</p>
                  <p className="text-xs font-bold text-gray-700">{t.bottom.account} 8888827626203</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t-2 border-black">
            <div className="flex flex-wrap gap-6 text-sm font-bold">
              <Link to="/policy" className="hover:underline">{t.pages.privacy}</Link>
              <Link to="/term" className="hover:underline">{t.pages.terms}</Link>
              <Link to="/doc" className="hover:underline">{t.pages.documentation}</Link>
              <a href="https://discord.gg/kDkydXrtua" target="_blank" className="hover:underline">{t.links.support}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
