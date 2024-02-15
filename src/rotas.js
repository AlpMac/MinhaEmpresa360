
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/home/home.jsx';
import Navbar from './components/navbar/navbar.jsx';
import MenuLateral from './components/menu-lateral/menu-lateral.jsx';


function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Home />}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;