<template>
  <div class="page page-privilege page-new-user-packs">
    <img src="../../../../assets/img/privilege/pic_either_or.png" style="height:28px;margin:auto">
    <section class="new-user pd-lg">
      <div class="teeth-pack card-shadow"  @click="$router.push('teethPackDetail')">
        <img class="radius-top-2" src="../../../../assets/img/privilege/pic_teeth_cleaning_pack.jpg" style="width:100%">
        <div class="title-with-background">
          <div><div class="pack-name">牙齿健康套餐</div></div>
          <img src="../../../../assets/img/privilege/word_oral_health.png" style="width:100%">
        </div>
        <div class="pd-lg">
          <div class="pack-item">
            <img src="../../../../assets/img/privilege/pic_teeth_insurance.jpg">
            <div class="pack-item-content">
              <div class="title">意外牙科治疗险</div>
              <div class="description">万元牙科意外保障，让您微笑每一天</div>
            </div>
          </div>
          <div class="pack-item">
            <img src="../../../../assets/img/privilege/pic_teeth_cleaning_card.jpg">
            <div class="pack-item-content">
              <div class="title">洁牙卡</div>
              <div class="description">美好生活从“齿”开始，瑞华让您笑得更自信</div>
            </div>
          </div>
        </div>
      </div>
      <div class="health-pack card-shadow"  @click="$router.push('healthPackDetail')">
        <img class="radius-top-2" src="../../../../assets/img/privilege/pic_health_pack.jpg" style="width:100%">
        <div class="title-with-background">
          <div><div class="pack-name">健康管家服务套餐</div></div>
          <img src="../../../../assets/img/privilege/word_health_butler.png" style="width:100%">
        </div>
        <div class="pd-lg">
          <div class="pack-item">
            <img src="../../../../assets/img/privilege/pic_health_card.jpg">
            <div class="pack-item-content">
              <div class="title">癌无忧防癌险</div>
              <div class="description">爱来癌去，让全家乐享安心</div>
            </div>
          </div>
          <div class="pack-item">
            <img src="../../../../assets/img/privilege/pic_cancer_insurance.jpg">
            <div class="pack-item-content">
              <div class="title">健康管家服务卡</div>
              <div class="description">500+家三甲医院提供重疾绿色通道服务</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'newUserPacks',
  components: {

  },
  filters: {

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
.page-privilege.page-new-user-packs{
  .new-user>div {
    background: #FFF;
    margin-bottom: 20px;
  }
  .new-user .pack-item:first-child {
    margin-bottom: 20px;
  }
  .title-with-background {
    position: relative;
  }
  .title-with-background>div{
    position: absolute;
    left:0; 
    right:0;
    top:0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .title-with-background>div>div {
    font-size:1.5rem;
    line-height:20px;
    color:$normal-color;
  }
  .pack-item {
    display: flex;
  }
  .pack-item img{
    height: 36px;
  }
  .pack-item .pack-item-content{
    padding-left:10.5px;
  }
  .pack-name {
    font-weight:bold;
  }
}
</style>

