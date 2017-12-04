'use strict'
const store = require('../store')
// const getFormFields = require('../../../lib/get-form-fields')
const listsEvents = require('./events')
const itemsEvents = require('../items/events')
// const listsApi = require('./api')
// const listsUi = require('./ui')
const showListsTemplate = require('../templates/list-listing.handlebars')
const showOneListTemplate = require('../templates/add-list-template.handlebars')
const onSuccess = function (data) {
}
const onError = function () {
}
const onCreateSuccess = function (data) {
  store.list = data.list
  clearForm()
  $('#create-list').modal('hide')
  const showOneListHTML = showOneListTemplate({list: store.list})
  $('.content').last().append(showOneListHTML)
  // addEventsHandlers()
  listsEvents.getLists()
}

const getListsSuccess = function (data) {
  store.lists = data.lists
  let checkedItem = []
  let uncheckedItem = []
  data.lists.forEach(function (list) {
    checkedItem = list.items.filter(function (item) {
      return item.mark === true
    })
    uncheckedItem = list.items.filter(function (item) {
      return item.mark === false
    })
    list.items = uncheckedItem.concat(checkedItem)
  })
  const showListsHTML = showListsTemplate({lists: data.lists})
  $('.content').html(showListsHTML)
  $('.content').show()
  addEventsHandlers()
}

const addEventsHandlers = function () {
  $('.add-item-form').on('submit', function (e) {
    e.preventDefault()
  })
  itemsEvents.itemsEventsHander()
  listsEvents.listsEventsHandler()
}

const getOneListSuccess = function (data) {
  store.list = data.list
  store.items = data.list.items
}

const onUpdateSuccess = function () {
  $('#edit-list').modal('hide')
  listsEvents.getLists()
}

const onDeleteSuccess = function (id) {
  $('#list-id-' + id).parent().remove()
  $('#modal-delete-list-confirm').modal('hide')
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
