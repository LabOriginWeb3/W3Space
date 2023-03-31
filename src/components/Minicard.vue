<template>
  <div class="main">
    <div class="avatar">
      <img src="../assets/avatar1.png" />
      <p>may000000000000000</p>
    </div>
    <div class="message">
      <img src="../assets/cchat.png" />
      <div class="follow">Follow</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Minicard",
  data() {
    return {};
  },
  props: ['userData'],
  computed: {},
  created() {},
  methods: {},
};
</script>
<style lang="stylus" scoped>
.main
    background: #fff;
    width: 200px;
    padding: 10px;
    border-radius: 6px;
    cursor: default;
    .avatar
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        img
            width: 30px
    .message
        display: flex;
        align-items: center;
        margin-top: 10px;
        gap: 20px;
        .follow
            padding: 3px 10px;
            background: #70ef8d;
            border-radius: 50px;
            cursor pointer
        img
            width: 28px
            cursor pointer
</style>
