<template>
  <page class="no-padding">
    <div class="nav mine-nav">
      <mu-tabs :value="activeTab" @change="handleTabChange" class="tab">
        <mu-tab value="tab1" title="待生效" />
        <mu-tab value="tab2" title="已生效" />
        <mu-tab value="tab3" title="已失效" />
      </mu-tabs>
    </div>
    <div class="mine-inner" v-if="insureList && insureList.length > 0">
      <div class="mine-card-list">
        <div class="mine-card-item" v-for="(insure,index) in insureList" :key="index" @click="go('insuranceDetails',insure,activeTab)">
          <div class="mine-card-header">
            <div class="mine-header-title money">保单号：{{insure.CPlyNo}}</div>
            <div class="mine-header-operate">
              <span>{{insure.CPlySts | commonFilter('insuranceCode')}}</span>
              <mu-icon value="keyboard_arrow_right"></mu-icon>
            </div>
          </div>
          <div class="mine-card-content">
            <div class="mine-card-title">{{insure.CNmeCn}}</div>
            <div class="mine-card-flag">
              <span class="insure" v-if="insure.CType == '01'">保险</span>
              <span class="health" v-if="insure.CType == '02'">健康</span>
            </div>
            <div class="mine-card-detail">
              <div>投保人：{{insure.CAppNme}}</div>
              <div>被保人：{{insure.CInsuredNme}}</div>
              <div class="money">保险期限：{{insure.CInsuYear | commonFilter('insuredTimeCode')}}</div>
              <div class="money">保障计划：{{insure.NAmt | moneyFilter}}元</div>
              <div class="money">保费：{{insure.NPrm | toFixedFilter}}元</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mine-loading" v-if="loading && (!totalPages || totalPages > requestParam.currentPage)">加载中...</div>
    <!-- <mu-infinite-scroll v-show="!totalPages || totalPages > requestParam.currentPage" :scroller="scroller" :loading="loading" @load="loadMore"/> -->
    <div class="list-data-no" v-if="!insureList || insureList.length == 0">
      <img src="../../assets/img/nodata.png" width="100%">
      <span>暂无数据</span>
    </div>
    <!--猜你想做-->
    <!-- <div class="mine-line-title">猜你想做</div>
      <div class="mine-attestation" @click="go('idAuthentication')">
        <div class="mine-attestation-avatar"></div>
        <div class="mine-attestation-content">
          <div class="mine-attestation-title">身份认证</div>
          <div class="mine-attestation-detail">完善个人信息，查询全渠道保单</div>
        </div>
        <mu-icon class="mine-attestation-icon" value="keyboard_arrow_right"></mu-icon>
      </div> -->
  </page>
</template>

