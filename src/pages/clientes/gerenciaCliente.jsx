import React, { useState } from 'react';
import "./gerenciaCliente.css";
import "../../style/global.css";
import Navbar from '../../components/navbar/navbar.jsx';
import MenuLateral from '../../components/menu-lateral/menu-lateral.jsx';
import api from "../../services/api";

function GerenciaCliente() {
   
    
  const [cliente, setCliente] = useState({
    nome: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: '',
    email: '',
    telefone: ''
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        
      const response = await api.post('/salvar-cliente', cliente);
      
      console.log('Resposta do servidor:', response.data);
      // Limpar o formulário
      setCliente({
        nome: '',
        cidade: '',
        bairro: '',
        rua: '',
        numero: '',
        email: '',
        telefone: ''});

        setSuccessMessage(response.data.message);
        setModalVisible(true);
      
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };
  return (
    <div className="container-fluid">
      <Navbar />
      <div className="row">
        <div className="col-lg-3 col-md-4 bg-white s">
          <MenuLateral />
        </div>
        <div className="col-lg-9 col-md-8">
          <section className="content">
            <div className="container-fluid">
              <h2>Cadastro de Cliente</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nome" className="form-label">Nome</label>
                  <input type="text" className="form-control" id="nome" name="nome" value={cliente.nome} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="cidade" className="form-label">Cidade</label>
                  <input type="text" className="form-control" id="cidade" name="cidade" value={cliente.cidade} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="bairro" className="form-label">Bairro</label>
                  <input type="text" className="form-control" id="bairro" name="bairro" value={cliente.bairro} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="rua" className="form-label">Rua</label>
                  <input type="text" className="form-control" id="rua" name="rua" value={cliente.rua} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="numero" className="form-label">Número</label>
                  <input type="text" className="form-control" id="numero" name="numero" value={cliente.numero} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" name="email" value={cliente.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="telefone" className="form-label">Telefone</label>
                  <input type="text" className="form-control" id="telefone" name="telefone" value={cliente.telefone} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Cadastrar</button>
              </form>
            </div>
          </section>
          <div className="my-3 p-3 bg-white rounded box-shadow">
            {/* Outros componentes */}
          </div>
        </div>
      </div>

       {/* Modal de sucesso */}
       {modalVisible && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Sucesso!</h5>
                <button type="button" className="btn-close" onClick={() => setModalVisible(false)}></button>
              </div>
              <div className="modal-body">
                <p>{successMessage}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => setModalVisible(false)}>Fechar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GerenciaCliente;
