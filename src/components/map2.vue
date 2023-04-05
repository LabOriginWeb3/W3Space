<template>
  <div class="bgMain">
    <div class="main" id="layer" @mousewheel="baglayer($event)">
      <img class="map baseDrawing" src="../assets/map/map.jpg" />
      <img class="map cloud1" src="../assets/map/1.png" />
      <img class="map cloud2" src="../assets/map/2.png" />
      <img class="map cloud3" src="../assets/map/3.png" />
      <img class="map cloud4" src="../assets/map/4.png" />
      <div class="bulla" @click="enterTheGame()">
        <img src="../assets/map/bulla.png" />
      </div>
    </div>

    <!-- <div class="main box" id="bigimg" @mousewheel="bagimg($event)">
      <img id="img" border="0" src="../assets/map/map.jpg" />
    </div> -->
  </div>
</template>
<script>
import $ from "jquery";
export default {
  name: "Map",
  data() {
    return {
      count: 0,
      params: {
        zoomVal: 1,
        left: 0,
        top: 0,
        currentX: 0,
        currentY: 0,
        flag: false,
      },
      clientWidth: 0,
      clientHeight: 0,
      mainHeight: 0,
      mainWidth: 0,
    };
  },
  components: {},
  props: ["webRtc", "isConnectTip"],
  computed: {},
  created() {},
  methods: {
    enterTheGame() {
      if (this.count == 0) {
        // $(".main").addClass("mapEnter");
        // $(".bulla").addClass("bullaIcon");
      } else if (this.count == 1) {
        $(".main").addClass("mapEnter2");
        $(".bulla").addClass("bullaIcon2");
        this.params.zoomVal = 1;
      } else {
        this.$emit("setshowMap", false);
        if (!this.isConnectTip && window.location.href.indexOf("?") <= -1) {
          this.webRtc.sendToGdevelop("flymap", { mapid: 102, x: 27, y: 33 });
        }
      }
      this.count = this.count + 1;
    },

    baglayer(event) {
      var e = document.getElementById("layer");
      let num = this.params.zoomVal + event.wheelDelta / 1200;
      if (
        this.fomatFloat(num, 1) > this.fomatFloat(this.params.zoomVal, 1) &&
        this.fomatFloat(this.params.zoomVal, 1) >= 0.5 &&
        this.fomatFloat(this.params.zoomVal, 1) < 1
      ) {
        this.params.zoomVal = this.fomatFloat(this.params.zoomVal, 1) + 0.1;
        e.style.transform =
          "scale(" + this.fomatFloat(this.params.zoomVal, 1) + ")";
        this.mainWidth = parseInt(
          $("#layer").width() * this.fomatFloat(this.params.zoomVal, 1)
        );
        this.mainHeight = parseInt(
          $("#layer").height() * this.fomatFloat(this.params.zoomVal, 1)
        );
        // console.log("Main", this.mainWidth, this.mainHeight);
      }
      if (
        this.fomatFloat(num, 1) < this.fomatFloat(this.params.zoomVal, 1) &&
        this.fomatFloat(this.params.zoomVal, 1) <= 1 &&
        this.fomatFloat(this.params.zoomVal, 1) > 0.5
      ) {
        this.params.zoomVal = this.fomatFloat(this.params.zoomVal, 1) - 0.1;
        e.style.transform =
          "scale(" + this.fomatFloat(this.params.zoomVal, 1) + ")";
        this.mainWidth = parseInt(
          $("#layer").width() * this.fomatFloat(this.params.zoomVal, 1)
        );
        this.mainHeight = parseInt(
          $("#layer").height() * this.fomatFloat(this.params.zoomVal, 1)
        );
        // console.log("Main", this.mainWidth, this.mainHeight);
      }
    },
    fomatFloat(src, pos) {
      return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
    },
    getLayerCss(e, key) {
      return e.currentStyle
        ? e.currentStyle[key]
        : document.defaultView.getComputedStyle(e, false)[key];
    },
    startDrag(bar, target, callback) {
      let that = this;
      if (that.getLayerCss(target, "left") !== "auto") {
        that.params.left = that.getLayerCss(target, "left");
      }
      if (that.getLayerCss(target, "top") !== "auto") {
        that.params.top = that.getLayerCss(target, "top");
      }
      bar.onmousedown = function (event) {
        that.params.flag = true;
        if (!event) {
          event = window.event;
          bar.onselectstart = function () {
            return false;
          };
        }
        let e = event;
        that.params.currentX = e.clientX;
        that.params.currentY = e.clientY;
      };
      document.onmouseup = function () {
        that.params.flag = false;
        if (that.getLayerCss(target, "left") !== "auto") {
          that.params.left = that.getLayerCss(target, "left");
        }
        if (that.getLayerCss(target, "top") !== "auto") {
          that.params.top = that.getLayerCss(target, "top");
        }
      };
      document.onmousemove = function (event) {
        let e = event ? event : window.event;
        if (that.params.flag) {
          let nowX = e.clientX,
            nowY = e.clientY;
          let disX = nowX - that.params.currentX,
            disY = nowY - that.params.currentY;
          // console.log(nowX, nowY);
          // console.log(that.params.currentX, that.params.currentY);
          // console.log(that.params.left, that.params.top);
          // console.log(disX, disY);

          target.style.left = parseInt(that.params.left) + disX + "px";
          target.style.top = parseInt(that.params.top) + disY + "px";

          // let x = that.clientWidth - that.mainWidth;
          // let y = that.clientHeight - that.mainHeight;
          // console.log(x, y);
          // if (parseInt(that.params.left) + disX >= 0) {
          //   target.style.left = "0px";
          // } else {
          //   if (parseInt(that.params.left) + disX > x) {
          //     target.style.left = parseInt(that.params.left) + disX + "px";
          //     console.log("left", parseInt(that.params.left) + disX + "px");
          //   }
          //   if (parseInt(that.params.left) + disX <= x) {
          //     target.style.left = x + "px";
          //     console.log("left", x + "px");
          //   }
          // }
          // if (parseInt(that.params.top) + disY >= 0) {
          //   target.style.top = "0px";
          // } else {
          //   console.log("toptoptop", parseInt(that.params.top) + disX);
          //   if (parseInt(that.params.top) + disX > y) {
          //     target.style.top = parseInt(that.params.top) + disY + "px";
          //     console.log(
          //       "top1111111111",
          //       parseInt(that.params.top) + disX + "px"
          //     );
          //   }
          //   if (parseInt(that.params.top) + disX <= y) {
          //     target.style.top = y + "px";
          //     console.log("top2222222222", y + "px");
          //   }
          // }

          if (typeof callback == "function") {
            callback(
              (parseInt(that.params.left) || 0) + disX,
              (parseInt(that.params.top) || 0) + disY
            );
          }
          if (event.preventDefault) {
            event.preventDefault();
          }
          return false;
        }
      };
    },
  },
  watch: {},
  mounted() {
    this.startDrag(
      document.getElementById("layer"),
      document.getElementById("layer")
    );
    this.clientWidth = document.documentElement.clientWidth;
    this.clientHeight = document.documentElement.clientHeight;
    console.log("11111111111", this.clientWidth, this.clientHeight);
    this.mainWidth = $("#layer").width();
    this.mainHeight = $("#layer").height();
    console.log("Main", this.mainWidth, this.mainHeight);
  },
};
</script>
<style lang="stylus" scoped>
.bgMain
  height 100%
  width 100%
  position absolute
  background #000
  z-index 999
  cursor url('../assets/cursor/5.png'), move
