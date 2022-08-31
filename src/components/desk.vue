<template>
  <div class="main">
    <iframe
      src="https://app.dework.xyz/"
      style="height: 100%"
      ref="desk"
      id="desk"
      name="desk"
    />
  </div>
</template>
<script>
export default {
  name: "Desk",
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

  },
  methods: {},
  watch: {
  }
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
</style>
