<template>
  <div class="page page-privilege page-privilege-insurance">
    <div class="black-header">
      <img src="../../../../assets/img/privilege/pic_card_privilege.png">
    </div>
    <section class="insurance pd-lg">
      <div class="card-shadow column" @click="dialog1=true">
        <img class="radius-top-2" src="../../../../assets/img/privilege/pic_aviation_accident.jpg" style="width:100%">
        <div class="pd-md">
          <div class="title">百万航空意外保险</div>
          <div class="description">出差/出游全面保障，瑞华让您飞得更高更安心</div>
        </div>
      </div>
      <div class="card-shadow column" @click="dialog2=true">
        <img class="radius-top-2" src="../../../../assets/img/privilege/pic_personal_accident.jpg" style="width:100%">
        <div class="pd-md">
          <div class="title">个人综合意外险</div>
          <div class="description">365天意外保障，呵护您的幸福生活</div>
        </div>
     </div>
    </section>
    <air-trave-insurance-detail :show.sync="dialog1"></air-trave-insurance-detail>
    <personal-insurance-detail :show.sync="dialog2"></personal-insurance-detail>
  </div>
</template>

<script>
import AirTraveInsuranceDetail from '../../../card/components/AirTraveInsuranceDetail'
import PersonalInsuranceDetail from '../../../card/components/PersonalInsuranceDetail'
export default {
  name: 'PrivilegeInsurance',
  components: {
    AirTraveInsuranceDetail,
    PersonalInsuranceDetail,
  },
  filters: {

  },
  data() {
    return {
      dialog1:false,
      dialog2:false,
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
.page-privilege.page-privilege-insurance{
  .insurance {
    margin-top:-56px;
    display:flex;
    justify-content:space-between
  }
  .insurance .column {
    width:48%;
  }
  .insurance .column .title {
    margin-top:5.5px;
    margin-bottom: 5.5px;
  }
}
</style>

