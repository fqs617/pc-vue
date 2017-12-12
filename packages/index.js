import { Lazyload, Spinner, Toast, Actionsheet, Switch, Indicator } from 'mint-ui'

import Card from './card'
import CardContent from './card.content'
import CardHeader from './card.header'
import CardItem from './card.item'
import DateTimePicker from './datetime'
import Picker from './picker'
import Select from './select'
import Sliding from './sliding'
import SlidingOption from './sliding.option'
import WxUpload from './wx.upload'
import Button from './button'
import Content from './content'
import Loading from './loading'
import Modal from './modal'
import Header from './header'
import TripleBounce from './triple.bounce'
import Prompt from './prompt'
import Empty from './empty'
import Page from './page'

import InfiniteScroll from './infinite.scroll'
import Messagebox from './messagebox'
import Pay from './pay'
import Select$ from './select$'
import ClickOutside from './click.outside'

// 购物车动画类库
import Parabola from './cart/src/parabola'

const VERSION = '0.0.1'

const install = function(Vue, _opts = {}) {
  if (install.installed) return

  Vue.component('bq-switch', Switch)
  Vue.component('bq-action-sheet', Actionsheet)
  Vue.component('bq-spinner', Spinner)
  Vue.component(Card.name, Card)
  Vue.component(CardContent.name, CardContent)
  Vue.component(CardHeader.name, CardHeader)
  Vue.component(CardItem.name, CardItem)
  Vue.component(DateTimePicker.name, DateTimePicker)
  Vue.component(Picker.name, Picker)
  Vue.component(Select.name, Select)
  Vue.component(Sliding.name, Sliding)
  Vue.component(SlidingOption.name, SlidingOption)
  Vue.component(WxUpload.name, WxUpload)
  Vue.component(Button.name, Button)
  Vue.component(Content.name, Content)
  Vue.component(Loading.name, Loading)
  Vue.component(Modal.name, Modal)
  Vue.component(Header.name, Header)
  Vue.component(TripleBounce.name, TripleBounce)
  Vue.component(Prompt.name, Prompt)
  Vue.component(Empty.name, Empty)
  Vue.component(Page.name, Page)

  Vue.use(InfiniteScroll)
  Vue.use(Messagebox)
  Vue.use(Pay)
  Vue.use(Select$)
  Vue.use(ClickOutside)

  Vue.use(Lazyload, {
    error: 'http://ogd5wcvme.bkt.clouddn.com/no-img.png',
    loading: 'http://static.js.bqmart.cn/static/img/l.gif',
    attempt: 1,
    preLoad: 300,
    try: 3
  })

  Vue.$toast = Vue.prototype.$toast = Toast
  Vue.$indicator = Vue.prototype.$indicator = Indicator
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: VERSION,
  install,
  Card,
  CardContent,
  CardHeader,
  CardItem,
  DateTimePicker,
  Picker,
  Select,
  Sliding,
  SlidingOption,
  WxUpload,
  Button,
  Content,
  Loading,
  Modal,
  Header,
  TripleBounce,
  Prompt,
  Empty,
  Page,
  Switch,
  Spinner,
  Actionsheet,
  Parabola,
  InfiniteScroll,
  Messagebox,
  Pay,
  Select$,
  ClickOutside,
  Lazyload,
  Toast,
  Indicator
}
