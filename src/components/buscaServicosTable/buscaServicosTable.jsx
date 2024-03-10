import React, { useState, useEffect } from 'react';
import api from "../../services/api.js";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';

const EditableTableModal = ({ pesquisa }) => {
    const [servicoDados, setServicoDados] = useState([]);
    const [open, setOpen] = useState(false);

    
    useEffect(() => {
        if (pesquisa === "S") {
            api.get(`/busca-atendimento-realizado`)
                .then((response) => {
                    setServicoDados(response.data);
                })
                .catch((err) => {
                    console.error("Erro ao buscar os dados:", err);
                });
        } else if (pesquisa === "A") {
            api.get(`/`)
                .then((response) => {
                    setServicoDados(response.data);
                })
                .catch((err) => {
                    console.error("Erro ao buscar outros dados:", err);
                });
        } else if (pesquisa === "C") {
            // Lógica para outro valor de pesquisa
            api.get(`/busca-cancelamento-realizado`)
            .then((response) => {
                setServicoDados(response.data);
            })
            .catch((err) => {
                console.error("Erro ao buscar outros dados:", err);
            });

        }
    }, [pesquisa]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const rows = servicoDados.map(item => ({
        id: item.id_servico,
        Nome: item.nome_cliente,
        Data: item.data_servico,
        Valor: item.valor,
        Endereco: item.rua+", "+item.numero+", "+item.cidade
    }));

    const columns = [
        { field: 'Nome', headerName: 'Nome', width: 200 },
        { field: 'Data', headerName: 'Data', width: 150 },
        { field: 'Valor', headerName: 'Valor', width: 150 },
        { field: 'Endereco', headerName: 'Endereço', width: 200 }
    ];

    return (
        <div className="w-100 "> {/* Adiciona a classe w-100 para ocupar todo o espaço disponível */}
            <Button 
                variant="contained" 
                onClick={handleOpen} 
                className="w-100 btn-success" 
                style={{ borderRadius: '0px' }} // Adiciona o estilo de border-radius
            >
                Visualizar Dados
            </Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', maxWidth: 600, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <h2>Dados do Serviço</h2>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                    </div>


                    <Button variant="contained" onClick={handleClose}>Fechar</Button>
                </Box>
            </Modal>
        </div>
    );
};

export default EditableTableModal;
