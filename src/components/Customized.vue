<template>
  <div class="main">
    <div class="customized">
      <p class="close" @click="closeCustomized">X</p>
      <div class="build">
        <span>Build</span
        ><img
          :class="{ clearImg: true, active: clearImg == true }"
          src="../assets/clear.svg"
          @click="clearBuild('clear')"
        />
        <img
          :class="{ moveImg: true, active: moveImg == true }"
          src="../assets/move.svg"
          @click="clearBuild('move')"
        />
      </div>
      <div class="list">
        <p
          class="objects"
          v-show="
            account === projectAddress1 ||
            account === projectAddress2 ||
            isAdmin
          "
        >
          Customized
        </p>
        <div
          v-show="account === projectAddress1 || isAdmin"
          class="item"
          v-for="i in 13"
          :key="'Floor' + (i + 8)"
          :id="'Floor' + (i + 8)"
          @click="build('Floor', i + 8)"
        >
          <img :src="require('../assets/build/Floor' + (i + 8) + '.png')" />
        </div>
        <div
          v-show="account === projectAddress2 || isAdmin"
          class="item"
          v-for="i in 5"
          :key="'Floor' + (i + 21)"
          :id="'Floor' + (i + 21)"
          @click="build('Floor', i + 21)"
        >
          <img :src="require('../assets/build/Floor' + (i + 21) + '.png')" />
        </div>
        <p class="objects">Decoration</p>
        <div
          class="item"
          v-for="i in 19"
          :key="'Decoration' + i"
          :id="'Decoration' + i"
          @click="build('Decoration', i)"
        >
          <img :src="require('../assets/build/Decoration' + i + '.png')" />
        </div>
        <p class="objects">Floor</p>
        <div
          class="item"
          v-for="i in 8"
          :key="'Floor' + i"
          :id="'Floor' + i"
          @click="build('Floor', i)"
        >
          <img :src="require('../assets/build/Floor' + i + '.png')" />
        </div>
        <p class="objects">Furniture</p>
        <div
          class="item"
          v-for="i in 23"
          :key="'Furniture' + i"
          :id="'Furniture' + i"
          @click="build('Furniture', i)"
        >
          <img :src="require('../assets/build/Furniture' + i + '.png')" />
        </div>
        <p class="objects">Tile</p>
        <div
          class="item"
          v-for="i in 12"
          :key="'Tile' + i"
          :id="'Tile' + i"
          @click="build('Tile', i)"
        >
          <img :src="require('../assets/build/Tile' + i + '.png')" />
        </div>
        <p class="objects">Wall</p>
        <div
          class="item"
          v-for="i in 2"
          :key="'Wall' + i"
          :id="'Wall' + i"
          @click="build('Wall', i)"
        >
          <img :src="require('../assets/build/Wall' + i + '.png')" />
        </div>
      </div>
      <div class="button">
        <!-- <div>Save</div> -->
        <div @click="uploadLogo">Upload Logo</div>
      </div>
    </div>
    <div
      class="configureRegion"
      @click="getMouseXY($event)"
      @mousemove="mousemove($event)"
    >
      <img src="" id="mouseImg" style="position: absolute" />
    </div>
  </div>
</template>
<script>
import $ from "jquery";

