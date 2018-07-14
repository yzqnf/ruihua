
<template>
  <div class="page_policy_pay">
    <mu-list-item class="pay-padding">
      <section @click="show" class="risk" style="padding:8px">
        <span class="risk_name">{{personInfo.risk.productName}}</span>
        <span class="risk_wait">等待支付
          <br>
          <!-- <font style="color:#E34545">{{'1000'| dateFilter}}</font> -->
          <DjTime :date="new Date()" @endCountTimes="timeOver"></DjTime>
        </span>
        <div class="risk_content">
          <br>
          <span>
            投保人：{{personInfo.holder.name}}
            <br> 被保人：{{personInfo.insureds[0].name}}
            <br> 保险期限：{{personInfo.paramObj.CInsuYear |commonFilter('insuredTimeCode')}}
            <br> 保障计划：{{JSON.parse(personInfo.risk.calculateJson).cvrgList[0].NAmt | moneyFilter}}元
          </span>
          <OrderInfo @konw="know" :policyData="personInfo" :show="showInfo" class="risk_wait"></OrderInfo>
          <!-- <img src="../../assets/img/icon_dot.png"  /> -->
        </div>
      </section>
    </mu-list-item>
    <br>
    <div class="group-title">付款方式</div>
    <section class="pay-padding">
      <!-- <label>
                          <div class="mg-lg" style="text-align:left;">
                            <div class="show_item">
                              <img src="../../assets/img/icon_wx.png" />
                              <span>微信支付</span>
                              <mu-radio name="group" v-model="payModel.payType" nativeValue='0' class="demo-checkbox" uncheckIcon="check_box_outline_blank" checkedIcon="check_box" />
                            </div>
                          </div>
                        </label> -->
      <label>
        <div class="mg-lg" style="text-align:left;">
          <div class="show_item">
            <img src="../../assets/img/icon_yinlian.png" />
            <span>银行卡代扣</span>
            <mu-radio name="group" v-model="payModel.payType" nativeValue='1' class="demo-checkbox" uncheckIcon="check_box_outline_blank" checkedIcon="check_box" />
          </div>
        </div>
      </label>
    </section>
    <transition name="slide-left">
      <section class="pay-padding" v-show="payModel.payType=='1'" style="transition: all .25s linear;padding-top:0px">
        <div class="field">
          <label>姓名</label>
          <span class="field_span">
            {{personInfo.holder.name}}
          </span>
          <!-- <mu-text-field hintText="该银行卡是你的续费扣款账号" fullWidth /> -->
        </div>
        <div class="field has-img">
          <label>选择银行卡</label>
          <mu-select-field v-model="payModel.bankType" hintText="请选中银行" iconClass="cloud_download">
            <mu-menu-item v-for="item in bankCode" :key="item.code" :value="item.code" :title="item.desc" />
          </mu-select-field>
          <img src="../../assets/img/icon_right.png" />
        </div>
        <div class="field">
          <label>填写卡号</label>
          <ValidatorInput type="tel" :form.sync="validateObj.bankCode" :validator="{rules:['require:请输入正确的银行卡号','bank:请输入正确的银行卡号']}" v-model="payModel.bankCode" hintText="输入正确的卡号" fullWidth/>
          <!-- <mu-text-field hintText="该银行卡是你的续费扣款账号" fullWidth /> -->
        </div>
        <section class="field has_yzm">
          <label>验证码</label>
          <ValidatorInput type="tel" :form.sync="validateObj.verifyCode" :validator="{rules:['require:请输入6位验证码',{reg:/^\S{6,6}$/,msg:'请输入6位验证码'}]}" v-model="payModel.verifyCode" hintText="请输入6位验证码" />
          <button :disabled="btn_disabled" @click="getYzCode()" style="margin-top:14px" class="yzm font-primary">{{btn_yzm}}</button>
        </section>
        <section style="margin:0px 0px 120px 0px;">
          <mu-checkbox style="font-size:1.2rem" v-model="checked" label="我已阅读并接受" class="demo-checkbox" />
          <!-- iconClass="" uncheckIcon="check_box_outline_blank" checkedIcon="check_box"  -->
          <AuthBook :option="authOpt"></AuthBook>
        </section>
      </section>

    </transition>
    </mu-content-block>
    <section class="he_footer footer_fixd">
      <div class="he_footer_item font-primary font-lg">
        <font style="font-size: 1.3rem;color: #556074;">应付</font>
        <font style="font-size: 1.6rem;color: #FF7431;">
          <font style="font-size:10px">￥</font>{{personInfo.premium | toFixedFilter}}</font>
      </div>
      <mu-raised-button :disabled="payModel.payType === '0'?false:payModel.bankType==''||!validateObj.verifyCode.status || !validateObj.bankCode.status||!checked" style="color:white!important" @click="pay()" class="he_footer_item button-second next_btn" label="确认支付" />
    </section>
  </div>
