import {useEffect, useState} from 'react';
import {Dock} from 'react-dock';
import ProdutoForm from './ProdutoForm.js';



function Cart(props) {

    const [nomeCliente, setNomeCliente] = useState('');
    const [dataServico, setDataServico] = useState('');
    const [codigoServico, setCodigoServico] = useState('');
    const [enderecoCliente, setEnderecoCliente] = useState('');
    

    const [show, setShow] = useState(false);

    useEffect(function(){
        //quando clicamos no botao dispararemos o evento openSidebar que o cart esta ouvindo
        //ai muda a propriedade show para true e o cart abre
        window.addEventListener('openSidebar', function (event) {
            setShow(true);
            const dataServico = event.detail.data_servico;
            const nomeCliente = event.detail.nome_cliente;
            const codigoServico = event.detail.id_servico;
            const enderecoCliente = event.detail.endereco_cliente;
            setNomeCliente(nomeCliente);
            setDataServico(dataServico);
            setCodigoServico(codigoServico);
            setEnderecoCliente(enderecoCliente);    

                  
        });
    }, []);

  return <Dock position="right"
         isVisible={show}
         fluid={false}
         size={320}
         //quando clicamos no botao fechar ou fora o cart fecha
         onVisibleChange={function (visible){
            setShow(visible);
         }}
         >
        <div className="text-center">
         <h1>Opções</h1>
        </div>    
        <div className="ListaDados bg-light p-2 d-flex flex-column">
               
                <ul className="list-group mb-4">
                    <li className="list-group-item">Deseja salvar o serviço como executado?</li>
                    <li className="list-group-item">Código do Serviço : {codigoServico} <br></br>
                                                    Data do Serviço : {dataServico}<br></br>
                                                    Cliente :{nomeCliente}<br></br>
                                                    Endereço : {enderecoCliente}    </li>
                    
                </ul>
                
            </div>
            <div className="ListaDadosExtras bg-light p-4 border d-flex flex-column "> 
            <h2>Deslocamento </h2>
            <div className="d-flex align-items-center">
                            <label htmlFor="deslocamento" className="form-label me-3">KM : </label>
                            <input
                                type="text"
                                className="form-control"
                                name="deslocamento"
                                style={{ width: '25%' }} // Defina o tamanho aqui

                                
                            />
           
            
         </div>   </div>
           <div className="ListaDadosComplementar bg-light p-4 d-flex flex-column "> 
            <h2>Produto Usado</h2>
            <ProdutoForm />
           
            <button className="btn btn-success btn-lg btn-block mt-auto">Confirmar</button>
         </div>   
    </Dock> 
  
}

export default Cart;