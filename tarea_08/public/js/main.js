const socket = io()

const formAddproduct = document.getElementById('form-product')
formAddproduct.addEventListener('submit', e => {
  e.preventDefault()
  const product = {
    title: document.getElementById('title').value,
    price: parseFloat(document.getElementById('price').value),
    thumbnail: document.getElementById('thumbnail').value,
  }

  socket.emit('updateProducts', product)
  formAddproduct.reset()
})

const eventProducts = async (products) => {
  const listProductsText = products.map(e => `<tr><td>${e.title}</td><td>${e.price}</td><td><img src=${e.thumbnail} alt=${e.thumbnail} style="width:40px;height:40px;"/></td></tr>`).join('')

  document.getElementById('products').innerHTML = '<thead><th scope="col">Title</th><th scope="col">Price</th><th scope="col">Thumbnail</th></thead>' + listProductsText
}
socket.on('products', eventProducts)

const inputMessage = document.getElementById('message')
const inputEmail = document.getElementById('email')

document.getElementById('button-message').addEventListener('click', () => {
  let today = new Date()
  let timeMessage = today.getFullYear() + '/' + 
                    (today.getMonth() + 1).toString().padStart(2, '0') + '/' + 
                    today.getDate().toString().padStart(2, '0') + ' ' + 
                    today.getHours().toString().padStart(2, '0') + ":" + 
                    today.getMinutes().toString().padStart(2, '0') + ":" + 
                    today.getSeconds().toString().padStart(2, '0')
  socket.emit('updateMessages', {'user': inputEmail.value, 'message': inputMessage.value, 'time': timeMessage})
})

socket.on('messages', (messages) => {
  const htmlMessage = messages
                        .map(msg => `${msg.user} [${msg.time}]: ${msg.message}`)
                        .join('<br/>')
  document.getElementById('messages').innerHTML = htmlMessage
})