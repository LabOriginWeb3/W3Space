<template>
  <div v-show="showHelp" class="main">
    <div id="helpBoard">
      <img class="girl" src="../assets/help/girl.png" alt="">
      <div class="content">
        <img class="bg" src="../assets/help/background.png" alt="">
        <div class="desc">
          <div class="list0" v-if="helpStep == 0 && !helpStatus.move">
            Hi, this is Yvette! Welcome to W3.work. Let’s have a quick guide on how to Work & Connect & Collab in Web3.
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
            Welcome to the W3.work Showroom. Here you can work on your projects as a team, connect and collab with Web3 professionals! Allow me to give you a room tour!
          </div>
          <div v-if="helpStep == 2002">
            Interact with the Video Game Machine to experience a variety of fun games.
          </div>
          <div v-if="helpStep == 2003">
            Click on the mini map in the upper right corner and fly to the desired destination. Try it out~
          </div>
          <div v-if="helpStep == 2004">
            Enter the meeting room now to hold meetings and share ideas with your colleagues.
          </div>
          <div v-if="helpStep == 2005">
            Click to enable/disable ScreenShare/Audio/Video
          </div>
          <div v-if="helpStep == 2006">
            A/V will be automatically connected when stepping in others spot or in some certain area.
          </div>
          <div v-if="helpStep == 2007">
            To take a break, simply exit the meeting space and go wherever you like, just like in real life!
          </div>
          <div v-if="helpStep == 2008">
            Click on the Whiteboard and start collaborating. Try it out~
          </div>
          <div v-if="helpStep == 2009 || helpStep == 2010">
            Now that you understand how W3.work works in general, invite your colleagues to share the excitement!
          </div>
          <div v-if="helpStep == 3001">
            Congrats! You’ve joined an AMA! Please take a seat.
          </div>
          <div v-if="helpStep == 3002 || helpStep == 3003" style="text-align:left">
            Broadcast Mode: Pay attention to the speakers and make a request if you want to ask any regarding questions.<br>
            Discussion Mode: Talk to thy neighbors and connect!
          </div>
          <div v-if="helpStep == 3004 || helpStep == 3005">
            You will be automatically muted during the AMA unless the hosts invite you to the stage.
          </div>
          <div v-if="helpStep == 4001">
            First look down the screen, The “Broadcast Mode” is suitable for while the speaker is speaking; the audience cannot communicate with each other but can request to ask questions.
          </div>
          <div v-if="helpStep == 4002">
            You can always change the AMA Mode by simply clicking the “switchover” mark at any time, even during the AMA. Give it a try!
          </div>
          <div v-if="helpStep == 4003">
            You can activate the “Discussion Mode” during the intermission of an AMA, the audience can communicate with each other freely.
          </div>
          <div v-if="helpStep == 4004">
            As a sponsor, you’ll be able to set Logo&banner in the scene by clicking the button on the lower left corner, come & give it a try!
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
          <div v-if="helpStep == 5001">
            Click here to open the chat interface. Text on public and private channels, you can also check your friends nearby, but don’t be antisocial.
          </div>
          <div v-if="helpStep == 5002">
            Click here to see contacts organized by Team, Everyone, Nearby, Follow, and so on.
          </div>
          <div v-if="helpStep == 5004">
            Click here to see a list of Teams that you have joined.
          </div>
          <div v-if="helpStep == 5003">
            Check your credits and the credit-earning rules here.
          </div>
          <div v-if="helpStep == 5005 || helpStep == 5006">
            Click here to review the guidance.
          </div>
          <div v-if="helpStep == 6001 || helpStep == 6002">
            You may copy and send an invite link to a friend by clicking here to enter the invitation panel.
          </div>
        </div>
        <img v-show="showNextBtn" ref="right" src="../assets/companyInfo/announcement_right.png" @click="nextStep" class="next">
        <img src="../assets/help/skip.png" alt="" class="skip" @click="skip">
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
      this.checkHelp()
    }
  },
  methods: {
    skip() {
      this.showHelp = false
      this.showCanvas = false
      this.$store.commit("setHelpDone", 'enterOffice');
      this.$store.commit("setHelpDone", 'officeGuide');
      this.$store.commit("setHelpDone", 'ama1');
      this.$store.commit("setHelpDone", 'ama2');
      this.$store.commit("setHelpDone", 'ama');
      this.$store.commit("setHelpDone", 'social');
      this.$store.commit("setHelpDone", 'move');
      this.$store.commit("setHelpDone", 'invite');
      this.$store.commit("setHelpStep", 0);
    },
    clearHelp() {
      this.$store.commit("clearHelp");
      this.checkHelp()
    },
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
    checkHelp() {
      // console.log('checkHelp', this.helpPos)
      if(!this.ifLodingComplete) return
      if(this.helpPos.mapid == 102 && this.helpPos.y >= 29 && this.helpPos.y <= 38 && this.helpPos.x >= 57 && this.helpPos.x <= 68) {
        this.$emit('showYve')
        this.$store.commit("setHelpStep", 101)
      } else if(this.helpStep == 101) {
        this.$emit('hideYve')
        this.$store.commit("setHelpStep", 0)
      }
      if(!this.helpStatus.move && localStorage.getItem("role") && this.helpStep < 1) {//start move guide
              this.$store.commit("setHelpStep", 0)
                    this.showNextBtn = true
                    this.showHelp = true
            } 
      if(!this.helpStatus.enterOffice && this.helpStatus.move && this.helpPos.mapid==102 &&this.helpPos.y >= 33 && this.helpPos.y <= 39 && this.helpPos.x >= 76 && this.helpPos.x <= 84) {// show enter guide
        this.$store.commit("setHelpStep", 1001);
        this.showNextBtn = true
        this.showHelp = true
        this.showCanvas = false
      }
      if(this.helpStatus.move && !this.helpStatus.social && (this.helpPos.mapid==102  || this.helpPos.mapid == 202 && this.helpStatus.ama1)) {// show social guide
        this.$store.commit("setHelpStep", 5001);
        this.showNextBtn = true
        this.showHelp = true
        this.showCanvas = true
        this.setFocusById('message')
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
            let b = document.getElementById('helpBoard')
        b.style.bottom = '100px'
    }
      if(this.helpPos.mapid==202 &&this.helpPos.x <= 74 &&this.helpPos.x > 0  && !this.helpStatus.ama2 && this.helpStatus.move && this.sponsor == 0) {// show enter guide
        this.$store.commit("setHelpStep", 3004);
        this.showNextBtn = true
        this.showCanvas = false
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
      if(!this.helpStatus.invite && this.helpStatus.move && this.helpPos.mapid== 201) { //start ama guide
        this.$store.commit("setHelpStep", 6001)
        this.showNextBtn = false
        this.showHelp = true
        this.setFocusById("inviteIcon")
      }
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
        this.showNextBtn = true
        this.showCanvas = false
        this.nextStep()
      }
      if(this.helpStep == 2008) {
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
      if(this.helpStep == 6001) {
        this.$emit('getInvite')
        this.showCanvas = false
        this.showNextBtn = false
        this.showHelp = false
        this.$store.commit("setHelpDone", 'invite');
      }
    },
    nextStep() {
      this.$refs.right.style.content = 'url(' + require("../assets/companyInfo/announcement_right2.png") + ')'
      this.$store.commit("setHelpStep", this.helpStep + 1);
      if(this.helpStep == 1) this.showNextBtn = false
      setTimeout(()=> {
        this.$refs.right.style.content = 'url(' + require("../assets/companyInfo/announcement_right.png") + ')'
      }, 300)
      // console.log('helpStep', this.helpStep)

      if(this.helpStep == 1002 && this.helpPos.mapid==102) {//enter guide is done
        this.$store.commit("setHelpDone", 'enterOffice');
        this.delayClose()
      }
      if(this.helpStep == 2002 && this.helpPos.mapid==101) {//guide game
        this.showNextBtn = false
        this.webRtc.sendToGdevelop("hopTo", {
          x: 170,
          y: 215,
        });
        setTimeout(()=> {
          this.showHelp = true
          this.showCanvas = true
          this.showNextBtn = true
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
        this.setFocusByClass('localArea')
      }
      if(this.helpStep == 2008 && this.helpPos.mapid==101) {//guide game
        this.showCanvas = true
        this.showNextBtn = false
        let width = document.getElementById("games").offsetWidth
        this.setFocus(width - 290, 190, 200,110)
      }
      if(this.helpStep == 2010 && this.helpPos.mapid==101) {//guide game
        this.$store.commit("setHelpDone", 'officeGuide');
        this.delayClose()
      }
      if(this.helpStep == 3002 && this.helpPos.mapid==202) {//hide ama enter guide
        this.showNextBtn = true
        this.showHelp = true
        this.showCanvas = true
        this.setFocusByClass('amamode')
        
      }
      if(this.helpStep == 3003 && this.helpPos.mapid==202) {//hide ama enter guide
        this.$store.commit("setHelpDone", 'ama1');
        this.showCanvas = false
        this.delayClose()
      }
      if(this.helpStep == 3005 && this.helpPos.mapid==202) {//office guide is done
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
      if(this.helpStep == 5002) {
        this.showNextBtn = true
        this.showHelp = true
        this.showCanvas = true
        this.setFocusById('friends')
      }
      if(this.helpStep == 5003) {
        this.showNextBtn = true
        this.showHelp = true
        this.showCanvas = true
        this.setFocusById('task')
      }
      if(this.helpStep == 5004) {
        this.showNextBtn = true
        this.showHelp = true
        this.showCanvas = true
        this.setFocusById('offices')
      }
      
      if(this.helpStep == 5005) {
        this.showNextBtn = true
        this.showHelp = true
        this.showCanvas = true
        this.setFocusById('helpBtn')

      }
      if(this.helpStep == 5006) {
        this.$store.commit("setHelpDone", 'social');
        this.delayClose()
      }
    },
    delayClose() {
      setTimeout(()=> {
          this.showHelp = false
          this.$store.commit("setHelpStep", 0)
        }, 1000)
    }
  },
  mounted() {
    let arr = [83,87,65,68,37,38,39,40]
    window['onKeyDown'] = (e) => {
      // console.log(e)
      if(e == 77) {
        this.$emit('triggleAudio')
      }
      if(arr.indexOf(e) != -1 && this.keys.indexOf(e) == -1 && this.helpStep == 1) {//WSAD guide
        this.keys.push(e)
        arr.splice(arr.indexOf(e), 1)
        if(arr.length == 0) this.$store.commit("setHelpStep", 2);//show shift guild
      }
      if(e == 16 && this.helpStep == 2) {//move guide is done
        this.$store.commit("setHelpStep", 3);
        this.$store.commit("setHelpDone", 'move');
        this.delayClose()
      }
      if(this.helpStep == 2002 || this.helpStep == 2004) {
        this.nextStep()
        return
      }
      if(this.helpStep >= 2005 && this.helpStep <= 2007) {
        this.nextStep()
        return
      }
      if(this.helpStep == 2008) {
        this.$emit('openBoard')
        this.showNextBtn = true
        this.showCanvas = false
        this.showHelp = true
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
      .skip
        position absolute
        bottom 165px
        right 75px
        width 60px
        cursor pointer
        transition all .3s linear

</style>
