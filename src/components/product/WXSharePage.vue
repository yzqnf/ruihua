<template>
  <div></div>
</template>

<script>
export default {
  name: 'wxSharePage',
  mounted(){
    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+globalConfig.appId+"&redirect_uri="+globalConfig.rootUrl+"weixin/redirect&response_type=code&scope=snsapi_userinfo&state=productDetail_"+this.$route.params.productId+"#wechat_redirect";
  }
}
</script>
