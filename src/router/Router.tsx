import { Route, Routes } from 'react-router-dom'
import Homepage from '../pages/home/Homepage'
import PolicyPage from '../pages/policy/PolicyPage'
import Layout from './layout/Layout'
import TermPage from '../pages/term/TermPage'
import DocumentationPage from '../pages/documentation/DocumentationPage'
import NotFoundPage from '../pages/notfound/NotFoundPage'
import CallbackPage from '../pages/callback/CallbackPage'
import DashboardLayout from './layout/DashboardLayout'
import Dashboard from '../pages/dashboard/Dashboard'
import { useEffect } from 'react'
import { axiosNoAuth } from '../utils/axiosIntance'
import { useDispatch } from 'react-redux'
import { login, setIsLoadingFalse, setIsLoadingTrue } from '../redux/reducer/authReducer'
import ServerPet from '../pages/pet/ServerPet'
import WerewolfGuide from '../pages/guide/werewolf/WerewolfGuide'


// import type { RootState } from '../redux/store'

const Router = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const getUsers = async () => {
            const token = localStorage.getItem("token")

            try {
                dispatch(setIsLoadingTrue())

                const response = await axiosNoAuth.post("auth/infor",
                    { token: token }
                );
                // console.log(response)
                dispatch(login(response.data));
            } catch (error) {
                console.error("Error fetching health details:", error);
            } finally {
                dispatch(setIsLoadingFalse())
            }
        };
        getUsers()
    }, []);

    // console.log(user)
    return (
        <Routes >
            <Route element={<Layout />}>
                <Route path='' element={<Homepage />} />
                <Route path='policy' element={<PolicyPage />} />
                <Route path='term' element={<TermPage />} />
                <Route path='doc' element={<DocumentationPage />} />
                {/* const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code"); */}
                <Route path="callback" element={<CallbackPage />} />
                <Route path="guide">
                    <Route path="" element={<WerewolfGuide />} />
                    <Route path="werewolf" element={<WerewolfGuide />} />
                </Route>
            </Route>
            <Route element={<DashboardLayout />}>
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='guild'>
                    <Route path='pet/:id' element={<ServerPet />} />
                </Route>
            </Route>
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    )
}

export default Router
