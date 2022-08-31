<template>
  <div class="main">
    <div class="container">
    <div class="company">
      <div>
      <div class="social">
        <div class="title">SOCIAL</div>
        <div class="bg">
          <img class="head" :src="locationUrl + '/roomicon/icon/' + companyInfo.logo" alt="">
          <div class="name">{{companyInfo.name}}</div>
          <div class="desc">
            <p>{{companyInfo.desc}}</p>
          </div>
          <img class="twitter" :class="{'grey':socials[0] == 'undefined' || socials[0] == ''}" src="../assets/companyInfo/twitter.png" @click="toLink(0)">
          <img class="discord" :class="{'grey':socials[1] == 'undefined'|| socials[1] == ''}" src="../assets/companyInfo/discord.png" @click="toLink(1)">
          <img class="medium" :class="{'grey':socials[2] == 'undefined'|| socials[2] == ''}" src="../assets/companyInfo/medium.png" @click="toLink(2)">
          <!-- <img class="twitter telegram" src="../assets/companyInfo/telegram.png">
          <img class="discord" src="../assets/companyInfo/discord.png">
          <img class="medium" src="../assets/companyInfo/medium.png"> -->
        </div>
      </div>
      <div class="nft">
        <div class="title">NFT</div>
        <div class="content">
          <!-- <div class="imgs">
            <img src="https://img.seadn.io/files/f9a74ced84aa0892940e92001befec2d.png?fit=max&w=600" alt="">
          </div> -->
          <p class="null">Null</p>
        </div>
      </div>
      </div>
      <div></div>
      <div>
      <div class="news">
        <div class="title">NEWS</div>
        <div class="content">
          <img ref="left" class="left" src="../assets/companyInfo/announcement_left.png" @click="newsChange(-1)">
          <div class="desc">
            <div class="desc-content">
              <p ref="news" class="desc-p">{{news[showNewsId]}}</p>
            </div>
          </div>
          <img ref="right" class="right" src="../assets/companyInfo/announcement_right.png" @click="newsChange(1)">
        </div>
      </div>
      <div class="jobs">
        <div class="title">JOBS</div>
        <div class="content">
          <div v-for="(item,index) in jobs" :key="index" class="job">
            <p class="job-title">{{item.title.length > 20 ? item.title.slice(0,20) + '...':item.title}}</p>
            <img :src="item.logo" alt="">
            <p>{{item.name.length > 8 ? item.name.slice(0,8) + '...':item.name}}</p>
            <p>{{item.city_name}}</p>
            <p>{{item.upded}}</p>
          </div>
          <p v-show="!jobs" class="null">Null</p>
        </div>
      </div>
      </div>
      
    </div>

    </div>
    <img src="../assets/companyInfo/close.png" alt="" class="close" @click="$emit('closeCompany')">
    <div
      class="manager"
      v-show="companyInfo.setAble
      "
      @click="showSetting = true"
    >
      <img src="../assets/setting.svg" />
    </div>
    <div
      class="pmSetting officeBg"
      @click="showSetting = false"
      v-show="showSetting"
    >
      <div class="officeCon" @click="cancelBubble($event)">
        <div>
          <div class="pm">
            <p>company Name</p>
            <input class="roomName" v-model="name" placeholder="Office name" />
            <p>company profile</p>
            <input class="roomName" v-model="desc" placeholder="Office profile" />
            <p>Social Link</p>
            <input v-model="socials[0]" placeholder="twitter" />
            <input v-model="socials[1]" placeholder="discord" />
            <input v-model="socials[2]" placeholder="medium" />
            <!-- <input v-model="twitter" placeholder="twitter" />
            <input v-model="twitter" placeholder="twitter" />
            <input v-model="twitter" placeholder="twitter" /> -->
            <p>News</p>
            <input v-model="news[0]" placeholder="announcement 1" />
            <input v-model="news[1]" placeholder="announcement 2" />
            <input v-model="news[2]" placeholder="announcement 3" />
            <input v-model="news[3]" placeholder="announcement 4" />
            <input v-model="news[4]" placeholder="announcement 5" />
            <input v-model="news[5]" placeholder="announcement 6" />
            <div @click="save" style="margin-top:20px">Save</div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: "Task",
  data() {
    return {
      jobs: undefined,
      showNewsId: 0,
      showSetting: false,
      desc: '',
      socials: [],
      news: [],
      name: ''
    };
  },
  props: ['companyInfo','webRtc','locationUrl'],
  computed: {
    officeSpaceType() {
      return this.$store.state.officeSpaceType || 1;
    },
  },
  created() {
      this.desc = this.companyInfo.desc
      this.desc = this.companyInfo.desc
      this.socials = this.companyInfo.socailUrl.split('*')
      let news = this.companyInfo.announce.split('*')
      let arr1 = []
      for(let i = 0;i<this.socials.length;i++) {
        if(this.socials[i]== 'undefined') this.socials[i] = ''
      }
      for(let j = 0;j<news.length;j++) {
        if(news[j] !== 'undefined' && news[j] !== 'undefined') arr1.push(news[j])
      }
      this.news = arr1
      this.name = this.companyInfo.name
    axios.post('https://talent.w3.work/api/index/job', {company: this.name,
page: 1}).then(res=> {
  this.jobs = res.data.data.list
  console.log('job', this.jobs)
})

  },
  methods: {
    toLink(e) {
      if(this.socials[e] && this.socials[e]!='undefined') window.open(this.socials[e], '_blank')
    },
    closeTask() {
      this.$emit("closeTask", false);
    },
    newsChange(e) {
      if(e == -1 && this.showNewsId > 0) {
        this.$refs.news.style.opacity = "0"
        this.$refs.left.style.content = 'url(' + require("../assets/companyInfo/announcement_left2.png") + ')'
      }
      if(e == 1 && this.showNewsId < this.news.length - 1) {
        this.$refs.news.style.opacity = "0"
        this.$refs.right.style.content = 'url(' + require("../assets/companyInfo/announcement_right2.png") + ')'
      }
      setTimeout(()=> {
        if(e == -1 && this.showNewsId > 0) {
        this.showNewsId -=1
        this.$refs.left.style.content = 'url(' + require("../assets/companyInfo/announcement_left.png") + ')'

      }
      if(e == 1 && this.showNewsId < this.news.length - 1) {
        this.showNewsId +=1
                this.$refs.right.style.content = 'url(' + require("../assets/companyInfo/announcement_right.png") + ')'
      }
      }, 300)
      setTimeout(()=> {
        this.$refs.news.style.opacity = "1"
      }, 600)
    },
    save() {
      let a = {
            logo: this.companyInfo.logo,
            name: this.name,
            desc: this.desc,
            socailurl: this.socials[0] + '*' + this.socials[1] + '*' + this.socials[2],
            nfturl: '',
            announce: this.news[0] + '*' + this.news[1] + '*' + this.news[2] + '*'+  this.news[3] + '*' + this.news[4] + '*' + this.news[5],
            roomid: this.companyInfo.roomid
          }
      this.webRtc.sendToGdevelop("updateroominfo", a);
      this.showSetting = false
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
  watch: {
  }
};
</script>
<style lang="stylus" scoped>
@font-face {
  font-family: "ZFULL";
  src: url("../assets/font/dogica.ttf");
}
@font-face {
  font-family: "dogicabold";
  src: url("../assets/font/dogicabold.ttf");
}
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
  font-family: 'ZFULL'
  background-image url('../assets/companyInfo.png')
  background-position: center top
  background-repeat: no-repeat
  background-size: 1288px auto
  .manager
    position absolute
    top 85px
    left calc(50% - 528px)
    cursor: pointer
    img
      width: 40px
  .close
    position absolute
    top 36px
    left calc(50% + 428px)
    cursor: pointer
    &:hover
      content url('../assets/companyInfo/close2.png')
  .container
    position relative
    width 100% 
    height 100%
    .company
      position: absolute
      top 180px
      left calc(50% - 480px)
      width 960px
      height 650px
      display grid
      grid-template-columns: 405px 150px 405px;
      grid-template-rows: 100%
      color #856340
      font-size 12px
      line-height 18px
      .title
        background-image url('../assets/company_title.png')
        background-position: left top
        background-repeat: no-repeat
        height 21px
        box-sizing: border-box
        padding 2px 10px
        font-size 16px
        font-weight bold
        font-family: "dogicabold";
        color #f4dea8
        text-align: left
      .social
        .bg
          background-image url('../assets/companyInfo/social.png')
          background-position: left top
          background-repeat: no-repeat
          width: 379px
          height 246px
          margin-top: 20px
          position relative
          img
            cursor pointer
          .head
            position absolute
            top 14px
            left 50px
            width 66px
            cursor default
          .name
            position absolute
            top 90px
            left 40px
            width 86px
            text-align: center
          .desc
            position absolute
            top 14px
            left 150px
            width 200px
            height 70px
            overflow-y: scroll
            text-align: left
          .grey
            filter:grayscale(100%)
            cursor default
          .twitter
            position absolute
            top 165px
            left 77px
            width 45px
            height 43px
          .telegram
            top 205px
          .discord
            position absolute
            top 165px
            left 182px
            width 45px
            height 43px
          .medium
            position absolute
            top 165px
            left 285px
            width 45px
            height 43px
      .news
        .content
          margin-top: 20px
          display grid
          grid-template-columns: 10% 80% 10%;
          align-items: center
          justify-items: center
          .desc
            background-image url('../assets/companyInfo/announcement.png')
            background-position: center center
            background-repeat: no-repeat
            height 160px
            width 324px
            box-sizing: border-box
            padding 37px 37px 30px 37px
            text-align: left
            font-size 14px
            .desc-content
              overflow-y: scroll
              height 90px
              .desc-p
                transition: all .3s linear 
          .right
            transition: all .3s linear
            cursor pointer         
          .left
            transition: all .3s linear  
            cursor pointer        
      .nft
        margin-top: 20px
        .content
          margin-top: 20px
          width: 100%
          height 300px
          overflow-y: scroll
          .null
            font-size 80px
            width 100%
            line-height 300px
          .imgs
            display grid
            grid-template-columns: 33% 33% 33%;
            grid-template-rows 150px 150px
            align-items: center
            justify-items: center
            img
              max-width 100%
      .jobs
        margin-top: 20px
        .content
          margin-top: 20px
          width: 100%
          height 360px
          overflow-y: scroll
          display: flex
          flex-wrap: wrap
          justify-content: space-between
          align-items: flex-start
          border 2px solid #8a5733
          border-radius 5px
          padding 5px
          .null
            font-size 80px
            width 100%
            line-height 360px
          .job
            width 192px
            height 131px
            background-image: url('../assets/companyInfo/job_bg.png')
            box-sizing: border-box
            padding 5px 10px 10px 10px
            text-align: left
            overflow-y: scroll
            cursor: pointer
            img
              width: 20px
              margin-bottom 5px
            .job-title
              font-weight 700
              color #000
              font-size 10px
.officeBg
  width 100vw
  height 100vh
  background #1e1e1ec2
  position absolute
  z-index 999
  display flex
  justify-content center
  align-items center
  top 0
.pmSetting
  .officeCon
    width 800px
    padding 60px
    max-height 70%
    overflow auto
    background: #fff
  .pm
    display flex
    align-items center
    flex-wrap wrap
    p
      width 100%
      text-align left
      line-height 36px
      margin-left 10px
      font-size 20px
      margin 15px 15px 10px
    input
      width 360px
      height 40px
      border 1px solid rgba(128, 128, 128, 0.38)
      border-radius 5px
      padding 0 10px
      outline none
      margin-left 10px
    .roomName
      width 180px
    .dateTime
      width 200px
    div
      width 98px
      height 40px
      background #60ff98
      border-radius 4px
      display flex
      align-items center
      justify-content center
      font-size 16px
      color #fff
      font-weight bold
      margin-left 10px
      cursor pointer
</style>
