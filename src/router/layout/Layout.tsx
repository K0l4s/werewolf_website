import { Outlet } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer"
import CtaSection from "../../components/cta/CtaSection"
// import NumericKeypad from "../../components/numerics/NumericKeypad"


const Layout = () => {
    // const handleKeyPress = (value: number) => {
    //     console.log('Key pressed:', value);
    // };

    // const handleSubmit = (value: string) => {
    //     console.log('Submitted value:', value);
    //     alert(`You entered: ${value}`);
    // };
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 text-white ">
            
            <Navbar />
            <Outlet />
            <CtaSection />
            <Footer />
            {/* <div className="text-center">
                <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text mb-2">
                    Numeric Keypad
                </h1>
                <p className="text-gray-400 mb-8">Enter your 6-digit code</p>

                <NumericKeypad
                    onKeyPress={handleKeyPress}
                    onSubmit={handleSubmit}
                    maxLength={6}
                />
            </div> */}
        </div>
    )
}

export default Layout
