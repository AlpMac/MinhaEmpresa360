import React from "react";
import "./boxDeDados.css";

function BoxDeDados() {
  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-12 d-flex flex-wrap">
              <div className="col-sm-6 mb-2">
                <button type="button" className="btn btn-success flex-fill w-100">Atendimentos realizados<h3>10</h3></button>
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
    </>
  );
}

export default BoxDeDados;
