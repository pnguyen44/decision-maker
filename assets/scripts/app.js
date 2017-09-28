'use strict'
const store = require('./store')

const chooseItem = function (items) {
  const unMarkedItems = items.filter((items) => {
    return items.mark === false
  })

  const numOfItems = unMarkedItems.length
  const itemPosition = Math.floor(Math.random() * numOfItems) + 1
  const choosenItem = unMarkedItems[itemPosition - 1].name
  $('#item-choose-list-id-' + store.chooseItemListId).val(choosenItem)
}

module.exports = {
  chooseItem
}
