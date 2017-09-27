'use strict'
const getFormFields = require('../../../lib/get-form-fields')
const listsApi = require('./api')
const listsUi = require('./ui')
// const getFormFields = require('../../../lib/get-form-fields')
// const store = require('../store')

const onCreateList = function (event) {
  event.preventDefault()
  console.log('i am here in create list')
  const data = getFormFields(this)
  console.log('onCreateList data =', data)
  const list = data.list
  console.log('onCreateList=', list.name)
  listsApi.create(list.name)
    .then(listsUi.onCreateSuccess)
    .catch(listsUi.onError)
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

const onUpdateList = function (name, id) {
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
  // $('.create-list').on('sumbit', function (e) {
  //   e.preventDefault()
  // })
  $('#create-list-form').on('submit', onCreateList)
  // $('.btn-test').on('click', function () {
  //   console.log('thest')
    // getLists()
    // onUpdateList('updating now', 10)
  // })
}

// module.exports = {
//   onCreateGame,
//   onUpdateGame,
//   getOneGame,
//   getList,
//   addHandlers,
//   test
// }

exports.onCreateList = onCreateList
exports.onUpdateList = onUpdateList
exports.getOneList = getOneList
exports.getLists = getLists
exports.addHandlers = addHandlers
exports.onDeleteList = onDeleteList
