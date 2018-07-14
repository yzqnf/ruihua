<template>
  <page class="no-padding">
    <div class="nav mine-nav">
      <mu-tabs :value="activeTab" @change="handleTabChange">
        <mu-tab value="tab1" title="待完成" />
        <mu-tab value="tab2" title="已完成" />
        <mu-tab value="tab3" title="已取消" />
      </mu-tabs>
    </div>
    <div class="mine-inner" v-if="orderList && orderList.length > 0">
      <div class="mine-card-list">
        <!--去支付-->
        <div class="mine-card-item" v-for="(order,index) in orderList" :key="index" @click="go(order)">
          <div class="mine-card-header">
            <div class="mine-header-title money">订单号：{{order.COrderCde}}</div>
            <div class="mine-header-operate">
              <span>{{order.COrderStatus | commonFilter('orderCode')}}</span>
              <mu-icon value="keyboard_arrow_right"></mu-icon>
            </div>
          </div>
          <div class="mine-card-content">
            <div class="mine-card-title">{{order.CNmeCn}}</div>
            <div class="mine-card-flag">
              <span class="insure" v-if="order.CType == '01'">保险</span>
              <span class="health" v-if="order.CType == '02'">健康</span>
            </div>
            <div class="mine-card-detail">
              <!-- {{order}} -->
              <div>投保人：{{order.CAppNme}}</div>
              <div>被保人：{{order.CInsuredNme}}</div>
              <div class="money">保险期限：{{order.CInsuYear | commonFilter('insuredTimeCode')}}</div>
              <div class="money">保障计划：{{order.NAmt | moneyFilter}}元</div>
              <div class="money">保费：{{order.NTotalAmt | toFixedFilter}}元</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mine-loading" v-if="loading && (!totalPages || totalPages > requestParam.currentPage)">加载中...</div>
    <!-- <mu-infinite-scroll v-show="!totalPages || totalPages > requestParam.currentPage" :scroller="scroller" :loading="loading" @load="loadMore"/> -->
    <div class="list-data-no" v-if="orderList && orderList.length == 0">
      <img src="../../assets/img/nodata.png" width="100%">
      <span>暂无数据</span>
    </div>
  </page>
</template>

<script>
export default {
  name: 'myOrderList',
  data() {
    return {
      activeTab: 'tab2',
      orderList: [],
      loading: false,
      // scroller: null,
      totalPages: null,
      scrollLock: false,
      requestParam : {
        ststList: [],//要查询的订单状态
        COprCde: utils.cache.get('user').CUserId,//操作人
        currentPage:1,
        pageSize:5,
      },
    }
  },
  methods: {
    handleTabChange(val) {
      this.activeTab = val;
      this.clearData();
      this.getOrderList()
    },
    go(order) {
      this.$router.push({name:'orderDetails',params:{orderCode:order.COrderCde,isShare:false}});
    },
    //获取订单列表
    getOrderList() {
      this.loading = true
      this.requestParam.ststList = this.activeTab == 'tab1' ? ['03', '06'] : (this.activeTab == 'tab2' ? ['01', '08'] : ['02'])
      utils.http.post('MYORDERLIST', this.requestParam).then(req => {
        this.orderList = req.data.resultList ? this.orderList.concat(req.data.resultList) : this.orderList;
        this.totalPages = req.data.totalPages;
        this.loading = false;
      }).catch(e => {
        utils.ui.toast('网络异常');
      })
    },

    //清空数据
    clearData(){
      this.requestParam.currentPage = 1;
      this.totalPages = null;
      this.orderList = [];
    },

    //加载更多
    loadMore(){
      this.requestParam.currentPage++;
      //犹豫下拉加载会多次触发
      if(this.totalPages >= this.requestParam.currentPage){
        this.getOrderList();
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
    this.getOrderList();
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
@import 'src/assets/css/mine';

.mine-loading{
  text-align: center;
  line-height: 20px;
  padding-top: 10px;
  color: $normal-color;
}
</style>
