const inputMessage = document.getElementById('message')
const inputEmail = document.getElementById('email')

document.querySelector('button').addEventListener('click', () => {
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