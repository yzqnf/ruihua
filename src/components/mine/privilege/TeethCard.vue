<template>
  <page class="page page-privilege page-teeth-card" 
    ref="pageCompontent" 
    :hideFooter="true"
    :isListenerScroll="true">
    
    <div class="card-container">
      <div class="card">
        <img class="background-image" src="../../../assets/img/privilege/pic_teeth_card_bg.jpg">
        <div class="text-container">
          <div class="text">
            <img src="../../../assets/img/privilege/word_teeth_card.png">
            <div>券码：{{records[0].CCardNo}}</div>
            <div>有效期：{{records[0] | validTimeFilter}}</div>
            <div>可使用次数：{{records[0] | numFilter}}次</div>
          </div>
        </div>
      </div>
    </div>

    <mu-tabs :value="activeTab" id="nav-sticky" @change="handleTabChange">
      <mu-tab value="tab1" title="使用记录" />
      <mu-tab value="tab2" title="产品介绍" />
      <mu-tab value="tab3" title="使用流程" />
      <mu-tab value="tab4" title="注意事项" />
    </mu-tabs>

    <tab-teeth-use-record v-if="activeTab=='tab1'" :records="tabRecords"></tab-teeth-use-record>

    <mu-raised-button 
      v-if="activeTab=='tab1' && hasRecord==false"
      class="button-privilege" 
      label="立即预约"
      :style="{backgroundImage: 'url('+buttonImage+')'}">
    </mu-raised-button>

    <tab-teeth-card-introduce v-if="activeTab=='tab2'"></tab-teeth-card-introduce>

    <tab-teeth-use-flow v-if="activeTab=='tab3'"></tab-teeth-use-flow>

    <tab-teeth-attention v-if="activeTab=='tab4'"></tab-teeth-attention>

  </page>
</template>

<script>
import TabTeethUseRecord from './components/TabTeethUseRecord'
import TabTeethCardIntroduce from './components/TabTeethCardIntroduce'
import TabTeethUseFlow from './components/TabTeethUseFlow'
import TabTeethAttention from './components/TabTeethAttention'
export default {
  name: 'TeethCard',
  components: {
    TabTeethUseRecord,
    TabTeethCardIntroduce,
    TabTeethUseFlow,
    TabTeethAttention,
  },
  filters: {
    validTimeFilter(val) {
      let begin = val.TBgnTime
      let end = val.TEndTime
      if(!begin || !end){
        return ''
      }
      let beginDate = begin.slice(0,4) + '.' + Number(begin.slice(5,7)) + '.' + Number(begin.slice(8,10))
      let endDate = end.slice(0,4) + '.' + Number(end.slice(5,7)) + '.' + Number(end.slice(8,10))
      return beginDate + '~' + endDate
    },
    numFilter(val) {
      return val.NCurNum -val.NTotalNum   //总可用次数 - 总使用次数 = （现）可使用次数
    }
  },
  data() {
    return {
      activeTab:'tab1',
      records:[{      //洁牙卡使用记录
        CCardNo:null,    //券码
        TBgnTime:null,  //有效起期
        TEndTime:null,  //有效止期
        NTotalNum:0,   //使用次数
        TApptTime:null,  //预约时间
        TCancTime:null, //使用时间
        CClName:null, //门诊名称
        CClAddr:null, //门诊地址
      }],
      tabRecords:null, //传给TabTeethUseRecord使用
      buttonImage: require('../../../assets/img/privilege/button.png'),
    }
  },
  computed: {
    hasRecord() {
      if(!this.records) return null
      if(this.records.length == 0) return false
      if(this.records.length > 0) return true
    }
  },
  watch: {
  
  },
  mounted() {
    let userInfo = utils.cache.get('user')
    let model = {
      //PhoneNo: '18016486661',
      PhoneNo: userInfo.CMobile,
    }
    utils.http.post('GETTEETHMSGBYPHONENO', model)
      .then(response => {
        console.log('response.data',response.data)
        if(!response.data.data){
          utils.ui.toast(response.data.statusMessage)
        }
        else if(response.data.data.length > 0){
          this.records = response.data.data
          this.tabRecords = response.data.data
        }
      }).catch(error => {
        utils.ui.toast(error.errorMessage)
      })  
  },
  beforeRouteLeave(to, from, next) {
    //关闭滚动监听
    this.$refs.pageCompontent.closeEventListener();
    next();
  },
  methods: {
    handleTabChange(val) {
      this.activeTab = val
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import 'src/assets/css/privilege';
.page-privilege.page-teeth-card{
  background: white;
  .button-privilege {
    position: absolute;
    bottom:0;
  }
}
</style>

