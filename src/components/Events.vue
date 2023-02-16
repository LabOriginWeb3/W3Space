<template>
  <div>
    <div class="officeBg" @click="closeEvent" v-show="eventsIndex === 0">
      <div class="officeCon" @click="cancelBubble($event)">
        <p class="close_frame" @click="closeEvent"><img src="../assets/close.svg"/></p>
        <div class="bgImg">
          <img class="left" src="../assets/bg-left.png" />
        </div>
        <div class="event0_info">
          <div
            :class="{ active: eventStatus === 0 }"
            @click="
              eventStatus = 0;
              eventsIndex = 2;
            "
            style="margin-right: 5px"
          >
            <img src="../assets/eventIcon/create.svg" />
            <p>CREATE EVENT</p>
          </div>
          <div
            :class="{ active: eventStatus === 1 }"
            @click="
              eventStatus = 1;
              eventsIndex = 1;
            "
            style="margin-left: 5px"
          >
            <img src="../assets/eventIcon/join.svg" />
            <p>JOIN EVENT</p>
          </div>
        </div>
        <div class="bgImg bgImg_right">
          <img class="right" src="../assets/taskright.png" />
        </div>
      </div>
    </div>
    <div v-show="eventsIndex === 1" class="officeBg" @click="closeEvent">
      <div
        class="officeCon"
        style="width: 420px; border-top-left-radius: 0"
        @click="cancelBubble($event)"
      >
        <div class="join_type">
          <div :class="{ active: joinIndex === 0 }" @click="joinIndex = 0">
            LIVE EVENTS
          </div>
          <div :class="{ active: joinIndex === 1 }" @click="joinIndex = 1">
            MY SCHEDULE
          </div>
        </div>
        <p
          class="close_frame"
          @click="closeEvent"
          style="margin-left: 395px !important"
        >
          <img src="../assets/close.svg"/>
        </p>
        <div class="bgImg">
          <img class="left" src="../assets/bg-left.png" />
        </div>
        <div v-show="joinIndex === 0">
          <h2>JOIN EVENT</h2>
          <div class="join_info">
            <div class="topType">
              <div :class="{ active: joinType === 0 }" @click="joinType = 0">
                LIVE
              </div>
              <div :class="{ active: joinType === 1 }" @click="joinType = 1">
                UPCOMING
              </div>
              <div :class="{ active: joinType === 2 }" @click="joinType = 2">
                PAST
              </div>
            </div>

            <div class="join_list">
              <div class="item">
                <div>
                  <div class="free">FREE</div>
                  <div class="banner">
                    <img src="../assets/eventIcon/demo.png" />
                  </div>
                  <span class="address">
                    <img src="../assets/eventIcon/address.png" />
                    <span>Dojo</span>
                  </span>
                </div>
                <div class="detail">
                  <p>MADAO Blockchain Hackathon</p>
                  <div class="num">
                    <img src="../assets/eventIcon/pop.png" />
                    <span>1,202</span>
                  </div>
                  <div class="button" @click="JoinEvent()">JOIN</div>
                </div>
              </div>
              <div class="item">
                <div>
                  <div class="banner">
                    <img src="../assets/eventIcon/demo.png" />
                  </div>
                  <span class="address">
                    <img src="../assets/eventIcon/address.png" />
                    <span>Dojo</span>
                  </span>
                </div>
                <div class="detail">
                  <p>MADAO Blockchain Hackathon</p>
                  <div class="num">
                    <img src="../assets/eventIcon/pop.png" />
                    <span>1,202</span>
                  </div>
                  <div class="button" @click="JoinEvent()">JOIN</div>
                </div>
              </div>
              <div class="item">
                <div>
                  <div class="lock">
                    <img src="../assets/eventIcon/lock.png" />
                  </div>
                  <div class="banner">
                    <img src="../assets/eventIcon/demo.png" />
                  </div>
                  <span class="address">
                    <img src="../assets/eventIcon/address.png" />
                    <span>Dojo111</span>
                  </span>
                </div>
                <div class="detail">
                  <p>MADAO Blockchain Hackathon</p>
                  <div class="num">
                    <img src="../assets/eventIcon/pop.png" />
                    <span>1,202</span>
                  </div>
                  <div class="button" @click="JoinEvent()">JOIN</div>
                </div>
              </div>
              <div class="item">
                <div>
                  <div class="free">FREE</div>
                  <div class="banner">
                    <img src="../assets/eventIcon/demo.png" />
                  </div>
                  <span class="address">
                    <img src="../assets/eventIcon/address.png" />
                    <span>Dojo</span>
                  </span>
                </div>
                <div class="detail">
                  <p>MADAO Blockchain Hackathon</p>
                  <div class="num">
                    <img src="../assets/eventIcon/pop.png" />
                    <span>1,202</span>
                  </div>
                  <div class="button" @click="JoinEvent()">JOIN</div>
                </div>
              </div>
            </div>
            <div class="arrows">
              <img src="../assets/eventIcon/arrows.png" alt="" />
            </div>
          </div>
        </div>
        <div v-show="joinIndex === 1" style="min-height: 500px">
          <h2>MY SCHEDULE</h2>
          <div class="join_info">
            <div class="topType">
              <div :class="{ active: joinType === 0 }" @click="joinType = 0">
                Ongoing
              </div>
              <div :class="{ active: joinType === 1 }" @click="joinType = 1">
                Booked
              </div>
              <div :class="{ active: joinType === 2 }" @click="joinType = 2">
                PAST
              </div>
            </div>
            <div class="join_list join_schedule">
              <div class="item">
                <div>
                  <div class="free">FREE</div>
                  <div class="banner">
                    <img src="../assets/eventIcon/demo.png" />
                  </div>
                  <span class="address">
                    <img src="../assets/eventIcon/address.png" />
                    <span>Dojo</span>
                  </span>
                </div>
                <div class="detail">
                  <p>AMA - Let’s Talk about DAO and Web3 upcoming future</p>
                  <div class="date">
                    <img src="../assets/eventIcon/date.svg" />
                    Today at 4:00 pm
                  </div>
                </div>
              </div>
              <div class="desc">
                <div class="user">
                  <img src="../assets/eventIcon/tx.svg" />0x123...12345
                </div>
                <div class="userList">
                  <img src="../assets/eventIcon/sl.svg" />+1220 GOING
                </div>
              </div>
              <div class="desc2">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              </div>
              <div class="flex_start ama">
                <p class="title">Organizer</p>
                <div class="flex_align participant">
                  <div>
                    <img src="../assets/avatar1.png" />
                    <p>May</p>
                  </div>
                </div>
              </div>
              <div class="flex_start ama">
                <p class="title">Speakers</p>
                <div class="flex_align participant">
                  <div>
                    <img src="../assets/avatar1.png" />
                    <p>May</p>
                  </div>
                  <div>
                    <img src="../assets/avatar1.png" />
                    <p>May</p>
                  </div>
                  <div>
                    <img src="../assets/avatar1.png" />
                    <p>May</p>
                  </div>
                </div>
              </div>
              <div class="joinButton" style="margin-bottom: 16px">
                <div class="button">JOIN</div>
              </div>
            </div>
          </div>
        </div>
        <div class="bgImg bgImg_right">
          <img class="right" src="../assets/taskright.png" />
        </div>
      </div>
    </div>
    <div class="officeBg" @click="closeEvent" v-show="showJoin">
      <div class="officeCon" style="width: 420px" @click="cancelBubble($event)">
        <p
          class="close_frame"
          style="margin-left: 395px !important"
          @click="closeEvent"
        >
         <img src="../assets/close.svg"/>
        </p>
        <div class="bgImg">
          <img class="left" src="../assets/bg-left.png" />
        </div>
        <h2>JOIN EVENT</h2>
        <div class="join_info">
          <div
            class="back"
            @click="
              eventStatus = 1;
              eventsIndex = 1;
              showJoin = false;
            "
          >
            <img
              src="../assets/eventIcon/arror_left.svg"
              style="margin-right: 5px"
            />Back
          </div>
          <div class="item">
            <div>
              <div class="free">FREE</div>
              <div class="banner">
                <img src="../assets/eventIcon/demo.png" />
              </div>
              <span class="address">
                <img src="../assets/eventIcon/address.png" />
                <span>Dojo</span>
              </span>
            </div>
            <div class="detail">
              <p style="height: 80px">MADAO Blockchain Hackathon</p>
              <div class="num">
                <img src="../assets/eventIcon/pop.png" />
                <span>1,202</span>
              </div>
            </div>
          </div>
          <p style="font-size: 16px; line-height: 22px; margin-top: 23px">
            Enter code to join
          </p>
          <div class="input-box">
            <div
              class="code-item"
              :class="
                codeValue.length == 0 && inputFocus ? 'code-item-active' : ''
              "
            >
              {{ codeValue[0] }}
            </div>
            <div
              class="code-item"
              :class="
                codeValue.length == 1 && inputFocus ? 'code-item-active' : ''
              "
            >
              {{ codeValue[1] }}
            </div>
            <div
              class="code-item"
              :class="
                codeValue.length == 2 && inputFocus ? 'code-item-active' : ''
              "
            >
              {{ codeValue[2] }}
            </div>
            <div
              class="code-item"
              :class="
                codeValue.length == 3 && inputFocus ? 'code-item-active' : ''
              "
            >
              {{ codeValue[3] }}
            </div>
            <div
              class="code-item"
              :class="
                codeValue.length == 4 && inputFocus ? 'code-item-active' : ''
              "
            >
              {{ codeValue[4] }}
            </div>
            <div
              class="code-item"
              :class="
                codeValue.length >= 5 && inputFocus ? 'code-item-active' : ''
              "
            >
              {{ codeValue[5] }}
            </div>
            <input
              class="input-code"
              v-model="codeValue"
              :maxlength="6"
              type="tel"
              @blur="codeInputBlur"
              @focus="codeInputFocus"
              @input="codeInputChange"
            />
          </div>
          <div class="joinButton">
            <div class="button">JOIN</div>
          </div>
        </div>
        <div class="bgImg bgImg_right">
          <img class="right" src="../assets/taskright.png" />
        </div>
      </div>
    </div>
    <div class="officeBg" @click="closeEvent" v-show="eventsIndex === 2">
      <div class="officeCon" style="width: 600px" @click="cancelBubble($event)">
        <p
          class="close_frame"
          style="margin-left: 575px !important"
          @click="closeEvent"
        >
          <img src="../assets/close.svg"/>
        </p>
        <div class="bgImg">
          <img class="left" src="../assets/bg-left.png" />
        </div>
        <h2>CREATE EVENT</h2>
        <div class="create_info">
          <div class="info_center">
            <div class="create_left" v-show="step === 0">
              <p style="text-align: center">Step 1 - Event Details</p>
              <p class="title">Host Address<span>*</span></p>
              <div class="flex_between val">
                <span class="font_m">0x464...51346</span>
                <span class="font_w">DYCA</span>
                <span class="font_g font_m">Unset</span>
                <div
                  class="miniBtn"
                  @click="(showTip = true), (tipType = 'hostEdit')"
                >
                  Edit
                </div>
              </div>
              <p class="title">Event Name<span>*</span></p>
              <input type="text" />
              <p class="title">Event Description<span>*</span></p>
              <textarea />
              <p class="title">Time<span>*</span></p>
              <div class="flex_between val_date">
                <input type="date" />
                <span
                  style="width: 20px; display: flex; justify-content: center"
                >
                  -
                </span>
                <input type="date" />
              </div>
              <p class="title">Ticket Price<span>*</span></p>
              <div class="flex_align val_radio">
                <div class="font_m">
                  <input
                    class="radio_type"
                    type="radio"
                    name="ticketType"
                    id="0"
                    value="Free"
                    v-model="ticketType"
                  />Free
                </div>
                <div class="font_m">
                  <input
                    class="radio_type"
                    type="radio"
                    name="ticketType"
                    id="1"
                    value="USDT"
                    v-model="ticketType"
                  />USDT
                </div>
                <div class="font_m">
                  <input
                    class="radio_type"
                    type="radio"
                    name="ticketType"
                    id="2"
                    value="ETH"
                    v-model="ticketType"
                  />ETH
                </div>
              </div>
              <div
                v-show="ticketType == 'USDT'"
                class="flex_align enter_amount"
              >
                <input type="text" placeholder="Enter Amount" />
                <span>per user</span>
              </div>
              <div class="flex_between">
                <p class="title">Speaker</p>
                <div
                  class="flex_center btnAdd"
                  @click="(showTip = true), (tipType = 'speakerAdd')"
                >
                  <img src="../assets/eventIcon/icon_btnadd.svg" /> Add
                </div>
              </div>
              <div>
                <div class="flex_between val speakerItem">
                  <span class="font_m">0x464...51346</span>
                  <span class="font_w">John Doe</span>
                  <span class="font_m">BAYC</span>
                  <div
                    class="miniBtn"
                    @click="(showTip = true), (tipType = 'speakerEdit')"
                  >
                    Edit
                  </div>
                </div>
              </div>
              <div class="button crButton" @click="step = 1">Next</div>
            </div>
            <div class="create_right" v-show="step === 1">
              <p style="text-align: center">Step 2 - Event Image</p>
              <p class="title">Upload Event Banner<span>*</span></p>
              <div class="UPimage Banner">
                <div class="upImgSrc">
                  <img :src="bannerSrc" />
                </div>
                <div class="selectUpImg" v-if="!bannerSrc || bannerSrc === ''">
                  <img src="../assets/eventIcon/icon_imgmini.png" />
                </div>
                <input
                  class="filePrew"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  @change="addImage($event, 'Banner')"
                  ref="bannerImg"
                />
              </div>
              <p>Upload Logo</p>
              <div class="UPimage Logo">
                <div class="upImgSrc">
                  <img :src="LogoSrc" />
                </div>
                <div class="selectUpImg" v-if="!LogoSrc || LogoSrc === ''">
                  <img src="../assets/eventIcon/icon_imgadd.png" />
                </div>
                <input
                  class="filePrew"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  @change="addImage($event, 'Logo')"
                  ref="LogoImg"
                />
              </div>
              <p class="title">Choose Room<span>*</span></p>
              <div class="flex_align" style="margin-top: 10px">
                <div>
                  <p class="font_m">Waterfall</p>
                  <div class="UPimage Room">
                    <div class="upImgSrc">
                      <img :src="WaterfallSrc" />
                    </div>
                    <div
                      class="selectUpImg"
                      v-if="!WaterfallSrc || WaterfallSrc === ''"
                    >
                      <img src="../assets/eventIcon/icon_imgBig.png" />
                    </div>
                    <input
                      class="filePrew"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      @change="addImage($event, 'Waterfall')"
                      ref="WaterfallImg"
                    />
                  </div>
                </div>
                <div style="margin-left: 20px">
                  <p class="font_m">Karaoke</p>
                  <div class="UPimage Room">
                    <div class="upImgSrc">
                      <img :src="KaraokeSrc" />
                    </div>
                    <div
                      class="selectUpImg"
                      v-if="!KaraokeSrc || KaraokeSrc === ''"
                    >
                      <img src="../assets/eventIcon/icon_imgBig.png" />
                    </div>
                    <input
                      class="filePrew"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      @change="addImage($event, 'Karaoke')"
                      ref="KaraokeImg"
                    />
                  </div>
                </div>
              </div>
              <div class="flex_between font_gray">
                <p>Network Fee</p>
                <span class="font_m" style="font-size: 14px;">$2.74</span>
              </div>
              <div class="flex_start_between font_gray">
                <img src="../assets/eventIcon/icon_desc.svg" />
                <span class="font_m" style="font-size: 14px;"
                  >Please note that once this form submit, the information is
                  not editable apart from %event_cover, time, speakers%</span
                >
              </div>
              <div class="button crButton" @click="showCreateSuccess = true">
                Create & Sign
              </div>
            </div>
          </div>
        </div>
        <div class="bgImg bgImg_right">
          <img class="right" src="../assets/taskright.png" />
        </div>
      </div>
    </div>

    <div v-show="showTip" class="tip">
      <div class="TipCon">
        <div class="close" @click="showTip = false">
          <img src="../assets/eventIcon/icon_close.png" />
        </div>
        <p class="toptitle">
          {{ tipType === "speakerAdd" ? "Add Speaker" : "Edit" }}
        </p>
        <p class="title">Username<span>*</span></p>
        <input type="text" />
        <p class="title">Wallet Address<span>*</span></p>
        <input type="text" />
        <p class="title">Project belong</p>
        <input
          class="choose"
          type="text"
          readonly
          v-model="optionVal"
          @click="showOption = !showOption"
        />
        <div class="option" v-show="showOption">
          <ul>
            <li
              @click="
                showOption = false;
                optionVal = 'Bored Ape Yacht Club';
              "
            >
              <img src="../assets/eventIcon/event01.png" />Bored Ape Yacht Club
            </li>
            <li
              @click="
                showOption = false;
                optionVal = 'MakerDao';
              "
            >
              <img src="../assets/eventIcon/event01.png" />MakerDao
            </li>
            <li
              @click="
                showOption = false;
                optionVal = 'Curve Finance';
              "
            >
              <img src="../assets/eventIcon/event01.png" />Curve Finance
            </li>
          </ul>
        </div>
        <div class="button crButton">
          {{ tipType === "speakerAdd" ? "Add Speaker" : "Save" }}
        </div>
        <div v-show="tipType !== 'hostEdit'" class="remove">
          Remove this speaker
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Events",
  data() {
    return {
      eventsIndex: 0,
      eventStatus: 0,
      joinType: 0,
      joinIndex: 0,
      showJoin: false,
      showCreate: false,

      time: 0,
      codeValue: "",
      inputFocus: false,

      filterType: 0,
      eventId: 0,
      ticketType: "USDT",
      bannerSrc: null,
      bannerFile: null,

      LogoSrc: null,
      LogoFile: null,

      WaterfallSrc: null,
      WaterfallFile: null,

      KaraokeSrc: null,
      KaraokeFile: null,

      showTip: false,
      tipType: null,

      optionVal: "",
      showOption: false,
      showCreateSuccess: false,

      step: 0,
    };
  },
  props: [],
  computed: {},
  created() {},
  methods: {
    cancelBubble(event) {
      this.$emit("cancelBubble", event);
    },
    closeEvent() {
      // this.$emit("closeEvent");
      console.log(111);
    },
    JoinEvent() {
      this.showJoin = true;
      this.eventsIndex = -1;
      this.eventStatus = -1;
    },

    // 验证码输入框input
    codeInputChange() {
      if (this.codeValue && this.codeValue.length >= 6) {
        // do soming...
      }
    },
    // 验证码输入框失去焦点
    codeInputBlur() {
      this.inputFocus = false;
    },
    // 验证码输入框获取到焦点
    codeInputFocus() {
      this.inputFocus = true;
    },

    addImage(e, type) {
      var that = this;
      var f = new FileReader();
      if (type === "Banner") {
        that.bannerFile = e.target.files[0];
        f.readAsDataURL(this.$refs.bannerImg.files[0]);
        f.onload = function () {
          that.bannerSrc = f.result;
        };
      }
      if (type === "Logo") {
        that.LogoFile = e.target.files[0];
        f.readAsDataURL(this.$refs.LogoImg.files[0]);
        f.onload = function () {
          that.LogoSrc = f.result;
        };
      }
      if (type === "Waterfall") {
        that.WaterfallFile = e.target.files[0];
        f.readAsDataURL(this.$refs.WaterfallImg.files[0]);
        f.onload = function () {
          that.WaterfallSrc = f.result;
        };
      }
      if (type === "Karaoke") {
        that.KaraokeFile = e.target.files[0];
        f.readAsDataURL(this.$refs.KaraokeImg.files[0]);
        f.onload = function () {
          that.KaraokeSrc = f.result;
        };
      }
    },
  },
  watch: {},
};
</script>
<style lang="stylus" scoped>
@import 'create.styl'
@import '../views/home.styl'
*
  font-family 'Noto Sans bold'
