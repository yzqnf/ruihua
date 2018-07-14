<!-- The ref attr used to find the swiper instance -->
<!-- 插件地址：https://github.com/surmon-china/vue-awesome-swiper -->
<template>
  <div class="page card-main">
    
    <div>Test</div>
    <div @click="openAirDialog">点击打开弹窗</div>
    <div @click="openPersonalDialog">点击打开弹窗</div>
    <air-trave-insurance-detail :show.sync="airDialogStatus"></air-trave-insurance-detail>
    <personal-insurance-detail :show.sync="personalDialogStatus"></personal-insurance-detail>
  </div>
</template>

<script>
import AirTraveInsuranceDetail from './components/AirTraveInsuranceDetail.vue'
import PersonalInsuranceDetail from './components/PersonalInsuranceDetail.vue'
export default {
  name: 'slideTest',
  components: { 
    AirTraveInsuranceDetail,
    PersonalInsuranceDetail
  },
  data() {
      return {
       airDialogStatus:false,
       personalDialogStatus:false
      }
    },
    
    computed: {
     
    },
  methods: {
    openAirDialog(){
      this.airDialogStatus = true
    },
    openPersonalDialog(){
      this.personalDialogStatus = true
    }
  },
  mounted() {
      
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped >
/* 自己定义的容器样式*/

</style>

<style rel="stylesheet/scss" lang="scss">
/* 修改Muse-Ui组件默认样式不能加scoped */


</style>