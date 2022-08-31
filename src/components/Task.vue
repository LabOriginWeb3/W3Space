<template>
  <div class="main" @click="closeTask">
    <div class="task" @click="cancelBubble($event)">
      <div class="bgtop">
        <img src="../assets/taskleft.png" />
        <div class="close" @click="closeTask">X</div>
      </div>
      <div class="tasks">
        <div class="title"><p>TASKS</p></div>
        <div class="total">
          <img src="../assets/task/Coin.png" />x
          {{ total === 0 ? taskTotal : total }}
        </div>
        <div class="list">
          <div class="item">
            <div class="icon">
              <div><img src="../assets/task/1-checkin@2x.png" /></div>
            </div>
            <div class="info">
              <p class="name">CHECK IN</p>
              <!-- <div><div class="progress" style="width: 30%"></div></div> -->
              <p>Bonus points +1</p>
            </div>
            <img class="tasksplit" src="../assets/tasksplit.png" />
            <div
              :class="{
                button: true,
                incompleted: scoreinfo.sign != 1,
                completed: scoreinfo.sign === 1,
              }"
            >
              {{ scoreinfo.sign != 1 ? "INCOMPLETE" : "COMPLETED" }}
            </div>
          </div>
          <div class="item">
            <div class="icon">
              <div><img src="../assets/task/2-communicate@2x.png" /></div>
            </div>
            <div class="info">
              <p class="name">
                COMMUNICATE
                <span>({{ getNum(scoreinfo.video) }}/10)</span>
              </p>
              <!-- <div><div class="progress" style="width: 60%"></div></div> -->
              <p>Bonus points +1</p>
            </div>
            <img class="tasksplit" src="../assets/tasksplit.png" />
            <div
              :class="{
                button: true,
                incompleted: scoreinfo.video === '',
                completed: scoreinfo.video !== '',
              }"
            >
              {{ scoreinfo.video !== "" ? "COMPLETED" : "INCOMPLETE" }}
            </div>
          </div>
          <div class="item">
            <div class="icon">
              <div><img src="../assets/task/3-screentime3h@2x.png" /></div>
            </div>
            <div class="info">
              <p class="name">SCREEN TIME 3H</p>
              <!-- <div><div class="progress"></div></div> -->
              <p>Bonus points +2</p>
            </div>
            <img class="tasksplit" src="../assets/tasksplit.png" />
            <div
              :class="{
                button: true,
                incompleted: online.hours3 != 1,
                completed: online.hours3 === 1,
              }"
            >
              {{ online.hours3 != 1 ? "INCOMPLETE" : "COMPLETED" }}
            </div>
          </div>
          <div class="item">
            <div class="icon">
              <div><img src="../assets/task/4-screentime6h@2x.png" /></div>
            </div>
            <div class="info">
              <p class="name">SCREEN TIME 6H</p>
              <!-- <div><div class="progress" style="width: 80%"></div></div> -->
              <p>Bonus points +6</p>
            </div>
            <img class="tasksplit" src="../assets/tasksplit.png" />
            <div
              :class="{
                button: true,
                incompleted: online.hours6 != 1,
                completed: online.hours6 === 1,
              }"
            >
              {{ online.hours6 != 1 ? "INCOMPLETE" : "COMPLETED" }}
            </div>
          </div>
          <div class="item">
            <div class="icon">
              <div><img src="../assets/task/5-collabtool@2x.png" /></div>
            </div>
            <div class="info">
              <p class="name">COLLAB TOOL</p>
              <!-- <div><div class="progress"></div></div> -->
              <p>Bonus points +1</p>
            </div>
            <img class="tasksplit" src="../assets/tasksplit.png" />
            <div
              :class="{
                button: true,
                incompleted: scoreinfo.blackboard != 1,
                completed: scoreinfo.blackboard === 1,
              }"
            >
              {{ scoreinfo.blackboard != 1 ? "INCOMPLETE" : "COMPLETED" }}
            </div>
          </div>

          <div class="item">
            <div class="icon">
              <div><img src="../assets/task/8-attendama@2x.png" /></div>
            </div>
            <div class="info">
              <p class="name">ATTEND AMA</p>
              <!-- <div><div class="progress"></div></div> -->
              <p>Bonus points +6</p>
            </div>
            <img class="tasksplit" src="../assets/tasksplit.png" />
            <div
              :class="{
                button: true,
                incompleted: scoreinfo.meetingenter === '',
                completed: scoreinfo.meetingenter !== '',
              }"
            >
              {{ scoreinfo.meetingenter === "" ? "INCOMPLETE" : "COMPLETED" }}
            </div>
          </div>
          <div class="item">
            <div class="icon">
              <div><img src="../assets/task/9-hostama@2x.png" /></div>
            </div>
            <div class="info">
              <p class="name">HOST AMA</p>
              <!-- <div><div class="progress"></div></div> -->
              <p>Bonus points +60</p>
            </div>
            <img class="tasksplit" src="../assets/tasksplit.png" />
            <div
              :class="{
                button: true,
                incompleted: scoreinfo.hostama === 0,
                completed: scoreinfo.hostama !== 0,
              }"
            >
              {{ scoreinfo.hostama !== 0 ? "COMPLETED" : "INCOMPLETE" }}
            </div>
          </div>
          <div class="item">
            <div class="icon">
              <div><img src="../assets/task/10-attendama4h@2x.png" /></div>
            </div>
            <div class="info">
              <p class="name">ATTEND AMA 4H</p>
              <!-- <div><div class="progress"></div></div> -->
              <p>Bonus points +35</p>
            </div>
            <img class="tasksplit" src="../assets/tasksplit.png" />
            <div
              :class="{
                button: true,
                incompleted: weekama.award != 1,
                completed: weekama.award === 1,
              }"
            >
              {{ weekama.award != 1 ? "INCOMPLETE" : "COMPLETED" }}
            </div>
          </div>
          <div class="item">
            <div class="icon">
              <div><img src="../assets/task/11-inviteateam@2x.png" /></div>
            </div>
            <div class="info">
              <p class="name">BUILD MY OFFICE</p>
              <!-- <div><div class="progress"></div></div> -->
              <p>Bonus points +40</p>
            </div>
            <img class="tasksplit" src="../assets/tasksplit.png" />
            <div
              :class="{
                button: true,
                incompleted: scoreinfo.createoffice != 1,
                completed: scoreinfo.createoffice === 1,
              }"
            >
              {{ scoreinfo.createoffice != 1 ? "INCOMPLETE" : "COMPLETED" }}
            </div>
          </div>
          <div class="item">
            <div class="icon">
              <div><img src="../assets/task/12-inviteacolleague@2x.png" /></div>
            </div>
            <div class="info">
              <p class="name">
                INVITE A COLLEAGUE
                <span>({{ getNum(scoreinfo.invitemember) }}/10)</span>
              </p>
              <!-- <div><div class="progress"></div></div> -->
              <p>Bonus points +5</p>
            </div>
            <img class="tasksplit" src="../assets/tasksplit.png" />
            <div
              :class="{
                button: true,
                incompleted: scoreinfo.invitemember === '',
                completed: scoreinfo.invitemember !== '',
              }"
            >
              {{ scoreinfo.invitemember !== "" ? "COMPLETED" : "INCOMPLETE" }}
            </div>
          </div>
        </div>
      </div>
      <div class="bgbottom"><img src="../assets/taskright.png" /></div>
    </div>
  </div>
