import React, { useState, useEffect } from 'react';
import { Modal, Button, TextField, Autocomplete, Divider } from '@mui/material';
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
  const [valorItensServico, setValorItensServico] = useState('');
  const [valorTotalServico, setValorTotalServico] = useState(0);
  const [valorCobradoValido, setValorCobradoValido] = useState(false);

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
    setTabelaItens([]);
    setValorItensServico('');
    setValorTotalServico(0);
    setValorCobradoValido(false);
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
    if (!dataServico || !valorTotalServico || !horaMarcada || !usuarioId) {
      console.log(dataServico, valorTotalServico, horaMarcada, usuarioId);
      handleOpenModal('Erro ao salvar', 'Preencha todos os campos obrigatórios.', 'error');
      return;
    }

    // Monta o array de itens de serviço a partir da tabela de itens
  const itensServicoData = tabelaItens.map(item => ({
    codigoItemContratado: item.codigoItemContratado,
    itemDescricaoServico: item.itemDescricaoServico,
    valorRecomendado: item.valorRecomendado,
    tempoExecucao: item.tempoExecucao,
    valorCobrado: item.valorCobrado
  }));

console.log(itensServicoData);

    // Envia os dados para o servidor
    api.post('/salvar-servico', {
      data_servico: dataServico,
      valor: valorTotalServico,
      observacao: observacao,
      cliente_id: clienteSelecionado?.id,
      hora_marcada: horaMarcada,
      usuario_id: usuarioId,
      itens_servico: itensServicoData // Adiciona os itens de serviço à requisição
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

  useEffect(() => {
    // Calcula o valor total do serviço ao atualizar a tabela de itens
    const total = tabelaItens.reduce((acc, item) => acc + Number(item.valorCobrado), 0);
    setValorTotalServico(total);
  }, [tabelaItens]);

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
    if (itemSelecionado && valorItensServico !== '') {
      const novoItem = {
        codigoItemContratado: itemSelecionado.id_tipo,
        itemDescricaoServico: itemSelecionado.itemDescricaoServico,
        valorRecomendado: itemSelecionado.valorRecomendado,
        tempoExecucao: itemSelecionado.tempoExecucao,
        valorCobrado: valorItensServico
      };
      
    // Atualiza a tabela de itens com o novo item adicionado
    setTabelaItens(prevState => [...prevState, novoItem]); // Use a função de atualização para garantir que a atualização seja imediata

    // Coloca o console.log imediatamente após a atualização do estado
    console.log(tabelaItens);

    // Limpa os campos após adicionar o item
    setItemSelecionado(null);
    setValorItensServico('');
  } else {
    handleOpenModal('Erro ao adicionar item', 'Preencha o campo "Valor Cobrado" para adicionar o item.', 'error');
  }
};

  const handleRemoveItem = (indexToRemove) => {
    const novaTabelaItens = tabelaItens.filter((item, index) => index !== indexToRemove);
    setTabelaItens(novaTabelaItens);
  };

  const handleValorCobradoChange = (value) => {
    setValorItensServico(value);
    setValorCobradoValido(value !== '');
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
            <br></br>
            <Divider />
            <div className='divider'>
              Itens Do Serviço
              </div>
            
            <Autocomplete
              options={itensServico}
              getOptionLabel={(item) => item.id_tipo +' - '+ item.itemDescricaoServico+' | '+item.valorRecomendado+' R$'+' | '+item.tempoExecucao+' min'}
              value={itemSelecionado}
              onChange={(event, newValue) => {
                setItemSelecionado(newValue);
              }}
              renderInput={(params2) => <TextField {...params2} label="Adicionar Item de Serviço" />}
            />

            <TextField
              label="Valor Cobrado"
              value={valorItensServico}
              onChange={(e) => handleValorCobradoChange(e.target.value)}
              fullWidth
              required
            />
           
            <Button variant="contained" onClick={handleAddItem} disabled={!valorCobradoValido}>Adicionar Item</Button>
            <TextField
              label="Valor Total do Serviço"
              type="number"
              value={valorTotalServico}
              fullWidth
              disabled
            />
            
          


            <table className='tableItens'>
              <thead>
                <tr>
                  <th>Item de Serviço</th>
                  <th>Valor Recomendado</th>
                  <th>Valor Cobrado</th>
                  <th>Tempo de Execução</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody className='tableItens'>
                {tabelaItens.map((item, index) => (
                  <tr key={index}>
                    <td>{item.itemDescricaoServico}</td>
                    <td>{item.valorRecomendado} R$</td>
                    <td>{item.valorCobrado} R$</td>
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
