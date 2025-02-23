import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.'
import Footer from './components/Footer'
import Pizza from './Pages/Pizza.jsx'
import Cart from './Pages/Cart.jsx'
import Register from './Pages/Register.'
import Login from './Pages/Login.jsx'
import { Profile } from './Pages/Profile.'
import { NotFound } from './Pages/NotFound.'
import { Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartContext.'
import { useUser } from './hooks/useUser.js'
import { useAuth } from "./context/UserContext";  // Importamos el contexto de autenticación

function App() {
  const { token } = useUser();

  return (
    <>
      <CartProvider className='box-border m-0 p-0'>
        <Navbar/>
        <Routes>
          <Route
            path='/'
            element={<Home/>}   
          />
          <Route
            path='/pizza/:id'
            element={<Pizza />}   
          />
          <Route
            path='/register'
            element={token === false ? <Register/> : <Navigate to='/'/>}   
          />
          <Route
            path='/login'
            element={token === false ? <Login/> : <Navigate to='/'/>}   
          />
          <Route
            path='/profile'
            element={token === false ? <Navigate to='/login'/> : <Profile name='Juan Pablo Bersezio' email='jp.bersezio@gmail.com' password='******'/>}   
          />
          <Route
            path='/cart'
            element={<Cart />}   
          />
          <Route
            path='/404'
            element={<NotFound />}   
          />
          <Route
            path='/404'
            element={<NotFound />}   
          />
        </Routes>
        <Footer/>
      </CartProvider>
    </>
  )
}

export default App