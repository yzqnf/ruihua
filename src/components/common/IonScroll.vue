<template>
  <div class="ion-scroll" ref="ionScroll">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
export default {
  name:'ion-scroll',
  mounted(){
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.ionScroll, {})
    })
  }
}
</script>

<style>
.ion-scroll{
  overflow: hidden;
}
</style>
