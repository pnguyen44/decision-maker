'use strict'
const itemsApi = require('./api')
const itemsUi = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')

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
const addHandlers = function () {
  $('#edit-item-form').on('submit', function (e) {
    e.preventDefault()
    const data = getFormFields(this)
    store.item = data.item
    onUpdateItem(store.item.name, store.editItemMark, store.editItemId, store.editItemlistId)
  })
}

const onChooseItem = function (items) {
  const unMarkedItems = items.filter((items) => {
    return items.mark === false
  })

  const numOfItems = unMarkedItems.length
  const itemPosition = Math.floor(Math.random() * numOfItems) + 1
  const choosenItem = unMarkedItems[itemPosition - 1].name
  $('#item-choose-list-id-' + store.chooseItemListId).val(choosenItem)
}

exports.onCreateItem = onCreateItem
exports.onUpdateItem = onUpdateItem
exports.getOneItem = getOneItem
exports.getItems = getItems
exports.addHandlers = addHandlers
exports.onDeleteItem = onDeleteItem
exports.createOneItem = createOneItem
exports.onChooseItem = onChooseItem
