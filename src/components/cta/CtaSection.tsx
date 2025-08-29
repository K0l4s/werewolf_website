import mascot from "../../assets/images/mascot.png";


const CtaSection = () => {
  return (
     <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-r from-violet-700 to-purple-600 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to play Werewolf?</h2>
            <p className="text-violet-100 mb-6">
              Add Werewolf Bot to your Discord server and enjoy safe, fun games with your community!
            </p>
            <button
              className="px-6 py-3 bg-white text-violet-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 cursor-pointer"
              onClick={() =>
                window.open(
                  "https://discord.com/oauth2/authorize?client_id=1383209480560443392&scope=bot&permissions=8",
                  "_blank"
                )
              }
            >
              <span>Add To Discord</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6V3H7v3H2v2h14V6h-3zm0 4H7v8h6V10z" />
              </svg>
            </button>
          </div>
          <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center p-2">
            <img src={mascot} alt="" className="rounded-full w-full h-full object-cover" />
          </div>
        </div>
      </section>
  )
}

export default CtaSection
