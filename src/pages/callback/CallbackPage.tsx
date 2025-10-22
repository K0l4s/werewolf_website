import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosNoAuth } from "../../utils/axiosIntance";
import { useDispatch } from "react-redux";
import { login, setIsLoadingFalse, setIsLoadingTrue } from "../../redux/reducer/authReducer";
import { Loader, CheckCircle, XCircle } from "lucide-react";

export default function CallbackPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
            dispatch(setIsLoadingTrue());
            (async () => {
                try {
                    // Gửi code tới backend để lấy token và thông tin user
                    const res = await axiosNoAuth.post("auth/discord/callback", { code });
                    dispatch(login(res.data.user));
                    localStorage.setItem("token", res.data.token);

                    // Thêm delay nhỏ để hiển thị trạng thái thành công
                    // setTimeout(() => {
                    // navigate("/dashboard")
                    window.location.href = "/dashboard"; // điều hướng và reload luôn
                    // }, 1500);


                } catch (error) {
                    console.error("Error during Discord callback:", error);
                    // Hiển thị trạng thái lỗi trong 2 giây trước khi chuyển hướng
                    // setTimeout(() => {
                    navigate("/");
                    // }, 2000);
                } finally {
                    dispatch(setIsLoadingFalse());
                }
            })();
        } else {
            // Nếu không có code, chuyển hướng về trang chủ
            // setTimeout(() => {
            navigate("/");
            // }, 1000);
        }
    }, [navigate, dispatch]);

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
            <div className="relative bg-white border-2 border-black rounded-2xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-md w-full">
                {/* Decorative corner elements */}
                <div className="absolute top-4 left-4 w-5 h-5 bg-cyan-400 border-2 border-black rounded-full"></div>
                <div className="absolute top-4 right-4 w-4 h-4 bg-purple-400 border-2 border-black rotate-45"></div>
                <div className="absolute bottom-4 left-4 w-3 h-3 bg-yellow-400 border-2 border-black rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-5 h-5 bg-green-400 border-2 border-black rounded-sm"></div>

                {/* Content */}
                <div className="text-center space-y-6">
                    {/* Loading/Status Icon */}
                    <div className="flex justify-center">
                        {code ? (
                            <div className="flex items-center justify-center w-20 h-20 bg-cyan-50 border-2 border-cyan-200 rounded-full">
                                <Loader size={48} className="animate-spin text-cyan-500" />
                            </div>
                        ) : (
                            <div className="flex items-center justify-center w-20 h-20 bg-red-50 border-2 border-red-200 rounded-full">
                                <XCircle size={48} className="text-red-500" />
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-black text-black">
                        {code ? "Đang đăng nhập..." : "Lỗi xác thực"}
                    </h1>

                    {/* Description */}
                    <p className="text-gray-700 text-lg font-medium max-w-md">
                        {code
                            ? "Đang kết nối với Discord và tải thông tin tài khoản của bạn..."
                            : "Không tìm thấy mã xác thực. Vui lòng thử lại."
                        }
                    </p>

                    {/* Progress indicator */}
                    {code && (
                        <div className="flex justify-center">
                            <div className="w-full max-w-xs h-3 bg-gray-200 border border-black rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse rounded-full"></div>
                            </div>
                        </div>
                    )}

                    {/* Steps */}
                    {code && (
                        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                            {[
                                { label: "Xác thực", status: "completed" },
                                { label: "Đang xử lý", status: "loading" },
                                { label: "Chuyển hướng", status: "pending" }
                            ].map((step, index) => (
                                <div key={index} className="text-center">
                                    <div className={`flex items-center justify-center w-10 h-10 mx-auto border-2 border-black rounded-full ${step.status === 'completed' ? 'bg-green-400' :
                                        step.status === 'loading' ? 'bg-cyan-400' :
                                            'bg-gray-200'
                                        }`}>
                                        {step.status === 'completed' ? (
                                            <CheckCircle size={16} className="text-black" />
                                        ) : step.status === 'loading' ? (
                                            <Loader size={16} className="animate-spin text-black" />
                                        ) : (
                                            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                                        )}
                                    </div>
                                    <span className="text-xs font-bold text-gray-700 mt-2 block">
                                        {step.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Additional info */}
                    <div className="bg-cyan-50 border-2 border-cyan-200 rounded-lg p-4 max-w-md mx-auto">
                        <p className="text-sm text-cyan-800 font-medium">
                            💡 <strong>Mẹo:</strong> Bạn sẽ được tự động chuyển hướng sau khi hoàn tất
                        </p>
                    </div>

                    {/* Manual redirect button for error case */}
                    {!code && (
                        <button
                            onClick={() => navigate("/")}
                            className="flex items-center justify-center bg-cyan-400 border-2 border-black rounded-xl px-6 py-3 font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-cyan-300 mx-auto"
                        >
                            Quay lại trang chủ
                        </button>
                    )}
                </div>

                {/* Bottom decorative border */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 border border-black rounded-full"></div>
            </div>
        </div>
    );
}