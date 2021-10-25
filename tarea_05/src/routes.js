const { Router } = require('express')
const Container = require('./container');
const routerProduct = Router()

const container = new Container()

routerProduct.get('/', (req, res) => {
  const allProducts = container.getAll()
  res.render('products.hbs')
})

routerProduct.post('/', async (req, res, next) => {
  const { title, thumbnail, price } = req.body
  if (title === undefined || thumbnail === undefined || price === undefined){
    return next('Insufficient data')
  }
  else {
    const product = await container.addProduct(title, thumbnail, price)
    send.status(200).json({'message': `New product added with id ${product['id']}`, product})
  }
})

routerProduct.get('/:id', async (req, res, err) => {
  const id = parseInt(req.params.id)
  const product = await container.getProduct(id)
  if (product) {
    res.status(200).json({'message': 'Product found', product })
  }
  else {
    err('Product not Found');
  }
})

routerProduct.put('/:id', async (req, res, err) => {
  const id = parseInt(req.params.id)
  const { title, thumbnail, price } = req.params
  const newProduct = await container.modifyProduct(id, title, thumbnail, price)
  if (newProduct) {
    res.status(200).json({'message': `Item modified with index ${newProduct['id']}`, newProduct})
  }
  else {
    err('Product not Found');
  }
})

routerProduct.delete('/:id', async(req, res, err) => {
  const id = parseInt(req.params.id)
  const status = await container.removeProduct(id)
  if (status) {
    res.status(200).json({'message': 'Product removed'})
  }
  else {
    err('Product not Found');
  }
})

routerProduct.use((error, req, res, next) => {
  res.status(500).json(error)
})

module.exports = routerProduct