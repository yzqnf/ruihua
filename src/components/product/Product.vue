<template>
	<page isListenerScroll="true" class="has-header pro-inner proList-inner no-padding" ref="pageCompontent">
    <div class="pro-padding" style="background: #F9F9F9;">
      <div class="pro-title">瑞华推荐</div>
      <div class="pro-detail" style="margin-bottom: 10px">为健康更有保障、生活更加美好、生命更有尊严</div>
      <img src="../../assets/img/product-header.png" width="100%">
    </div>
    <div class="nav prod-nav" id="nav-sticky">
      <mu-tabs :value="activeTab" @change="handleTabChange" class="tab" style="font-szie:13px">
        <mu-tab class="pro-nav-bar" value="" title="全部"/>
        <mu-tab class="pro-nav-bar" v-bind:value="productType.CKindNo" v-for="(productType,index) in productTypeList" :key="index" v-bind:title="productType.CNmeCn"/>
      </mu-tabs>
    </div>
    <div class="pro-list pro-list-padding">
      <div v-for="(product,index) in productList" :key="index" @click="go(product)">
        <div class="pro-item" gutter>
          <div class="pro-item-img"><img :src="imageUrl+product.CProdNo+'/list1.jpg'" width="100%"></div>
          <div class="pro-item-content">
            <div class="pro-item-title">{{product.CNmeCn}}</div>
            <div class="pro-item-detail">{{product.CProdDesc}}</div>
            <div class="pro-item-money">
              ￥<span class="money">{{product.NMinPrm}}</span>/起
            </div>
          </div>
        </div>
        <div class="pro-item-hintSuper">
          <div class="pro-item-hint">
            <img src="../../assets/img/icon-merit.png">
            <span>保额递增</span>
          </div>
          <div class="pro-item-hint">
            <img src="../../assets/img/icon-merit.png">
            <span>癌症绿通</span>
          </div>
          <div class="pro-item-hint">
            <img src="../../assets/img/icon-merit.png">
            <span>百万保额</span>
          </div>
        </div>
      </div>
    </div>
	</page>
</template>
<script>
	export default {
		name: 'product',
		data(){
			return{
				activeTab:'',
        productList: [], //产品列表
        productTypeList: [], //产品大类列表
        imageUrl: globalConfig.imageUrl, //图片服务器URL
			}
		},
		methods:{
      //选择产品大类
			handleTabChange:function(val){
        this.activeTab = val;
        //获取当前类型的产品
        this.getProductList(this.activeTab);
        //返回前面
        document.body.scrollTop = document.getElementById("nav-sticky").offsetTop;
			},
			go:function(product){
				this.$router.push({name:'productDetail', params:{productId:product.CProdNo}})
      },

      //获取产品类型列表
      getProductTypeList(){
        utils.http.post('RHPRODUCTLIST', {"requestPayload":""}).then(req => {
          console.log(req);
          this.productTypeList = req.data.prodKindList;
        })
      },

      //获取产品列表
      getProductList(typeNo = ''){
        this.productList = [];
        utils.http.post('RHPRODUCTTOI', { "cKindNo":typeNo}).then(req => {
          for(let i in req.data.prodList){
            if(!typeNo || req.data.prodList[i].CKindNo == typeNo){
              this.productList.push(req.data.prodList[i])
            }
          }
          console.log(this.productList)
        })
      },
		},
		created(){
      this.getProductTypeList();
      this.getProductList();
    },
    //当离开的时候
    beforeRouteLeave (to, from, next) {
      //关闭滚动监听
      this.$refs.pageCompontent.closeEventListener();
      next();
    },
	}

</script>
<style lang="scss" scoped>
	@import 'src/assets/css/product';

	.pro-title{
    margin-top: 5px;
		font-size: 19px;
    line-height: 25px;
		color: $normal-color;
	}
	.pro-detail{
		color: #727D92;
		font-size: 12px;
		line-height: 18px;
	}
	.mu-tab-text{
  }
  .pro-list-padding{
    padding: 1px $content-gap 10px 16px;
  }
	.pro-item{
    margin-top: 20px;
    display: flex;
  }
  .pro-item-img{
    flex: none;
    width: 30%;
    min-width: 100px;
  }
	.pro-item-content{
    flex: 1;
		padding:3px 5px 3px 15px;
	}
	.pro-item-title{
		line-height: 20px;
		font-size: 13px;
		font-weight:bold;
		color: $normal-color;
	}
	.pro-item-detail{
		line-height: 20px;
		font-size: 12px;
		color: $normal-color-light;
	}
	.pro-item-money{
		color: $price-color;
		font-size: 12px;
	}
	.pro-item-money span{
		font-size: 15px;
	}
	.pro-item-hintSuper{
		margin: 3px 0px 26px 0px;
		background: $title-bgColor;
    padding: 0px 6px;
    height: 30px;
    line-height: 30px;
	}
	.pro-item-hint{
		display: inline-block;
		margin-right:4px;
	}
	.pro-item-hint img{
		width: 12px;
		height: 12px;
		vertical-align: middle;
	}
	.pro-item-hint span{
		color: $normal-color-light;
		font-size: 12px;
		vertical-align: middle;
  }

  //更改nav tab字体颜色
  .pro-nav-bar{
    font-size: 13px;
  }
</style>
