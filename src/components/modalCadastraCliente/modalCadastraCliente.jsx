import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const ModalCadastraCliente = ({ open, handleClose }) => {
  const [clienteData, setClienteData] = useState({
    nome: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    whatsapp: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setClienteData({ ...clienteData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(clienteData);
    setClienteData({
      nome: '',
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      whatsapp: '',
    });
    handleClose(); // Fechar o modal após o envio
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome"
                name="nome"
                value={clienteData.nome}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Rua"
                name="rua"
                value={clienteData.rua}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Número"
                name="numero"
                value={clienteData.numero}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bairro"
                name="bairro"
                value={clienteData.bairro}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Cidade"
                name="cidade"
                value={clienteData.cidade}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="WhatsApp"
                name="whatsapp"
                value={clienteData.whatsapp}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Enviar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalCadastraCliente;
