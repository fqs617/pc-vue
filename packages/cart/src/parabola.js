import assign from 'lodash.assign'
import {isUndefined} from '@/utils/utils'
import {requestAnimationFrame, cancelAnimationFrame} from '@/utils/request.animation.frame'
const DefaultOptions = {
  el: null,
  // 偏移位置
  offset: [0, 0],
  // 终点元素 这时就会自动获取该元素的left、top，设置了这个参数，offset将失效
  targetEl: null,
  // 运动的时间，默认500毫秒
  duration: 500,
  // 每帧移动的像素大小，每帧（对于大部分显示屏）大约16~17毫秒
  speed: 166.67,
  // 抛物线曲率，就是弯曲的程度，越接近于0越像直线，默认0.001
  curvature: 0.001,
  // 运动后执行的回调函数
  complete: null,
  // 是否自动开始，默认为false
  autostart: false,
  // 运动过程中执行的回调函数
  stepCallback: null,
  // 自动属性 设置了自动属性 传入的 speed 和 curvature 的将 失效
  autoAttr: true,
  // 滚动的容器
  body: document.documentElement || document.body,
  // 购物车类型
  type: 'default'
}
/**
 *
 * 抛物线
 * @class Parabola
 */
class Parabola {
  constructor(options = DefaultOptions) {
    this.opts = assign(DefaultOptions, options)
    // 根据两点坐标以及曲率确定运动曲线函数（也就是确定a, b的值）
    this.a = this.opts.curvature
    this.b = 0
    this.c = 0
    // 是否执行运动的标志量
    this.flagMove = true
    // 移动元素的中心点位置
    this.centerElement = {}
    // 目标元素的中心点位置
    this.centerTarget = {}
    // 移动元素的坐标位置
    this.coordElement = {}
    // 目标元素的坐标位置
    this.coordTarget = {}
    // 自动开始
    if (this.opts.autostart) {
      this.init()
    }
  }

  /**
   * 标注当前元素的坐标
   * @memberof Parabola
   */
  mark() {
    if (this.flagMove === false) return this
    if (isUndefined(this.coordElement.x)) {
      this.position()
    }
    return this
  }

  position() {
    if (this.flagMove === false) return this
    this.domoveEl()
    let opts = this.opts
    // 移动元素的中心点坐标
    this.centerElement = this.getCenterXY(opts.el)
    this.setStyle(this.centerElement.x, this.centerElement.y)
    // 是否自动换算抛物线和 运动speed
    if (opts.autoAttr) {
      this.animateParabola(this.centerElement)
    }
    // 目标元素的中心点位置
    let targetEl = opts.targetEl
    if (targetEl) {
      this.centerTarget = this.getCenterXY(targetEl)
    } else {
      this.centerTarget = {
        x: opts.offset[0],
        y: opts.offset[1]
      }
    }
    // 转换成相对坐标位置
    this.coordElement = {x: 0, y: 0}
    this.coordTarget = {
      x: -1 * (this.centerElement.x - this.centerTarget.x) - 5,
      y: (-1 * (this.centerElement.y - this.centerTarget.y)) - 3
    }
    /*
    * 因为经过(0, 0), 因此c = 0
    * 于是：
    * y = a * x*x + b*x;
    * y1 = a * x1*x1 + b*x1;
    * y2 = a * x2*x2 + b*x2;
    * 利用第二个坐标：
    * b = (y2+ a*x2*x2) / x2
    */
    this.b = (this.coordTarget.y - this.a * this.coordTarget.x * this.coordTarget.x) / this.coordTarget.x
    return this
  }

  /**
   *
   * 按照这个曲线运动
   *
   * @memberof Parabola
   */
  move() {
    if (this.flagMove === false) return this
    this.startX = 0
    this.rate = this.coordTarget.x > 0 ? 1 : -1
    if (this.timeId) {
      cancelAnimationFrame(this.timeId)
    }
    this.timeId = requestAnimationFrame(this.step.bind(this))
    this.flagMove = false
  }

