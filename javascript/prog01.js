//E=H*A*N

//EG = Quantidade de placas necessárias

//AM = Valor gerado por mês

//ES = Gasto enegético


let resposta = document.getElementById('resposta')

function principal(){
  let ES = Number(document.getElementById('ES').value)
  let AM = Number(document.getElementById('AM').value)



    let EG =  AM / ES  

    console.log(`A quantidade de placas necessárias é: ${EG.toFixed(0)} `)
  

    resposta.innerHTML = ``
    resposta.innerHTML += `A quantidade de placas necessárias é: ${EG.toFixed(0)}  <br>`
    
}