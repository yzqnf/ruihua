<template>
  <page class="page page-privilege page-teeth-card" 
    ref="pageCompontent" 
    :hideFooter="true"
    :isListenerScroll="true">
    
    <div class="card-container">
      <div class="card">
        <img class="background-image" src="../../../assets/img/privilege/pic_health_card_bg.jpg">
        <div class="text-container">
          <div class="text">
            <img src="../../../assets/img/privilege/word_health_card.png">
            <div>有效期：{{cardInfo | validTimeFilter}}</div>
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

    <tab-health-use-record v-if="activeTab=='tab1'" :records="records"></tab-health-use-record>

    <tab-health-card-introduce v-if="activeTab=='tab2'"></tab-health-card-introduce>

    <tab-health-use-flow v-if="activeTab=='tab3'"></tab-health-use-flow>

    <tab-health-attention v-if="activeTab=='tab4'"></tab-health-attention>

  </page>
</template>

<script>
import TabHealthUseRecord from './components/TabHealthUseRecord'
import TabHealthCardIntroduce from './components/TabHealthCardIntroduce'
import TabHealthUseFlow from './components/TabHealthUseFlow'
import TabHealthAttention from './components/TabHealthAttention'
export default {
  name: 'healthCard',
  components: {
    TabHealthUseRecord,
    TabHealthCardIntroduce,
    TabHealthUseFlow,
    TabHealthAttention,
  },
  filters: {
    validTimeFilter(val) {
      let begin = val.TBgnTime
      let end = val.TEndTime || val.TEngTime
      if(!begin || !end){
        return ''
      }
      if(begin.indexOf('-')==2) begin = '20'+ begin
      if(end.indexOf('-')==2) end = '20' + end
      let beginDate = begin.slice(0,4) + '.' + Number(begin.slice(5,7)) + '.' + Number(begin.slice(8,10))
      let endDate = end.slice(0,4) + '.' + Number(end.slice(5,7)) + '.' + Number(end.slice(8,10))
      return beginDate + '~' + endDate
    },
  },
  data() {
    return {
      activeTab:'tab1',
      records:{},   //健保卡使用记录
      cardInfo:{},
    }
  },
  computed: {

  },
  watch: {
  
  },
  mounted() {
    let userInfo = utils.cache.get('user')
    let model = {
      //PhoneNo: '18016486661',
      PhoneNo: userInfo.CMobile,
    }
    utils.http.post('GETHEALMSGBYPHONENO', model)
      .then(response => {
        console.log('response.data',response.data)
        if(response.data.statusCode != '0000'){
          utils.ui.toast(response.data.statusMessage)
        }
        else{
          this.records = response.data
          this.cardInfo = response.data.proData[0]
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
}
</style>

