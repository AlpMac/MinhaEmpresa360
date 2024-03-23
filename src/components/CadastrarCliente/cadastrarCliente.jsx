import { useState } from 'react';
import { Modal, Button, TextField } from '@mui/material';
import api from "../../services/api.js";
import './cadastrarCliente.css';

const SaveCadastroClienteModal = ({ open, onClose }) => {
  const [nomeCliente, setNomeCliente] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [email, setEmail] = useState('');

  const handleSave = () => {
    // Envie os dados para o servidor
    api.post('/salvar-cliente', {
      nomeCliente,
        telefone,
        cidade,
        bairro,
        rua,
        numero,
        email
            })  
            .then((response) => {
                console.log('Dados salvos com sucesso!', response.data);
                // Feche o modal após salvar os dados
                onClose();
           })
            .catch((error) => {
                 console.error('Erro ao salvar os dados:', error);
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
        <h2 id="simple-modal-title">Cadastrar Cliente</h2>
        <form>
          <TextField
            label="Nome do Cliente"
            type="string"
            value={nomeCliente}
            onChange={(e) => setNomeCliente(e.target.value)}
            fullWidth
            TextField=""
          />
          <TextField
            label="Telefone"
            type="string"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            fullWidth
          />
         <TextField
            label="Cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            fullWidth
          />
          <TextField
            label="Bairro"
            type="string"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            fullWidth
          />
          <TextField
            label="Rua"
            value={rua}
            onChange={(e) => setRua(e.target.value)}
            fullWidth
          />
            <TextField
                label="Número"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                fullWidth
            />
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
            />
          <Button variant="contained" onClick={handleSave}>Salvar</Button>
        </form>
      </div>
    </Modal>
  );
};

export default SaveCadastroClienteModal;
