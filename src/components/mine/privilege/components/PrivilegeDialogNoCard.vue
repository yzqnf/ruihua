<template>
  <div class="page page-privilege privilege-dialog-no-card">
    <CustomDialog :show.sync="showDialog" :headPic="headimgurl">
      <div style="display:flex;flex-direction:column;height:100%;
      align-items:center;justify-content:center; margin:0px 25px 0 28px;
      font-size:14px;color: #FFE2B9;line-height: 24px;
      /*background-image:url(../../../assets/img/privilege/bg_pop_up.jpg)*/">
        <div style="width:100%;margin-top:14px;">尊敬的{{name}}，您还未办理瑞华保险信用卡，请点击“立即申请”查看详情。</div>
        <mu-raised-button @click="showDialog=false;$router.push('creditCard')"
          style="width:132px;height: 36px;margin-top:15%;
    background-image: linear-gradient(90deg, #FFD198 0%, #A97039 100%);
    box-shadow: inset 0 2px 5px 0 rgba(255,219,177,0.55);
    border-radius: 100px;
    font-size: 14px; font-weight:bold; color: #10101C;"
          label="立即申请">
        </mu-raised-button>
      </div>
    </CustomDialog>
  </div>
</template>

<script>
import store from '../../../../vuex/store'
import CustomDialog from './../../../common/CustomDialog.vue'
export default {
  name: 'PrivilegeDialogNoCard',
  components: {
    CustomDialog,
  },
  filters: {

  },
  props: {
    show: {
      type:Boolean,
      default:false,
    }
  },
  data() {
    return {
      showDialog:this.show,
      headimgurl:require('../../../../assets/img/mine/icon_unlogged.png'),
      name:'',
    }
  },
  computed: {

  },
  watch: {
    show(val){
      this.showDialog = val
    },
    showDialog(val){
      if(!val){
        this.$emit('update:show', val)
      }
    },
  },
  mounted() {
    let userInfo = utils.cache.get('user')
    if(userInfo){
      this.name = userInfo.CName
    }
    //获取微信头像
    store.commit('LOADING_DISABLED', true)
    utils.wx.wxUserInfo().then(req => {
      console.log("返回数据", req)
      if(req.headimgurl){
        this.headimgurl = req.headimgurl
      }
      console.log('headimgurl',this.headimgurl)
    }) 
  },
  methods: {

  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped >
</style>

