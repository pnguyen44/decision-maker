const config = require('../config')
const store = require('../store')

const index = function () {
  return $.ajax({
    url: config.apiOrigin + '/lists',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const show = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/lists/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const create = function (name) {
  return $.ajax({
    url: config.apiOrigin + '/lists',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'list': {
        'name': name
      }
    }
  })
}
const update = function (name, id) {
  // id = 9
  return $.ajax({
    url: config.apiOrigin + '/lists/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      list: {
        'name': name
      }
    }
  })
}

const destroy = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/lists/' + id,
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
