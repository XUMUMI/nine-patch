/* 修改该地址测试你的 .9.png
 * Modify the imageUrl to test your .9.png */
const imageUrl = './assets/images/test.9.png'

const element = document.getElementById('nine-patch')
const ninePatch = new NinePatch(imageUrl)

ninePatch.init().then(() => ninePatch.draw(element))

initContentToggle()
initResize()

function initContentToggle() {
  const checkbox = document.getElementById('checkbox')
  const content = document.getElementById('content')
  checkbox.addEventListener('change', (e) => content.style.display = e.target.checked ? 'block' : 'none')
}

function initResize() {
  let dw = 0, dh = 0
  let mouseDown = false
  const corner = document.getElementById('corner')
  corner.addEventListener('mousedown', (e) => {
    dw = element.clientWidth - e.clientX
    dh = element.clientHeight - e.clientY
    mouseDown = true
  })
  document.addEventListener('mousemove', (e) => {
    if (mouseDown) {
      element.style.width = `${dw + e.clientX}px`
      element.style.height = `${dh + e.clientY}px`
      ninePatch.draw(element)
    }
  })
  document.addEventListener('mouseup', () => mouseDown = false)
  document.addEventListener('mouseleave', () => mouseDown = false)
}
