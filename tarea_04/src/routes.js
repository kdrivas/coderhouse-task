const { Router } = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const PATH = '../uploads';
const apiRouter = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})
const upload = multer({storage});

let products = [
  {
    "title": "Escuadra",
    "price": 123.23,
    "thumbnail": "http1",
    "id": 1
  },
]

const getLastIndex = () => {
  // Function para obtener el ultimo index del arreglo de productos

  let newId = null;
  if (products.length > 0 ){
    newId = products[products.length - 1].id + 1;
  }
  else {
    newId = 1;
  }
  return newId;
}

apiRouter.post('/load', upload.single('myFile'), (req, res, next) => {
  const file = req.file;
  if (!file) {
    return next('Not file found');
  }

  // Cargando data en array de productos
  const data = JSON.parse(fs.readFileSync(path.join(PATH, file.originalname), 'utf-8'))
  for (e of data) {
    e['id'] = getLastIndex();
    products.push(e);
  }
  res.send(`File <b>${file.originalname}</b> load`);
})

apiRouter.get('/', (req, res) => {
  res.status(200).json(products);
})

apiRouter.get('/:id', (req, res, next) => {
  const product = products.filter(e => e.id == req.params.id);
  if (!product.length) {
    return next('Product not found');
  }
  else {
    res.status(200).json(product[0]);
  }
});

apiRouter.post('/', (req, res, next) => {
  const element = req.body;
  if (element['title'] === undefined || element['price'] === undefined || element['thumbnail'] === undefined){
    return next('Insufficient data');
  }
  else {
    element['id'] = getLastIndex();
    products.push(element);
    res.status(200).json(element);
  }
})

apiRouter.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const element = req.body;
  const oldItem = products[id - 1];
  
  products[id - 1] = {...products[id - 1], ...element};
  res.status(200).json({'Message': `Updated item ${id}`, 'Old item': oldItem, 'New item': element})
})

apiRouter.delete('/:id', (req, res, next) => {
  const index = products.findIndex(e => e.id == req.params.id);
  if (index < 0) {
    return next('Product not found');
  }
  else {
    products.splice(index, 1);
    res.status(200).json({'Message': `Deleted item ${index}`});
  }
})

apiRouter.use((err, req, res, next) => {
  res.status(500).json({
    'error': err
  });
})

module.exports = apiRouter;

