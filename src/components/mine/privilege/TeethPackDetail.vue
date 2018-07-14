<template>
  <page class="page page-privilege teeth-pack-detail" 
    ref="pageCompontent" 
    :hideFooter="true" 
    :isListenerScroll="true">

    <img src="../../../assets/img/privilege/pic_teeth_cleaning_pack.jpg" style="width:100%">

    <mu-tabs :value="activeTab" id="nav-sticky" @change="handleTabChange">
      <mu-tab value="tab1" title="产品介绍" />
      <mu-tab value="tab2" title="使用流程" />
      <mu-tab value="tab3" title="注意事项" />
    </mu-tabs>

    <tab-teeth-pack-introduce v-if="activeTab=='tab1'"></tab-teeth-pack-introduce>

    <tab-teeth-use-flow v-if="activeTab=='tab2'"></tab-teeth-use-flow>

    <tab-teeth-attention v-if="activeTab=='tab3'"></tab-teeth-attention>

  </page>
</template>

<script>
import TabTeethPackIntroduce from './components/TabTeethPackIntroduce'
import TabTeethUseFlow from './components/TabTeethUseFlow'
import TabTeethAttention from './components/TabTeethAttention'
export default {
  name: 'TeethPackDetail',
  components: {
    TabTeethPackIntroduce,
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

<style rel="stylesheet/scss" lang="scss">
@import 'src/assets/css/privilege';
.page-privilege.teeth-pack-detail{
  background: white;
}
</style>

