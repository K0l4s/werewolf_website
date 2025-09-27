// CallbackPage.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosNoAuth } from "../../utils/axiosIntance";
import { useDispatch } from "react-redux";
import { login } from "../../redux/reducer/authReducer";

export default function CallbackPage() {
    const navigate = useNavigate();
    // reducer, context hoặc localStorage để lưu user và guilds nếu cần thiết
    const dispatch = useDispatch();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
            axiosNoAuth
                .post("auth/discord/callback", { code })
                .then((res) => {
                    // console.log("User:", res.data.user);
                    // console.log("Guilds:", res.data.guilds);
                    dispatch(login(res.data.user));
                    
                    localStorage.setItem("token", res.data.token); // hoặc JWT
                    navigate("/dashboard");
                })
                .catch((err) => console.error(err));
        }
    }, [navigate]);

    return <div>Đang login...</div>;
}
