<template>
  <div
    style="
      width: calc(100% - 80px);
      height: 100%;
      position: absolute;
      z-index: 9;
    "
    @click="closeMenu"
  >
    <div class="menu-detail" @click="cancelBubble($event)">
      <div class="message-menu">
        <div
          class="change-user"
          :style="menuIndex === 0 ? '' : 'display:none'"
          @click="mouseSendOver"
        >
          {{ sendObject }}
          <img class="selectIcon" src="../assets/select.png" />
        </div>
      </div>
      <div class="menu-center">
        <div v-show="menuIndex === 0" class="message-info" id="sengMsg">
          <div v-show="sendObject === 'Everyone'">
            <div v-for="(item, index) in vueAllTalkMsg" :key="index">
              <div v-if="item.target === 1">
                <p class="date" v-if="index !== 0">
                  {{ getMsgDate(item.time, vueAllTalkMsg[index - 1].time) }}
                </p>
                <p class="date" v-else>
                  {{ new Date(item.time).toLocaleDateString() }}
                </p>
                <div class="sendUser">
                  <img :src="getRoleImg(item.head)" />
                  <div>
                    <p>
                      {{ item.senderName ? item.senderName : "" }}
                    </p>
                  </div>
                  <span>{{ getMsgSendDate(item.time) }}</span>
                </div>
                <div
                  :class="{
                    sendMsg: true,
                    self: nearBylist[0]
                      ? nearBylist[0].id === item.sender
                      : false,
                  }"
                >
                  <div v-html="item.msg"></div>
                </div>
              </div>
            </div>
          </div>
          <div v-show="sendObject === 'Nearby'">
            <div v-for="(item, index) in vueNearByMsg" :key="index">
              <p class="date" v-if="index !== 0">
                {{ getMsgDate(item.time, vueNearByMsg[index - 1].time) }}
              </p>
              <p class="date" v-else>
                {{ new Date(item.time).toLocaleDateString() }}
              </p>
              <div class="sendUser">
                <img :src="getRoleImg(item.head)" />
                <div>
                  <p>
                    {{ item.senderName ? item.senderName : "" }}
                  </p>
                </div>
                <span>{{ getMsgSendDate(item.time) }}</span>
              </div>
              <div
                :class="{
                  sendMsg: true,
                  self: nearBylist[0]
                    ? nearBylist[0].nickname === item.senderName
                    : false,
                }"
              >
                <div v-html="item.msg"></div>
              </div>
            </div>
          </div>
          <div v-show="sendObject != 'Nearby' && sendObject != 'Everyone'">
            <div v-for="(item, index) in msgList" :key="index">
              <p class="date" v-if="index !== 0">
                {{ getMsgDate(item.time, msgList[index - 1].time) }}
              </p>
              <p class="date" v-else>
                {{ new Date(item.time).toLocaleDateString() }}
              </p>
              <div class="sendUser">
                <img :src="getRoleImg(item.head)" />
                <div>
                  <p>
                    {{ item.senderName ? item.senderName : "" }}
                  </p>
                </div>
                <span>{{ getMsgSendDate(item.time) }}</span>
              </div>
              <div
                :class="{
                  sendMsg: true,
                  self: nearBylist[0]
                    ? nearBylist[0].nickname === item.senderName
                    : false,
                }"
              >
                <div v-html="item.msg"></div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="menuIndex === 1" class="user-list">
          <div
            class="menuType"
            v-show="teamList.length > 0"
            @click="showTeam = !showTeam"
          >
            <div>
              <img
                :class="{ openMenu: showTeam }"
                src="../assets/bottomIcon.svg"
              />Team
            </div>
            <span>{{ teamList.length }}</span>
          </div>
          <div v-show="showTeam">
            <div
              v-for="(item, index) in teamList"
              :key="index"
              class="contactsInfo"
            >
              <div @click="goSendMsg(item)">
                <img :src="getRoleImg(item.image)" />
                <span
                  :class="{
                    status: true,
                    online: item.status === 0,
                    away: item.status === 1,
                    busy: item.status === 2,
                    offline: item.status === 3,
                  }"
                ></span>
                <span class="nickname">{{
                  item.nickname ? item.nickname : ""
                }}</span>
                <span
                  class="unreadNum"
                  v-show="
                    item.unreadNum &&
                    item.unreadNum !== 0 &&
                    item.id !== nearBylist[0].id
                  "
                  >{{ item.unreadNum }}</span
                >
              </div>
              <div>
                <img
                  v-show="
                    (nearBylist[0].sponsor == 1 ||
                      item.sponsorLive == 1 ||
                      item.sponsor == 1) &&
                    (mapId === 103 || mapId === 202)
                  "
                  :class="{
                    speakIcon: true,
                    active: item.sponsorLive == 1 || item.sponsor == 1,
                  }"
                  src="../assets/speakIcon2.svg"
                  @click="setLivePower(item.id, item.sponsorLive)"
                />
                <img
                  v-show="
                    (nearBylist[0].sponsor == 1 || item.isBanned == 1) &&
                    mapId === 202
                  "
                  :class="{
                    msgIcon: true,
                    active: item.isBanned == 1,
                  }"
                  src="../assets/msgIcon2.svg"
                  @click="setBanned(item.id, item.isBanned)"
                />
                <img
                  v-show="nearBylist[0].sponsor == 1 && mapId === 202"
                  :class="{
                    droleIcon: true,
                  }"
                  src="../assets/droleIcon.svg"
                  @click="removeRole(item.id)"
                />
                <div
                  v-show="
                    (nearBylist[0].sponsor !== 1 ||
                      item.sponsorLive !== 1 ||
                      item.sponsor !== 1) &&
                    mapId !== 103 &&
                    mapId !== 202
                  "
                >
                  <img
                    v-show="item.followed && item.id !== nearBylist[0].id"
                    :class="{
                      followIconIng: true,
                    }"
                    src="../assets/following.png"
                    @click="unfollow(item)"
                  />
                  <img
                    v-show="!item.followed && item.id !== nearBylist[0].id"
                    :class="{
                      followIcon: true,
                    }"
                    src="../assets/follow.png"
                    @click="follow(item)"
                  />
                </div>
                <img
                  v-show="item.status !== 3 && item.id != nearBylist[0].id"
                  class="mapIcon"
                  src="../assets/mapIcon2.svg"
                  @click.stop="flyTo(item.id)"
                />
              </div>
            </div>
          </div>
          <div class="menuType" @click="showEveryone = !showEveryone">
            <div>
              <img
                :class="{ openMenu: showEveryone }"
                src="../assets/bottomIcon.svg"
              />Everyone
            </div>
            <span>{{ membersList.length }}</span>
          </div>
          <div v-show="showEveryone">
            <div v-for="(item, index) in membersList" :key="index">
              <div @click="goSendMsg(item)">
                <img :src="getRoleImg(item.image)" />
                <span
                  :class="{
                    status: true,
                    online: item.status === 0,
                    away: item.status === 1,
                    busy: item.status === 2,
                    offline: item.status === 3,
                  }"
                ></span>
                <span class="nickname">{{
                  item.nickname ? item.nickname : ""
                }}</span>
                <span
                  class="unreadNum"
                  v-show="
                    item.unreadNum &&
                    item.unreadNum !== 0 &&
                    item.id !== nearBylist[0].id
                  "
                  >{{ item.unreadNum }}</span
                >
              </div>
              <div>
                <img
                  v-show="
                    (nearBylist[0].sponsor == 1 ||
                      item.sponsorLive == 1 ||
                      item.sponsor == 1) &&
                    (mapId === 103 || mapId === 202)
                  "
                  :class="{
                    speakIcon: true,
                    active: item.sponsorLive == 1 || item.sponsor == 1,
                  }"
                  src="../assets/speakIcon2.svg"
                  @click="setLivePower(item.id, item.sponsorLive)"
                />
                <img
                  v-show="
                    (nearBylist[0].sponsor == 1 || item.isBanned == 1) &&
                    mapId === 202
                  "
                  :class="{
                    msgIcon: true,
                    active: item.isBanned == 1,
                  }"
                  src="../assets/msgIcon2.svg"
                  @click="setBanned(item.id, item.isBanned)"
                />
                <img
                  v-show="nearBylist[0].sponsor == 1 && mapId === 202"
                  :class="{
                    droleIcon: true,
                  }"
                  src="../assets/droleIcon.svg"
                  @click="removeRole(item.id)"
                />
                <img
                  class="mapIcon"
                  src="../assets/mapIcon2.svg"
                  @click.stop="flyTo(item.id)"
                />
              </div>
            </div>
          </div>
          <div class="menuType" @click="showNearby = !showNearby">
            <div>
              <img
                :class="{ openMenu: showNearby }"
                src="../assets/bottomIcon.svg"
              />Nearby
            </div>
            <span>{{ nearBylist.length }}</span>
          </div>
          <div v-show="showNearby">
            <div
              v-for="(item, index) in nearBylist"
              :key="index"
              class="contactsInfo"
            >
              <div @click="goSendMsg(item)">
                <img :src="getRoleImg(item.image)" />
                <span
                  v-if="item.id !== nearBylist[0].id"
                  :class="{
                    status: true,
                    online: item.status === 0,
                    away: item.status === 1,
                    busy: item.status === 2,
                    offline: item.status === 3,
                  }"
                ></span>
                <span
                  v-else
                  :class="{
                    status: true,
                    online: workStatus === 0,
                    away: workStatus === 1,
                    busy: workStatus === 2,
                    offline: workStatus === 3,
                  }"
                ></span>
                <span class="nickname">{{
                  item.nickname ? item.nickname : ""
                }}</span>
                <span
                  class="unreadNum"
                  v-show="
                    item.unreadNum &&
                    item.unreadNum !== 0 &&
                    item.id !== nearBylist[0].id
                  "
                  >{{ item.unreadNum }}</span
                >
              </div>
              <div>
                <img
                  v-show="
                    (nearBylist[0].sponsor == 1 ||
                      item.sponsorLive == 1 ||
                      item.sponsor == 1) &&
                    (mapId === 103 || mapId === 202)
                  "
                  :class="{
                    speakIcon: true,
                    active: item.sponsorLive == 1 || item.sponsor == 1,
                  }"
                  src="../assets/speakIcon2.svg"
                  @click="setLivePower(item.id, item.sponsorLive)"
                />
                <img
                  v-show="
                    (nearBylist[0].sponsor == 1 || item.isBanned == 1) &&
                    mapId === 202
                  "
                  :class="{
                    msgIcon: true,
                    active: item.isBanned == 1,
                  }"
                  src="../assets/msgIcon2.svg"
                  @click="setBanned(item.id, item.isBanned)"
                />
                <div
                  v-show="
                    (nearBylist[0].sponsor !== 1 ||
                      item.sponsorLive !== 1 ||
                      item.sponsor !== 1) &&
                    mapId !== 103 &&
                    mapId !== 202
                  "
                >
                  <img
                    v-show="item.followed && item.id !== nearBylist[0].id"
                    :class="{
                      followIconIng: true,
                    }"
                    src="../assets/following.png"
                    @click="unfollow(item)"
                  />
                  <img
                    v-show="!item.followed && item.id !== nearBylist[0].id"
                    :class="{
                      followIcon: true,
                    }"
                    src="../assets/follow.png"
                    @click="follow(item)"
                  />
                </div>

                <img
                  v-show="nearBylist[0].sponsor == 1 && mapId === 202"
                  :class="{
                    droleIcon: true,
                  }"
                  src="../assets/droleIcon.svg"
                  @click="removeRole(item.id)"
                />
              </div>
            </div>
          </div>
          <div class="menuType" @click="showFollow = !showFollow">
            <div>
              <img
                :class="{ openMenu: showFollow }"
                src="../assets/bottomIcon.svg"
              />Follow
            </div>
            <span>{{ followList.length }}</span>
          </div>
          <div v-show="showFollow">
            <div v-for="(item, index) in followList" :key="index">
              <div @click="goSendMsg(item)">
                <img :src="getRoleImg(item.image)" />
                <span
                  :class="{
                    status: true,
                    online: item.status === 0,
                    away: item.status === 1,
                    busy: item.status === 2,
                    offline: item.status === 3,
                  }"
                ></span>
                <span class="nickname">{{
                  item.nickname ? item.nickname : ""
                }}</span>
                <span
                  class="unreadNum"
                  v-show="
                    item.unreadNum &&
                    item.unreadNum !== 0 &&
                    item.id !== nearBylist[0].id
                  "
                  >{{ item.unreadNum }}</span
                >
              </div>
              <div>
                <img
                  :class="{
                    followIconIng: true,
                  }"
                  src="../assets/following.png"
                  @click="unfollow(item)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="menuIndex === 0">
        <div :class="{'send-message':true,'nearby-msg':sendObject == 'Nearby'}">
          <twemoji-textarea
            ref="emojiTextarea"
            id="emojiTextarea"
            :emojiData="emojiDataAll"
            :emojiGroups="emojiGroups"
            @enterKey="sendMessage"
            @contentChangedHtml="contentChangedHtml"
            placeholder="Message..."
          >
          </twemoji-textarea>
          <div class="sendMsgBth" @click="sendMessage()">
            <img src="../assets/send.svg" />
          </div>
          <input
            type="file"
            style="display: none"
            ref="file"
            id="file"
            @click="
              (e) => {
                e.target.value = '';
              }
            "
            @change="getFileData"
          />
          <button
            v-if="sendObject == 'Nearby'"
            id="sendFile"
            @click="uploadMaterial"
          >
            +
          </button>
        </div>
      </div>
    </div>
    <div
      class="menu-tip"
      @mouseleave="mouseSendLeave"
      v-show="showSendInfo && menuIndex === 0"
      @click="cancelBubble($event)"
    >
      <div class="chang-list">
        <p @click="changeSend('Everyone')">
          <img src="../assets/everyone.svg" /> Everyone
          <span
            class="unreadNum"
            v-show="
              membersList.unreadNum &&
              membersList.unreadNum !== 0 &&
              showMenu &&
              menuIndex === 0 &&
              sendObject !== 'Everyone'
            "
            >{{ membersList.unreadNum }}</span
          >
        </p>
        <p @click="changeSend('Nearby')">
          <img src="../assets/nearby.svg" /> Nearby
          <span
            class="unreadNum"
            v-show="
              nearBylist.unreadNum &&
              nearBylist.unreadNum !== 0 &&
              showMenu &&
              menuIndex === 0 &&
              sendObject !== 'Nearby'
            "
            >{{ nearBylist.unreadNum }}</span
          >
        </p>
        <div
          class="user-info"
          @click="changeSend(item)"
          v-for="(item, index) in everyOneList"
          :key="index"
          v-show="nearBylist[0].id != item.id"
        >
          <div>
            <img :src="getRoleImg(item.image)" />
            <span
              :class="{
                status: true,
                online: item.status === 0,
                away: item.status === 1,
                busy: item.status === 2,
                offline: item.status === 3,
              }"
            ></span>
          </div>
          <div>
            {{ item.nickname ? item.nickname : "" }}
          </div>
          <span
            class="unreadNum"
            v-show="
              item.unreadNum &&
              item.unreadNum !== 0 &&
              showMenu &&
              menuIndex === 0 &&
              sendObject !== item.nickname
            "
            >{{ item.unreadNum }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import { TwemojiTextarea } from "@kevinfaguiar/vue-twemoji-picker";
import EmojiAllData from "@kevinfaguiar/vue-twemoji-picker/emoji-data/en/emoji-all-groups.json";
import EmojiGroups from "@kevinfaguiar/vue-twemoji-picker/emoji-data/emoji-groups.json";
export default {
  name: "MenuDetail",
  components: {
    "twemoji-textarea": TwemojiTextarea,
  },
  data() {
    return {
      showSendInfo: false,
      sendObject: "Everyone",
      sendUser: {},
      msgList: [],
      message: "",
      showTeam: false,
      showEveryone: false,
      showNearby: false,
      showFollow: false,
    };
  },
  props: [
    "workStatus",
    "menuIndex",
    "showMenu",
    "vueAllTalkMsg",
    "nearBylist",
    "vueNearByMsg",
    "membersList",
    "everyOneList",
    "teamList",
    "followList",
    "webRtc",
    "vueTalkMsg",
    "mapId",
  ],

  computed: {
    emojiDataAll() {
      return EmojiAllData;
    },
    emojiGroups() {
      return EmojiGroups;
    },
  },
  created() {},
  watch: {
    vueTalkMsg: function () {
      this.msgList = this.vueTalkMsg.filter(
        (val) =>
          ((val.sender === this.sendUser.id &&
            val.target === this.nearBylist[0].id) ||
            (val.sender === this.nearBylist[0].id &&
              val.target === this.sendUser.id)) &&
          val.target !== 1
      );
    },
  },
  methods: {
    closeMenu() {
      this.$emit("closeMenu", false);
    },
    cancelBubble(event) {
      var e = window.event || event;
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
    },
    follow(item) {
      this.webRtc.sendToGdevelop("follow", { id: item.id });
      this.$emit("setFollow", { item: item, status: true });
    },
    unfollow(item) {
      this.webRtc.sendToGdevelop("notfollow", { id: item.id });
      this.$emit("setFollow", { item: item, status: false });
    },
    mouseSendOver() {
      if (this.showSendInfo) {
        this.showSendInfo = false;
        $(".selectIcon").css("transform", "rotate(0deg)");
      } else {
        this.showSendInfo = true;
        $(".selectIcon").css("transform", "rotate(180deg)");
      }
    },
    getMsgDate(time, beforeTime) {
      time = new Date(time).toLocaleDateString();
      beforeTime = new Date(beforeTime).toLocaleDateString();
      if (time !== beforeTime) {
        return time;
      }
    },
    getRoleImg(id) {
      if (id !== undefined) {
        return require("../assets/avatar" + id + ".png");
      }
    },
    getMsgSendDate(item) {
      let date = new Date(item).toLocaleTimeString();
      return date;
    },
    goSendMsg(item) {
      if (item.id !== this.nearBylist[0].id) {
        // this.menuIndex = 0;
        this.sendObject = item.nickname;
        this.sendUser = item;
        this.$emit("setMenuIndex", 0);
        this.$emit("setSendObject", item.nickname);
        this.$emit("setSendUser", item);
        this.msgList = this.vueTalkMsg.filter(
          (val) =>
            ((val.sender === this.sendUser.id &&
              val.target === this.nearBylist[0].id) ||
              (val.sender === this.nearBylist[0].id &&
                val.target === this.sendUser.id)) &&
            val.target !== 1
        );
        this.$store.commit("addReadStatus", item);
      }
    },
    async setLivePower(role, e) {
      if (this.nearBylist[0].sponsor == 1 && this.nearBylist[0].id !== role) {
        let canlive = e === 0 ? 1 : 0;
        console.log(role, canlive);
        this.webRtc.sendToGdevelop("setsponsorlive", {
          role: role,
          canlive: canlive,
        });
      }
    },
    async setBanned(role, e) {
      if (this.nearBylist[0].sponsor == 1 && this.nearBylist[0].id !== role) {
        let canlive = e === 0 ? 1 : 0;
        console.log(role, canlive);
        this.webRtc.sendToGdevelop("banned", {
          userID: role,
          set: canlive,
        });
      }
    },
    async removeRole(role) {
      console.log(role);
      if (this.nearBylist[0].sponsor == 1 && this.nearBylist[0].id !== role) {
        this.webRtc.sendToGdevelop("kickout", {
          userID: role,
        });
      }
    },
    flyTo(id) {
      this.webRtc.sendToGdevelop("flyToFrens", id);
    },
    sendMessage() {
      if (this.nearBylist[0].isBanned === 1 && this.mapId === 202) {
        this.$emit("topTips", {
          alert: "You are muted.",
          time: 3000,
        });
      } else {
        let msg = this.message.trim();
        if (msg !== "") {
          if (this.sendObject === "Everyone") {
            this.sendToOther(1, "", "");
          } else if (this.sendObject === "Nearby") {
            this.sendToNearBy();
          } else {
            this.sendToOther(
              this.sendUser.id,
              this.sendUser.nickname,
              this.sendUser.image
            );
          }
        }
        this.$refs.emojiTextarea.cleanText();
      }
    },
    sendToNearBy() {
      let message = $("#twemoji-textarea").html();
      let obj = {
        sender: this.nearBylist[0].id,
        senderName: this.nearBylist[0].nickname,
        head: this.nearBylist[0].image,
        target: 2,
        targetName: "",
        targetHead: "",
        msg: message,
        time: new Date(),
      };
      for (let i = 0; i < this.webRtc.conns.length; i++) {
        var channel = this.webRtc.conns[i].send;
        channel.send(JSON.stringify(obj));
      }
      this.$store.commit("addNearByMsg", obj);
      this.message = "";
    },
    sendToOther(target, targetName, targetHead) {
      //Target if the value is 1, it is sent to all
      let message = $("#twemoji-textarea").html();
      let obj = {
        sender: this.nearBylist[0].id,
        senderName: this.nearBylist[0].nickname,
        head: this.nearBylist[0].image,
        target: target,
        targetName: targetName,
        targetHead: targetHead,
        msg: message,
        time: new Date(),
      };
      this.webRtc.sendToGdevelop("talk", obj);
      this.$store.commit("addTalkMsg", obj);
      this.message = "";
      if (target !== 1) {
        this.msgList = this.vueTalkMsg.filter(
          (val) =>
            ((val.sender === this.sendUser.id &&
              val.target === this.nearBylist[0].id) ||
              (val.sender === this.nearBylist[0].id &&
                val.target === this.sendUser.id)) &&
            val.target !== 1
        );
      }
    },
    contentChangedHtml(val) {
      let a = document.querySelector("#twemoji-textarea").innerHTML;
      let from = a.indexOf("&lt;");
      let to = a.indexOf("&gt;");
      if (from > -1 && to > 0) {
        let arr = a.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        document.querySelector("#twemoji-textarea").innerHTML = arr;
      }
      this.message = val;
    },
    getFileData() {
      let file = this.$refs.file.files[0];
      if (!file) {
        console.log("No file chosen");
        document.getElementById("sendFile").disabled = false;
      } else {
        document.getElementById("sendFile").disabled = true;
        this.sendFile();
      }
    },
    sendFile() {
      let file = this.$refs.file.files[0];
      console.log(
        `File is ${[file.name, file.size, file.type, file.lastModified].join(
          " "
        )}`
      );

      if (file.size === 0) {
        return;
      }

      let obj = {
        sender: this.nearBylist[0].id,
        senderName: this.nearBylist[0].nickname,
        head: this.nearBylist[0].image,
        target: 3, //file
        targetName: "",
        targetHead: "",
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        msg:
          "<a id='download" +
          this.nearBylist[0].id +
          "' style='display:none'>" +
          file.name +
          "</>",
        time: new Date(),
      };
      for (let i = 0; i < this.webRtc.conns.length; i++) {
        var channel = this.webRtc.conns[i].send;
        channel.send(JSON.stringify(obj));
      }
      this.$store.commit("addNearByMsg", obj);

      // sendProgress.max = file.size;
      const chunkSize = 16384;
      let fileReader = new FileReader();
      let offset = 0;
      fileReader.addEventListener("error", (error) =>
        console.error("Error reading file:", error)
      );
      fileReader.addEventListener("abort", (event) =>
        console.log("File reading aborted:", event)
      );
      fileReader.addEventListener("load", (e) => {
        // console.log("FileRead.onload ", e);
        for (let i = 0; i < this.webRtc.conns.length; i++) {
          var channelaaa = this.webRtc.conns[i].send;
          channelaaa.send(e.target.result);
        }
        offset += e.target.result.byteLength;
        // sendProgress.value = offset;
        if (offset < file.size) {
          readSlice(offset);
        } else {
          document.querySelector(
            "#download" + this.nearBylist[0].id
          ).style.display = "block";
          document.querySelector("#file").value = "";
          document.getElementById("sendFile").disabled = false;
        }
      });
      const readSlice = (o) => {
        const slice = file.slice(offset, o + chunkSize);
        fileReader.readAsArrayBuffer(slice);
      };
      readSlice(0);
    },
    uploadMaterial() {
      this.$refs.file.dispatchEvent(new MouseEvent("click"));
    },
    mouseSendLeave() {
      this.showSendInfo = false;
      $(".selectIcon").css("transform", "rotate(0deg)");
    },

    changeSend(item) {
      if (this.sendObject === "Everyone") {
        this.$store.commit("addReadStatus", "Everyone");
      } else if (this.sendObject === "Nearby") {
        this.$store.commit("addReadStatus", "Nearby");
      } else {
        this.$store.commit("addReadStatus", item);
      }

      if (item !== "Everyone" && item !== "Nearby") {
        this.sendObject = item.nickname;
        this.sendUser = item;
        this.$emit("setSendObject", item.nickname);
        this.$emit("setSendUser", item);
        this.msgList = this.vueTalkMsg.filter(
          (val) =>
            ((val.sender === this.sendUser.id &&
              val.target === this.nearBylist[0].id) ||
              (val.sender === this.nearBylist[0].id &&
                val.target === this.sendUser.id)) &&
            val.target !== 1
        );
      } else {
        this.sendObject = item;
        this.$emit("setSendObject", item);
      }
      this.$store.commit("addReadStatus", item);

      this.mouseSendLeave();
    },
  },
};
</script>
<style lang="stylus" scoped>
@import '../views/home.styl'
/deep/ #emoji-container > #emoji-popup
  width:290px !important;
/deep/ #emoji-container > #emoji-popup .emoji-popover-inner
  width:290px !important;
</style>
