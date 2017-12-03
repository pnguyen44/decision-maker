'use strict'
const itemsApi = require('./api')
const itemsUi = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')
// const listsEvents = require('../lists/events')
const listsApi = require('../lists/api')

const store = require('../store')

const onCreateItem = function (e) {
  e.preventDefault()
  const data = getFormFields(this)
  const item = data.item
  itemsApi.create(item.name, item.mark, item.list_id)
    .then(itemsUi.onCreateSuccess)
    .catch(itemsUi.onError)
}

const createOneItem = function (name, mark, listId) {
  mark = false
  itemsApi.create(name, mark, listId)
    .then(itemsUi.onCreateSuccess)
    .catch(itemsUi.onError)
}

const getItems = function () {
  itemsApi.index()
    .then(itemsUi.getItemsSuccess)
    .catch(itemsUi.onError)
}
const getOneItem = function (id) {
  itemsApi.show(id)
    .then(itemsUi.getOneItemSuccess)
    .catch(itemsUi.onError)
}

const onUpdateItem = function (name, mark, itemId, listId) {
  itemsApi.update(name, mark, itemId, listId)
    .then(itemsUi.onUpdateSuccess)
    .catch(itemsUi.onError)
}

const onDeleteItem = function (id) {
  itemsApi.destroy(id)
    .then(itemsUi.onDeleteSuccess(id))
    .catch(itemsUi.onError)
}

const onChooseItem = function (items) {
  const unMarkedItems = items.filter((items) => {
    return items.mark === false
  })
  const numOfItems = unMarkedItems.length
  if (numOfItems > 0) {
    const itemPosition = Math.floor(Math.random() * numOfItems) + 1
    const choosenItem = unMarkedItems[itemPosition - 1].name
    $('#item-choose-list-id-' + store.chooseItemListId).text(choosenItem)
  }
}

const editItemClickHandler = function () {
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
}

const chooseItemClickHandler = function () {
  $('.btn-choose-item').on('click', function () {
    if (store.isSignedIn === true) {
      store.chooseItemListId = $(this).attr('data-choose-item-list-id')
      listsApi.show(store.chooseItemListId)
        .then((data) => {
          displayChosenItem(data)
        })
    }
  })
}

const displayChosenItem = function (data) {
  store.items = data.list.items
  if (store.items.length) {
    onChooseItem(store.items)
  } else {
    $('#item-choose-list-id-' + store.chooseItemListId).text('')
  }
}

const addItemClickHandler = function () {
  $('.btn-add-item').on('click', function (e) {
    e.preventDefault()
    if (store.isSignedIn === true) {
      const listId = $(this).attr('data-item-name-list-id')
      const inputBox = `#item-name-list-id-${listId}`
      const itemName = String($(inputBox).val())
      $(inputBox).val('')
      if (itemName.trim().length > 0) {
        createOneItem(itemName, false, listId)
      }
    }
    store.target = $(this).parent().parent().last()
  })
}

const deleteItemClickHander = function () {
  $('.btn-delete-item').on('click', function () {
    // let deleteItem
    console.log('first cleick')
    if (store.isSignedIn === true) {
      store.itemId = $(this).attr('data-item-delete-id')
      $('#modal-delete-confirm').modal('show')
    }
  })
}

const checkBoxClickHander = function () {
  $('.checkBox').on('click', function () {
    if (store.isSignedIn === true) {
      const mark = $(this).is(':checked')
      const itemName = $(this).attr('data-item-name-id')
      const itemId = $(this).attr('data-checkbox-item-id')
      const listId = $(this).attr('data-list-id')
      onUpdateItem(itemName, mark, itemId, listId)
    }
  })
}

const itemsEventsHander = function () {
  addItemClickHandler()
  deleteItemClickHander()
  checkBoxClickHander()
  editItemClickHandler()
  chooseItemClickHandler()
}

const addHandlers = function () {
  $('#edit-item-form').on('submit', function (e) {
    e.preventDefault()
    const data = getFormFields(this)
    store.item = data.item
    if (store.item.name.trim().length > 0) {
      onUpdateItem(store.item.name, store.editItemMark, store.editItemId, store.editItemlistId)
    }
  })
  $('.btn-delete').on('click', function () {
    onDeleteItem(store.itemId)
  })
}

exports.onCreateItem = onCreateItem
exports.onUpdateItem = onUpdateItem
exports.getOneItem = getOneItem
exports.getItems = getItems
exports.addHandlers = addHandlers
exports.onDeleteItem = onDeleteItem
exports.createOneItem = createOneItem
exports.onChooseItem = onChooseItem
exports.editItemClickHandler = editItemClickHandler
exports.chooseItemClickHandler = chooseItemClickHandler
exports.chooseItemClickHandler = chooseItemClickHandler
exports.addItemClickHandler = addItemClickHandler
exports.deleteItemClickHander = deleteItemClickHander
exports.checkBoxClickHander = checkBoxClickHander
exports.itemsEventsHander = itemsEventsHander
