<!-- 癌无忧防癌险详情（弹窗） -->
<template>
  <div class="page card-cancer-dialog">
    <CustomDialog :show.sync="showCancerDialog">
      <div class="toastContainer">
        <div class="t-title">癌无忧防癌险</div>
        <table>
          <tr class="policy-prop">
            <td>投保年龄</td>
            <td>保障期间</td>
            <td>保障金额</td>
          </tr>
          <tr>
            <td class="prop-detail">18-40周岁</td>
            <td class="prop-detail">1年</td>
            <td class="prop-detail">10万</td>
          </tr>
          <tr>
            <td class="prop-detail">41-60周岁</td>
            <td class="prop-detail">1年</td>
            <td class="prop-detail">5万</td>
          </tr>
        </table>
        <div class="insur-duty-con">
          <div class="insur-duty">保险责任</div>
        </div>
        <div class="duty-detail">
          <div>恶性肿瘤</div>
        </div>
      </div>
    </CustomDialog>
  </div>
</template>

<script>
import CustomDialog from './../../common/CustomDialog.vue'
export default {
  name: 'cancerInsuranceDetail',
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
      showCancerDialog:this.show
    }
  },
  computed: {

  },
  watch: {
    show(val){
      this.showCancerDialog= val
    },
    showCancerDialog(val){
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