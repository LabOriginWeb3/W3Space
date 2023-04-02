<template>
  <div v-if="nearBylist[0]">
    <div class="logout">
      <img src="../assets/liveChat/logout.png" @click="flymap()" />
      <p class="infoTip">Leave</p>
    </div>
    <div class="liveChat" @click="currentMore = -1">
      <div class="top">
        <div
          :class="{
            msgtype: true,
            statusIndex: true,
            active: msgtype === 0 && showChat == true,
          }"
          style="width: 60px"
        >
          <img
            class="msgtype0"
            @click="
              msgtype = 0;
              changeMsgStatus(chatUser.id);
            "
            src="../assets/liveChat/top01.svg"
          />
          <p class="infoTip">Live chat</p>
          <img
            src="../assets/liveChat/arr_bottom2.svg"
            style="width: 15px; margin-left: 5px"
            @click="showOrhiddenChat(showChat)"
            v-if="showChat == true"
          />
          <img
            v-else
            src="../assets/liveChat/arr_bottom.svg"
            style="width: 15px; margin-left: 5px"
            @click="showOrhiddenChat(showChat)"
          />
        </div>
        <div class="statusIndex" v-show="showChat == true">
          <div
            :class="{ active: msgtype === 1 }"
            @click="
              msgtype = 1;
              queryQuizBarrage();
              changeMsgStatus(chatUser.id);
            "
          >
            <img class="msgtype1" src="../assets/liveChat/top02.svg" />
            <p class="infoTip">Questions</p>
          </div>
          <div
            :class="{ active: msgtype === 2 }"
            @click="
              msgtype = 2;
              newFriends = false;
              mapId == 105 ? setccProfileFollowList() : setScrollFollowList();
            "
          >
            <img class="msgtype2" src="../assets/liveChat/top03.svg" />
            <p class="infoTip">Friends</p>
            <div
              class="redCir"
              v-show="newFriends || (getFriendsUnreadNum() && msgtype !== 2)"
            ></div>
          </div>
        </div>
      </div>
      <div class="liveMain">
        <div v-show="msgtype == 0">
          <div class="liveChatMain" v-show="showChat == true">
            <!-- <div class="ranking">
              <div
                v-for="(item, index) in topbarrage"
                :key="index"
                class="flex_center"
                style="margin-bottom: 10px"
              >
                <div
                  class="flex_center"
                  style="width: 100%"
                  v-if="item.type != 1"
                >
                  <div
                    class="flex_center ranking_item"
                    :class="{
                      ranking1: index == 0,
                      ranking2: index !== 0,
                    }"
                  >
                    <img
                      class="radius"
                      :src="getRoleImg(JSON.parse(item.content).head)"
                    />
                    <p v-html="JSON.parse(item.content).msg"></p>
                  </div>
                  <div v-if="index === 0" class="flex_center_warp">
                    <img src="../assets/liveChat/fire.png" />
                  </div>
                  <div v-else class="flex_center_warp">
                    <img src="../assets/liveChat/love.svg" />
                    <p>{{ getSupport(item) }}</p>
                  </div>
                </div>
                <div v-else class="flex_center" style="width: 100%">
                  <div
                    class="flex_center ranking_item"
                    :class="{
                      ranking1: index == 0,
                      ranking2: index !== 0,
                    }"
                  >
                    <img src="../assets/liveChat/qa.png" />
                    <img
                      class="radius"
                      :src="getRoleImg(JSON.parse(item.content).head)"
                    />
                    <p v-html="JSON.parse(item.content).msg"></p>
                  </div>
                  <div v-if="index === 0" class="flex_center_warp">
                    <img src="../assets/liveChat/fire.png" />
                  </div>
                  <div v-else class="flex_center_warp">
                    <img src="../assets/liveChat/love.svg" />
                    <p>{{ getSupport(item) }}</p>
                  </div>
                </div>
              </div>
            </div> -->
            <div
              class="msgInfo"
              id="msgInfo"
              @scroll="scrollEvent"
              ref="scrollDiv"
              @mouseover="hoverMsg = true"
              @mouseleave="hoverMsg = false"
            >
              <div>
                <div
                  v-for="(item, index) in msgList"
                  :key="index"
                  :id="'msg' + item.id"
                >
                  <div
                    v-if="item.type == 1 && item.father == 0"
                    :class="{
                      msgInfo_item: true,
                      qa: true,
                    }"
                    @dblclick="
                      dbChangeSupport(item.id, item.isupport);
                      item.isupport = item.isupport == 0 ? 1 : 0;
                    "
                  >
                    <div class="flex_center between">
                      <div class="flex_center msgflex" style="width: 70%">
                        <img src="../assets/liveChat/qa.png" />
                        <img
                          class="radius"
                          :src="getRoleImg(JSON.parse(item.content).head)"
                        />
                        <div>
                          <span
                            class="name"
                            :style="{ color: colorList[index % 9] }"
                          >
                            {{ JSON.parse(item.content).senderName }}:
                          </span>
                          <span v-html="JSON.parse(item.content).msg"></span>
                        </div>
                      </div>
                      <div class="flex_center_warp">
                        <img
                          v-if="item.isupport && item.isupport !== 0"
                          class="love"
                          src="../assets/liveChat/love.svg"
                          @click="
                            changeSupport(item.id, 0);
                            item.isupport = 0;
                          "
                        />
                        <img
                          v-else
                          class="love noneLove"
                          src="../assets/liveChat/nonelove.svg"
                          @click="
                            changeSupport(item.id, 1);
                            item.isupport = 1;
                          "
                        />
                        <p class="support">{{ item.support }}</p>
                      </div>
                    </div>
                  </div>

                  <div
                    v-else
                    :class="{
                      msgInfo_item: true,
                      flex_center: item.type == 0,
                      self: nearBylist[0].id == item.sender,
                    }"
                    @dblclick="
                      dbChangeSupport(item.id, item.isupport);
                      item.isupport = item.isupport == 0 ? 1 : 0;
                    "
                  >
                    <div class="flex_center msgflex">
                      <!-- <div class="minicard" v-show="item.showcard">
                        <MiniCard></MiniCard>
                      </div> -->
                      <img
                        class="radius"
                        :src="getRoleImg(JSON.parse(item.content).head)"
                      />
                      <div>
                        <span
                          class="name"
                          :style="{ color: colorList[index % 9] }"
                        >
                          {{ JSON.parse(item.content).senderName }}:
                        </span>
                        <span v-html="JSON.parse(item.content).msg"></span>
                      </div>
                    </div>
                    <div class="flex_center_warp">
                      <img
                        v-if="item.isupport && item.isupport !== 0"
                        class="love"
                        src="../assets/liveChat/love.svg"
                        @click="
                          changeSupport(item.id, 0);
                          item.isupport = 0;
                        "
                      />
                      <img
                        v-else
                        class="love noneLove"
                        src="../assets/liveChat/nonelove.svg"
                        @click="
                          changeSupport(item.id, 1);
                          item.isupport = 1;
                        "
                      />
                      <p class="support">{{ item.support }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style="font-size: 12px; padding-left: 5px; height: 20px">
            <span v-show="typingUser">{{ typingUser }} is typing...</span>
          </div>
          <div class="sendMsg">
            <twemoji-picker
              :emojiData="emojiDataAll"
              :emojiGroups="emojiGroups"
              :skinsSelection="false"
              @emojiImgAdded="emojiImgAddedLive"
            ></twemoji-picker>
            <img
              style="margin-left: 8px; cursor: pointer"
              src="../assets/liveChat/qa.png"
              :class="{ qa_active: msgTypeQa, qa_hover: true }"
              @click="(msgTypeQa = !msgTypeQa), getQa()"
            />
            <div
              id="liveTextarea"
              class="textarea"
              contenteditable="true"
              placeholder="Say something..."
              v-html="liveTextarea"
              @keydown="textareaKeydown($event)"
              v-on:mouseenter="handleMouseEnter"
              v-on:mouseleave="handleMouseLeave"
            ></div>
            <div class="sendButton" @click="sendMessage">SEND</div>
          </div>
          <p v-show="msgTypeQa && 250 - calculatebyte() < 0" class="limit">
            Over Character Limit: <span>{{ calculatebyte() - 250 }}</span>
          </p>
          <p
            v-show="msgTypeQa && calculatebyte() < 10 && showQaNum"
            class="limit"
          >
            Your question should at least have 10 characters.
          </p>
        </div>
        <div v-show="msgtype == 1" class="qaList">
          <div
            class="item flex_center"
            v-for="(item, index) in qaList"
            :key="index"
          >
            <img src="../assets/liveChat/qa.png" />
            <img
              class="radius"
              :src="getRoleImg(JSON.parse(item.content).head)"
            />
            <div class="flex_end">
              <div class="w230">
                <p class="name" :style="{ color: colorList[index % 9] }">
                  {{ JSON.parse(item.content).senderName }}
                </p>
                <p v-html="JSON.parse(item.content).msg"></p>
              </div>
              <span>{{ timeago(JSON.parse(item.content).time) }}</span>
            </div>
          </div>
        </div>
        <div v-show="msgtype == 2 && !showDialogue" class="friendsList">
          <div
            class="item flex_center"
            v-for="(item, index) in ccprofileFollowList"
            :key="index"
          >
            <img
              class="radius"
              :class="{ data: getNewMsg(item, index) }"
              :src="getRoleImg(item)"
            />
            <div
              class="flex_end w340"
              @click="
                showDialogue = true;
                goSendMsg(item);
              "
            >
              <div class="w285">
                <p class="name" :style="{ color: colorList[index % 9] }">
                  {{ item.nickname }}
                </p>
                <p class="msg" v-html="item.msg"></p>
              </div>
              <div class="flex-end">
                <div
                  class="redCir"
                  v-show="
                    !item.read &&
                    item.sender !== nearBylist[0].id &&
                    item.length > 1
                  "
                ></div>
                <span>{{ timeago(item.time) }}</span>
              </div>
            </div>
            <!-- <div
              style="position: relative"
              @click="
                getMore(index);
                cancelBubble($event);
              "
            >
              <img class="more" src="../assets/liveChat/arr.svg" />
              <div class="opeation" :class="{ active: currentMore == index }">
               <p @click="removeFriend(item.id)">Remove Friend</p>
                <p @click="stickToTop(index)">Stick to Top</p>
                <p @click="ccUnFollow(item.openid)">unFollow</p>
              </div>
            </div> -->
          </div>
        </div>
        <div v-show="msgtype == 2 && showDialogue" class="dialogue">
          <div class="dialogtip flex_center">
            <div
              class="flex_center"
              @click="
                showDialogue = false;
                changeMsgStatus(chatUser.id);
              "
            >
              <img src="../assets/liveChat/arr_left.svg" /> Back
            </div>
            <p :style="{ color: colorList[chatUser.id % 9] }">
              {{ chatUser.nickname }}
            </p>
          </div>
          <div class="msgList" id="msgList">
            <div v-for="(item, index) in chatList" :key="index">
              <div
                class="item flex_center self"
                v-if="nearBylist[0].id === item.sender"
              >
                <div>
                  <!-- <p class="name">
                    {{ item.senderName ? item.senderName : "" }}
                  </p> -->
                  <p class="msg" v-html="item.msg"></p>
                </div>
                <!-- <img class="radius" :src="getRoleImg(item.head)" /> -->
              </div>
              <div v-else class="item flex_center">
                <img class="radius" :src="getRoleImg(chatUser)" />
                <div>
                  <p
                    class="name"
                    :style="{ color: colorList[chatUser.id % 9] }"
                  >
                    {{ chatUser.nickname ? chatUser.nickname : "" }}
                  </p>
                  <p class="msg" v-html="item.msg"></p>
                </div>
              </div>
            </div>
          </div>
          <div class="sendMsg">
            <twemoji-picker
              :emojiData="emojiDataAll"
              :emojiGroups="emojiGroups"
              :skinsSelection="false"
              @emojiImgAdded="emojiImgAdded"
            ></twemoji-picker>
            <div
              id="msgTextarea"
              class="textarea"
              contenteditable="true"
              placeholder="Message..."
              v-html="msgTextarea"
              @keydown="msgKeydown($event)"
            ></div>
            <div class="sendButton" @click="sendChat()">SEND</div>
          </div>
        </div>
      </div>
    </div>
    <div class="liveList">
      <div class="topShow">
        <div class="liveCenter" v-if="liveVideos.length > 0">
          <div
            class="iconAdd"
            v-if="nearBylist[0] && nearBylist[0].sponsor == 1"
            @click="setHandList()"
          >
            <img
              src="../assets/liveChat/icon_add.svg"
              @click="showControls = true"
            />
          </div>
          <div
            v-for="(item, index) in liveVideos"
            :key="index"
            class="centerDiv"
          >
            <div
              class="item"
              v-show="
                !item.hidden &&
                parseInt(item.uid.toString().slice(0, 5)) < 90000
              "
            >
              <div class="liveItem" @click="getCurrentOff(index)">
                <div
                  class="liveWave"
                  v-show="
                    ((item.uid % 10000) + 1010000000 == nearBylist[0].id &&
                      openLiveAudio) ||
                    item.hasAudioTrack
                  "
                ></div>
                <img
                  class="speakHead"
                  :src="getLiveImg((item.uid % 10000) + 1010000000)"
                />
                <div
                  v-if="
                    (item.uid % 10000) + 1010000000 == nearBylist[0].id &&
                    openLiveAudio
                  "
                  class="iconspeak"
                >
                  <img src="../assets/liveChat/iconspeak.svg" />
                </div>
                <div
                  v-if="
                    (item.uid % 10000) + 1010000000 == nearBylist[0].id &&
                    !openLiveAudio
                  "
                  class="iconspeak iconspeakClose"
                >
                  <img src="../assets/liveChat/iconspeak_close.svg" />
                </div>
                <div
                  v-if="
                    (item.uid % 10000) + 1010000000 !== nearBylist[0].id &&
                    item.hasAudioTrack
                  "
                  class="iconspeak"
                >
                  <img src="../assets/liveChat/iconspeak.svg" />
                </div>
                <div
                  v-if="
                    (item.uid % 10000) + 1010000000 !== nearBylist[0].id &&
                    !item.hasAudioTrack
                  "
                  class="iconspeak iconspeakClose"
                >
                  <img src="../assets/liveChat/iconspeak_close.svg" />
                </div>
              </div>
              <p class="name">{{ findUserName(item.uid) }}</p>
              <div
                v-if="!item.isHost"
                class="offmic"
                :class="{ active: currentOff == index }"
              >
                <div
                  @click="
                    setLivePower((item.uid % 10000) + 1010000000, 1);
                    getClosehandStatus((item.uid % 10000) + 1010000000);
                  "
                >
                  Off the Mic
                </div>
              </div>
              <div v-else class="host">Host</div>
            </div>
          </div>
        </div>
        <!-- v-show="lineInfo && lineInfo.length > 1" -->
        <div v-show="lineInfo && lineInfo.length > 1">
          <div class="lineIndex">
            <div style="min-width: 50px" @click="showLineList = !showLineList">
              <img
                style="width: 30px; margin-top: 10px"
                src="../assets/liveChat/line.svg"
              />
              <p>{{ currentLineNum }}</p>
            </div>
          </div>
          <!-- <div class="lineList" v-show="showLineList">
            <p
              v-for="(item, index) in lineInfo"
              :key="index"
              @click="
                enterLine(item.id);
                showLineList = !showLineList;
              "
            >
              {{ getLineNum(item.id) }}
            </p>
          </div> -->
        </div>
      </div>
    </div>
    <div class="flex_center" style="justify-content: center">
      <!-- @click="$emit('setGamefocus')"
    > -->
      <div class="liveOperation">
        <!-- <div @click="collectCyber()">Received</div> -->
        <div
          class="tooltip"
          @click="
            changeheart();
            opIndex = 1;
            closeCard();
          "
        >
          <img src="../assets/liveChat/icon01.svg" />
          <span class="tooltiptext">Heart</span>
        </div>
        <!-- <div
          class="tooltip"
          @click="
            changeOpenCard();
            opIndex = 6;
          "
        >
          <img src="../assets/liveChat/icon05.svg" />
          <span class="tooltiptext">Name Card</span>
        </div> -->
        <div
          class="tooltip"
          v-show="nearBylist[0].sponsor !== 1 && mapId == 105"
        >
          <img
            @click="
              startFootball();
              opIndex = 4;
              closeCard();
            "
            src="../assets/liveChat/football.png"
          />
          <span class="tooltiptext">Football</span>
        </div>
        <div
          class="tooltip"
          @click="
            changeRaisehand();
            opIndex = 2;
            closeCard();
          "
          v-show="nearBylist[0].sponsor !== 1"
        >
          <img src="../assets/liveChat/icon10.svg" />
          <span class="tooltiptext">Raise Hand</span>
        </div>
        <div
          class="tooltip"
          @click="
            changeApplause();
            opIndex = 3;
            closeCard();
          "
        >
          <img src="../assets/liveChat/icon02.svg" />
          <span class="tooltiptext">Applause</span>
        </div>

        <div class="tooltip" v-show="nearBylist[0].sponsor == 1">
          <img
            v-show="poap == 0"
            src="../assets/liveChat/poap2.png"
            @click="setPoap(1)"
          />
          <img
            v-show="poap == 1"
            src="../assets/liveChat/poap1.png"
            @click="setPoap(0)"
          />
          <span class="tooltiptext">{{ mapId == 105 ? "W3ST" : "POA" }}</span>
        </div>
      </div>
    </div>
    <div class="officeBg" @click="showControls = false" v-show="showControls">
      <div class="officeCon" @click="cancelBubble($event)">
        <p class="close_frame" @click="showControls = false">
          <img src="../assets/close.svg" />
        </p>
        <p class="audtitle">
          Audiences<span>{{ handList.length }}</span>
        </p>
        <div class="audList">
          <div class="item" v-for="(item, index) in handList" :key="index">
            <div class="flex_center">
              <div class="head">
                <img :src="getRoleImg(item)" class="radius" />
                <div
                  :class="{
                    status: true,
                    online: item.status === 0,
                    away: item.status === 1,
                    busy: item.status === 2,
                    offline: item.status === 3,
                  }"
                ></div>
              </div>
              <p>{{ item.nickname }}</p>
            </div>
            <div
              v-if="item.sponsorLive == 0 || !item.sponsorLive"
              class="button"
              @click="
                setLivePower(item.id, 0);
                item.sponsorLive = 1;
              "
            >
              Add As Speaker
            </div>
            <div
              v-else
              class="button close"
              @click="
                setLivePower(item.id, 1);
                item.sponsorLive = 0;
              "
            >
              Off the mic
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- v-show="lineInfo && lineInfo.length > 1" -->
    <div
      class="enterLine left"
      @click="enterLine(lineId - 1)"
      v-show="lineInfo && lineInfo.length > 1"
    >
      <img class="leftIcon" src="../assets/liveChat/line_left.svg" />
      <div class="nextRoom" style="left: 60px">Next room</div>
    </div>

    <div
      class="enterLine right"
      @click="enterLine(lineId + 1)"
      v-show="lineInfo && lineInfo.length > 1"
    >
      <img class="rightIcon" src="../assets/liveChat/line_right.svg" />
      <div class="nextRoom">Next room</div>
    </div>

    <div
      class="invite officeBg"
      v-show="showConnectWallet"
      @click="
        showConnectWallet = false;
        $emit('setGamefocus');
      "
    >
      <div class="officeCon" @click="cancelBubble($event)">
        <p
          class="close_frame"
          @click="
            showConnectWallet = false;
            $emit('setGamefocus');
          "
        >
          <img src="../assets/close.svg" />
        </p>
        <div class="bgImg">
          <img class="left" src="../assets/bg-left.png" />
        </div>
        <h2>CONNECT WALLET</h2>
        <div class="info">
          <p>Please connect wallet to claim your $W3ST token.</p>
          <div>
            <span
              @click="
                showConnectWallet = false;
                $emit('connect');
              "
              >Connect Wallet<img
                style="margin-left: 10px"
                src="../assets/browser-wallet.svg"
            /></span>
          </div>
        </div>
        <div class="bgImg bgImg_right">
          <img class="right" src="../assets/taskright.png" />
        </div>
      </div>
    </div>

    <div
      class="invite officeBg"
      v-show="showClaim"
      @click="
        showClaim = false;
        $emit('setGamefocus');
      "
    >
      <div class="officeCon" @click="cancelBubble($event)">
        <p
          class="close_frame"
          @click="
            showClaim = false;
            $emit('setGamefocus');
          "
        >
          <img src="../assets/close.svg" />
        </p>
        <div class="bgImg">
          <img class="left" src="../assets/bg-left.png" />
        </div>
        <h2>{{ mapId == 105 ? "Claim W3ST" : "Claim POA" }}</h2>
        <div class="info">
          <p>
            <span v-if="timeStatus">✅</span>
            <span v-else>❌</span>
            Time online > 15 min
          </p>
          <p v-if="!timeStatus" class="fail" style="margin-top: 10px">
            Please claim later
          </p>
          <div>
            <span
              v-if="timeStatus"
              @click="mapId == 105 ? collectCyber() : collectScroll()"
              >{{ mapId == 105 ? "Claim W3ST" : "Claim POA" }}</span
            >
            <span v-else style="background: #7a817c">
              {{ mapId == 105 ? "Claim W3ST" : "Claim POA" }}
            </span>
          </div>
        </div>
        <div class="bgImg bgImg_right">
          <img class="right" src="../assets/taskright.png" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { TwemojiPicker } from "@kevinfaguiar/vue-twemoji-picker";
