<template>
  <page class="page page-privilege page-my-privilege">

    <privilege-insurance v-if="pageStatus!=null && pageStatus<3"></privilege-insurance>

    <new-user-packs v-if="pageStatus!=null && pageStatus<3"></new-user-packs>

    <activity-rules v-if="pageStatus!=null && pageStatus<3"></activity-rules>
    <div v-if="pageStatus!=null && pageStatus<3" class="pd-lg">
      <mu-raised-button 
        class="button-privilege" 
        label="立即领取"
        :style="{backgroundImage: 'url('+buttonImage+')'}"
        @click="takePack">
      </mu-raised-button>
    </div>

    <packs-to-take v-if="pageStatus==3" @takePackSuccess="takePackSuccess"></packs-to-take>

    <executed-policy v-if="pageStatus==3 || pageStatus==4 || pageStatus==5 || pageStatus==6" :policyList="policyList"></executed-policy>

    <privilege-service v-if="pageStatus==5 || pageStatus==6" :cardType="pageStatus" style="margin-top:16px;">
    </privilege-service>

    <privilege-dialog-no-card :show.sync="showDialog1"></privilege-dialog-no-card>

    <privilege-dialog-inactive :show.sync="showDialog2"></privilege-dialog-inactive>

    <!-- 测试按钮 -->
    <!--<div @click="switchStatus" style="position:fixed;top:0;right:0;color:#D0A231;z-index:20171111;">
      {{switchLabel}}
    </div>-->

    <mu-dialog :open="showloadingDialog" dialogClass="loadingDialog">
      <img src="../../../assets/img/common/loading.gif" />
      <div class="font-load font-md">正在加载</div>
    </mu-dialog>

  </page>
</template>

