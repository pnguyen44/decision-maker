const config = require('../config')
const store = require('../store')

const index = function () {
  return $.ajax({
    url: config.apiOrigin + '/items',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const show = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/items/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const create = function (name, mark, listId) {
  return $.ajax({
    url: config.apiOrigin + '/items',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'item': {
        'name': name,
        'mark': mark,
        'list_id': listId
      }
    }
  })
}
const update = function (name, mark, itemId, listId) {
  return $.ajax({
    url: config.apiOrigin + '/items/' + itemId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      item: {
        'name': name,
        'mark': mark,
        'list_id': listId
      }
    }
  })
}

const destroy = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/items/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  create,
  update,
  index,
  show,
  destroy
}
