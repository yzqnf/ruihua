<template>
  <mu-dialog :open="innerShow" :dialogClass="headPic?'custom-dialog-head custom-dialog':'custom-dialog-no-head custom-dialog'">
    <p v-if="headPic!=null" style="position:absolute;top:-52px;width:100%;text-align:center;">
      <img class="head" :src="headPic">
    </p>
    <slot></slot>
    <p class="closeButton" style="position:absolute;width:100%;text-align:center;">
      <img @click="close" style="margin-top:15px;width:35px;height:35px;" src="../../assets/img/custom_close.png">
    </p>
  </mu-dialog>
</template>

<script>
export default {
  name: 'customDialog',
  props:['show','headPic'],
  data() {
    return {
      innerShow: this.show,
    }
  },
  methods: {
    close(){
      this.innerShow = false
      this.$emit('update:show',false)
    }
  },
  computed: {

  },
  watch:{
    show(value){
      this.innerShow = value
    },
    innerShow(value){
      this.$emit('update:show', value)
      if(value){
        document.body.className = 'main_vue deep-overlay-bg'
      }else{
        document.body.className = 'main_vue'
      }
    }
  },
  mounted() {
    //document.body.className = 'main_vue deep-overlay-bg'
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.custom-dialog-head.custom-dialog{
  position:absolute;
  top:13.8%;
  background-image: url('../../assets/img/privilege/bg_pop_up.jpg');
  background-size: 100% 100%;
  height: 50%;
  min-height:260px;
  width:72%;
  left:14%;
  box-shadow: 0 0 30px 0 rgba(110,88,32,0.51)!important;
  border-radius: 12px!important;
}
.custom-dialog-head.custom-dialog .mu-dialog-body{
  height:100%;
}
.custom-dialog-no-head.custom-dialog{
  position:absolute;
  top:13.8%;
  border-radius: 6px!important;
  width:85%;
  left:7.5%;
}
.custom-dialog .head{
  width:71px;
  height:71px;
  border-radius:50%;
  box-shadow: 0 3px 8px rgba($color: #FDD192, $alpha: 1.0);
}
.custom-dialog-head.custom-dialog .closeButton {
  bottom:-93px;
}
.deep-overlay-bg .mu-overlay{
  opacity: 0.8!important;
  background-color: #10101C!important;
}
</style>

