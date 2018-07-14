<template>
  <page isListenerScroll="true" v-on:isScroll="listenerScroll" paddingBottom='120' class="pro-inner prod-inner" ref="pageCompontent">
    <!--产品宣传图片-->
    <img style="width:100%;" :src="imageUrl+imgProductNo+'/banner1.jpg'">

    <div class="tab prod-nav" id="nav-sticky" gutter>
      <div class="prod-bar" @click="checkedBar('prod-bar1')" :class="{'prod-bar-active' : prodBar == 'prod-bar1'}">产品介绍</div>
      <div class="prod-bar" @click="checkedBar('prod-bar2')" :class="{'prod-bar-active' : prodBar == 'prod-bar2'}">保障计划</div>
      <div class="prod-bar" @click="checkedBar('prod-bar3')" :class="{'prod-bar-active' : prodBar == 'prod-bar3'}">服务详情</div>
    </div>

    <!--产品解读-->
    <div>
      <div class="pro-bar" id="prod-bar1" style="margin-top:20px">
        <div class="pro-bar-param">产品解读</div>
      </div>
      <img class="pro-bar-img" v-for="(n,index) in particCount" :key="index" :src="imageUrl+imgProductNo+'/partic'+n+'.png'" width="100%">
    </div>

    <!--保障计划-->
    <div class="pro-bar" id="prod-bar2">
      <div class="pro-bar-param">保障计划</div>
    </div>
    <div class="base-insured" :class="{'base-insured-group' : product && product.groupList}">
      <!--组合产品显示产品-->
      <div class="insured-nav-group" gutter v-if="product && product.groupList">
        <div class="insured-bar-group" v-for="(groupItem,index) in product.groupList" :key="index" @click="changeProduct(groupItem)" :class="{'insured-bar-active-group' : productDetail.CProdNo == groupItem.CProdNo}">
          <div>{{groupItem.CNmeCnShort}}</div>
          <div class="insured-bar-ant-group money">保额{{groupItem.NAmt | moneyFilter}}元</div>
        </div>
      </div>
      <!--单个产品显示保额-->
      <div class="insured-nav" gutter v-if="product && !product.groupList">
        <div class="insured-bar" v-for="(insureCode,index) in product.productConfig.insureCode" :key="index" @click="changeInsure(insureCode.code)" :class="{'insured-bar-active' : insure.NAmt == insureCode.code}">{{insureCode.desc}}</div>
      </div>
      <div :class="{'insured-content-group' : product && product.groupList}">
        <div class="insured-content" v-for="(benefit,index) in benefitList" :key="index" @click="openPop('benefit')">
          <div class="insured-content-detail">{{benefit.CNmeCn.replace(/[\\]+/g, '\\')}}</div>
          <!--debug 后期去掉v-if判断-->
          <div class="insured-content-money money" v-if="benefit.CCvrgNo != '200300'">{{benefit.NAmt | moneyFilter}}元</div>
          <div class="insured-content-money" v-if="benefit.CCvrgNo == '200300'">免费赠送</div>
          <img src="../../assets/img/icon_dot.png" />
        </div>
        <div class="insured-bar insured-bar-premium" @click="openPop('premium')">保费试算</div>
      </div>
    </div>

    <!--条款说明-->
    <div class="pro-bar">
      <div class="pro-bar-param">条款说明</div>
    </div>
    <div class="clause-row" @click="go('insureNotes')">
      <span>投保须知</span>
      <img src="../../assets/img/icon_right.png" />
    </div>
    <div class="clause-row" @click="go('clauseList')">
      <span>产品条款</span>
      <img src="../../assets/img/icon_right.png" />
    </div>

    <!--理赔流程-->
    <div class="pro-bar" id="prod-bar3">
      <div class="pro-bar-param">理赔流程</div>
    </div>
    <div class="pro-textChunk">
      <div class="pro-textChunk-title-base pro-textChunk-title1">报案</div>
      <div class="pro-textChunk-detail">拨打24小时服务热线400-609-6868进行报案，我们会提醒您理赔应备材料及相关注意事项。</div>
      <div class="pro-textChunk-title-base pro-textChunk-title2">提交理赔申请</div>
      <div class="pro-textChunk-detail">请您准备齐全相关理赔材料后通过以下方式及时向我司递交理赔申请。
        <br/>（1）申请填写及材料准备：请登陆瑞华健康险官网www.***.com，下载《理赔申请书》并按要求填写及提供相关理赔材料。
        <br/>（2）提交理赔材料：索赔材料准备齐全后提交至我司。</div>
      <div class="pro-textChunk-title-base pro-textChunk-title3">理赔审核</div>
      <div class="pro-textChunk-detail">收到您的理赔申请材料后，我们将尽快根据保险合同客观、公正完成审核。审核完成后，我们会通过Email、短信等方式向您告知审核结果。</div>
      <div class="pro-textChunk-title-base pro-textChunk-title4">支付保险金</div>
      <div class="pro-textChunk-detail">确定案件属于保险责任，在结案或达成给付协议后，我们将在3个工作日（待确认）内支付保险金。</div>
    </div>

    <!--常见问题-->
    <div class="pro-bar">
      <div class="pro-bar-param">常见问题</div>
    </div>
    <div class="question-list">
      <div class="question-item">
        <div class="question-param" @click="changeQuestionStatus(0)">什么是等待期？有多少天？</div>
        <div class="question-value" v-show="questionList[0]">
          <div class="question-value-item">本险种首次投保或非连续投保有90天等待期，即自本合同生效日期起90日内，经医院初次确诊被保险人（孩子）罹患本合同所定义的任何一种或多种疾病，我们将退还已交保费，本合同终止。</div>
        </div>
      </div>
      <div class="question-item">
        <div class="question-param" @click="changeQuestionStatus(1)">电子保单是否具有合法法律效力？</div>
        <div class="question-value" v-show="questionList[1]">
          <div class="question-value-item">本险种首次投保或非连续投保有90天等待期，即自本合同生效日期起90日内，经医院初次确诊被保险人（孩子）罹患本合同所定义的任何一种或多种疾病，我们将退还已交保费，本合同终止。</div>
        </div>
      </div>
      <div class="question-item">
        <div class="question-param" @click="changeQuestionStatus(2)">如果发生保险事故，怎么样赔理？</div>
        <div class="question-value" v-show="questionList[2]">
          <div class="question-value-item">本险种首次投保或非连续投保有90天等待期，即自本合同生效日期起90日内，经医院初次确诊被保险人（孩子）罹患本合同所定义的任何一种或多种疾病，我们将退还已交保费，本合同终止。</div>
        </div>
      </div>
      <div class="question-item">
        <div class="question-param" @click="changeQuestionStatus(3)">投保人应为何人？</div>
        <div class="question-value" v-show="questionList[3]">
          <div class="question-value-item">本险种首次投保或非连续投保有90天等待期，即自本合同生效日期起90日内，经医院初次确诊被保险人（孩子）罹患本合同所定义的任何一种或多种疾病，我们将退还已交保费，本合同终止。</div>
        </div>
      </div>
      <div class="question-item">
        <div class="question-param" @click="changeQuestionStatus(4)">一年保险期满后，我需要重新投保吗？</div>
        <div class="question-value" v-show="questionList[4]">
          <div class="question-value-item">本险种首次投保或非连续投保有90天等待期，即自本合同生效日期起90日内，经医院初次确诊被保险人（孩子）罹患本合同所定义的任何一种或多种疾病，我们将退还已交保费，本合同终止。</div>
        </div>
      </div>
    </div>

    <!--责任免除-->
    <div class="pro-bar">
      <div class="pro-bar-param">责任免除</div>
    </div>
    <div class="duty-list">
      <div class="duty-item">
        <div class="duty-content">因下列情形之一导致被保险人初次发生重大疾病或轻症疾病的，我们不承担给付保险金的责任</div>
      </div>
      <div class="duty-item">
        <div class="duty-index">1、</div>
        <div class="duty-content">文案待定；</div>
      </div>
      <div class="duty-item">
        <div class="duty-index">2、</div>
        <div class="duty-content">被保险人故意自伤、故意犯罪或者抗拒依法采取的刑事强制措施；</div>
      </div>
      <div class="duty-item">
        <div class="duty-index">3、</div>
        <div class="duty-content">被保险人主动吸食或注射毒品；</div>
      </div>
      <div class="duty-item">
        <div class="duty-index">4、</div>
        <div class="duty-content">被保险人酒后驾驶、无合法有效驾驶证驾驶、或驾驶无有效行驶证的机动车；</div>
      </div>
      <div class="duty-item">
        <div class="duty-index">5、</div>
        <div class="duty-content">被保险人感染艾滋病病毒或患艾滋病；</div>
      </div>
      <div class="duty-item">
        <div class="duty-index">6、</div>
        <div class="duty-content">战争、军事冲突、暴乱或武装叛乱；</div>
      </div>
      <div class="duty-item">
        <div class="duty-index">7、</div>
        <div class="duty-content">核爆炸、核辐射或核污染；</div>
      </div>
      <div class="duty-item">
        <div class="duty-index">8、</div>
        <div class="duty-content">遗传性疾病、先天性畸形、变形或染色体异常；</div>
      </div>
    </div>

    <!--试算保费弹窗组件-->
    <div v-if="premiumPup" class="prod-pop"></div>
    <transition name="slide-up">
      <product-detail-pre v-if="premiumPup" :productConfig="product.productConfig" :insure.sync="insure" v-on:closePup="closePup()" v-on:premiumCount="premiumCount()"></product-detail-pre>
    </transition>

    <!--保障权益弹窗组件-->
    <div v-if="protectBenefit" class="prod-pop"></div>
    <transition name="slide-up">
      <product-detail-benefit style="z-index:999" v-if="protectBenefit" :benefitList="benefitList" v-on:closePup="closePup()"></product-detail-benefit>
    </transition>

    <transition name="slide-up">
      <div class="insure-footer">
        <a href="tel:400-609-6868">
          <div class="insure-footer-service">
            <img src="../../assets/img/icon_service.png">
            <span>客服</span>
          </div>
        </a>
        <div class="insure-footer-money money">￥
          <span>{{premium.base.NPrm | toFixedFilter}}</span>
        </div>
        <mu-raised-button class="insure-footer-sure" @click="submit()">{{premiumPup ? '确认' : '立即投保'}}</mu-raised-button>
      </div>
    </transition>
  </page>
