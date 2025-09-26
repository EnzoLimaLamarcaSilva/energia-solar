// ---------- Funções utilitárias ----------
const diasAno = 365;

// converte irradiação média diária para mensal (média) e anual
function energiaPorArea(irr_kwh_m2_dia) {
const diaria = Number(irr_kwh_m2_dia);
  const mensal = diaria * (365 / 12); // média mensal aproximada
  const anual = diaria * diasAno;
return { diaria, mensal, anual };
}

// comparação percentual entre duas irradiações (a -> b)
function percentualAumento(a, b) {
if (a === 0) return Infinity;
  return ((b - a) / a) * 100;
}

// energia gerada por 1 kWp (kW pico) por dia: assume 1 kWp * irr (kWh/m²/dia) ≈ kWh/dia
// aplicar rendimento (0-1)
function geracaoPorKwpDiaria(irr_kwh_m2_dia, rendimento = 0.75) {
  return irr_kwh_m2_dia * rendimento; // kWh/dia por kWp instalado
}

// kWp necessário para suprir um consumo mensal (kWh/mês)
function kwpNecessario(consumoMensal_kwh, irr_kwh_m2_dia, rendimento = 0.75) {
  const geracaoKwpMensal = geracaoPorKwpDiaria(irr_kwh_m2_dia, rendimento) * (365 / 12);
if (geracaoKwpMensal === 0) return Infinity;
return consumoMensal_kwh / geracaoKwpMensal;
}

// número de painéis necessários, dado kWp necessário, e potência do painel em Wp
function paineisNecessarios(kwpNecessario, painelWp) {
  const totalWp = kwpNecessario * 1000; // converter kWp -> Wp
return Math.ceil(totalWp / painelWp);
}

function round(v, dec = 2) { return Number(v.toFixed(dec)); }

// ---------- Ação do botão ----------
document.getElementById('calcular').addEventListener('click', () => {
const irr = Number(document.getElementById('irr').value) || 0;
const consumo = Number(document.getElementById('consumo').value) || 0;
const painelWp = Number(document.getElementById('painelWp').value) || 530;
const rendimento = Number(document.getElementById('rendimento').value) || 0.75;

  // exemplos para comparação (Tijucas, Sertão, Norte de MG)
const tijucas = 4.5;
const sertaoMax = 6.5;
const norteMinas = 5.5;

const e = energiaPorArea(irr);
const eTij = energiaPorArea(tijucas);
const eSert = energiaPorArea(sertaoMax);
const eNorte = energiaPorArea(norteMinas);

const pctSert_vs_Tij = percentualAumento(tijucas, sertaoMax);
const pctNorte_vs_Tij = percentualAumento(tijucas, norteMinas);

const geracaoKwpDia = geracaoPorKwpDiaria(irr, rendimento);
const kwpReq = kwpNecessario(consumo, irr, rendimento);
const numPaineis = paineisNecessarios(kwpReq, painelWp);

let out = '';
out += `Irradiação usada: ${irr} kWh/m²/dia\n\n`;
out += `Energia por m² (estimada): diária ${round(e.diaria,3)} kWh/m²/dia | mensal ≈ ${round(e.mensal,2)} kWh/m²/mês | anual ≈ ${round(e.anual,2)} kWh/m²/ano\n\n`;

out += `Comparação de referência:\n`;
out += ` - Tijucas: ${tijucas} kWh/m²/dia => anual ≈ ${round(eTij.anual,2)} kWh/m²/ano\n`;
out += ` - Sertão (ex): ${sertaoMax} kWh/m²/dia => anual ≈ ${round(eSert.anual,2)} kWh/m²/ano\n`;
out += ` - Norte de MG (ex): ${norteMinas} kWh/m²/dia => anual ≈ ${round(eNorte.anual,2)} kWh/m²/ano\n\n`;

out += `Percentual a mais vs Tijucas:\n`;
out += ` - Sertão vs Tijucas: ${round(pctSert_vs_Tij,1)}% a mais\n`;
out += ` - Norte de MG vs Tijucas: ${round(pctNorte_vs_Tij,1)}% a mais\n\n`;

out += `Estimativas para dimensionamento:\n`;
out += ` - Geração por 1 kWp (com rendimento ${rendimento*100}%): ≈ ${round(geracaoKwpDia,3)} kWh/dia por kWp\n`;
out += ` - kWp necessário para suprir ${consumo} kWh/mês: ≈ ${round(kwpReq,3)} kWp\n`;
out += ` - Com painéis de ${painelWp} Wp -> número de painéis ≈ ${numPaineis} unidades (arredondado pra cima)\n\n`;

out += `Observações:\n`;
out += ` - Rendimento inclui perdas (inversor, temperatura, sujeira, fiação). Ajuste conforme sua estimativa.\n`;
out += ` - Cálculos são aproximados; para projeto real, consulte um projetista/engenheiro para o dimensionamento final.\n`;

document.getElementById('saida').textContent = out;
console.log(out);
});

// roda uma vez com os valores iniciais
document.getElementById('calcular').click();
