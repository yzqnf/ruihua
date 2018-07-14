<template>
  <div class="page">
    <div class="text1">
      <div>亲爱的客户，您好！</div>
      <div>感谢您选择了瑞华健康保险股份有限公司的保险产品，为确保您的权益得到切实保障,请您对回访问题进行如实答复，谢谢!</div>
    </div>
    <div class="line"></div>
    <div class="text2">
      开始答题
    </div>
    <div class="question-area clearfix" v-for="item in questionList">
      <div class="question" :class="item.CQuestionSts">
        {{item.CQuestionContent}}
      </div>
      <div class="question-line"></div>
      <div class="answer">
        <mu-radio label="是" :name="item.CQuestionId" nativeValue="1" v-model="item.CQuestionReq" labelClass="answer-label" :labelClass="item.CQuestionSts"/>
        <mu-radio label="否" :name="item.CQuestionId" nativeValue="0" v-model="item.CQuestionReq" labelClass="answer-label" :labelClass="item.CQuestionSts"/>
      </div>
    </div>
    <div class="box"></div>
    <div class="fixed-box">
      <div class="fixed-box-left" @click="submit('1','RETURNSAVE')">暂存问卷</div>
      <div class="vertical-line"></div>
      <div class="fixed-box-right" @click="completeButton">完成问卷</div>
    </div>
    <mu-dialog :open="pauseDialog" dialogClass="visit-dialog">
      <img class="pause-img" src="../../assets/img/icon_pause.png">
      <div class="pause-title">暂存成功</div>
      <div class="pause-text">您可在承保后3天内继续完成已暂存的问卷</div>
    </mu-dialog>
    <mu-dialog :open="completeDialog" dialogClass="visit-dialog">
      <img class="complete-img" src="../../assets/img/icon_complete.png">
      <div class="complete-title">问卷提交成功感谢您的配合</div>
    </mu-dialog>
    <mu-dialog :open="warningDialog" dialogClass="warning-dialog">
      <img class="warning-img" src="../../assets/img/icon_issue.png">
      <div class="warning-title">
        <div>问卷中有否定答案</div>
        <div>后续工作人员将用固话</div>
        <div>021-6037-6868为您做电话确认</div>
      </div>
      <div class="warning-comfirm" @click="warningClose('confirm')">确定</div>
      <div class="warning-modify" @click="warningClose()">修改</div>
    </mu-dialog>
    <mu-dialog :open="warningDialog2" dialogClass="warning-dialog">
      <img class="warning-img" src="../../assets/img/icon_issue.png">
      <div class="warning-title">
        <div>问卷中有未确认的问题</div>
        <div>请完成后提交</div>
      </div>
      <div class="warning-return" @click="warningClose2()">返回</div>
    </mu-dialog>
  </div>
</template>

