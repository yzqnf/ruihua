<template>
  <div class="page page-privilege tab-health-use-record">
    <div class="box-container">
      <div class="group-title">重疾预防<span>00:00～24:00，不限次数。</span></div>
      <div class="record-content">
        <div class="row-border-bottom">
          <div class="label">电话咨询</div>
          <div class="data" style="display:flex;align-items:center;">
            <div>已咨询{{records.NPhoneTime}}次</div>
            <a href="tel:400-609-6868"><img src="../../../../assets/img/privilege/icon_ record_arrow.png" style="width:12px;height:12px;margin-left:16px;"></a>
          </div>
        </div>
      </div>
    </div>
    <div class="box-container">
      <div class="group-title">重疾治疗</div>
      <div class="section-title-row">专家门诊</div>
      <div v-if="regRecord.length>0" class="record-content">
        <div class="row-border-bottom">
          <div class="label">预约时间</div>
          <div class="data">{{regRecord[0].TRegApptTime}}</div>
        </div>
        <div class="row-border-bottom">
          <div class="label">使用时间</div>
          <div class="data">{{regRecord[0].TRegCrtTm}}</div>
        </div>
        <div class="row-border-bottom">
          <div class="label">医院名称</div>
          <div class="data">{{regRecord[0].CRegHospitalName}}</div>
        </div>
        <div class="row-border-bottom">
          <div class="label">就诊科室</div>
          <div class="data">{{regRecord[0].CRegDeptName}}</div>
        </div>
      </div>
      <div v-else>
        <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;">
          <div style="margin-top:30px;">
            <img src="../../../../assets/img/privilege/icon_no_record.png" style="width:70px;">
          </div>
          <div style="font-size: 15px;color: #556074;letter-spacing: -0.51px;margin-top:20px;">
            暂无使用记录
          </div>
        </div>
      </div>
      <div class="section-title-row">住院及手术安排</div>
      <div v-if="gpRecord.length>0" class="record-content">
        <div class="row-border-bottom">
          <div class="label">预约时间</div>
          <div class="data">{{gpRecord[0].TGpApptDate}}</div>
        </div>
        <div class="row-border-bottom">
          <div class="label">使用时间</div>
          <div class="data">{{gpRecord[0].TGpApptDate}}</div>
        </div>
        <div class="row-border-bottom">
          <div class="label">医院名称</div>
          <div class="data">{{gpRecord[0].CGpHospitalName}}</div>
        </div>
        <div class="row-border-bottom">
          <div class="label">就诊科室</div>
          <div class="data">{{gpRecord[0].CGpDeptName}}</div>
        </div>
      </div>
      <div v-else>
        <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;">
          <div style="margin-top:30px;">
            <img src="../../../../assets/img/privilege/icon_no_record.png" style="width:70px;">
          </div>
          <div style="font-size: 15px;color: #556074;letter-spacing: -0.51px;margin-top:20px;">
            暂无使用记录
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabHealthUseRecord',
  components: {

  },
  filters: {

  },
  props: {
    records:{
      type:Object,
    },
  },
  data() {
    return {
      regRecord:[],   //专家门诊记录
      gpRecord:[],   //住院及手术安排记录
    }
  },
  computed: {

  },
  watch: {
    records(val) {
      this.filterRecords()
    }
  },
  mounted() {
    this.filterRecords()
  },
  methods: {
    filterRecords() {
      if(this.records.regData){
        for(let item of this.records.regData){
          if(item.CRegType=='1'){  //预约成功
            this.regRecord.push(item)
            break
          }
        }
      }
      if(this.records.gpData){
        for(let item of this.records.gpData){
          if(item.CGpType=='2'){  //预约成功
            this.gpRecord.push(item)
            break
          }
        }
      }
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped >
@import 'src/assets/css/privilege';
.page-privilege.tab-health-use-record{
  background: white;
}
</style>