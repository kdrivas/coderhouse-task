import { Router } from "express";
//import { fork } from 'child_process'

const randomRouter = Router()

const calculo = (msj) => {
  let d = {}
  for (let i = 0; i < msj; i++) {
      let n = Math.floor(Math.random() * 1000) + 1
      if (n in d)
        d[n] += 1
      else
        d[n] = 0
  }
  return d
}

randomRouter.get('/randoms', (req, res, next) => {
  const {number} = req.query
  /*
  const forked = fork('src/routers/computo.js')
  forked.on('message', (msj) => {
      if (msj.isReady) {
        forked.send(number ?? 100000000)
      } else {
        console.log('results')
        res.json({'results': msj.result})
      }
  })
  */
  const n = calculo(number ?? 100000000)
  res.json({'results': n})
})

export default randomRouter;