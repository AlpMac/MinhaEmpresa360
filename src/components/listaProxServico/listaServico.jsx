import Cart from "../cart/cart";
import whatsapp from "../../assets/botoes/whatsapp.svg";
import botaoRota from "../../assets/botoes/map-pin.svg";
import cancelar from "../../assets/botoes/slash.svg";
import servicoRealizado from "../../assets/botoes/dollar-sign.svg";
import "./listaServico.css";
import api from "../../services/api";
import { useEffect, useState } from "react";
import React from "react";

function ListaServico() {

    const [servicoDados, setservicoDados] = useState([]);

    
    useEffect(() => {

        api.get("/")
            .then((response) => {
                setservicoDados(response.data);
              
            })
            .catch((err) => {
                alert("Erro ao buscar os dados");
            });
    }, []);

    function openSidebar(data_servico, nome_cliente,id_servico, endereco_cliente) {
        const event = new CustomEvent('openSidebar', { detail: { data_servico: data_servico,
                                                       nome_cliente: nome_cliente,
                                                       id_servico: id_servico,
                                                       endereco_cliente:endereco_cliente } });
        
        window.dispatchEvent(event);
    }

   
    return <>
        
            { servicoDados.map(function (servicoDadosBuscado) {
                return (
                    <div key={servicoDadosBuscado.id_servico}>
                        <tr className="bg-light">
                            <td>
                                <div className="dia-servico bg-blue">
                                    Agendado para: {servicoDadosBuscado.data_servico} às {servicoDadosBuscado.hora_marcada} Hrs
                                </div>
                            </td>
                        </tr>
                        <tr className="bg-light-subtle">
                            <td>
                                <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                    <div className="d-flex justify-content-between align-items-center w-100">
                                        <strong data-id={servicoDadosBuscado.cliente_id} className="dadoCliente text-gray-dark">{servicoDadosBuscado.nome_cliente}</strong>
                                        <span className="enderecoCliente d-block align-items-bottom">Endereço: {servicoDadosBuscado.rua} {servicoDadosBuscado.numero} {servicoDadosBuscado.cidade}</span>
                                        <div className="menu-botoes-servico">
                                            <div className="mr-4">
                                                <button id={servicoDadosBuscado.id_servico} onClick={() =>  openSidebar(servicoDadosBuscado.data_servico,
                                                                                                                        servicoDadosBuscado.nome_cliente,
                                                                                                                        servicoDadosBuscado.id_servico,
                                                                                                                        `${servicoDadosBuscado.rua} ${servicoDadosBuscado.numero} ${servicoDadosBuscado.cidade}`)} className="icon-salvar-servico btn btn-primary" alt="Salvar">
                                                    <img src={servicoRealizado} alt="Salvar" />
                                                </button>
                                            </div>
                                            <div className="mr-4">
                                                <img src={cancelar} className="icon-cancelar-servico btn btn-danger" alt="Cancelar Serviço" />
                                            </div>
                                            <div className="mr-4">
                                                <img src={botaoRota} className="icon-botao-rota btn btn-info" alt="Obter Rota" />
                                            </div>
                                            <div>
                                                <img src={whatsapp} className="icon-botao-whatsapp btn btn-success" alt="Contato" />
                                            </div>
                                        </div>
           
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </div>
                    );
                  
                  })}  
        </>
    
}

export default ListaServico;
