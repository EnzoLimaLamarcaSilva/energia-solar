function principal() {
  // pega elementos
  const inGerada = document.getElementById("energiaGerada");
  const inConsumida = document.getElementById("energiaConsumida");
  const inPreco = document.getElementById("precoKwh");
  const out = document.getElementById("resposta");

  // se algum elemento não existir, avisa no console e para
  if (!inGerada || !inConsumida || !inPreco || !out) {
      console.error("Um ou mais elementos não foram encontrados. Verifique os IDs no HTML.");
      return;
  }

  // normaliza vírgula para ponto e converte para número
  const energiaGerada = parseFloat(inGerada.value.replace(',', '.'));
  const energiaConsumida = parseFloat(inConsumida.value.replace(',', '.'));
  const precoKwh = parseFloat(inPreco.value.replace(',', '.'));

  // validação
  if (isNaN(energiaGerada) || isNaN(energiaConsumida) || isNaN(precoKwh)) {
      out.innerHTML = "Por favor, preencha todos os campos com números válidos (use ponto ou vírgula).";
      return;
  }
  if (energiaGerada < 0 || energiaConsumida < 0 || precoKwh < 0) {
      out.innerHTML = "Valores não podem ser negativos.";
      return;
  }

  // cálculos
  const excedente = energiaGerada - energiaConsumida;
  const economia = excedente * precoKwh;

  // formatação em R$
  const formatarBRL = v => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

  // saída
  if (economia > 0) {
      out.innerHTML = `
          Você economizou <b>${formatarBRL(economia)}</b> neste mês!<br>
          (Gerou ${excedente.toFixed(1)} kWh a mais do que consumiu)
      `;
  } else if (economia < 0) {
      out.innerHTML = `
          Você teve um custo adicional de <b>${formatarBRL(Math.abs(economia))}</b> neste mês.<br>
          (Consumiu ${Math.abs(excedente).toFixed(1)} kWh a mais do que gerou)
      `;
  } else {
      out.innerHTML = `Sua geração e consumo se equilibraram. Nenhuma economia neste mês.`;
  }
}
