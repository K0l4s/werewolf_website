import { Route, Routes } from 'react-router-dom'
import Homepage from '../pages/home/Homepage'
import PolicyPage from '../pages/policy/PolicyPage'
import Layout from './layout/Layout'
import TermPage from '../pages/term/TermPage'
import DocumentationPage from '../pages/documentation/DocumentationPage'
import NotFoundPage from '../pages/notfound/NotFoundPage'

const Router = () => {
    return (
        <Routes >
            <Route element={<Layout />}>
                <Route path='' element={<Homepage />} />
                <Route path='policy' element={<PolicyPage />} />
                <Route path='term' element={<TermPage />} />
                <Route path='doc' element={<DocumentationPage/>}/>
            </Route>
            <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
    )
}

export default Router
