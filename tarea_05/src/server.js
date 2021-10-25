const exphbs = require('express-handlebars');
const express = require('express')

const app = express()

const { routerProductos } = require('routes')

app.engine('hbs', exphbs({
  extname: 'hbs',
  defaultLayout: 'index.hbs'
}))

app.set('views', './views')

app.use(express.urlencoded({extended: true}))
app.use('/api/productos', routerProductos)

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`connected to ${PORT}`)
})

server.on('error', error => console.log(error))