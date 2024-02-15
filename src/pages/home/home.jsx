import ListaServico from '../../components/listaProxServico/listaServico.jsx';
import Navbar from '../../components/navbar/navbar.jsx';
import MenuLateral from '../../components/menu-lateral/menu-lateral.jsx';
import Cart from "../../components/cart/cart.jsx";
import whatsapp from "../../assets/botoes/whatsapp.svg";
import botaoRota from "../../assets/botoes/map-pin.svg";
import cancelar from "../../assets/botoes/slash.svg";
import servicoRealizado from "../../assets/botoes/dollar-sign.svg";
import "./home.css";
import "../../style/global.css";
//importamos o axios para fazer as requisições ao servidor
import api from "../../services/api";
//importamos o arquivo de rotas para pegar os dados do servidor
import { useEffect, useState } from "react";

function Home() {
  
  
    //criando o estado para armazenar os dados
    const [servicoDados, setservicoDados] = useState([]);

    useEffect(() => {
        //fazendo a requisição ao servidor para pegar os dados
        api.get("/")
        .then((resp) => {
            //setando os dados no estado
            setservicoDados(resp.data);
            
        })
        .catch((err) => {
            alert("Erro ao buscar os dados");
        });
    }, []);
    
    function openSidebar() {
      //criaremos o evento para abrir o sidebar disparamos openSidebar para o componente cart ouvir
      //quando o botao for clicado vai chamar a funcao e o cart vai abrir
      const event = new CustomEvent('openSidebar');
      window.dispatchEvent(event);
  }


  return <>
    <div className='container'>
      <div className="container-fluid">
        <div className="row">
          <Navbar />    
          <div className="col-lg-3 col-md-4 bg-white s">
            <MenuLateral />
          </div>
          <div className="col-lg-9 col-md-8">
          <div className="my-3 p-3 bg-white rounded box-shadow">
            <h6 className="border-bottom border-gray pb-2 mb-0">Próximos Serviços</h6>
            <table className="table">
            <tbody>
            <ListaServico /> <Cart />
          </tbody>
        </table>
           </div>
          </div>
        </div>
      </div>
     
    </div>
 </>
}

export default Home;