<template>
</template>

<script>
export default {
  name:'returnVisit',
  data () {
    return {
    }
  },
  methods: {
  },
  activated() {
  	//登陆后返回问卷页
  	utils.cache.set('loginToPage', '/page/questionare/' + this.$route.params.cPlyNo)
    console.log("订单id",this.$route.params)
    utils.http.post('RETURNVISIT', {returnInfo:[{CPlyNo: this.$route.params.cPlyNo}]}).then(req => {
      if ( req.data.info == '1' ) {
        this.$router.replace('/page/questionare/' + this.$route.params.cPlyNo)
      } else if ( req.data.info == '2' || req.data.info == '4' ) {
        this.$router.replace('/page/visitSuccessed')
      } else if ( req.data.info == '3' ) {
        this.$router.replace('/page/invalidLink')
      }     
    }).catch(e => {
      console.log(e)
      utils.ui.toast('网络异常')
//    this.$router.replace('/page/questionare/' + this.$route.params.cPlyNo)
      this.$router.push({ name: 'login', params: {id: '111'}})
     
    })
  }
}
</script>