import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'

function App() {
return ( <BrowserRouter> <Routes>
<Route path="/" element={<Navigate to="/register" replace />} />
<Route path="/register" element={<Register />} />
<Route path="/login" element={<Login />} />
<Route path="/home" element={<Home />} />
<Route path="*" element={<Navigate to="/register" replace />} /> </Routes> </BrowserRouter>
)
}

export default App
