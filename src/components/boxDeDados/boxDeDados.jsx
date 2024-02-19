import React, { useState, useEffect } from "react";
import "./boxDeDados.css";

function BoxDeDados() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Obter a data atual
    const currentDate = new Date();
    // Definir a data final como a data atual
    const endDateFormatted = currentDate.toISOString().split('T')[0];
    setEndDate(endDateFormatted);

    // Calcular o primeiro dia do mês atual
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    // Definir a data inicial como o primeiro dia do mês atual
    const startDateFormatted = firstDayOfMonth.toISOString().split('T')[0];
    setStartDate(startDateFormatted);

    // Adicionar event listener para recarregar as datas quando a página for recarregada
    window.addEventListener('load', () => {
      const startDateInput = document.getElementById('startDateInput');
      const endDateInput = document.getElementById('endDateInput');
      startDateInput.value = startDateFormatted;
      endDateInput.value = endDateFormatted;
      setStartDate(startDateFormatted);
      setEndDate(endDateFormatted);
    });
  }, []);

  const handleSearch = () => {
    // Lógica para realizar a pesquisa
    // ...
    // Obtém os valores dos campos de entrada de data
    const startDateInputEdit = document.getElementById('startDateInput').value;
    const endDateInputEdit = document.getElementById('endDateInput').value;
    
    // Define os estados com os novos valores
    setStartDate(startDateInputEdit);
    setEndDate(endDateInputEdit);

    console.log(startDateInputEdit, endDateInputEdit);

    if (endDateInputEdit < startDateInputEdit) {
      setError("A data final não pode ser anterior à data inicial.");
    } else {
      setError(null);     // Lógica de pesquisa
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
                <input id="startDateInput" type="date" className="form-control"  />
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
                <i className="bi bi-search">{'Pesquisar'}</i>
              </button>
            </div>
            <div className="col-lg-12 col-12 d-flex flex-wrap mt-1">
              <div className="col-sm-6 mb-2">
                <button type="button" className="btn btn-success flex-fill w-100" onClick={handleSearch}>Atendimentos realizados<h3>10</h3></button>
              </div>
              <div className="col-sm-6 mb-2">
                <button type="button" className="btn btn-warning flex-fill w-100">Cancelamentos realizados<h3>10</h3></button>
              </div>
              <div className="col-sm-6 mb-2">
                <button type="button" className="btn btn-info flex-fill w-100">Ganhos realizados<h3>10 R$</h3></button>
              </div>
              <div className="col-sm-6 mb-2">
                <button type="button" className="btn bg-danger flex-fill w-100">Custos de atendimentos<h3>10 R$</h3></button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {error && <div className="alert alert-danger">{error}</div>}
    </>
  );
}

export default BoxDeDados;
