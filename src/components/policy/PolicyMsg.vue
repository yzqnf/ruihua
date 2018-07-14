<template>
  <!-- <page :hideFooter="'false'" wBg="true"> -->
  <div class="has_end page_policy_msg">
    <section>
      <div class="pd-lg box-bg">
        为了保障您的权益，请填写真实有效的信息。您填写的内容仅供投保使用，对于您的信息我们会严格保密。
      </div>
      <br>
      <div class="group-title">为谁投保</div>
      <div class="mg-lg" style="text-align:left;">
        <div class="show_item">{{insured.relationship|commonFilter('relationCode')}}</div>
      </div>
      <br>
      <section>
        <!-- 本人 -->
        <div class="group-title">{{insured.relationship== constSet.oneself?'您的信息':"投保人信息"}}</div>
        <PersonMsg :personInfo="holder"></PersonMsg>
      </section>
      <br/>
      <section v-show="insured.relationship!=constSet.oneself">
        <div class="group-title">被保人信息</div>
        <PersonMsg :personInfo="insured"></PersonMsg>
      </section>
    </section>
    <!-- 受益人信息 -->
    <!-- <section>
          <div class="group-title">受益人</div>
          <section class="">
            <div class="mg-lg" style="text-align:left;">
              <div class="show_item">法定受益人
              </div>
            </div>
          </section>
        </section> -->
    <!-- <br/> -->
    <!-- 保障内容 -->
    <div class="group-title">保障内容</div>
    <section class="section_content border_bottom_style mg-lg">
      <section class="order ">
        <div class="order_item_h font-normal">保障权益</div>
        <div class="order_item_b font-normal-light">
          <section>
            <div class="order_left">
              保障计划
            </div>
            <div class="order_right">
              {{calculateJson.cvrgList[0].NAmt | moneyFilter}}元  
            </div>
            <div class="border_bottom_style"></div>
            <div style="padding:16px 0px 0px 0px">
              <section style="clear:both" v-for="(item,index) in calculateJson.cvrgList" :key="index">
                <div class="order_left">
                  {{item.CCustCvrgNme}}
                </div>
                <div class="order_right" v-if="item.CCvrgNo !== '200300'">
                  {{item.NAmt | moneyFilter}}元
                </div>
                <div class="order_right" v-else>
                  免费赠送
                </div>
              </section>
              <div style="clear:both"></div>
            </div>
          </section>
        </div>
      </section>
    </section>
    <section class="">
      <div class="mg-lg" style="text-align:left;">
        <div class="show_item">保险期限
          <span style="overflow:scroll;line-height:20px">{{personInfo.paramObj.CInsuYear |commonFilter('insuredTimeCode')}}</span>
        </div>
      </div>
      <div class="mg-lg" style="text-align:left;">
        <div class="show_item">缴费类型
          <span>{{personInfo.paramObj.CFinTyp | commonFilter('typeCode')}}
            <span v-if="personInfo.paramObj.CFinTyp !=0" class="order_right">
              {{personInfo.paramObj.NPayTime}}年
            </span>
          </span>
        </div>
      </div>
    </section>
    </section>
    <section>
      <!-- <div class="pd-lg box-bg box-bg-black">
            <mu-checkbox v-model="isChecked" label="" class="demo-checkbox" />
            <p>我已阅读
              <a @click="showModal('bottom','1')">保险条款</a>、
              <a @click="showModal('bottom','2')">产品说明书</a>、
              <a @click="showModal('bottom','3')">投保须知</a>和
              <a @click="showModal('bottom','4')">投保提示书</a>，并了解本产品的特点。
            </p>
          </div> -->
      <!-- <ProductMsg title="填写投被保人信息" :checkObj="checkObj"></ProductMsg> -->
      <section class="he_footer footer_fixd">
        <div class="he_footer_item font-primary font-lg">
          <font style="font-size: 1.3rem;color: #556074;">应付</font>
          <font style="font-size: 1.6rem;color: #FF7431;">
            <font style="font-size:10px">￥</font>{{personInfo.premium|toFixedFilter}}</font>
        </div>
        <mu-raised-button style="color:white!important" :disabled="!checkObj.isChecked" @click="pay()" class="he_footer_item button-second next_btn" label="确认支付" />
      </section>
    </section>
    </mu-content-block>
    <!-- <ContentTemplet :openModal="openModal" :type="'1'"></ContentTemplet> -->
  </div>
  <!-- </page> -->
</template>

<script>
import PersonMsgShow from './components/PersonMsgShow'
import ProductMsg from './components/ProductMsg'
export default {
  name: 'policyPay',
  components: {
    ContentTemplet: r => { require.ensure([], () => r(require('../../components/common/ContentTemplate')), 'ContentTemplate') },
    'PersonMsg': PersonMsgShow,
    ProductMsg
  },
  data() {
    return {
			personInfo: utils.cache.get("PUTPOLICYINFO"),
      holder: utils.cache.get("PUTPOLICYINFO").holder,
      insured: utils.cache.get("PUTPOLICYINFO").insureds[0],
      calculateJson: null,
      //勾选,
      checkObj: {
        isChecked: true,
        openModal: false
      },
    }
  },
  methods: {
    //确认支付接口
    pay() {
      // console.log(JSON.stringify(this.personInfo))
      let req = { "COrderCde": this.personInfo.orderId };
      console.log(this.personInfo);
      this.personInfo.optStatus = "2";
      utils.http.post('RHORDERLANDING', this.personInfo).then(response => {
        this.$store.commit("PUTPOLICYINFO", this.personInfo);
        this.$router.push("policyPay");
        // this.$router.push('policyMsg');
      }).catch(error => {
        utils.ui.toast('生成订单失败')
      })
    },
    //显示协议对象
    showModal(position) {
      this.openModal = true;
    }
  },
  created() {
    this.calculateJson = JSON.parse(this.personInfo.risk.calculateJson);
    this.calculateJson.base.tCrtTm = new Date().getTime();
    this.personInfo.risk.calculateJson = JSON.stringify(this.calculateJson);
    console.log(utils.cache.get("PUTPOLICYINFO"))
  },
  //监听页面离开事件
  beforeRouteLeave(to, from, next) {
    next(!this.openModal)
    if (this.openModal) {
      this.openModal = false;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.page_policy_msg {
  .border_bottom_style {
    border-bottom: 1px solid #E9ECEE;
    min-height: 10px;
    clear: both;
  }
  .mg_border_b {
    border-bottom: 1px solid gainsboro;
  }
  .field label:first-child {
    font-size: 1.3rem!important;
  }
  .mu-content-block {
    min-height: 480px;
  }
  .button-sm-choosed {
    background: rgb(82, 199, 80);
    color: white;
  }
  .field img {
    height: 1.2rem;
    margin-top: 15px;
    position: absolute;
    z-index: 2;
    right: 14px;
    background: rgb(255, 255, 255);
  }
  .mu-dropDown-menu-text-overflow {
    font-size: 1.3rem;
  }
  .mg-lg {
    margin: 10px 16px;
    .show_item {
      color: #394043;
      font-size: 1.3rem;
      border-bottom: 1px solid rgb(233, 236, 238);
      height: 44px;
      line-height: 34px;
      span {
        width: 60%;
        color: #556074;
        float: right;
        text-align: right;
        max-height: 40px; // overflow: scroll;
        overflow: hidden;
      }
      .text_lang {
        width: 60%;
        line-height: 18px;
      }
    }
  }
}
</style>
