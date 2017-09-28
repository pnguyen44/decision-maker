'use strict'
const store = require('./store')
// const filterForUnMark = function (items) {
//   // const unMarkItem
// }

const chooseItem = function (items) {
  console.log('items=', items)
  const unMarkedItems = items.filter((items) => {
    return items.mark === false
  })
  console.log('unMarkedItems=', unMarkedItems)

  // const unMarkedItems = unMark.filter((obj)=> {
  //   return
  // })
  const numOfItems = unMarkedItems.length
  console.log('numOfItems=', numOfItems)
  const itemPosition = Math.floor(Math.random() * numOfItems) + 1
  console.log('itemPosition=', itemPosition)
  const choosenItem = unMarkedItems[itemPosition - 1].name
  console.log('itemChoosen  =', choosenItem)
  $('#item-choose-list-id-' + store.chooseItemListId).val(choosenItem)
}

module.exports = {
  chooseItem
}
