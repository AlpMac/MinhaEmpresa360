import React, { useState } from 'react';
import api from "../../services/api";
import "./login.css";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
      try {
          const response = await api.post('/Verifica-Login', { email, senha });
          
          const { token,userId } = response.data;
          
          // Salvar o token onde necessário (por exemplo, localStorage)
           // Salvar o token no localStorage
           console.log(response.data);
          localStorage.setItem('token', token);
          localStorage.setItem('id', userId);
          
          //salvar token no banco de dados
          const response_token = await api.post('/salvar-token', { userId, token });
          if (response_token.status === 201) {
              console.log("Token salvo com sucesso!");
          }
 


          // Redirecionar para a página de clientes
          window.location.href = '/Home';
      } catch (error) {
           if (error.response.status === 401) {
              alert("Senha inválida. Por favor, verifique suas credenciais.");}
      }
  };
    return (
      <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong">
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Minha Empresa 360</h3>

                <div className="mb-4">
                  <div className="form-outline">
                      <input type="email" id="typeEmailX-2" placeholder="Email"
                      value={email} onChange={(e) => setEmail(e.target.value)}
                      className="form-control form-control-lg" />
                   
                      <label className="form-label" htmlFor="typeEmailX-2">Email</label>                   
                   
                  </div>
                </div>

                <div className="mb-4">
                  <div className="form-outline">
                      <input type="password" id="typePasswordX-2" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)}
                      className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="typePasswordX-2">Senha</label>
                  </div>
                </div>


                <button className="btn btn-primary btn-lg btn-block" onClick={handleLogin} type="submit">Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>        
    );
};

export default LoginForm;
