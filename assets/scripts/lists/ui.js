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

  $('.add-item-form').on('submit', function (e) {
    e.preventDefault()
  })

  itemsEvents.addItemClickHandler()
  itemsEvents.deleteItemClickHander()
  listsEvents.deleteListClickHander()
  itemsEvents.checkBoxClickHander()
  listsEvents.editListClickHander()
  itemsEvents.editItemClickHandler()
  itemsEvents.chooseItemClickHandler()
}

const getListsSuccess = function (data) {
  store.lists = data.lists
  const showListsHTML = showListsTemplate({lists: data.lists})
  $('.content').html(showListsHTML)
  $('.content').show()

  $('.add-item-form').on('submit', function (e) {
    e.preventDefault()
  })

  itemsEvents.addItemClickHandler()
  itemsEvents.deleteItemClickHander()
  listsEvents.deleteListClickHander()
  itemsEvents.checkBoxClickHander()
  listsEvents.editListClickHander()
  itemsEvents.editItemClickHandler()
  itemsEvents.chooseItemClickHandler()
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
