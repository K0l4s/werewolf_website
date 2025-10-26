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
  popular?: boolean;
}

const PaymentPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingPayment, setPendingPayment] = useState<PaymentOption | null>(null);

  // Sắp xếp các gói hợp lý hơn với bonus tính theo giá trị /100
  const paymentOptions: PaymentOption[] = [
    { amount: 10000, tokens: 10 },
    { amount: 50000, tokens: 50 },
    { amount: 100000, tokens: 100, popular: true },
    { amount: 200000, tokens: 200 },
    { amount: 500000, tokens: 500 },
    { amount: 1000000, tokens: 1000, bonus: 100 }
  ];

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const calculateDiscount = (option: PaymentOption): number => {
    if (!option.bonus) return 0;
    const totalTokens = option.tokens + option.bonus;
    const originalValue = (option.amount / option.tokens) * totalTokens;
    return Math.round(((originalValue - option.amount) / originalValue) * 100);
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
  if (!user)
    return <h1 className="text-5xl max-w-6xl m-auto mt-20 font-black text-gray-900 mb-2 uppercase bg-yellow-400 px-6 py-3 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      Login Required</h1>
  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block transform -rotate-2 mb-4">
            <h1 className="text-5xl font-black text-gray-900 mb-2 uppercase bg-yellow-400 px-6 py-3 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              Nạp Token
            </h1>
          </div>
          <p className="text-lg font-bold text-gray-700 max-w-2xl mx-auto">
            Nạp token để trải nghiệm tất cả tính năng premium. Càng nạp nhiều càng được bonus hấp dẫn!
          </p>
        </div>

        {/* User Info Card */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          <div className="flex-1 bg-white border-4 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-2">Số dư hiện tại</h3>
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-black text-purple-600">{user?.token || 0}</div>
                  <img src={TokenIcon} alt="Token" className="w-10 h-10 animate-pulse" />
                </div>
              </div>
              <div className="text-right">
                <div className="bg-green-100 border-2 border-green-500 rounded-full px-4 py-2">
                  <span className="text-sm font-black text-green-700">ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white border-4 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-2">Phương thức thanh toán</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-600">Được hỗ trợ bởi</span>
                  <img src={momo} alt="Momo" className="w-8 h-8" />
                  <span className="font-black text-pink-600">Momo</span>
                </div>
              </div>
              <div className="text-4xl">⚡</div>
            </div>
          </div>
        </div>

        {/* Payment Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {paymentOptions.map((option) => {
            const discount = calculateDiscount(option);
            return (
              <div
                key={option.amount}
                className={`relative ${option.popular ? 'scale-105' : ''}`}
              >
                {option.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-red-500 text-white font-black px-3 py-1 border-2 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm uppercase">
                      ⭐ Phổ Biến Nhất
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handlePaymentClick(option)}
                  disabled={isLoading}
                  className={`w-full h-full bg-white border-4 border-black rounded-2xl p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1.5 hover:translate-y-1.5 transition-all duration-200 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-3 active:translate-y-3
                    ${selectedOption === option.amount ? 'ring-4 ring-yellow-400 bg-yellow-50' : ''}
                    ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                    ${option.popular ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50' : ''}
                  `}
                >
                  {/* Discount Badge */}
                  {discount > 0 && (
                    <div className="absolute -top-3 -right-3">
                      <div className="bg-green-500 text-white font-black px-4 py-2 border-2 border-black rounded-full text-sm transform rotate-6">
                        -{discount}%
                      </div>
                    </div>
                  )}

                  {/* Token Amount */}
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <img
                        src={TokenIcon}
                        alt="Token"
                        className="w-12 h-12 animate-pulse"
                      />
                      <div>
                        <div className="text-4xl font-black text-gray-900 leading-none">
                          {option.tokens}
                        </div>
                        {option.bonus && (
                          <div className="text-lg font-black text-green-600">
                            +{option.bonus} BONUS
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-4">
                    <p className="text-3xl font-black text-red-600 mb-2">
                      {formatCurrency(option.amount)}
                    </p>
                    {/* <p className="text-sm font-bold text-gray-600">
                      {formatCurrency(option.amount / (option.tokens + (option.bonus || 0)))} / token
                    </p> */}
                  </div>

                  {/* Value Indicator */}
                  <div className="flex justify-between items-center text-xs font-bold text-gray-600">
                    <span>💰 Giá trị tốt</span>
                    <span>⚡ Nhanh chóng</span>
                    <span>🎁 Bonus hấp dẫn</span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="bg-white border-4 border-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
          <h3 className="text-2xl font-black text-gray-900 mb-4 text-center">💡 Tại sao nên nạp token?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4">
              <div className="text-3xl mb-2">🚀</div>
              <h4 className="font-black text-gray-900 mb-2">Truy cập Premium</h4>
              <p className="text-sm text-gray-600">Mở khóa tất cả tính năng cao cấp</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-black text-gray-900 mb-2">Tiết kiệm hơn</h4>
              <p className="text-sm text-gray-600">Càng mua nhiều càng được giá tốt</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">⚡</div>
              <h4 className="font-black text-gray-900 mb-2">Thanh toán nhanh</h4>
              <p className="text-sm text-gray-600">Momo tích hợp, chỉ 30s để nạp</p>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && pendingPayment && (
          <div className="fixed inset-0  bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white border-4 border-black rounded-2xl p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-md w-full transform animate-pop-in">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 border-4 border-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-2">
                  XÁC NHẬN THANH TOÁN
                </h3>
                <p className="text-gray-600 font-bold">Bạn sắp mua gói token sau:</p>
              </div>

              <div className="bg-gradient-to-r from-cyan-50 to-purple-50 border-4 border-black rounded-xl p-6 mb-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <img
                    src={TokenIcon}
                    alt="Token"
                    className="w-12 h-12 animate-pulse"
                  />
                  <div>
                    <div className="text-4xl font-black text-gray-900">
                      {pendingPayment.tokens}
                    </div>
                    {pendingPayment.bonus && (
                      <div className="text-lg font-black text-green-600">
                        +{pendingPayment.bonus} BONUS
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-2xl font-black text-red-600">
                    {formatCurrency(pendingPayment.amount)}
                  </p>
                  {pendingPayment.bonus && (
                    <p className="text-sm font-bold text-gray-600">
                      Tổng cộng: {(pendingPayment.tokens + pendingPayment.bonus).toLocaleString()} TOKEN
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleCancelPayment}
                  className="flex-1 bg-gray-200 text-gray-800 font-black py-4 px-6 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 text-lg uppercase"
                >
                  Hủy
                </button>
                <button
                  onClick={handleConfirmPayment}
                  className="flex-1 bg-gradient-to-r from-green-400 to-cyan-400 text-white font-black py-4 px-6 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 text-lg uppercase"
                >
                  Thanh Toán
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white border-4 border-black rounded-2xl p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-center transform animate-bounce-in">
              <div className="w-20 h-20 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">ĐANG XỬ LÝ...</h3>
              <p className="text-lg font-bold text-gray-600">Đang chuyển hướng đến MoMo</p>
              <p className="text-sm text-gray-500 mt-2">Vui lòng không đóng trang</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;