<template>
  <div class="page page-privilege tab-teeth-card-introduce">
    <section class="pack-service-content">
      <div class="golden-service-title"><div>什么是洁牙</div></div>
      <div class="golden-container mg-lg">
        <div class="container-label"><div>What's the cleaning</div></div>
        <div style="font-size: 12px;color: #556074;line-height: 18px;padding:18px 16px 16px 18px;">
          牙医使用超声波洁治器对牙龈上的牙结石进行清洗，术后对牙齿进行抛光，使牙齿表面平滑，光洁，减少牙菌斑附着。
        </div>
      </div>
    </section>
    <section class="pack-service-content">
      <div class="golden-service-title"><div>为什么要洁牙</div></div>
      <div class="golden-container mg-lg">
        <div class="container-label"><div>Why do you want to clean teeth?</div></div>
        <div style="margin:21px 16px 16px 16px;">
          <img src="../../../../assets/img/privilege/pic_teeth.png" style="max-width:100%;margin:auto;">
        </div>
      </div>
    </section>
    <section class="pack-service-content">
      <div class="golden-service-title"><div>服务内容</div></div>
      <div class="golden-container mg-lg">
        <div class="container-label"><div>Service Content</div></div>
        <div class="service-list" style="padding:23px 0 23px 0;">
          <div class="service-item">
            <img src="../../../../assets/img/privilege/icon_dot.png">
            口腔全面检查1次
          </div>
          <div class="service-item">
            <img src="../../../../assets/img/privilege/icon_dot.png">
            数字全景X片1次
          </div>
          <div class="service-item">
            <img src="../../../../assets/img/privilege/icon_dot.png">
            全口牙齿超声波洁牙1次
          </div>
          <div class="service-item">
            <img src="../../../../assets/img/privilege/icon_dot.png">
            全口牙齿抛光1次
          </div>
        </div>
      </div>
    </section>
    <section-dental-clinic></section-dental-clinic>
  </div>
</template>

<script>
import SectionDentalClinic from './SectionDentalClinic'
export default {
  name: 'TabTeethCardIntroduce',
  components: {
    SectionDentalClinic,
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
.page-privilege.tab-teeth-card-introduce{
  background: white;
}
</style>