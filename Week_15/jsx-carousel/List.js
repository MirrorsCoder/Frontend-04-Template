import { Component, STATE, ATTRIBUTE, createElement } from './framework'
import { enableGesture } from './gesture'
// 便于其他组件继承Carousel使用状态
export { STATE, ATTRIBUTE } from './framework'

export class List extends Component {
  constructor() {
    super()
  }
  render() {
    this.children = this[ATTRIBUTE].data.map(this.template)
    this.root = (<div>{this.children}</div>).render()
    return this.root
  }
  appendChild(child) {
    this.template = child
    this.render()
  }
}
