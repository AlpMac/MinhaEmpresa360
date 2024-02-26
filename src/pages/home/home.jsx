import ListaServico from '../../components/listaProxServico/listaServico.jsx';
import Navbar from '../../components/navbar/navbar.jsx';
import MenuLateral from '../../components/menu-lateral/menu-lateral.jsx';
import Cart from "../../components/cart/cart.jsx";

import "./home.css";
import "../../style/global.css";
import BotoesDeAcoes from '../../components/botoesDeAcoes/botoesDeAcoes.jsx';
import Grafico from '../../components/chart/chart.jsx';
import BoxDeDados from '../../components/boxDeDados/boxDeDados.jsx';

function Home() {
  return (
    <div className="container-fluid">
      <Navbar />
      
      <div className="row">
        <div className="col-lg-3 col-md-4 bg-white s">
          <MenuLateral />
        </div>
        
        <div className="col-lg-9 col-md-8">
          <section className="content">
            <div className="container-fluid">
              <BoxDeDados />
            </div>
          </section>

          <div className="my-3 p-3 bg-white rounded box-shadow">
            <h6 className="border-bottom border-gray pb-2 mb-0">Próximos Serviços</h6>
            <div className="row">
              <div className="col-lg-9 col-md-8">
                <ListaServico />
                <Cart />
              </div>
              <div className="col-lg-3 col-md-4">
                {/* Estilize esses botões de acordo com sua necessidade */}
                <div className="sticky-left-buttons">
                  <BotoesDeAcoes />
                </div>
              </div>
            </div>
            {/*<Grafico />*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
