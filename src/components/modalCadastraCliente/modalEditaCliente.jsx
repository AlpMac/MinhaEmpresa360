import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function createData(name, endereco, contato, lastService, valor, price) {
  return {
    name,
    endereco,
    contato,
    lastService,
    valor,
    price,
    history: [
      {
        date: '2020-01-05',
        typeService: '11091700',
        amount: 3,
        serviceValor: 3.99,
      },
      {
        date: '2020-01-02',
        typeService: 'Anonymous',
        amount: 1,
        serviceValor: 99.99,

      },
    ],
  };
}

const CustomWhatsAppIcon = () => (
  <IconButton
    aria-label="whatsapp"
    onClick={() => {
      window.location.href = 'http://wa.me/5553981578125';
    }}
  >
    <WhatsAppIcon />
  </IconButton>
);

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.endereco}</TableCell>
        <TableCell align="right">{row.contato}</TableCell>
        <TableCell align="right">{row.lastService}</TableCell>
        <TableCell align="right">{row.valor}</TableCell>
        <TableCell align="right">{row.price}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Data Serviço</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell align="right">Quantidade</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.typeService}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * historyRow.serviceValor * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData('Frozen yoghurt', 159, CustomWhatsAppIcon(), '2023-03-11', 3.99),
  createData('Ice cream sandwich', 237, CustomWhatsAppIcon(),'2023-07-11', 5 ),
  createData('Eclair', 262, CustomWhatsAppIcon(), '2022-03-22', 3.79 ),
  createData('Cupcake', 305, CustomWhatsAppIcon(), '2024-03-22', 2.5),
  createData('Gingerbread', 356, CustomWhatsAppIcon(), '2022-03-22', 1.5),
];

export default function CollapsibleTable() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [filteredRows, setFilteredRows] = React.useState(rows);
  const [information, setInformation] = React.useState('Dados dos Clientes');
  const rowsPerPage = 4;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleAddOneYear = () => {
    const today = new Date();
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    const filtered = rows.filter((row) => new Date(row.lastService) < oneYearAgo);
    setFilteredRows(filtered);
    setPage(1);
    setInformation('Serviços realizados a + de 1 ano');
  };

  const handleAddSixMonths = () => {
    const today = new Date();
    const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate());
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    const filtered = rows.filter((row) => new Date(row.lastService) < sixMonthsAgo && new Date(row.lastService) > oneYearAgo );
    setFilteredRows(filtered);
    setPage(1);
    setInformation('Serviço realizado entre 6 meses e 1 ano');
  };

  const handleRemoveFilters = () => {
    setFilteredRows(rows);
    setPage(1);
    setInformation('Dados dos clienetes');
  };

  const filteredPaginatedRows = filteredRows.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = filteredPaginatedRows.slice(startIndex, endIndex);

  return (
    <div>
      <TableContainer component={Paper}>
        <TextField
          id="search"
          label="Buscar Nome"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            mx: 'auto',
            my: 2,
            display: 'flex',
            width: '80%',
            backgroundColor: '#ffffff'
          }}
        />
        <div style={{ textAlign: 'center' }} id="informacao"><strong>{information}</strong></div>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Cliente</TableCell>
              <TableCell align="right">Endereço</TableCell>
              <TableCell align="right">Contato</TableCell>
              <TableCell align="right">Ultimo Serviço</TableCell>
              <TableCell align="right">Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} sx={{ justifyContent: 'center', mt: 2 }}>
        <Button variant="contained" onClick={handleAddOneYear}>+1 ano</Button>
        <Button variant="contained" onClick={handleAddSixMonths}>+6 meses</Button>
        <Button variant="contained" onClick={handleRemoveFilters}>Retirar Filtros</Button>
        <Pagination
          count={Math.ceil(filteredPaginatedRows.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    </div>
  );
}