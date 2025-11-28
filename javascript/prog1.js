function calcularEconomia(economiaKWh,precoKWh){
return economiaKWh * precoKWh
}

function calcularConsumo(consumoAntigo,consumoAtual){
return consumoAntigo - consumoAtual
}
function principal(){
    // Fatores necessários
    let consumoAntigo = 250;   // em kWh
    let consumoAtual = 150;    // em kWh
    let precoKWh = 0.75;       // em reais

    let economiaKWh = calcularConsumo(consumoAntigo,consumoAtual)
    let economiaReais = calcularEconomia(economiaKWh,precoKWh)

// Exibição do resultado
console.log(`Economia de energia: ${economiaKWh} KW/h`);
console.log(`Economia de dinheiro: R$ ${economiaReais.toFixed(2)}`)
}
principal()