const express = require('express');
const routes = require('./routes.js')

const PORT = process.env.PORT || 8080;
const app = express();

app.use('/public', express.static('../public'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/productos', routes);

const server = app.listen(PORT, () => {
  console.log('Connected to', PORT);
});

server.on('error', error => console.log(`Error en servidor ${error}`));