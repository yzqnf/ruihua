<template>
  <label class="auth_info">
    <span style="position: absolute;margin-top: 3px;font-size:1.2rem;color:#52C750" @click="showPopup('bottom')">《保费自动转账授权声明》</span>
    <mu-popup position="bottom" popupClass="demo-popup-bottom" :open="option.showPop" @close="showPopup(false)">
      <!-- <mu-appbar title="保费自动转账授权声明">
              <mu-icon-button disabled slot="left" />
              <mu-icon-button slot="right" icon="close" color="white" @click="showPopup(false)" />
            </mu-appbar> -->
      <mu-content-block class="auth_info" v-bind:style="{height:screenHeight-44+'px'}" style="padding: 24px;">
        <p v-for="item in authList" :key="item">
          {{item}}
        </p>
      </mu-content-block>
      <mu-raised-button @click="showPopup('k')" class="button-second next_btn" label="我知道了" />
    </mu-popup>
  </label>
</template>
<script>
// 数据
import authData from '../../../assets/data/template_xy/auth_book'
export default {
  name: 'Auth',
  components: {
  },
  data() {
    return {
      authList: authData
    }
  },
  props: {
    option: Object
  },
  watch: {
    show(val) {
      // this.option.showPop = true;
    }
  },
  methods: {
		//显示弹出框
    showPopup(type) {
			// document.title = !this.option.showPop ? "保费自动转账授权声明" : this.option.title;
      this.option.showPop = !this.option.showPop;
      if (type == 'k') {
        this.$emit('konw');
      }
    }
  },
  computed: {

  },
  mounted() {

  }
}
</script>
<style lang='scss' >
.auth_info {
  p {
    font-size: 1.3rem;
    color: rgb(85, 96, 116);
    line-height: 26px;
  }
}
</style>

