<template>
  <div class="page mine-page page-email-authentication">
    <mu-content-block class="has-header no-padding">
      <section v-bind:style="{'min-height':screenHeight - 81 +'px'}">
        <section class="mine-header bg-primary">
        </section>
        <section class="mine-avatar mine-section mg-lg">
          <div class="mine-inner-group mg-lg">
            <div class="memo font-memo">只需登录您填写的邮箱，点击链接认证即可。验证通过后，账号更安全。</div>
          </div>
          <div class="mine-inner-group mg-lg">
            <ValidatorInput btnClear="true" :form.sync="validateObj.email" :validator="{rules:['require','email',{reg:/^(\S|\s){0,30}$/,msg:'邮箱地址不超过30个字符'}]}" 
              v-model="emailModel.Email" hintText="输入常用邮箱地址" fullWidth/>
          </div>
          <div class="mine-inner-group mg-lg submit-btn">
            <mu-raised-button @click="submit" 
              :disabled="isDisabled" :class="buttonClassObject" :label="submitLabel"/>
          </div>
        </section>
      </section>
      <rh-footer></rh-footer>
    </mu-content-block>
    <toast :show="toast" @update="((val) => this.toast = false)">
      <div class="mine-toast mine-email-toast">
        <img src="../../assets/img/mine/icon_authenticate_failed.png">
        <div>{{toastLabel}}</div>
      </div>
    </toast>
    <mu-dialog dialogClass="dialog mine-feedback-dialog" :open="isShowDialog" @close="returnProfile()">
      <!--<img src="../../assets/img/mine/icon_authenticate_succeeded.png">-->
      <img class="dialog-icon" src="../../assets/img/mine/icon_email_succeeded.png">
      <div class="dialog-content mine-dialog-title">{{feedbackLabel}}</div>
      <div class="dialog-content mine-dialog-description">请前往邮件内进行验证</div>
    </mu-dialog>
  </div>
</template>

<script>
import LogoFooter from './../common/LogoFooter.vue'
import Toast from '../common/Toast.vue'
export default {
  name: 'emailAuthentication',
  components: {
    'rh-footer': LogoFooter,
    'toast': Toast,
  },
  data() {
    return {
      oldEmail: '',
      emailFlag: '',
      emailModel: {
        'Email': '',
        'userId':'',
        'userName': '',  //姓名？姓名：微信昵称
        'reSendEmail': '',  //当为true时，后台只重发邮件 
      },
      toast: false,
      validateObj: {
        email: {},
      },
      toastLabel: '',
      feedbackLabel: '',
      isShowDialog: false,
      screenHeight: document.documentElement.clientHeight,
    }
  },
  methods: {
    showToast(flag) {
      this.toast = flag
    },
    showDialog(flag) {
      this.isShowDialog = flag
    },
    submit() {
      if(!this.emailModel.userName){
        //微信昵称
        utils.wx.wxUserInfo().then(req => {
          console.log("返回数据", req)
          this.emailModel.userName = req.nickname
        });
      }
      //设置是否只重发邮件标志
      if(this.oldEmail && this.oldEmail == this.emailModel.Email){
        this.emailModel.reSendEmail = true
      }else {
        this.emailModel.reSendEmail = false
      }
      utils.http.post('SENDEMAIL', this.emailModel).then(response => {
        console.log(response.data)
        if(!this.emailModel.reSendEmail){
          //存cache
          let user = utils.cache.get('user')
          user.CEmail = this.emailModel.Email
          user.CEmailFlag = '0'
          utils.cache.set('user', user)
          this.feedbackLabel = '邮箱地址已提交'
        }else {
          this.feedbackLabel = '验证邮件已重新发送'
        }
        this.showDialog(true)
      }).catch(error => {
        console.log(error)
        if (error.isLogicError) {
          let isUpdateUserError = error.errorMessage.indexOf("用户信息更新失败") >= 0
          let isSendEmailError = error.errorMessage.indexOf("验证邮件发送失败") >= 0
          if(isSendEmailError){
            //存cache
            let user = utils.cache.get('user')
            user.CEmail = this.emailModel.Email
            user.CEmailFlag = '0'
            utils.cache.set('user', user) 
            utils.ui.dialog(error.errorMessage, require('../../assets/img/common/icon_warning.png'), ['稍后再说', '重新发送'] , index => {
              if (index) {
                this.submit()
              } else {
                this.go('myProfile')
              }
            })
          }else if(isUpdateUserError){
            this.toastLabel = '邮箱提交错误'
            this.showToast(true)
          }else {
            utils.ui.dialog(error.errorMessage, require('../../assets/img/common/icon_warning.png'), [] , index => {
            })
          }
        }
      })
    },
    returnProfile() {
      this.showDialog(false)
      window.history.back()
    }
  },
  computed: {
    isDisabled() {
      let flag = !this.validateObj.email.status || (this.oldEmail && this.oldEmail == this.emailModel.Email && this.emailFlag == '1')
      //因为一定要返回true或false，&和||返回的不一定是逻辑值
      return !!flag
    },
    buttonClassObject() {
      return {
        'button-primary': !this.isDisabled,
        'button-disabled': this.isDisabled,
      }
    },
    submitLabel(){
      let str = ''
      if(!this.oldEmail){
        str = "验证邮箱"
      }else if(this.oldEmail == this.emailModel.Email ){
        if(this.emailFlag == '1'){
          str = "此邮箱已验证"
        }else{
          str = "再次发送验证邮件"
        }
      }else {
        str = "更改并验证邮箱"
      }
      return str
    }
  },
  activated() {
    //获取user信息
    console.log(utils.cache.get('user'))
    let userInfo = utils.cache.get('user')
    this.emailModel.userId = userInfo.CUserId
    this.emailModel.userName = userInfo.CName
    if(userInfo.CEmail){
      this.oldEmail = this.emailModel.Email = userInfo.CEmail
      this.emailFlag = userInfo.CEmailFlag
    }
  } 
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped >
@import 'src/assets/css/mine';
.page-email-authentication {
  .mine-avatar {
    height: 220px;
    .mine-inner-group {
      margin-top: 0px;
      margin-bottom: -2px;
    }
  }
  .submit-btn {
    padding-top: 10px;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
.mine-page {
  .toast{
    .mine-toast.mine-email-toast{
      img {
        width:48px;
        height: 48px;
        margin-top: 28px;
      }
      div {
        padding-top: 22px;
      }
    }
  }
}
.mu-dialog.dialog.mine-feedback-dialog {
  width: 80%;
  max-width:311px;
  height: 182px;
  text-align: center;
  .dialog-icon {
    width:32px;
    height:32px;
    margin-top:35px;
  }
  .mine-dialog-title {
    font-size:1.5rem;
    line-height:15px;
    margin-top:25px;
  }
  .mine-dialog-description {
    font-size:1.3rem;
    line-height:13px;
    padding-top:12px;
  }
}
</style>