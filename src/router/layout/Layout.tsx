import { Outlet } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar"


const Layout = () => {
    return (
        <div className="min-h-screen bg-[#0b0b0f] text-white">
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Layout
