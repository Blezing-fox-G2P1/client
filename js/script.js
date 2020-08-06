function showLogin() {

}
function showRegister() {

}
function showHome() {

}

$(document).ready(function () {
  if (!localStorage.getItem('access_token')) {
    showLogin()
  } else {
    showHome()
  }

  $('#btnGoToRegisterPage').click(function (event) {
    event.preventDefault()
    showRegister()
  })

  $('#btnGoToLoginPage').click(function (event) {
    event.preventDefault()
    showLogin()
  })

  $('#btnLogout').click(function (event) {
    event.preventDefault()
    localStorage.removeItem('access_token')
    showLogin()
  })
})