</template>
<script>
// import $ from "jquery";
export default {
  name: "Task",
  data() {
    return {
      scoreinfo: [],
      online: {},
      weekama: {},
      total: 0,
    };
  },
  props: ["webRtc", "showTask", "taskTotal"],
  computed: {},
  mounted() {},
  created() {
    window["scoreinfo"] = async (info) => {
      if (this.showTask) {
        // console.log("scoreinfo", info);
        this.scoreinfo = info;
        this.online = JSON.parse(info.online);
        this.weekama = JSON.parse(info.weekama);
      }
    };
    window["awardscore"] = async (info) => {
      // console.log("awardscore", info);
      this.total = info.totalscore;
    };
  },
  methods: {
    closeTask() {
      this.$emit("closeTask", false);
    },
    cancelBubble(event) {
      var e = window.event || event;
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
    },
    getNum(info) {
      if (info) {
        let comm = Array.from(info.split("-"));
        // console.log(comm);
        return comm.length >= 10 ? 10 : comm.length;
      }
      return 0;
    },
  },
};
</script>
<style lang="stylus" scoped>
::-webkit-scrollbar
  width 4px
  height 8px
::-webkit-scrollbar-track
  background #ffffff00
::-webkit-scrollbar-thumb
  background linear-gradient(
    132deg,
    #D9D9D9 0%,
    #D9D9D9 100%
  )
