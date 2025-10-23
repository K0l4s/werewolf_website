import { Link } from "react-router-dom"

const PaymentComponent = () => {
  return (
    <Link 
      to={"payment"} 
      className="fixed group bg-red-500 w-24 h-24 bottom-25 right-10 border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-2 active:translate-y-2 flex flex-col items-center justify-center font-black text-white text-center p-3 uppercase animate-pulse hover:animate-none"
    >
      {/* Dollar Sign Icon */}
      <div className="w-10 h-10 mb-1 bg-white border-2 border-black rounded-full flex items-center justify-center font-black text-red-600 text-lg">
        $
      </div>
      <span className="text-xs font-black tracking-wide">Buy token</span>
    </Link>
  )
}

export default PaymentComponent