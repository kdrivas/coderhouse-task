const Contenedor = require('./contenedor.js');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { Router } = require('express');

const PATH = '../uploads';
const apiRouter = Router();

const products = new Contenedor([
  {
    "title": "Escuadra",
    "price": 123.23,
    "thumbnail": "http1",
    "id": 1
  },
]);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})
const upload = multer({storage});

apiRouter.post('/load', upload.single('myFile'), (req, res, next) => {
  const file = req.file;
  if (!file) {
    return next('Not file found');
  }

  // Cargando data en array de productos
  const data = JSON.parse(fs.readFileSync(path.join(PATH, file.originalname), 'utf-8'))
  for (e of data) {
    products.addProduct(e);
  }
  res.send(`File <b>${file.originalname}</b> load`);
})

apiRouter.get('/', (req, res) => {
  res.status(200).json(products.getAll());
})

apiRouter.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const product = products.getProductById(id);
  if (!product) {
    return next('Product not found');
  }
  else {
    res.status(200).json(product);
  }
});

apiRouter.post('/', (req, res, next) => {
  let newProduct = req.body;
  if (newProduct['title'] === undefined || newProduct['price'] === undefined || newProduct['thumbnail'] === undefined){
    return next('Insufficient data');
  }
  else {
    newProduct = products.addProduct(newProduct)
    res.status(200).json(newProduct);
  }
})

apiRouter.put('/:id', (req, res, send) => {
  const id = parseInt(req.params.id);
  const newProduct = products.modifyProduct(id, req.body);
  if (!newProduct) {
    return next('Product not found');
  }
  else {
    res.status(200).json({'Message': `Updated item ${id}`, 'New item': newProduct})
  }
})

apiRouter.delete('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const error = products.removeProduct(id);
  if (!error) {
    return next('Product not found');
  }
  else {
    res.status(200).json({'Message': `Deleted item ${id}`});
  }
})

apiRouter.use((err, req, res, next) => {
  res.status(500).json({
    'error': err
  });
})

module.exports = apiRouter;

