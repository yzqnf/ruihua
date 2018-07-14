<template>
  <div class="page page_login">
    <mu-content-block class="has-header no-padding has-logo">
      <section v-bind:style="{'min-height':screenHeight - 64 +'px'}">
        <section class="lg_header bg-primary">
          <img src="../../assets/img/lg/logo.png" @click="test" />
        </section>
        <section class="lg_body">
          <!-- {{'022' | commonFilter('relationCode')}} -->
          <div>
            <mu-tabs v-if="isWxLogin" :value="activeTab" @change="handleTabChange" class="api-view-tabs">
              <mu-tab value="tab1" title="登录" />
              <mu-tab value="tab2" title="注册" />
            </mu-tabs>
            <br/>

            <section v-show="activeTab === 'tab1'" class="lg_main">
							<!-- 密码登陆 -->
							<div v-if="isPwd">
								<ValidatorInput  inputType="lg" :form.sync="validateObj.phone" :validator="{rules:['require:请输入手机号','mobile:请输入正确的手机号']}" type="tel" hintText="请输入手机号码" v-model="loginModel.phone" />
								<!-- 清空密码操作 -->
								<ValidatorInput :needRule="true"  :form.sync="validateObj.pwd" :validator="pwdRule" type="password" hintText="请输入密码" v-model="loginModel.password" />
							</div>
              <!-- 验证码登陆 -->
							<ValidatorInput  v-if="!isPwd" inputType="lg" :form.sync="validateObj.phone" :validator="{rules:['require:请输入手机号','mobile:请输入正确的手机号']}" type="tel" hintText="请输入手机号码" v-model="loginModel.phone" />
							<section class="primary_yzm " v-if="!isPwd">
                <ValidatorInput type="tel" :form.sync="validateObj.verifyCode" :validator="{rules:['require:请输入6位验证码',{reg:/^\S{6,6}$/,msg:'请输入6位验证码'}]}" v-model="loginModel.verifyCode" hintText="请输入6位验证码" />
                <button :disabled="btn_disabled || !validateObj.phone.status" @click="getYzCode(true)" class="yzm font-primary">{{btn_yzm}}</button>
              </section>
              <div class="center" style="margin-top:16px">
                <mu-raised-button v-if="isPwd" :disabled="!validateObj.phone.status || !validateObj.pwd.status" @click="loginWay" label="登录" class="demo-raised-button button-primary" primary/>
                <mu-raised-button v-else :disabled="!validateObj.phone.status || !validateObj.verifyCode.status" @click="loginWay" label="登录" class="demo-raised-button button-primary" primary/>
                <div class="lg_sp">
                    <span class=" font-normal" @click="changeLoginMethod()">{{isPwd?'手机验证登录':'密码登录'}}</span>
                    <div v-if="isWxLogin" @click="forgetPwd">
                      <span class=" font-normal" style="font-size:1.2rem">忘记密码？</span>
                    </div>
                </div>
              </div>
            </section>

            <!-- 注册页面 -->
            <section v-show="activeTab === 'tab2'" class="lg_reg pwd_info" style="padding-bottom:24px">
              <!-- 注册 -->
							<ValidatorInput :form.sync="registerValidateObj.phone" :validator="{rules:['require:请输入手机号','mobile:请输入正确的手机号']}" type="tel" hintText="请输入手机号码" v-model="registerModel.phone" />
						  <section class="primary_yzm">
                <ValidatorInput type="tel" :form.sync="registerValidateObj.verifyCode" :validator="{rules:['require:请输入6位验证码',{reg:/^\S{6,6}$/,msg:'请输入6位验证码'}]}" v-model="registerModel.verifyCode" hintText="请输入6位验证码" />
                <button :disabled="btn_disabled_re || !registerValidateObj.phone.status" @click="getYzCode(false)" class="yzm font-primary">{{btn_yzm_re}}</button>
              </section>
             
						  <ValidatorInput  @focus="focusIn(true)" @blur="focusIn(false)" class="error" hintText="请输入密码" :form.sync="registerValidateObj.pwd" :validator="{rules:['require:请输入密码','pwd']}" v-bind:class="[registerValidateObj.pwd.status||registerModel.password==''?'error_gray':focus?'error_gray':'']" v-model="registerModel.password" type="password" errorMsg="密码由6-20个字符组成，允许出现英文字母、数字符号组合。" />
             
						  <section style="margin:30px 0px 20px 0px;">
                <mu-checkbox @change="check" v-model="checked" label="我已阅读并接受" class="demo-checkbox" />
                <span style="position: absolute;margin-top: 3px;font-size:1.2rem" @click="showModal('bottom')">《瑞华保险会员服务协议》</span>
              </section>
							<!-- 注册按钮 -->
              <div class="center">
                <mu-raised-button :disabled="!checked || !registerValidateObj.phone.status || !registerValidateObj.verifyCode.status||!registerValidateObj.pwd.status" @click="register" label="注 册" class="demo-raised-button bg-primary" primary/>
              </div>
            </section>
          </div>
        </section>
      </section>
			<!-- 底部导航 -->
      <rh_footer></rh_footer>
    </mu-content-block>
		<!-- 协议弹出框 -->
    <ContentTemplet :openModal="openModal" :type="'1'"></ContentTemplet>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {
    // 底部logo
    rh_footer: r => {
      require.ensure(
        [],
        () => r(require("../../components/common/LogoFooter")),
        "logoFooter"
      );
    },
    // 协议
    ContentTemplet: r => {
      require.ensure(
        [],
        () => r(require("../../components/common/ContentTemplate")),
        "contentTemplate"
      );
    }
  },
  data() {
    return {
      focus: false,
      // 是否为密码登陆
      isPwd: true,
      pwdRule: { rules: ["require:请输入密码", "pwd"] },
      // 倒计时
      time: 60,
      reTime: 60,
      //客户测试提出的 --- 打补丁
      showDialog: false,
      lock: false,
      btn_yzm: "获取验证码",
      btn_yzm_re: "获取验证码",
      //登陆验证码按钮控制
      btn_disabled: false,
      //注册验证码按钮控制
      btn_disabled_re: false,
      //登陆对象
      loginModel: {
        phone: "",
        password: "",
        verifyCode: "",
        loginType: "P", //P密码 Y验证码
        openId: ""
      },
      //注册对象
      registerModel: {
        phone: "",
        password: "",
        verifyCode: "",
        loginType: "P", //P密码 Y验证码
        openId:""
      },
      //验证对象 --- 登陆
      validateObj: {
        phone: {},
        pwd: {
          status: false
        },
        verifyCode: {
          status: false
        }
      },
      //验证对象 --- 注册
      registerValidateObj: {
        phone: {},
        pwd: {
          status: false
        },
        verifyCode: {}
      },
      //切换tab
      activeTab: "tab1",
      //是否打开弹出框
      openModal: false,
      //勾选
      checked: false,
      //是否为微信登陆
      isWxLogin: true
    };
  },
  methods: {
    /**
		 * @augments flag传入状态 boolean
		 * 是否在输入
		 */
    focusIn(flag) {
      this.focus = flag;
    },
    /**
		 * 勾选协议
		 */
    check() {
      console.log(this.checked);
      if (!globalConfig.isDebug && !this.checked) {
        // this.showModal('bottom');
      }
    },
    /**
		 * 改变登录方式
		 */
    changeLoginMethod() {
      //清空密码
      this.isPwd = !this.isPwd;
      this.loginModel.password = "";
      this.loginModel.verifyCode = "";
      this.loginModel.phone = "";
      this.validateObj.pwd.status = false;
      this.validateObj.verifyCode.status = false;
    },
    /**
		 * s_b_c g 
		 * 密码登陆
		 */
    forgetPwd() {
      this.pwdRule = { rules: [] };
      this.loginModel.password = "";
      // this.loginModel.verifyCode = "";
      setTimeout(() => {
        this.pwdRule = { rules: ["require:请输入密码", "pwd"] };
        this.validateObj.pwd.status = false;
        this.$router.push({
          name: "pwd"
        });
      }, 0);
    },
    /**
		 * tab切换
		 */
    handleTabChange(val) {
      this.activeTab = val;
      let title = this.activeTab == "tab1" ? "登录" : "注册";
      utils.wx.wxSetTitle(this.activeTab == "tab1" ? "登录" : "注册");
    },
    /**
		 * 获取验证码
		 */
    getYzCode(isLogin) {
      let req = {
        phone: isLogin ? this.loginModel.phone : this.registerModel.phone,
        type: isLogin ? "01" : "02"
      };
      isLogin ? (this.btn_disabled = true) : (this.btn_disabled_re = true);
      utils.http
        .post("USERREGISTERCODE", req)
        .then(response => {
          console.log("验证码发送成功");
          if (timeInterval) clearInterval(timeInterval);
          let timeInterval = setInterval(e => {
            if (isLogin) {
              this.btn_disabled = true;
              this.time--;
              this.btn_yzm = "重新获取（" + this.time + "s）";
              if (this.time <= 0) {
                this.btn_disabled = false;
                this.time = 60;
                this.btn_yzm = "获取验证码";
                clearInterval(timeInterval);
              }
            } else {
              this.btn_disabled_re = true;
              this.reTime--;
              this.btn_yzm_re = "重新获取（" + this.reTime + "s）";
              if (this.reTime <= 0) {
                this.btn_disabled_re = false;
                this.reTime = 60;
                this.btn_yzm_re = "获取验证码";
                clearInterval(timeInterval);
              }
            }
          }, 1000);
        })
        .catch(error => {
          this.btn_disabled = false;
          utils.ui.dialog(
            error.errorMessage,
            require("../../assets/img/common/icon_warning.png"),
            ["联系客服", "注册账户"],
            index => {
              if (index == "1") {
                this.activeTab = "tab2";
              } else {
                location.href = "tel:400-609-6868";
              }
            }
          );
        });
    },
    /**
		 * 显示协议对象
		 */
    showModal(position) {
      this.openModal = true;
      utils.wx.wxSetTitle("瑞华保险会员服务协议");
    },
    /**
		 * 登陆方式
		 */
    loginWay() {
      //判断是否为微信登陆
      if (this.isWxLogin) {
        this.login();
      } else {
        console.log("非微信登陆方式");
        utils.http.post("USERCHECKEXPIRE", this.loginModel).then(res => {
          console.log(res);
          if (res.data) {
            this.loginModel.openId = res.data;
          } else {
            this.loginModel.openId = "temp-" + utils.help.uuid();
            //
          }
          //更新openID 方便后面获取
          let temp = utils.cache.get("wxConfig") || {};
          temp.openId = this.loginModel.openId;
          utils.cache.set("wxConfig", temp);
          //进行登录操作
          this.login();
        });
      }
    },
    /**
		 * @params fromRegist 是否是点击注册后立马登陆
		 * 登录接口
		 */
    login(fromRegist) {
      console.log(JSON.stringify(this.validateObj));
      this.isPwd
        ? (this.loginModel.loginType = "P")
        : (this.loginModel.loginType = "Y");
      utils.http
        .post("USERLOGIN", this.loginModel)
        .then(response => {
          console.log(response.data);
          //认证设置
          if (response.data.userLogin.CCertfCde) {
            response.data.userLogin.isAuth = true;
          } else {
            response.data.userLogin.isAuth = false;
          }
          //保存用户信息
          utils.cache.set("user", response.data.userLogin);
          this.$store.commit("LOGIN", utils.cache.get("user"));
          this.$destroy();

          //loukai added start
          if (utils.cache.get("outSideLink")) {
            let osLink = utils.cache.get("outSideLink");
            utils.cache.removeItem("outSideLink");
            window.location.href = osLink;
            return;
          }
          //loukai added end

          // this.$router.push('/page/home')
          if (utils.cache.get("loginToPage")) {
            let page = utils.cache.get("loginToPage");
            utils.cache.removeItem("loginToPage");
            this.go(page);
          } else {
            window.history.back();
          }
        })
        .catch(error => {
          if (error.isLogicError) {
            let isNameError, isPwdError;
            isNameError = error.errorMessage.indexOf("密码错误") >= 0;
            if (!isNameError) {
              isPwdError = error.errorMessage.indexOf("手机号错误") >= 0;
            }
            if (!isPwdError) {
              isPwdError = error.errorMessage.indexOf("账户不存在") >= 0;
            }
            utils.ui.dialog(
              error.errorMessage,
              require("../../assets/img/common/icon_warning.png"),
              isNameError
                ? ["重新输入", "找回密码"]
                : isPwdError ? ["联系客服", "注册账户"] : ["确定"],
              index => {
                if (index == "1") {
                  if (isNameError) {
                    this.$router.push("/page/pwd");
                  } else if (isPwdError) {
                    this.activeTab = "tab2";
                  }
                } else if (index == "0") {
                  if (isPwdError) {
                    location.href = "tel:400-609-6868";
                  }
                }
              }
            );
          }
        });
    },
    /**
		 * 注册接口
		 */
    register() {
      let req = {
        openId: utils.cache.get("wxConfig").openId,
        phone: this.registerModel.phone,
        verifyCode: this.registerModel.verifyCode,
        password: this.registerModel.password
      };
      utils.http
        .post("USERREGISTER", req)
        .then(response => {
          this.activeTab = "tab1";
          this.isPwd = true;
          this.loginModel.phone = this.registerModel.phone;
          this.loginModel.password = this.registerModel.password;
          // this.loginModel.phone = this.registerModel.phone;
          this.login(true);
        })
        .catch(error => {
          utils.ui.toast(error.errorMessage);
        });
    },
    //获取登录
    // getUserMsg(param) {
    //   let req = {
    //   }
    //   utils.http.post('USERREGISTER', req).then(response => {
    //     response.data.userLogin.isAuth = false;
    //     utils.cache.set('user', response.data.userLogin)
    //     //ss
    //     this.$store.commit('LOGIN', utils.cache.get('user'))
    //     this.$destroy();
    //     //dsad
    //     window.history.back();
    //   }).catch(error => {
    //     utils.ui.toast(error.errorMessage)
    //   })
    // },
    test() {
      if (globalConfig.isDebug) {
        console.log(JSON.stringify(this.validateObj));
        this.loginModel = {
          phone: "13771152499",
          password: "1234567",
          verifyCode: "1234567",
          loginType: "P", //P密码 Y验证码
          openId: utils.cache.get("wxConfig").openId
        };
        // utils.wx.wxConfig().then(req => {
        //   console.log("获取微信配置返回数据", req)
        // });
      }
    }
  },
  activated() {
    this.$store.commit("LOADING", {
      loading: false
    });
  },
  mounted() {
    //清除用户登陆信息
    utils.cache.removeItem("user");
    this.$store.commit("LOGIN", undefined);
    //id 为 ‘wx’ 为微信登陆 否则为游览器登陆
		// this.isWxLogin = this.$route.params.id == "wx";
		let ua = window.navigator.userAgent.toLowerCase();
		this.isWxLogin =ua.match(/MicroMessenger/i) == "micromessenger";
		//对应的openID
		if(this.isWxLogin){
			this.loginModel.openId = utils.cache.get("wxConfig").openId;
			this.registerModel.openId = utils.cache.get("wxConfig").openId;
		}else{
			this.loginModel.openId = "";
			this.registerModel.openId = "";
		}
  },
  beforeRouteLeave(to, from, next) {
    if (this.openModal) {
      utils.wx.wxSetTitle("注册");
      next(false);
      this.openModal = false;
    } else {
      next(true);
      console.log(this.$store.state.common.user, to.meta.login);
      if (
        !this.$store.state.common.user &&
        (to.meta.login || to.name == "access")
      ) {
        utils.wx.wxClose();
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" >
@import "src/assets/css/login";
.page_login {
  .mu-content-block {
    min-height: 480px;
  }
  background-color: rgb(242, 244, 245);
  .lg_header {
    min-height: 140px;
    text-align: center;
    img {
      margin-top: 32px; // width: 163.8px;
      height: 40px;
    }
  }

  .lg_body {
    width: calc(100% - 32px);
    margin-left: 16px;
    margin-top: -40px;
    background: #ffffff;
    border-radius: 2px;
    min-height: 285px;
    .demo-raised-button {
      height: 4rem;
      border-radius: 2px;
      font-size: 1.5rem;
      width: 100%;
    }
    .demo-raised-button:disabled {
      background: #babec6;
      color: white;
    }
    .lg_sp {
      font-size: 1.2rem;
      margin-top: 16px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
    }
    .lg_reg,
    .lg_main {
      padding: 0px 16px;
      padding-bottom: 1px;
      .demo-checkbox {
        font-size: 1.2rem;
        .mu-checkbox-label {
          color: #828ca0;
        }
      }
    }
  }
  .lg_xy {
    p {
      font-size: 1.3rem;
      color: #556074;
      line-height: 28px;
    }
  }
  .mu-tab-link-highlight {
    background: linear-gradient(
      90deg,
      white 45%,
      $primary-color 45.1%,
      $primary-color 55%,
      white 55.1%
    );
    color: $primary-color;
  }
}
</style>
