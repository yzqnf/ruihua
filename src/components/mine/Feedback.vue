<template>
  <div class="page mine-page page-feedback">
    <mu-content-block class="has-header no-padding">
      <section v-bind:style="{'min-height':screenHeight +'px'}">
        <div class="mine-inner-group">
          <div class="group-title">反馈类型</div>
          <div class="mg-lg">
              <select-button :selectList = "feedbackTypeList" :selectModel.sync = "feedbackModel.type"></select-button>
          </div>
          <div class="group-title">反馈内容</div>
          <div class="mg-lg">
            <mu-text-field class="feedback-input" hintText="聊聊您的看法，帮助我们成长" :helpText="helpText"
              @textOverflow="handleMultiLineOverflow" :errorText="multiLineInputErrorText"
              multiLine :rows="6" :rowsMax="6" 
              :maxLength="140" :underlineShow="false" helpTextClass="text-count"
              v-model="feedbackModel.content"/><br/>
          </div>
          <div class="mg-lg">
            <ValidatorInput class="mine-contact-mobile" type="tel" :form.sync="validateObj.mobile" :validator="{rules:['mobileOrEmpty']}" 
              v-model="feedbackModel.phone" hintText="可留下您的手机号码，方便客服联系您！" fullWidth /><br/>
            <mu-raised-button :disabled="isDisabled" @click="submit" :class="buttonClassObject" label="提交"/>
          </div>
        </div>
      </section>
    </mu-content-block>
    <mu-dialog dialogClass="dialog mine-feedback-dialog" :open="isShowDialog" @close="returnCenter()">
      <img class="dialog-icon" src="../../assets/img/mine/icon_feedback.png">
      <div class="dialog-content mine-dialog-title">感谢您的反馈</div>
      <div class="dialog-content mine-dialog-description">瑞华将在第一时间处理您提出的问题</div>
    </mu-dialog>
  </div>
</template>

<script>
import selectButton from '../common/SelectButton'
import codeData from '../../assets/data/CodeData'
export default {
  name: 'feedback',
  components: {
    selectButton,
  },
  data() {
    return {
      isShowDialog: false,
      feedbackTypeList: codeData.feedbackCode,
      toast: false,
      multiLineInput: '',
      multiLineInputErrorText: '',
      feedbackModel: {
        'type': 0,  //反馈类型：1.建议，2.投诉, 0.未选择
        'content': '',
        'phone': '',
        'openID':'',
        'userId': '',
      },
      validateObj: {
        mobile: {},
      },
      isFeedbackRight: false,
      helpText: '',
      screenHeight: document.documentElement.clientHeight,
    }
  },
  methods: {
    showToast(flag) {
      this.toast = flag
    },
    handleMultiLineOverflow (isOverflow) {
      this.multiLineInputErrorText = isOverflow ? '超出字数限制' : ''  
    },
    showDialog(flag) {
      this.isShowDialog = flag
    },
    submit() {
      utils.http.post('USERFEEDBACK', this.feedbackModel).then(response => {
        console.log(response.data)
        this.showDialog(true)
      }).catch(error => {
        if (error.isLogicError) {
          utils.ui.dialog(error.errorMessage, require('../../assets/img/common/icon_warning.png'), [], index => {
          })
        }
      })
    },
    returnCenter() {
      this.showDialog(false)
      window.history.back()
    }
  },
  computed: {
    isDisabled() {
      return this.validateObj.mobile.status===false || !this.isFeedbackRight
    },
    buttonClassObject() {
      return {
        'button-primary': !this.isDisabled,
        'button-disabled': this.isDisabled,
      }
    }
  },
  created() {
    //获取openId
    let openId = utils.cache.get('wxConfig').openId
    console.log(openId)
    this.feedbackModel.openID = openId
    //获取user信息
    let userInfo = utils.cache.get('user')
    if(userInfo){
      console.log(utils.cache.get('user'))
      this.feedbackModel.userId = userInfo.CUserId
    }
  },
  updated() {
    let feedback = this.$el.getElementsByClassName('feedback-input')[0]
    let list = feedback.classList
    let inputLength = this.feedbackModel.content.trim().length
    this.helpText = inputLength<5&&inputLength>0? '请输入最少5个字':''
    if(list.contains('no-empty-state') && (!list.contains('error')) && inputLength>=5){
        this.isFeedbackRight = true
    }else{
        this.isFeedbackRight = false
    }   
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped >
@import 'src/assets/css/mine';
.page-feedback {
  background: #FFFFFF;
  .mine-inner-group {
    height: 100%;
    .group-title:first-child {
      padding-top: 24px;
    }
  }
  .mg-lg:last-child {
    margin-top: -20px;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss" >
@import 'src/assets/css/mine';
.page-feedback {
  .feedback-input {
    border: 1px solid $input-border-color;
    border-radius: 2px;
    .mu-text-field-hint, .mu-text-field-textarea {
      top:0px;
      padding:10px;
    }
    .mu-text-field-textarea {
      top:-4px;
      left:-2px;
      padding:10px;
      margin-bottom: 8px;
    }
    .mu-text-field-help {
      padding-left:10px;
      padding-right:10px;
      bottom: 4px;
    }
  }
  .feedback-input.focus-state {
    border: 1px solid $primary-color;
  }
  .mine-contact-mobile .mu-text-field {
    .mu-text-field-content{
      padding-top: 14px;
    }
    .mu-text-field-hint, input{
      line-height:18px;
      height: 18px;
      margin-top: 13px;
      margin-bottom: 13px;
    }
  }
}
.mu-dialog.dialog.mine-feedback-dialog {
  width: 80%;
  max-width:311px;
  height: 182px;
  text-align: center;
  .dialog-icon {
    width:38px;
    height:38px;
    margin-top:35px;
  }
  .mine-dialog-title {
    font-size:1.5rem;
    line-height:15px;
    margin-top:21px;
  }
  .mine-dialog-description {
    font-size:1.3rem;
    line-height:13px;
    padding-top:12px;
  }
}
</style>