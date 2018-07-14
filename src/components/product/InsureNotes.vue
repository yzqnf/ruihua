<template>
  <page hideFooter="true" class="pro-inner no-padding">
    <zoom title="投保须知" :show.sync="showZoom" :dialog="false">
      <img v-for="n in imageLength" :key="n" :src="'./static/notic/'+n+'.jpg'" width="100%">
    </zoom>
  </page>
</template>
<script>
  import zoom from '../common/Zoom.vue'
	export default{
    name: 'insureNotes',
    components:{
      zoom
    },
    data() {
      return {
        showZoom: true,
        imageLength: 2, //图片展示数量
      }
    },
    methods: {
       //获取投保须知
      getinsureNotes(){
        utils.http.post('RHPRODUCTBILITY', { "CProdNo": "3120" }).then(req => {
          console.log(req)
        })
      }
    },
    created(){
      this.getinsureNotes();
    }
	}
</script>
<style lang="scss" scoped>
@import 'src/assets/css/product';
</style>
