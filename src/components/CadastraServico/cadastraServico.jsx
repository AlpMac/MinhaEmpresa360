import React, { useState, useEffect } from 'react';
import { Modal, Button, TextField, Autocomplete } from '@mui/material';
import GenericModal from '../../utils/Modals/ModalGenerico.jsx';
import DeleteIcon from '@mui/icons-material/Delete';
import api from "../../services/api.js";
import './cadastraServico.css';

const SaveServicoModal = ({ open, onClose }) => {
  const [dataServico, setDataServico] = useState('');
  const [valor, setValor] = useState('');
  const [observacao, setObservacao] = useState('');
  const [horaMarcada, setHoraMarcada] = useState('');
  const [usuarioId, setUsuarioId] = useState('');
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [itensServico, setItensServico] = useState([]);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [tabelaItens, setTabelaItens] = useState([]);

  const [openGenericModal, setOpenGenericModal] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    data: '',
    alertType: '',
  });

  const handleOpenModal = (title, data, alertType) => {
    setModalData({ title, data, alertType });
    setOpenGenericModal(true);
    document.body.classList.add('no-scroll'); // Adiciona a classe para desabilitar a rolagem
  };

  const clearFields = () => {
    setDataServico('');
    setValor('');
    setObservacao('');
    setHoraMarcada('');
    setUsuarioId('');
    setClienteSelecionado(null);
    setItemSelecionado(null);
  };

  const handleCloseModal = () => {
    clearFields(); // Limpa os campos ao fechar o modal
    setOpenGenericModal(false);
    document.body.classList.remove('no-scroll'); // Remove a classe para habilitar a rolagem
  };

  const handleCloseAllModals = () => {
    handleCloseModal();
    onClose(); // Fecha o modal pai
  };

  const handleSave = () => {
    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!dataServico || !valor || !horaMarcada || !usuarioId) {
      handleOpenModal('Erro ao salvar', 'Preencha todos os campos obrigatórios.', 'error');
      return;
    }

    // Envia os dados para o servidor
    api.post('/salvar-servico', {
      data_servico: dataServico,
      valor: valor,
      observacao: observacao,
      cliente_id: clienteSelecionado?.id,
      hora_marcada: horaMarcada,
      usuario_id: usuarioId,
      itens_servico: tabelaItens // Adiciona os itens de serviço à requisição
    })
    .then((response) => {
      handleOpenModal('Sucesso', 'Dados salvos com sucesso!', 'success');
    })
    .catch((error) => {
      handleOpenModal('Erro ao salvar os dados', 'Verifique suas informações e tente novamente.', 'error');
    });
  };

  useEffect(() => {
    fetchClientes();
    fetchItensServico();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await api.get('/busca-cliente');
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao carregar os clientes:', error);
    }
  };

  const fetchItensServico = async () => {
    try {
      const response = await api.get('/buscar-itens-servico');
      setItensServico(response.data);
    } catch (error) {
      console.error('Erro ao carregar os itens de serviço:', error);
    }
  };

  const handleAddItem = () => {
    if (itemSelecionado) {
      const novoItem = {
        itemDescricaoServico: itemSelecionado.itemDescricaoServico,
        valorRecomendado: itemSelecionado.valorRecomendado,
        tempoExecucao: itemSelecionado.tempoExecucao
      };
  
      // Atualiza a tabela de itens com o novo item adicionado
      const novaTabelaItens = [...tabelaItens, novoItem];
      setTabelaItens(novaTabelaItens);
  
      // Limpa os campos após adicionar o item
      setItemSelecionado(null);
      setValor('');
    }
  };

  const handleRemoveItem = (indexToRemove) => {
    const novaTabelaItens = tabelaItens.filter((item, index) => index !== indexToRemove);
    setTabelaItens(novaTabelaItens);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="paperCadastraServico">
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
              getOptionLabel={(cliente) => cliente.nome+' | '+cliente.rua+', '+cliente.numero+' | '+cliente.telefone}
              value={clienteSelecionado}
              onChange={(event, newValue) => {
                setClienteSelecionado(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Buscar Cliente NOME OU TELFONE" />}
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
              required
            />

            <Autocomplete
              options={itensServico}
              getOptionLabel={(item) => item.itemDescricaoServico+' | '+item.valorRecomendado+' R$'+' | '+item.tempoExecucao+' min'}
              value={itemSelecionado}
              onChange={(event, newValue) => {
                setItemSelecionado(newValue);
              }}
              renderInput={(params2) => <TextField {...params2} label="Adicionar Item de Serviço" />}
            />
            <Button variant="contained" onClick={handleAddItem}>Adicionar Item</Button>
            
            <table className='tableItens'>
              <thead>
                <tr>
                  <th>Item de Serviço</th>
                  <th>Valor Recomendado</th>
                  <th>Tempo de Execução</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody className='tableItens'>
                {tabelaItens.map((item, index) => (
                  <tr key={index}>
                    <td>{item.itemDescricaoServico}</td>
                    <td>{item.valorRecomendado} R$</td>
                    <td>{item.tempoExecucao} Min</td>
                    <td>
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleRemoveItem(index)}
                      >
                        Remover
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Button variant="contained" onClick={handleSave}>Salvar</Button>
          </form>
        </div>
      </Modal>
      
      {/* Modal Genérico */}
      <GenericModal
        open={openGenericModal}
        onClose={handleCloseModal}
        onCloseParentModal={handleCloseAllModals}
        title={modalData.title}
        data={modalData.data}
        alertMessage={modalData.alertType}
      />
    </>
  );
};

export default SaveServicoModal;
