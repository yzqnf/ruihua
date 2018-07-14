<template>
  <page class="pro-inner no-padding">
    <div v-for="(clause,index) in clauseList" :key="index" class="clause-list">
      <div class="clause-row" @click="to()">
        <span>《{{clause.cNmeCn}}》</span>
        <img src="../../assets/img/icon_right.png" />
      </div>
    </div>
  </page>
</template>
<script>
export default {
  name: 'clauseList',
  data() {
    return {
      clauseList: [{
        cNmeCn: '产品条款'
      }]
    }
  },
  methods: {
    to: function() {
      console.log(this.$route.params.productId)
      this.$router.push({ name: 'clauseDetail', params: { productId: this.$route.params.productId } });
    },

    //获取条款列表
    getClauseList() {
      utils.http.post('RHPRODUCTCLAUSE', { "CProdNo": this.$route.params.productId }).then(req => {
        console.log(req)
        this.clauseList = req.data.prodClauseList;
        //写死的数据，软通没有配置
        this.clauseList = [{
          cNmeCn: '产品条款'
        }]
      })
    },
  },
}
</script>
<style lang="scss" scoped>
@import 'src/assets/css/product';

.clause-list {
  margin-top: 20px;
}
</style>
