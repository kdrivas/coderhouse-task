const calculo = () => {
  let d = {}
  for (let i = 0; i < 1000; i++) {
      if (i in d)
        d[i] += 1
      else
        d[i] = 0
  }
  return d
}



// process.on('message', msg => {
//   console.log(`worker #${process.pid} iniciando su tarea`)
//   const d = 
//   process.send(d)
//   console.log(`worker #${process.pid} finalizó su trabajo`)
//   process.exit()
// })

process.on('mensaje', (msj) => {
  // hacer el calculo
  onsole.log(`worker #${process.pid} iniciando su tarea`)
  const result = calculo()
  console.log(`worker #${process.pid} finalizó su trabajo`)
  return { result }
})

process.send({ isReady: true })

process.on('exit', () => {
  console.log(`worker #${process.pid} cerrado`)
})