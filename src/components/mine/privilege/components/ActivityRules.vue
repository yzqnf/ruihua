<template>
  <div class="page page-privilege page-activity-rules">
    <section style="background:white;">
      <div class="pd-lg">
        <div class="title">活动规则</div>
        <div class="content">
          <div>办理交通银行瑞华保险信用卡主卡，激活后可享百万航空意外险和个人综合意外险。新用户更可享套餐好礼，可在“牙齿健康套餐”以及“健康管家服务套餐”中二选其一。</div>
          <div><a @click="$router.push('cardRules')">具体详见活动细则</a></div>
          <div>新用户：指目前未持有任何交通银行信用卡，或曾持有但已销户超过6个月，或仅持有交通银行信用卡附属卡的客户。</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'activityRules',
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
.page-privilege.page-activity-rules{
  .title {
    text-align:center;
    font-size:1.5rem;
    line-height: 18px;
    letter-spacing: 0.05em;
    color: $golden-color;
    margin-top:4px;
    margin-bottom: 10px;
  }
  .content, .content a {
    font-size:1.3rem;
    line-height: 24px;
    letter-spacing: 0.05em;
    color: $normal-color-light;
  }
  .content a {
    text-decoration: underline;
  }
}
</style>