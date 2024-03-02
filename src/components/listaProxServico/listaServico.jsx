import { useState, useEffect } from 'react';
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
  const [modalAberto, setModalAberto] = useState(false);
  const [servicoDados, setServicoDados] = useState([]);

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

  const handleAbrirModal = () => {
    setModalAberto(true);
  };

  const handleFecharModal = () => {
    setModalAberto(false);
  };

  const renderServicos = () => {
    const servicosPorData = {};

    servicoDados.forEach(servico => {
      if (!servicosPorData[servico.data_servico]) {
        servicosPorData[servico.data_servico] = [];
      }
      servicosPorData[servico.data_servico].push(servico);
    });

    return Object.keys(servicosPorData).map((data_servico, index) => (
      <div key={index} className={`mb-3 ${index !== 0 ? 'border-top pt-3' : ''}`}>
        <Item>
          <Box sx={{ fontSize: '12px', textTransform: 'uppercase' }}>
            <div className="dia-servico bg-blue" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
              <div className="dia" style={{ fontSize: '24px', color: 'red' }}>{data_servico}</div>
              <div className='dia-semana'>{diasSemana(data_servico)}</div>
            </div>
          </Box>
          <Box component="ul" aria-labelledby="category-a" sx={{ pl: 0 }}>
            {servicosPorData[data_servico].map(servico => (
              <Grid container spacing={1} marginTop={1} sx={{ bgcolor: 'honeydew' }}>
                <Grid xs={12} className="endereco">
                  {servico.rua} {servico.numero} às {servico.hora_marcada}
                </Grid>

                <Grid xs={12}>
                  <div className="d-flex justify-content-between align-items-center">
                    <button alt="Salvar" id={servico.id_servico}
                      onClick={() => openSidebar(servico.data_servico, servico.nome_cliente, servico.id_servico, `${servico.rua} ${servico.numero} ${servico.cidade}`)} className="icon-salvar-servico btn btn-primary rounded-0 ">
                      <PaymentsIcon />
                    </button>
                    <button alt="Cancelar Serviço" onClick={handleAbrirModal} className="icon-cancelar-servico btn btn-danger rounded-0">
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
    ));
  };

  return (
    <div className="container">
      {renderServicos()}
      <AskModal open={modalAberto} onClose={handleFecharModal} />
    </div>
  );
}

export default ListaServico;
