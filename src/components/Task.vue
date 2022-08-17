<template>
  <div class="main" @click="closeTask">
    <div class="task" @click="cancelBubble($event)">
      <div class="bgtop">
        <img src="../assets/taskleft.png" />
        <div class="close" @click="closeTask">X</div>
      </div>
      <div class="tasks">
        <div class="title"><p>TASK</p></div>
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
              <p class="name">COMMUNICATE</p>
              <!-- <div><div class="progress" style="width: 60%"></div></div> -->
              <p>Bonus points +1</p>
            </div>
            <img class="tasksplit" src="../assets/tasksplit.png" />
            <div
              :class="{
                button: true,
                incompleted: scoreinfo.video != 1,
                completed: scoreinfo.video === 1,
              }"
            >
              {{ scoreinfo.video != 1 ? "INCOMPLETE" : "COMPLETED" }}
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
              <div>
                <img src="../assets/task/6-weeklyscreentime15h@2x.png" />
              </div>
            </div>
            <div class="info">
              <p class="name">WEEKLY SCREEN TIME 15H</p>
              <!-- <div><div class="progress"></div></div> -->
              <p>Bonus points +30</p>
            </div>
            <img class="tasksplit" src="../assets/tasksplit.png" />
            <div
              :class="{
                button: true,
                incompleted: weekonline.hours15 != 1,
                completed: weekonline.hours15 === 1,
              }"
            >
              {{ weekonline.hours15 != 1 ? "INCOMPLETE" : "COMPLETED" }}
            </div>
          </div>
          <div class="item">
            <div class="icon">
              <div>
                <img src="../assets/task/7-weeklyscreentime30h@2x.png" />
              </div>
            </div>
            <div class="info">
              <p class="name">WEEKLY SCREEN TIME 30H</p>
              <!-- <div><div class="progress"></div></div> -->
              <p>Bonus points +80</p>
            </div>
            <img class="tasksplit" src="../assets/tasksplit.png" />
            <div
              :class="{
                button: true,
                incompleted: weekonline.hours30 != 1,
                completed: weekonline.hours30 === 1,
              }"
            >
              {{ weekonline.hours30 != 1 ? "INCOMPLETE" : "COMPLETED" }}
            </div>
          </div>
          <div class="item">
            <div class="icon">
              <div><img src="../assets/task/8-attendama@2x.png" /></div>
              1
            </div>
            <div class="info">
              <p class="name">ATTEND AMA</p>
              <!-- <div><div class="progress"></div></div> -->
              <p>Bonus points +6</p>
            </div>
            <img class="tasksplit" src="../assets/tasksplit.png" />
            <div class="button completed">COMPLETED</div>
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
            <div class="button completed">COMPLETED</div>
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
            <div class="button completed">COMPLETED</div>
          </div>
          <div class="item">
            <div class="icon">
              <div><img src="../assets/task/11-inviteateam@2x.png" /></div>
            </div>
            <div class="info">
              <p class="name">INVITE A TEAM</p>
              <!-- <div><div class="progress"></div></div> -->
              <p>Bonus points +40</p>
            </div>
            <img class="tasksplit" src="../assets/tasksplit.png" />
            <div
              :class="{
                button: true,
                incompleted: scoreinfo.inviteteam != 1,
                completed: scoreinfo.inviteteam === 1,
              }"
            >
              {{ scoreinfo.inviteteam != 1 ? "INCOMPLETE" : "COMPLETED" }}
            </div>
          </div>
          <div class="item">
            <div class="icon">
              <div><img src="../assets/task/12-inviteacolleague@2x.png" /></div>
            </div>
            <div class="info">
              <p class="name">INVITE A COLLEAGUE</p>
              <!-- <div><div class="progress"></div></div> -->
              <p>Bonus points +5</p>
            </div>
            <img class="tasksplit" src="../assets/tasksplit.png" />
            <div
              :class="{
                button: true,
                incompleted: scoreinfo.invitemember != 1,
                completed: scoreinfo.invitemember === 1,
              }"
            >
              {{ scoreinfo.invitemember != 1 ? "INCOMPLETE" : "COMPLETED" }}
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
      weekonline: {},
    };
  },
  props: ["webRtc", "showTask"],
  computed: {},
  created() {
    window["scoreinfo"] = async (info) => {
      if (this.showTask) {
        console.log("scoreinfo", info);
        this.scoreinfo = info;
        this.online = JSON.parse(info.online);
        this.weekonline = JSON.parse(info.weekonline);
      }
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
  },
};
</script>
<style lang="stylus" scoped>
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
  width 640px
  height 557px
  background #090f0bb3
  border 2px solid rgba(90, 206, 106, 0.3)
  border-radius 6px
  padding 5px
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
      font-size 10px
      width 20px
      height 20px
      background #ffffff1a
      box-shadow 0px 0px 13px 0px rgb(0 0 0 / 50%)
      border-radius 11.67px
      cursor pointer
      margin-right 5px
      margin-top 5px
  .bgbottom
    text-align right
    img
      width 50px
      height 41px
  .tasks
    height 480px
    display flex
    justify-content center
    justify-content center
    flex-wrap wrap
    .title
      background url('../assets/taskbg.png')
      width 214px
      height 50px
      background-size 100% 100%
      display flex
      justify-content center
      align-items center
      color #000
      font-size 18px
      margin-bottom 30px
      p
        padding-top 10px
    .list
      height 375px
      overflow-y auto
      width 480px
      display flex
      justify-content center
      /* align-items: center; */
      flex-wrap wrap
    .item
      width 460px
      height 80px
      background #193929
      border 1px solid rgba(92, 234, 142, 0.3)
      margin-bottom 12px
      display flex
      align-items center
      padding 0 25px
    .icon
      width 60px
      height 60px
      background-image linear-gradient(#06f839, #10f0ff, #8c73ff)
      border-radius 50px
      display flex
      justify-content center
      align-items center
      div
        width 58px
        height 58px
        background #56AB7B
        border-radius 50px
        display flex
        justify-content center
        align-items center
        img
          width 70%
    .info
      margin-left 10px
      text-align left
      width 180px
      div
        width 180px
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
        color #60FF98
      .name
        color #fff
        font-size 14px
    .tasksplit
      width 1px
      height 54px
      margin-left 60px
    .button
      width 88px
      height 44px
      border-radius 22px
      display flex
      justify-content center
      align-items center
      margin-left 23px
      font-size 12px
      cursor pointer
      &.completed
        background #60FF98
      &.incompleted
        background #ffffff4f
        color #fff
</style>