<script>
export default {
  name: 'myInsuranceList',
  data() {
    return {
      activeTab: 'tab2',
      insureList: [],
      loading: false,
      // scroller: null,
      totalPages: null,
      scrollLock: false,
      requestParam : {
        CAppName: null,//投保人姓名 *,  
        CCertfCde: null,//证件号码 *
        CCertfCls: null,//证件类型 *
        ststList: null, //要查询的保单状态
        COprCde: null,//操作人
        currentPage:1,
        pageSize:5, 
      }
    }
  },
  methods: {
    //菜单栏切换
    handleTabChange: function(val) {
      this.activeTab = val;
      this.clearData();
      this.getInurseList()
    },
    go(name, value, status) {
      if (name === 'insuranceDetails') {
        this.$router.push({ name: name, params: { insuranceCode: value.CPlyNo,isShare:false} })
      } else {
        this.$router.push({ name: name });
      }
    },

    //获取保单列表
    getInurseList() {
      this.loading = true
      let user = utils.cache.get('user');
      console.log(user)
      this.requestParam.ststList = this.activeTab == 'tab1' ? ['0'] : (this.activeTab == 'tab2' ? ['1'] : ['4'])
      this.requestParam.CAppName = user.CName,//投保人姓名 *, 
      this.requestParam.CCertfCde = user.CCertfCde,//投保人姓名 *, 
      this.requestParam.CCertfCls = user.CCertfCls,//投保人姓名 *, 
      this.requestParam.COprCde = utils.cache.get('user').CUserId,//投保人姓名 *,  

      utils.http.post('RHPOLICYLIST', this.requestParam).then(req => {
        console.log(req)
        this.insureList = req.data.resultList ? this.insureList.concat(req.data.resultList) : this.insureList;
        this.totalPages = req.data.totalPages;
        this.loading = false;
      }).catch(e => {
        this.insureList = [];
        utils.ui.toast('网络异常');
      })
    },

    //清空数据
    clearData(){
      this.requestParam.currentPage = 1;
      this.totalPages = null;
      this.insureList = [];
    },

    //加载更多
    loadMore(){
      this.requestParam.currentPage++;
      //下拉加载会多次触发
      if(this.totalPages >= this.requestParam.currentPage){
        this.getInurseList();
      }
    },

    //获取当前滚动位置
    getScrollTop(){    
      let scrollTop = 0;    
      if(document.documentElement && document.documentElement.scrollTop){    
        scrollTop = document.documentElement.scrollTop;    
      }else if(document.body){    
        scrollTop = document.body.scrollTop;    
      }    
      return scrollTop;    
    },

    //监听body滚动
    addEventListener() {
      window.addEventListener('scroll', this.listenerScroll)
    },

    //关闭监听body滚动
    closeEventListener(){
      window.removeEventListener('scroll', this.listenerScroll)
    },

    //滚动监听
    listenerScroll(){
      //判断是否触底
      if(document.body.scrollHeight - 10 < this.getScrollTop() + document.documentElement.clientHeight && !this.scrollLock){
        console.log(document.body.scrollHeight,this.getScrollTop() + document.documentElement.clientHeight - 10)

        //上锁
        this.scrollLock = true;
        this.loadMore();
        setTimeout(function(){
          this.scrollLock = false;
        }.bind(this), 1000);
      }
    }

  },
  mounted() {
    // this.scroller = this.$el;
    this.getInurseList();
  },
  activated(){
    this.addEventListener();
  },
  beforeRouteLeave (to, from, next) {
    this.closeEventListener();
    next();
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped >
@import "src/assets/css/mine";

//-----猜你想做------
.mine-line-title {
  position: relative;
  text-align: center;
  line-height: 21px;
  margin: 13px 10px;
  color: $memo-color;
  font-size: 12px;
}

.mine-line-title::before,
.mine-line-title::after {
  content: "";
  height: 0px;
  width: -webkit-calc(50% - 40px);
  width: calc(50% - 40px);
  border-bottom: 1px dashed $memo-color;
  position: absolute;
  top: 10px;
}

.mine-line-title::before {
  left: 0px;
}

.mine-line-title::after {
  right: 0px;
}

//身份认证
.mine-attestation {
  margin: 0px 10px;
  background: white;
  padding: 15px 10px;
  border: 1px solid $input-border-color;
  display: flex;
  align-items: center;
}

.mine-loading{
  text-align: center;
  line-height: 20px;
  padding-top: 10px;
  color: $normal-color;
}

.mine-attestation-avatar {
  flex: none;
  width: 25px;
  height: 25px;
  background-image: url(../../assets/img/icon_attestation.png);
  background-size: 100% 100%;
}

.mine-attestation-content {
  flex: 1;
  padding: 0px 5px 0px 15px;
  line-height: 20px;
}

.mine-attestation-title {
  font-size: 15px;
  color: $normal-color;
}

.mine-attestation-detail {
  font-size: 13px;
  color: $normal-color-light;
}

.mine-attestation-icon {
  flex: none;
  font-size: 28px;
  color: $normal-color-light;
}
</style>