import EmojiAllData from "@kevinfaguiar/vue-twemoji-picker/emoji-data/en/emoji-all-groups.json";
import EmojiGroups from "@kevinfaguiar/vue-twemoji-picker/emoji-data/emoji-groups.json";
import $ from "jquery";
import axios from "axios";
// import MiniCard from "../components/Minicard.vue";

import { abi } from "../abi";
var Contract = require("web3-eth-contract");
Contract.setProvider(window.ethereum);
let W3Contract = new Contract(
  abi,
  "0x2723522702093601e6360cae665518c4f63e9da6"
);

import { collectAbi } from "../abi/scrollcollect";
let collectContract = new Contract(
  collectAbi,
  "0x1a11900D46FF16F62298e440636E0B1db8202A74"
);

import { scrollAbi } from "../abi/scroll";
let ScrollContract = new Contract(
  scrollAbi,
  "0x1048DbD7f513740bF0C667181fF5b88538e2DC8E"
);

import CyberConnect, { Env } from "@cyberlab/cyberconnect-v2";
const cyberConnect = new CyberConnect({
  namespace: "w3Space",
  env: Env.Production,
  provider: window.ethereum,
  signingMessageEntity: "w3Space",
});

export default {
  name: "LiveChat",
  components: {
    "twemoji-picker": TwemojiPicker,
  },
  data() {
    return {
      msgtype: 0,
      message: "",
      showDialogue: false,
      msgTextarea: "",
      liveTextarea: "",
      showControls: false,
      showChat: false,
      msgTypeQa: false,
      openCard: false,
      applause: false,
      openHeart: false,
      raisehand: false,
      handArr: [],
      handList: [],
      msgList: [],
      qaList: [],
      topbarrage: [],
      chatUser: {},
      chatList: [],
      timecheck: null,
      currentMore: -1,
      timeBar1: null,
      timeBar2: null,
      isLoadingMsg: false,
      lastid: 0,
      hoverMsg: false,
      liveUserNum: 0,
      currentOff: -1,
      lineInfo: [],
      lineId: 0,
      currentLineNum: "0-100",
      showLineList: false,
      // currentLive: [],
      newFriends: false,
      poap: 0,
      opIndex: 0,
      showQaNum: false,
      showConnectWallet: false,
      showClaim: false,
      timeStatus: false,
      colorList: [
        "#ED6B66",
        "#5DC7E9",
        "#E95DC2",
        "#70EF8D",
        "#71F1F2",
        "#8eb471",
        "#e8e2b6",
        "#8cd7cb",
        "#e19974",
      ],
      changeccProfile: {},
      ccprofileFollowList: [],
      ccfollowList: [],
      oldFollowLength: 0,
      typingUser: "",
    };
  },
  props: [
    "webRtc",
    "liveVideos",
    "membersList",
    "nearBylist",
    "openLiveAudio",
    "followList",
    "vueTalkMsg",
    "otherInfoList",
    "currentMapId",
    "currentLive",
    "account",
    "mapId",
  ],
  computed: {
    emojiDataAll() {
      return EmojiAllData;
    },
    emojiGroups() {
      return EmojiGroups;
    },
    friendsList() {
      return this.$store.state.friendsList || [];
    },
  },
  async created() {
    // this.queryccProfile();
    await this.querybarrage(15);
    //window.lineinfo 和 window.enterline
    window["lineinfo"] = async (data) => {
      if (data.Ary) {
        console.log("lineinfo", data.Ary);
        this.lineInfo = data.Ary;
      }
    };
    window["enterline"] = async (data) => {
      console.log("enterline", data);
      this.lineId = data.id;
      this.getCurrentLine();
      this.webRtc.closeAllPeer();
    };
    //querybarrage
    window["querybarrage"] = async (data) => {
      if (data.Ary) {
        // this.isLoadingMsg = false;
        if (this.msgList.length <= 0) {
          this.msgList = data.Ary.reverse();
          this.$nextTick(() => {
            setTimeout(() => {
              var container = this.$el.querySelector("#msgInfo");
              container.scrollTop = container.scrollHeight;
            }, 100);
          });
        } else {
          let dataArr = data.Ary.reverse();
          dataArr.forEach((e) => {
            this.msgList.unshift(e);
          });
          document
            .querySelector("#msg" + this.lastid)
            .scrollIntoView({ behavior: "smooth" });
        }
        // this.isLoadingMsg = true;
      }

      // console.log("msgList", this.msgList);
    };

    window["exchangecard"] = async (data) => {
      let that = this;
      if (that.msgtype !== 2) {
        that.newFriends = true;
      }

      await this.webRtc.sendToGdevelop("queryother", {
        isaddress: 0,
        ids: JSON.stringify(data.TargetID),
      });
      setTimeout(() => {
        this.otherInfoList.forEach((item) => {
          if (item.id === data.TargetID) {
            let newArr = that.friendsList;
            newArr.push(item);
            this.$store.commit("setFriendsList", JSON.stringify(newArr));
          }
        });
        this.$emit("addFollowList", { data });
      }, 2000);
    };
    window["delfriend"] = async (data) => {
      let that = this;
      let friendsData = that.friendsList;
      friendsData.forEach((item, index) => {
        if (item.id === data.TargetID) {
          friendsData.splice(index, 1);
          this.$store.commit("setFriendsList", JSON.stringify(friendsData));
        }
      });
      this.$emit("removeFollowList", data);
      this.$store.commit("removeTalkMsg", data);
    };
    window["barrage"] = async (data) => {
      this.msgList.push(data);
      if (!this.hoverMsg) {
        this.$nextTick(() => {
          setTimeout(() => {
            var container = this.$el.querySelector("#msgInfo");
            container.scrollTop = container.scrollHeight;
          }, 100);
        });
      }
    };
    window["topbarrage"] = async (data) => {
      if (data.Ary) {
        this.topbarrage = data.Ary;
        // let conn1 = 0;
        // this.timeBar1 = setInterval(() => {
        //   conn1 = conn1 + 0.5;
        //   document
        //     .querySelector(".ranking")
        //     .style.setProperty("--bar1", conn1 + "%");
        //   if (conn1 >= 100) {
        //     clearInterval(this.timeBar1);
        //     document
        //       .querySelector(".ranking")
        //       .style.setProperty("--bar1", "100%");
        //   }
        // }, 100);
 
        // let conn2 = 0;
        // this.timeBar2 = setInterval(() => {
        //   conn2 = conn2 + 0.3;
        //   document
        //     .querySelector(".ranking")
        //     .style.setProperty("--bar2", conn2 + "%");
        //   if (conn2 >= 100) {
        //     clearInterval(this.timeBar2);
        //     document
        //       .querySelector(".ranking")
        //       .style.setProperty("--bar2", "100%");
        //   }
        // }, 50);
      } else {
        this.topbarrage = [];
        // document.querySelector(".ranking").style.setProperty("--bar1", "0%");
        // document.querySelector(".ranking").style.setProperty("--bar2", "0%");
      }
    };
    window["quizbarrage"] = async (data) => {
      this.qaList = data.Ary;
    };
    window["support"] = async (data) => {
      this.msgList.forEach((item) => {
        if (item.id === data.id) {
          if (data.set === 0) {
            item.support = item.support - 1;
          } else {
            item.support = item.support + 1;
          }
        }
      });
    };
    window["handset"] = async (list) => {
      if (list.ary) {
        this.handList = [];
        var arr = list.ary;
        var ids = arr.join("-");
        await this.webRtc.sendToGdevelop("queryother", {
          isaddress: 0,
          ids: JSON.stringify(ids),
        });
        setTimeout(() => {
          list.ary.forEach((item) => {
            this.getHandItem(item);
          });
        }, 500);
      } else {
        this.handList = [];
      }
    };
    window["raisehand"] = async (data) => {
      if (data.set === 1) {
        await this.webRtc.sendToGdevelop("queryother", {
          isaddress: 0,
          ids: JSON.stringify(data.id),
        });
        setTimeout(() => {
          this.getHandItem(data.id);
        }, 500);
      } else {
        this.handList.forEach((item, index) => {
          if (item.id === data.id) {
            this.handList.splice(index, 1);
          }
        });
      }
    };
    window["queryChatOK"] = async (list) => {
      if (list.Ary !== null) {
        let ary = list.Ary;
        for (let i = 0; i < ary.length; i++) {
          if (
            JSON.parse(ary[i]).sender !== this.nearBylist[0].id &&
            JSON.parse(ary[i]).target !== this.currentMapId &&
            JSON.parse(ary[i]).target === this.nearBylist[0].id
          ) {
            this.$store.commit("addTalkMsg", JSON.parse(ary[i]));
          }
        }
        this.$emit("getTeamListUnread");
      }
    };
    window["openPoap"] = async (time) => {
      // console.log("time", time);
      let m = time / 60;
      if (time !== undefined && parseInt(m) < 15) {
        this.showClaim = true;
      } else {
        this.timeStatus = true;
        if (localStorage.getItem("useWallet") != "true") {
          this.showConnectWallet = true;
        } else {
          this.showClaim = true;
        }
      }
    };

    // platforminfo
    window["platforminfo"] = async (info, profile) => {
      let headurl = await this.getRoleImg({
        image: info.imageIndex,
        nftid: info.nftInfo.id,
        nftname: info.nftInfo.name,
      });
      if (this.mapId == 105) {
        let ccProfile = await this.queryccProfile(info.address);
        this.changeccProfile = ccProfile;
        if (ccProfile.primaryProfile == null) {
          profile(headurl, "", false);
        } else {
          profile(
            headurl,
            ccProfile.primaryProfile.handle,
            ccProfile.primaryProfile.isFollowedByMe
          );
        }
      } else {
        //TODO 202
        let isUser = await ScrollContract.methods
          .getProfile(info.address)
          .call();
        if (isUser) {
          let followType = await ScrollContract.methods
            .isFollowed(info.address, this.account)
            .call();
          console.log(followType);
          profile(headurl, isUser, followType);
        } else {
          profile(headurl, "", false);
        }
      }
    };

    window["platformfollow"] = async (info, follow) => {
      console.log(info);

      if (info._beUserFollow) {
        if (this.mapId == 105) {
          cyberConnect.unfollow(this.changeccProfile.primaryProfile.handle);
        } else {
          //TODO 202
          let result = await ScrollContract.methods
            .unfollow(info.address)
            .send({
              from: this.account,
            });
          console.log("result", result);
        }
        follow(false);
      } else {
        if (this.mapId == 105) {
          cyberConnect.follow(this.changeccProfile.primaryProfile.handle);
        } else {
          //TODO 202
          let result = await ScrollContract.methods.follow(info.address).send({
            from: this.account,
          });
          console.log("result", result);
        }
        follow(true);
      }
    };

    // privatemsg
    window["privatemsg"] = async (info) => {
      // console.log(info);
      this.msgtype = 2;
      this.showDialogue = true;
      this.showChat = true;
      $(".liveMain").css("height", "65vh");
      $(".liveChatMain").css("height", "calc(65vh - 90px)");
      let props = {
        id: info.id,
        nickname: info.nickname,
        image: info.imageIndex,
        status: info.status,
        nftname: info.nftInfo.name,
        nftid: info.nftInfo.id,
        address: info.address,
      };
      this.goSendMsg(props);
    };

    this.setHandList();
    setTimeout(() => {
      this.getLineInfo();
    }, 2000);

    // console.log(this.nearBylist[0]);

    window["userinput"] = async (data) => {
      // console.log("============", data);
      if (data && data.info.input == true) {
        this.typingUser = data.info.name;
      }
      if (data.info.input == false || data.info.id === this.nearBylist[0].id) {
        this.typingUser = "";
      }
    };

    window["onRecvSponsorLive"] = async (user) => {
      if (user.sponsorLive == 1) {
        this.$emit("topTips", {
          alert:
            "You've been promoted to speaker and your ideas can now be shared on stage!",
          time: 5000,
        });
      }
    };

    window["leaveline"] = async (data) => {
      this.webRtc.closePeer(data);
    };
  },
  methods: {
    handleMouseEnter() {
      this.webRtc.sendToGdevelop("userinput", {
        info: {
          id: this.nearBylist[0].id,
          name: this.nearBylist[0].nickname,
          input: true,
        },
      });
    },

    handleMouseLeave() {
      this.webRtc.sendToGdevelop("userinput", {
        info: {
          id: this.nearBylist[0].id,
          name: this.nearBylist[0].nickname,
          input: false,
        },
      });
    },

    // async showMiniCard(item) {
    //   if (item.showCard && item.showCard == true) {
    //     // item.showCard = false;
    //   } else {
    //     // item.showCard = true;
    //     console.log(item);
    //     // let ccProfile = await this.queryccProfile(item.opid);
    //     // console.log(ccProfile)
    //   }
    // },
    // async ccUnFollow(address) {
    //   let ccProfile = await this.queryccProfile(address);
    //   // console.log(ccProfile);
    //   cyberConnect.unfollow(ccProfile.primaryProfile.handle);
    //   setTimeout(() => {
    //     this.setccProfileFollowList();
    //   }, 200);
    // },

    //TODO 202
    async setScrollFollowList() {
      let result = await ScrollContract.methods
        .getFollowings(this.account)
        .call();
      console.log("list",result);
      if (result && result.length > 0) {
        this.ccfollowList = result;
        let list;
        this.ccfollowList.forEach((element) => {
          if (list) {
            list = list + "-" + element.wallet;
          } else {
            list = element.wallet;
          }
        });
        await this.webRtc.sendToGdevelop("queryother", {
          isaddress: 1,
          ids: JSON.stringify(list),
        });
        setTimeout(() => {
          let that = this;
          if (that.ccfollowList.length > that.oldFollowLength) {
            that.ccprofileFollowList = [];
            that.otherInfoList.forEach((item) => {
              // that.ccprofileFollowList.push(item);
              that.ccfollowList.forEach((cc) => {
                if (item.openid == cc.wallet.toLowerCase()) {
                  that.ccprofileFollowList.push(item);
                }
              });
            });
          } else if (that.ccfollowList.length < that.oldFollowLength) {
            that.ccprofileFollowList = [];
            that.otherInfoList.forEach((item) => {
              // that.ccprofileFollowList.push(item);
              that.ccfollowList.forEach((cc) => {
                if (item.openid == cc.wallet.toLowerCase()) {
                  that.ccprofileFollowList.push(item);
                }
              });
            });
          }
          this.oldFollowLength = this.ccfollowList.length;
        }, 1000);
      }
    },

    async setccProfileFollowList() {
      let res = await axios.post("https://api.cyberconnect.dev/", {
        operationName: "getFollowingsByAddressEVM",
        query:
          "query getFollowingsByAddressEVM($address: AddressEVM!) {\n  address(address: $address) {\n    followingCount\n    followings {\n      totalCount\n      edges {\n        node {\n          profile {\n            id\n            handle\n            owner {\n              address\n            }\n          }\n        }\n      }\n    }\n  }\n}",
        variables: {
          address: this.account,
          me: this.account,
        },
      });
      // console.log(res.data.data.address.followings.edges);
      this.ccfollowList = res.data.data.address.followings.edges;
      let list;
      this.ccfollowList.forEach((element) => {
        if (list) {
          list = list + "-" + element.node.profile.owner.address;
        } else {
          list = element.node.profile.owner.address;
        }
      });
      await this.webRtc.sendToGdevelop("queryother", {
        isaddress: 1,
        ids: JSON.stringify(list),
      });
      setTimeout(() => {
        let that = this;
        if (that.ccfollowList.length > that.oldFollowLength) {
          that.ccprofileFollowList = [];
          that.otherInfoList.forEach((item) => {
            // that.ccprofileFollowList.push(item);
            that.ccfollowList.forEach((cc) => {
              if (item.openid == cc.node.profile.owner.address.toLowerCase()) {
                that.ccprofileFollowList.push(item);
              }
            });
          });
        } else if (that.ccfollowList.length < that.oldFollowLength) {
          that.ccprofileFollowList = [];
          that.otherInfoList.forEach((item) => {
            // that.ccprofileFollowList.push(item);
            that.ccfollowList.forEach((cc) => {
              if (item.openid == cc.node.profile.owner.address.toLowerCase()) {
                that.ccprofileFollowList.push(item);
              }
            });
          });
        }
        this.oldFollowLength = this.ccfollowList.length;
      }, 1000);
    },
    async queryccProfile(address) {
      let res = await axios.post("https://api.cyberconnect.dev/", {
        query:
          "query getFollowingsByAddressEVM($address: AddressEVM!, $me: AddressEVM!) {\n  address(address: $address) {\n    wallet {\n      address\n      primaryProfile {\n        avatar\n        id\n        handle\n        isPrimary\n        isFollowedByMe(me: $me)\n      }\n    }\n  }\n}",
        variables: {
          address: address,
          me: this.account,
        },
      });
      return res.data.data.address.wallet;
      // console.log("resresresresresres", res.data.data.address.wallet);
    },
    async collectCyber() {
      this.showClaim = false;
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x38" }],
      });
      let a = {
        collector: this.account,
        profileId: 85457,
        essenceId: 2,
      };
      let result = await W3Contract.methods.collect(a, "0x0", "0x0").send({
        from: this.account,
      });
      // console.log(result);
      if (result.status == true) {
        this.$emit("topTips", {
          alert: "Received successfully.",
          time: 3000,
        });
      }
    },

    async collectScroll() {
      this.showClaim = false;
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x82751" }],
      });
      let result = await collectContract.methods.collect().send({
        from: this.account,
      });
      // console.log(result);
      if (result.status == true) {
        this.$emit("topTips", {
          alert: "Received successfully.",
          time: 3000,
        });
      }
    },

    getQa() {
      if (!this.showChat) {
        if (this.msgTypeQa == true) {
          $(".liveMain").css("height", "90px");
        } else {
          $(".liveMain").css("height", "70px");
        }
      }
    },

    changeMsgStatus(id) {
      if (this.msgtype == 0) {
        $(".liveChatMain").css("height", "calc(65vh - 90px)");
        if (this.showChat == false) {
          $(".liveMain").css("height", "65vh");
          this.showChat = true;
        }
      }
      this.vueTalkMsg.forEach((val) => {
        if (
          ((val.sender === id && val.target === this.nearBylist[0].id) ||
            (val.sender === this.nearBylist[0].id && val.target === id)) &&
          val.target !== 1
        ) {
          val.read = true;
        }
      });
    },
    getFriendsUnreadNum() {
      let isUnreadNum = false;
      this.ccprofileFollowList.forEach((item) => {
        let list = this.vueTalkMsg.filter(
          (val) =>
            ((val.sender === item.id && val.target === this.nearBylist[0].id) ||
              (val.sender === this.nearBylist[0].id &&
                val.target === item.id)) &&
            val.target !== 1 &&
            !val.read &&
            val.sender !== this.nearBylist[0].id
        );
        if (list && list.length > 0) {
          isUnreadNum = true;
        }
      });
      return isUnreadNum;
    },
    setPoap(e) {
      this.webRtc.sendToGdevelop("coinact", { set: e });
      this.poap = e;
    },
    closeCard() {
      if (this.openCard === true) {
        this.openCard = false;
        this.webRtc.sendToGdevelop("opencard", { set: 0 });
      }
    },
    startFootball() {
      this.webRtc.sendToGdevelop("football", {});
    },
    showOpening() {
      this.webRtc.sendToGdevelop("playplatform", {});
    },
    getSupport(item) {
      let arr = this.msgList.filter((val) => val.id === item.id);
      return arr[0].support ? arr[0].support : item.support;
    },
    getCurrentLine() {
      let num = this.lineId * 100;
      this.currentLineNum = num - 99 + "-" + num;
    },
    getLineNum(id) {
      let num = id * 100;
      return num - 99 + "-" + num;
    },
    getLineInfo() {
      // console.log("请求lineinfo");
      this.webRtc.sendToGdevelop("lineinfo");
    },
    enterLine(id) {
      if (id !== this.lineId) {
        if (id == -1 || id == 0) {
          this.webRtc.sendToGdevelop("enterline", { id: this.lineInfo.length });
        } else if (id > this.lineInfo.length) {
          this.webRtc.sendToGdevelop("enterline", { id: 1 });
        } else {
          this.webRtc.sendToGdevelop("enterline", { id: id });
        }
      }
    },
    getClosehandStatus(id) {
      this.handList.forEach((element) => {
        if (element.id === id) {
          element.sponsorLive = 0;
        }
      });
    },
    flymap() {
      this.webRtc.sendToGdevelop("flymap", { mapid: 102, x: 27, y: 33 });
    },
    scrollEvent() {
      //&& this.isLoadingMsg === true
      if (this.$refs.scrollDiv.scrollTop === 0) {
        if (this.msgList[0].id > 1) {
          this.querybarrage(5);
        }
      }
    },
    async querybarrage(count) {
      this.webRtc.sendToGdevelop("querybarrage", {
        lastid: this.msgList.length > 0 ? this.msgList[0].id : 0,
        count: count,
      });
      this.lastid = this.msgList.length > 0 ? this.msgList[0].id : 0;
    },
    setFriendsList() {
      let that = this;
      // console.log("followList1111", this.followList);
      if (that.friendsList.length <= 0 && that.followList.length > 0) {
        this.$store.commit("setFriendsList", JSON.stringify(that.followList));
      }
    },
    removeFriend(id) {
      // console.log(id);
      //delfriend
      this.webRtc.sendToGdevelop("delfriend", {
        id: id,
      });
    },
    stickToTop(i) {
      let newList = this.friendsList;
      newList.unshift(newList[i]);
      newList.splice(i + 1, 1);
      this.$store.commit("setFriendsList", JSON.stringify(newList));
    },
    getMore(index) {
      if (index === this.currentMore) {
        this.currentMore = -1;
      } else {
        this.currentMore = index;
      }
    },
    getCurrentOff(index) {
      if (this.nearBylist[0].sponsor === 1) {
        if (index === this.currentOff) {
          this.currentOff = -1;
        } else {
          this.currentOff = index;
        }
      }
    },
    getNewMsg(item, index) {
      if (item) {
        let list = this.vueTalkMsg.filter(
          (val) =>
            ((val.sender === item.id && val.target === this.nearBylist[0].id) ||
              (val.sender === this.nearBylist[0].id &&
                val.target === item.id)) &&
            val.target !== 1
        );
        this.ccprofileFollowList[index].length = list.length;
        if (list && list.length > 0) {
          this.ccprofileFollowList[index].msg = list[list.length - 1].msg;
          this.ccprofileFollowList[index].time = list[list.length - 1].time;
          this.ccprofileFollowList[index].sender = list[list.length - 1].sender;
          this.ccprofileFollowList[index].read = list[list.length - 1].read
            ? list[list.length - 1].read
            : false;
        }
        return;
      }
    },
    goSendMsg(item) {
      // console.log(item);
      this.chatUser = item;
      console.log(item);
      this.chatList = this.vueTalkMsg.filter(
        (val) =>
          ((val.sender === item.id && val.target === this.nearBylist[0].id) ||
            (val.sender === this.nearBylist[0].id && val.target === item.id)) &&
          val.target !== 1
      );
      // console.log(this.chatList);
      this.$store.commit("addReadStatus", item);
    },
    changeSupport(id, set) {
      this.webRtc.sendToGdevelop("support", {
        id: id,
        set: set,
      });
    },
    dbChangeSupport(id, set) {
      let canlive = set === 0 ? 1 : 0;
      this.webRtc.sendToGdevelop("support", {
        id: id,
        set: canlive,
      });
    },
    queryQuizBarrage() {
      this.webRtc.sendToGdevelop("queryquizbarrage");
    },
    changeAudio(type) {
      if (type) {
        this.$emit("setLiveAudioClose");
      } else {
        this.$emit("setLiveAudioOpen");
      }
    },
    setLiveAudioOpen() {
      this.$emit("setLiveAudioOpen");
    },
    setLiveAudioClose() {
      this.$emit("setLiveAudioClose");
    },
    async setLivePower(role, e) {
      let canlive = e === 0 ? 1 : 0;
      this.webRtc.sendToGdevelop("setsponsorlive", {
        role: role,
        canlive: canlive,
      });
    },
    getLiveImg(id) {
      if (id) {
        let arr = 1;
        if (this.currentLive) {
          for (let i = 0; i < this.currentLive.length; i++) {
            if (this.currentLive[i].id == id) {
              arr = this.currentLive[i];
            }
          }
        }
        return this.getRoleImg(arr);
      }
    },
    getRoleImg(image) {
      if (image == 1) {
        return require("../assets/avatar" + 1 + ".png");
      }
      if (
        image !== undefined &&
        (image.nftname == "" || image.nftname == undefined)
      ) {
        return require("../assets/avatar" + image.image + ".png");
      }
      if (image !== undefined && image.nftname !== "") {
        switch (image.nftname) {
          case "BAYC":
            return (
              "https://bayc2.oss-cn-shenzhen.aliyuncs.com/pfp/BAYC" +
              image.nftid +
              ".png"
            );
          case "Doodles":
            return (
              "https://doodles.oss-cn-shenzhen.aliyuncs.com/pfp/Doodles" +
              image.nftid +
              ".png"
            );
          case "Mfers":
            return (
              "https://mfers2.oss-cn-shenzhen.aliyuncs.com/pfp/Mfers" +
              image.nftid +
              ".png"
            );
          case "MoonBirds":
            return (
              "https://moonbirds.oss-cn-shenzhen.aliyuncs.com/pfp/MoonBirds" +
              image.nftid +
              ".png"
            );
          case "CoolCats":
            return (
              "https://coolcats.oss-cn-shenzhen.aliyuncs.com/pfp/CoolCats" +
              image.nftid +
              ".png"
            );
          case "OkayBears":
            return (
              "https://OkayBears.oss-cn-shenzhen.aliyuncs.com/pfp/OkayBears" +
              image.nftid +
              ".png"
            );
          // case "WeirdoGhostGang":
          //   return (
          //     "https://WeirdoGhostGang.oss-cn-shenzhen.aliyuncs.com/pfp/WeirdoGhostGang" +
          //     image.nftid +
          //     ".png"
          //   );
          default:
            return (
              "https://bayc2.oss-cn-shenzhen.aliyuncs.com/pfp/BAYC" +
              image.nftid +
              ".png"
            );
        }
      }
    },
    getHandItem(id) {
      this.otherInfoList.forEach((v) => {
        if (id === v.id) {
          this.handList.push(v);
          //
          // let info = this.currentLive.filter((val) => id === val.id);
          // if (info.length < 1) {
          //   this.handList.push(v);
          // } else {
          //   this.handList.push(info);
          // }
        }
      });
    },
    setHandList() {
      this.webRtc.sendToGdevelop("handset");
    },
    changeRaisehand() {
      this.raisehand = true;
      this.webRtc.sendToGdevelop("raisehand", { set: 1 });
    },
    findUserName(e) {
      // let a = e > 2e9 ? e - 1e9 : e;
      let a = (e % 10000) + 1010000000;
      // let userList = this.otherInfoList.concat(this.nearBylist);
      if (!this.currentLive) return e;
      for (let i = 0; i < this.currentLive.length; i++) {
        if (this.currentLive[i].id == a) return this.currentLive[i].nickname;
      }
      return e;
    },
    changeheart() {
      this.openHeart = true;
      this.webRtc.sendToGdevelop("love");
      setTimeout(() => {
        this.openHeart = false;
      }, 3000);
    },
    changeApplause() {
      this.applause = true;
      this.webRtc.sendToGdevelop("applause");
      setTimeout(() => {
        this.applause = false;
      }, 3000);
    },
    changeOpenCard() {
      this.openCard = !this.openCard;
      this.webRtc.sendToGdevelop("opencard", { set: this.openCard ? 1 : 0 });
    },
    cancelBubble(event) {
      this.$emit("cancelBubble", event);
    },
    emojiImgAddedLive(val) {
      let a = document.querySelector("#liveTextarea").innerHTML;
      this.liveTextarea = a + val;
    },
    emojiImgAdded(val) {
      let a = document.querySelector("#msgTextarea").innerHTML;
      this.msgTextarea = a + val;
    },

    textareaKeydown(e) {
      if (e.keyCode === 13) {
        this.sendMessage();
        e.preventDefault();
        return false;
      }
    },

    sendMessage() {
      if (this.msgTypeQa && this.calculatebyte() < 10) {
        this.showQaNum = true;
        return;
      }
      if (this.msgTypeQa && this.calculatebyte() > 250) {
        return;
      }
      let content = document.querySelector("#liveTextarea").innerHTML;
      if (content === "") {
        return;
      }
      while (content.indexOf("alt=") > 0) {
        let aa = content.indexOf("alt=");
        let b = content.slice(aa, aa + 9);
        let n = content.split(b);
        content = n[0] + n[1];
      }
      let obj = {
        id: 0,
        type: this.msgTypeQa == true ? 1 : 0,
        father: 0,
        content: JSON.stringify({
          msg: content,
          senderName: this.nearBylist[0].nickname,
          time: new Date(),
          head: this.nearBylist[0],
        }),
      };
      // console.log(obj);
      this.webRtc.sendToGdevelop("barrage", obj);
      this.liveTextarea = "";
      $("#liveTextarea").html("");
    },

    calculatebyte() {
      if (this.msgTypeQa == true && this.msgtype == 0) {
        let sTargetStr = document.querySelector("#liveTextarea").innerHTML;
        var sTmpStr, sTmpChar;
        var nOriginLen = 0;
        var nStrLength = 0;

        sTmpStr = new String(sTargetStr);
        nOriginLen = sTmpStr.length;

        for (var i = 0; i < nOriginLen; i++) {
          sTmpChar = sTmpStr.charAt(i);

          if (escape(sTmpChar).length > 4) {
            nStrLength += 2;
          } else if (sTmpChar != "/r") {
            nStrLength++;
          }
        }
        if (nStrLength >= 10 || nStrLength <= 0) {
          this.showQaNum = false;
        }
        return nStrLength;
      }
    },

    msgKeydown(e) {
      if (e.keyCode === 13) {
        this.sendChat();
        e.preventDefault();
        return false;
      }
    },

    sendChat() {
      this.sendToOther(
        this.chatUser.id,
        this.chatUser.nickname,
        this.chatUser.image
      );
    },

    sendToOther(target, targetName, targetHead) {
      let content = document.querySelector("#msgTextarea").innerHTML;
      let obj = {
        sender: this.nearBylist[0].id,
        senderName: this.nearBylist[0].nickname,
        head: this.nearBylist[0],
        target: target,
        targetName: targetName,
        targetHead: targetHead,
        msg: content,
        time: new Date(),
      };
      this.webRtc.sendToGdevelop("talk", obj);
      this.$store.commit("addTalkMsg", obj);

      this.chatList = this.vueTalkMsg.filter(
        (val) =>
          ((val.sender === this.chatUser.id &&
            val.target === this.nearBylist[0].id) ||
            (val.sender === this.nearBylist[0].id &&
              val.target === this.chatUser.id)) &&
          val.target !== 1
      );
      this.msgTextarea = "";
      $("#msgTextarea").html("");
    },

    showOrhiddenChat(type) {
      this.msgtype = 0;
      if (type === true) {
        if (this.msgTypeQa == true) {
          $(".liveMain").css("height", "90px");
        } else {
          $(".liveMain").css("height", "70px");
        }

        $(".liveChatMain").css("height", "0vh");
      } else {
        $(".liveMain").css("height", "65vh");
        $(".liveChatMain").css("height", "calc(65vh - 90px)");
      }
      this.showChat = !this.showChat;
    },
    timeago(dateTimeStamp) {
      if (dateTimeStamp) {
        let result;
        var timeStamp = new Date(dateTimeStamp);
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var week = day * 7;
        var month = day * 30;
        var now = new Date().getTime();
        var diffValue = now - timeStamp;

        if (diffValue < 0) {
          return;
        }
        var minC = diffValue / minute;
        var hourC = diffValue / hour;
        var dayC = diffValue / day;
        var weekC = diffValue / week;
        var monthC = diffValue / month;

        if (monthC >= 1 && monthC < 4) {
          result = " " + parseInt(monthC) + "month ago";
        } else if (weekC >= 1 && weekC < 4) {
          result = " " + parseInt(weekC) + "week ago";
        } else if (dayC >= 1 && dayC < 7) {
          result = " " + parseInt(dayC) + "day ago";
        } else if (hourC >= 1 && hourC < 24) {
          result = " " + parseInt(hourC) + "hour ago";
        } else if (minC >= 1 && minC < 60) {
          result = " " + parseInt(minC) + "mins ago";
        } else if (diffValue >= 0 && diffValue <= minute) {
          result = "just";
        } else {
          var datetime = new Date();
          datetime.setTime(timeStamp);
          var Nyear = datetime.getFullYear();
          var Nmonth =
            datetime.getMonth() + 1 < 10
              ? "0" + (datetime.getMonth() + 1)
              : datetime.getMonth() + 1;
          var Ndate =
            datetime.getDate() < 10
              ? "0" + datetime.getDate()
              : datetime.getDate();
          result = Nyear + "-" + Nmonth + "-" + Ndate;
        }
        return result;
      }
    },
  },
  watch: {
    ccprofileFollowList: function () {
      if (this.ccprofileFollowList.length !== 0) {
        this.timecheck = setInterval(() => {
          for (let j = 0; j < this.ccprofileFollowList.length; j++) {
            this.webRtc.sendToGdevelop("querychat", {
              targetID: this.ccprofileFollowList[j].id,
            });
          }
        }, 3000);
      } else {
        clearInterval(this.timecheck);
      }
    },

    otherInfoList: function () {
      // console.log(this.otherInfoList);
      // console.log(this.ccprofileFollowList);
      this.otherInfoList.forEach((item) => {
        this.ccprofileFollowList.forEach((cc, index) => {
          if (
            item.id == cc.id &&
            (item.nickname != cc.nickname ||
              item.image != cc.image ||
              item.nftid !== cc.nftid)
          ) {
            this.ccprofileFollowList[index] = item;
          }
        });
      });
    },
    // msgList: function () {
    //   debugger
    //   if (this.topbarrage.length > 0) {
    //     this.topbarrage.forEach((ele) => {
    //       let msg = this.msgList.filter((val) => val.id === ele.id);
    //       console.log(msg);
    //       ele.support = msg.support;
    //     });
    //   }
    // },
    vueTalkMsg: function () {
      this.chatList = this.vueTalkMsg.filter(
        (val) =>
          ((val.sender === this.chatUser.id &&
            val.target === this.nearBylist[0].id) ||
            (val.sender === this.nearBylist[0].id &&
              val.target === this.chatUser.id)) &&
          val.target !== 1
      );
      this.$nextTick(() => {
        setTimeout(() => {
          var container = this.$el.querySelector("#msgList");
          container.scrollTop = container.scrollHeight;
        }, 100);
      });
    },

    // getShowHost(id) {
    //   let uid = (id % 10000) + 1010000000;
    //   var arrindex = this.currentLive.findIndex((item) => {
    //     return item.id === uid;
    //   });
    //   console.log(arrindex);
    //   if(arrindex==0){
    //     return true
    //   }else{
    //     return false
    //   }
    // },

    async liveVideos() {
      this.liveVideos.forEach((ele) => {
        if (!ele.hidden) {
          let uid = (ele.uid % 10000) + 1010000000;
          var arrindex = this.currentLive.findIndex((item) => {
            // console.log(item.id, uid, item.sponsor, item.hidden);
            return item.id === uid && item.sponsor == 1;
          });
          // console.log(arrindex);
          if (arrindex > -1) {
            ele.isHost = true;
          } else {
            ele.isHost = false;
          }
        }
      });
      // console.log(this.liveVideos);
    },
  },
};
</script>
<style lang="stylus" scoped>
@import 'liveChat.styl'
</style>
<style lang="stylus">
p
  .emoji
    width 30px
    height 30px
    margin 0 5px
  .female
    width 30px !important
    height 30px !important
    margin 0 5px
</style>
