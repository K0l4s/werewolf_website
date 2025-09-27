// CallbackPage.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosNoAuth } from "../../utils/axiosIntance";
import { useDispatch } from "react-redux";
import { login, setIsLoadingFalse, setIsLoadingTrue } from "../../redux/reducer/authReducer";

export default function CallbackPage() {
    const navigate = useNavigate();
    // reducer, context hoặc localStorage để lưu user và guilds nếu cần thiết
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
                    navigate("/dashboard");
                } catch (error) {
                    console.error("Error during Discord callback:", error);
                } finally {
                    dispatch(setIsLoadingFalse());
                }
            })();
        }
    }, [navigate]);

    return <div>Đang login...</div>;
}
