import ListaServico from '../../components/listaProxServico/listaServico.jsx';
import Navbar from '../../components/navbar/navbar.jsx';
import Cart from "../../components/cart/cart.jsx";
import BoxDeDados from '../../components/boxDeDados/boxDeDados.jsx';

import "./home.css";
import "../../style/global.css";

function Home() {
  return (
    <div className="container-fluid">
      <Navbar />
      
      <div className="row">
       

        <div className="col-lg-12 col-md-12 mt-5">
          <section className="content">
            <div className="principal container-fluid">
              <BoxDeDados />
            </div>
          </section>

          <div className="my-3 p-3 bg-white rounded box-shadow">
            <h6 className="border-bottom border-gray pb-2 mb-0">Próximos Serviços</h6>
            <div className="row">
              <div className="col-md-12">
                <ListaServico />
                <Cart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
