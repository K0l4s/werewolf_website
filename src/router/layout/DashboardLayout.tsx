import { Outlet } from "react-router-dom"
// import Navbar from "../../components/navbar/Navbar"
import { useSidebar } from "../../hooks/useSidebar";
import Sidebar from "../../components/sidebar/Sidebar";
import type { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import NotFoundPage from "../../pages/notfound/NotFoundPage";
// import NumericKeypad from "../../components/numerics/NumericKeypad"


const DashboardLayout = () => {
    const { isOpen, toggleSidebar } = useSidebar();
    const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
    return (
        <>
            {
                isAuth ? (
                    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] ">
                        {/* <Navbar /> */}
                        <div className="flex h-screen">
                            <Sidebar isOpen={isOpen} onToggle={toggleSidebar} />
                            <div className="flex-1 flex flex-col overflow-hidden">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                ) :
                    (
                        <NotFoundPage/>
                    )
            }
        </>
    )
}

export default DashboardLayout
