<template>
  <div class="drag-zoom" ref="drag-zoom">
    <VueDragZoom
      :area-node="node"
      allow-zoom
      :range="0.2"
      :max-zoom="3"
      :min-zoom="1"
      :zoom="zoom"
      :count="count"
      :left="left"
      :top="top"
      @setCurrentZoom="setCurrentZoom"
    >
      <div class="drag-zoom-content">
        <div class="main">
          <img class="map" src="../assets/map/map.jpg" />
          <img class="map cloud1" src="../assets/map/1.png" />
          <img class="map cloud2" src="../assets/map/2.png" />
          <img class="map cloud3" src="../assets/map/3.png" />
          <img class="map cloud4" src="../assets/map/4.png" />
          <div class="bulla" @click="enterTheGame()" style="display:none">
            <img src="../assets/map/bulla.png" />
          </div>
        </div>
      </div>
    </VueDragZoom>
  </div>
</template>

<script>
import $ from "jquery";
import VueDragZoom from "./DragZoom.vue";
export default {
  components: {
    VueDragZoom,
  },
  data() {
    return {
      node: null,
      count: 0,
      zoom: 3,
      currentZoom: 3,
      left: 0,
      top: 0,
    };
  },
  props: ["webRtc"],
  mounted() {
    this.node = this.$refs["drag-zoom"];
    setTimeout(() => {
      $(".bulla").css("display","block")
    }, 2000);
  },
  methods: {
    setCurrentZoom(data) {
      this.currentZoom = data;
    },
    enterTheGame() {
      if (this.currentZoom < 3) {
        this.count = this.count + 1;
        this.currentZoom = 3;
      } else {
        if (window.location.href.indexOf("?") <= -1) {
          this.webRtc.sendToGdevelop("flymap", { mapid: 102, x: 27, y: 33 });
          setTimeout(() => {
            this.$emit("setshowMap", false);
          }, 1000);
        } else { 
          this.$emit("setshowMap", false);
        }
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.drag-zoom
  position relative
  width 100vw
  height 101vh
  background #000
  overflow hidden
  z-index 1000
  .drag-zoom-content
    width 100vw
    height 100vh
    cursor url('../assets/cursor/5.png'), pointer
.main
  display flex
  justify-content center
  align-items center
img
  width 100%
  height 100%
  -webkit-user-drag none
.map
  position absolute
  z-index 1001
  top 0
.cloud1
  z-index 1002
  width 106%
  height 105%
  animation box1 5s infinite
.cloud2
  z-index 1003
  width 70%
  height 110%
  animation box2 3s infinite
.cloud3
  z-index 1004
  width 82%
  height 96%
  left calc(100% - 84%)
  top calc(100% - 90%)
  animation box3 3s infinite
.cloud4
  z-index 1005
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
  width 35px
  height 35px
  position absolute
  z-index 1005
  right 25.6%
  top 57.5%
  cursor url('../assets/cursor/6.png'), pointer
  img
    width 100%
    height 100%
</style>