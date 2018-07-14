<template>
  <div class="page page-privilege tab-teeth-use-record">
    <div v-if="hasRecord==false">
      <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;">
        <div style="margin-top:68px;">
          <img src="../../../../assets/img/privilege/icon_no_record.png" style="width:70px;">
        </div>
        <div style="font-size: 15px;color: #556074;letter-spacing: -0.51px;margin-top:20px;">
          暂无使用记录
        </div>
      </div>
    </div>
    <div v-else-if="hasRecord==true">
      <div class="box-container">
        <div class="record-content">
          <div class="row-border-bottom">
            <div class="label">预约时间</div>
            <div class="data">{{records[0].TApptTime}}</div>
          </div>
          <div class="row-border-bottom">
            <div class="label">使用时间</div>
            <div class="data">{{records[0].TCancTime}}</div>
          </div>
          <div class="row-border-bottom">
            <div class="label">门诊名称</div>
            <div class="data">{{records[0].CClName}}</div>
          </div>
          <div class="row-border-bottom">
            <div class="label">门诊地址</div>
            <div class="data">{{records[0].CClAddr}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabTeethUseRecord',
  components: {

  },
  filters: {

  },
  props: {
    records:{
      type:Array,
    },
  },
  data() {
    return {

    }
  },
  computed: {
    hasRecord() {
      if(!this.records) return null
      if(this.records.length == 0) return false
      if(this.records.length > 0) return true
    }
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
.page-privilege.tab-teeth-use-record{
  background: white;
}
</style>