  step() {
    let opts = this.opts
    let startX = this.startX
    let rate = this.rate
    let a = this.a
    let b = this.b
    // 切线 y'=2ax+b
    let tangent = 2 * a * startX + b
    // 下面是根据确定的移动速度，得到当前切线下x也就是水平方向移动的大小
    // 已知两点之间的距离为
    // Math.sqrt((x2-x1) * (x2-x1) + (y2-y1) * (y2-y1));
    // 因此应当是
    // Math.sqrt(△x*△x + △y*△y) = speed
    // y*y + x*x = speed
    // (tangent * x)^2 + x*x = speed
    // x = Math.sqr(speed / (tangent * tangent + 1));
    this.startX = startX = startX + rate * Math.sqrt(opts.speed / (tangent * tangent + 1))
    let coordTarget = this.coordTarget
    let coordTargetX = coordTarget.x
    // 防止过界
    if ((rate === 1 && startX > coordTargetX) || (rate === -1 && startX < coordTargetX)) {
      this.startX = coordTargetX
    }
    let x = startX
    let y = this.a * x * x + b * x
    // x, y目前是坐标，需要转换成定位的像素值
    this.$domoveEl.style.transform = `translate(${x}px, ${y}px)`
    //  运动中
    if ((rate === 1 && startX < coordTargetX) || (rate === -1 && startX > coordTargetX)) {
      opts.stepCallback && opts.stepCallback(x, y)
      this.timeId = requestAnimationFrame(this.step.bind(this))
    } else {
      // 运动结束，回调执行
      opts.complete && opts.complete.call(this)
      // this.flagMove = true
      cancelAnimationFrame(this.timeId)
      this.$domoveEl.remove()
    }
  }

  /**
   * 生成抛物线红点
   * @memberof Parabola
   */
  domoveEl() {
    this.$domoveEl = this.$domoveEl || document.createElement('div')
    this.$domoveEl.className = 'bq-cart-domove-content'
    this.$domoveEl.style.transform = `translate(0, 0)`
    document.body.appendChild(this.$domoveEl)
  }

  setStyle(left, top) {
    this.$domoveEl.style.left = `${left}px`
    this.$domoveEl.style.top = `${top}px`
  }

  /**
   *
   * 获取中心点位置
   *
   * @memberof Parabola
   */
  getCenterXY(el) {
    let elRect = el.getBoundingClientRect()
    return {
      x: elRect.left + (elRect.right - elRect.left) / 2,
      y: elRect.top + (elRect.bottom - elRect.top) / 2
    }
  }

  destory() {
    this.$domoveEl && this.$domoveEl.remove()
    this.timeId && cancelAnimationFrame(this.timeId)
  }

  init() {
    this.position().mark().move()
  }

  // 自动运算抛物线的 幅度值 和 动画zeng
  animateParabola(elCenter) {
    let {x, y} = elCenter
    console.log(y)
    switch (true) {
      case y <= 200:
        this.setCurvature(x, 260, this.getCurvatureByType({footer: 0.16, template: 0.02}))
        break
      case y > 200 && y < 300:
        this.setCurvature(x, 240, this.getCurvatureByType({footer: 0.14, template: 0.018}))
        break
      case y > 300 && y <= 400:
        this.setCurvature(x, 220, this.getCurvatureByType({footer: 0.12, template: 0.016}))
        break
      case y > 400 && y <= 500:
        this.setCurvature(x, 200, this.getCurvatureByType({footer: 0.1, template: 0.014}))
        break
      case y > 500 && y <= 600:
        this.setCurvature(x, 180, this.getCurvatureByType({footer: 0.08, template: 0.012}))
        break
      case y > 600 && y <= 700:
        this.setCurvature(x, 160, this.getCurvatureByType({footer: 0.06, template: 0.01}))
        break
      default:
        this.a = 0.002
        break
    }
  }

  /**
   *
   * 根据类型获取 抛物线曲率
   * @param {any} curvatures 抛物曲线类 集合 {footer: 0.001,template: 0.002}
   * @returns {number} curvature
   *
   * @memberof Parabola
   */
  getCurvatureByType(curvatures) {
    let type = this.opts.type
    // 因为模板页 和 cate 页 等 购物车图标 不在一个位置 所以需要单独换算 坐标
    if (type === 'template2') {
      return curvatures['template']
    }
    return curvatures[type] || 0.001
  }

  /**
   *
   * 抛物线曲率，就是弯曲的程度，越接近于0越像直线，默认0.001
   * @param {any} x 当前所在位置的 横坐标
   * @param {number} [speed] 每帧移动的像素大小，每帧（对于大部分显示屏）大约16~17毫秒
   * @param {number} [curvature=0.001] 抛物线曲率 大于290 是 curvature/2 + 0.001
   *
   * @memberof Parabola
   */
  setCurvature(x, speed, curvature = 0.001) {
    let sWin = window.screen.width
    let halfWidth = Math.round(sWin / 2)
    let _speed = speed
    switch (true) {
      case x <= halfWidth:
        this.a = curvature.toFixed(3)
        break
      case x >= halfWidth - 10 :
        let c
        switch (this.opts.type) {
          case 'footer':
            c = ((curvature / 2) - 0.016)
            break
          case 'template':
            c = curvature * 100 + 0.116
            _speed -= 80
            break
          case 'template2':
            c = curvature * 50
            _speed -= 60
            break
        }
        this.a = c.toFixed(3)
        break
    }
    this.opts.speed = _speed
    console.info('curvature', this.a)
  }
}

export default Parabola
