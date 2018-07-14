<template>
  <page class="no-padding mine-detail-inner" v-if="insureDetail">
    <div class="order-header">
      <div class="order-header-title">
        保单号：
        <span>{{insureDetail.base.CPlyNo}}</span>
        <!-- <div class="order-header-copy">复制</div> -->
      </div>
      <div>根据投保人申请，本公司承担下列保险责任，特此签发本保险单为据</div>
    </div>
    <div class="order-inner">
      <div class="order-title">{{insureDetail.base.CProdNme}}</div>
      <div class="order-price money">保费：￥{{insureDetail.base.NPrm | toFixedFilter}}</div>

      <!--投保人信息-->
      <div class="order-item">
        <div class="order-item-name">投保人信息</div>
        <div class="order-item-detail">
          <div class="order-item-param">姓名</div>
          <div class="order-item-value">{{insureDetail.applicant.CAppNme}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">证件类型</div>
          <div class="order-item-value">{{insureDetail.applicant.CCertfCls | commonFilter('certCode')}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">证件号码</div>
          <div class="order-item-value money">{{insureDetail.applicant.CCertfCde}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">电话</div>
          <div class="order-item-value money">{{insureDetail.applicant.CMobile}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">电子邮箱</div>
          <div class="order-item-value money">{{insureDetail.applicant.CEmail}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">常住地</div>
          <div class="order-item-value more-line-super">
            <div class="more-line">{{insureDetail.applicant.CCounty | addressFilter}}，{{insureDetail.applicant.CClntAddr}}</div>
          </div>
        </div>
      </div>

      <!--被保人信息-->
      <div class="order-item" v-for="(insured,index) in insureDetail.insuredList" :key="index">
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
            <div class="more-line">{{insured.CCounty | addressFilter}}，{{insured.CClntAddr}}</div>
          </div>
        </div>
      </div>

      <!--保单明细-->
      <div class="order-item">
        <div class="order-item-name">保障内容</div>
        <!-- <div class="order-item-detail">
          <div class="order-item-param">受益人</div>
          <div class="order-item-value">法定受益人</div>
        </div> -->
        <div class="order-item-detail">
          <div class="order-item-param">保障权益</div>
          <div class="order-item-value">
            <div class="order-item-value-row" v-for="(risk,index) in insureDetail.riskList" :key="index">
              <div class="order-item-param-title">{{risk.CRiskNme.replace(/[\\]+/g, '\\')}}</div>
              <div class="order-item-value-money money" v-if="risk.CCvrgNo != '200300'">{{risk.NAmt | moneyFilter}}元</div>
              <div class="order-item-value-money" v-if="risk.CCvrgNo == '200300'">免费赠送</div>
            </div>
          </div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param" style="width:70px">保险期限</div>
					<!--  v-html="$options.filters.insuYearFilter(insureDetail.base.CInsuYear,insureDetail.base.TCrtTm)" -->
          <div style="line-height:20px" class="order-item-value money">
						自{{insureDetail.base.TInsrncBgnTm | timeFilter}}起<br/>
						至{{insureDetail.base.TInsrncEndTm | timeFilter(1)}}止
					</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">缴费类型</div>
          <div class="order-item-value">{{insureDetail.base.CFinTyp | commonFilter('typeCode')}}{{insureDetail.base.NPayTime ? ('，'+insureDetail.base.NPayTime+'年') : ''}}</div>
        </div>
        <!-- <div class="order-item-detail">
          <div class="order-item-param">特别约定</div>
          <div class="order-item-value">
            <mu-icon value="keyboard_arrow_right"></mu-icon>
          </div>
        </div> -->
        <div class="order-item-detail" @click="go('clauseList')">
          <div class="order-item-param">产品条款</div>
          <div class="order-item-value">
            <mu-icon value="keyboard_arrow_right"></mu-icon>
          </div>
        </div>
      </div>
    </div>
    <div class="order-detail">
      <div class="money">创建时间：{{insureDetail.base.TCrtTm}}</div>
      <div class="money">订单编号：{{insureDetail.base.COrderCde}}</div>
    </div>
    <div class="order-hint money">尊敬的客户若对保单信息有异议，请尽快联系本公司。全国统一客服电话（400-609-6868）</div>
    <mu-raised-button class="insure-mobile order-button money" v-if="returnVisitSts == '1' && !isShare" @click="go('returnVisit')" label="在线回访"/>
    <a href="tel:400-609-6868" v-if="returnVisitSts != '1'">
      <mu-raised-button class="insure-mobile order-button" label="客服热线 400-609-6868"/>
    </a>
  </page>
</template>

<script>
export default {
  name:'insuranceDetails',
  data() {
    return {
    	returnVisitSts:"",
      insureDetail:null, //保单详情
      id: null, //接收到传递过来的id
      isShare:null, //接收到传递过来的是否微信分享
    }
  },
  methods: {
    //保单详情
    getInsureDetail(){
      let requestParam = {
        CPlyNo: this.id,
      }

      utils.http.post('RHPOLICYDETAILS', requestParam).then(req => {
        this.insureDetail = req.data.plyDetail;
        console.log(this.insureDetail)
      })
    },

    //跳转其他页面
    go(value){
      if (value=='returnVisit') {
      	//设置详情进入回访标识
        utils.cache.set('detailToVisit','true')
        console.log(this.insureDetail.base.CPlyNo)
        this.$router.push({ name: value, params: {cPlyNo: this.insureDetail.base.CPlyNo}});
      }else{
        this.$router.push({ name: value, params: {productId: this.insureDetail.base.CProdNo}});  
      }
    },

    //统一入口,正常进入，分享进入
    enter(){
      //配置微信config
      utils.wx.wxConfig();
      this.isShare = this.$route.params.isShare == 'true' ? true : false;
      // 是微信分享过来的
      if(this.isShare){
        this.id = Base64.decode(this.$route.params.insuranceCode);
        //不允许再次分享了
        utils.wx.wxHideMenuList();
      }else{
        this.id = this.$route.params.insuranceCode;
      }
      this.getInsureDetail();
      this.getVisitSts();
      this.wxShareFriend();
    },

    //设置分享到朋友圈的内容
    wxShareFriend(){
      let req = {
        title:'保单详情',
        link:globalConfig.wxUrl + 'dist/#/page/insuranceDetails/' + Base64.encode(this.id) +'/true',
      }
      console.log(req)
      utils.wx.wxShareFriend(req).then((e)=>{
        console.log(e)
      });
    },

    //访问
    getVisitSts(){
      utils.http.post('RETURNVISIT', {returnInfo:[{CPlyNo: this.id}]}).then(req => {
        this.returnVisitSts = req.data.info     
      }).catch(e => {
        console.log(e)
        utils.ui.toast('网络异常')
      })
    }
  },
  mounted(){
    this.enter();
  },
  activated() {
    this.getVisitSts();
  },
  beforeRouteLeave(to, from, next) {
    next(to.name !== "questionare")
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped >
@import 'src/assets/css/mine';
.order-header {
  padding: 15px 20px;
  background: #F2F4F5;
}

.order-header{
  font-size: 13px;
  color: $normal-color;
  line-height: 21px;
}

.order-header-title {
  font-size: 13px;
  margin-bottom: 10px;
  color: $normal-color;
  line-height: 21px;
  position: relative;
}

.order-header-copy {
  display: inline-block;
  border-radius: 2px;
  border: 1px solid #BABEC6;
  padding: 0px 3px;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  color: $normal-color-light;
  position: absolute;
  right: 0px;
  top: 0px;
}


.insure-mobile {
  width: 100%;
  line-height: 44px;
  font-size: 17px;
  border: none;
  border-radius: 2px;
  background: white;
  font-family: PingFangSC-Regular;
  color: #52C750;
  letter-spacing: 0;
}
</style>
