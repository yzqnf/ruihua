<template>
  <div class="page page_pwd">
    <!-- <mu-appbar title="忘记密码"> </mu-appbar> -->
    <mu-content-block class="has-header">

      <section style="margin-top:32px">
        <div class="center pd-lg">
          <mu-stepper :activeStep="activeStep" class="step" :linear="false">
            <mu-step>
              <mu-step-label class="completed" style="flex-direction:column;">
                <span>验证账号</span>
              </mu-step-label>
            </mu-step>
            <mu-step>
              <mu-step-label :class="{completed:activeStep>1}">
                <span>重置密码</span>
              </mu-step-label>
            </mu-step>
            <mu-step>
              <mu-step-label>
                <div slot="icon" :style="{background:activeStep==2?'#52C750':'#BABEC6'}" style="display:inline-block;width:24px;height:24px;line-height:24px;border-radius:50%;padding-top:2px;">
                  <mu-icon value="check" color="white" :size="20"/>
                </div>
                <span>　完成　</span>
              </mu-step-label>
            </mu-step>
          </mu-stepper>
        </div>
      </section>
			<!-- 密码重置 -->
      <section class="pw_body">
        <br>
        <div>
					<!-- 输入手机号验证码 -->
          <section class="pw_main" v-show="activeStep==0">
            <ValidatorInput :form.sync="validateObj.phone" :validator="{rules:['require:请输入手机号','mobile:请输入正确的手机号']}" type="tel" hintText="请输入您要找回的手机号码" v-model="model.phone" />
            <section class="primary_yzm">
              <ValidatorInput type="tel" :form.sync="validateObj.verifyCode" :validator="{rules:['require:请输入6位验证码',{reg:/^\S{6,6}$/,msg:'请输入6位验证码'}]}" v-model="model.verifyCode" hintText="请输入验证码" />
              <button :disabled="btn_disabled  || !validateObj.phone.status" @click="getYzCode()" class="yzm font-primary">{{btn_yzm}}</button>
            </section>
            <div style="margin-top:20px">
              <mu-raised-button :disabled="!validateObj.phone.status||!validateObj.verifyCode.status" @click="nextStep()" label="下一步" class="demo-raised-button bg-primary" primary/>
              <span class="lg_sp font-normal" @click="showModal('bottom')">手机号不可用？</span>
            </div>
          </section>
					<!-- 输入新密码 -->
          <section class="pw_main pwd_info" v-show="activeStep==1">
            <ValidatorInput @focus="focusn(true)" @blur="focusn(false)"  hintText="请输入新密码" :form.sync="validateObj.newPwd" :validator="{rules:['require','pwd']}" v-bind:class="[validateObj.newPwd.status ||model.newPwd == ''? 'error_gray':focu?'error_gray':'']" v-model="model.newPwd" type="password" errorMsg="密码由6-20个字符组成，允许出现英文字母、数字符号组合。" />
            <mu-text-field @focus="focusIn(true)" @blur="focusIn(false)" style="margin-top:30px" :errorText="!focus&&confirmPwd && model.newPwd != confirmPwd?'两次密码输入不一致':''" v-model="confirmPwd" hintText="请确认新密码" type="password" />
            <div style="margin-top:20px">
              <mu-raised-button :disabled="!validateObj.newPwd.status || model.newPwd != confirmPwd" @click="nextStep()" label="密码重置" class="demo-raised-button  bg-primary" primary/>
            </div>
          </section>
					<!-- 重置密码 -->
          <section class="pw_main pw_success" v-show="activeStep==2">
            <img src="../../../assets/img/lg/pw.png" />
            <span class="text" style="margin-top:10px;margin-bottom:24px;display:block">密码重置成功</span>
            <div style="margin-top:20px">
              <mu-raised-button @click="nextStep()" label="重新登录" class="demo-raised-button bg-primary" primary/>
            </div>
          </section>
        </div>
				<!-- 忘记密码 -->
        <mu-popup position="bottom" popupClass="mu-popup-full" :open="bottomPopup" @close="hideModal('bottom')">
          <mu-content-block style="background: #FFFFFF;" class="has-header no-padding">
            <section class="text_box question">
              <div class="text_header ">
                <img src="../../../assets/img/icon_Q.png" alt="">
              </div>
              <div class="text_body" style="font-size:1.4rem">手机丢失？</div>
            </section>
            <section class="text_box answer">
              <div class="text_header ">
                <!-- <font style="background: rgb(255, 237, 176);">A</font> -->
                <img src="../../../assets/img/icon_A.png" alt="">
              </div>
              <div class="text_body">可以到营业厅补办同号码的手机号，补办后可正常接收信息。</div>
            </section>
            <br/>
            <section class="text_box question">
              <div class="text_header ">
                <img src="../../../assets/img/icon_Q.png" alt="">
              </div>
              <div class="text_body" style="font-size:1.4rem">手机号换新的了怎么办？</div>
            </section>
            <section class="text_box answer">
              <div class="text_header">
                <img src="../../../assets/img/icon_A.png" alt="">
              </div>
              <div class="text_body">1）如果您是注册用户，未在平台中投保，如更换新的手机号则重新注册即可；
                <br> 2）如果您在平台中已投保，如更换新的手机号则需要联系客服热线：
                <font style="color: rgb(238,103,35);">400-609-6868</font>。
              </div>
            </section>
          </mu-content-block>
        </mu-popup>
      </section>
    </mu-content-block>
  </div>
