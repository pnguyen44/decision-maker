'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const store = require('./store')
const authEvents = require('./auth/events')
const listEvents = require('./lists/events')
const itemEvents = require('./items/events')

$(() => {
  setAPIOrigin(location, config)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  store.isSignedIn = false
  // $('#btn-save-list').on('click', function () {
  //   console.log('there i am')
  // })
  $('.create-list-btn').hide()

  authEvents.addHandlers()
  listEvents.addHandlers()
  itemEvents.addHandlers()
  $('#btn-account').on('click', function () {
    $('#message-form').text('')
    console.log('is sign in = ', store.isSignedIn)
    if (store.isSignedIn === true) {
      $('#change-password').show()
      $('#view-history').hide()
      $('#btn-sign-out').show()
      $('#sign-up').hide()
      $('#sign-in').hide()
    } else {
      $('#sign-up').show()
      $('#sign-in').show()
      $('#btn-sign-out').show()
      $('#change-password').hide()
      $('#view-history').hide()
      $('#btn-sign-out').hide()
    }
  })
  // $('div').on('click', function () {
  //   if (store.isSignedIn === true) {
  //     const itemId = document.getElementById(this)
  //     console.log('click on trash with element id =', itemId)
  //     $(this).css('background-color', 'red')
  //   }
  // })
})
