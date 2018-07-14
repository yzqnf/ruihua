<template>
  <div class="page mine-page page-contact-us">
    <mu-content-block class="has-header no-padding">
      <img src="../../assets/img/mine/pic_shanghai_workplace.png" class="workplace-img">
      <div class="mine-section mg-lg">
        <div class="mine-inner-group">
          <div class="workplace-header">
            <img src="../../assets/img/rh_logo.jpg" class="rh-logo">
            <div class="workplace-title">上海职场</div>
          </div>
          <div class="address-div">
            <div class="address">上海市黄浦区</div>
            <div class="address">保屯路379号</div>
          </div>
          <div class="contact-info-div">
            <div class="contact-info">客户服务热线：400-609-6868</div>
            <div class="contact-info">客户服务邮箱：voice.rh@rhassurance.com</div>
          </div>
        </div>
      </div>
      <img src="../../assets/img/mine/pic_xian_workplace.png" class="workplace-img">
      <div class="mine-section mg-lg">
        <div class="mine-inner-group">
          <div class="workplace-header">
            <img src="../../assets/img/rh_logo.jpg" class="rh-logo">
            <div class="workplace-title">西安职场</div>
          </div>
          <div class="address-div">
            <div class="address">陕西省西安市莲湖区</div>
            <div class="address">群贤路6号锦都花园1号楼</div>
          </div>
          <div  class="contact-info-div">
            <div class="contact-info">客户服务热线：400-609-6868</div>
            <div class="contact-info">客户服务邮箱：voice.rh@rhassurance.com</div>
          </div>
        </div>
      </div>
      <rh-footer></rh-footer>
    </mu-content-block>
  </div>
</template>

<script>
import LogoFooter from './../common/LogoFooter.vue'
export default {
  name: 'contactUs',
  components: {
    'rh-footer': LogoFooter,
  },
  data() {
    return {
    }
  },
  methods: {
    showToast(flag) {
      this.toast = flag
    }
  },
  computed: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped >
@import 'src/assets/css/mine';
.page-contact-us {
  .workplace-img {
      width: 100%;
  }
  .mine-section {
    margin-top: -5px;
    .mine-inner-group {
      padding: 24px;
      .workplace-header {
        display: flex;
        align-items: center;
        .rh-logo {
          width: 106px;
        }
        .workplace-title {
          border-left: 1px solid $memo-color-light;
          font-size: 1.3rem;
          line-height: 14px;
          height: 14px;
          margin-left: 10px;
          padding-left: 10px;
        }
      }
      .address-div {
        margin-top: 16px;
        margin-bottom: 10px;
        .address {
          font-size: 1.9rem;
          line-height: 25px;
        }
      }
      .contact-info-div {
        .contact-info {
          font-size: 1.3rem;
          line-height: 23px;
        }
      }
    }
  }
}
</style>