</template>
<script>
import Vue from 'vue'
import productDetailPre from './ProductDetailPre'
import productDetailBenefit from './ProductDetailBenefit'
import store from '../../vuex/store'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import productData from '../../assets/data/productData'
require('swiper/dist/css/swiper.css')

export default {
  name: 'productDetail',
  components: {
    productDetailPre,
    productDetailBenefit,
    swiper,
    swiperSlide
  },
  data() {
    return {
      //常见问题控制
      questionList: [false, false, false, false, false],
      prodBar: 'prod-bar1', //锚点切换bar
      imgProductNo: null, //只用来显示图片的产品Id 注：组合产品切换，这里不做变动
      premiumPup: false, //保费试算弹窗
      protectBenefit: false, //保障权益弹窗
      benefitList: [],  //保障权益列表
      premium: { base: { nPrm: null } }, //保费
      productDetail: null, //订单列表传递过来的订单详情
      insure: {  //保费试算参数 注（这里数据需要缓存，所有不能放在productDetailPre里面）
        CProdNo: null, //保单号 (页面初始化的时候会设置)
        NAmt: null,  //保额
        TBirthday: null, //生日
        CSex: null, //性别
        CIsSoc: null, //是否有社保
        CInsuYear: null, //保险期限
        CFinTyp: null, //交费类型
        NPayTime: null, //交费年限
      },
      oldInsure: null, //改变之前的insure
      product: null, //产品配置
      imageUrl: globalConfig.imageUrl, //图片服务器URL
      particCount: 6, //产品详情图片展示数量
      notNextTick: true,
      hintList: [], //保费试算提示
    }
  },
  watch: {
    premiumPup(val) {
      if (val) {
        document.body.addEventListener('touchmove', this.noBodyScroll, false);
      } else {
        document.body.removeEventListener('touchmove', this.noBodyScroll, false);
      }
    },
    protectBenefit(val) {
      if (val) {
        document.body.addEventListener('touchmove', this.noBodyScroll, false);
      } else {
        document.body.removeEventListener('touchmove', this.noBodyScroll, false);
      }
    }
  },
  methods: {
    noBodyScroll(event) {
      console.log("冒泡")
      event.preventDefault();
    },
    //试算保费弹窗
    openPop(param) {
      if (param == 'premium') {
        this.premiumPup = true;
      } else if (param == 'benefit') {
        this.protectBenefit = true;
      }
    },
    //关闭试算保费弹窗
    closePup() {
      this.premiumPup = false;
      this.protectBenefit = false;
    },
    checkedBar(value) {
      document.body.scrollTop = parseInt(document.querySelector('#' + value).offsetTop) - 58;
      setTimeout(() => {
        this.prodBar = value;
      }, 20);
    },

    listenerScroll(bodyTop) {
      let prodBarList = ['prod-bar1', 'prod-bar2', 'prod-bar3']
      for (let i in prodBarList) {
        if (bodyTop > parseInt(document.querySelector('#' + prodBarList[i]).offsetTop) - 58) {
          this.prodBar = prodBarList[i];
        }
      }
    },

    //权益列表
    getBenefitList() {
      utils.http.post('RHCVRGRISK', { "CProdNo": this.productDetail.CProdNo }).then(req => {
        this.benefitList = req.data.data.cvrglist.sort(function(a, b) { return a['CCvrgNo'] - b['CCvrgNo'] });
        console.log(this.benefitList)
      })
    },

    //创建订单信息
    createPolicy() {
      let requestParam = {
        openId: utils.cache.get('wxConfig') ? utils.cache.get('wxConfig').openId : null, // 微信openId
        productNo: this.productDetail.CProdNo, // 产品No
        productName: this.productDetail.CNmeCn, // 产品名称
        paramObj: JSON.stringify(this.insure), //保费试算入参
        premium: this.premium.base.NPrm, // 保费
        calculateJson: JSON.stringify(this.premium),// 保费试算相关信息
        productDetail: JSON.stringify(this.productDetail),
      }
      //只有openId存在的时候才允许
      utils.http.post('ORDERGENERATE', requestParam).then(req => {
        console.log("成功")
        store.commit("PUTPOLICYINFO", { orderId: req.data, risk: requestParam, paramObj: this.insure });
        this.$router.push({ name: 'health' });
        console.log(req)
      }).catch(e => {
        console.log(e);
        if (e && e.isLogicError) {
          this.$router.push({ name: 'health' });
        }
      })
    },

    //保费试算
    premiumCount() {
      if (this.insure.TBirthday) {
        //保费试算
        utils.http.post('RHCALCULATION', this.insure).then(req => {
          console.log(req)
          if (!req.data.calPremium || !req.data.calPremium.base || req.data.calPremium.base.NPrm == 0) {
            //拿去错误信息的value
            for(let value of req.data.calPremium.errorMsg){
              for(let i in value){
                this.hintList.push(value[i])
              }
            }
            utils.ui.toast(this.hintList[0]);
            //回退
            this.insure = JSON.parse(JSON.stringify(this.oldInsure))
          } else {
            this.oldInsure = JSON.parse(JSON.stringify(this.insure));
            this.premium = req.data.calPremium;
          }
        }).catch((e) => {
          console.log(e)
          utils.ui.toast('保费试算失败');
        })
      }
    },
    //立即投保
    submit() {
      //如果没有点击保费试算，那么先调用保费试算
      if (!this.premiumPup) {
        this.protectBenefit = false;
        this.premiumPup = true;
      }
      else if (this.premiumPup && !this.insure.TBirthday) {
        utils.ui.toast('请选择出生日期');
      }
      else if (this.premium.base.NPrm.toString().indexOf('/') == -1 && this.premiumPup) {
        this.createPolicy();
      } else {
        utils.ui.toast(this.hintList[0]);
      }
    },
    //保额切换
    changeInsure(value) {
      this.insure.NAmt = value;
      this.premiumCount();
    },
    //产品切换
    changeProduct(value) {
      this.productDetail = value;
      this.initProductDetail();
    },


    //问题状态改变
    changeQuestionStatus(index) {
      Vue.set(this.questionList, index, !this.questionList[index]);
    },

    //下一步
    go(value) {
      this.$router.push({ name: value, params: { productId: this.productDetail.CProdNo } });
    },

    //获取产品配置
    getProductConfig() {
      utils.http.post('PRODUCTDETAIL', { CProdNo: this.productDetail.CProdNo }).then(req => {
        this.product = req.data;
        this.initProductConfig(this.product.productConfig)
        console.log(this.product)
      })
    },

    //获取产品详情
    getProductDetail() {
      utils.http.post('RHPRODUCTINFO', { CProdNo: this.$route.params.productId }).then(req => {
        console.log(req.data.prodInfo)
        this.productDetail = req.data.prodInfo;
        //默认保费为当前产品的最低保额
        this.premium.base.NPrm = this.productDetail.NMinPrm + '/起';
        //分享微信
        this.initShare();
        //设置title
        utils.wx.wxSetTitle(this.productDetail ? this.productDetail.CNmeCn : document.title);
        //获取保障权益
        this.getBenefitList();
        //获取产品定义
        this.getProductConfig();
      })
    },

    //订单配置
    initProductConfig(config) {
      this.insure.NAmt = config.insureCode ? config.insureCode[0].code : null;
      this.insure.CSex = config.sexCode ? config.sexCode[0].code : null;
      this.insure.CIsSoc = config.CIsSocCode ? config.CIsSocCode[0].code : null;
      this.insure.CInsuYear = config.insuredTimeCode ? config.insuredTimeCode[0].code : null;
      this.insure.CFinTyp = config.typeCode ? config.typeCode[0].code : null;
      this.insure.NPayTime = config.termCode ? config.termCode[0].code : null;
    },

    //初始化产品
    initProductDetail() {
      //初始化出入参
      this.premiumPup = false; //保费试算弹窗
      this.protectBenefit = false; //保障权益弹窗
      this.premium = { base: { nPrm: null } }; //保费
      this.insure = {  //保费试算参数 注（这里数据需要缓存，所有不能放在productDetailPre里面）
        CProdNo: null, //保单号 (页面初始化的时候会设置)
        NAmt: null,  //保额
        TBirthday: null, //生日
        CSex: null, //性别
        CIsSoc: null, //是否有社保
        CInsuYear: null, //保险期限
        CFinTyp: null, //交费类型
        NPayTime: null, //交费年限
      }
      this.oldInsure = this.insure; //改变之前的insure

      //重新设置标题 
      utils.wx.wxSetTitle(this.productDetail.CNmeCn);
      //默认保费为当前产品的最低保额
      this.premium.base.NPrm = this.productDetail.NMinPrm + '/起';
      //设置保费试算入参-保单号
      this.insure.CProdNo = this.productDetail.CProdNo;
      this.oldInsure = this.insure;

      store.commit('LOADING_DISABLED', true)

      //重新加载产品配置
      this.getProductConfig();

      //重新加载权益
      this.getBenefitList();
    },

    //初始化分享
    initShare(){
      //配置微信config
      utils.wx.wxConfig();
      let req = {
        title: this.productDetail.CNmeCn,
        link:globalConfig.wxUrl + 'dist/#/page/wxSharePage/' + this.productDetail.CProdNo,
        desc: this.productDetail.CProdDesc, // 分享描述
        imgUrl: this.productDetail.CImg, //分享图片
      }
      console.log(req)
      utils.wx.wxShareFriend(req).then((e)=>{
        console.log(e)
      });
    },
  },
  mounted() {
    //获取图片的产品id，不随组合产品变动
    this.imgProductNo = this.$route.params.productId;
    //设置保费试算入参-保单号
    this.insure.CProdNo = this.$route.params.productId;
    this.oldInsure = this.insure;
    this.getProductDetail();
  },
  activated() {
    //重新设置标题
    utils.wx.wxSetTitle(this.productDetail ? this.productDetail.CNmeCn : document.title);
  },
  //当离开的时候
  beforeRouteLeave(to, from, next) {
    this.premiumPup = false;
    this.protectBenefit = false;
    //关闭日期控件
    if (window.mobiscroll && mobiscroll.activeInstance) {
      mobiscroll.activeInstance.cancel()
    }
    document.body.removeEventListener('touchmove', this.noBodyScroll, false);
    //关闭滚动监听
    this.$refs.pageCompontent.closeEventListener();
    next();
  },
}

