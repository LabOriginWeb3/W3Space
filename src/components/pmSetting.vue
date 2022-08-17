<template>
  <div class="pmSetting officeBg" @click="closePmSetting">
    <div class="officeCon" @click="cancelBubble($event)">
      <div v-show="showPmInput">
        <div class="pm">
          <p>Create office:({{ locationUrl + "?office=" + pmAddress }})</p>
          <input class="roomName" v-model="pmName" placeholder="Office Name" />
          <input v-model="pmAddress" placeholder="Wallet Address" />
          <div @click="pmOpenOffice(pmName, pmAddress)">Create</div>
        </div>
        <div class="pm">
          <p>
            Create a custom office:({{
              locationUrl + "?toffice=" + pmCustomAddress
            }})
          </p>
          <input
            class="roomName"
            v-model="pmCustomName"
            placeholder="Office Name"
          />
          <input v-model="pmCustomAddress" placeholder="Wallet Address" />
          <div @click="pmOpenCustomOffice(pmCustomName, pmCustomAddress)">
            Create
          </div>
        </div>
        <div class="pm" v-show="mapId === 103">
          <p>Add sponsor to large conference room:</p>
          <input v-model="sponsorAddress" placeholder="Wallet Address" />
          <div @click="pmOpenSponsor(sponsorAddress, 1)">Add</div>
          <div @click="pmOpenSponsor(sponsorAddress, 0)">Remove</div>
        </div>
        <div class="pm">
          <p>Create a meeting room:</p>
          <input
            class="roomName"
            v-model="roomName"
            type="text"
            placeholder="Conference name"
          />
          <input class="dateTime" v-model="startTime" type="datetime-local" />
          <input class="dateTime" v-model="endTime" type="datetime-local" />
          <div @click="pmOpenMeeting(roomName, startTime, endTime)">Create</div>
        </div>
        <div class="pm">
          <p>Set office show/unshow:</p>
          <input
            class="roomName"
            v-model="roomId"
            type="number"
            placeholder="office id"
          />

          <input
            type="checkbox"
            v-model="pmShowCompany"
            placeholder="0 hide/ 1 show"
          />
          <div @click="pmSetplate(roomId, pmShowCompany)">Set</div>
        </div>
        <div
          v-if="invitationLink"
          style="
            text-align: left;
            padding: 10px;
            color: #60ff98;
            font-size: 20px;
          "
        >
          Invitation link: {{ invitationLink }}
        </div>
        <div class="pm" v-show="mapId === 202">
          <p>Set sponsor:</p>
          <input v-model="meetSponsorAddress" placeholder="Wallet Address" />
          <div @click="pmOpenmeetSponsor(meetSponsorAddress, 1)">Add</div>
          <div @click="pmOpenmeetSponsor(meetSponsorAddress, 0)">Remove</div>
        </div>
      </div>

      <div class="pmUpload" style="overflow: hidden" v-show="mapId === 202">
        <p>set Logo and Banner:</p>
        <div class="info">
          <span>Logo:</span>
          <div style="height: 200px">
            <img :src="meetingLogoSrc" style="width: 200px; height: 200px" />
            <img
              v-show="meetingLogoSrc === null || meetingLogoSrc === ''"
              class="addLogo"
              src="../assets/addLogo.svg"
            />
            <input
              class="filePrew meetingfilePrew"
              type="file"
              accept=".jpg,.jpeg,.png"
              @change="addLogo($event, 'meeting')"
              ref="meetingLogoImg"
            />
          </div>
          <input
            id="oldimg"
            name="oldimg"
            v-model="oldimg"
            value=""
            type="hidden"
          />
        </div>
        <div class="banner">
          <span>banner:</span>
          <div style="height: 400px">
            <img :src="meetingBannerSrc" style="width: 200px; height: 400px" />
            <img
              v-show="meetingBannerSrc === null || meetingBannerSrc === ''"
              class="addLogo"
              style="top: -100px"
              src="../assets/addLogo.svg"
            />
            <ImgCutter
              v-on:cutDown="cutDown"
              :cutWidth="200"
              :cutHeight="800"
              :sizeChange="false"
              label="change Img"
              :boxHeight="800"
            >
              <button slot="open" class="bannerImg">change Img</button>
              <button slot="confirm" class="btn confirmImg">Confirm</button>
              <button slot="cancel" class="btn cancelImg">Cancel</button>
            </ImgCutter>
          </div>
        </div>
        <div class="enterButton" @click="uploadMeetingIcon">
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
      </div>
    </div>
  </div>
</template>
<script>
import ImgCutter from "vue-img-cutter";
import axios from "axios";

