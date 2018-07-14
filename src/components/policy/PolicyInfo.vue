<template>
  <!-- <page :hideFooter="'false'" wBg="true"> -->
  <div class="has_end page_policyInfo">
    <section>
      <div class="pd-lg box-bg">
        为了保障您的权益，请填写真实有效的信息。您填写的内容仅供投保使用，对于您的信息我们会严格保密。
      </div>
      <div class="group-title" style="margin-top:16px">为谁投保</div>
      <div style="margin:16px 16px;display:flex;margin-bottom: 48px;">
        <mu-flat-button @click="choosePerson(item.code)" v-for="(item,index) in relationCode" :key="index" v-bind:class="[relationship==item.code?'button-sm-active':'']" :label="item.desc" class="button-sm demo-flat-button" primary/>
      </div>
			<div style="min-height:400px">
				<transition name="slide-left">
					<Person riskType='2' :isChange.sync="certCodeChange" :validateObj="validateHolder" :isHolder="true" :title="relationship==constSet.oneself?'您的信息':'投保人信息'" :personInfo.sync="personInfo.holder" style="transition: all .25s linear;"></Person>
				</transition>
				<transition name="slide-left">
					<Person riskType='2' :isChange.sync="certCodeChange" :validateObj="validateInsure" :title="'被保人信息'" :personInfo.sync="personInfo.insureds[0]" v-if="relationship!=constSet.oneself" style="transition: all .25s linear;"></Person>
				</transition>
			</div>
    </section>
     <!-- 受益人信息 -->
    <!-- <section>
      <div class="group-title">受益人</div>
      <section class="p_padding">
        <div class="field has-img no_line has-line" @click="showBeneficiary">
          <label>法定受益人</label>
          <mu-text-field fullWidth disabled />
          <img src="../../assets/img/icon_more.png" />
        </div>
      </section>
    </section> -->
    <!-- <br/> -->
    <section>
      <ProductMsg title="填写投被保人信息" :checkObj="checkObj"></ProductMsg>
      <section class="he_footer footer_fixd">
        <div class="he_footer_item font-primary font-lg">
          <font style="font-size: 1.3rem;color: #556074;">应付</font>
          <font style="font-size: 2rem;color: #FF7431;"><font style="font-size:10px">￥</font>{{personInfo.premium|toFixedFilter}}</font>
        </div>
        <mu-raised-button style="color:white!important" :disabled="!checkObj.isChecked||!validateHolder.allStatus||(!validateInsure.allStatus && relationship!=constSet.oneself)" @click="nextStep" class="he_footer_item button-second next_btn" label="确认投保信息" />
      </section>
    </section>
    </mu-content-block>
    <!-- <BeneficiaryPop :openModal="beneficiaryModal"></BeneficiaryPop> -->
  </div>
  <!-- </page> -->
</template>

