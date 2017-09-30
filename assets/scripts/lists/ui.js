'use strict'
const store = require('../store')
// const getFormFields = require('../../../lib/get-form-fields')
const listsEvents = require('./events')
const itemsEvents = require('../items/events')
// const listsApi = require('./api')
// const listsUi = require('./ui')
const showListsTemplate = require('../templates/list-listing.handlebars')
const onSuccess = function (data) {
}
const onError = function () {
}
const onCreateSuccess = function (data) {
  store.list = data.list
  clearForm()
  $('#create-list').modal('hide')
  listsEvents.getLists()
}

const getListsSuccess = function (data) {
  store.lists = data.lists
  const showListsHTML = showListsTemplate({lists: data.lists})
  $('.content').html(showListsHTML)
  $('.content').show()

  $('.add-item-form').on('submit', function (e) {
    e.preventDefault()
  })

  $('.btn-add-item').on('click', function (e) {
    e.preventDefault()
    console.log('i am here')
    if (store.isSignedIn === true) {
      const listId = $(this).attr('data-item-name-list-id')
      const inputBox = `#item-name-list-id-${listId}`
      const itemName = String($(inputBox).val())
      console.log('itemName=', itemName)
      $(inputBox).val('')
      console.log('length=', itemName.trim().length)
      if (itemName.trim().length > 0) {
        console.log('hi')
        itemsEvents.createOneItem(itemName, false, listId)
      }
    }
  })

  $('.btn-delete-item').on('click', function () {
    if (store.isSignedIn === true) {
      const itemId = $(this).attr('data-item-delete-id')
      itemsEvents.onDeleteItem(itemId)
    }
  })

  $('.btn-delete-list').on('click', function () {
    if (store.isSignedIn === true) {
      const listId = $(this).attr('data-list-delete-id')
      listsEvents.onDeleteList(listId)
    }
  })

  $('.checkBox').on('click', function () {
    if (store.isSignedIn === true) {
      const mark = $(this).is(':checked')
      const itemName = $(this).attr('data-item-name-id')
      const itemId = $(this).attr('data-checkbox-item-id')
      const listId = $(this).attr('data-list-id')
      // const value = $(this).val()
      itemsEvents.onUpdateItem(itemName, mark, itemId, listId)
    }
  })
  $('.btn-edit-list').on('click', function () {
    if (store.isSignedIn === true) {
      const listId = $(this).attr('data-list-edit-id')
      store.listId = listId
      const listName = $(this).attr('data-list-edit-name')
      $('.edit-list-input').val(listName)
      $('#edit-list').modal('show')
    }
  })
  $('.btn-edit-item').on('click', function () {
    if (store.isSignedIn === true) {
      store.editItemId = $(this).attr('data-item-edit-id')
      store.editItemName = $(this).attr('data-item-edit-name')
      store.editItemlistId = $(this).attr('data-item-edit-list-id')
      store.editItemMark = $(this).attr('data-item-edit-mark')

      $('.edit-item-input').val(store.editItemName)
      $('#edit-item').modal('show')
    }
  })
  $('.btn-choose-item').on('click', function () {
    if (store.isSignedIn === true) {
      store.chooseItemListId = $(this).attr('data-choose-item-list-id')
      listsEvents.getOneList(store.chooseItemListId)
        // .then(onGetListItemsSuccess)
        // return listsEvents.getOneList(store.chooseItemListId)
        // // .then(function () {
        //   console.log('list items=', store.items)
        //   if (store.items.length > 0) {
        //     itemsEvents.onChooseItem(store.list.items)
        //   }
        // // })
    }
  })
}


const onGetListItemsSuccess = function () {
  console.log('list items=', store.items)
  // if (store.items.length > 0) {
    itemsEvents.onChooseItem(store.list.items)
  // }
}

const getOneListSuccess = function (data) {
  store.list = data.list
  store.items = data.list.items
  console.log('list items=', store.items)
  if (store.items.length > 0) {
    itemsEvents.onChooseItem(store.list.items)
  }
}

const onUpdateSuccess = function () {
  $('#edit-list').modal('hide')
  listsEvents.getLists()
}

const onDeleteSuccess = function (id) {
  $('#list-id-' + id).parent().remove()
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
