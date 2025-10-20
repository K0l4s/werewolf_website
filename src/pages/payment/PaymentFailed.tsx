import { XCircle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaymentFailed = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="max-w-md w-full bg-white border-2 border-black rounded-2xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        {/* Failed Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-100 border-2 border-black rounded-full flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <XCircle className="w-12 h-12 text-red-700" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Payment Failed
        </h1>

        {/* Message */}
        <p className="text-lg text-center text-gray-600 mb-2">
          We couldn't process your payment
        </p>
        <p className="text-center text-gray-500 mb-8">
          Please check your payment details and try again.
        </p>

        {/* Error Details */}
        <div className="bg-white border-2 border-black rounded-xl p-4 mb-8 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600">Error Code:</span>
            <span className="font-bold text-red-700">DECLINED</span>
          </div>
          {/* <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600">Amount:</span>
            <span className="font-bold text-gray-800">$149.99</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Time:</span>
            <span className="font-bold text-gray-800">2:45 PM</span>
          </div> */}
        </div>

        {/* Possible Reasons */}
        {/* <div className="bg-white border-2 border-black rounded-xl p-4 mb-8 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="font-bold text-gray-800 mb-3">Possible reasons:</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
              Insufficient funds in your account
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
              Incorrect card details entered
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
              Card expired or blocked
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
              Network connectivity issues
            </li>
          </ul>
        </div> */}

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <button className="group relative flex items-center justify-center gap-2 py-3 px-6 bg-yellow-400 border-2 border-black rounded-xl font-bold text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300">
            <RefreshCw className="w-5 h-5" />
            Try Again
            {/* Button decoration */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 border border-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          
          <Link 
            to="/" 
            className="group relative flex items-center justify-center gap-2 py-3 px-6 bg-gray-200 border-2 border-black rounded-xl font-bold text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-300 text-center"
          >
            <Home className="w-5 h-5" />
            Back to Home
            {/* Button decoration */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 border border-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>

        {/* Support Message */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Need help? Contact our support team.
          </p>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-2 left-2 w-3 h-3 bg-cyan-400 border border-black rounded-full"></div>
        <div className="absolute top-2 right-2 w-3 h-3 bg-purple-400 border border-black rounded-full"></div>
        <div className="absolute bottom-2 left-2 w-3 h-3 bg-yellow-400 border border-black rounded-full"></div>
        <div className="absolute bottom-2 right-2 w-3 h-3 bg-green-400 border border-black rounded-full"></div>
      </div>
    </div>
  );
};

export default PaymentFailed;