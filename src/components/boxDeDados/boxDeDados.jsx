import React, { useState, useEffect } from "react";
import "./boxDeDados.css";
import api from "../../services/api.js";

function BoxDeDados() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [boxDeDados, setBoxDeDados] = useState([]);
  
  const [totalAtendimentos, setTotalAtendimentos] = useState(0);
  const [totalEmRealAtendidos, setTotalEmRealAtendidos] = useState(0);

  const [totalCancelamentos, setTotalCancelamentos] = useState(0);
  const [totalEmRealCancelados, setTotalEmRealCancelados] = useState(0);

  const [totalAgendado, setTotalAgendado] = useState(0);
  const [totalEmRealAgendado, setTotalEmRealAgendado] = useState(0);

  useEffect(() => {
    const currentDate = new Date();
    const endDateFormatted = currentDate.toISOString().split('T')[0];
    setEndDate(endDateFormatted);

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const startDateFormatted = firstDayOfMonth.toISOString().split('T')[0];
    setStartDate(startDateFormatted);

    window.addEventListener('load', () => {
      const startDateInput = document.getElementById('startDateInput');
      const endDateInput = document.getElementById('endDateInput');
      startDateInput.value = startDateFormatted;
      endDateInput.value = endDateFormatted;
    });

    api.get("/box-dados")
      .then((response) => {
        // Atualiza o estado com os dados recebidos do backend
        setBoxDeDados(response.data);

        // Itera sobre os dados recebidos para atualizar os estados correspondentes
        response.data.forEach((item) => {
          if (item.status_servico === 'S') {
            setTotalAtendimentos(item.total);
            setTotalEmRealAtendidos(item.total_valor_formatado);

          } else if (item.status_servico === 'C') {
            setTotalCancelamentos(item.total);
            setTotalEmRealCancelados(item.total_valor_formatado);
          } else if (item.status_servico === 'A') {
            setTotalAgendado(item.total);
            setTotalEmRealAgendado(item.total_valor_formatado);
          }
        });
      })
      .catch((err) => {
        // Trata erros caso ocorram na requisição
        console.error("Erro ao buscar os dados:", err);
        setError("Erro ao buscar os dados.");
      });
  }, []);

  const handleSearch = () => {
    const startDateInputEdit = document.getElementById('startDateInput').value;
    const endDateInputEdit = document.getElementById('endDateInput').value;

    setStartDate(startDateInputEdit);
    setEndDate(endDateInputEdit);

    if (endDateInputEdit < startDateInputEdit) {
      setError("A data final não pode ser anterior à data inicial.");
    } else {
      setError("");
      console.log("Pesquisar...");
    }
  };

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-12 mb-2">
              <div className="input-group">
                <span className="input-group-text">Data Inicial</span>
                <input id="startDateInput" type="date" className="form-control" />
              </div>
            </div>
            <div className="col-lg-4 col-12 mb-2">
              <div className="input-group">
                <span className="input-group-text">Data Final</span>
                <input id="endDateInput" type="date" className="form-control" />
              </div>
            </div>
            <div className="col-lg-2 col-12 mb-2">
              <button type="button" className="btn btn-primary" value="BUSCAR" onClick={handleSearch}>
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
          
              
                <div className="col-sm-6 mb-2">
                  <button type="button" className="btn btn-success flex-fill w-100" onClick={handleSearch}>Atendimentos realizados<h3>{totalAtendimentos}</h3></button>
                </div>
                <div className="col-sm-6 mb-2">
                  <button type="button" className="btn btn-warning flex-fill w-100">Cancelamentos realizados<h3>{totalCancelamentos}</h3></button>
                </div>
                <div className="col-sm-6 mb-2">
                  <button type="button" className="btn btn-info flex-fill w-100">Ganhos realizados<h3>{totalEmRealAtendidos}</h3></button>
                </div>
                <div className="col-sm-6 mb-2">
                  <button type="button" className="btn bg-danger flex-fill w-100">Custos de atendimentos<h3>FAZER ...</h3></button>
                </div>
                <div className="col-sm-6 mb-2">
                  <button type="button" className="btn bg-secondary flex-fill w-100">Serviços a fazer<h3>{totalAgendado}</h3></button>
                </div>
                <div className="col-sm-6 mb-2">
                  <button type="button" className="btn bg-secondary flex-fill w-100">Ganhos esperados<h3>{totalEmRealAgendado}</h3></button>
                </div>

              
           
          </div>
        </div>
      </section>

      {error && <div className="alert alert-danger">{error}</div>}
    </>
  );
}

export default BoxDeDados;