.event0_info
  display flex
  justify-content center
  margin-top 20px
  div
    background #FFFFFF
    border 1px solid #B7B7B7
    border-radius 6px
    width 158px
    height 147px
    display flex
    justify-content center
    flex-wrap wrap
    cursor pointer
    &:hover
      border-color #000
    &.active
      border-color #000
    img
      padding-top 25px
    p
      font-weight 700
      font-size 18px
      line-height 25px
      color #000
.join_info
  padding 0px 16px
  .back
    text-align left
    color #777777
    font-size 14px
    font-family 'Noto Sans'
    cursor pointer
  .topType
    display flex
    justify-content space-around
    width 100%
    height 51px
    left 768px
    top 182px
    background #FFFFFF
    border-radius 6px
    align-items center
    color #777777
    font-size 14px
    div
      width 111px
      height 39px
      border-radius 6px
      display flex
      justify-content center
      align-items center
      cursor pointer
      font-weight 700
      &.active
        background #70ef8d
        color #000
      &:hover
        background #70ef8d
        color #000
  .item
    display flex
    margin-top 10px
    padding 16px 5px 16px 16px
    background #fff
    border-radius 6px
    color #000
    border 1px solid #D8D8D8
    overflow hidden
    position relative
    .banner
      img
        border-radius 6px
        width 205px
        height 102px
        margin-right 20px
    .free
      background #71f1f2
      color #fff
      position absolute
      padding 0 30px
      transform rotate(310deg)
      margin-left -46px
      font-size 16px
      font-family 'Noto Sans'
      margin-top -6px
    .lock
      position absolute
      background url('../assets/eventIcon/lockbg.png')
      background-size 100%
      width 24px
      height 45px
      display flex
      justify-content center
      align-items center
      margin-top -20px
      margin-left 5px
    .address
      background #edededd1
      padding 2px 10px
      border-radius 6px
      font-family none
      font-size 12px
      line-height 16px
      align-items center
      color #000
      position absolute
      margin-top -29px
      right 170px
      img
        margin-right 5px
    .detail
      font-size 12px
      text-align left
      color #000
      p
        height 42px
        overflow hidden
        text-overflow ellipsis
        display -webkit-box
        -webkit-line-clamp 3
        -webkit-box-orient vertical
      .num
        margin-top 8px
        img
          margin-right 5px
