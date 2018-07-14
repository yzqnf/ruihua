<template>
  <div class="page-privilege auth pd-lg" :style="{'min-height':screenHeight +'px'}">
    <mu-raised-button 
      class="button-privilege" 
      label="点击实名认证"
      :style="{backgroundImage: 'url('+buttonImage+')'}"
      @click="submit">
    </mu-raised-button>
  </div>
</template>

<script>
import store from '../../../vuex/store'
export default {
  name: 'temporaryAuth',
  components: {

  },
  filters: {

  },
  data() {
    return {
      buttonImage: require('../../../assets/img/privilege/button.png'),
    }
  },
  computed: {

  },
  watch: {
  
  },
  mounted() {
    utils.ui.toast('请先进行实名认证')
  },
  methods: {
    submit() {
      let userInfo = utils.cache.get('user')
      if(userInfo){
        userInfo.isAuth = true
        utils.cache.set('user', userInfo)
        store.commit('LOGIN', userInfo)
      }
      utils.ui.toast('实名认证成功！')
      setTimeout(()=>{
        this.$router.replace('myPrivilege')
      },3000)
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped >
.page-privilege.auth {
  background: transparent;

  .button-privilege {
    margin-top:200px;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
@import 'src/assets/css/privilege';
</style>
