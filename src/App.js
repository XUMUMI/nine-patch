import { draw9PatchImage } from './nine-patch.js'

export default {
  data() {
    return {
      url: '../assets/images/test.9.png',
      isResizing: false,
      startX: 0,
      startY: 0,
      startWidth: 0,
      startHeight: 0,
      showContent: false
    }
  },
  mounted() {
    document.addEventListener('mousedown', this.mouseDown)
    document.addEventListener('mousemove', this.mouseMove)
    document.addEventListener('mouseup', this.mouseUp)
    draw9PatchImage(this.$refs['nine-patch'], this.url).then();
  },
  methods: {
    mouseDown(e) {
      if(e.target === this.$refs.corner) {
        const element = this.$refs['nine-patch']
        this.startX = e.clientX
        this.startY = e.clientY
        this.startWidth = element.clientWidth
        this.startHeight = element.clientHeight
        this.isResizing = true
      }
    },
    mouseMove(e){
      if (this.isResizing) {
        const element = this.$refs['nine-patch'];
        const width = this.startWidth + e.clientX - this.startX;
        const height = this.startHeight + e.clientY - this.startY;
        element.style.width = width + 'px';
        element.style.height = height + 'px';
        draw9PatchImage(element, this.url).then()
      }
    },
    mouseUp() {
      this.isResizing = false;
    }
  }
}
