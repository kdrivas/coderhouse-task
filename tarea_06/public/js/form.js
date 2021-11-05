const socket = io()

const formAddproduct = document.getElementById('form-product')
formAddproduct.addEventListener('submit', e => {
  e.preventDefault()
  const product = {
    title: document.getElementById('title').value,
    price: document.getElementById('price').value,
    thumbnail: document.getElementById('thumbnail').value,
  }

  socket.emit('updateProducts', product)
  formAddproduct.reset()
})

const eventProducts = async (products) => {
  const listProducts = await fetch('/views/listProducts.hbs')
  const listProductsText = await listProducts.text()
  const template = Handlebars.compile(listProductsText)
  const html = template({ products })
  document.getElementById('products').innerHTML = html
}
socket.on('products', eventProducts)
