import { useState } from 'react';
import { Modal, Button, TextField } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '80%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

const SaveDataModal = ({ open, onClose }) => {
  const classes = useStyles();
  const [dataServico, setDataServico] = useState('');
  const [valor, setValor] = useState('');
  const [observacao, setObservacao] = useState('');
  const [clienteId, setClienteId] = useState('');
  const [horaMarcada, setHoraMarcada] = useState('');
  const [usuarioId, setUsuarioId] = useState('');

  const handleSave = () => {
    // Envie os dados para o servidor
    api.post('/salvar-dados', {
      data_servico: dataServico,
      valor: valor,
      observacao: observacao,
      cliente_id: clienteId,
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
      <div className={classes.paper}>
        <h2 id="simple-modal-title">Salvar Dados</h2>
        <form>
          <TextField
            label="Data do Serviço"
            type="date"
            value={dataServico}
            onChange={(e) => setDataServico(e.target.value)}
            fullWidth
          />
          <TextField
            label="Valor"
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            fullWidth
          />
          <TextField
            label="Observação"
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            fullWidth
          />
          <TextField
            label="ID do Cliente"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            fullWidth
          />
          <TextField
            label="Hora Marcada"
            type="time"
            value={horaMarcada}
            onChange={(e) => setHoraMarcada(e.target.value)}
            fullWidth
          />
          <TextField
            label="ID do Usuário"
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

export default SaveDataModal;
