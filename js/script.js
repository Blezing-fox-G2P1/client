const SERVER_PATH = 'http://localhost:3000'

function onSignIn(googleUser) {
  console.log(id_token)
  
  var id_token = googleUser.getAuthResponse().id_token;

  $.ajax({
    method: 'POST',
    url: `${SERVER_PATH}/users/login-google`,
    headers: {
      id_token
    }
  })
    .done(response => {
      console.log('done')
      console.log(response)
      localStorage.setItem('access_token', response.access_token)
      showResto()
    })
    .fail((xhr, status, error) => {
      console.log('fail')
      console.log(response)
    })
    .always(response => {
      console.log('always')
      console.log(response)
      console.log('No token')
    })
}
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function showLogin() {
  $('#login').show()
  $('#resto').hide()
  $('#register').hide()
  $('#navbar').hide()
  $('#meals').hide()
}
function showRegister() {
  $('#register').show()
  $('#login').hide()
  $('#resto').show()
  $('#navbar').hide()
  $('#meals').hide()

}
function showMeals() {
  $('#navbar').show()
  $('#meals').show()
  $('#login').hide()
  $('#register').hide()
  $('#resto').hide()
}

function showResto() {
  console.log('showResto manggil fetch data resto')
  fetchDataResto()
  $('#navbar').show()
  $('#resto').show()
  $('#meals').hide()
  $('#login').hide()
  $('#register').hide()
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
function fetchDataResto() {
  console.log('fetc data Resto nih')
  // $('#list-resto').empty()
  $.ajax({
    method: 'GET',
    url: `${SERVER_PATH}/restaurant`
  })
    .done((response) => {
      console.log('done')
      console.log(response)
      response.forEach(resto => {
        if (resto.restaurant.thumb) {
          $('#list-resto').append(`
          <div class="col-sm-3">
            <div class="card" style="width: 18rem;">
              <img src="${resto.restaurant.thumb}" class="card-img-top" alt="${resto.restaurant.thumb}">
              <div class="card-body">
                <h5 class="card-title">${resto.restaurant.name}</h5>
                <p class="card-text">Contact : ${resto.restaurant.phone_numbers}, at ${resto.restaurant.location.address}
                </p>
                <a class="btn btn-warning">${resto.restaurant.user_rating.aggregate_rating}</a>
              </div>
            </div>
          </div>
          `)
        }
      })
    })
    .fail((xhr, status, error) => {
      console.log('fail')
      console.log(xhr, status, error)
    })
    .always((response) => {
      console.log('always')
      console.log(response)

    })
}

$(document).ready(function () {
  if (!localStorage.getItem('access_token')) {
    showLogin()
  } else {
    showMeals()
  }

  $('#fecthMeals').on('click', mealsRecomendation)

  $('#register-button').click(function (event) {
    event.preventDefault()
    showRegister()
  })

  $('#login-button').click(function (event) {
    event.preventDefault()
    showLogin()
  })

  $('#btnLogout').click(function (event) {
    event.preventDefault()
    localStorage.removeItem('access_token')
    signOut()
    showLogin()
  })

  $('#btnGoToRestoPage').click(function (event) {
    event.preventDefault()
    showResto()
  })

  $('#btnMeals').click(function (event) {
    event.preventDefault()
    showMeals()
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
        showResto()
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

  $('#register-form').on('submit', function (event) {
    event.preventDefault()

    const email = $('#email-register').val()
    const password = $('#password-register').val()

    $('#email-register').val('')
    $('#password-register').val('')

    // console.log(email, password)

    $.ajax({
      method: 'POST',
      url: `${SERVER_PATH}/users/register`,
      data: {
        email,
        password
      }
    })
      .done((response) => {
        console.log('done')
        console.log(response)
        showLogin()
      })
      .fail((xhr, status, error) => {
        console.log('fail')
        console.log(xhr, status, error)
      })
      .always((response) => {
        console.log('always')
        console.log(response)
      })

  })




})