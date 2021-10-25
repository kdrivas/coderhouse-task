const { Router } = require('express')
const Container = require('./container');
const routerProduct = Router()

const container = new Container([])

routerProduct.get('/', async (req, res) => {
  const products = await container.getAll()
  res.render('products.hbs', { products })
})

routerProduct.post('/', async (req, res, next) => {
  try {
    const { title, thumbnail, price } = req.body
    if (title === '' || thumbnail === '' || price === ''){
      // return next('Insufficient data')
      res.render('error.hbs', {'error': 'Insufficient data'})
    }
    else {
      const product = await container.addProduct(title, thumbnail, price)
      // send.status(200).json({'message': `New product added with id ${product['id']}`, product})
      res.redirect('/api/productos')
    }
  }
  catch(error) {
    console.log(error)
  }
})

routerProduct.get('/:id', async (req, res, err) => {
  try {
    const id = parseInt(req.params.id)
    const product = await container.getProduct(id)
    if (product) {
      res.status(200).json({'message': 'Product found', product })
    }
    else {
      err('Product not Found')
    }
  }
  catch(error){
    console.log(error)
  }
})

routerProduct.put('/:id', async (req, res, err) => {
  try {
    const id = parseInt(req.params.id)
    const { title, thumbnail, price } = req.params
    const newProduct = await container.modifyProduct(id, title, thumbnail, price)
    if (newProduct) {
      res.status(200).json({'message': `Item modified with index ${newProduct['id']}`, newProduct})
    }
    else {
      err('Product not Found')
    }
  }
  catch(error) {
    console.log(error)
  }
})

routerProduct.delete('/:id', async(req, res, err) => {
  try {
    const id = parseInt(req.params.id)
    const status = await container.removeProduct(id)
    if (status) {
      res.status(200).json({'message': 'Product removed'})
    }
    else {
      err('Product not Found')
    }
  }
  catch(error) {
    console.log(error)
  }
})

routerProduct.use((error, req, res, next) => {
  res.status(500).json(error)
})

module.exports = routerProduct