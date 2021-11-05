const exphbs = require('express-handlebars');
const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const products = []
const messages = []

io.on('connection', (socket) => { 
  console.log('Usuario conectado') 

  socketStored = socket

  // Registrando socket para usarlo en routes
  app.set('socketio', socket)
  
  socket.emit('products', products)
  socket.on('updateProducts', product => {
    products.push(product)
    io.sockets.emit('products', products)
  })

  socket.emit('messages', messages)
  socket.on('updateMessages', message => {
    messages.push(message)
    io.sockets.emit('messages', messages)
  })
})

const routerProductos = require('./routes.js')

app.use('/', express.static('public'))
app.engine('hbs', exphbs({
  extname: 'hbs',
  defaultLayout: 'index.hbs',
}))
app.set('views', './public/views')

app.use(express.urlencoded({ extended: true }))
app.use('/api/productos', routerProductos)

const port = process.env.PORT || 8080;
const server = httpServer.listen(port, () => {
  console.log(`connected to ${port}`)
})

server.on('error', error => console.log(error))