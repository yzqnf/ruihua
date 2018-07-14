<template>
  <div class="page">
    <mu-appbar title="微信调试">
      <mu-icon-button @click="back" icon="chevron_left" slot="left"/>
      <mu-icon-button disabled slot="right"/>
    </mu-appbar>

    <mu-content-block class="has-header has-footer">
      <mu-row>
        <mu-col width="50">
          <mu-raised-button @click="token" label="accessToken" class="demo-raised-button" primary/>
        </mu-col>
        <mu-col width="50">
          <mu-raised-button @click="menu" label="自定义菜单" class="demo-raised-button" primary/>
        </mu-col>
      </mu-row>
      <mu-row>
        <mu-col width="50">
          <mu-raised-button label="获取基本信息" class="demo-raised-button" primary/>
        </mu-col>
        <mu-col width="50">
          <mu-raised-button label="分享链接" class="demo-raised-button" primary/>
        </mu-col>
      </mu-row>
    </mu-content-block>
  </div>
</template>

<script>
  const wechat = {
    appid:'wx0e23bb0447b3a75e',
    appsecret:'7a252e2c0b25e0917b0b75852c51de8f',
    url:'http://n22rh.ngrok.cc/com.ifp.ipartner/weixin',
    accessToken:'3oRCcnWP2HaSmTFDYFm0KJ9JNpyxPmE7uLr3rfJCdxdj_weuzkxo77S8xRS59BFqgAkn99Hl663GFTekzOCf3os8ZPJ79iDRbIbUrewj8jRmgYQkSA-daMyypJRF6bisFUJcADAZOD',
    token:'22'
  }
  export default {
    name: 'wechat',
    data () {
      return {
        accessToken:'',

      }
    },
    methods: {
      token() {
        const url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+wechat.appid+'&secret='+wechat.appsecret+''
        utils.http.axios({
          url: url ,
          headers: {"Access-Control-Allow-Origin": "*"}
        }).then(response => {
          console.log(response)
        })
      },
      menu() {
        const url = 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token='+wechat.accessToken
        const menuJson = {
          "button":[{  
            "type":"click",
            "name":"今日歌曲",
            "key":"V1001_TODAY_MUSIC"
            },{
            "name":"菜单",
            "sub_button":[{  
             "type":"view",
             "name":"搜索",
             "url":"http://www.soso.com/"
            },{
             "type":"click",
             "name":"赞一下我们",
             "key":"V1001_GOOD"
            }]
          }]
        }

        utils.http.axios({
          method: 'post',
          url: url ,
          data: menuJson,
          headers: {
            "Access-Control-Allow-Origin": "*",
            post: {
              'Content-Type': ''
            }
          }
        }).then(response => {
          console.log(response)
        })
      },
      userinfo() {

      },
      share() {
        
      }
    },
    mounted () {
      
    }
  }
</script>
<style scoped>
  .row{
    margin-bottom:10px;
  }
</style>