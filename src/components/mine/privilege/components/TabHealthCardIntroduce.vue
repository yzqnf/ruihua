<template>
  <div class="page page-privilege tab-health-card-introduce">
    <section class="pack-service-content">
      <div class="golden-service-title"><div>健康管家服务卡包含什么？</div></div>
      <div class="golden-container mg-lg">
        <div class="container-label"><div>what’s the health butler service card?</div></div>
        <img src="../../../../assets/img/privilege/pic_health_butler.png" style="max-width:100%;margin:16px auto 16px auto;">
      </div>
    </section>
    <section-famous-hospital></section-famous-hospital>
  </div>
</template>

<script>
import SectionFamousHospital from './SectionFamousHospital'
export default {
  name: 'TabHealthCardIntroduce',
  components: {
    SectionFamousHospital,
  },
  filters: {

  },
  props: {

  },
  data() {
    return {

    }
  },
  computed: {

  },
  watch: {
  
  },
  mounted() {
  
  },
  methods: {

  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped >
@import 'src/assets/css/privilege';
.page-privilege.tab-health-card-introduce{
  background: white;
}
</style>