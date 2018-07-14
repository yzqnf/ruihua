<template>
  <div class="page page-privilege section-famous-hospital">
    <section class="pack-service-content">
      <div class="golden-service-title"><div>多家知名医院</div></div>
      <div class="golden-container mg-lg">
        <div class="container-label"><div>Famous Hospital</div></div>
        <div style="padding-top:15px;">
          <div class="logo-container"><img src="../../../../assets/img/privilege/logo_xiehe.png"></div>
          <div class="logo-container"><img src="../../../../assets/img/privilege/logo_fudan.png"></div>
          <div class="logo-container"><img src="../../../../assets/img/privilege/logo_301.png"></div>
          <div class="logo-container"><img src="../../../../assets/img/privilege/logo_jiaotong.png"></div>
        </div>
        <div class="bottom-row mg-lg">
          <div>医院网络由国康提供</div>
          <div>列表请参考<a href="http://privatedoctor.guokang.com/wxrhjk/rhjkList.htm">《医院机构列表》</a></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'sectionFamousHospital',
  components: {

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
.page-privilege.section-famous-hospital{
  background: white;
  .logo-container {
    border-bottom: 1px solid #EFE3D1;
  }
  .logo-container:last-child{
    border-bottom: 0;
  }
  .logo-container>img {
    max-width:100%;
    margin:16px auto 16px auto;
  }
  .bottom-row a {
    font-size: 1.2rem;
    color: #394043;
    line-height: 16px;
  }
}
</style>