
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GerenciaCliente from './pages/clientes/gerenciaCliente.jsx';
import Home from './pages/home/home.jsx';


function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Home />}/>
        <Route path="/Clientes" element= {<GerenciaCliente/>}/>

        
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;