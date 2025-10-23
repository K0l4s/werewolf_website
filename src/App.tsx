
import { useSelector } from "react-redux";
import AdsContainer from "./components/ads/AdsContainer"
import Router from "./router/Router"
import type { RootState } from "./redux/store";
import PaymentComponent from "./components/payment/PaymentComponent";

function App() {
  const user = useSelector((state: RootState) => state.auth.user);
  // const isPremium = user?.premium || false;


  return (
    <>
      <Router />
      < AdsContainer />
      {user &&
        <PaymentComponent />
      }
    </>
  )
}

export default App
