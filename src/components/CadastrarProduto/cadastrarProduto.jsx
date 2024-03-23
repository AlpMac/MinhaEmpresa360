import { useState } from 'react';
import { Modal, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/system'; // Importe styled de @mui/system
import api from "../../services/api.js";
import './cadastrarProduto.css';

const SaveCadastrarProduto = ({ open, onClose }) => {
  const StyledFormControl = styled(FormControl)({
    margin: 'theme.spacing(1)',
    minWidth: 120,
  });

  const StyledErrorText = styled('p')({
    color: 'red',
    marginTop: 'theme.spacing(1)',
  });

  const [nomeProduto, setNomeProduto] = useState('');
  const [marca, setMarca] = useState('');
  const [tipo, setTipo] = useState('');
  const [volume, setVolume] = useState('');
  const [errorNomeProduto, setErrorNomeProduto] = useState(false);
  const [errorMarca, setErrorMarca] = useState(false);
  const [errorTipo, setErrorTipo] = useState(false);
  const [errorVolume, setErrorVolume] = useState(false);

  const handleSave = () => {
    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!nomeProduto || !marca || !tipo || !volume) {
      setErrorNomeProduto(!nomeProduto);
      setErrorMarca(!marca);
      setErrorTipo(!tipo);
      setErrorVolume(!volume);
      return; // Impede a execução da função se algum campo obrigatório não foi preenchido
    }

    // Sanitize os dados antes de enviar para o servidor
    const sanitizedNomeProduto = nomeProduto.trim();
    const sanitizedMarca = marca.trim();
    const sanitizedTipo = tipo.trim();
    const sanitizedVolume = volume.trim();

    // Envie os dados para o servidor usando consultas parametrizadas
    api.post('/salvar-produtos', {
      nomeProduto: sanitizedNomeProduto,
      marca: sanitizedMarca,
      tipo: sanitizedTipo,
      volume: sanitizedVolume
    })
    .then((response) => {
      console.log('Produtos salvos com sucesso!', response.data);
      // Feche o modal após salvar os dados
      onClose();
    })
    .catch((error) => {
      console.error('Erro ao salvar os dados do Produto:', error);
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="paper">
        <h2 id="simple-modal-title">Cadastrar Produto</h2>
        <form>
          <TextField
            label="Nome do Produto"
            type="string"
            value={nomeProduto}
            onChange={(e) => { setNomeProduto(e.target.value); setErrorNomeProduto(false); }}
            fullWidth
            required
            error={errorNomeProduto}
          />
          <TextField
            label="Marca"
            type="string"
            value={marca}
            onChange={(e) => { setMarca(e.target.value); setErrorMarca(false); }}
            fullWidth
            required
            error={errorMarca}
          />
          <StyledFormControl fullWidth required error={errorTipo}>
            <InputLabel id="tipo-label">Tipo</InputLabel>
            <Select
              labelId="tipo-label"
              id="tipo"
              value={tipo}
              onChange={(e) => { setTipo(e.target.value); setErrorTipo(false); }}
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
          {errorNomeProduto && <StyledErrorText>Campo obrigatório</StyledErrorText>}
          {errorMarca && <StyledErrorText>Campo obrigatório</StyledErrorText>}
          {errorTipo && <StyledErrorText>Campo obrigatório</StyledErrorText>}
          {errorVolume && <StyledErrorText>Campo obrigatório</StyledErrorText>}
          <Button variant="contained" onClick={handleSave}>Salvar</Button>
        </form>
      </div>
    </Modal>
  );
};

export default SaveCadastrarProduto;
