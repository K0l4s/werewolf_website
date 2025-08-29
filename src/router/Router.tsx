import { Route, Routes } from 'react-router-dom'
import Homepage from '../pages/home/Homepage'
import PolicyPage from '../pages/policy/PolicyPage'
import Layout from './layout/Layout'
import TermPage from '../pages/term/TermPage'

const Router = () => {
    return (
        <Routes >
            <Route element={<Layout />}>
                <Route path='' element={<Homepage />} />
                <Route path='policy' element={<PolicyPage />} />
                <Route path='term' element={<TermPage />} />
            </Route>
        </Routes>
    )
}

export default Router
