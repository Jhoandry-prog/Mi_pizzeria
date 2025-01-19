import React from "react";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Navbar from './components/Navbar'
/* import Home from './components/Home' */
import Footer from './components/Footer'
import Pizza from './components/Pizza'
/* import Cart from './components/Cart'
import Register from './components/Register'
import Login from './components/Login' */

function App () {

  return (

     <div>
        <Navbar />
        {/* <Home /> */}
        {/* <RegisterPage /> */}
        {/* <LoginPage /> */}
        {/* <Cart /> */}
        <Pizza />
        <Footer />
      </div>
  );
};

export default App;