import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const FeatureCard: React.FC<{
  title: string;
  text: string;
  align?: "left" | "right";
  imgSrc?: string;
  linkTo?: string;
}> = ({ title, text, align = "left", imgSrc, linkTo }) => (
  <div className="group relative overflow-hidden">
    <div className={`
      flex items-center gap-8 py-12
      md:flex-row flex-col
      ${align === "right" ? "md:flex-row-reverse" : ""}
    `}>

      {/* Image Section - Neo Brutalism Style */}
      <div className="w-full md:w-1/2 relative">
        <div className="transform transition-all duration-300 group-hover:rotate-[-1deg]">
          {/* Main Image Container */}
          <div className="relative rounded-xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="rounded-lg overflow-hidden bg-gray-100">
              {imgSrc ? (
                <img
                  src={imgSrc}
                  alt={title}
                  className="w-full h-64 md:h-80 object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-64 md:h-80 bg-gradient-to-br from-cyan-200 to-purple-300 flex items-center justify-center border-2 border-dashed border-black">
                  <div className="text-black text-lg font-bold">Feature Preview</div>
                </div>
              )}
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 border border-black rounded-full"></div>
            <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-purple-400 border border-black rotate-45"></div>
          </div>

          {/* Floating Accent */}
          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-yellow-300 border-2 border-black rounded-xl rotate-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full md:w-1/2">
        <div className={`text-center md:text-${align}`}>

          {/* Title with Neo Brutalism style */}
          <h3 className="
            text-black text-4xl font-black mb-6 
            tracking-tight leading-tight
            bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent
          ">
            {title}
          </h3>

          {/* Description */}
          <p className="
            text-gray-700 text-lg leading-relaxed mb-8 
            max-w-lg mx-auto md:mx-0 font-medium
            border-l-4 border-cyan-400 pl-4
          ">
            {text}
          </p>

          {/* Neo Brutalism Button */}
          <button className="
            group/btn relative flex items-center justify-center md:justify-start
            bg-gradient-to-r from-cyan-400 to-purple-400 border-2 border-black 
            rounded-xl px-6 py-3 font-bold text-black 
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
            transition-all duration-300
            hover:translate-x-1 hover:translate-y-1 
            hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
            hover:bg-gradient-to-r hover:from-cyan-300 hover:to-purple-300
            mx-auto md:mx-0
          ">
            {/* Button Content */}
            {linkTo ? (
              <Link
                to={linkTo}
                className="relative flex items-center gap-3"
                rel="noopener noreferrer"
              >
                <span className="font-bold text-black">Explore Feature</span>
                <ArrowRight className="w-5 h-5 transform transition-transform group-hover/btn:translate-x-1" />
              </Link>
            ) : (
              <span className="relative flex items-center gap-3">
                <span className="font-bold text-black">Explore Feature</span>
                <ArrowRight className="w-5 h-5 transform transition-transform group-hover/btn:translate-x-1" />
              </span>
            )}

            {/* Hover Effect Dot */}
            <div className="absolute -right-1 -top-1 w-2 h-2 bg-red-400 border border-black rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
          </button>

          {/* Feature Tags */}
          <div className={`flex flex-wrap gap-2 mt-6 ${align === 'right' ? 'md:justify-end' : 'md:justify-start'} justify-center`}>
            <span className="px-3 py-1 bg-cyan-100 border border-black text-sm font-bold rounded-full">NEW</span>
            <span className="px-3 py-1 bg-purple-100 border border-black text-sm font-bold rounded-full">TRENDING</span>
            <span className="px-3 py-1 bg-yellow-100 border border-black text-sm font-bold rounded-full">HOT</span>
          </div>
        </div>
      </div>
    </div>

    {/* Connecting Line with Neo Brutalism Style */}
    <div className="
      absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
      w-24 h-2 bg-black hidden md:block
      shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
    ">
      <div className="w-full h-full bg-gradient-to-r from-cyan-400 to-purple-400 transform skew-x-12"></div>
    </div>

    {/* Background Accent */}
    <div className="
      absolute inset-0 -z-10 bg-gradient-to-br from-cyan-50 to-purple-50 
      rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
      border-2 border-dashed border-gray-300
    "></div>
  </div>
);

export default FeatureCard;