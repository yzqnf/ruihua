<template>
  <div class="page mine-page page-change-password">
    <mu-content-block class="has-header no-padding">
      <section v-bind:style="{'min-height':screenHeight - 81 +'px'}">
        <section class="mine-header bg-primary">
        </section>
        <section class="mine-avatar mine-section mg-lg">
          <div class="mine-inner-group mg-lg">
            <ValidatorInput :form.sync="validateObj.userPwd" :validator="{rules:['require:请输入密码','pwd:密码格式不正确']}" type="password" hintText="输入原密码" v-model="passwordModel.userPwd" fullWidth/>
            <ValidatorInput :form.sync="validateObj.newPwd" :validator="{rules:['require:请输入密码','pwd:密码格式不正确']}" type="password" hintText="输入新密码" v-model="passwordModel.newPwd" fullWidth/>
            <div class="mine-password-notes">密码由6-20个字符组成，允许出现英文字母、数字符号组合。</div>
            <ValidatorInput :form.sync="validateObj.confirmPwd" :validator="{rules:['require:请输入密码','pwd:密码格式不正确',{reg:confirmPwdReg,msg:'两次输入密码不一致'}]}" :needRule="true" type="password" hintText="确认新密码" v-model="confirmNewPassword" fullWidth/>
            <mu-raised-button @click="submit" :disabled="isDisabled" :class="buttonClassObject" label="提交" />
          </div>
        </section>
      </section>
      <rh-footer></rh-footer>
    </mu-content-block>
    <toast :show="toast" @update="handleResult">
      <div v-if="isChangeSucceed" class="mine-toast mine-pwd-succeeded-toast">
        <img src="../../assets/img/mine/icon_change_succeeded.png">
        <div style="line-height:25px;padding-top:10px;">密码修改成功<br>重新登录</div>
      </div>
      <div v-if="!isChangeSucceed" class="mine-toast mine-pwd-failed-toast">
        <img src="../../assets/img/mine/icon_authenticate_failed.png">
        <div style="line-height:25px;padding-top:10px;">密码修改失败<br>{{errorMessage}}</div>
      </div>
    </toast>
  </div>
</template>

<script>
import LogoFooter from './../common/LogoFooter.vue'
import Toast from '../common/Toast.vue'
export default {
  name: 'changePassword',
  components: {
    'rh-footer': LogoFooter,
    'toast': Toast,
  },
  data() {
    return {
      confirmNewPassword: '',
      toast: false,
      isChangeSucceed: false,
      passwordModel: {
        'userPwd': '',
        'newPwd': '',
        'userId': '',
      },
      validateObj: {
        userPwd: {},
        newPwd: {},
        confirmPwd: {},
      },
      errorMessage: '',
      screenHeight: document.documentElement.clientHeight,
    }
  },
  methods: {
    showToast(flag) {
      this.toast = flag
    },
    submit() {
      utils.http.post('UPDATEPWD', this.passwordModel).then(response => {
        console.log(response.data)
        this.isChangeSucceed = true;
        this.showToast(true)
      }).catch(error => {
        console.log(error)
        if (error.isLogicError) {
          if (error.errorMessage.indexOf("当前密码输入错误") >= 0) {
            this.errorMessage = '原密码错误'
            this.isChangeSucceed = false;
            this.showToast(true)
          } else {
            utils.ui.dialog(error.errorMessage, require('../../assets/img/common/icon_warning.png'), [], index => {
            })
          }
        }
      })
    },
    handleResult() {
      this.toast = false
      if (this.isChangeSucceed) {
        utils.cache.set('loginToPage', '/page/myCenter')
        this.go('/page/login/wx')
      }
    }
  },
  computed: {
    isDisabled() {
      return !(this.validateObj.userPwd.status && this.validateObj.newPwd.status && this.validateObj.confirmPwd.status && (this.passwordModel.newPwd === this.confirmNewPassword))
    },
    buttonClassObject() {
      return {
        'button-primary': !this.isDisabled,
        'button-disabled': this.isDisabled,
      }
    },
    confirmPwdReg() {
      let reg = eval('/^' + this.passwordModel.newPwd + '$/')
      return reg
    }
  },
  activated() {
    //获取user信息
    console.log(utils.cache.get('user'))
    let userInfo = utils.cache.get('user')
    this.passwordModel.userId = userInfo.CUserId
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped >
@import 'src/assets/css/mine';
.page-change-password {
  .mine-avatar {
    height: 330px;
    margin-top: -104px;
  }
  .mine-section {
    .mine-inner-group {
      padding-top: 24px;
      .mine-password-notes {
        color: $memo-color-light;
        font-size: 1.2rem;
        margin-bottom: 20px;
      }
    }
    .button-primary,
    .button-disabled {
      margin-top: 12px;
    }
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
.mine-page {
  .toast{
    .mine-toast.mine-pwd-succeeded-toast{
      img {
        width:36px;
        height: 36px;
        margin-top: 30px;
      }
      div {
        padding-top: 24px;
        line-height: 25px;
      }
    }
    .mine-toast.mine-pwd-failed-toast{
      img {
        width:44px;
        height: 44px;
        margin-top: 28px;
      }
      div {
        padding-top: 22px;
        line-height: 25px;
      }
    }
  }
}
</style>
