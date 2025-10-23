import { CheckCircle, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const location = useLocation();

  // Parse query params từ URL
  const query = new URLSearchParams(location.search);
  // const partnerCode = query.get('partnerCode');
  const orderId = query.get('orderId');
  const amount = query.get('amount');
  const orderInfo = query.get('orderInfo');
  const transId = query.get('transId');
  const message = query.get('message');

  // Format số tiền
  const formattedAmount = amount
    ? parseInt(amount, 10).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    : null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full bg-white border-2 border-black rounded-2xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 border-2 border-black rounded-full flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <CheckCircle className="w-12 h-12 text-green-700" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Payment Successful!
        </h1>

        {/* Message */}
        <p className="text-lg text-center text-gray-600 mb-2">{message || 'Thank you for your purchase!'}</p>
        <p className="text-center text-gray-500 mb-6">
          Your payment has been processed successfully.
        </p>

        {/* Order Details */}
        <div className="bg-white border-2 border-black rounded-xl p-4 mb-8 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 font-medium">Order ID:</span>
            <span className="font-bold text-gray-800">{orderId || '-'}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 font-medium">Amount Paid:</span>
            <span className="font-bold text-green-700">{formattedAmount || '-'}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 font-medium">Order Info:</span>
            <span className="font-bold text-gray-800">{orderInfo || '-'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Transaction ID:</span>
            <span className="font-bold text-gray-800">{transId || '-'}</span>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="flex justify-center">
          <Link 
            to="/" 
            className="group relative flex items-center justify-center gap-2 py-3 px-6 bg-gray-200 border-2 border-black rounded-xl font-bold text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-300"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>

        {/* Confirmation Email */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            A confirmation email has been sent to your email address.
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

export default PaymentSuccess;
