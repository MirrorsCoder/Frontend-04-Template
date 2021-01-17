// 方案一
// setInterval(() => {}, 16)
// 方案二
// let tick = () => {
//     setTimeout(tick, 16)
// }
// 方案三
// let tick = () => {
//     // raf 申请浏览器执行下一帧的时候，来执行代码
//     let handler = requestAnimationFrame(tick)
//     cancelAnimationFrame(handler)
// }

// 私有限制访问，通过Symbol隐藏
// animation.js之外都无法访问
const TICK = Symbol('tick')
const TICK_HANDLER = Symbol('tick-handler')
const ANIMATION = Symbol('animations')
const START_TIME = Symbol('start-time')
const PAUSE_START = Symbol('pause-start')
const PAUSE_TIME = Symbol('pause-time')

export class TimeLine {
  constructor() {
    this.state = 'Inited'
    this[ANIMATION] = new Set()
    this[START_TIME] = new Map()
  }
  start() {
    if (this.state !== 'Inited') return
    this.state = 'started'
    let startTime = Date.now()
    this[PAUSE_TIME] = 0
    this[TICK] = () => {
      // console.log('tick')
      let now = Date.now()
      for (let animation of this[ANIMATION]) {
        let t
        if (this[START_TIME].get(animation) < startTime)
          t = now - startTime - this[PAUSE_TIME] - animation.delay
        else
          t =
            now -
            this[START_TIME].get(animation) -
            this[PAUSE_TIME] -
            animation.delay
        if (animation.duration < t) {
          this[ANIMATION].delete(animation)
          t = animation.duration
        }
        if (t > 0) animation.receive(t)
      }
      this[TICK_HANDLER] = requestAnimationFrame(this[TICK])
    }
    this[TICK]()
  }

  // 播放速率
  // set rate(){}
  // get rate(){}

  // 暂停
  pause() {
    if (this.state !== 'started') return
    this.state = 'paused'
    this[PAUSE_START] = Date.now()
    cancelAnimationFrame(this[TICK_HANDLER])
  }
  // 恢复
  resume() {
    if (this.state !== 'paused') return
    this.state = 'started'
    this[PAUSE_TIME] += Date.now() - this[PAUSE_START]
    this[TICK]()
  }

  // 重置
  reset() {
    this.pause()
    this.state = 'Inited'
    let startTime = Date.now()
    this[PAUSE_TIME] = 0
    this[ANIMATION] = new Set()
    this[START_TIME] = new Map()
    this[TICK_HANDLER] = null
    this[PAUSE_START] = 0
  }

  // 添加
  add(animation, startTime) {
    if (arguments.length < 2) {
      startTime = Date.now()
    }
    this[ANIMATION].add(animation)
    this[START_TIME].set(animation, startTime)
  }
}

export class Animation {
  /**
   *
   * @param {*} object 对象
   * @param {*} property 属性
   * @param {*} startValue 起始值
   * @param {*} endValue 终止值
   * @param {*} duration 时长
   * @param {*} delay 延时
   * @param {*} timingFunction 差值函数
   * @param {*} template 模版函数
   */
  constructor(
    object,
    property,
    startValue,
    endValue,
    duration,
    delay,
    timingFunction,
    template
  ) {
    timingFunction = timingFunction || ((v) => v)
    template = template || ((v) => v)
    this.object = object
    this.property = property
    this.startValue = startValue
    this.endValue = endValue
    this.duration = duration
    this.delay = delay
    this.timingFunction = timingFunction
    this.template = template
  }
  receive(time) {
    // console.log(time)
    let range = this.endValue - this.startValue
    // 进展
    let progress = this.timingFunction(time / this.duration)
    this.object[this.property] = this.template(
      this.startValue + range * progress
    )
  }
}