</script>
<style lang="scss" scoped>
@import 'src/assets/css/product';

.prod-inner {
  padding: 0px 0px 54px 0px;
  background: white;
}

.prod-bar {
  flex: 1;
}

.prod-bar-active {
  position: relative;
  color: #52C750;
}

.prod-bar-active::before {
  content: "";
  background: url(../../assets/img/icon_anchor.png);
  background-size: 100% 100%;
  width: 12px;
  height: 12px;
  position: absolute;
  left: calc(50% - 44px);
  top: 18px;
}

.prod-img-read {
  padding: 0px 10px;
}

.insure-footer {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 54px;
  display: flex;
  box-shadow: 0 -3px 10px 0 rgba(186, 190, 198, 0.30);
  background: white;
  transition: .2s all ease-out;
  z-index: 101;
}

.insure-footer-service {
  flex: none;
  width: 66px;
  padding: 8px 10px 0px 20px;
  color: $normal-color;
  font-size: 12px;
  border-right: 1px solid $input-border-color;
}

.insure-footer-service img {
  width: 25px;
  height: 25px;
}

.insure-footer-service span {
  position: relative;
  top: -5px;
}

.insure-footer-money {
  flex: 1;
  text-align: right;
  padding: 0px 25px 0px 5px;
  line-height: 54px;
  color: $price-color;
  font-size: 16px;
}

.insure-footer-money span {
  font-size: 20px;
}

.insure-footer-sure {
  flex: none !important;
  width: 130px;
  height: 100%;
  border-left: 1px solid $input-border-color;
  background: -webkit-linear-gradient(-135deg, $second-button-color-end, $second-button-color-start);
  background: linear-gradient(-135deg, $second-button-color-end, $second-button-color-start);
  font-size: 17px;
  line-height: 54px;
  text-align: center;
  color: white;
  border-radius: 0px !important;
}

.duty-list{
  padding: 0px 16px;
}
.duty-item{
  display: flex;
  line-height: 24px;
  font-size: 13px;
  color: $normal-color-light;
}
.duty-index{
  flex: none;
  width: 20px;
}
.duty-content{
  flex: 1;
}
</style>

