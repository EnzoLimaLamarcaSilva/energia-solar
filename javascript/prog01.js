//E=H*A*N

//EG = energia gerada por dia (kWh/dia)

//IS = irradiação solar (kWh/m²/dia)

//AM = área total dos módulos (m²)

//ES = eficiência global do sistema (decimal, ex: 0,18 = 18%)


let resposta = document.getElementById('resposta')

function principal(){
  let ES = Number(document.getElementById('ES').value)
  let AM = Number(document.getElementById('AM').value)



    let EG =  AM / ES  

    console.log(`A quantidade de placas necessárias é: ${EG.toFixed(0)} `)
  

    resposta.innerHTML = ``
    resposta.innerHTML += `A quantidade de placas necessárias é: ${EG.toFixed(0)}  <br>`
    
}