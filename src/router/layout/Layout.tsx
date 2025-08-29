import { Outlet } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer"
import CtaSection from "../../components/cta/CtaSection"


const Layout = () => {
    return (
        <div className="min-h-screen bg-[#0b0b0f] text-white ">

            <Navbar />
            <Outlet />
            <CtaSection/>
            <Footer />
        </div>
    )
}

export default Layout
