const express = require('express');
const Contenedor = require('./Contenedor.js');

const PORT = process.env.PORT || 8080;
const app = express();
const cont = new Contenedor('productos.txt');

const server = app.listen(PORT, () => {
  console.log('Connection suceeded in the port', server.address().port);
});

app.get('/', async (req, res) => {
  res.send({'message': 'hello from server'});
});

app.get('/productos', async (req, res) => {
  const data = await cont.getAll();
  res.send({data});
});

app.get('/productosRandom', async (req, res) => {
  const data = await cont.getAll();
  const randIndex = Math.floor(Math.random() * (data.length));

  res.send({'data': data[randIndex]});
});

server.on('Error in server', error => console.log(error));