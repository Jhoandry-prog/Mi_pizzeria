import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Narvar";
import Home from "./Components/Home"
import Footer from "./Components/Footer"
import LoginPage from "./components/LoginPage"
import Register from "./Components/Register"

function App() {

  return (
    <>
      <Navbar />
    {/*   <Home /> */}
      {/* <LoginPage /> */}
      <Register />
      <Footer />
      
    </>
  );
}

export default App;