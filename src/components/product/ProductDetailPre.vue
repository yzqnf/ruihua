<template>
  <div class="prod-pop-inner">
    <div class="prod-pop-title">
      <span>保费试算</span>
      <img src="../../assets/img/icon_close.png" @click="closePup"/>
    </div>

    <ionScroll class="prod-pop-content">
      <!--保障计划-->
      <div v-if="productConfig.insureCode">
        <div class="pro-bar">
          <div class="pro-bar-param">保障计划</div>
        </div>
        <div class="prod-pre-select">
          <select-button :selectList = "productConfig.insureCode" v-on:clickItem="clickItem()" :selectModel.sync = "insure.NAmt"></select-button>
        </div>
      </div>

      <!--出生日期-->
      <div class="pro-bar">
        <div class="pro-bar-param">被保险人出生日期</div>
        <div class="pro-bar-detail" v-if="productConfig.birthdayHint">{{productConfig.birthdayHint}}</div>
      </div>
      <datetime v-model="insure.TBirthday" v-on:update="clickItem()" :icon="true" :isBirthday="true" class="prod-pre-date" hintText="请选择日期"></datetime>

      <!--性别-->
      <div v-if="productConfig.sexCode">
        <div class="pro-bar">
          <div class="pro-bar-param">性别</div>
        </div>
        <div class="prod-pre-select">
          <select-button :selectList = "productConfig.sexCode" v-on:clickItem="clickItem()" :selectModel.sync = "insure.CSex"></select-button>
        </div>
      </div>

      <!--社保-->
      <div v-if="productConfig.CIsSocCode">
        <div class="pro-bar">
          <div class="pro-bar-param">是否有社保</div>
        </div>
        <div class="prod-pre-select">
          <select-button :selectList = "productConfig.CIsSocCode" v-on:clickItem="clickItem()" :selectModel.sync = "insure.CIsSoc"></select-button>
        </div>
      </div>

      <!--保险期限-->
      <div v-if="productConfig.insuredTimeCode">
        <div class="pro-bar">
          <div class="pro-bar-param">保险期限</div>
        </div>
        <div class="prod-pre-select">
          <select-button :selectList = "productConfig.insuredTimeCode" v-on:clickItem="clickItem()" :selectModel.sync = "insure.CInsuYear"></select-button>
        </div>
      </div>

      <!--交费类型-->
      <div v-if="productConfig.typeCode">
        <div class="pro-bar">
          <div class="pro-bar-param">缴费类型</div>
        </div>
        <div class="prod-pre-select">
          <select-button :selectList = "productConfig.typeCode" v-on:clickItem="clickItem()" :selectModel.sync = "insure.CFinTyp"></select-button>
        </div>
      </div>

      <!--交费年限-->
      <div v-if="productConfig.termCode">
        <div class="pro-bar">
          <div class="pro-bar-param">缴费年限</div>
        </div>
        <div class="prod-pre-select">
          <select-button :selectList = "productConfig.termCode" v-on:clickItem="clickItem()" :selectModel.sync = "insure.NPayTime"></select-button>
        </div>
      </div>
      <div style="width:100%;height:90px"></div>
    </ionScroll>
  </div>
</template>
<script>
import selectButton from '../common/SelectButton'
import datetime from '../common/Datetime'
import ionScroll from '../common/IonScroll'
import codeData from '../../assets/data/CodeData'

export default {
	name: 'productDetailPre',
	components: {
    selectButton,
    datetime,
    ionScroll
  },
  props:['insure','productConfig'],
	data(){
		return{
			//保障计划
			insureList:codeData.insureCode,
			//性别
			sexList: codeData.sexCode,
			//保险期限
			insuredTimeList: codeData.insuredTimeCode,
			//交费类型
			typeList: codeData.typeCode,
			//交费年限
      termList: codeData.termCode,
		}
  },
	methods:{
		closePup(){
			this.$emit('closePup');
      console.log(this.insure)
    },
    //保费试算
    clickItem(){
      this.$emit('premiumCount');
    },
  },
  mounted(){
    console.log(this.productConfig)
  }
}
</script>
<style lang="scss" scoped>
	@import 'src/assets/css/product';

	.prod-pre-select{
		padding: 0px $content-gap;
	}
	.prod-pre-date{
    margin: 0px 10px;
    width: calc(100% - 20px)
	}
</style>


