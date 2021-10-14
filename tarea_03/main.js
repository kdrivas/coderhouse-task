const express = require('express');
const Contenedor = require('./Contenedor.js');

const app = express();
const cont = new Contenedor('productos.txt');

const server = app.listen(8080, () => {
  console.log('Connection suceeded in the port', server.address().port);
});

app.get('/productos', async (req, res) => {
  const data = await cont.getProducts();
  res.send({data});
});

app.get('/productosRandom', async (req, res) => {
  const data = await cont.getProducts();
  const randIndex = Math.floor(Math.random() * (data.length));

  res.send({'data': data[randIndex]});
});

server.on('Error in server', error => console.log(error));