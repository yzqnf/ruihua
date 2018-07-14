<template>
  <div class="page page-privilege page-executed-policy">
    <section>
      <img src="../../../../assets/img/privilege/title_my_policy.png" style="height:25px;margin:auto">
      <!--<div v-for="n in 2" class="pd-lg">
        <div class="gray-row">
          <div class="order-number">订单号：201726873456</div>
          <div class="order-status">已生效</div>
        </div>
        <div class="pd-lg">
          <div class="insurance-name">百万航空意外险</div>
          <div class="policy-detail">
            <div>被保人：阿珂</div>
            <div>保障计划：100万元</div>
            <div>保障期限：2017年9月19日至2018年9月18日</div>
          </div>
        </div>
      </div>-->
      <div v-for="item in policyList" class="pd-lg">
        <div class="gray-row">
          <div class="order-number">订单号：{{item.base.COrderCde}}</div>
          <div class="order-status" 
            :class="{'status-zero':item.base.CPlySts=='0','status-one':item.base.CPlySts=='1','status-four':item.base.CPlySts=='4'}">
            {{item.base.CPlySts | commonFilter('insuranceCode') | statusFilter}}
          </div>
        </div>
        <div class="pd-lg">
          <div class="insurance-name">{{item.base.CProdNme}}</div>
          <div class="policy-detail">
            <div>被保人：{{item.insuredList[0].CInsuredNme}}</div>
            <div>保障计划：{{item.riskList | riskAmtFilter | moneyFilter}}元</div>
            <div>保障期限：{{item.base | validTimeFilter}}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'executedPolicy',
  components: {

  },
  filters: {
    /* 保单状态为1时，commonFilter返回的是空格，所以这里暂时做下特殊处理 */
    statusFilter(val) {
      if(val==' ') return '已生效'
    },
    riskAmtFilter(val) {
      let sum = 0
      for(let item of val) {
        sum += Number(item.NAmt)
      }
      return sum
    },
    validTimeFilter(val) {
      let begin = utils.format.parseDate(val.TInsrncBgnTm)
      let end = utils.format.parseDate(val.TInsrncEndTm)
      end = end.getTime() - 1
      end = new Date(end)
      begin = begin.getFullYear()+'年'+(begin.getMonth()+1)+'月'+begin.getDate()+'日'
      end = end.getFullYear()+'年'+(end.getMonth()+1)+'月'+end.getDate()+'日'
      return begin+'至'+end
    }
  },
  props: {
    policyList:{
      type:Array,
    }
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
.page-privilege.page-executed-policy{
  section {
    background: white;
    padding-top:20px;
  }
  .gray-row {
    display: flex;
    justify-content: space-between;
    background-color: $title-bgColor;
    font-size:1.2rem;
    line-height:30px;
  }
  .gray-row .order-number {
    padding-left:16px;
  }
  .gray-row .order-status {
    padding-right:16px;
  }
  .gray-row .order-status.status-zero{

  }
  .gray-row .order-status.status-one{
    color:$primary-color;
  }
  .gray-row .order-status.status-four{

  }
  .insurance-name {
    font-size:1.5rem;
    line-height: 15px;
    padding-bottom:10px;
    color:$normal-color;
  }
  .policy-detail {
    font-size:1.2rem;
    line-height: 20px;
    color:$normal-color-light;
  }
}
</style>