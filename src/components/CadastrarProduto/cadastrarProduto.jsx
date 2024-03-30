import React, { useState } from 'react';
import { Modal, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import api from "../../services/api.js";
import './cadastrarProduto.css';
import GenericModal from '../../utils/Modals/ModalGenerico.jsx';

const SaveCadastrarProduto = ({ open, onClose }) => {
  // Estilos estilizados para componentes do Material-UI
  const StyledFormControl = styled(FormControl)({
    margin: 'theme.spacing(1)',
    minWidth: 120,
  });

  const StyledErrorText = styled('p')({
    color: 'red',
    marginTop: 'theme.spacing(1)',
  });

  // Estados para os dados do produto e erros de validação
  const [nomeProduto, setnomeProduto] = useState('');
  const [marca, setmarca] = useState('');
  const [tipo, settipo] = useState('');
  const [volume, setVolume] = useState('');
  const [errornomeProduto, setErrornomeProduto] = useState(false);
  const [errormarca, setErrormarca] = useState(false);
  const [errortipo, setErrortipo] = useState(false);
  const [errorVolume, setErrorVolume] = useState(false);

  // Estados para controle do modal genérico
  const [openGenericModal, setOpenGenericModal] = useState(false);
  const [modalData, setModalData] = useState({
    titulo: '',
    data: '',
    alerttipo: '',
  });

  // Função para limpar e sanitizar os dados
  const sanitizeInput = (input) => input.trim();

  // Função para abrir o modal genérico
  const handleOpenModal = (titulo, data, alerttipo) => {
    setModalData({ titulo, data, alerttipo });
    setOpenGenericModal(true);
  };

  const handleCloseModal = () => {
    setOpenGenericModal(false);
    onClose(); // Chama a função para fechar o modal pai
  };

  const handleSave = () => {
    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!nomeProduto || !marca || !tipo || !volume) {
      setErrornomeProduto(!nomeProduto);
      setErrormarca(!marca);
      setErrortipo(!tipo);
      setErrorVolume(!volume);
      return;
    }

    // Sanitiza os dados antes de enviar para o servidor
    const sanitizednomeProduto = sanitizeInput(nomeProduto);
    const sanitizedmarca = sanitizeInput(marca);
    const sanitizedtipo = sanitizeInput(tipo);
    const sanitizedVolume = sanitizeInput(volume);

    // Envie os dados para o servidor usando consultas parametrizadas
    api.post('/salvar-produtos', {
      nomeProduto: sanitizednomeProduto,
      marca: sanitizedmarca,
      tipo: sanitizedtipo,
      volume: sanitizedVolume
    })
    .then((response) => {
      if (response.data.nomeProduto && response.data.message) {    
        console.log(response.data.message, response.data.nomeProduto) ; 
        handleOpenModal(response.data.message,response.data.nomeProduto,"success");                    
      }
    })
    .catch((error) => {
      handleOpenModal('Erro na requisição, tente novamente', 'FALHA GERAL', 'error');
      console.error('Erro ao salvar os dados do Produto:', error);
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
          <h2 id="simple-modal-titulo">Cadastrar Produto</h2>
          <form>
            <TextField
              label="Nome do Produto"
              type="string" 
              value={nomeProduto}
              onChange={(e) => { setnomeProduto(e.target.value); setErrornomeProduto(false); }}
              fullWidth
              required
              error={errornomeProduto}
            />
            <TextField
              label="Marca"
              type="string" 
              value={marca}
              onChange={(e) => { setmarca(e.target.value); setErrormarca(false); }}
              fullWidth
              required
              error={errormarca}
            />
            <StyledFormControl fullWidth required error={errortipo}>
              <InputLabel id="tipo-label">Tipo</InputLabel>
              <Select
                labelId="tipo-label"
                id="tipo"
                value={tipo}
                onChange={(e) => { settipo(e.target.value); setErrortipo(false); }}
                fullWidth
              >
                <MenuItem value="">Selecionar</MenuItem>
                <MenuItem value="G">G - Gramas</MenuItem>
                <MenuItem value="ML">ML - Mililitro</MenuItem>
              </Select>
            </StyledFormControl>
            <TextField
              label="Volume"
              value={volume}
              onChange={(e) => { setVolume(e.target.value); setErrorVolume(false); }}
              fullWidth
              required
              error={errorVolume}
            />
            {errornomeProduto && <StyledErrorText>Campo obrigatório</StyledErrorText>}
            {errormarca && <StyledErrorText>Campo obrigatório</StyledErrorText>}
            {errortipo && <StyledErrorText>Campo obrigatório</StyledErrorText>}
            {errorVolume && <StyledErrorText>Campo obrigatório</StyledErrorText>}
            <Button variant="contained" onClick={handleSave}>Salvar</Button>
          </form>
        </div>
      </Modal>
      
      <GenericModal
        open={openGenericModal}
        onClose={handleCloseModal}
        onCloseParentModal={onClose} 
        title={modalData.titulo}
        data={modalData.data}
        alertMessage={modalData.alerttipo}
      />
    </>
  );
};

export default SaveCadastrarProduto;
