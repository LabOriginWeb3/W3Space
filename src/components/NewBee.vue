<template>
  <div v-show="showHelp" class="main">
    <div id="helpBoard">
      <img class="girl" src="../assets/help/girl.png" alt="">
      <div class="content">
        <img class="bg" src="../assets/help/background.png" alt="">
        <div class="desc">
          <div class="list0" v-if="helpStep == 0 && !helpStatus.move">
            Hi, this is Yvette! Welcome to W3.work. Let’s have a quick guide on how to Work & Connect & Collab in W3.
          </div>
          <div class="list1" v-if="helpStep == 1">
            First, use
            <div class="wasd">
              <div></div>
              <img v-show="keys.indexOf(87) == -1" src="../assets/help/WD.png" />
              <img v-show="keys.indexOf(87) !== -1" src="../assets/help/W.png" />
              <div></div>
              <img v-show="keys.indexOf(65) == -1" src="../assets/help/AD.png" />
              <img v-show="keys.indexOf(65) !== -1" src="../assets/help/A.png" />
              <img v-show="keys.indexOf(83) == -1" src="../assets/help/SD.png" />
              <img v-show="keys.indexOf(83) !== -1" src="../assets/help/S.png" />
              <img v-show="keys.indexOf(68) == -1" src="../assets/help/DD.png" />
              <img v-show="keys.indexOf(68) !== -1" src="../assets/help/D.png" />
            </div>
              Or
            <div class="wasd">
              <div></div>
              <img v-show="keys.indexOf(38) == -1" src="../assets/help/up_d.png" />
              <img v-show="keys.indexOf(38) !== -1" src="../assets/help/up.png" />

              <div></div>
              <img v-show="keys.indexOf(37) == -1" src="../assets/help/left_d.png" />
              <img v-show="keys.indexOf(37) !== -1" src="../assets/help/left.png" />
              <img v-show="keys.indexOf(40) == -1" src="../assets/help/down_d.png" />
              <img v-show="keys.indexOf(40) !== -1" src="../assets/help/down.png" />
              <img v-show="keys.indexOf(39) == -1" src="../assets/help/right_d.png" />
              <img v-show="keys.indexOf(39) !== -1" src="../assets/help/right.png" />
            </div>
              to move around.
          </div>
          <div v-if="helpStep == 2 || helpStep == 3" class="list2">
            You can press
            <img v-show="helpStep == 2" src="../assets/help/shift.png" />
            <img v-show="helpStep == 3" src="../assets/help/shift2.png" />
              to move A LOOOOOT faster!
          </div>
          <div v-if="helpStep == 1001 || helpStep == 1002">
            Follow the ENTRANCE sign to enter a building.
          </div>
          <div v-if="helpStep == 2001">
            Feel free to move around. A small tip: you can click the minimap to teleport - the fastest way to move in W3.work.
          </div>
          <div v-if="helpStep == 2002">
            Interact with the Video Game Machine to experience a variety of fun games.
          </div>
          <div v-if="helpStep == 2003">
            Click on the mini map in the upper right corner and fly to the desired destination. Try it out~
          </div>
          <div v-if="helpStep == 2004">
            When entering the meeting room, your mic will be automatically enabled and everyone can hear your voice.
          </div>
          <div v-if="helpStep == 2005">
            Click on the Whiteboard and start collaborating. Try it out~
          </div>
          <div v-if="helpStep == 2006">
            Click on the Whitebo
          </div>
          <div v-if="helpStep == 3001 || helpStep == 3002">
            Congrats! You’ve joined an AMA! Please take a seat.
          </div>
          <div v-if="helpStep == 3003 || helpStep == 3004">
            You will be automatically muted during the AMA unless the hosts invite you to the stage.
          </div>
          <div v-if="helpStep == 4001">
            First look down the screen, The “Broadcast Mode” is suitable for while the speaker is speaking; the audience cannot communicate with each other but can ask questions.
          </div>
          <div v-if="helpStep == 4002">
            you can always change the AMA Mode by simply clicking the “switchover” mark at any time, even during the AMA.give it a try!
          </div>
          <div v-if="helpStep == 4003">
            You can activate the “Discussion Mode” during the intermission of an AMA, the audience can communicate with each other freely.
          </div>
          <div v-if="helpStep == 4004">
            As a sponsor, you’ll be able to set Logo&banner in the scene, come & give it a try!
          </div>
          <div v-if="helpStep == 4005" style="display:block;text-align:left">
            <p>Yes! Just like that!</p>
            <p>In case the pictures are in the wrong shape, my recommended size is </p>
            <p>-Logo(10x10)</p>
            <p>-Banner(200x800)</p>
          </div>
          <div v-if="helpStep == 4006">
            Wallpaper can also be added, isn’t that cool! give it a try!
          </div>
          <div v-if="helpStep == 4007 || helpStep == 4008">
            It looks like you’ve done well.Enjoy your AMA, and I’ll see you around.
          </div>
        </div>
        <img v-show="showNextBtn" ref="right" src="../assets/companyInfo/announcement_right.png" @click="nextStep" class="next">
      </div>
    </div>
    <canvas id="myCanvas" class="canvas" v-show="showCanvas"></canvas>
    <div id="clickArea" v-show="showCanvas" @click="nextGuide"></div>
  </div>
