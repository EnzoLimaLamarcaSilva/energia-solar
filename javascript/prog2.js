let resposta = document.getElementById('resposta')

function calcularEconomia(economiaKWh,precoKWh){
return economiaKWh * precoKWh
}

function calcularConsumo(consumoAntigo,consumoAtual){
return consumoAntigo - consumoAtual
}
function principal(){
    let consumoAntigo = Number(document.getElementById('consumoAntigo').value) 
    let consumoAtual =  Number(document.getElementById('consumoAtual').value) 
    let precoKWh =  Number(document.getElementById('precoKWh').value) 

    let economiaKWh = calcularConsumo(consumoAntigo,consumoAtual)
    let economiaReais = calcularEconomia(economiaKWh,precoKWh)

console.log(`Economia de energia: ${economiaKWh} KW/h`);
console.log(`Economia de dinheiro: R$ ${economiaReais.toFixed(2)}`)

resposta.innerHTML = ``
resposta.innerHTML += `Economia de energia: ${economiaKWh} KW/h <br>`
resposta.innerHTML += `Economia de dinheiro: R$ ${economiaReais.toFixed(2)} <br>`
}
