import express  from 'express'
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'
import routerProduct from './routes/product.js'
import { Product } from './containers/product.js'
import { mariaDbOptions, sqliteOptions } from './constants.js'

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const messages = []

const products = new Product(mariaDbOptions, 'product', 'mariadb')
app.set('products', products)

io.on('connection', async (socket) => { 
  console.log('Usuario conectado') 

  socket.emit('products', {'asdasd': 'asdsad'})
  socket.on('updateProducts', async (product) => {
    console.log('init', product)
    const { title, thumbnail, price } = product
    await products.addProduct(title, thumbnail, price)
    const result = await products.getAll()
    console.log(result)
    io.sockets.emit('products', result)
  })

  socket.emit('messages', messages)
  socket.on('updateMessages', message => {
    messages.push(message)
    io.sockets.emit('messages', messages)
  })
})

app.use('/', express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use('/api/products', routerProduct)

const port = process.env.PORT || 8080;
const server = httpServer.listen(port, () => {
  console.log(`connected to ${port}`)
})

server.on('error', error => console.log(error))