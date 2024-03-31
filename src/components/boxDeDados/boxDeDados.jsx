import React, { useState, useEffect } from 'react';
import "./boxDeDados.css";
import api from "../../services/api.js";
import EditableTableModal from '../buscaServicosTable/buscaServicosTable.jsx'; // Importe o componente da modal
import { Button } from '@mui/material';
import CadastraServico from '../CadastraServico/cadastraServico.jsx';
import CadastraCliente from '../CadastrarCliente/cadastrarCliente.jsx';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WeatherApp from '../buscaDadosMeteorologicos/clima.jsx';

function BoxDeDados() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [boxDeDados, setBoxDeDados] = useState([]);
  const [openModal, setOpenModal] = useState(false); // Estado para controlar a abertura da modal
  const [OpenModalCadastrarServico,sethandleOpenModalCadastrarServico] = useState(false);

  const [totalAtendimentos, setTotalAtendimentos] = useState(0);
  const [totalEmRealAtendidos, setTotalEmRealAtendidos] = useState(0);

  const [totalCancelamentos, setTotalCancelamentos] = useState(0);
  const [totalEmRealCancelados, setTotalEmRealCancelados] = useState(0);

  const [totalAgendado, setTotalAgendado] = useState(0);
  const [totalEmRealAgendado, setTotalEmRealAgendado] = useState(0);

  const handleOpenModal = () => {
    setOpenModal(true);
    // Adiciona a classe ao body para desativar a rolagem
    document.body.classList.add('modal-open');
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    // Remove a classe do body para reativar a rolagem
    document.body.classList.remove('modal-open');
  };

  const handleOpenModalCadastrarServico = () => {
    sethandleOpenModalCadastrarServico(true);
  };

  const handleCloseModalCadastrarServico = () => {
    sethandleOpenModalCadastrarServico(false);
  };



  const handleOpenModalCadastrarCliente = () => {
    setOpenModal(true);
    // Adiciona a classe ao body para desativar a rolagem
    document.body.classList.add('modal-open');
  };

  const handleOpenModalConsultarServico = () => { 
    setOpenModal(true); 
    document.body.classList.add('modal-consulta-servico');
  };



 const handleOpenModalConsultaCliente = () => {
    setOpenModal(true);
    // Adiciona a classe ao body para desativar a rolagem
    document.body.classList.add('modal-consulta-cliente');
  };

  const handleCloseModalCadastrarCliente = () => {
    setOpenModal(false);
    // Remove a classe do body para reativar a rolagem
    document.body.classList.remove('modal-open');
  };





  useEffect(() => {
    const currentDate = new Date();
    const endDateFormatted = currentDate.toISOString().split('T')[0];
    setEndDate(endDateFormatted);

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const startDateFormatted = firstDayOfMonth.toISOString().split('T')[0];
    setStartDate(startDateFormatted);

    window.addEventListener('load', () => {
      const startDateInput = document.getElementById('startDateInput');
      const endDateInput = document.getElementById('endDateInput');
      startDateInput.value = startDateFormatted;
      endDateInput.value = endDateFormatted;
    });

    loadData(startDateFormatted, endDateFormatted);
  }, []);

  const loadData = (startDate, endDate) => {
    api.get(`/box-dados?startDate=${startDate}&endDate=${endDate}`)
    .then((response) => {
        setBoxDeDados(response.data);

        let totalAtendimentos = 0;
        let totalEmRealAtendidos = 0;
        let totalCancelamentos = 0;
        let totalEmRealCancelados = 0;
        let totalAgendado = 0;
        let totalEmRealAgendado = 0;

        response.data.forEach((item) => {
          if (item.data_servico >= startDate && item.data_servico <= endDate) {
            if (item.status_servico === 'S') {
              totalAtendimentos += item.total;
              totalEmRealAtendidos = item.total_valor_formatado;
            } else if (item.status_servico === 'C') {
              totalCancelamentos += item.total;
              totalEmRealCancelados = item.total_valor_formatado;
            } else if (item.status_servico === 'A') {
              totalAgendado += item.total;
              totalEmRealAgendado = item.total_valor_formatado;
            }
          }
        });

        setTotalAtendimentos(totalAtendimentos);
        setTotalEmRealAtendidos(totalEmRealAtendidos);
        setTotalCancelamentos(totalCancelamentos);
        setTotalEmRealCancelados(totalEmRealCancelados);
        setTotalAgendado(totalAgendado);
        setTotalEmRealAgendado(totalEmRealAgendado);
      })
      .catch((err) => {
        console.error("Erro ao buscar os dados:", err);
        setError("Erro ao buscar os dados.");
      });
  };

  const handleSearch = () => {
    const startDateInputEdit = document.getElementById('startDateInput').value;
    const endDateInputEdit = document.getElementById('endDateInput').value;

    setStartDate(startDateInputEdit);
    setEndDate(endDateInputEdit);

    if (endDateInputEdit < startDateInputEdit) {
      setError("A data final não pode ser anterior à data inicial.");
    } else {
      setError("");
      loadData(startDateInputEdit, endDateInputEdit);
    }
  };

  return (
    <>
      <section className="content">
        <div className="container-fluid">
        <WeatherApp cidade="Rio Grande" />
        <div className="botao_acesso_rapido mb-4">
            <div className="acesso-rapido">Acesso Rápido</div>
            <div className="botoes ">
            
              <Button className="BotaoConsultarServico" onClick={handleOpenModalConsultarServico} variant="contained" endIcon={<VisibilityIcon />}>
              Consultar Serviço
                </Button>
              <Button className="BotaoCadastrarServico" onClick={handleOpenModalCadastrarServico} variant="contained" endIcon={<AttachMoneyIcon />}>
              Cadastrar Serviço
              </Button>
              <CadastraServico open={OpenModalCadastrarServico} onClose={handleCloseModalCadastrarServico} />

              <Button className="BotaoCadastrarCliente" onClick={handleOpenModalCadastrarCliente} variant="contained" endIcon={<PersonAddIcon />}>
                Cadastrar Cliente
              </Button>
              <CadastraCliente open={openModal} onClose={handleCloseModal} />
              <Button className="BotaoConsultarCliente" onClick={handleOpenModalConsultaCliente} variant="contained" endIcon={<PersonSearchIcon />}>
                Consultar Cliente
              </Button>
            </div>
          </div>
          <div className="row">
            
            <div className="col-lg-6 col-12 mb-2">
              <div className="input-group">
                <span className="input-group-text">Data Inicial</span>
                <input id="startDateInput" type="date" className="form-control" />
              </div>
            </div>
            <div className="col-lg-4 col-12 mb-2">
              <div className="input-group">
                <span className="input-group-text">Data Final</span>
                <input id="endDateInput" type="date" className="form-control" />
              </div>
            </div>
            <div className="col-lg-2 col-12 mb-2 d-flex">
              <button type="button" className="btn btn-primary flex-grow-1" onClick={handleSearch}>
                <i className="bi bi-search"></i> BUSCAR
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 mb-2">
              <button type="button" className="btn btn-success flex-fill w-100" onClick={handleOpenModal}>
                Atendimentos realizados<h3>{totalAtendimentos}</h3>
              </button>
              <EditableTableModal open={openModal} handleClose={handleCloseModal} pesquisa='S' /> {/* Renderiza a modal */}
            </div>
            <div className="col-sm-6 mb-2">
                <button type="button" className="btn btn-info flex-fill w-100" onClick={handleOpenModal}>
                  Ganhos realizados<h3>{totalEmRealAtendidos}</h3>
                </button>
              </div>
              <div className="col-sm-6 mb-2">
                <button type="button" className="btn btn-warning flex-fill w-100" onClick={handleOpenModal}>
                  Cancelamentos realizados<h3>{totalCancelamentos}</h3>
                </button>
                <EditableTableModal open={openModal} handleClose={handleCloseModal} pesquisa='C' /> {/* Renderiza a modal */}
              </div>
              <div className="col-sm-6 mb-2">
                <button type="button" className="btn bg-danger flex-fill w-100" onClick={handleOpenModal}>
                  Custos de atendimentos<h3>FAZER ...</h3>
                </button>
              </div>
              <div className="col-sm-6 mb-2">
                <button type="button" className="btn bg-secondary flex-fill w-100" onClick={handleOpenModal}>
                  Serviços a fazer<h3>{totalAgendado}</h3>
                </button>
                <EditableTableModal open={openModal} handleClose={handleCloseModal} pesquisa='A'/> {/* Renderiza a modal */}
              </div>
              <div className="col-sm-6 mb-2">
                <button type="button" className="btn bg-secondary flex-fill w-100" onClick={handleOpenModal}>
                  Ganhos esperados<h3>{totalEmRealAgendado}</h3>
                </button>
              </div>
              <div className="col-sm-6 mb-2">
                <button type="button" className="btn bg-info flex-fill w-100" onClick={handleOpenModal}>
                  Venda de Produtos<h3>FAZER</h3>
                </button>
                <EditableTableModal open={openModal} handleClose={handleCloseModal} pesquisa='A'/> {/* Renderiza a modal */}
              </div>
              <div className="col-sm-6 mb-2">
                <button type="button" className="btn bg-danger flex-fill w-100" onClick={handleOpenModal}>
                  Custo Fixo<h3>FAZER</h3>
                </button>
              </div>
          </div>
        </div>
      </section>

      {error && <div className="alert alert-danger">{error}</div>}
    </>
  );
}

export default BoxDeDados;
