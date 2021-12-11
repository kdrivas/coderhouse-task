import express  from 'express'
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'
// import routerProduct from './routes/product.js'
import DaoMessage from './dao/mensaje/index.js'
// import { mariaDbOptions, sqliteOptions } from './constants.js'
import faker from 'faker'
import { normalize, denormalize, schema } from "normalizr";

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const authorSchema = new schema.Entity('authors', {}, {
  idAttribute: 'email'
})

const messageSchema = new schema.Entity('messages', {
  author: authorSchema,
});

const conversationSchema = new schema.Entity('conversations', {
  message: messageSchema,
});

io.on('connection', async (socket) => { 
  console.log('Usuario conectado') 

  const messageList = await DaoMessage.getAll()
  const resultToNorm = {id: '10000', messageList}
  const normConv = normalize(resultToNorm, conversationSchema);

  const longO = JSON.stringify(resultToNorm).length
  const longN = JSON.stringify(normConv).length
  const porcentajeC = (longN * 100) / longO

  socket.emit('messages', JSON.parse(JSON.stringify({porcentajeC, normConv})))
  socket.on('updateMessages', async (message) => {
    await DaoMessage.add(message)
    const result = await DaoMessage.getAll()
    const resultToNorm = {id: '10000', result}
    const normConv = normalize(resultToNorm, conversationSchema);

    const longO = JSON.stringify(resultToNorm).length
    const longN = JSON.stringify(normConv).length
    const porcentajeC = (longN * 100) / longO

    io.sockets.emit('messages', JSON.parse(JSON.stringify({porcentajeC, normConv})))
  })
})

app.use('/', express.static('public'))
app.use(express.urlencoded({ extended: true }))
//app.use('/api/products', routerProduct)

app.get('/api/productos-test', async (req, res, next) => {
  const products = []
  for (let i=0; i<5; i++) {
    products.push(
      {
        id: i,
        title: faker.commerce.productName(),
        thumbnail: faker.commerce.product(),
        price: faker.commerce.price()
      }
    )
  }
  res.status(200).json({ products })
})

const port = process.env.PORT || 8080;
const server = httpServer.listen(port, () => {
  console.log(`connected to ${port}`)
})

server.on('error', error => console.log(error))