.button
  font-family 'Silkscreen'
  width 123px
  height 30px
  background #70EF8D
  border-radius 6px
  display flex
  justify-content center
  align-items center
  font-size 14px
  color #000
  margin-top 8px
  cursor pointer
  &:hover
    background #5AC873
.arrows
  img
    position fixed
    animation example 0.8s infinite linear
    cursor pointer
  @keyframes example
    0%
      transform translateY(0)
    25%
      transform translateY(-5px)
    50%
      transform translateY(0)
    75%
      transform translateY(5px)
    100%
      transform translateY(0)
.join_type
  position absolute
  display flex
  margin-top -51px
  margin-left -14px
  div
    background #232222
    border-radius 10px 10px 0px 0px
    color #fff
    padding 8px 15px
    margin-right 8px
    cursor pointer
    &.active
      background #383838
      color #70EF8D
.input-box
  width 80%
  display flex
  align-items center
  justify-content space-around
  margin-top 20px
  position relative
  padding 0px 15px
  box-sizing border-box
  margin-left 10%
  .input-code
    width 100%
    height 40px
    position absolute
    left 0px
    top 0px
    box-sizing border-box
    color transparent
    background-color transparent
    opacity 0
  .code-item
    text-align center
    color #444
    font-size 28px
    background #FFFFFF
    border 1px solid #D8D8D8
    border-radius 6px
    width 36.72px
    height 40px
  .code-item-active
    border 1px solid #000
