<template>
  <div class="changeRole" @click="settingBack()">
    <div class="roleCon" @click="cancelBubble($event)">
      <p class="close_frame" @click="settingBack()">
        <img src="../assets/close.svg" />
      </p>
      <div class="role">
        <p>CHOOSE YOUR CHARACTER</p>
        <div class="avater">
          <div
            v-for="(item, index) in roleList"
            :key="index"
            :class="{ active: role.id === item.role }"
            @click="setRole('', item.role)"
          >
            <img :src="item.img" />
          </div>
        </div>
        <p>TRY NFT</p>
        <div class="NFT">
          <h5 @click="showNFT1 = !showNFT1">
            <div class="nftName">
              <div class="nftImg">
                <img src="../assets/nft01.png" />
              </div>
              <span>BAYC</span>
            </div>
            <p>
              <span>50</span
              ><img
                :class="{ openMenu: showNFT1 }"
                src="../assets/bottomIcon.svg"
              />
            </p>
          </h5>
          <div
            v-show="showNFT1"
            v-for="i in 50"
            :key="i"
            :class="{ active: role.id === 'BAYC' + i }"
            @click="setRole('BAYC', i)"
          >
            <img
              :src="
                'https://bayc2.oss-cn-shenzhen.aliyuncs.com/pfp/BAYC' +
                i +
                '.png'
              "
            />
          </div>
          <h5 @click="showNFT2 = !showNFT2">
            <div class="nftName">
              <div class="nftImg">
                <img src="../assets/nft02.png" />
              </div>
              <span>Mfers</span>
            </div>
            <p>
              <span>50</span
              ><img
                :class="{ openMenu: showNFT2 }"
                src="../assets/bottomIcon.svg"
              />
            </p>
          </h5>
          <div
            v-show="showNFT2"
            v-for="j in 50"
            :key="j + 'Mfers'"
            :class="{ active: role.id === 'Mfers' + j }"
            @click="setRole('Mfers', j)"
          >
            <img
              :src="
                'https://mfers2.oss-cn-shenzhen.aliyuncs.com/pfp/Mfers' +
                j +
                '.png'
              "
            />
          </div>
          <h5 @click="showNFT3 = !showNFT3">
            <div class="nftName">
              <div class="nftImg">
                <img src="../assets/nft04.jpg" />
              </div>
              <span>Doodles</span>
            </div>
            <p>
              <span>50</span
              ><img
                :class="{ openMenu: showNFT3 }"
                src="../assets/bottomIcon.svg"
              />
            </p>
          </h5>
          <div
            v-show="showNFT3"
            v-for="k in 50"
            :key="k + 'Doodles'"
            :class="{ active: role.id === 'Doodles' + k }"
            @click="setRole('Doodles', k)"
          >
            <img
              :src="
                'https://doodles.oss-cn-shenzhen.aliyuncs.com/pfp/Doodles' +
                k +
                '.png'
              "
            />
          </div>
          <h5 @click="showNFT4 = !showNFT4">
            <div class="nftName">
              <div class="nftImg">
                <img src="../assets/nft03.png" />
              </div>
              <span>MoonBirds</span>
            </div>
            <p>
              <span>50</span
              ><img
                :class="{ openMenu: showNFT4 }"
                src="../assets/bottomIcon.svg"
              />
            </p>
          </h5>
          <div
            v-show="showNFT4"
            v-for="i in 50"
            :key="i + 'MoonBirds'"
            :class="{ active: role.id === 'MoonBirds' + i }"
            @click="setRole('MoonBirds', i)"
          >
            <img
              :src="
                'https://moonbirds.oss-cn-shenzhen.aliyuncs.com/pfp/MoonBirds' +
                i +
                '.png'
              "
            />
          </div>
          <h5 @click="showNFT5 = !showNFT5">
            <div class="nftName">
              <div class="nftImg">
                <img src="../assets/nft05.png" />
              </div>
              <span>Coolcats</span>
            </div>
            <p>
              <span>50</span
              ><img
                :class="{ openMenu: showNFT5 }"
                src="../assets/bottomIcon.svg"
              />
            </p>
          </h5>
          <div
            v-show="showNFT5"
            v-for="i in 50"
            :key="i + 'CoolCats'"
            :class="{ active: role.id === 'CoolCats' + i }"
            @click="setRole('CoolCats', i)"
          >
            <img
              :src="
                'https://coolcats.oss-cn-shenzhen.aliyuncs.com/pfp/CoolCats' +
                i +
                '.png'
              "
            />
          </div>
          <h5 @click="showNFT6 = !showNFT6">
            <div class="nftName">
              <div class="nftImg">
                <img src="../assets/nft06.png" />
              </div>
              <span>OkayBears</span>
            </div>
            <p>
              <span>50</span
              ><img
                :class="{ openMenu: showNFT6 }"
                src="../assets/bottomIcon.svg"
              />
            </p>
          </h5>
          <div
            v-show="showNFT6"
            v-for="i in 50"
            :key="i + 'OkayBears'"
            :class="{ active: role.id === 'OkayBears' + i }"
            @click="setRole('OkayBears', i)"
          >
            <img
              :src="
                'https://OkayBears.oss-cn-shenzhen.aliyuncs.com/pfp/OkayBears' +
                i +
                '.png'
              "
            />
          </div>
          <h5 @click="showNFT7 = !showNFT7">
            <div class="nftName">
              <div class="nftImg">
                <img src="../assets/nft7.gif" />
              </div>
              <span>WeirdoGhostGang</span>
            </div>
            <p>
              <span>50</span
              ><img
                :class="{ openMenu: showNFT7 }"
                src="../assets/bottomIcon.svg"
              />
            </p>
          </h5>
          <div
            v-show="showNFT7"
            v-for="i in 50"
            :key="i + 'WeirdoGhostGang'"
            :class="{ active: role.id === 'WeirdoGhostGang' + i }"
            @click="setRole('WeirdoGhostGang', i)"
          >
            <img
              :src="
                'https://WeirdoGhostGang.oss-cn-shenzhen.aliyuncs.com/pfp/WeirdoGhostGang' +
                i +
                '.png'
              "
            />
          </div>
        </div>
      </div>
      <div class="account">
        <p>NAME</p>
        <span>Pick a name for your character</span>
        <input v-model="name" placeholder="input..." />
        <p v-show="nameTips" class="nameTips">Please enter the role name</p>
        <div class="switch_open" style="margin-top: 53px; margin-bottom: 24px">
          <div class="switch_info">
            <img v-if="openAudio" src="../assets/sound_b.png" />
            <img v-else src="../assets/sound-close.png" />
            <span>My microphone</span>
          </div>
          <div class="switch" @click="setOpenStatus('sound')">
            <div class="switch-bg" :class="{ on: openAudio }">
              <div class="switch-btn" :class="{ on: openAudio }"></div>
            </div>
          </div>
        </div>
        <div class="switch_open">
          <div class="switch_info">
            <img v-if="openVideo" src="../assets/video_b.png" />
            <img v-else src="../assets/video-close.png" />
            <span>My camera</span>
          </div>
          <div class="switch" @click="setOpenStatus('video')">
            <div class="switch-bg" :class="{ on: openVideo }">
              <div class="switch-btn" :class="{ on: openVideo }"></div>
            </div>
          </div>
        </div>
        <div class="buttonSave" @click="saveRole()">Finish</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ChangeRole",
  data() {
    return {
      roleList: [
        { role: 1, img: require("../assets/male.png") },
        { role: 3, img: require("../assets/male1front.gif") },
        { role: 4, img: require("../assets/male2front.gif") },
        { role: 5, img: require("../assets/male3front.gif") },
        { role: 6, img: require("../assets/male4front.gif") },
        { role: 2, img: require("../assets/female.png") },
        { role: 7, img: require("../assets/female1front.gif") },
        { role: 8, img: require("../assets/female2front.gif") },
        { role: 9, img: require("../assets/female3front.gif") },
        { role: 10, img: require("../assets/female4front.gif") },
        { role: 11, img: require("../assets/male5front.gif") },
        { role: 12, img: require("../assets/male6front.gif") },
      ],
      showNFT1: false,
      showNFT2: false,
      showNFT3: false,
      showNFT4: false,
      showNFT5: false,
      showNFT6: false,
      showNFT7: false,
      nameTips: false,
      name: "",
    };
  },
  props: ["openAudio", "openVideo", "roleName", "role", "webRtc", "account"],
  computed: {},
  created() {
    setTimeout(() => {
      this.name = this.roleName;
      this.setRole(
        this.role.nftname,
        this.role.nftname != "" ? this.role.nftid : this.role.id
      );
    }, 500);
  },
  methods: {
    setOpenStatus(type) {
      this.$emit("setOpenStatus", type);
    },
    settingBack() {
      this.$emit("settingBack");
    },
    cancelBubble(event) {
      var e = window.event || event;
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
    },
    setRole(name, id) {
      this.$emit("setRole", { name: name, id: id });
    },
    saveRole() {
      this.$emit(
        "setRoleName",
        this.name.replace(/[^\u4e00-\u9fa5a-zA-Z0-9\w]/g, "").trim()
      );
      if (this.name !== "") {
        let old = localStorage.getItem("userAddress");
        this.$emit("changeRoleName", this.name);
        if (old == this.account) {
          this.webRtc.sendToGdevelop("changename", {
            role: this.role.nftname != "" ? 1 : this.role.id,
            name: this.name,
            nftname: this.role.nftname,
            nftid: this.role.nftname != "" ? this.role.nftid : 0,
          });
          
        } else {
          this.webRtc.sendToGdevelop("setAccount", {
            address: this.account,
            role: this.role.nftname != "" ? 1 : this.role.id,
            name: this.name,
            nftname: this.role.nftname,
            nftid: this.role.nftname != "" ? this.role.nftid : 0,
          });
          localStorage.setItem("userAddress", this.account);
        }
        this.$store.commit("setRole", this.role);
        this.$emit("showChangeRole");
      } else {
        this.nameTips = true;
      }
    },
  },
  watch: {
    name: function () {
      if (this.name !== "") {
        this.nameTips = false;
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
@import '../views/home.styl'
</style>