</template>
<script>
export default {
  name: "newBee",
  data() {
    return {
      showHelp: false,
      keys: [],
      showNextBtn: true,
      showCanvas: true
    };
  },
  props: ['helpPos', 'sponsor','webRtc','ifLodingComplete'],
  computed: {
    helpStep() {
      return this.$store.state.helpStatus.helpStep
    },
    helpStatus() {
      return this.$store.state.helpStatus
    }
  },
  created() {
    
  },
  watch: {
    helpPos() {
      console.log(this.helpPos)
      if(!this.ifLodingComplete) return
      if(this.helpPos.mapid==102 &&this.helpPos.y >= 33 && this.helpPos.y <= 39 && this.helpPos.x >= 76 && this.helpPos.x <= 84 && !this.helpStatus.enterOffice && this.helpStatus.move) {// show enter guide
        this.$store.commit("setHelpStep", 1001);
        this.showNextBtn = true
        this.showHelp = true
      }
      if(this.helpPos.mapid==101 && !this.helpStatus.officeGuide && this.helpStatus.move && this.helpStep <= 2001) {
        this.$store.commit("setHelpStep", 2001);
        this.$store.commit("setHelpDone", 'enterOffice');
        this.showNextBtn = true
        this.showHelp = true
      }
      if(!this.helpStatus.ama1 && this.helpStatus.move && this.sponsor == 0 && this.helpPos.mapid== 202 && this.helpStep < 3001) { //start ama guide
      this.$store.commit("setHelpStep", 3001)
            this.showNextBtn = true
            this.showHelp = true
    }
      if(this.helpPos.mapid==202 &&this.helpPos.x <= 74 && !this.helpStatus.ama2 && this.helpStatus.move && this.sponsor == 0) {// show enter guide
        this.$store.commit("setHelpStep", 3003);
        this.showNextBtn = true
        this.showHelp = true
      }
      if(!this.helpStatus.ama && this.helpStatus.move && this.helpPos.mapid== 202 && this.sponsor == 1 && this.helpStep < 4002) { //start ama guide
      this.$store.commit("setHelpStep", 4001)
      this.showNextBtn = true
      this.showHelp = true
      this.showCanvas = true
      this.setFocusByClass('amamode')
      let b = document.getElementById('helpBoard')
      b.style.bottom = '100px'
    }
    },
    ifLodingComplete() {
      if(this.ifLodingComplete) {
        if(!this.helpStatus.move) {//start move guide
              this.$store.commit("setHelpStep", 0)
                    this.showNextBtn = true
                    this.showHelp = true
            } 
      }
    }
  },
  methods: {
    setFocusByClass(e) {
      let a = document.getElementsByClassName(e)
      let rect = a[0].getBoundingClientRect()
      this.setFocus(rect.left, rect.top, rect.width , rect.height)
    },
    setFocusById(e) {
      let a = document.getElementById(e)
      let rect = a.getBoundingClientRect()
      this.setFocus(rect.left, rect.top, rect.width , rect.height)
    },
    setFocus(x,y,w,h) {
      let height = window.screen.height
      let width = window.screen.width
      let c = document.getElementById("myCanvas")

      let ctx=c.getContext("2d");
      ctx.clearRect(0,0,width, height)
      ctx.fillStyle='rgba(0,0,0,0.7)'
      ctx.fillRect(0,0,x,height)
      ctx.fillRect(x,0,width - x,y)
      ctx.fillRect(x,y + h,width - x,height - y - h)
      ctx.fillRect(x + w,y,width - x - w,h)
      let area = document.getElementById("clickArea")
      area.style.width = w + 'px'
      area.style.height = h + 'px'
      area.style.left = x + 'px'
      area.style.top = y + 'px'

    },
    nextGuide() {
      if(this.helpStep == 4001) {
        return
      }
      if(this.helpStep == 2003) {
        this.webRtc.sendToGdevelop("hopTo", {
          x: 225,
          y: 114
        });
        setTimeout(()=> {
        this.nextStep()
        }, 3000)
      }
      if(this.helpStep == 2005) {
        this.$emit('openBoard')
        this.showNextBtn = true
        this.showCanvas = false
        this.nextStep()
      }
      if(this.helpStep == 4002) {
        this.$emit('setAMAMode')
        this.showCanvas = false
        this.showNextBtn = true
        this.$store.commit("setHelpStep", this.helpStep + 1);
      }
      if(this.helpStep == 4004) {
        this.$emit('showPmSetting')
        this.showCanvas = false
        this.showNextBtn = true
        this.$store.commit("setHelpStep", this.helpStep + 1);

      }
      if(this.helpStep == 4006) {
        this.$emit('showUploadPosters')
        this.showCanvas = false
        this.showNextBtn = true
        this.$store.commit("setHelpStep", this.helpStep + 1);

      }
    },
    nextStep() {
      this.$refs.right.style.content = 'url(' + require("../assets/companyInfo/announcement_right2.png") + ')'
      this.$store.commit("setHelpStep", this.helpStep + 1);
      if(this.helpStep == 1) this.showNextBtn = false
      setTimeout(()=> {
        this.$refs.right.style.content = 'url(' + require("../assets/companyInfo/announcement_right.png") + ')'
      }, 300)
      console.log('helpStep', this.helpStep)

      if(this.helpStep == 1002 && this.helpPos.mapid==102) {//enter guide is done
        this.$store.commit("setHelpDone", 'enterOffice');
        this.delayClose()
      }
      if(this.helpStep == 2002 && this.helpPos.mapid==101) {//guide game
        // this.$store.commit("setHelpDone", 'officeGuide');
        this.webRtc.sendToGdevelop("hopTo", {
          x: 170,
          y: 215,
        });
        setTimeout(()=> {
          this.showHelp = true
          this.showCanvas = true
          let width = document.getElementById("games").offsetWidth
          this.setFocus(width/2 +100, 360, 300,150)
        }, 3000)
      }
      if(this.helpStep == 2003 && this.helpPos.mapid==101) {//guide game
        this.showNextBtn = false
        this.showHelp = true
        this.showCanvas = true
        this.setFocusByClass('miniMap')
      }
      if(this.helpStep == 2004 && this.helpPos.mapid==101) {//guide meetroom
        this.showCanvas = false
        this.showNextBtn = true
      }
      if(this.helpStep == 2005 && this.helpPos.mapid==101) {//guide game
        this.showCanvas = true
        this.showNextBtn = true
        let width = document.getElementById("games").offsetWidth
        this.setFocus(width -270, 210, 138,80)
      }
      if(this.helpStep == 2007 && this.helpPos.mapid==101) {//guide game
        this.$store.commit("setHelpDone", 'officeGuide');
        this.delayClose()
      }
      if(this.helpStep == 3002 && this.helpPos.mapid==202) {//hide ama enter guide
      this.$store.commit("setHelpDone", 'ama1');
        this.delayClose()
      }
      if(this.helpStep == 3004 && this.helpPos.mapid==202) {//office guide is done
        this.$store.commit("setHelpDone", 'ama2');
        this.delayClose()
      }
      if((this.helpStep == 4002) && this.helpPos.mapid==202) {//now user need click switchover button
        this.showNextBtn = false
        this.showHelp = true
        this.showCanvas = true
        this.setFocusById('switchover')
      }
      if((this.helpStep == 4004) && this.helpPos.mapid==202) {//hide ama enter guide
        this.showNextBtn = false
        this.showHelp = true
        this.showCanvas = true
        this.setFocusByClass('pmManager')
      }
      if((this.helpStep == 4006) && this.helpPos.mapid==202) {//hide management board and guide wallpaper area
        this.$emit('hidePmSetting')
        this.webRtc.sendToGdevelop("hopTo", {
          x: 92,
          y: 31,
        });
        setTimeout(()=> {
          this.showNextBtn = false
          this.showHelp = true
          this.showCanvas = true
          let width = document.getElementById("games").offsetWidth
          this.setFocus(width/2 - 80, 180, 150,150)
        }, 3000)
      }
      if(this.helpStep == 4008 && this.helpPos.mapid==202) {//office guide is done
        this.$store.commit("setHelpDone", 'ama');
        this.delayClose()
      }
    },
    delayClose() {
      setTimeout(()=> {
          this.showHelp = false
          this.$store.commit("setHelpStep", 0)
        }, 1500)
    }
  },
  mounted() {
    let arr = [83,87,65,68,37,38,39,40]
    window['onKeyDown'] = (e) => {
      if(arr.indexOf(e) != -1 && this.keys.indexOf(e) == -1 && this.helpStep == 1) {//WSAD guide
        this.keys.push(e)
        arr.splice(arr.indexOf(e), 1)
        if(arr.length == 0) this.$store.commit("setHelpStep", 2);//show shift guild
      }
      if(e == 16 && this.helpStep == 2) {//move guide is done
        this.$store.commit("setHelpStep", 3);
        this.$store.commit("setHelpDone", 'move');
      }
      if(this.helpStep == 2002 || this.helpStep == 2004) {
        this.nextStep()
      }
      if(this.helpStep == 2005) {
        this.$emit('openBoard')
        this.showNextBtn = true
        this.showCanvas = false
        this.nextStep()
      }
    };

    let height = window.screen.height
      let width = window.screen.width
      let c = document.getElementById("myCanvas")
      c.width = width
      c.height = height

  }
};
</script>
<style lang="stylus" scoped>
@font-face {
  font-family: "ZFULL";
  src: url("../assets/font/dogica.ttf");
}
.canvas
  position absolute
  z-index -3
  left 0
  top 0
#clickArea
  position absolute
  z-index 9
  cursor pointer
.main
  width 100vw
  height 100vh
  background transparent
  position absolute
  z-index 99999
  display flex
  justify-content center
  align-items center
  bottom 0
  font-family 'ZFULL'
  #helpBoard
    position: absolute
    bottom 0
    display flex
    align-items: flex-end
    .girl
      width: 300px
      height 295px
    .content
      position relative
      padding-top 100px
      .bg
        width 900px
      .desc
        position absolute
        bottom 30px
        height 130px
        left 30px
        right 75px
        div
          height 100%
          display flex
          align-items: center
          justify-content: center
        .list1
          .wasd
            display grid
            grid-template-columns: 60px 60px 60px;
            grid-template-rows: 60px 60px
            align-items: center
            justify-items: center
            img
              width 50px
        .list2
          img
            width 100px
            margin 0 10px
      .next
        position absolute
        bottom 40px
        right 75px
        cursor pointer
        transition all .3s linear

</style>
