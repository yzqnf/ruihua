<template>
  <div class="page">
    <div class="page-top"></div>
    <div class="successed-img">
      <img src="../../assets/img/icon_callbackSuccessed.png">
    </div>
    <div class="title">您已参与过回访</div>
    <div class="cue">
      感谢您的配合
    </div>
    <rh-footer class="footer-fixed"></rh-footer>
  </div>
</template>

<script>
import LogoFooter from './../common/LogoFooter.vue'
export default {
  name:'callbackSuccessed',
  components: {
    'rh-footer': LogoFooter
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.page {
  position: absolute;
  text-align: center;
  height: 100%;
}
.page-top {
  width: 100%;
  height: 120px;
  background: #FFFFFF;
}
.successed-img {
  position:absolute;
  display: block;
  width: 70px;
  height: 70px;
  margin-left: -35px;
  left: 50%;
  top: 80px;
  background: #52C750;
  box-shadow: 0 4px 13px 0 #8FCB8E;
  border-radius: 20px;
  img {
    width: 36px;
    height: 36px;
    margin: 17px;
  }
}
.title {
  width: 133px;
  position:absolute;
  margin-left: -66.5px;
  top: 190px;
  left: 50%;
  font-size: 19px;
  color: #394043;
  line-height: 23px;
}
.cue {
  width: 240px;
  position:absolute;
  left: 50%;
  margin-left: -120px;
  top: 229px;
  font-size: 15px;
  color: #556074;
  line-height: 26px;
}
.footer-fixed {
  position: fixed;
  bottom: 0;
}
</style>