'use strict'
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')
// const list = require('../list')
const listsEvents = require('./events')
const itemsEvents = require('../items/events')
const listsApi = require('./api')
const listsUi = require('./ui')
const app = require('../app')
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
  $('#create-list').modal('hide')
  listsEvents.getLists()
}

// const editListOnUpdate = function () {
//   $('.btn-edit-list').on('click', function () {
//     const listId = $(this).attr('data-list-edit-id')
//     const listName = $(this).attr('data-list-edit-name')
//     console.log('listId=', listId)
//     console.log('listName=', listName)
//     // console.log('edit-list-btn')
//     $('.edit-list-input').val(listName)
//     $('#edit-list').modal('show')
//     $('#edit-list-form').on('submit', function (e) {
//       e.preventDefault()
//       const updatedName = $('.edit-list-input').val()
//       console.log('updatedName=', updatedName)
//       clearForm()
//       listsEvents.onUpdateList(updatedName, listId)
//     })
//   })
// }

// const clearForm = function () {
//   $('form').trigger('reset')
// }

// const editListOnUpdate = function () {
//   $('.btn-edit-list').on('click', function () {
//     const listId = $(this).attr('data-list-edit-id')
//     const listName = $(this).attr('data-list-edit-name')
//     console.log('listId=', listId)
//     // console.log('listName=', listName)
//     // console.log('edit-list-btn')
//     $('.edit-list-input').val(listName)
//     $('#edit-list').modal('show')
//     // $('#edit-list-form').on('submit', function (e) {
//     //   e.preventDefault()
//     //   const updatedName = $('.edit-list-input').val()
//     //   listsEvents.onUpdateList(updatedName, listId)
//     $('#edit-list-form').on('submit', function (e) {
//       e.preventDefault()
//       console.log('i am here in update list')
//       const data = getFormFields(this)
//       clearForm()
//       console.log('onUpdateList2 data = ', data)
//       const list = data.list
//       console.log('list = ', list)
//       console.log('new list name = ', list.name)
//       // console.log('onUpdateList2 list=', list.name)
//       listsEvents.onUpdateList(list.name, listId)
//     })
//   })
// }

const getListsSuccess = function (data) {
  store.lists = data.lists
  console.log('getListsSuccess, data.lists=', data.lists)
  const showListsHTML = showListsTemplate({lists: data.lists})
  $('.content').html(showListsHTML)
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
    itemsEvents.createOneItem(itemName, false, listId)
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
  // editListOnUpdate()
  // $('.edit-list-form').on('submit', listsEvents.onUpdateList2)
  $('.btn-edit-list').on('click', function () {
    const listId = $(this).attr('data-list-edit-id')
    store.listId = listId
    const listName = $(this).attr('data-list-edit-name')
  //   console.log('listId=', listId)
  //   console.log('listName=', listName)
  // //   // console.log('edit-list-btn')
    $('.edit-list-input').val(listName)
    $('#edit-list').modal('show')
  //   $('#edit-list-form').on('submit', function (e) {
  //     e.preventDefault()
  //     const updatedName = $('.edit-list-input').val()
  //     clearForm()
  //     listsEvents.onUpdateList(updatedName, listId)
  //   })
  //
  })
  $('.btn-edit-item').on('click', function () {
    store.editItemId = $(this).attr('data-item-edit-id')
    store.editItemName = $(this).attr('data-item-edit-name')
    store.editItemlistId = $(this).attr('data-item-edit-list-id')
    store.editItemMark = $(this).attr('data-item-edit-mark')

  //   console.log('listId=', listId)
  //   console.log('listName=', listName)
  // //   // console.log('edit-list-btn')
    $('.edit-item-input').val(store.editItemName)
    $('#edit-item').modal('show')
  })

$('.btn-choose-item').on('click', function () {
    store.chooseItemListId = $(this).attr('data-choose-item-list-id')
    console.log('store.chooseItemListId=', store.chooseItemListId)
      listsEvents.getOneList(store.chooseItemListId)
    // listsApi.show(store.chooseItemListId)
    //   .then(getOneListSuccess(data))
    //   .then(app.chooseItem(data.list.items))
    //   .then(console.log('result =', data.list.items))
    //   .catch(onError())

})
  console.log('on getListsSuccess store.lists =', store.lists)
  // console.log('isNewUser =', store.isNewUser)
}

const getOneListSuccess = function (data) {
  store.list = data.list
  store.items = data.list.items
  // store.listId = data.list.id
  console.log('data.list.items=', data.list.items)
  console.log('getOneListSuccess store.list.item =', data.list)
  app.chooseItem(store.list.items)

}

const onUpdateSuccess = function () {
  // data should be null.. so list is not a property. that's the error.
  // store.list = data.list
  console.log('onUpdateSuccess was successfull')
  $('#edit-list').modal('hide')
  listsEvents.getLists()
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
  // editListOnUpdate
}
