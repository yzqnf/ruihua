<template>
  <div id="policyHome">
    <transition :name="transitionName">
      <!-- <navigation> -->
      <router-view class="child-view"></router-view>
      <!-- </navigation> -->
    </transition>
  </div>
</template>
<script>
export default {
  name: 'policy',
  data() {
    return {
      transitionName: 'slide-left',
    }
  },
  created() {
    // bind event
    // this.$navigation.on('forward', (to, from) => {
    //   this.transitionName = 'slide-left'
    // })
    // this.$navigation.on('back', (to, from) => {
    //   this.transitionName = 'slide-right'
    // })
    // this.$navigation.on('replace', (to, from) => {
    // })
    // this.$navigation.on('refresh', (to, from) => {
    // })
    // this.$navigation.on('reset', () => {
    // })
    // // and use [once, off] methods
    // this.$navigation.once('forward', () => {
    // })
    // const off = () => {
    // }
    // this.$navigation.on('forward', off)
    // this.$navigation.off('forward', off)
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >
@import 'src/assets/css/policy';
</style>