.main
  width 100vw
  height 100vh
  background rgba(20, 22, 39, 0.722)
  position absolute
  z-index 999
  display flex
  justify-content center
  align-items center
  top 0
.task
  width 600px
  height 557px
  background #090f0bb3
  border 2px solid rgba(90, 206, 106, 0.3)
  border-radius 6px
  padding 5px
  border-radius: 10px;
  border: 8px solid #383838;
  box-shadow: 8px 8px 3px -3px #000;
  background: #F3F3F3;
  .bgtop
    display flex
    justify-content space-between
    img
      width 42px
      height 35px
    .close
      display flex
      justify-content center
      align-items center
      color #fff
      width 20px
      height 20px
      cursor pointer
      margin-top: -6px;
      margin-right: -12px;
      background: #383838;
      border-radius: 0px 10px;
      height: 37px;
      width: 37px;
      font-size: 22px;
  .bgbottom
    text-align right
    img
      width 50px
      height 41px
  .tasks
    height 512px
    display flex
    justify-content center
    justify-content center
    flex-wrap wrap
    margin-top: -30px;
    .title
      width 214px
      height 50px
      background-size 100% 100%
      display flex
      justify-content center
      align-items center
      color #000
      font-size 18px
      margin-bottom 10px
      p
        padding-top: 10px;
        font-weight: 700;
        font-size: 25px;
        line-height: 34px;
    .total
      width 100%
      margin-bottom 10px
      display flex
      justify-content center
      align-items center
      color: #1DCE5C;
      img
        margin-right 5px
    .list
      height 400px
      overflow-y auto
      width 550px
      display flex
      justify-content center
      /* align-items: center; */
      flex-wrap wrap
    .item
      width: 460px;
      height: 80px;
      background: #193929;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      padding: 0 15px;
      background: #FFFFFF;
      border-radius: 10px;
    .icon
      width 60px
      height 60px
      // background-image linear-gradient(#06f839, #10f0ff, #8c73ff)
      border-radius 50px
      display flex
      justify-content center
      align-items center
      div
        width 58px
        height 58px
        background #70EF8D
        border-radius 50px
        display flex
        justify-content center
        align-items center
        img
          width 70%
    .info
      margin-left 10px
      text-align left
      width 250px
      div
        width 200px
        height 10px
        background #000000
        border 1px solid rgba(86, 171, 123, 1)
        border-radius 5px
        margin 5px 0
        display flex
        align-items center
        .progress
          height 10px
          background #60FF98
          border 1px solid rgba(86, 171, 123, 1)
          border-radius 5px
      p
        font-size 12px
        color: #0DAF46;
      .name
        font-weight: 700;
        font-size: 16px;
        line-height: 25px;
        color: #000000;
        span
          margin-left 5px
          color: #0daf46;
    .tasksplit
      width 1px
      height 54px
      margin-left 40px
    .button
      width: 120px;
      height 44px
      border-radius 22px
      display flex
      justify-content center
      align-items center
      margin-left 23px
      border-radius: 6px;
      font-size: 14px;
      color: #000;
      font-family: "Silkscreen";
      &.completed
        background #70EF8D
      &.incompleted
        background #D8D8D8
        color #fff
</style>
