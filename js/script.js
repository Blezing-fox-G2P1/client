function showLogin() {

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
})