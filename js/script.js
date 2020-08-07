function showLogin() {
  $('#aris').hide()

}
function showRegister() {

}
function showHome() {

}
function showAris() {
  $('#aris').show()
}
function mealsRecomendation() {
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/meals",
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(response => {
      // console.log(response)
      $('#appendMeals').append(`
      <h2>${response.name}</h2><br>
      <h4>${response.type}</h4><br>
      <table>
        <tr>
        <td><img src="${response.thumb}" width="500" height="300"></td>
        </tr>
        <tr>
        <td>${response.instruction}</td>
        </tr>
      </table>
      `)
    })
    .fail(xhr => {
      console.log(xhr);
    })
    .always(_ => {
      console.log('MASUK');
    })
}

$(document).ready(function () {
  if (!localStorage.getItem('access_token')) {
    showLogin()
  } else {
    showHome()
  }

  $('#fecthMeals').on('click', mealsRecomendation)

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

  $('#login-form').on('submit', function (event) {
    event.preventDefault()
    const email = $('#email-login').val()
    const password = $('#password-login').val()

    console.log(email, password)
    $('#email-login').val('')
    $('#password-login').val('')

    $.ajax({
      method: 'POST',
      url: `http://localhost:3000/users/login`,
      data: {
        email,
        password
      }
    })
      .done((response) => {
        console.log('done')
        console.log(response)
        localStorage.setItem('access_token', response.access_token)
      })
      .fail((xhr, status, error) => {
        console.log('fail')
        console.log(xhr, status, error)
      })
      .always((response) => {
        console.log('always')
        console.log(response)
      })

    event.preventDefault()
  })
})