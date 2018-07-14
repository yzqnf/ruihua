
<template>
  <div class="page page-privilege privilege-dialog-inactive">
    <CustomDialog :show.sync="showDialog" :headPic="headimgurl">
      <div style="display:flex;height:100%;
      align-items:center;margin:0px 25px 0 28px;
      font-size:14px;color: #FFE2B9;line-height: 24px;">
        <div style="margin-top:14px;">
          尊敬的{{name}}，您还未激活瑞华保险信用卡，请在贺卡日起45天（含）内激活信用卡，若您已经激活信用卡，请在10个工作日后登录瑞华保险官方服务号“个人中心-尊享权益”，查看并领取权益。
        </div>
      </div>
    </CustomDialog>
  </div>
</template>

<script>
import store from '../../../../vuex/store'
import CustomDialog from './../../../common/CustomDialog.vue'
export default {
  name: 'PrivilegeDialogInactive',
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

