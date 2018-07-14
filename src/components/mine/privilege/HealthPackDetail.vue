<template>
  <page class="page page-privilege health-pack-detail" 
    ref="pageCompontent" 
    :hideFooter="true"
    :isListenerScroll="true">
    
    <img src="../../../assets/img/privilege/pic_health_pack.jpg" style="width:100%">
    <mu-tabs :value="activeTab" id="nav-sticky" @change="handleTabChange">
      <mu-tab value="tab1" title="产品介绍" />
      <mu-tab value="tab2" title="使用流程" />
      <mu-tab value="tab3" title="注意事项" />
    </mu-tabs>

    <tab-health-pack-introduce v-if="activeTab=='tab1'"></tab-health-pack-introduce>

    <tab-health-use-flow v-if="activeTab=='tab2'"></tab-health-use-flow>

    <tab-health-attention v-if="activeTab=='tab3'"></tab-health-attention>

  </page>
</template>

<script>
import TabHealthPackIntroduce from './components/TabHealthPackIntroduce'
import TabHealthUseFlow from './components/TabHealthUseFlow'
import TabHealthAttention from './components/TabHealthAttention'
export default {
  name: 'healthPackDetail',
  components: {
    TabHealthPackIntroduce,
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

<style rel="stylesheet/scss" lang="scss">
@import 'src/assets/css/privilege';
.page-privilege.health-pack-detail{
  background: white;
}
</style>

