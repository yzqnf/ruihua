<template>
  <page class="page page-privilege teeth-pack-detail" 
    ref="pageCompontent" 
    :hideFooter="true" 
    :isListenerScroll="true">

    <div class="jyk-logan">
      <span class="logan-title">洁牙卡</span>
      <span class="logan-desc">美好生活从“齿”开始</span>
      <span class="logan-desc">瑞华让您笑的更自信</span>
    </div>

    <img src="../../assets/img/card/pic_jyk.jpg" style="width:100%">

    <mu-tabs :value="activeTab" id="nav-sticky" @change="handleTabChange">
      <mu-tab value="tab1" title="产品介绍" />
      <mu-tab value="tab2" title="使用流程" />
      <mu-tab value="tab3" title="注意事项" />
    </mu-tabs>

    <tab-teeth-card-introduce v-if="activeTab=='tab1'"></tab-teeth-card-introduce>

    <tab-teeth-use-flow v-if="activeTab=='tab2'"></tab-teeth-use-flow>

    <tab-teeth-attention v-if="activeTab=='tab3'"></tab-teeth-attention>

  </page>
</template>

<script>
import TabTeethCardIntroduce from '../mine/privilege/components/TabTeethCardIntroduce'
import TabTeethUseFlow from '../mine/privilege/components/TabTeethUseFlow'
import TabTeethAttention from '../mine/privilege/components/TabTeethAttention'
export default {
  name: 'teethPack',
  components: {
    TabTeethCardIntroduce,
    TabTeethUseFlow,
    TabTeethAttention,
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
.page-privilege.teeth-pack-detail{
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

