import { Outlet } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar"
// import NumericKeypad from "../../components/numerics/NumericKeypad"


const DashboardLayout = () => {
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 text-white ">
            <Navbar />
            <Outlet />
        </div>
    )
}

export default DashboardLayout
