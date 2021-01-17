let element = document.documentElement

// 处理监听
let isListeningMouse = false

element.addEventListener('mousedown', (event) => {
  // 鼠标不同键的值不同
  // console.log(event.button);

  let context = Object.create(null)
  contexts.set('mouse' + (1 << event.button), context)

  start(event, context)
  let mousemove = (event) => {
    // console.log(event.clientX, event.clientY)
    // event.buttons 掩码 0b11111 -> 5个键都按下

    let button = 1
    while (button <= event.buttons) {
      // 按键按下触发
      if (button & event.buttons) {
        /**
         * 【坑】
         * event.buttons里的顺序与event.button的顺序有区别
         * 第二位和第三位刚好相反
         * order of buttons & button property is not same
         */
        let key
        if (button === 2) key = 4
        else if (button === 4) key = 2
        else key = button

        let context = contexts.get('mouse' + key)
        move(event, context)
      }
      button = button << 1
    }
  }
  let mouseup = (event) => {
    let context = contexts.get('mouse' + (1 << event.button))
    end(event, context)
    contexts.delete('mouse' + (1 << event.button))
    if (event.buttons === 0) {
      document.removeEventListener('mousemove', mousemove)
      document.removeEventListener('mouseup', mouseup)
      isListeningMouse = false
    }
  }
  if (!isListeningMouse) {
    document.addEventListener('mousemove', mousemove)
    document.addEventListener('mouseup', mouseup)
    isListeningMouse = true
  }
})

let contexts = new Map()

element.addEventListener('touchstart', (event) => {
  for (let touch of event.changedTouches) {
    // console.log('start', touch.clientX, touch.clientY)
    let context = Object.create(null)
    contexts.set(touch.identifier, context)
    start(touch, context)
  }
})
element.addEventListener('touchmove', (event) => {
  for (let touch of event.changedTouches) {
    // console.log('move', touch.clientX, touch.clientY)
    let context = contexts.get(touch.identifier)
    move(touch, context)
  }
})
element.addEventListener('touchend', (event) => {
  for (let touch of event.changedTouches) {
    // console.log('end', touch.clientX, touch.clientY)
    let context = contexts.get(touch.identifier)
    end(touch, context)
    contexts.delete(touch.identifier)
  }
})
// touch的点以一种异常模式结束(例如：alert打断)
element.addEventListener('touchcancel', (event) => {
  for (let touch of event.changedTouches) {
    // console.log('cancel', touch.clientX, touch.clientY)
    let context = contexts.get(touch.identifier)
    cancel(touch, context)
    contexts.delete(touch.identifier)
  }
})

let handler
let startX, startY
let isPan = false
let isTap = true
let isPress = false

// start 处理pressstart逻辑
let start = (point, context) => {
  // console.log('start', point.clientX, point.clientY)

  context.startX = point.clientX
  context.startY = point.clientY
  // flick事件，采用多点判断速度
  context.points = [
    {
      t: Date.now(),
      x: point.clientX,
      y: point.clientY,
    },
  ]

  context.isTap = true
  context.isPan = false
  context.isPress = false

  context.handler = setTimeout(() => {
    console.log('pressstart')
    context.isTap = false
    context.isPan = false
    context.isPress = true
    // 避免多次clear
    context.handler = null
  }, 500)
}
// move 处理panstart逻辑
let move = (point, context) => {
  // console.log('move', point.clientX, point.clientY)

  let dx = point.clientX - context.startX
  let dy = point.clientY - context.startY
  if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
    context.isTap = false
    context.isPan = true
    context.isPress = false
    console.log('panstart')
    clearTimeout(context.handler)
  }
  if (context.isPan) {
    console.log('pan')
    console.log(dx, dy)
  }

  // 放入新点时过滤
  context.points = context.points.filter((point) => Date.now() - point.t < 500)

  context.points.push({
    t: Date.now(),
    x: point.clientX,
    y: point.clientY,
  })
}
// end 处理tap逻辑
let end = (point, context) => {
  // console.log('end', point.clientX, point.clientY)

  if (context.isTap) {
    console.log('tap')
    dispatch('tap', { list: [1, 2, 3] })
    clearTimeout(context.handler)
  }
  if (context.isPan) {
    console.log('panend')
  }
  if (context.isPress) {
    console.log('pressend')
  }
  // 计算速度
  let d, v
  context.points = context.points.filter((point) => Date.now() - point.t < 500)
  if (!context.points.length) v = 0
  else {
    d =
      (point.clientX - context.points[0].x) ** 2 +
      (point.clientY - context.points[0].y) ** 2
    v = d / (Date.now() - context.points[0].t)
  }
  // 像素每毫秒
  if (v > 1.5) {
    console.log('flick')
    context.isFlick = true
  } else {
    context.isFlick = false
  }
  console.log('speed', v)
}
let cancel = (point, context) => {
  // console.log('cancel', point.clientX, point.clientY)

  clearTimeout(context.handler)
}

// 事件派发
function dispatch(type, properties) {
  let event = new Event(type)
  for (let name in properties) {
    event[name] = properties[name]
  }
  element.dispatchEvent(event)
}
