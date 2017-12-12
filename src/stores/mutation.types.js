// 设置 页面 device
export const SET_DEVICE = 'SET_DEVICE'

// 根据商铺获取首页配置
export const GET_STORE_HOMEPAGE = 'GET_STORE_HOMEPAGE'

// 默认进入路由 加载中loading 遮罩
export const UPDATE_LOADING = 'UPDATE_LOADING'

// 第一次进入加载loading 设置状态 别的时候 不加载loading
export const SET_FIRST_LOADING_STATE = 'SET_FIRST_LOADING_STATE'

// 闪送超市页面状态
export const MART_STATUS = 'MART_STATUS'
// 闪送超市 商品列表
export const MART_GOODS_LIST = 'MART_GOODS_LIST'
// 店铺状态
export const MART_STORE_STATUS = 'MART_STORE_STATUS'

// 购物车列表
export const GET_CART_LIST = 'GET_CART_LIST'

//  购物车更新状态
export const GET_CART_STATUS = 'GET_CART_STATUS'
// 购物车总数
export const GET_CART_COUNT = 'GET_CART_COUNT'
// 购物车对应商品ID 数量 key=spec_id, value=cartnum
export const GET_GOODS_CART = 'GET_GOODS_CART'

// ---------------订单相关------------------------
// 设置订单之前的购物车
export const SET_BEFORE_ORDERS_CART = 'SET_BEFORE_ORDERS_CART'

// 获取设置订单信息中 当前选中的地址
export const SET_ORDERS_CURRENT_ADRESS = 'SET_ORDERS_CURRENT_ADRESS'

// 获取设置订单信息中 当前订单的地址列表
export const SET_ORDERS_ADRESS_LIST = 'SET_ORDERS_ADRESS_LIST'

// 设置 订单详细 当前当地的起步价
export const SET_ORDERS_STEP_PRICE = 'SET_ORDERS_STEP_PRICE'

// 存储 当前配送方式
export const SET_ORDERS_SHIPPING_LIST = 'SET_ORDERS_SHIPPING_LIST'

// 存储 当前的支付方式
export const SET_ORDERS_PAY_MENTMODES = 'SET_ORDERS_PAY_MENTMODES'
// 存储 当时订单是否使用折扣
export const SET_ORDERS_IS_CREDIT = 'SET_ORDERS_IS_CREDIT'
// 更新 订单备注
export const UPDATE_ORDERS_REMARK = 'UPDATE_ORDERS_REMARK'

// 提交订单购物车 ids
export const GET_ORDER_CART_IDS = 'GET_ORDER_CART_IDS'
// --------------订单相关end-------------------------

// 新增或修改收货地址
export const GET_ADDRESS_LNG_LAT = 'GET_ADDRESS_LNG_LAT'
export const GET_ADDRESS_CITYNAME = 'GET_ADDRESS_CITYNAME'
export const ADDRESS_CITYNAME_SELECT = 'ADDRESS_CITYNAME_SELECT'
