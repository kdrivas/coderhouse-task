import express  from 'express'
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'
import routerProduct from './routes/product.js'
import DB from './containers/db.js'
import { mariaDbOptions, sqliteOptions } from './constants.js'

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const products = new DB(mariaDbOptions, 'product', 'mariadb')
app.set('products', products)

const messages = new DB(sqliteOptions, 'message', 'sqlite')
app.set('messages', messages)

io.on('connection', async (socket) => { 
  console.log('Usuario conectado') 

  const productList = await products.getRecords()
  socket.emit('products', JSON.parse(JSON.stringify(productList)))
  socket.on('updateProducts', async (product) => {
    await products.insertRecord(product)
    const result = await products.getRecords()
    io.sockets.emit('products', JSON.parse(JSON.stringify(result)))
  })

  const messageList = await messages.getRecords()
  socket.emit('messages', JSON.parse(JSON.stringify(messageList)))
  socket.on('updateMessages', async (message) => {
    await messages.insertRecord(message)
    const result = await messages.getRecords()
    io.sockets.emit('messages', JSON.parse(JSON.stringify(result)))
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