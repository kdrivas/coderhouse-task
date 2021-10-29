const express = require('express')

const app = express()

const routerProductos = require('./routes.js')

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use('/api/productos', routerProductos)

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`connected to ${port}`)
})

server.on('error', error => console.log(error))