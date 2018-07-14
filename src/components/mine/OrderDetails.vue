<template>
  <page class="no-padding mine-detail-inner" paddingBottom='110' v-if="orderDetail">
    <!--只有06待支付的才有倒计时-->
    <div class="order-countdown" v-if="orderDetail.COrderStatus == '06'">请在
      <CountTimes v-on:endCountTimes="endCountTimes()"></CountTimes>内完成支付，否则订单将会取消</div>
    <div class="order-inner">
      <div class="order-title">{{orderDetail.infoList[0].base.CProdNme}}</div>
      <div class="order-price money">保费：￥{{orderDetail.NTotalAmt | toFixedFilter}}</div>

      <!--投保人信息-->
      <div class="order-item">
        <div class="order-item-name">投保人信息</div>
        <div class="order-item-detail">
          <div class="order-item-param">姓名</div>
          <div class="order-item-value">{{orderDetail.infoList[0].applicant.CAppNme}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">证件类型</div>
          <div class="order-item-value">{{orderDetail.infoList[0].applicant.CCertfCls | commonFilter('certCode')}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">证件号码</div>
          <div class="order-item-value money">{{orderDetail.infoList[0].applicant.CCertfCde}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">电话</div>
          <div class="order-item-value money">{{orderDetail.infoList[0].applicant.CMobile}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">电子邮箱</div>
          <div class="order-item-value money">{{orderDetail.infoList[0].applicant.CEmail}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">常住地</div>
          <div class="order-item-value more-line-super">
            <div class="more-line money">{{orderDetail.infoList[0].applicant.CCounty | addressFilter}}，{{orderDetail.infoList[0].applicant.CClntAddr}}</div>
          </div>
        </div>
      </div>

      <!--被保人信息-->
      <div class="order-item" v-for="(insured,index) in orderDetail.infoList[0].insuredList" :key="index">
        <div class="order-item-name">被保人信息</div>
        <div class="order-item-detail">
          <div class="order-item-param">与投保人关系</div>
          <div class="order-item-value">{{insured.CApplRel | commonFilter('relationCode')}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">姓名</div>
          <div class="order-item-value">{{insured.CInsuredNme}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">证件类型</div>
          <div class="order-item-value">{{insured.CCertfCls | commonFilter('certCode')}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">证件号码</div>
          <div class="order-item-value money">{{insured.CCertfCde}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">电话</div>
          <div class="order-item-value money">{{insured.CMobile}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">电子邮箱</div>
          <div class="order-item-value money">{{insured.CEmail}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">常住地</div>
          <div class="order-item-value more-line-super">
            <div class="more-line money">{{insured.CCounty | addressFilter}}，{{insured.CClntAddr}}</div>
          </div>
        </div>
      </div>

      <!--订单明细-->
      <div class="order-item">
        <div class="order-item-name">保障内容</div>
        <!-- <div class="order-item-detail">
          <div class="order-item-param">受益人</div>
          <div class="order-item-value">法定受益人</div>
        </div> -->
        <div class="order-item-detail">
          <div class="order-item-param" style="width:70px">保险期限</div>
          <div style="line-height:20px" class="order-item-value money" >
						<!-- v-html="$options.filters.insuYearFilter(orderDetail.infoList[0].base.CInsuYear,orderDetail.infoList[0].base.TCrtTm)" -->
						自{{orderDetail.infoList[0].base.TInsrncBgnTm | timeFilter}}起<br/>
						至{{orderDetail.infoList[0].base.TInsrncEndTm | timeFilter(1)}}止
					</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">缴费类型</div>
          <div class="order-item-value">{{orderDetail.infoList[0].base.CFinTyp | commonFilter('typeCode')}}{{orderDetail.infoList[0].base.NPayTime ? ('，'+orderDetail.infoList[0].base.NPayTime+'年') : ''}}</div>
        </div>
        <!-- <div class="order-item-detail">
          <div class="order-item-param">特别约定</div>
          <div class="order-item-value">
            <mu-icon value="keyboard_arrow_right"></mu-icon>
          </div>
        </div> -->
        <div class="order-item-detail" @click="go('clauseList')">
          <div class="order-item-param">产品条款</div>
          <img src="../../assets/img/icon_right.png" />
        </div>
      </div>
    </div>
    <div class="order-detail">
      <div class="money">创建时间：{{orderDetail.infoList[0].base.TCrtTm}}</div>
      <div class="money">订单编号：{{orderDetail.infoList[0].base.COrderCde}}</div>
    </div>
    <div class="order-hint money">尊敬的客户若对订单信息有异议，请尽快联系本公司。全国统一客服电话（400-609-6868）</div>
    
    <!--06待支付,分享没有按钮-->
    <mu-raised-button v-if="orderDetail.COrderStatus == '06' && !isShare" @click="continueOper('policyPay')" class="button-second order-button" label="去支付" />

    <!--03继续投保，分享没有按钮-->
    <mu-raised-button v-if="orderDetail.COrderStatus == '03' && !isShare" @click="continueOper('health')" class="button-second order-button order-but-continue" label="继续投保" />
  </page>
</template>

<script>
import CodeData from '../../assets/data/CodeData'
import CountTimes from '../common/CountTimes'

export default {
  name:'orderDetail',
  data() {
    return {
      orderDetail:null, //订单详情
      beforeScrollTop: null, //保存当次滚动高度
      id: null, //接收到传递过来的id
      isShare:null, //接收到传递过来的是否微信分享
    }
  },
  components:{
    CountTimes
  },
  methods: {
    //订单详情
    getOrderDetail(){
      let requestParam = {
        COrderCde: this.id,
      }

      utils.http.post('RHORDERDETAILS', requestParam).then(req => {
        // console.log('订单详情',JSON.stringify(req.data.orderInfo.order))
        this.orderDetail = req.data.orderInfo.order;
      }).catch(()=>{
        utils.ui.toast('获取订单详情失败');
      })
    },

    //倒计时结束
    endCountTimes(){
      utils.ui.dialog('支付超时', require('../../assets/img/common/icon_warning.png'), ['确定'], index => {
        this.go('myOrderList');
      })
    },

    //跳转其他页面
    go(value){
      this.$router.push({ name: value, params: {productId: this.orderDetail.CProdNo}});
    },

    //去支付、继续投保
    continueOper(routerValue) {
      let req = {
        openId: utils.cache.get('wxConfig').openId,
        orderId: this.orderDetail.infoList[0].base.COrderCde,
      }

      console.log(JSON.stringify(req))
      //获取订单信息
      utils.http.post('ORDERUNFINISHEDINFO', req).then(response => {
        console.log(response.data)
        //后台返回的是一个obj，这里需要的是一个string，手动转换一下
        // response.data.risk.calculateJson = JSON.stringify(response.data.risk.calculateJson);
        // response.data.risk.paramObj = JSON.stringify(response.data.risk.paramObj);
        utils.cache.set("PUTPOLICYINFO", response.data);
        this.$router.push({name:routerValue});
      }).catch(error => {
        if(error.isLogicError){
           utils.ui.alert(error.errorMessage,e=>{})
        }
      })
    },

    //统一入口,正常进入，分享进入
    enter(){
      //配置微信config
      utils.wx.wxConfig();
      this.isShare = this.$route.params.isShare == 'true' ? true : false;
      // 是微信分享过来的
      if(this.isShare){
        this.id = Base64.decode(this.$route.params.orderCode);
        //不允许再次分享了
        utils.wx.wxHideMenuList();
      }else{
        this.id = this.$route.params.orderCode;
      }
      this.getOrderDetail();
      this.wxShareFriend();
    },


    //设置分享到朋友圈的内容
    wxShareFriend(){
      let req = {
        title:'订单详情',
        link:globalConfig.wxUrl + 'dist/#/page/orderDetails/' + Base64.encode(this.id) +'/true',
      }
      console.log(req)
      utils.wx.wxShareFriend(req).then((e)=>{
        console.log(e)
      });
    }
  },
  mounted(){
    this.enter();
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped >
@import 'src/assets/css/mine';

.order-countdown {
  font-size: 12px;
  color: $normal-color;
  padding: 11px 24px;
  background: #FFF2F2;
  line-height: 30px;
}

.order-but-continue{
  background-image: linear-gradient(135deg, #63C227 0%, #17AE5D 100%);
}
</style>
