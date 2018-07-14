<template>
  <div class="page page-privilege page-privilege-service">
    <section>
      <img src="../../../../assets/img/privilege/title_my_service.png" style="height:25px;margin:auto">
      <div v-if="cardType==5" class="card-container card-shadow">
        <div class="card">
          <img class="background-image" src="../../../../assets/img/privilege/pic_teeth_card_bg.jpg">
          <div class="text-container">
            <div class="text">
              <img src="../../../../assets/img/privilege/word_teeth_card.png">
              <div>{{teethCardRecords[0].CCardNo}}</div>
              <div>有效期：{{teethCardRecords[0] | validTimeFilter}}</div>
            </div>
          </div>
          <div class="badge" :class="teethBadgeClassObject">{{teethCardRecords[0].CStatus | statusFilter}}</div>
        </div>
        <div class="action-list">
          <div class="action-container teeth" @click="$router.push('teethCard')">
            <div class="action">
              <img src="../../../../assets/img/privilege/icon_detail.png">
              <div>查看详情</div>
            </div>
          </div>
          <div class="action-container teeth">
            <div class="action">
              <img src="../../../../assets/img/privilege/icon_booking.png">
              <div @click="book">立即预约</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="cardType==6" class="card-container card-shadow">
        <div class="card">
          <img class="background-image" src="../../../../assets/img/privilege/pic_health_card_bg.jpg">
          <div class="text-container">
            <div class="text">
              <img src="../../../../assets/img/privilege/word_health_card.png">
              <div>有效期：{{healthCardInfo | validTimeFilter}}</div>
            </div>
          </div>
          <div class="badge" :class="healthBadgeClassObject">{{healthCardInfo.CStatus | statusFilter}}</div>
        </div>
        <div class="action-list">
          <div class="action-container health" @click="$router.push('healthCard')">
            <div class="action">
              <img src="../../../../assets/img/privilege/icon_detail.png">
              <div>查看详情</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import store from '../../../../vuex/store'
export default {
  name: 'PrivilegeInsurance',
  components: {

  },
  filters: {
    validTimeFilter(val) {
      let begin = val.TBgnTime
      let end = val.TEndTime || val.TEngTime
      if(!begin || !end){
        return ''
      }
      if(begin.indexOf('-')==2) begin = '20'+ begin
      if(end.indexOf('-')==2) end = '20' + end
      let beginDate = begin.slice(0,4) + '.' + Number(begin.slice(5,7)) + '.' + Number(begin.slice(8,10))
      let endDate = end.slice(0,4) + '.' + Number(end.slice(5,7)) + '.' + Number(end.slice(8,10))
      return beginDate + '~' + endDate
    },
    statusFilter(val) {
      if(!val) return ''
      if(val==1) return '待使用'
      if(val==2) return '已使用'
      if(val==3) return '已失效'
    }
  },
  props: {
    cardType:{
      type:Number,
      default:5,
    }
  },
  data() {
    return {
      teethCardRecords:[{      //洁牙卡使用记录
        CCardNo:null,    //券码
        TBgnTime:null,  //有效起期
        TEndTime:null,  //有效止期
        NTotalNum:0,   //使用次数
        CStatus:null, //状态：“1待使用”、“2已使用”、“3已失效”
        TApptTime:null,  //预约时间
        TCancTime:null, //使用时间
        CClName:null, //门诊名称
        CClAddr:null, //门诊地址
      }],
      healthCardRecords:[],
      healthCardInfo:{
        TBgnTime:null,  //有效起期
        TEndTime:null,  //有效止期
      },
    }
  },
  computed: {
    teethBadgeClassObject() {
      return {
        'badge-valid':this.teethCardRecords[0].CStatus<3,
        'badge-invalid':this.teethCardRecords[0].CStatus==3,
      }
    },
    healthBadgeClassObject() {
      return {
        'badge-valid':this.healthCardInfo.CStatus<3,
        'badge-invalid':this.healthCardInfo.CStatus==3,
      }
    }
  },
  watch: {
    cardType(val){
      this.getRecord()
    }
  },
  mounted() {
    this.getRecord()
  },
  methods: {
    getRecord() {
      if(this.cardType == 5){
        this.getTeethCardRecord()
      }else if(this.cardType == 6){
        this.getHealthCardRecord()
      }
    },
    getTeethCardRecord() {
      let userInfo = utils.cache.get('user')
      let model = {
        //PhoneNo: '18016486661',
        PhoneNo: userInfo.CMobile,
      }
      store.commit('LOADING_DISABLED', true)
      utils.http.post('GETTEETHMSGBYPHONENO', model)
        .then(response => {
          console.log('GETTEETHMSGBYPHONENO.response.data',response.data)
          if(response.data.statusCode != '0000'){
            utils.ui.toast(response.data.statusMessage)
          }
          else {
            this.teethCardRecords = response.data.data
          }
        }).catch(error => {
          utils.ui.toast(error.errorMessage)
        }) 
    },
    getHealthCardRecord() {
      let userInfo = utils.cache.get('user')
      let model = {
        //PhoneNo: '18016486661',
        PhoneNo: userInfo.CMobile,
      }
      store.commit('LOADING_DISABLED', true)
      utils.http.post('GETHEALMSGBYPHONENO', model)
        .then(response => {
          console.log('GETHEALMSGBYPHONENO.response.data',response.data)
          if(response.data.statusCode != '0000'){
            utils.ui.toast(response.data.statusMessage)
          }
          else {
            this.healthCardRecords = response.data
            this.healthCardInfo = response.data.proData[0]
          }
        }).catch(error => {
          utils.ui.toast(error.errorMessage)
        }) 
    },
    book(){
      window.location.href = 
        'http://www.medimpactintl.com.cn/tmcp-webc/index.jsp?cardNo=' + this.teethCardRecords[0].CCardNo
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped >
@import 'src/assets/css/privilege';
.page-privilege.page-privilege-service{
  background:white;
  section{
    padding-top:20px;
    padding-bottom: 37px;
  }
  .card-container {
    margin-top:20px;
    margin-left:20px;
    margin-right:20px;
    border-radius: 6px;
  }
  .background-image {
    border-radius:6px 6px 0 0;
  }
  .badge {
    position: absolute;
    top:0;
    right: 0;
    z-index: 1;
    font-size: 1.2rem;
    font-weight: bold;
    color: #10101C;
    padding:6px 14px 6px 14px;
    border-radius:0 6px 0 2px;
    background-image: linear-gradient(-90deg, #D5A733 0%, #F0CE75 91%);
  }
  .badge-valid {
    background-image: linear-gradient(-90deg, #D5A733 0%, #F0CE75 91%);
  }
  .badge-invalid {
    background-image: linear-gradient(-90deg, #B1B1B1 0%, #DDDDDD 91%);
  }
  .action-list {
    display: flex;
    height: 60px;
  }
  .action-list .action-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .action-list .action-container.teeth {
    width:50%;
  }
  .action-list .action-container.health {
    width:100%;
  }
  .action-list .action-container:nth-child(2){
    border-left: 1px solid #EFE3D1;
  }
  .action-list .action-container .action {
    display:flex;
    align-items: center;
    font-size: 1.5rem;
    line-height:15px;
    color: #7C6837;
  }
  .action-list .action-container img {
    width:16px;
    height:16px;
    margin-right:14px;
  }
  .action-list .action-container:nth-child(2) img {
    width:17px;
    height:17px;
    margin-right:14px;
    margin-bottom: 2px;
  }
}
</style>