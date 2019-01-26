import React from "react"

class HomePageBackground extends React.PureComponent {
  constructor(props) {
    super(props)
    this.mousePos = {
      x: -10,
      y: -10
    }
    this.resize()
  }
  resize() {
    window.onresize = () => {
      this.initCtx()
      this.__initDots()
    }
  }
  render() {
    return <canvas id="canvas" style={{ position: "fixed", zIndex: -1 }} />
  }
  initCtx() {
    this.WIDTH = document.documentElement.clientWidth
    this.HEIGHT = document.documentElement.clientHeight
    const canvas = document.getElementById("canvas")
    canvas.height = this.HEIGHT
    canvas.width = this.WIDTH
    this.ctx = canvas.getContext("2d")
    this.config = {
      dotsNum: 30,
      minDistance: this.WIDTH < 800 ? 100 : 200,
      lineClor: "#000"
    }
  }
  initAnimation() {
    // 初始原点
    this.__initDots()
    // 绑定鼠标事件
    window.onmousemove = e => {
      this.mousePos.x = e.clientX
      this.mousePos.y = e.clientY
    }
    this.__animation()
  }
  __animation() {
    // 清空
    this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT)
    // 改变位置
    this.__changeDots()
    // 绘制线
    this.__drawLine()
    this.ani = window.requestAnimationFrame(this.__animation.bind(this))
  }
  __initDots() {
    this.dots = []
    for (let i = 0; i < this.config.dotsNum; i++) {
      this.dots.push({
        x: Math.floor(Math.random() * this.WIDTH),
        y: Math.floor(Math.random() * this.HEIGHT),
        speedX: Math.floor((Math.random() - 0.5) * 5),
        speedY: Math.floor((Math.random() - 0.5) * 5),
        lineClor: "hsl(" + Math.floor(Math.random() * 360) + ",100%,80%)"
      })
    }
  }
  __changeDots() {
    this.dots.forEach(dot => {
      dot.x = dot.x + dot.speedX
      dot.y = dot.y + dot.speedY
      // 处理边界情况
      if (dot.x > this.WIDTH) {
        dot.speedX = -dot.speedX
      } else if (dot.x < 0) {
        dot.speedX = -dot.speedX
      }
      if (dot.y > this.HEIGHT) {
        dot.speedY = -dot.speedY
      } else if (dot.y < 0) {
        dot.speedY = -dot.speedY
      }
    })
  }
  __drawLine() {
    // 循环计算距离进行连线
    const currentDots = this.dots.concat(this.mousePos)
    currentDots.forEach(fDot => {
      currentDots.forEach(tDot => {
        const disX = fDot.x - tDot.x
        const disY = fDot.y - tDot.y
        // 如果小于最小距离则进行连线
        if (fDot.type === "mouse" && disX * disX + disY * disY < 2000) {
          let disX = tDot.x - fDot.x
          let disY = tDot.y - fDot.y
          tDot.speedX = disX / 10
          tDot.speedY = disY / 10
        }
        if (
          disX * disX + disY * disY <
          this.config.minDistance * this.config.minDistance
        ) {
          this.ctx.beginPath()
          this.ctx.moveTo(fDot.x, fDot.y)
          this.ctx.lineTo(tDot.x, tDot.y)
          this.ctx.strokeStyle = tDot.lineClor
          this.ctx.stroke()
          // 如果是鼠标则进行
        }
      })
    })
  }
  componentDidMount() {
    this.initCtx()
    this.initAnimation()
  }
  componentWillUnmount() {
    window.onmousemove = null
    window.cancelAnimationFrame(this.ani)
    window.onresize = null
  }
}
export default HomePageBackground
