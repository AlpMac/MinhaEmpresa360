import React, { useState } from 'react';
import { Modal, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import api from "../../services/api.js";
import './cadastrarTipoDeServico.css';
import GenericModal from '../../utils/Modals/ModalGenerico.jsx';
const SavecadastrarTipoDeServico = ({ open, onClose }) => {
    const [itemDescricaoServico, setItemDescricaoServico] = useState('');
    const [tempoExecucao, setTempoExecucao] = useState('');
    const [valorRecomendado, setValorRecomendado] = useState('');
    const [errorItemDescricaoServico, setErrorItemDescricaoServico] = useState(false);
    const [errorTempoExecucao, setErrorTempoExecucao] = useState(false);
    const [errorValorRecomendado, setErrorValorRecomendado] = useState(false);
    const [openGenericModal, setOpenGenericModal] = useState(false);
    const [modalData, setModalData] = useState({
      titulo: '',
      data: '',
      alerttipo: '',
    });
  
    const handleOpenModal = (titulo, data, alerttipo) => {
      setModalData({ titulo, data, alerttipo });
      setOpenGenericModal(true);
    };
  
    const handleCloseModal = () => {
      setOpenGenericModal(false);
    };
  
    const handleCloseAllModals = () => {
      handleCloseModal();
      onClose(); // Fecha o modal pai
    };
  
    const handleSave = () => {
      // Verifica se todos os campos obrigatórios foram preenchidos
      if (!itemDescricaoServico || !tempoExecucao || !valorRecomendado) {
        setErrorItemDescricaoServico(!itemDescricaoServico);
        setErrorTempoExecucao(!tempoExecucao);
        setErrorValorRecomendado(!valorRecomendado);
        return;
      }
  
      // Envia os dados para o servidor
      api.post('/salvar-descricao-item-servico', {
        itemDescricaoServico,
        tempoExecucao,
        valorRecomendado
      })
      .then((response) => {
        handleOpenModal('Sucesso', 'Dados salvos com sucesso!', 'success');
      })
      .catch((error) => {
        handleOpenModal('ERRO AO SALVAR OS DADOS ', 'Preencha os dados corretamente ou tente novamente!.', 'error');
      });
    };
  
    return (
      <>
        <Modal
          open={open}
          onClose={onClose}
          aria-labelledby="simple-modal-titulo"
          aria-describedby="simple-modal-description"
        >
          <div className="paper">
            <h2 id="simple-modal-titulo">Cadastrar Tipo de Serviço</h2>
            <form>
              <TextField
                label="Item de Descrição do Serviço"
                type="string"
                value={itemDescricaoServico}
                onChange={(e) => { setItemDescricaoServico(e.target.value); setErrorItemDescricaoServico(false); }}
                fullWidth
                required
                error={errorItemDescricaoServico}
              />
              <TextField
                label="Tempo de execução"
                type="integer"
                value={tempoExecucao}
                onChange={(e) => { setTempoExecucao(e.target.value); setErrorTempoExecucao(false); }}
                fullWidth
                required
                error={errorTempoExecucao}
              />
              <TextField
                label="Valor Recomendado R$"
                value={valorRecomendado}
                onChange={(e) => { setValorRecomendado(e.target.value); setErrorValorRecomendado(false); }}
                fullWidth
                required
                error={errorValorRecomendado}
              />
              <Button variant="contained" onClick={handleSave}>Salvar</Button>
            </form>
          </div>
        </Modal>
        
        {/* Modal Genérico */}
        <GenericModal
          open={openGenericModal}
          onClose={handleCloseModal}
          onCloseParentModal={handleCloseAllModals} 
          title={modalData.titulo}
          data={modalData.data}
          alertMessage={modalData.alerttipo}
        />
      </>
    );
  };
  
  export default SavecadastrarTipoDeServico;