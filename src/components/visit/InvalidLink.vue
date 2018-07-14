<template>
  <div class="page">
    <div class="page-top"></div>
    <div class="invalid-img">
      <img src="../../assets/img/icon_invalid.png">
    </div>
    <div class="title">回访链接已失效</div>
    <div class="cue">
      <div>后续我们将用固话021-6037-6868</div>
      <div>为您做电话回访</div>
    </div>
    <rh-footer class="footer-fixed"></rh-footer>
  </div>
</template>

<script>
import LogoFooter from './../common/LogoFooter.vue'
export default {
  name:'invalidLink',
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
.invalid-img {
  position:absolute;
  display: block;
  width: 70px;
  height: 70px;
  margin-left: -35px;
  left: 50%;
  top: 80px;
  background: #F16060;
  box-shadow: 0 4px 13px 0 rgba(230,27,27,0.50);
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