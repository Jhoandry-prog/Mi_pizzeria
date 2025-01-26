import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.'
import Footer from './components/Footer'
import Pizza from './pages/Pizza.jsx'
import Cart from './pages/Cart.jsx'
import Register from './pages/Register.'
import Login from './pages/Login.jsx'
import { Profile } from './pages/Profile.'
import { NotFound } from './pages/NotFound.'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/pizza/p001" element={<PizzaPage />} />
          <Route path="/pizza/:id" element={<PizzaPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
