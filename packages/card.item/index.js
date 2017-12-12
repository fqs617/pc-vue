import CardItem from '../card/src/card.item.vue'

CardItem.install = function(Vue) {
  Vue.component(CardItem.name, CardItem)
}

export default CardItem