.main
  width 200vw
  height 200vh
  background rgba(20, 22, 39, 0.722)
  display flex
  justify-content center
  align-items center
  position fixed
  top -50vh
  left -50vw
  z-index 1000
  transform scale3d(1, 1, 1) translate(-20%, -10%)
  img
    width 100%
    height 100%
  .map
    position absolute
    z-index 1000
    top 0
  .cloud1
    z-index 1001
    width 106%
    height 105%
    animation box1 5s infinite
  .cloud2
    z-index 1002
    width 70%
    height 110%
    animation box2 3s infinite
  .cloud3
    z-index 1003
    width 82%
    height 96%
    left calc(100% - 84%)
    top calc(100% - 90%)
    animation box3 3s infinite
  .cloud4
    z-index 1004
    width 100%
    height 103%
    left calc(100% - 99.5%)
    top calc(100% - 98%)
    animation box4 3s infinite
@keyframes box1
  0%
    opacity 0.8
  50%
    opacity 0.4
  100%
    opacity 0.8
@keyframes box2
  0%
    opacity 0.3
  50%
    opacity 0.7
  100%
    opacity 0.3
@keyframes box3
  0%
    opacity 0.8
  50%
    opacity 0.5
  100%
    opacity 0.8
@keyframes box4
  0%
    opacity 0.5
  50%
    opacity 0.9
  100%
    opacity 0.5
.bulla
  width 40px
  height 40px
  position absolute
  z-index 1004
  right 26%
  top 58.2%
  transform scale3d(1, 1, 1)
  cursor url('../assets/cursor/6.png'), pointer
  img
    width 100%
    height 100%
.mapEnter
  animation loading 3s linear forwards !important
@keyframes loading
  0%
    transform scale3d(1, 1, 1) translate(-20%, -10%)
  100%
    transform scale3d(0.5, 0.5, 0.5) translate(0, 0)
.bullaIcon
  animation bullaIconing 3s linear forwards !important
@keyframes bullaIconing
  0%
    transform scale3d(1, 1, 1)
  100%
    transform scale3d(2, 2, 2)
.mapEnter2
  animation loading2 3s linear forwards !important
@keyframes loading2
  0%
    transform scale3d(0.5, 0.5, 0.5) translate(0, 0)
  100%
    transform scale3d(1, 1, 1) translate(-20%, -10%)
.bullaIcon2
  animation bullaIconing2 3s linear forwards !important
@keyframes bullaIconing2
  0%
    transform scale3d(2, 2, 2)
  100%
    transform scale3d(1, 1, 1)
</style>
