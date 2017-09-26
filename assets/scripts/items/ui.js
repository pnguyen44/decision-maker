'use strict'
const store = require('../store')
// const game = require('../game')
const itemsEvents = require('./events')
const onSuccess = function (data) {
  console.log('on sucess data ', data)
}
const onError = function (err) {
  console.log(err)
  // console.log('Error on creating game')
}
const onCreateSuccess = function (data) {
  console.log('onCreateSuccess = data', data)
  store.item = data.item
  $('.game-message').html("X's turn")
  // store.items.push(store.game)
  console.log('onCreateSuccesss store.item =', store.item)
  console.log('onCreateSuccesss store.items =', store.items)
}

const getItemsSuccess = function (data) {
  store.items = data.items
  console.log('on getItemsSuccess store.items =', store.items)
  // store.lastGameID = store.items[ store.items.length - 1 ].id
  // console.log('last game id =', store.lastGameID)
  // game.getPlayerStats()
  // console.log('store.items[ store.items.length - 1 ].over =', store.items[ store.items.length - 1 ].over)
  console.log('isNewUser =', store.isNewUser)
  // if (store.isNewUser === true) {
  //   itemsEvents.onCreateGame()
  // } else {
  //   game.getLastGame()
  // }
}

const getOneItemSuccess = function (data) {
  store.item = data.item
  console.log('getOneGameSuccess store.game =', store.item)
  // game.getLastGame()
  // if (store.game.over === false) {
  //   game.displayLastGame()
  // } else {
  //   itemsEvents.onCreateGame()
  // }
}

const onUpdateSuccess = function () {
  // store.item = data.item
  console.log('onUpdateSuccess updated')
  itemsEvents.getItems()
  // console.log('onUpdateSuccess store.items =', store.items)
}
const onDeleteSuccess = function () {
  console.log('item as been sucessfully deleted')
  itemsEvents.getItems()
}
module.exports = {
  onCreateSuccess,
  onError,
  onUpdateSuccess,
  onSuccess,
  getOneItemSuccess,
  getItemsSuccess,
  onDeleteSuccess
}
