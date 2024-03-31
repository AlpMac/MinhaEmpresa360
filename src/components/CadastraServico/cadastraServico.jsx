import React, { useState, useEffect } from 'react';
import { Modal, Button, TextField, Autocomplete } from '@mui/material'; // Importe Autocomplete de '@mui/material'
import api from "../../services/api.js";
import './cadastraServico.css';

const SaveServicoModal = ({ open, onClose }) => {
  const [dataServico, setDataServico] = useState('');
  const [valor, setValor] = useState('');
  const [observacao, setObservacao] = useState('');
  const [horaMarcada, setHoraMarcada] = useState('');
  const [usuarioId, setUsuarioId] = useState('');
  const [clientes, setClientes] = useState([]); // Estado para armazenar a lista de clientes
  const [clienteSelecionado, setClienteSelecionado] = useState(null); // Estado para armazenar o cliente selecionado

  useEffect(() => {
    // Carregue a lista de clientes ao montar o componente
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await api.get('/busca-cliente'); // Supondo que "/clientes" seja o endpoint para obter a lista de clientes
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao carregar os clientes:', error);
    }
  };

  const handleSave = () => {
    
    // Envie os dados para o servidor
    api.post('/salvar-servico', {
    
      data_servico: dataServico,
      valor: valor,
      observacao: observacao,
      cliente_id: clienteSelecionado?.id, // Use o ID do cliente selecionado
      hora_marcada: horaMarcada,
      usuario_id: usuarioId
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
        <h2 id="simple-modal-title">Cadastrar serviço</h2>
        <form>
          <TextField
            label="Data do Serviço"
            type="date"
            value={dataServico}
            onChange={(e) => setDataServico(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Valor"
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Observação"
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            fullWidth
          />
          <Autocomplete
            options={clientes}
            getOptionLabel={(cliente) => cliente.nome+' | '+cliente.rua+', '+cliente.numero+' | '+cliente.telefone} // Supondo que o objeto cliente tenha uma propriedade "nome"
            value={clienteSelecionado}
            onChange={(event, newValue) => {
              setClienteSelecionado(newValue);
              console.log(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Buscar Cliente" />}
          />
          <TextField
            label="Hora Marcada"
            type="time"
            value={horaMarcada}
            onChange={(e) => setHoraMarcada(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Funcionário que realizou o serviço"
            value={usuarioId}
            onChange={(e) => setUsuarioId(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={handleSave}>Salvar</Button>
        </form>
      </div>
    </Modal>
  );
};

export default SaveServicoModal;
