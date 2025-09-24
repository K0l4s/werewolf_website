import { Outlet } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer"
import CtaSection from "../../components/cta/CtaSection"


const Layout = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 text-white ">

            <Navbar />
            <Outlet />
            <CtaSection />
            <Footer />
        </div>
    )
}

export default Layout
