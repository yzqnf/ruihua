<!-- 意外牙科治疗险详情（弹窗） -->
<template>
  <div class="page card-dental-dialog">
    <CustomDialog :show.sync="showDentalDialog">
      <div class="toastContainer">
        <div class="t-title">意外牙科治疗险</div>
        <table>
          <tr class="policy-prop">
            <td>投保年龄</td>
            <td>保障期间</td>
            <td>保障金额</td>
          </tr>
          <tr>
            <td class="prop-detail">18-60周岁</td>
            <td class="prop-detail">1年</td>
            <td class="prop-detail">1万</td>
          </tr>
        </table>
        <div class="insur-duty-con">
          <div class="insur-duty">保险责任</div>
        </div>
        <div class="duty-detail">
          <div>被保险人因意外伤害事故直接造成口腔或牙齿损伤，并且在意外事故发生后 48 小时内在医院接受以减轻被保险人的疼痛而进行的紧急牙科治疗，瑞华保险就该次治疗发生的合理且必要的医疗费用给付意外紧急牙科治疗保险金，但每一保险期间累计给付的保险金之和不超过保险金额。
          </div>
        </div>
      </div>
    </CustomDialog>
  </div>
</template>

<script>
import CustomDialog from './../../common/CustomDialog.vue'
export default {
  name: 'dentalInsuranceDetail',
  components: {
    CustomDialog
  },
  filters: {

  },
  props: {
    show: {
      type:Boolean,
      default:false,
    }
  },
  data() {
    return {
      showDentalDialog:this.show
    }
  },
  computed: {

  },
  watch: {
    show(val){
      this.showDentalDialog= val
    },
    showDentalDialog(val){
      if(val==false){
        this.$emit('update:show',false)
      }
    }
  },
  mounted() {
  
  },
  methods: {

  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped >
/* @import 'src/assets/css/privilege'; */

th,td{
    padding: 1%  0;
  }
  th{
    margin-bottom: 2%;
  }
  td{
    font-size: 1.2rem;
    padding-right: 30px;
  }

/* dialog */
  .toastContainer{
    height:100%;
    padding-bottom:43px;
    flex-direction:column;
    display:flex;
    align-items:center;
    justify-content:center;
  }
  .toastContainer{
    .t-title{
      width:100%;
      height:55px;
      line-height: 55px;
      text-align:center;
      color:#7C6837;
      font-size:1.7rem;
      border-bottom: 1px solid #ECBB3B;
    },
    table{
      margin-top: 16px;
      text-align:center;
    },
    .cy-prop{
      color:#7C6837;
    },
    .insur-duty-con{
      width:100%;
      margin-top:14px;
    }
    
  }
  td.prop-detail{
      font-size:1.5rem;
      line-height:21px;
      color:#394043;
    }
  .insur-duty-con{
    .insur-duty{
      height:30px;
       line-height:30px;
       font-size:1.2rem;
       color:#7C6837;
       text-align:center;
       margin:0 14px;
       background:#F5F4F2;
    }
  }
  .duty-detail{
    width:100%;
    color:#394043;
    font-size:1.3rem;
    text-align:left;
    padding-top:14px;
  }
  .duty-detail div{
    margin:0 28px;
    line-height:24px;
  }
</style>