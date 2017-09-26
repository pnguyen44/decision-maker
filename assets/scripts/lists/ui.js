'use strict'
const store = require('../store')
// const list = require('../list')
// const listsEvents = require('./events')
const showListsTemplate = require('../templates/list-listing.handlebars')
const onSuccess = function (data) {
  console.log('on sucess data ', data)
}
const onError = function (err) {
  console.log('error messge', err)
  // console.log('Error on creating game')
}
const onCreateSuccess = function (data) {
  console.log('onCreateSuccess = data', data)
  store.list = data.list
  // $('.game-message').html("X's turn")
  // store.games.push(store.game)
  console.log('onCreateSuccesss store.list =', store.list)
  // console.log('onCreateSuccesss store.lists =', store.lists)
  clearForm()
}

const getListsSuccess = function (data) {
  store.lists = data.lists
  const showListsHTML = showListsTemplate({lists: data.lists})
  $('.content').append(showListsHTML)
  console.log('on getListsSuccess store.lists =', store.lists)
  // store.lastGameID = store.games[ store.games.length - 1 ].id
  // console.log('last game id =', store.lastGameID)
  // console.log('store.gamnes[ store.games.length - 1 ].over =', store.games[ store.games.length - 1 ].over)
  console.log('isNewUser =', store.isNewUser)
  // if (store.isNewUser === true) {
  //   listsEvents.onCreateGame()
  // } else {
  //   game.getLastGame()
  // }
}

const getOneListSuccess = function (data) {
  store.list = data.list
  // store.listId = data.list.id
  console.log('getOneListSuccess store.list =', store.list)
  // game.getLastGame()
  // if (store.game.over === false) {
  //   game.displayLastGame()
  // } else {
  //   listsEvents.onCreateGame()
  // }
}

const onUpdateSuccess = function () {
  // data should be null.. so list is not a property. that's the error.
  // store.list = data.list
  console.log('onUpdateSuccess was successfull')
  // console.log('onUpdateSuccess store.games =', store.games)
}

const onDeleteSuccess = function () {
  console.log('item as been sucessfully deleted')
}

const clearForm = function () {
  $('form').trigger('reset')
}

module.exports = {
  onCreateSuccess,
  onError,
  onUpdateSuccess,
  onSuccess,
  getOneListSuccess,
  getListsSuccess,
  onDeleteSuccess
}
