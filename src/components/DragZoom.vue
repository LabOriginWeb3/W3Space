<template>
  <div ref="xx-drag-zoom" class="xx-drag-zoom" :style="dragZoomNodeStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "xx-drag-zoom",
  components: {},
  props: {
    left: {
      type: Number,
      default: 0,
    },
    top: {
      type: Number,
      default: 0,
    },
    width: Number,
    height: Number,
    allowZoom: Boolean,
    zoom: {
      type: Number,
      default: 1,
    },
    count: {
      type: Number,
      default: 1,
    },
    maxZoom: {
      type: Number,
      default: 2,
    },
    minZoom: {
      type: Number,
      default: 0.5,
    },
    range: {
      type: Number,
      default: 0.1,
    },
    areaNode: HTMLDivElement,
    areaLeft: {
      type: Number,
      default: 0,
    },
    areaTop: {
      type: Number,
      default: 0,
    },
    areaWidth: {
      type: Number,
      default: 200,
    },
    areaHeight: {
      type: Number,
      default: 100,
    },
  },
  data() {
    return {
      currentZoom: this.zoom,
      initLeft: this.left,
      initTop: this.top,
    };
  },
  computed: {
    dragZoomNode() {
      return this.$refs["xx-drag-zoom"];
    },

    areaNodeData() {
      let obj = {};
      const node = this.areaNode;

      if (node) {
        obj = {
          left: node.clientLeft,
          top: node.clientTop,
          width: node.offsetWidth,
          height: node.offsetHeight,
        };
      } else {
        obj = {
          left: this.areaLeft,
          top: this.areaTop,
          width: this.areaWidth,
          height: this.areaHeight,
        };
      }

      return obj;
    },

    dragZoomNodeStyle() {
      return {
        transform: `scale(${this.currentZoom})`,
        left: `${this.initLeft}px`,
        top: `${this.initTop}px`,
        width: this.width + "px",
        height: this.height + "px",
      };
    },
  },
  watch: {
    zoom(val) {
      this.currentZoom = val;
      this.initStyle();
    },
    count(val) {
      console.log(val);
      this.currentZoom = 3;
      setTimeout(() => {
        this.initStyleZoom();
      }, 500);
    },
  },
  created() {},
  mounted() {
    this.dragZoomNode.addEventListener("mousedown", this.mousedown);
    this.dragZoomNode.addEventListener("wheel", this.mousescroll);

    this.initStyle();
  },
  beforeDestroy() {
    this.dragZoomNode.removeEventListener("mousedown", null);
    this.dragZoomNode.removeEventListener("wheel", null);
  },
  methods: {
    mousedown(evt) {
      const {
        // left: areaL,
        // top: areaT,
        width: areaW,
        height: areaH,
      } = this.areaNodeData;
      const {
        offsetLeft: dragL,
        offsetTop: dragT,
        offsetWidth: dragW,
        offsetHeight: dragH,
      } = this.dragZoomNode;
      const x = evt.clientX - dragL;
      const y = evt.clientY - dragT;

      document.onmousemove = (evt) => {
        const zoom = this.currentZoom;
        let styleL = evt.clientX - x;
        let styleT = evt.clientY - y;

        if (dragW * zoom < areaW) {
          const boundaryL = (dragW * zoom - dragW) / 2;
          const boundaryR = areaW - (dragW + boundaryL);

          if (styleL < boundaryL) {
            styleL = boundaryL;
          }

          if (styleL > boundaryR) {
            styleL = boundaryR;
          }
        } else {
          const boundaryL = (dragW * zoom - dragW) / 2;
          const boundaryR = -(dragW * zoom - areaW - boundaryL);

          if (styleL > boundaryL) {
            styleL = boundaryL;
          }

          if (styleL < boundaryR) {
            styleL = boundaryR;
          }
        }

        if (dragH * zoom < areaH) {
          const boundaryT = (dragH * zoom - dragH) / 2;
          const boundaryB = areaH - (dragH + boundaryT);

          if (styleT < boundaryT) {
            styleT = boundaryT;
          }

          if (styleT > boundaryB) {
            styleT = boundaryB;
          }
        } else {
          const boundaryT = (dragH * zoom - dragH) / 2;
          const boundaryB = -(dragH * zoom - areaH - boundaryT);

          if (styleT > boundaryT) {
            styleT = boundaryT;
          }

          if (styleT < boundaryB) {
            styleT = boundaryB;
          }
        }

        this.dragZoomNode.style.left = styleL + "px";
        this.dragZoomNode.style.top = styleT + "px";

        this.$emit("mousemove", evt);
      };
      document.onmouseup = () => {
        document.onmousemove = null;
      };
    },

    mousescroll(evt) {
      if (evt.preventDefault) {
        evt.preventDefault();
      } else {
        evt.returnValue = false;
      }

      const { deltaY } = evt;
      const {
        left: areaL,
        top: areaT,
        width: areaW,
        height: areaH,
      } = this.areaNodeData;
      const {
        offsetLeft: dragL,
        offsetTop: dragT,
        offsetWidth: dragW,
        offsetHeight: dragH,
      } = this.dragZoomNode;
      let zoom = this.currentZoom;

      if (!this.allowZoom) {
        return;
      }

      if (deltaY < 0) {
        if (zoom >= this.maxZoom) {
          return;
        }

        zoom += this.range;
      } else {
        if (zoom <= this.minZoom) {
          return;
        }

        zoom -= this.range;
      }

      this.currentZoom = Number(zoom.toFixed(1));
      this.$emit("setCurrentZoom", this.currentZoom);

      const subtractW = (dragW * this.currentZoom - dragW) / 2;
      const subtractH = (dragH * this.currentZoom - dragH) / 2;
      const currentL = dragL - subtractW;
      const currentT = dragT - subtractW;
      const currentR = dragL + dragW + subtractW;
      const currentB = dragT + dragH + subtractH;

      if (dragW * zoom < areaW) {
        if (currentL < areaL) {
          this.dragZoomNode.style.left = areaL + subtractW + "px";
        }

        if (currentR > areaW) {
          this.dragZoomNode.style.left = areaW - dragW - subtractW + "px";
        }
      } else {
        if (currentL > areaL) {
          this.dragZoomNode.style.left = areaL + subtractW + "px";
        }

        if (currentR < areaW) {
          this.dragZoomNode.style.left = areaW - dragW - subtractW + "px";
        }
      }

      if (dragH * zoom < areaH) {
        if (currentT < areaT) {
          this.dragZoomNode.style.top = areaT + subtractH + "px";
        }

        if (currentB > areaH) {
          this.dragZoomNode.style.top = areaH - dragH - subtractH + "px";
        }
      } else {
        if (currentT > areaT) {
          this.dragZoomNode.style.top = areaT + subtractH + "px";
        }
        if (currentB < areaH) {
          this.dragZoomNode.style.top = areaH - dragH - subtractH + "px";
        }
      }

      this.$emit("mousescroll", evt);
    },

    initStyle() {
      let tmpLeft = this.left;
      let tmpTop = this.top;
      const { offsetWidth: dragW, offsetHeight: dragH } = this.dragZoomNode;
      tmpLeft = this.left - (dragW * (1 - this.zoom)) / 3;
      tmpTop = this.left - (dragH * (1 - this.zoom)) / 6;
      this.initLeft = -tmpLeft;
      this.initTop = -tmpTop;
      this.dragZoomNode.style.transition="0s"
    },
    initStyleZoom() {
      let tmpLeft = this.left;
      let tmpTop = this.top;
      const { offsetWidth: dragW, offsetHeight: dragH } = this.dragZoomNode;
      tmpLeft = this.left - (dragW * (1 - this.zoom)) / 3;
      tmpTop = this.left - (dragH * (1 - this.zoom)) / 6;
      this.dragZoomNode.style.left = -tmpLeft + "px";
      this.dragZoomNode.style.top = -tmpTop + "px";
      //transition: "1.2s",
      this.dragZoomNode.style.transition="1.2s"
    },
  },
};
</script>

<style scoped>
.xx-drag-zoom {
  position: absolute;
  user-select: none;
  left: -66vw;
  top: -26vh;
  cursor: url("../assets/cursor/5.png");
}
</style>
