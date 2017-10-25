'use strict'
const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  clearMessage()

  api.signUp(data)
    .then(ui.signUpSuccess)
    // .catch(ui.signUpFailure)
    .then(() => {
      return api.signIn(data)
    })
    .then(ui.signInSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  // clearMessage()
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  clearMessage()
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}
const clearMessage = function () {
  $('.message-form').text('')
}
const clearFormInput = function () {
  $('#email-address').val('')
  $('#password').val('')
  $('#password-confirmation').val('')
  $('#email-address-sign-in').val('')
  $('#password-sign-in').val('')
  $('#old-password').val('')
  $('#new-password').val('')
}
const addHandlers = function () {
  $('.btn-auth').on('click', function () {
    $('.message-form').text('')
  })
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#btn-sign-out').on('click', onSignOut)
  $('#btn-sign-up').on('click', clearFormInput)
  $('#btn-sign-in').on('click', clearFormInput)
  $('#btn-change-password').on('click', clearFormInput)
}

module.exports = {
  addHandlers,
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut
}
