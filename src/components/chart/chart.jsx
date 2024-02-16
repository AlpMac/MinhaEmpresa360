import React from "react";
import { Chart } from "react-google-charts";


export const options = {
    chart: {
      title: "Company Performance",
      subtitle: "Sales, Expenses, and Profit: 2014-2017",
    },
    hAxis: {
      title: "Mês", // Rótulo para o eixo X
    },
    vAxis: {
      title: "Quantidade", // Rótulo para o eixo Y
    },
  };


export const data = [
  ["Mês", "Atendimento", "Cancelamento", "Valor ganho", "Custo"],
  ["Janeiro", 40, 6, 300,40]
  
];



export function Grafico() {
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      legendToggle={true}
      options={options}
    />
  );
}

  export default Grafico;