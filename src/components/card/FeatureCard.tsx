const FeatureCard: React.FC<{
  title: string;
  text: string;
  align?: "left" | "right";
  imgSrc?: string;
}> = ({ title, text, align = "left", imgSrc }) => (
  <div className="group relative">
    <div className={`
      flex items-center gap-12 py-12
      md:flex-row flex-col
      ${align === "right" ? "md:flex-row-reverse" : ""}
    `}>
      {/* Image Section */}
      <div className="w-full md:w-1/2 relative">
        <div className="relative rounded-2xl overflow-hidden transform transition-all duration-500 ">
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-2xl blur-sm group-hover:blur-md transition-all duration-500"></div>
          
          {/* Main Image Container */}
          <div className="relative rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-1 shadow-2xl">
            <div className="rounded-xl overflow-hidden bg-zinc-900/80 backdrop-blur-sm">
              {imgSrc ? (
                <img 
                  src={imgSrc} 
                  alt={title}
                  className="w-full h-64 md:h-80 object-cover transform transition-transform duration-700 " 
                />
              ) : (
                <div className="w-full h-64 md:h-80 bg-gradient-to-br from-zinc-800 to-zinc-700 flex items-center justify-center">
                  <div className="text-zinc-400 text-lg">Feature Preview</div>
                </div>
              )}
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full md:w-1/2">
        <div className="text-center md:text-left">
          {/* Title with gradient text */}
          <h3 className="
            text-white text-3xl font-bold mb-4 
            bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent
          ">
            {title}
          </h3>
          
          {/* Description */}
          <p className="
            text-zinc-400 text-lg leading-relaxed mb-6 
            max-w-lg mx-auto md:mx-0
          ">
            {text}
          </p>

          {/* Enhanced Button */}
          <button className="
            relative px-8 py-3 
            bg-gradient-to-r from-zinc-800 to-zinc-700 
            hover:from-zinc-700 hover:to-zinc-600
            text-zinc-200 font-medium rounded-xl
            transform transition-all duration-300 
             hover:shadow-2xl
            border border-zinc-700 hover:border-zinc-600
            group/btn overflow-hidden
          ">
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
            
            <span className="relative flex items-center gap-2">
              Learn more
              <svg className="w-4 h-4 transform transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>

    {/* Connecting line for desktop */}
    <div className="
      absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
      w-24 h-0.5 bg-gradient-to-r from-transparent via-zinc-600 to-transparent
      hidden md:block opacity-50 group-hover:opacity-100 transition-opacity duration-500
    "></div>
  </div>
);

export default FeatureCard;