.joinButton
  display flex
  justify-content center
  align-items center
  margin-top 15px
.join_schedule
  box-shadow 4px 4px 30px rgba(0, 0, 0, 0.1)
  background #fff
  border-radius 6px
  padding-bottom 10px
  color #000
  .item
    border 0
    .detail
      p
        font-size 16px
        overflow auto
        height auto
        display block
      .date
        font-size 16px
        line-height 22px
        color #50D0E5
        display flex
        align-items center
        margin-top 10px
        img
          margin-right 5px
    .banner
      img
        width 169px
        margin-right 10px
    .address
      right 210px
  .desc
    display flex
    padding 0 16px
    justify-content space-between
    div
      display flex
      justify-content center
      align-items center
      img
        margin-right 5px
    .userList
      font-family 'Silkscreen'
      font-size 12px
    .user
      color #50D0E5
      font-size 14px
  .desc2
    font-size 12px
    font-family 'Noto Sans'
    color #000
    text-align left
    padding 16px
.ama
  margin 15px 16px
  .title
    min-width 80px
    font-size 14px
    margin-top 12px
    font-family 'Noto Sans'
    text-align left
  .participant
    width 100%
    img
      width 38px
      height 38px
    div
      margin 0 10px
      width 20%
      display flex
      justify-content center
      align-items center
      flex-wrap wrap
    p
      font-weight 400
      font-size 12px
      width 100%
      text-align center
      padding 5px 0
      font-family 'Silkscreen'
.flex_align
  display flex
  align-items center
.flex_start
  display flex
  align-items self-start
.flex_start_between
  display flex
  align-items self-start
  justify-content space-between
.flex_center
  display flex
  align-items center
  justify-content center
.flex_between
  display flex
  align-items center
  justify-content space-between
.font_m
  font-family 'Noto Sans'
</style>