export default {
  name: "pmSetting",
  components: { ImgCutter },
  data() {
    return {
      pmName: "",
      pmAddress: "",
      sponsorAddress: "",
      pmCustomName: "",
      pmCustomAddress: "",
      roomName: "",
      roomId: 0,
      pmShowCompany: false,
      startTime: null,
      endTime: null,
      meetingLogoSrc: null,
      meetingBannerSrc: null,
      bannerFile: null,
      meetSponsorAddress: "",
      invitationLink: "",
      oldimg: "",
      logoFile: "",
    };
  },
  props: ["showPmInput", "locationUrl", "webRtc", "mapId", "nearBylist","meetingName"],
  computed: {},
  created() {},
  methods: {
    closePmSetting() {
      this.$emit("closePmSetting", false);
    },
    cancelBubble(event) {
      var e = window.event || event;
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
    },
    pmOpenOffice(name, addr) {
      if (name && addr) {
        this.webRtc.sendToGdevelop("pm", {
          cmd: "setPrivateSpace",
          address: addr.toLowerCase(),
          param: { name: name },
        });
        setTimeout(() => {
          this.$emit("topTips", {
            alert: "Created successfully.",
            time: 3000,
          });
        }, 1000);
      }
    },
    pmOpenCustomOffice(name, addr) {
      if (name && addr) {
        this.webRtc.sendToGdevelop("pm", {
          cmd: "setThingPrivateSpace",
          address: addr.toLowerCase(),
          param: { name: name },
        });
        setTimeout(() => {
          this.$emit("topTips", {
            alert: "Created successfully.",
            time: 3000,
          });
        }, 1000);
      }
    },
    pmOpenSponsor(addr, type) {
      if (addr) {
        this.webRtc.sendToGdevelop("pm", {
          cmd: "setSponsor",
          address: addr.toLowerCase(),
          param: { set: type },
        });

        setTimeout(() => {
          let tips;
          if (type === 1) {
            tips = "Add successfully.";
          } else {
            tips = "Remove successfully.";
          }
          this.$emit("topTips", {
            alert: tips,
            time: 3000,
          });
        }, 1000);
      }
    },
    getTimeFormat(timeS) {
      let time = new Date(timeS).getTime() / 1000;
      return time;
    },
    pmOpenMeeting(roomName, startTime, endTime) {
      if (roomName && startTime && endTime) {
        this.webRtc.sendToGdevelop("pm", {
          cmd: "createmeeting",
          address: "",
          param: {
            name: roomName,
            begintime: this.getTimeFormat(startTime),
            endtime: this.getTimeFormat(endTime),
            whiteboard: "c8616ce00f0311eda1dd17b7c8465f8a",
          },
        });
        
        this.invitationLink = this.locationUrl + "?meeting=" + this.roomName;
        setTimeout(() => {
          this.roomName = "";
          this.startTime = "";
          this.endTime = "";
          this.$emit("topTips", {
            alert: "Created successfully.",
            time: 3000,
          });
        }, 1000);
      }
    },
    pmSetplate(id, status) {
      if (id) {
        this.webRtc.sendToGdevelop("pm", {
          cmd: "setplate",
          address: "",
          param: { roomid: Number(id), set: status ? 1 : 0 },
        });

        setTimeout(() => {
          let tips;
          if (status) {
            tips = "Add successfully.";
          } else {
            tips = "Remove successfully.";
          }
          this.sponsorAddress = "";
          this.$emit("topTips", {
            alert: tips,
            time: 3000,
          });
        }, 1000);
      }
    },
    pmOpenmeetSponsor(meetSponsorAddress, type) {
      if (meetSponsorAddress) {
        this.webRtc.sendToGdevelop("pm", {
          cmd: "setMeetingSponsor",
          address: meetSponsorAddress.toLowerCase(),
          param: {
            name: this.meetingName,
            set: type,
          },
        });
        setTimeout(() => {
          let tips;
          if (type === 1) {
            tips = "Add successfully.";
          } else {
            tips = "Remove successfully.";
          }
          this.meetSponsorAddress = "";

          this.$emit("topTips", {
            alert: tips,
            time: 3000,
          });
        }, 1000);
      }
    },
    cutDown(fileName) {
      this.meetingBannerSrc = fileName.dataURL;
      this.bannerFile = this.dataURLtoBlob(fileName.dataURL, fileName.fileName);
    },
    dataURLtoBlob(dataurl, name) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], name, { type: mime });
    },
    uploadMeetingIcon() {
      let url = this.locationUrl + "/meeting/index.php";
      if (this.logoFile) {
        let formData1 = new FormData();
        formData1.append("icon", this.logoFile);
        formData1.append("oldimg", JSON.stringify(this.oldimg));
        axios
          .post(url, formData1, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((res) => {
            console.log(res);
            if (res.data !== "error") {
              if (this.nearBylist[0].sponsor === 1) {
                this.webRtc.sendToGdevelop("updateMeetingimg", {
                  name: res.data,
                  meeting: this.meetingName,
                });
              } else {
                this.webRtc.sendToGdevelop("pm", {
                  cmd: "setMeetingLogo",
                  address: "",
                  param: { name: this.meetingName, logo: res.data },
                });
              }
              this.closePmSetting();
            }
          });
      }
      if (this.bannerFile) {
        let formData2 = new FormData();
        formData2.append("icon", this.bannerFile);
        formData2.append("oldimg", JSON.stringify(this.oldimg));
        axios
          .post(url, formData2, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((res) => {
            console.log(res);
            if (res.data !== "error") {
              if (this.nearBylist[0].sponsor === 1) {
                this.webRtc.sendToGdevelop("updateMeetingBanner", {
                  name: res.data,
                  meeting: this.meetingName,
                });
              } else {
                this.webRtc.sendToGdevelop("pm", {
                  cmd: "setMeetingBanner",
                  address: "",
                  param: { name: this.meetingName, banner: res.data },
                });
              }
              this.closePmSetting();
            }
          });
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
      }
    },
  },
  mounted() {},
};
</script>
<style lang="stylus" scoped>
@import '../views/home.styl'
.addLogo
  width 100px
  height 200px
  position relative !important
  margin-left -150px !important
.meetingfilePrew
  width 200px
  height 200px
  position relative !important
  margin-left -200px !important
  top -180px !important
</style>