export default {
  name: "Customized",
  data() {
    return {
      oldImg: null,
      img: null,
      imgX: 0,
      imgY: 0,
      projectAddress1: "0x66c37c9e4418d8Db8dAB9381B352FE6c6b2F166a", //0x66c37c9e4418d8db8dab9381b352fe6c6b2f166a //0x8e0ed8482d7374380cf548317a9d78288651c456
      projectAddress2: "0xcd4b068ac9c9deb53f01e6691b3fdd124760eab0",
      bulidType: null,
      clearImg: false,
      moveImg: false,
    };
  },
  props: ["isAdmin", "account", "webRtc"],
  computed: {},
  created() {
    window["delThing"] = async (name) => {
      if (this.bulidType === "move") {
        this.build("", "", name);
      }
    };
  },
  methods: {
    closeCustomized() {
      this.$emit("closeCustomized", false);
    },
    uploadLogo() {
      this.$emit("showUploadLogo", true);
    },
    clearBuild(type) {
      this.bulidType = type;
      let clearType;
      if (this.bulidType === "clear") {
        this.moveImg = false;
        this.clearImg = !this.clearImg;
        clearType = this.clearImg;
      } else {
        this.clearImg = false;
        this.moveImg = !this.moveImg;
        clearType = this.moveImg;
      }
      $("#mouseImg").attr("src", "");
      let delthingData = { set: clearType === false ? 0 : 1 };
      this.webRtc.sendToGdevelop("delthing", delthingData);
      if (clearType) {
        $(".configureRegion").css("pointer-events", "none");
        if (this.img) {
          $("#" + this.img).removeClass("active");
          this.img = "";
          this.oldImg = null;
        }
      }
    },
    build(type, id, name) {
      this.clearImg = false;
      let delthingData = { set: 0 };
      this.webRtc.sendToGdevelop("delthing", delthingData);
      $(".configureRegion").css("pointer-events", "all");
      let that = this;
      let url;
      if (type === "" && id === "") {
        that.img = name;
        url = require("../assets/build/" + that.img + ".png");
        $("#mouseImg").attr("src", url);
        var imgWH2 = new Image();
        imgWH2.src = url;
        imgWH2.onload = function () {
          that.imgX = imgWH2.width / 2;
          that.imgY = imgWH2.height / 2;
        };
      } else {
        this.moveImg = false;
        that.bulidType = "";
        that.img = type + id;
        url = require("../assets/build/" + that.img + ".png");
        if (that.img === that.oldImg) {
          $("#" + that.img).removeClass("active");
          that.img = "";
          that.oldImg = null;
          $("#mouseImg").attr("src", "");
          $(".configureRegion").css("pointer-events", "none");
        } else {
          $("#" + that.oldImg).removeClass("active");
          $("#" + that.img).addClass("active");
          $("#mouseImg").attr("src", url);
          that.oldImg = that.img;
          var imgWH = new Image();
          imgWH.src = url;
          imgWH.onload = function () {
            that.imgX = imgWH.width / 2;
            that.imgY = imgWH.height / 2;
          };
        }
      }
    },
    getMouseXY(e) {
      if (this.img) {
        let puttingData = {
          name: this.img,
          posx: parseInt(e.offsetX + this.imgX + 10),
          posy: parseInt(e.offsetY + this.imgY + 10),
        };
        puttingData.posy = parseInt(
          document.getElementById("games").offsetHeight - puttingData.posy
        );
        this.webRtc.sendToGdevelop("putthing", puttingData);
        if (this.bulidType === "move") {
          this.img = "";
          $("#mouseImg").attr("src", "");
          $(".configureRegion").css("pointer-events", "none");
          let delthingData = { set: 1 };
          this.webRtc.sendToGdevelop("delthing", delthingData);
        }
      }
    },
    mousemove(e) {
      e = window.event;
      $("#mouseImg")
        .css("left", parseInt(e.offsetX + 10) + "px")
        .css("top", parseInt(e.offsetY + 10) + "px");
    },
  },
};
</script>
<style lang="stylus" scoped>
.main
  --cursor
.configureRegion
  cursor var(--cursor), default
  width 100vw
  height 100vh
  position absolute
.customized
  width 260px
  height 600px
  background #314237
  border-radius 20px
  position fixed
  top 20%
  left 40px
  z-index 9
  bottom 20%
  height calc(100% - 40%)
  color #fff
  padding 15px
  text-align left
.close
  text-align right
  cursor pointer
.build
  display flex
  align-items center
  margin-bottom 10px
  .clearImg
    margin-left 20px
    cursor pointer
    &:hover
      content url('../assets/clear2.svg')
    &.active
      content url('../assets/clear2.svg')
  .moveImg
    margin-left 20px
    cursor pointer
    &:hover
      content url('../assets/move2.svg')
    &.active
      content url('../assets/move2.svg')
.objects
  margin 20px 0 20px 0
  font-size 14px
  width 100%
.list
  display flex
  flex-wrap wrap
  height calc(100% - 120px)
  overflow auto
  .item
    width 50px
    height 50px
    background rgba(255, 255, 255, 0.1)
    border-radius 10px
    display flex
    align-items center
    justify-content center
    cursor pointer
    margin 6px
    border 1px solid #fff0
    &.active
      border 1px solid #60ff98
    &:hover
      border 1px solid #60ff98
    img
      max-width 60%
      max-height 60%
.button
  margin 30px 0
  div
    width 100%
    height 36px
    background rgba(255, 255, 255, 0.1)
    border-radius 12px
    margin 10px 0
    display flex
    justify-content center
    align-items center
    cursor pointer
    opacity 0.8
    &:hover
      opacity 1
</style>