</template>
<script>
export default {
  name: "forgetPwd",
  components: {},
  data() {
    return {
      // 是否为选中状态
      focu: false,
      focus: false,
      title: "忘记密码？",
      bottomPopup: false,
      // 进度状态
      activeStep: 0,
      time: 60,
      btn_yzm: "获取验证码",
      btn_disabled: false,
      model: {
        phone: "",
        verifyCode: "",
        newPwd: ""
      },
      // 验证对象
      validateObj: {
        phone: {},
        newPwd: {
          status: true
        },
        verifyCode: {}
      },
      confirmPwd: ""
    };
  },
  methods: {
    /**
		 * @augments flag boolean
		 * 进入焦点
		 */
    focusIn(flag) {
      this.focus = flag;
    },
    /**
		 * @augments flag boolean
		 * 进入焦点
		 */
    focusn(flag) {
      this.focu = flag;
    },
    /** 
		 * 获取验证码
		 */
    getYzCode() {
      let req = {
        phone: this.model.phone,
        type: "03"
      };
      this.btn_disabled = true;
      utils.http
        .post("USERREGISTERCODE", req)
        .then(response => {
          this.beginTime();
        })
        .catch(error => {
          this.btn_disabled = false;
          utils.ui.alert(error.errorMessage);
        });
    },
    /** 
		 * 开始倒计时
		 */
    beginTime() {
      if (timeInterval) clearInterval(timeInterval);
      let timeInterval = setInterval(e => {
        this.btn_disabled = true;
        this.time--;
        let newObj = {
          time: this.time,
          obj: this.validateObj,
          model: this.model
        };
        utils.cache.set("pwd_data", newObj);
        this.btn_yzm = "重新获取（" + this.time + "s）";
        if (this.time <= 0) {
          this.btn_disabled = false;
          this.time = 60;
          this.btn_yzm = "获取验证码";
          clearInterval(timeInterval);
        }
      }, 1000);
    },
    /** 
		 * 下一步
		 */
    nextStep() {
      if (this.activeStep == 2) {
        utils.cache.removeItem("pwd_data");
        window.history.back();
        // this.$router.push('/page/login')
        this.$destroy();
      } else {
        if (this.activeStep == "1") {
          utils.http
            .post("USERFINDPASSWORD", this.model)
            .then(response => {
              this.activeStep++;
            })
            .catch(error => {
              utils.ui.toast(error.errorMessage);
            });
        } else {
          this.activeStep++;
        }
        //
      }
    },
    /** 
		 * 弹出 手机号不可用
		 */
    showModal(position) {
      this.title = "手机号不可用？";
      //设置监听
      window.addEventListener(
        "popstate",
        e => {
          this.hideModal("bottom");
        },
        false
      );
      this[position + "Popup"] = true;
      utils.help.pushState();
    },
    /**
		 * 关闭弹出框
		 */
    hideModal(position) {
      this.title = "忘记密码？";
      this[position + "Popup"] = false;
      window.addEventListener(
        "popstate",
        e => {
          this.hideModal("bottom");
        },
        false
      );
    },
    /** 
		 * 判断是否为不可点击状态
		 */
    isDisabled() {
      return this.activeStep == 0
        ? !this.validateObj.phone.status || !this.validateObj.verifyCode.status
        : !this.validateObj.newPwd.status ||
            this.confirmPwd == this.model.newPwd;
      console.log(this.confirmPwd == this.model.newPwd);
    }
  },
  created() {
		// 初始化数据
    this.activeStep = 0;
    if (utils.cache.get("pwd_data")) {
      this.btn_disabled = true;
      this.time = parseInt(utils.cache.get("pwd_data").time);
      this.model = utils.cache.get("pwd_data").model;
      this.beginTime();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/assets/css/login";
.answer {
  .text_body {
    line-height: 24px !important;
    margin-top: 9px;
  }
}

.page_pwd {
  background-color: rgb(242, 244, 245) !important;
  height: 100%;
  .mu-content-block {
    padding: 0px;
  }

  .pw_body {
    margin-left: 16px;
    width: calc(100% - 32px);
    padding: 0px 16px; // position: absolute;
    margin-top: 8px;
    background: #ffffff;
    border-radius: 2px;
    padding-top: 16px;
    padding-bottom: 24px; // min-height: 285px;
    .demo-raised-button {
      height: 44px;
      border-radius: 2px;
      font-size: 1.5rem;
      width: 100%;
    }
    .demo-raised-button:disabled {
      background: #babec6;
      color: white;
    }
    .pw_main {
      .lg_sp {
        text-align: right;
        display: block;
        margin-bottom: 16px;
        margin-top: 16px;
        font-size: 1.2rem;
      }
    }
    .pw_success {
      text-align: center;
      img {
        width: 87px;
        height: auto;
      }
      .text {
        font-size: 1.9rem;
      }
    }
  }
}
</style>
