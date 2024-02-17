import React, { useEffect, useState } from "react";
import servicoRealizado from "../../assets/botoes/dollar-sign.svg";
import cancelar from "../../assets/botoes/slash.svg";
import botaoRota from "../../assets/botoes/map-pin.svg";
import whatsapp from "../../assets/botoes/whatsapp.svg";
import api from "../../services/api";
import "./listaServico.css";

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

    function openSidebar(data_servico, nome_cliente, id_servico, endereco_cliente) {
        const event = new CustomEvent('openSidebar', { detail: { data_servico, nome_cliente, id_servico, endereco_cliente } });
        window.dispatchEvent(event);
    }

    return (
        <div className="container">
            {servicoDados.map((servicoDadosBuscado, index) => (
                <div key={servicoDadosBuscado.id_servico} className={`mb-3 ${index !== 0 ? 'border-top pt-3' : ''}`}>
                    <div className="dia-servico bg-blue">
                        Agendado para: {servicoDadosBuscado.data_servico} às {servicoDadosBuscado.hora_marcada} Hrs
                    </div>
                    <div className="media">
                        <div className="media-body">
                            <h5 className="mt-0">{servicoDadosBuscado.nome_cliente}</h5>
                            <p>Endereço: {servicoDadosBuscado.rua} {servicoDadosBuscado.numero} {servicoDadosBuscado.cidade}</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <button  alt="Salvar" id={servicoDadosBuscado.id_servico} onClick={() => openSidebar(servicoDadosBuscado.data_servico, servicoDadosBuscado.nome_cliente, servicoDadosBuscado.id_servico, `${servicoDadosBuscado.rua} ${servicoDadosBuscado.numero} ${servicoDadosBuscado.cidade}`)} className="icon-salvar-servico btn btn-primary rounded-0">
                            SALVAR 
                        </button>
                        <button alt="Cancelar Serviço" className="icon-cancelar-servico btn btn-danger rounded-0">
                            CANCELAR
                        </button>
                        <button alt="Obter Rota" className="icon-botao-rota btn btn-info rounded-0" onClick={() => window.open("https://www.google.com/maps/dir/minha+localizacao/" + servicoDadosBuscado.rua + "+" + servicoDadosBuscado.numero + "," + servicoDadosBuscado.cidade, "_blank")}>
                            ROTA
                        </button>
                        <button  alt="Contato" className="icon-botao-whatsapp btn btn-success rounded-0">
                            WHATSAPP
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ListaServico;
