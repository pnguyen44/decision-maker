'use strict'
const store = require('../store')
// const list = require('../list')
const listsEvents = require('./events')
const itemsEvents = require('../items/events')
// const itemsApi = require('../items/api')
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
  // listsEvents.getLists()
  $('#create-list-form').modal('hide')
}

const getListsSuccess = function (data) {
  store.lists = data.lists
  console.log('data.lists=', data.lists)
  const showListsHTML = showListsTemplate({lists: data.lists})
  $('.content').append(showListsHTML)
  $('.content').show()

  // $('a').on('click', function () {
  //   console.log('a tag clicked')
  // })
  // $('.glyphicon').on('click', function () {
  //   console.log('icon clicked')
  // })

  $('.add-item-form').on('submit', function (e) {
    e.preventDefault()
  })

  $('.btn-add-item').on('click', function (e) {
    e.preventDefault()
    // e.preventDefault()

    const listId = $(this).attr('data-item-name-list-id')
    console.log('listId to update in=', listId)
    const inputBox = `#item-name-list-id-${listId}`
    const itemName = String($(inputBox).val())
    console.log(' ------name --------', itemName)
    // $('.item-input').val('')
    $(inputBox).val('')

    // $(this).parent().siblings().last().append("<p class='marked'><input id='checkBox' type='checkbox'>itemName</p>")
    // $(this).parent(``).siblings().last().css('color', 'red')
    // const p = `.item-name-${listId}`
    // $(p).last().append('<p>this</p>')
    itemsEvents.createOneItem(itemName, false, listId)
    // $('this').append('<h1>append here</h1>')
    // $(inputBox).prepend('<p>this</p>')
    // const p = `.item-name-${listId}`
    // $(p).last().append('<p>this</p>')
  })
  $('.btn-delete-item').on('click', function () {
    // const itemId = document.getElementById(this).id
    const itemId = $(this).attr('data-item-delete-id')
    console.log('item id to delete =', itemId)
    itemsEvents.onDeleteItem(itemId)
  })

  $('.btn-delete-list').on('click', function () {
    // const itemId = document.getElementById(this).id
    const listId = $(this).attr('data-list-delete-id')
    console.log('list id to delete =', listId)
    listsEvents.onDeleteList(listId)
  })

  $('.checkBox').on('click', function () {
    const mark = $(this).is(':checked')
    const itemName = $(this).attr('data-item-name-id')
    const itemId = $(this).attr('data-checkbox-item-id')
    const listId = $(this).attr('data-list-id')
    const value = $(this).val()
    console.log('value=', value)
    console.log('isChecked=', mark)
    console.log('itemName=', itemName)
    console.log('itemId=', itemId)
    console.log('listId=', listId)
    itemsEvents.onUpdateItem(itemName, mark, itemId, listId)
  })

  // $('#add-item-form').on('submit', itemsEvents.onCreateItem)
  console.log('on getListsSuccess store.lists =', store.lists)
  // console.log('isNewUser =', store.isNewUser)
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

const onDeleteSuccess = function (id) {
  console.log('list as been sucessfully deleted')
  $('#list-id-' + id).parent().remove()
  // $('.btn-delete-item-' + id).remove()
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
