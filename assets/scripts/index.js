'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const store = require('./store')
const authEvents = require('./auth/events')
const listEvents = require('./lists/events')
const itemEvents = require('./items/events')

$(() => {
  setAPIOrigin(location, config)
  $('#btn-change-password').hide()
  $('#btn-sign-out').hide()

  store.isSignedIn = false
  $('.create-list-btn').hide()
  listEvents.addHandlers()
  itemEvents.addHandlers()
  authEvents.addHandlers()
  $('#examples').show()

  // $('#btn-account').on('click', function () {
  //   $('.message-form').text('')
  //   if (store.isSignedIn === true) {
  //     $('#change-password').show()
  //     $('#view-history').hide()
  //     $('#btn-sign-out').show()
  //     $('#sign-up').hide()
  //     $('#sign-in').hide()
  //   } else {
  //     $('#sign-up').show()
  //     $('#sign-in').show()
  //     $('#btn-sign-out').show()
  //     $('#change-password').hide()
  //     $('#view-history').hide()
  //     $('#btn-sign-out').hide()
  //   }
  // })
})