</template>

<script>
import DjTime from "../common/CountTimes";
import CodeData from "../../assets/data/CodeData.js";
import AuthBook from "./components/TransferAuthorization";
export default {
  name: "policyPay",
  components: {
    OrderInfo: r => {
      require.ensure(
        [],
        () => r(require("./components/OrderInfo")),
        "orderInfo"
      );
    },
    DjTime,
    AuthBook
  },
  data() {
    return {
      payTime: 6000,
      authOpt: {
        title: "确认订单",
        showPop: false
      },
      showInfo: false,
      personInfo: utils.cache.get("PUTPOLICYINFO"),
      btn_yzm: "获取验证码",
      time: 60,
      checked: false,
      btn_disabled: false,
      bankCode: [],
      payModel: {
        payType: "1", //支付方式0，微信，1银联
        bankType: "", //银行类型
        bankCode: "", //银行卡号
        verifyCode: "", //验证码
        payMoney: "" //支付金额
      },
      validateObj: {
        bankCode: {
          status: false
        }, //银行卡号
        verifyCode: {
          status: false
        } //验证码
      }
    };
  },
  methods: {
    //支付接口
    pay() {
      console.log(utils.cache.get("PUTPOLICYINFO"));
      let req = utils.cache.get("PUTPOLICYINFO");
      req.pay = this.payModel;
      req.pay.phone = this.personInfo.holder.phone;
      utils.http
        .post("RHPOLICYLANDING", req)
        .then(res => {
					console.log(res.data.policyResult.plyNoList[0].CPlyNo)
          this.$router.push({
            name: "policyPayState",
            params: { pay: "true", result: "成功" ,policyNo:res.data.policyResult.plyNoList[0].CPlyNo}
          });
        })
        .catch(error => {
          console.log(error);
          if (error.isLogicError) {
						//如果是验证码失败则不跳转页面
						if(error.data.data =='01'){
							utils.ui.toast(error.errorMessage);
						}else{
						 this.$router.push({
								name: "policyPayState",
								params: { pay: "false", result: error.data.data.errorMsg,policyNo:"1" }
            	});
						}
          } else {
            utils.ui.toast(error.errorMessage);
          }
        });
    },
    //倒计时结束
    timeOver() {
      console.log("倒计时结束了");
    },
    //我知道了
    know() {
      console.log("konw");
    },
    //显示order详情
    show() {
      this.showInfo = !this.showInfo;
    },
    //转账授权书
    showModal() {},
    //获取验证码
    getYzCode() {
      console.log(this.personInfo.holder.phone);
      let req = {
        phone: this.personInfo.holder.phone,
        type: "05"
      };
      this.btn_disabled = true;
      utils.http
        .post("USERREGISTERCODE", req)
        .then(response => {
          console.log("验证码发送成功");
          if (timeInterval) clearInterval(timeInterval);
          let timeInterval = setInterval(e => {
            this.btn_disabled = true;
            this.time--;
            this.btn_yzm = "重新获取（" + this.time + "s）";
            if (this.time <= 0) {
              this.btn_disabled = false;
              this.time = 60;
              this.btn_yzm = "获取验证码";
              clearInterval(timeInterval);
            }
          }, 1000);
        })
        .catch(error => {
          this.btn_disabled = false;
          utils.ui.toast(error.errorMessage);
        });
    }
	},
	mounted(){
		// CodeData.bankCode
		this.personInfo  = utils.cache.get("PUTPOLICYINFO");
		this.bankCode = CodeData.bankCode;
	},
  watch: {
    ["authOpt.showPop"](newVal) {
      utils.wx.wxSetTitle(newVal ? "保费自动转账授权声明" : this.authOpt.title);
    }
  },
  beforeRouteLeave(to, from, next) {
    // 当打开弹出框 先关闭弹出框
    this.authOpt.showPop = false;
    next(to.name !== "policyMsg");
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.page_policy_pay {
  .demo-checkbox {
    font-size: 1.2rem;
    .mu-checkbox-label {
      color: #828ca0;
    }
  }
  .mu-checkbox-icon {
    margin-right: 0px;
  }
  .field_span {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgb(233, 236, 238);
    width: 100%;
    font-size: 1.3rem;
  }
  .pay-padding {
    padding: 16px;
  }
  .mu-item {
    padding: 0px;
  }
  .mg-lg {
    margin: 0px;
    border-bottom: 1px solid rgb(233, 236, 238);
    .show_item {
      height: 44px;
      line-height: 44px;
      margin-top: 10px;
      img {
        width: 20px;
        position: absolute;
        margin-top: 12px;
      }
      span {
        margin-left: 30px;
        font-size: 1.3rem;
      }
      .demo-checkbox {
        float: right;
        margin-top: 13px;
      }
    }
  }
}
</style>
