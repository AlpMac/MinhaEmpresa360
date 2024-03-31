import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import api from "../../services/api.js";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function TabelaClientes() {
  const [termoBusca, setTermoBusca] = useState('');
  const [pagina, setPagina] = useState(1);
  const [informacao, setInformacao] = useState('Dados dos Clientes');
  const registrosPorPagina = 4;
  const [filteredRows, setFilteredRows] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function fetchClientes() {
      try {
        const response = await api.get(`/busca-atendimento-realizado`);
        setRows(response.data);
        setFilteredRows(response.data); // Inicialmente, todas as linhas são mostradas
      } catch (err) {
        console.error("Erro ao buscar os dados:", err);
      }
    }

    fetchClientes();
  }, []);

  const handleChangeBusca = (event) => {
    setTermoBusca(event.target.value);
    filterRows(event.target.value); // Filtro automático ao digitar
  };

  const handleChangePagina = (event, value) => {
    setPagina(value);
  };

  const filterRows = (searchTerm) => {
    const filtered = rows.filter(
      (row) =>
        row.nome_cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.rua.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.telefone.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRows(filtered);
    setPagina(1);
  };

  const filtrarDadosUmAno = () => {
    const today = new Date();
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    const filtered = rows.filter((row) => new Date(row.data_servico) < oneYearAgo);
    setFilteredRows(filtered);
    setPagina(1);
    setInformacao('Serviços realizados a + de 1 ano');
  };

  const filtrarDadosSeisMeses = () => {
    const today = new Date();
    const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate());
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    const filtered = rows.filter((row) => new Date(row.data_servico) < sixMonthsAgo && new Date(row.data_servico) > oneYearAgo);
    setFilteredRows(filtered);
    setPagina(1);
    setInformacao('Serviço realizado entre 6 meses e 1 ano');
  };

  const removerFiltros = () => {
    setFilteredRows(rows);
    setPagina(1);
    setInformacao('Dados dos clientes');
  };

  const indiceInicio = (pagina - 1) * registrosPorPagina;
  const indiceFim = indiceInicio + registrosPorPagina;
  const registrosPaginados = filteredRows.slice(indiceInicio, indiceFim);

  return (
    <div>
      <TableContainer component={Paper}>
        <TextField
          id="busca"
          label="Buscar Nome, Endereço ou Contato"
          value={termoBusca}
          onChange={handleChangeBusca}
          sx={{
            mx: 'auto',
            my: 2,
            display: 'flex',
            width: '80%',
            backgroundColor: '#ffffff'
          }}
        />
        <div style={{ textAlign: 'center' }} id="informacao"><strong>{informacao}</strong></div>
        <Table aria-label="tabela expansível">
          <TableHead>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell align="right">Endereço</TableCell>
              <TableCell align="right">Contato</TableCell>
              <TableCell align="right">Último Serviço</TableCell>
              <TableCell align="right">Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registrosPaginados.map((row) => (
              <TableRow key={row.nome_cliente}>
                <TableCell>{row.nome_cliente}</TableCell>
                <TableCell align="right">{row.rua}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="whatsapp"
                    onClick={() => {
                      window.location.href = `http://wa.me/+55${row.telefone}`;
                    }}
                  >
                    <WhatsAppIcon />
                  </IconButton>
                  {/*{row.telefone}*/}
                </TableCell>
                <TableCell align="right">{row.data_servico}</TableCell>
                <TableCell align="right">{row.valor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} sx={{ justifyContent: 'center', mt: 2 }}>
        <Button variant="contained" onClick={filtrarDadosUmAno}>+1 ano</Button>
        <Button variant="contained" onClick={filtrarDadosSeisMeses}>+6 meses</Button>
        <Button variant="contained" onClick={removerFiltros}>Retirar Filtros</Button>
        <Pagination
          count={Math.ceil(filteredRows.length / registrosPorPagina)}
          page={pagina}
          onChange={handleChangePagina}
          color="primary"
        />
      </Stack>
    </div>
  );
}
