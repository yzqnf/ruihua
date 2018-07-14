<template>
  <div>
    <!-- <keep-alive :include="keepAlivePage"> -->
    <navigation>
      <router-view class="child-view"></router-view>
    </navigation>
    <!-- </keep-alive> -->
    <transition name="slide-up">
      <mu-paper v-show="$store.state.common.hasFooter" class="footer-tabs">
        <mu-bottom-nav :value="bottomNav" @change="handleChange" style="height:48px;">
          <mu-bottom-nav-item value="home" title="首页" icon="home" />
          <mu-bottom-nav-item value="customer" title="客户" icon="person" />
          <mu-bottom-nav-item value="about" title="我的" icon="face" />
        </mu-bottom-nav>
      </mu-paper>
    </transition>
    <mu-snackbar v-if="$store.state.common.snackbar" :message="$store.state.common.snackbarMsg" action="关闭" @actionClick="hideSnackbar" @close="hideSnackbar" />

    <mu-dialog :open="$store.state.common.loading && !$store.state.common.loadingDisabled" dialogClass="loadingDialog">
      <!-- <mu-icon value="toys" color="#52C750" :size="48"/> -->
      <img src="../../assets/img/common/loading.gif" />
      <div class="font-load font-md">{{$store.state.common.loadingMsg}}</div>
    </mu-dialog>

    <toast :show="$store.state.common.toast" @update="((val) => $store.state.common.toast = val)">
      <img v-if="$store.state.common.toastImg != ''" :src="$store.state.common.toastImg">
      <div>{{$store.state.common.toastMsg}}</div>
    </toast>

    <mu-dialog dialogClass="dialog" :open="$store.state.common.dialog" @close="handleDialogButton">
      <div class="center">
        <img class="dialog-icon" style="padding-top:35px" :src="$store.state.common.dialogImg">
        <div class="dialog-content">{{$store.state.common.dialogMsg}}</div>
      </div>
      <div class="dialog-button-box" style="margin-top:32px">
        <button v-for="(item, index) in $store.state.common.dialogButtons" :key="index" @click="handleDialogButton(index)">{{item}}</button>
      </div>
    </mu-dialog>

    <mu-popup position="bottom" :open="$store.state.common.popup" @close="handlePopup">
      <mu-appbar :title="$store.state.common.popupTitle">
        <mu-icon-button disabled slot="left" />
        <mu-icon-button slot="right" icon="close" color="white" @click="handlePopup" />
      </mu-appbar>
      <div class="pd-lg">
        {{$store.state.common.popupMsg}}
      </div>
    </mu-popup>
  </div>
</template>

<script>
import Toast from '../common/Toast.vue'

export default {
  components: {
    'toast': Toast
  },
  data() {
    return {
      keepAlivePage: this.$router.keepAlivePage,
      transitionName: null,
      bottomNav: 'home',
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight
    }
  },
  methods: {
    hideSnackbar() {
      this.$store.commit('TOGGLE_SNACKBAR', false)
    },
    handleChange(val) {
      this.bottomNav = val
      this.go(val)
    },
    handleDialogButton(index) {
      console.log(index)
      this.$store.state.common.dialogCallback(index)
      this.$store.state.common.dialog = false
    },
    handlePopup() {
      this.$store.state.common.popupCallback()
      this.$store.state.common.popup = false
    }
  },
  beforeRouteUpdate(to, from, next) {
    let isBack = this.$router.isBack
    if (from.name == 'access' || to.name == from.name) {
      this.transitionName = null
    } else {
      this.transitionName = 'fade'
    }
    this.$router.isBack = false
    next()
  },
  mounted() {

  }
}
</script>

<style lang="scss" >
.main_vue {
  .child-view {
    /*position: absolute;*/
    top: 0;
    width: 100%;
    height: 100%;
  }

  .loadingDialog {
    position: relative;
    width: 143px;
    min-height: 137px;
    line-height: 24px;
    padding: 8px;
    background: rgba(49, 56, 57, .9);
    text-align: center;
    border-radius: 10px;
  }

  .loadingDialog img {
    border-style: none;
    width: 30px;
    margin-top: 25px;
  }

  .loadingDialog .font-load {
    color: white;
    font-size: 1.3rem;
    margin-top: 15px;
  }

  .loadingDialog .font-primary {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .loadingDialog i {
    display: inline-block;
    -webkit-transform: rotate(360deg);
    -webkit-animation: spin 1s linear infinite;
    animation: spin 1s linear infinite;
  }

  @-webkit-keyframes spin {
    from {
      -webkit-transform: rotate(360deg);
    }
    to {
      -webkit-transform: rotate(0deg);
    }
  }

  @keyframes spin {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
}
</style>
