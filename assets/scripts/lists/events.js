'use strict'
const getFormFields = require('../../../lib/get-form-fields')
const listsApi = require('./api')
const listsUi = require('./ui')
const store = require('../store')

const onCreateList = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  const list = data.list
  console.log('list name=', list.name)
  if (list.name.trim().length > 0) {
    listsApi.create(list.name)
      .then(listsUi.onCreateSuccess)
      .catch(listsUi.onError)
  }
}
const getLists = function () {
  listsApi.index()
    .then(listsUi.getListsSuccess)
    .catch(listsUi.onError)
}
const getOneList = function (id) {
  listsApi.show(id)
    .then(listsUi.getOneListSuccess)
    .catch(listsUi.onError)
}

const updateList = function (name, id) {
  listsApi.update(name, id)
    .then(listsUi.onUpdateSuccess)
    .catch(listsUi.onError)
}

const onDeleteList = function (id) {
  listsApi.destroy(id)
    .then(listsUi.onDeleteSuccess(id))
    .catch(listsUi.onError)
}

const addHandlers = function () {
  $('#create-list-form').on('submit', onCreateList)
  $('#edit-list-form').on('submit', function (e) {
    e.preventDefault()
    const listId = store.listId
    const data = getFormFields(this)
    store.list = data.list
    if (store.list.name.trim().length > 0) {
      updateList(store.list.name, listId)
    }
  })
}

exports.onCreateList = onCreateList
exports.getOneList = getOneList
exports.getLists = getLists
exports.addHandlers = addHandlers
exports.onDeleteList = onDeleteList
exports.updateList = updateList
