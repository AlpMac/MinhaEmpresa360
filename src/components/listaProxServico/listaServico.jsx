import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import diasSemana from "../../utils/diaDaSemana.js";
import PaymentsIcon from '@mui/icons-material/Payments';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import DangerousIcon from '@mui/icons-material/Dangerous';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { styled } from '@mui/material/styles';
import api from "../../services/api.js";
import AskModal from "../../utils/Modals/askModal.js";
import "./listaServico.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function ListaServico() {
  const [servicoDados, setServicoDados] = useState([]);
  const [servicoSelecionado, setServicoSelecionado] = useState(null); // Estado para armazenar o serviço selecionado

  useEffect(() => {
    api.get("/")
      .then((response) => {
        setServicoDados(response.data);
      })
      .catch((err) => {
        alert("Erro ao buscar os dados");
      });
  }, []);

  const openSidebar = (data_servico, nome_cliente, id_servico, endereco_cliente) => {
    const event = new CustomEvent('openSidebar', { detail: { data_servico, nome_cliente, id_servico, endereco_cliente } });
    window.dispatchEvent(event);
  };

  const handleAbrirModal = (servico) => {
    setServicoSelecionado(servico); // Armazenando o serviço selecionado
  };

  const handleFecharModal = () => {
    setServicoSelecionado(null); // Fechando o modal ao definir servicoSelecionado como null
  };

  // Agrupar os serviços por data
  const servicosPorData = servicoDados.reduce((acc, servico) => {
    if (!acc[servico.data_servico]) {
      acc[servico.data_servico] = [];
    }
    acc[servico.data_servico].push(servico);
    return acc;
  }, {});

  return (
    <div className="container">
      {servicoSelecionado && (
        <AskModal
          open={true}
          onClose={handleFecharModal}
          title="Deseja realmente cancelar o serviço?"
          data={{ // Passando os dados para o modal
            id_servico: servicoSelecionado.id_servico,
            data: servicoSelecionado.data_servico + ' ás '+ servicoSelecionado.hora_marcada,
            endereco: `${servicoSelecionado.rua} ${servicoSelecionado.numero} ${servicoSelecionado.cidade}`,
            valor : servicoSelecionado.valor
          }}
        />
      )}

      {Object.entries(servicosPorData).map(([data, servicos], index) => (
        <div key={index} className={`mb-3 ${index !== 0 ? 'border-top pt-3' : ''}`}>
          <Item>
            <Box sx={{ fontSize: '12px', textTransform: 'uppercase' }}>
              <div className="dia-servico bg-blue" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                <div className="dia" style={{ fontSize: '24px', color: 'red' }}>{data}</div>
                <div className='dia-semana'>{diasSemana(data)}</div>
              </div>
            </Box>
            <Box component="ul" aria-labelledby="category-a" sx={{ pl: 0 }}>
              {servicos.map((servico, servicoIndex) => (
                <Grid key={servico.id_servico + servicoIndex} container spacing={1} marginTop={1} sx={{ bgcolor: 'honeydew' }}>
                  <Grid item xs={12} className="endereco">
                    {servico.rua} {servico.numero} às {servico.hora_marcada}
                  </Grid>

                  <Grid item xs={12}>
                    <div className="d-flex justify-content-between align-items-center">
                      <button alt="Salvar" id={servico.id_servico}
                        onClick={() => openSidebar(servico.data_servico, servico.nome_cliente, servico.id_servico, `${servico.rua} ${servico.numero} ${servico.cidade}`)} className="icon-salvar-servico btn btn-primary rounded-0 ">
                        <PaymentsIcon />
                      </button>
                      <button alt="Cancelar Serviço" onClick={() => handleAbrirModal(servico)} className="icon-cancelar-servico btn btn-danger rounded-0">
                        <DangerousIcon />
                      </button>
                      <button alt="Obter Rota" className="icon-botao-rota btn btn-info rounded-0" onClick={() => window.open("https://www.google.com/maps/dir/minha+localizacao/" + servico.rua + "+" + servico.numero + "," + servico.cidade, "_blank")}>
                        <DriveEtaIcon />
                      </button>
                      <button alt="Contato" className="icon-botao-whatsapp btn btn-success rounded-0" onClick={() => window.open("https:wa.me/+55" + servico.telefone)}>
                        <WhatsAppIcon />
                      </button>
                    </div>
                  </Grid>
                </Grid>
              ))}
            </Box>
          </Item>
        </div>
      ))}
    </div>
  );
}

export default ListaServico;
