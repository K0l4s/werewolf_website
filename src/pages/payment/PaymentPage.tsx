import React, { useState } from 'react';
import TokenIcon from '../../assets/images/token.png';
import momo from '../../assets/images/momo.png';

import { axiosAuth } from '../../utils/axiosIntance';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';

interface PaymentOption {
  amount: number;
  tokens: number;
  bonus?: number;
}

const PaymentPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingPayment, setPendingPayment] = useState<PaymentOption | null>(null);

  const paymentOptions: PaymentOption[] = [
    // { amount:1000, tokens:1},
    { amount: 5000, tokens: 5 },
    { amount: 10000, tokens: 10 },
    { amount: 50000, tokens: 50 },
    { amount: 100000, tokens: 100 },
    { amount: 500000, tokens: 500 },
    { amount: 1000000, tokens: 1000, bonus: 100 }
  ];

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const handlePaymentClick = (option: PaymentOption) => {
    setPendingPayment(option);
    setShowConfirmModal(true);
  };

  const handleConfirmPayment = async () => {
    if (!pendingPayment) return;

    setIsLoading(true);
    setSelectedOption(pendingPayment.amount);
    setShowConfirmModal(false);

    try {
      const response = await axiosAuth.post('/momo/', {
        amount: pendingPayment.amount,
        orderInfo: `Thanh toán ${formatCurrency(pendingPayment.amount)} cho ${pendingPayment.tokens} tokens`
      });

      if (response.data.payUrl) {
        // Redirect to MoMo payment page
        window.location.href = response.data.payUrl;
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Có lỗi xảy ra khi thực hiện thanh toán');
    } finally {
      setIsLoading(false);
      setPendingPayment(null);
    }
  };

  const handleCancelPayment = () => {
    setShowConfirmModal(false);
    setPendingPayment(null);
  };

  return (
    <div className="min-h-screen p-4 mt-2">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mt-8">
          <h1 className="text-4xl font-black text-gray-900 mb-4 uppercase">
            Nạp Token
          </h1>
        </div>

        <div className="text-center mb-6">
          <div className="bg-white border-2 border-black rounded-lg p-4 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-sm font-bold text-gray-600 flex">
              💳 Hỗ trợ thanh toán qua
              <img src={momo} alt="Momo Logo" className='ml-2 w-5 h-5' />
            </p>
            <p className="text-xl font-bold text-gray-800 mt-1 flex items-center">
              Số dư hiện tại: {user?.token || 0} <img src={TokenIcon} alt="" className='w-8 h-8' />
            </p>
          </div>
        </div>

        {/* Payment Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paymentOptions.map((option) => (
            <button
              key={option.amount}
              onClick={() => handlePaymentClick(option)}
              disabled={isLoading}
              className={`bg-white border-4 border-black rounded-xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-2 active:translate-y-2 ${selectedOption === option.amount ? 'ring-4 ring-yellow-400' : ''
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {/* Token Amount */}
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <img
                    src={TokenIcon}
                    alt="Token"
                    className="w-8 h-8  rounded"
                  />
                  <span className="text-3xl font-black text-gray-900">
                    {option.tokens}
                  </span>
                </div>
                {option.bonus && (
                  <div className="bg-green-200 text-green-900 text-sm font-bold px-3 py-1 border border-black rounded-full inline-block">
                    +{option.bonus} BONUS
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="text-center">
                <p className="text-2xl font-black text-red-600 mb-1">
                  {formatCurrency(option.amount)}
                </p>
                <p className="text-sm font-bold text-gray-600">
                  {option.amount / 1000}K VND
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && pendingPayment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white border-4 border-black rounded-xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full">
              <h3 className="text-2xl font-black text-gray-900 mb-4 text-center">
                XÁC NHẬN THANH TOÁN
              </h3>
              
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <img
                    src={TokenIcon}
                    alt="Token"
                    className="w-10 h-10  rounded"
                  />
                  <span className="text-4xl font-black text-gray-900">
                    {pendingPayment.tokens}
                  </span>
                </div>
                {pendingPayment.bonus && (
                  <div className="bg-green-200 text-green-900 text-sm font-bold px-3 py-1 rounded-full inline-block mb-3">
                    +{pendingPayment.bonus} BONUS
                  </div>
                )}
                <p className="text-xl font-black text-red-600">
                  {formatCurrency(pendingPayment.amount)}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCancelPayment}
                  className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 px-4 border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200"
                >
                  HỦY
                </button>
                <button
                  onClick={handleConfirmPayment}
                  className="flex-1 bg-green-500 text-white font-bold py-3 px-4 border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200"
                >
                  XÁC NHẬN
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white border-4 border-black rounded-xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
              <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-xl font-black text-gray-900">ĐANG XỬ LÝ...</p>
              <p className="text-sm font-bold text-gray-600 mt-2">Vui lòng chờ trong giây lát</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;