<script>
import store from '../../../vuex/store'
import PrivilegeInsurance from './components/PrivilegeInsurance'
import NewUserPacks from './components/NewUserPacks'
import ActivityRules from './components/ActivityRules'
import PacksToTake from './components/PacksToTake'
import ExecutedPolicy from './components/ExecutedPolicy'
import PrivilegeService from './components/PrivilegeService'
import PrivilegeDialogNoCard from './components/PrivilegeDialogNoCard'
import PrivilegeDialogInactive from './components/PrivilegeDialogInactive'
export default {
  name: 'myPrivilege',
  components: {
    PrivilegeInsurance,
    NewUserPacks,
    ActivityRules,
    PacksToTake,
    ExecutedPolicy,
    PrivilegeService,
    PrivilegeDialogNoCard,
    PrivilegeDialogInactive,
  },
  filters: {

  },
  data() {
    return {
      //根据登录用户的办卡状态决定页面显示内容：
      //0.未实名认证；1.已实名未办卡；2.已办卡未激活；3.已激活新卡用户未领权益；4.已激活老卡用户
      //5.已领取牙齿健康套餐 6.已领取健康管家服务套餐
      pageStatus:null,
      buttonImage: require('../../../assets/img/privilege/button.png'),
      model: {
        cardId: 'BCM0001',
        //openId: 'oM9JHwQDXbqlMrMNgKpahUNIcvAUB',
        openId: utils.cache.get('wxConfig').openId,
      },
      policyList:[],   //我的保单（赠险）
      showDialog1:false,
      showDialog2:false,
      showloadingDialog:false,
    }
  },
  computed: {
    switchLabel(){
      if(this.pageStatus == 0) return '未实名认证'
      if(this.pageStatus == 1) return '已实名未办卡'
      if(this.pageStatus == 2) return '已办卡未激活'
      if(this.pageStatus == 3) return '已激活新卡用户'
      if(this.pageStatus == 4) return '已激活老卡用户'
      if(this.pageStatus == 5) return '已领取牙齿健康套餐'
      if(this.pageStatus == 6) return '已领取健康管家服务套餐'
    }
  },
  watch: {
    pageStatus(val) {
      store.commit('PRIVILEGESTATUS', {status:val})
      if(val == 1){
        this.showDialog1 = true
        this.showDialog2 = false
      }else if(val == 2){
        this.showDialog1 = false
        this.showDialog2 = true
      }else {
        this.showDialog1 = false
        this.showDialog2 = false
      }
    },
  },
  activated() {
    //先判断是否实名认证
    let userInfo = utils.cache.get('user')
    console.log('userInfo', userInfo)
    if(userInfo){
      if(!userInfo.isAuth){
        this.pageStatus = 0
        return
      }
    }
    /**/
    //获取办卡状态
    store.commit('LOADING_DISABLED', true)
    this.showloadingDialog = true
    utils.http.post('APPLYBCMCARD', this.model).then(response => {
      console.log('APPLYBCMCARD.response.data', response.data)
      let applyStatus = response.data.body.applyStatus
      if(applyStatus == '00' || applyStatus == '01' || applyStatus == '04'){
        this.pageStatus = 1  //1.已实名未办卡
        this.showloadingDialog = false
      }
      else{
        if(response.data.body.cardType=='0'){
          this.pageStatus = 1  //只有主卡才算办卡
          this.showloadingDialog = false
        }
        else{
          if(applyStatus =='02'){
            this.pageStatus = 2 //2.已办卡未激活
            this.showloadingDialog = false
          }
          else if(applyStatus =='03'){
            store.commit('LOADING_DISABLED', true)
            utils.http.post('ISCANGETPROFIT', this.model).then(response => {
              console.log('ISCANGETPROFIT.response.data', response.data)
              if(response.data.body.hasProfit != '1'){  //还未领取权益前要判断是新卡用户还是老卡用户
                if(response.data.body.isNew == '1'){
                  this.pageStatus = 3  //3.已激活新卡用户，还未领取权益
                }else if(response.data.body.isNew == '0'){
                  this.pageStatus = 4  //4.已激活老卡用户
                }
              }
            }).catch(error => {
              utils.ui.toast(error.errorMessage)
            })
            //如果已激活，肯定有我的保单，注意保单的数据要传到子组件上去
            store.commit('LOADING_DISABLED', true)
            utils.http.post('GETPROFITLIST', this.model).then(response => {
              this.showloadingDialog = false
              console.log('GETPROFITLIST.response.data', response.data)
              this.updateExcutedPack(response.data)
            }).catch(error => {
              this.showloadingDialog = false
              utils.ui.toast(error.errorMessage)
            })
          }
        }
      }
    }).catch(error => {
      this.showloadingDialog = false
      utils.ui.toast(error.errorMessage)
    })
  },
  methods: {
    /*switchStatus(){
      if(this.pageStatus == 6) this.pageStatus = 0
      else this.pageStatus += 1
    },*/
    updateExcutedPack(data) {
      let list = data.result.body
      //先判断pageStatus
      for(let item of list){
        if(item.packageAttr == 'new_choice' && item.packageId == 'ncp2017090801'){
          this.pageStatus = 5    //已领取洁牙套餐
          break
        }else if (item.packageAttr == 'new_choice' && item.packageId == 'ncp2017090802'){
          this.pageStatus = 6    //已领取健保套餐
          break
        }
      }
      //初始化保单数据
      for(let item of data.respList){
        if(item.status == 'success'){
          this.policyList.push(item.plyDetail)
        }
      }
    },
    takePackSuccess(type) {
      if(type == 1)  this.pageStatus = 5
      else if(type == 2) this.pageStatus = 6
    },
    takePack() {
      if(this.pageStatus == 0) {
        this.$router.replace('temporaryAuth')
      }
      if(this.pageStatus == 1){
        this.showDialog1 = true
      }else if(this.pageStatus == 2){
        this.showDialog2 = true
      }
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import 'src/assets/css/privilege';
.page-privilege.page-my-privilege{
}
</style>