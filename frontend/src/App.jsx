import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AddInvestment from './pages/AddInvestment'
import AdvisorList from './pages/AdvisorList'
import Recommendations from './pages/Recommendations'
import ClientsList from './pages/ClientList'
import UpdateInvestment from './pages/UpdateInvestment'
import Profile from './pages/Profile'

function App() {
  const isAuth = !!localStorage.getItem('token')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/add-investment" element={isAuth ? <AddInvestment /> : <Navigate to="/login" />} />
        <Route path="/advisors" element={isAuth ? <AdvisorList /> : <Navigate to="/login"/>} />
        <Route path='/recommendations' element={isAuth ? <Recommendations />: <Navigate to='/login'/>} />
        <Route path="/clients" element={isAuth ? <ClientsList /> : <Navigate to="/login" />} />
        <Route path="/update-investment/:id" element={isAuth ? <UpdateInvestment /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App