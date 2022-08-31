<template>
  <div class="officeBg uploadLogo" @click="closeUploadPosters">
    <div class="officeCon" @click="cancelBubble($event)">
      <p class="close_frame" @click="closeUploadPosters">X</p>
      <div class="bgImg">
        <img class="left" src="../assets/bg-left.png" />
      </div>
      <div class="info">
        <img :src="logoSrc" style="width: 200px; height: 200px" />
        <img
          v-show="logoSrc === null || logoSrc === ''"
          class="addLogo"
          style="position: absolute"
          src="../assets/addLogo.svg"
        />
        <input
          class="filePrew"
          type="file"
          accept=".jpg,.jpeg,.png"
          @change="addLogo($event, '')"
          ref="logoImg"
        />
        <input
          id="oldimg"
          name="oldimg"
          v-model="oldimg"
          value=""
          type="hidden"
        />
      </div>

      <div class="enterButton" @click="uploadLogo">
        <div class="containerline">
          <svg
            height="100%"
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
            style="border-radius: 10px"
          >
            <rect class="outline" height="100%" width="100%" rx="10" />
          </svg>
        </div>
        <div class="container"></div>
        <div class="text">UPLOAD</div>
      </div>
      <div class="bgImg bgImg_right">
        <img class="right" src="../assets/taskright.png" />
      </div>
    </div>
  </div>
</template>
<script>
// import $ from "jquery";
import axios from "axios";

export default {
  name: "UploadPosters",
  data() {
    return {
      logoSrc: null,
      oldimg: "",
      logoFile: null,
      roomName: "",
      locationUrl: "",
    };
  },
  props: {
    postersId: Number,
  },
  computed: {},
  created() {
    let address = window.location.href.split("=");
    this.roomName = address[1];
    if (window.location.href.indexOf("w3.work") > -1) {
      this.locationUrl = "https://alpha.w3.work";
    } else {
      this.locationUrl = "https://alpha.w3work.org";
    }
  },
  methods: {
    cancelBubble(event) {
      var e = window.event || event;
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
    },
    addLogo(e, type) {
      var that = this;
      that.logoFile = e.target.files[0];
      var f = new FileReader();
      if (type === "meeting") {
        f.readAsDataURL(this.$refs.meetingLogoImg.files[0]);
        f.onload = function () {
          that.meetingLogoSrc = f.result;
        };
      } else {
        f.readAsDataURL(this.$refs.logoImg.files[0]);
        f.onload = function () {
          that.logoSrc = f.result;
        };
      }
    },
    uploadLogo() {
      if (this.logoFile) {
        let formData = new FormData();
        formData.append("icon", this.logoFile);
        formData.append("oldimg", JSON.stringify(this.oldimg));
        let url = this.locationUrl + "/meeting/index.php";
        axios
          .post(url, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((res) => {
            if (res.data !== "error") {
              let params = {
                name: res.data,
                meeting: this.roomName,
                id: this.postersId,
              };
              this.$emit("updateMeetingBill", params);
              this.logoFile = "";
              this.logoSrc = "";
              this.$emit("closeUploadPosters", false);
            }
          });
      }
    },
    closeUploadPosters() {
      this.$emit("closeUploadPosters", false);
    },
  },
};
</script>
<style lang="stylus" scoped>
@import '../views/home.styl'
/deep/ .filePrew
  opacity 0
  width 200px
  height 200px
  position absolute
  margin-left -200px
  cursor pointer
.addLogo
  width 100px
  height 200px
  position relative
  margin-left -150px
.meetingfilePrew
  width 200px
  height 200px
  position relative
  margin-left -200px
  top -180px
</style>
