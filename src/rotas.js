
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GerenciaCliente from './pages/clientes/gerenciaCliente.jsx';
import Home from './pages/home/home.jsx';
import Login from './pages/login/login.jsx'


function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Login />}/>
        <Route path="/Clientes" element= {<GerenciaCliente/>}/>
        <Route path="/Home" element= {<Home/>}/>

        
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;