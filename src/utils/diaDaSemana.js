function obterNomeDiaSemana(data) {
    const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const partesData = data.split('/');
    const dataFormatada = new Date(partesData[2], partesData[1] - 1, partesData[0]); // Ano, Mês (subtraído 1 pois os meses começam de 0), Dia
    const numeroDiaSemana = dataFormatada.getDay(); // Retorna o número do dia da semana (0 - Domingo, 1 - Segunda-feira, ..., 6 - Sábado)
    return diasSemana[numeroDiaSemana];
  }

  export default obterNomeDiaSemana;