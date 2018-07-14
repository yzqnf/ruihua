<template>
  <page class="page page-privilege health-pack-detail" 
    ref="pageCompontent" 
    :hideFooter="true"
    :isListenerScroll="true">
    
    <div class="jyk-logan">
      <span class="logan-title">健康管家服务卡</span>
      <span class="logan-desc">500+家三甲医院提供重疾绿色通道服务</span>
      <span class="logan-desc">跟排队和黄牛告别，7个工作日安排专家面诊</span>
    </div>
    <img src="../../assets/img/card/pic_jkfw.jpg" style="width:100%">
    
    <mu-tabs :value="activeTab" id="nav-sticky" @change="handleTabChange">
      <mu-tab value="tab1" title="产品介绍" />
      <mu-tab value="tab2" title="使用流程" />
      <mu-tab value="tab3" title="注意事项" />
    </mu-tabs>

    <tab-health-card-introduce v-if="activeTab=='tab1'"></tab-health-card-introduce>

    <tab-health-use-flow v-if="activeTab=='tab2'"></tab-health-use-flow>

    <tab-health-attention v-if="activeTab=='tab3'"></tab-health-attention>

  </page>
</template>

<script>
import TabHealthCardIntroduce from '../mine/privilege/components/TabHealthCardIntroduce'
import TabHealthUseFlow from '../mine/privilege/components/TabHealthUseFlow'
import TabHealthAttention from '../mine/privilege/components/TabHealthAttention'
export default {
  name: 'healthPack',
  components: {
    TabHealthCardIntroduce,
    TabHealthUseFlow,
    TabHealthAttention,
  },
  filters: {

  },
  data() {
    return {
      activeTab:'tab1',
    }
  },
  computed: {

  },
  watch: {
  
  },
  mounted() {
  
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

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/assets/css/privilege';
.page-privilege.health-pack-detail{
  background: white;
}
.jyk-logan{
  height: 77px;
  padding-top:0px;
  padding-left: 16px;
  border-left:1px solid #fff;
  margin: 42px auto auto 36px;
  color:#fff;
  text-align:left;
  position:absolute;
  z-index:2;
  }
  .jyk-logan{
    .logan-title{
    line-height:26px;
    margin-bottom:7px;
    font-size:2.4rem;
    display: flex;
  }
  .logan-desc{
    line-height:25px;
    font-size:1.4rem;
    display: flex;
  }
}
</style>

