<template>
  <div class="person-info">
    <section>
      <!-- 本人 -->
      <section style="transition: all .25s linear;">
        <div class="mg-lg" style="text-align:left;">
          <div class="show_item">姓名
            <span>{{personInfo.name}}</span>
          </div>
        </div>
        <div class="mg-lg" style="text-align:left;">
          <div class="show_item">证件类型
            <span>{{personInfo.certType|commonFilter('certCode')}}</span>
          </div>
        </div>
        <div class="mg-lg" style="text-align:left;">
          <div class="show_item">证件号码
            <span>{{personInfo.certCode}}</span>
          </div>
        </div>
        <div class="mg-lg" style="text-align:left;">
          <div class="show_item">电话
            <span>{{personInfo.phone}}</span>
          </div>
        </div>
        <div class="mg-lg" style="text-align:left;">
          <div class="show_item">电子邮箱
            <span>{{personInfo.email}}</span>
          </div>
        </div>
        <div class="mg-lg " style="text-align:left;">
          <div class="show_item content_l">常住地
            <span class="text_lang" style="overflow:scroll;width:auto;text-align:left;max-width:60%;word-break:break-all">{{personInfo.county | addressFilter}}{{personInfo.address}}</span>
          </div>
        </div>
      </section>
    </section>
    <!-- 地址控件 -->
  </div>
</template>
<script>
export default {
  name: 'personMsg',
  components: {
  },
  data() {
    return {
    }
  },
  props: {
    personInfo: Object,//标题
  },
  watch: {
  },
}
</script>
<style lang='scss' scoped>
.content_l {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