<script>
import PersonData from "./data/person";
import CodeData from "../../assets/data/CodeData";
import personObj from "./data/person";
export default {
  name: "PolicyInfo",
  components: {
    // BeneficiaryPop: r => { require.ensure([], () => r(require('./components/BeneficiaryPop')), 'beneficiaryPop1') },
    Person: r => {
      require.ensure([], () => r(require("./components/Person")), "Person");
    },
    ProductMsg: r => {
      require.ensure(
        [],
        () => r(require("./components/ProductMsg")),
        "ProductMsg"
      );
    }
  },
  data() {
    return {
			//长短险种标志
			riskType:JSON.parse(utils.cache.get("PUTPOLICYINFO").risk.productDetail).CInsrncLong,
      //按钮是否可以点击的状态
      btn_disabled: false,
      beneficiaryModal: false,
      //证件号是够改变
      certCodeChange: "1",
      //勾选对象,弹出框对象
      checkObj: {
        isChecked: false,
        openModal: false
      },
      //关系
      relationship:utils.cache.get("PUTPOLICYINFO").insureds[0].relationship ||this.constSet.oneself,
      //投保信息
      personInfo: utils.cache.get("PUTPOLICYINFO"),
      //投保人校验对象
      validateHolder: {
        name: { reset: false },
        certCode: { reset: false },
        phone: { reset: false },
        email: { reset: false },
        address: { reset: false },
        text: { reset: false },
        allStatus: false
      },
      //被保人校验对象
      validateInsure: {
        name: { reset: false },
        certCode: { reset: false },
        phone: { reset: false },
        email: { reset: false },
        address: { reset: false },
        text: { reset: false },
        allStatus: false
      },
      //是否需要重新计算保费
      hasTrial: false,
      relationCode: CodeData.relationCode
    };
  },
  methods: {
    //下一步
    nextStep() {
      console.log(this.validateInsure);
      let reqObj = {
        birthday: "",
        sex: "",
        certType: ""
			},
			isInfoCommon = false;//当关系不为本人时候 判断投保人，被保人信息是够相同
			//判断是够为身份证
      let isID =
        this.relationship == this.constSet.oneself
          ? this.personInfo.holder.certType == this.constSet.idCertType
          : this.personInfo.insureds[0].certType == this.constSet.idCertType;
      //更新数据
      if (this.relationship == this.constSet.oneself && isID) {
        //当选择本人的情况下被保人设置为本人
        reqObj.birthday = this.validateHolder.certCode.datas[0].birthDay;
        reqObj.sex = this.validateHolder.certCode.datas[0].sex == "1" ? "m" : "f";
        reqObj.certType = this.personInfo.holder.certType;
      } else if (isID) {
        //当不为本人的情况
        reqObj.birthday = this.validateInsure.certCode.datas[0].birthDay;
        reqObj.sex = this.validateInsure.certCode.datas[0].sex == "1" ? "m" : "f";
        reqObj.certType = this.personInfo.insureds[0].certType;
			}
			//新增需求 	被保人信息校验
			//当关系不为本人时候
			if(this.relationship != this.constSet.oneself){
				 let holdStr =  this.personInfo.holder.certType+"&"+this.personInfo.holder.certCode,
				  insuredStr =  this.personInfo.insureds[0].certType+"&"+this.personInfo.insureds[0].certCode;
					//判断投被保人信息
					isInfoCommon = 	 holdStr == insuredStr;
			}else{
				  isInfoCommon = false;
			}
			if(!isInfoCommon){
				if(!isID){
					this.savePolicy();
					//当未计算保费 且被保人证件号为身份证的时候
				}else if (this.hasTrial || (reqObj.birthday+"&"+reqObj.sex == this.personInfo.paramObj.TBirthday +"&"+ this.personInfo.paramObj.CSex)) {
					this.savePolicy();
				} else {
					this.personInfo.paramObj.TBirthday = reqObj.birthday;
					this.personInfo.paramObj.CSex = reqObj.sex;
					//进行保费试算
					this.tril(this.personInfo.paramObj);
				}
			}else{
				utils.ui.toast("投被保人信息不能相同");
			}
    },
    //保存订单信息
    savePolicy() {
      if (this.relationship == this.constSet.oneself) {
        //当选择本人的情况下讲被保人设置为本人
        let obj = JSON.parse(JSON.stringify(this.personInfo.holder));
        obj.relationship = this.relationship;
        this.personInfo.insureds[0] = obj;
      } else {
        //当不为本人的情况
        this.personInfo.insureds[0].relationship = this.relationship;
      }
      this.$store.commit("PUTPOLICYINFO", this.personInfo);
      // console.log(this.personInfo, JSON.stringify(this.personInfo));
      utils.http
        .post("ORDERSAVEHOLDER", this.personInfo)
        .then(response => {
          // let req = { "COrderCde": this.personInfo.orderId };
          //订单落地
          this.personInfo.optStatus = "1";
          utils.http
            .post("RHORDERLANDING", this.personInfo)
            .then(response => {
              //保单CODE
              this.personInfo.orderNo = response.data.orderResult.COrderCde;
              //保存信息
              this.$store.commit("PUTPOLICYINFO", this.personInfo);
              this.$router.push("policyMsg");
            })
            .catch(error => {
              utils.ui.toast(error.errorMessage);
            });
        })
        .catch(error => {
          utils.ui.toast(error.errorMessage);
        });
    },
    //改变受益人信息
    showBeneficiary() {
      this.beneficiaryModal = !this.beneficiaryModal;
    },
    //改变关系
    choosePerson(type) {
      // 0	本人
      // 31	父母
      // 32	子女
      // 33	配偶
      this.relationship = type;
      // 当进入时关系为本人的情况下，清除被保人信息
      if (this.relationship == this.constSet.oneself) {
        // Object.prototype.clearInsuredInfo = function() {
        //   console.log(this)
        //   for (var key in this) {
        //     if (key != 'relationship') this[key] = null;
        //   }
        // }
        // this.personInfo.insureds[0].clearInsuredInfo();
        for (var key in this.personInfo.insureds[0]) {
          if (key != "relationship") this.personInfo.insureds[0][key] = null;
        }
        // this.validateInsure.needRet = !this.validateInsure.needRet;
      } else {
        this.validateInsure.allStatus = false;
      }
    },
    //试算保费
    tril(req) {
      utils.http.post("RHCALCULATION", req).then(response => {
        if (
          !response.data.calPremium ||
          !response.data.calPremium.base ||
          response.data.calPremium.base.nPrm == 0
        ) {
					this.hasTrial = false;
					let hintList=[];
					for(let value of response.data.calPremium.errorMsg){
						for(let i in value){
							hintList.push(value[i])
						}
          }
          utils.ui.toast(hintList[0]);
        } else {
          this.hasTrial = true;
          this.personInfo.risk.calculateJson = JSON.stringify(
            response.data.calPremium
          );
          this.personInfo.premium = response.data.calPremium.base.NPrm;
          utils.ui.toast("由于信息改变，应付金额已经重新计算，请检查金额后确认信息");
        }
      }).catch(error=>{
				this.hasTrial = false;
			});
    }
  },
  //监听页面离开事件
  beforeRouteLeave(to, from, next) {
    next(!this.checkObj.openModal);
    if (this.checkObj.openModal) {
      this.checkObj.openModal = false;
      utils.wx.wxSetTitle("填写投被保人信息");
    }
  },
  watch: {
    //监听证件号码的变化
    certCodeChange(curVal, oldVal) {
      this.hasTrial = false;
    }
  },
  created() {
    // if (this.relationship == '0') {
    //当进入时关系为本人的情况下，清除被保人信息
    // Object.prototype.clearInfo = function() {
    // for (var key in this.personInfo.insureds[0]) {
    //   if (key != 'relationship') this[key] = null;
    // }
    // }
    // this.personInfo.insureds[0].clearInfo();
    // }
		// this.personInfo = utils.cache.get("PUTPOLICYINFO");
		// console.log("产品信息",JSON.parse(utils.cache.get("PUTPOLICYINFO").risk.productDetail.CInsrncLong))

	},
	mounted(){
		// this.personInfo = utils.cache.get("PUTPOLICYINFO");
		// this.riskType = JSON.parse(this.personInfo.risk.productDetail).CInsrncLong;
		// this.relationship =  this.personInfo.insureds[0].relationship ||this.constSet.oneself;
	},
  beforeRouteEnter: (to, from, next) => {
    //进入页面的时候 对数据进行初始化
    next(vm => {
      if (
        vm.personInfo.insureds &&
        vm.personInfo.insureds.length == 1 &&
        vm.relationship == vm.constSet.oneself
      ) {
        vm.personInfo.insureds = [
          {
            name: "",
            certType: "",
            certCode: "",
            phone: "",
            email: "",
            province: "",
            provinceDesc: "",
            city: "",
            cityDesc: "",
            county: "",
            countyDesc: "",
            address: "",
            relationship: "00"
          }
        ];
      }
    });
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" >
.page_policyInfo {
  .slide-up {
    transition: all 1.23 linear;
  }
  .button-sm {
    // flex: 0 0 23%;
    width: 56px;
    height: 30px;
    .mu-flat-button-label {
      padding: 0px;
      font-size: 1.3rem;
    }
  }
  .mg_border_b {
    border-bottom: 1px solid gainsboro;
  }
  .field label:first-child {
    font-size: 1.3rem !important;
  }
  .p_padding {
    padding: 16px;
    padding-bottom: 8px;
  }
  .mu-content-block {
    min-height: 480px;
  }
  .button-sm-relationship {
    background: rgb(82, 199, 80);
    color: white;
  }
  .field img {
    height: 1.2rem;
    margin-top: 15px;
    position: absolute;
    z-index: 2;
    right: 14px;
    background: white;
  }
  .mu-dropDown-menu-text-overflow {
    font-size: 1.3rem;
  }
  .no_line {
    .mu-text-field-line.disabled {
      display: none;
    }
  }

  .has-line {
    border-bottom: 1px solid rgb(233, 236, 238);
    height: 47px;
  }
}
</style>
