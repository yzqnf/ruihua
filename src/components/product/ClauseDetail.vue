<template>
  <page hideFooter="true" class="pro-inner no-padding">
    <zoom title="投保须知" :show.sync="showZoom" :dialog="false">
      <img v-for="n in imageLength" :key="n" :src="'./static/clause/'+n+'.jpg'" width="100%">
    </zoom>
  </page>
</template>
<script>
  import zoom from '../common/Zoom.vue'
	export default{
    name: 'clauseDetail',
    components:{
      zoom
    },
    data(){
      return {
        showZoom:true,
        imageLength: 12, //图片展示数量
      }
    },
    created(){
    }
	}
</script>
<style lang="scss" scoped>
@import 'src/assets/css/product';
</style>
