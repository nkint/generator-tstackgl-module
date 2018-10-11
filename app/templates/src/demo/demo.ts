import { createFit } from 'canvas-fit-margin-ts'

const scale = window.devicePixelRatio || 1
const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')
const fit = createFit(canvas, { scale })
document.body.style.margin = '0'
document.querySelector('.canvas-container').appendChild(canvas)

function render(width: number, height: number) {
  console.log('render')
}

const onResize = () => {
  const [width, height] = fit()
  render(width * scale, height * scale)
}

onResize()
window.addEventListener('resize', onResize)

if ((module as any).hot) {
  ;(module as any).hot.dispose(() => canvas.remove())
}