<script>
export default {
  name:'questionare',
  data () {
    return {
      cPlyNo: this.$route.params.cPlyNo,
      pauseDialog: false,
      completeDialog: false,
      warningDialog: false,
      warningDialog2: false,
      questionList: [], //问题列表
      fromDetail: utils.cache.get('detailToVisit'), //是否从保单详情进入
    }
  },
  methods: {
    //跳转其他页面
    go(name) {
      this.$router.push({ name: name })
    },
    /* 
      模态层开关
    */
    pauseOpen () {
      this.pauseDialog = true
      var that = this
      setTimeout(function () {  
       	that.pauseClose();  
     	}, 2000)
    },
    pauseClose () {
      this.pauseDialog = false
      if(this.fromDetail == 'true'){
      	this.back()
			} else {
  			utils.wx.wxClose()
			}
    },
    completeOpen () {
      this.completeDialog = true
      var that = this
      setTimeout(function () {  
       	that.completeClose();  
     	}, 2000)
    },
    completeClose () {
      this.completeDialog = false
      if(this.fromDetail == 'true'){
      	this.back()
			} else {
  			utils.wx.wxClose()
			}
    },
    warningOpen () {
      this.warningDialog = true
    },
    warningClose (value) {
      this.warningDialog = false
      if ( value=='confirm' ) {
        this.submit('2','RETURNCOMMIT')
      } else {
      	for (var i = 0; i < this.questionList.length; i++) {
	        if (this.questionList[i].CQuestionReq != '1') {
	          this.questionList[i].CQuestionSts = "red"
	        } else {
	        	this.questionList[i].CQuestionSts = ""
	        }
	      }
      }
    },
    warningOpen2 () {
      this.warningDialog2 = true
    },
    warningClose2 () {
      this.warningDialog2 = false
  		for (var i = 0; i < this.questionList.length; i++) {
        if (this.questionList[i].CQuestionReq == '1' || this.questionList[i].CQuestionReq == '0') {
          this.questionList[i].CQuestionSts = ""
        } else {
        	this.questionList[i].CQuestionSts = "red"
        }
      }
    },
    completeButton () {
    	var flag = "1"
      for (var i = 0; i < this.questionList.length; i++) {
        if (this.questionList[i].CQuestionReq != '1' && this.questionList[i].CQuestionReq != '0') {
          this.warningOpen2()
          break
        }
        if (this.questionList[i].CQuestionReq == '0') {
        	flag = "0"
        }
        if (i == this.questionList.length - 1) {
        	if (flag == "0") {
        		this.warningOpen()
        	} else {
        		this.submit('4','RETURNCOMMIT')
        	}
        }
      }
    },
    // 提交、暂存
    submit (status,value) {
      let requestParam = {
        status: status,
        returnInfo: this.questionList,
      }
      utils.http.post(value, requestParam).then(req => {
        console.log(req)
        if ( status == '1' ) {
          this.pauseOpen()
        } else if ( status == '4' ) {
          this.completeOpen()
        } else if ( status == '2' ) {
      		if(this.fromDetail == 'true'){
		      	this.back()
					} else {
		  			utils.wx.wxClose()
					}
        }    
      }).catch(e => {
        utils.ui.toast('网络异常,提交失败')
      })
    }
  },
	activated() {
//		alert(1)
//  let user = utils.cache.get('user');
    let requestParam = {
//    CAppName: user.CName,//投保人姓名 *,  
//    CCertfCde: user.CCertfCde,//证件号码 *
//    CCertfCls: user.CCertfCls,//证件类型 *
//    COprCde: user.CUserId,//操作人
			openId: utils.cache.get('wxConfig').openId,
      ststList: ['0','1'],
      returnInfo:[{
        CPlyNo: this.$route.params.cPlyNo //保单号
      }]
    }
    utils.http.post('RETURNVISIT', requestParam).then(req => {
      console.log(req)
      if ( req.data.info == 'false' ) {
      	
      	//核身失败，返回提示
        utils.ui.dialog(
	        '当前用户与保单号不匹配',
	        require("../../assets/img/common/icon_warning.png"),
	        ["返回登陆", "关闭"],
	        index => {
	          if (index == "0") {
	            //清除登录数据
			        utils.cache.removeItem('user');
			        this.$store.commit('LOGIN', undefined);
			        //登陆后返回问卷页
			        utils.cache.set('loginToPage', '/page/questionare/' + this.$route.params.cPlyNo);
			      	//重新进入回访
			      	this.$router.push({ name: 'login', params: {id: 'wx'}});
//							this.go('/page/login/wx')
	          } else {
	            utils.wx.wxClose();
	          }
	        }
	      );
        
      } else {
        this.questionList = req.data.visitTemp
      }     
    }).catch(e => {
      console.log(e)
      this.questionList = []
      utils.ui.toast('网络异常')
    })
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.text1 {
  width: calc(100%-32px);
  height: 104px;
  margin: 14px 16px;
  font-size: 13px;
  color: #394043;
  letter-spacing: 0;
  line-height: 26px;
  span {
    color: #EE6723;
  }
}
.line {
  width: calc(100%-32px);
  border: 1px dotted #BABEC6;
  margin: 0 16px;
  clear: both;
}
.text2 {
  float: left;
  margin: 16px;
  font-size: 15px;
  color: #394043;
  line-height: 13px;
}
.question-area { //问题区
  width: calc(100%-32px);
  clear: both;
  margin: 0 16px;
  margin-bottom: 10px;
  background: #FFFFFF;
  border-radius: 2px;
  padding: 19px 16px 16px 16px;
  .question {
    width: 100%;
    margin-bottom: 10px;
    font-size: 13px;
    color: #394043;
    letter-spacing: 0;
    line-height: 21px;
  }
  .question-line {
    border: 1px solid #E9ECEE;
    width: 100%;
  }
  .answer {
    float: right;
    height: 16px;
    margin-top: 16px;
  }
}
.clearfix:after {
  content:".";
  display:block;
  height:0;
  clear:both;
  visibility:hidden;
}
.box {
  height: 50px;
}
.fixed-box { // 下方按钮
  font-size: 17px;
  color: #52C750;
  letter-spacing: 0;
  line-height: 17px;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background: #FFFFFF;
  box-shadow: 0 -3px 10px 0 rgba(186,190,198,0.30);
  .fixed-box-left {
    position: absolute;
    width: 70px;
    height: 17px;
    left: 65px;
    bottom: 16px;
  }
  .vertical-line {
    position: absolute;
    left: 50%;
    height: 100%;
    border: 1px solid #E9ECEE;
  }
  .fixed-box-right {
    position: absolute;
    right: 64px;
    bottom: 16px;
    width: 70px;
    height: 17px;
  }
}
.pause-img {
  width:30px;
  height: 32px;
  position:absolute;
  top: 35px;
  left: 141px;
}
.pause-title {
  position:absolute;
  top: 92px;
  left: 126px;
  width: 60px;
  font-size: 15px;
  color: #394043;
  line-height: 15px;
}
.pause-text {
  position: absolute;
  top: 119px;
  left: 54.5px;
  width: 203px;
  font-size: 13px;
  color: #394043;
  line-height: 15px;
}
.complete-title {
  width: 90px;
  position: absolute;
  top: 87px;
  left: 111px;
  font-size: 15px;
  color: #394043;
  line-height: 26px;
}
.warning-img {
  width: 34px;
  height: 34px;
  position:absolute;
  top: 34px;
  left: 139px;
}
.warning-title {
  width: 263px;
  height: 78px;
  position: absolute;
  top: 87px;
  left: 24px;
  font-size: 15px;
  color: #394043;
  line-height: 26px;
}
.warning-comfirm {
  font-size: 17px;
  color: #52C750;
  line-height: 17px;
  height: 49.5px;
  width: 155.3px;
  padding: 15.5px 60.3px 17px 60px;
  border-top: 0.5px solid #BABEC6;
  border-right: 0.5px solid #BABEC6;
  position: absolute;
  bottom: 0;
  left: 0;
}
.warning-modify {
  font-size: 17px;
  color: #52C750;
  line-height: 17px;
  height: 49.5px;
  width: 155.2px;
  padding: 15.5px 58px 17px 63.2px;
  border-top: 0.5px solid #BABEC6;
  position: absolute;
  bottom: 0;
  right: 0;
}
.warning-return {
	font-size: 17px;
  color: #52C750;
  line-height: 49.5px;
  height: 49.5px;
  width: 100%;
  border-top: 0.5px solid #BABEC6;
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
<style type="text/css">
/*按钮样式*/
.question-area .mu-radio {
  height: 16px;
  line-height: 16px;
  margin-left: 40px;
}
.question-area .mu-radio .mu-ripple-wrapper {
  height: 24px;
  width: 24px;
  top: -4px;
  left: -6px;
}
.question-area .mu-radio-wrapper {
  height: 16px;
  line-height: 16px;
}
.question-area .mu-radio-svg-icon,.question-area .mu-radio-icon {
  height: 14px;
  width: 14px;
}
.question-area .answer-label {
  height: 16px;
  font-size: 13px;
  color: #394043;
  letter-spacing: 0;
}
.question-area .red {
  color: red !important;
}
/*暂存/完成框*/
.visit-dialog {
  width: 311px !important;
  height: 182px;
  position: absolute;
  top: 112px;
  left: 50%;
  margin-left: -155.5px;
  text-align: center;
}
.complete-img {
  width: 27.2px;
  height: 31.4px;
  position: absolute;
  top: 35px;
  left: 142.6px;
}
/*警告框*/
.warning-dialog {
  width: 311px !important;
  height: 237px;
  position: absolute;
  top: 112px;
  left: 50%;
  margin-left: -155.5px;
  text-align: center;}
</style>