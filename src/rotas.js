
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/home/home.jsx';
import Login from './pages/login/login.jsx'


function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Login />}/>
        
        <Route path="/Home" element= {<Home/>}/>

        
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;