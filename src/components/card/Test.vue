<!-- The ref attr used to find the swiper instance -->
<!-- 插件地址：https://github.com/surmon-china/vue-awesome-swiper -->
<template>
  <div class="page">
    <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper" class="swiper-container swiper-basic">
      <!-- slides -->
      <!-- 第一页 -->
      <swiper-slide class="swiper-page-one swiper-basic"></swiper-slide>
      <!-- 第二页 -->
      <swiper-slide class="swiper-basic">
          <div class="mask-layer">
            <p class="title-img-container"><img src="../../assets/img/card/title_tqhl.png" class="title-img-tqhl"></p>
            <div class="tab-container">
              <table  cellspacing="0" class="table-privilege">
                <tr style="font-size:1.2rem;">
                  <th width=66% class="layout-border">金卡<br>服务类型</th>
                  <th width=17% class="layout-border">瑞华保险<br>信用卡 </th>
                  <th width=17% class="layout-border">普通<br>信用卡</th>
                </tr>
                <tr>  
                  <td>百万航空意外险</td> 
                  <td>√</td>
                  <td>×</td>
                </tr>
                <tr>
                  <td>个人综合意外险</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>价值550元洁牙卡</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>意外牙科治疗险</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>价值800元健康管家服务卡</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>癌无忧防癌险</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>瑞华官网购买保险产品可享优惠价</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>瑞华官网购买保险产品可享双倍积分</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>最红星期五，乐享5%优惠</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>美食乐享5折，可全积分兑换</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>刷卡积分累计，更高兑换价值</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>10000+特惠商户享受折扣优惠</td>
                  <td></td>
                  <td></td>
                </tr>
              </table>
            </div>
          </div>

      </swiper-slide>
      <!-- 第三页 -->
      <swiper-slide class="swiper-basic">
          <div class="mask-layer">
            <p class="title-img-container"><img src="../../assets/img/card/title_tqhl.png" class="title-img-tqhl"></p>
            <div class="tab-container">
              <table  cellspacing="0" class="table-privilege">
                <tr style="font-size:1.2rem;">
                  <th width=66% class="layout-border">白金卡<br>服务类型</th>
                  <th width=17% class="layout-border">瑞华保险<br>信用卡 </th>
                  <th width=17% class="layout-border">普通<br>信用卡</th>
                </tr>
              <tr>  
                <td>每年6次免费交行沃德财富境内机场贵宾室</td> 
                <td>√</td>
                <td>×</td>
              </tr>
              <tr>
                <td>每年6次免费龙腾出行全球机场贵宾室</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>每年6次免费酒后代驾服务</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>1000万航意险无限次2小时起赔航班延误险</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>生日当天双倍积分（最高100万）</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>倍多分精选白金商户积分礼遇</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>25万积分抵基本年费</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>积分兑换五大航空里程</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>附属卡免年费</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>短信提醒免费</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>网点VIP优先叫号服务</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>24小时白金秘书专线</td>
                <td></td>
                <td></td>
              </tr>
            </table>
            </div>
          </div>
      </swiper-slide>

      <!-- 第四页 我们有健康保障-->
      <swiper-slide class="swiper-basic">
          <div class="mask-layer">
            <p class="title-img-container"><img src="../../assets/img/card/title_jkbz.png" class="title-img-jkbz"></p>
            <div class="tab-container" style="margin-top: -24px;">
              <div class="portal-even">
                <img src="../../assets/img/card/pic_hkyw.jpg">
                <div class="float-block-even">
                  <div class="bx-simple-desc desc-title">百万航空意外保险 &gt;</div>
                  <div class="bx-simple-desc desc-content" style="margin-top:5px;">出差/出游全面保障</div>
                  <div class="bx-simple-desc desc-content">瑞华让您飞得更高更安心</div>
                </div>
              </div>
              <div class="portal-odd">
                <img src="../../assets/img/card/pic_zhyw.jpg">
                <div class="float-block-odd">
                  <div class="bx-simple-desc desc-title">个人综合意外险 &gt;</div>
                  <div class="bx-simple-desc desc-content" style="margin-top:5px;">365天意外保障</div>
                  <div class="bx-simple-desc desc-content">呵护您的幸福生活</div>
                </div>
              </div>
              <div class="portal-even">
                <img src="../../assets/img/card/pic_ykzl.jpg">
                <div class="float-block-even">
                  <div class="bx-simple-desc desc-title">意外牙科治疗险 &gt;</div>
                  <div class="bx-simple-desc desc-content" style="margin-top:5px;">万元牙科意外保障</div>
                  <div class="bx-simple-desc desc-content">让您微笑每一天</div>
                </div>
              </div>
              <div class="portal-odd">
                <img src="../../assets/img/card/pic_aiwy.jpg">
                <div class="float-block-odd">
                  <div class="bx-simple-desc desc-title">癌无忧防癌险 &gt;</div>
                  <div class="bx-simple-desc desc-content" style="margin-top:5px;">爱来癌去</div>
                  <div class="bx-simple-desc desc-content">让全家乐享安心</div>
                </div>
              </div>
            </div>
          </div>
      </swiper-slide>

      <!-- 第五页 我们有健康服务-->
      <swiper-slide class="swiper-basic">
          <div class="mask-layer">
            <p class="title-img-container"><img src="../../assets/img/card/title_jkfw.png" class="title-img-jkfw"></p>
            <div class="tab-container">
              <div class="jkfw-jyk" style="margin: 0 20px;">
                  <div class="jyk-banner" style="width:100%;">
                    <img src="../../assets/img/card/pic_jyk.jpg" alt="" style="width:100%;float:left;    border-top-left-radius: 5px;border-top-right-radius: 5px;">
                    <div style="z-index:2;height: 73px;border-left:1px solid #fff;position:absolute;margin: 34px auto auto 16px;color:#fff;text-align:left;padding-top:3px;padding-left: 16px;">
                      <span style="font-size:2.1rem;line-height:23px;display: flex;margin-bottom:10px;">洁牙卡</span>
                      <span style="font-size:1.2rem;line-height:18px;display: flex;">美好生活从“齿”开始</span>
                      <span style="font-size:1.2rem;line-height:18px;display: flex;">瑞华让您笑的更自信</span>
                    </div>
                    <div style="width:100%;height:70px;background:#fff;float:left;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;">

                      

                    </div>
                  </div>

              </div>
            </div>
          </div>
      </swiper-slide>






      <swiper-slide style="background:url(../../assets/img/card/bg_02.jpg) no-repeat;background-position:center top;background-size: 100% auto;"></swiper-slide>
      <swiper-slide style="background:url(../../assets/img/card/bg_02.jpg) no-repeat;background-position:center top;background-size: 100% auto;"></swiper-slide>
      <swiper-slide style="background-position:center top;background-image:url(../../assets/img/card/bg_02.jpg);"></swiper-slide>
      <swiper-slide><img src="../../assets/img/card/bg_02.jpg" style="width:100%;"></swiper-slide>
      <swiper-slide><img src="../../assets/img/card/bg_02.jpg" style="width:100%;"></swiper-slide>
      <swiper-slide><img src="../../assets/img/card/bg_02.jpg" style="width:100%;"></swiper-slide>
      <swiper-slide><img src="../../assets/img/card/bg_02.jpg" style="width:100%;"></swiper-slide>
      <swiper-slide><img src="../../assets/img/card/bg_02.jpg" style="width:100%;"></swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-scrollbar"   slot="scrollbar"></div>
    </swiper>
    <div style="width:40px;height:103px;position:fixed;right:0;bottom:20%;background:url(../../assets/img/card/bg_apply.png);background-size:100%;text-align:center;vertical-align:middle;"><span style="display:inline-block;width:20px;color:#fff;margin-top: 8px;font-size:1.4rem">立即申请</span></div>
    <!-- <div class="container">
      <mu-raised-button label="立" class="demo-raised-button" primary style="width:40px;height:103px;position:fixed;right:0;bottom:70px;background:url(../../assets/img/card/bg_apply.png);background-size:100%;"/>
    </div> -->
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'test',
  components: {
    swiper,
    swiperSlide
  },
  data() {
      return {
        // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        swiperOption: {
          // swiper options 所有的配置同swiper官方api配置
          initialSlide: 0,//初始化索引
          /*spaceBetween: 0,
          grabCursor: true,*/
          /*setWrapperSize: true,*/
          spaceBetween: 0,//slide之间的距离（单位px）。
          /*autoplay: 3000,//自动切换*/
          centeredSlides: true,
          direction: 'vertical',
          grabCursor: true,
          setWrapperSize: true,
          autoHeight: false,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          prevButton: '.swiper-button-prev',
          nextButton: '.swiper-button-next',
          scrollbar: '.swiper-scrollbar',
          mousewheelControl: true,
          observeParents: true,
          // if you need use plugins in the swiper, you can config in here like this
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
          debugger: true,
          // swiper callbacks
          // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
          onTransitionStart (swiper) {
            console.log(swiper)
          }
          // more Swiper configs and callbacks...
          // ...
        }
      }
    },
    // you can find current swiper instance object like this, while the notNextTick property value must be true
    // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
  methods: {
   
  },
  mounted() {
      // you can use current swiper instance object to do something(swiper methods)
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      console.log('this is current swiper instance object', this.swiper)
      this.swiper.slideTo(0, 1000, false)
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped >
/* 自己定义的容器样式*/
@import 'src/assets/css/mine';
@import 'src/assets/css/card';
th,td{
  padding: 2%  0;
}
th{
  margin-bottom: 2%;
}
td{
  font-size: 1.2rem;

}
th.layout-border{
    border-top: 1px solid $layout-border-color;
    border-bottom: 1px solid $layout-border-color;
  }


.swiper-container{
  background:url(../../assets/img/card/bg_02.jpg) no-repeat;
  background-position:center top;
  background-size: 100% auto;
}
.swiper-basic{
  width: 100%;
  display: inline-block;
}
.swiper-page-one{
  width:100%;
  display:inline-block;
  background:url(../../assets/img/card/bg_01.jpg) no-repeat;
  background-position:center top;
  background-size: 100% auto;
}
.mask-layer{
  width: 100%;
  height:100%;
  z-index:999;
  opacity:1.0;
}
.title-img-container{
  width:100%;
  text-align:center;
  padding-top: 20px;
}
.title-img-tqhl{
  width:257px;
  height:43px;
}
.tab-container{
  width: 100%;
  text-align: center;
  display: inline-block;
}
.table-privilege{
  width: 92%;
  margin: 0 4%;
  text-align: left;
  color: $card-rights-color;
}
.title-img-jkbz{
  width:235px;
  height:53px;
}
.portal-even{  
  /* width: 295px; */
  height: 90px;
  border: 1px solid $layout-border-color;
  margin: 30px 30px 0 50px;
}
.portal-odd{  
  /* width: 295px; */
  height: 90px;
  border: 1px solid $layout-border-color;
  margin: 30px 50px 0 30px;
}
.portal-even img{
  width: 90px;
  height: 90px;
  margin-top: -10px;
  margin-left: -20px;
  float: left;
  z-index:2;
}
.portal-even .bx-simple-desc, .portal-odd .bx-simple-desc{
  color: $card-rights-color;
  text-align: left;
}
.float-block-even{
  height: 60px;margin-top: 15px;margin-left: 90px;
}
.desc-title{
  font-size: 1.6rem;
  line-height: 19px; 
  font-weight: bold;
}
.desc-content{
  font-size: 1.2rem;line-height: 18px;
}
.portal-odd img{
  width: 90px;
  height: 90px;
  margin-top: -10px;
  margin-right: -20px;
  float: right;
  z-index:2;
}
.float-block-odd{
  height: 60px;margin-top: 15px;margin-left: 20px;
}
/* 第五页 */
.title-img-jkfw{
  width:235px;
  height:54px;
}
</style>

<style rel="stylesheet/scss" lang="scss">
/* 修改Muse-Ui组件默认样式不能加scoped */
</style>