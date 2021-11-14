import { Router } from 'express'

const routerProduct = Router()

routerProduct.get('/home', async (req, res) => {
  const container = req.app.products
  const products = container.getAll()
  res.render('formProduct.hbs', { products })
})

routerProduct.get('/', async (req, res) => {
  const container = req.app.products
  const products = container.getAll()
  res.status(200).json({ products })
})

routerProduct.post('/', async (req, res, next) => {
  try {
    const container = req.app.products
    const { title, thumbnail, price } = req.body
    if (title === '' || thumbnail === '' || price === ''){
      return next('Insufficient data')
    }
    else {
      const product = container.addProduct(title, thumbnail, price)
      send.status(200).json({'message': `New product added with id ${product['id']}`, product})
    }
  }
  catch(error) {
    console.log(error)
  }
})

routerProduct.get('/:id', async (req, res, err) => {
  try {
    const container = req.app.products
    const id = parseInt(req.params.id)
    const product = container.getProduct(id)
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
    const container = req.app.products
    const id = parseInt(req.params.id)
    const { title, thumbnail, price } = req.params
    const newProduct = container.modifyProduct(id, title, thumbnail, price)
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
    const container = req.app.products
    const id = parseInt(req.params.id)
    const status = container.removeProduct(id)
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

export default routerProduct