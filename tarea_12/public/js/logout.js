
fetch('/getUser').then(async (data) => {
  const nombre = await data.text()
  const divLogout = document.getElementById('logout')
  fetch('/logout', { method: 'POST'}).then(async (dataLogout) => {
    const status = await dataLogout.text()
    if (status == 'ok'){
      divLogout.innerHTML = `Hasta luego ${nombre}`
    }
    else{
      divLogout.innerHTML = 'Error de deslogueo'
    }
  })
})
