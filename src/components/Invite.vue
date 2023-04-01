<template>
  <div class="invite officeBg" @click="closeInvite">
    <div class="officeCon" @click="cancelBubble($event)">
      <p class="close_frame" @click="closeInvite"><img src="../assets/close.svg"/></p>
      <div class="bgImg">
        <img class="left" src="../assets/bg-left.png" />
      </div>
      <h2 v-if="mapId === 202">SHARE THIS MEETING</h2>
      <h2 v-else>INVITE FRIEND</h2>
      <div class="info">
        <p v-if="mapId === 202">Send a meeting link to others</p>
        <p v-else>Send An Invite Link To Your Friend</p>
        <div>
          <input id="inviteLink" readOnly v-model="inviteLink" />
          <span @click="copyLink">Copy</span>
        </div>
      </div>
      <div class="bgImg bgImg_right">
        <img class="right" src="../assets/taskright.png" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Invite",
  data() {
    return {};
  },
  props: ["showInvite", "mapId", "inviteLink"],
  computed: {},
  created() {},
  methods: {
    closeInvite() {
      this.$emit("closeInvite");
    },
    cancelBubble(event) {
      this.$emit("cancelBubble", event);
    },
    copyLink() {
      var copyContent = document.getElementById("inviteLink");
      copyContent.select();
      document.execCommand("Copy");
    },
  },
};
</script>
<style lang="stylus" scoped>
@import '../views/home.styl'
</style>
