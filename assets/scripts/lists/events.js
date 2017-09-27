'use strict'
const getFormFields = require('../../../lib/get-form-fields')
const listsApi = require('./api')
const listsUi = require('./ui')
// const listsEvents = require('./events')
// const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')

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

// const onUpdateList = function () {
//   // e.preventDefault()
//   console.log('i am here in update list')
//   const data = getFormFields(this)
//   console.log('onUpdateList2 data = ', data)
//   const list = data.list
//   console.log('onUpdateList2 list=', list.name)
//   listsApi.update(list.name, store.listId)
//     .then(listsUi.onUpdateSuccess)
//     .catch(listsUi.onError)
// }

const getLists = function () {
  console.log('getList function')
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
  // $('.create-list').on('sumbit', function (e) {
  //   e.preventDefault()
  // })
  $('#create-list-form').on('submit', onCreateList)
  $('#edit-list-form').on('submit', function (e) {
    e.preventDefault()
    const listId = store.listId
    // const listName = $(this).attr('data-list-edit-name')
    console.log('listId=', listId)
    const data = getFormFields(this)
    store.list = data.list
    // console.log('listName=', listName)
    // $('.edit-list-input').val(listName)
    // const updatedName = $('.edit-list-input').val()
    // console.log('updateName = ', updatedName)
    // $('form').trigger('reset')
    updateList(store.list.name, listId)
  })
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
// exports.onUpdateList = onUpdateList
exports.getOneList = getOneList
exports.getLists = getLists
exports.addHandlers = addHandlers
exports.onDeleteList = onDeleteList
exports.updateList = updateList
