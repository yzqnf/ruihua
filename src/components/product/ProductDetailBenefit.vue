<template>
  <div class="prod-pop-inner">
    <div class="prod-pop-title">
      <span>保障权益</span>
      <img src="../../assets/img/icon_close.png" @click="closePup"/>
    </div>

    <ionScroll class="prod-pop-content">
      <!--儿童重大疾病保障-->
      <div class="prod-bene-item" v-for="(benefit,index) in benefitList" :key="index">
        <div class="prod-item-header">
          <span class="prod-item-title">{{benefit.CNmeCn}}</span>
          <!--特殊处理-->
          <span class="prod-item-money money" v-if="benefit.CCvrgNo != '200300'">{{benefit.NAmt | moneyFilter}}元</span>
          <span class="prod-item-money" v-if="benefit.CCvrgNo == '200300'">免费赠送</span>
        </div>
        <div class="prod-item-detail">{{benefit.CCvrgDesc}}</div>
      </div>
    </ionScroll>
  </div>
</template>
<script>
import ionScroll from '../common/IonScroll'
export default {
  name:'productDetailBenefit',
  components: {
    ionScroll,
  },
  props:['benefitList'],
	methods: {
		closePup() {
			this.$emit('closePup');
		}
	}
}
</script>
<style lang="scss" scoped>
	@import 'src/assets/css/product';

	.prod-bene-item{
		padding: 10px 0px;
		margin: 0px $content-gap;
		border-bottom: 1px solid $input-border-color;
		font-size: 13px;
	}
	.prod-bene-item:last-child{
		border-bottom: none;
	}
	.prod-item-header{
		line-height: 20px;
		padding:5px 0px 10px 0px;
		display: flex;
		justify-content: space-between;
	}
	.prod-item-title{
		color: $normal-color;
		flex: 1;
    text-align: left;
	}
	.prod-item-money{
		flex:none;
		width: 100px;
		color: $price-color;
		text-align: right;
	}
	.prod-item-detail{
		color: $normal-color-light;
		line-height: 26px;
	}
</style>


