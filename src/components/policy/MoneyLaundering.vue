<template>
	 <div class=" page_moneyQuestion">
		 <div class="header_content">
				<p>亲爱的客户，您好！</p>
				每个问题均有“是”和“否“两个选项，默认选择“否”（样式可参考在线回访问卷样式），具体问题如下：
		 </div>
		 <div class="money-title">
			 开始答题
		 </div>
		 <div class="money-content">
			 	<div class="money-content-item" v-for="(item,index) in list" :key="index">
					<div class="line1">
						{{index+1}}、{{item.text}}
					</div>
					<div class="line2">
						 <mu-radio style="margin-right: 43px;" label="是" :name="item.value" :nativeValue="item.value1" v-model="item.text1" class="choose-radio"/> 
						 <mu-radio label="否" :name="item.value" :nativeValue="item.value" v-model="item.text1" class="choose-radio"/> <br/>
					</div>
				 </div>
		 </div>
		 <div class="he_footer footer_fixd">
        <mu-raised-button class="next_btn" @click="back" label="确定" />
		 </div>
	 </div>
</template>
<script>
import data from "../../assets/data/moneyLaundering.json";
export default {
  name: "moneyQuestion",
  data() {
    return {
      value: "simple12",
      bottomPopup: false,
      list: JSON.parse(JSON.stringify(data))
    };
  }
};
</script>
<style lang="scss">
@import "src/assets/css/vars";
.page_moneyQuestion {
  background: $pageBgColor;
  padding-bottom: 80px;
  .header_content {
    margin: 0 $pd-lg 0 $pd-lg;
    font-size: $font-sm;
    color: $normal-color;
    letter-spacing: 0;
    line-height: 26px;
    padding-top: $pd-lg;
    padding-bottom: 14px;
    border-bottom: 1px dotted $memo-color-light;
    // margin: 0 $pd-lg 0 $pd-lg;
    p {
      margin: 0px;
    }
  }
  .money-title {
    font-size: $font-lg;
    color: $normal-color;
    line-height: 13px;
    padding: $pd-lg;
  }
  .money-content {
    .money-content-item {
      min-height: 100px;
      background: white;
			margin: 0 $pd-lg 0 $pd-lg;
			border-radius: 2px;
      .line1 {
        font-size: $font-sm;
        color: $normal-color;
        letter-spacing: 0;
        line-height: 21px;
        padding-top: 19px;
        padding-bottom: 9px;
        margin: 0px $pd-lg 0px $pd-lg;
        border-bottom: 1px solid $memo-color-light;
      }
      .line2 {
        height: 50px;
        display: flex;
        align-items: center;
        padding-right: 32px;
        justify-content: flex-end;
        .choose-radio {
          .mu-radio-icon-uncheck {
            color: $memo-color-light;
          }
          // height: 10px;
          // width: 10px;
          .mu-radio-icon {
            height: 16px;
            margin-right: 5px;
          }
          .mu-radio-svg-icon {
            height: 16px;
          }
          .mu-radio-label {
            font-size: 13px;
            color: $normal-color;
          }
        }
      }
    }
    & > :not(:first-child) {
      margin-top: 10px;
    }
  }
  .next_btn {
    width: 100%;
    text-align: center;
    color: $primary-color;
  }
}
</style>
