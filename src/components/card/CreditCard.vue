<!-- The ref attr used to find the swiper instance -->
<!-- 插件地址：https://github.com/surmon-china/vue-awesome-swiper -->
<template>
  <div class="page card-main" v-bind:style="{'height':screenHeight  +'px'}">
    <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper" class="swiper-container swiper-basic" :style="{height:screenHeight}">
      <!-- slides -->
      <!-- 第一页 -->
      <swiper-slide class="swiper-page-one swiper-basic" :style="{height:screenHeight}"></swiper-slide>
      <!-- 第二页 -->
      <swiper-slide class="swiper-basic swiper-slide-next" :style="{height:screenHeight}">
        <swiper :options="swiperOptionInner" class="swiper-container swiper-container-vertical swiper-container-free-mode" :style="{height:screenHeight}">
          <swiper-slide class="swiper-basic" style="height:970px;">
            <div class="mask-layer">
              <p class="title-img-container">
                <img src="../../assets/img/card/title_tqhl.png" class="title-img-tqhl">
              </p>

              <div class="tab-container">
                <table  cellspacing="0" class="table-privilege">
                  <tr style="font-size:1.3rem;">
                    <th width=60% class="layout-border" style="color:#D5A733;">金卡<br>服务类型</th>
                    <th width=20% class="layout-border">瑞华保险<br>信用卡 </th>
                    <th width=20% class="layout-border">普通<br>信用卡</th>
                  </tr>
                  <tr>  
                    <td>百万航空意外险</td> 
                    <td>
                      <img src="../../assets/img/card/icon_yes.png" alt="" class="yOn">
                    </td>
                    <td>
                      <img src="../../assets/img/card/icon_no.png" alt="" class="yOn">
                    </td>
                  </tr>
                  <tr>
                    <td>个人综合意外险</td>
                    <td>
                      <img src="../../assets/img/card/icon_yes.png" alt="" class="yOn">
                    </td>
                    <td>
                      <img src="../../assets/img/card/icon_no.png" alt="" class="yOn">
                    </td>
                  </tr>
                  <tr>
                    <td>价值550元洁牙卡</td>
                    <td>
                      <img src="../../assets/img/card/icon_yes.png" alt="" class="yOn">
                    </td>
                    <td>
                      <img src="../../assets/img/card/icon_no.png" alt="" class="yOn">
                    </td>
                  </tr>
                  <tr>
                    <td>意外牙科治疗险</td>
                    <td>
                      <img src="../../assets/img/card/icon_yes.png" alt="" class="yOn">
                    </td>
                    <td>
                      <img src="../../assets/img/card/icon_no.png" alt="" class="yOn">
                    </td>
                  </tr>
                  <tr>
                    <td>价值800元健康管家服务卡</td>
                    <td>
                      <img src="../../assets/img/card/icon_yes.png" alt="" class="yOn">
                    </td>
                    <td>
                      <img src="../../assets/img/card/icon_no.png" alt="" class="yOn">
                    </td>
                  </tr>
                  <tr>
                    <td>癌无忧防癌险</td>
                    <td>
                      <img src="../../assets/img/card/icon_yes.png" alt="" class="yOn">
                    </td>
                    <td>
                      <img src="../../assets/img/card/icon_no.png" alt="" class="yOn">
                    </td>
                  </tr>
                  <tr>
                    <td>瑞华官网购买保险产品可享优惠价</td>
                    <td>
                      <img src="../../assets/img/card/icon_yes.png" alt="" class="yOn">
                    </td>
                    <td>
                      <img src="../../assets/img/card/icon_no.png" alt="" class="yOn">
                    </td>
                  </tr>
                  <tr>
                    <td>瑞华官网购买保险产品可享双倍积分</td>
                    <td>
                      <img src="../../assets/img/card/icon_yes.png" alt="" class="yOn">
                    </td>
                    <td>
                      <img src="../../assets/img/card/icon_no.png" alt="" class="yOn">
                    </td>
                  </tr>
                  <tr>
                    <td>最红星期五，乐享5%优惠</td>
                    <td>
                      <img src="../../assets/img/card/icon_yes.png" alt="" class="yOn">
                    </td>
                    <td>
                      <img src="../../assets/img/card/icon_no.png" alt="" class="yOn">
                    </td>
                  </tr>
                  <tr>
                    <td>美食乐享5折，可全积分兑换</td>
                    <td>
                      <img src="../../assets/img/card/icon_yes.png" alt="" class="yOn">
                    </td>
                    <td>
                      <img src="../../assets/img/card/icon_no.png" alt="" class="yOn">
                    </td>
                  </tr>
                  <tr>
                    <td>刷卡积分累计，更高兑换价值</td>
                    <td>
                      <img src="../../assets/img/card/icon_yes.png" alt="" class="yOn">
                    </td>
                    <td>
                      <img src="../../assets/img/card/icon_no.png" alt="" class="yOn">
                    </td>
                  </tr>
                  <tr>
                    <td>10000+特惠商户享受折扣优惠</td>
                    <td>
                      <img src="../../assets/img/card/icon_yes.png" alt="" class="yOn">
                    </td>
                    <td>
                      <img src="../../assets/img/card/icon_no.png" alt="" class="yOn">
                    </td>
                  </tr>
                </table>
              </div>
              <br/><br/>
              <div class="tab-container">
                <table  cellspacing="0" class="table-privilege">
                  <tr style="font-size:1.3rem;">
                    <th width=60% class="layout-border" style="color:#D5A733;">白金卡<br>服务类型</th>
                    <th width=20% class="layout-border">瑞华保险<br>信用卡 </th>
                    <th width=20% class="layout-border">普通<br>信用卡</th>
                  </tr>
                <tr>  
                  <td>每年6次免费交行沃德财富境内机场贵宾室</td> 
                  <td>
                      <img src="../../assets/img/card/icon_yes.png" alt="" class="yOn">
                    </td>
                    <td>
                      <img src="../../assets/img/card/icon_no.png" alt="" class="yOn">
                    </td>
                </tr>
                <tr>
                  <td>每年6次免费龙腾出行全球机场贵宾室</td>
                  <td>
                      <img src="../../assets/img/card/icon_yes.png" alt="" class="yOn">
                    </td>
                    <td>
                      <img src="../../assets/img/card/icon_no.png" alt="" class="yOn">
                    </td>
                </tr>
                <tr>
                  <td>每年6次免费酒后代驾服务</td>
                  <td>
                      <img src="../../assets/img/card/icon_yes.png" alt="" class="yOn">
                    </td>
                    <td>
                      <img src="../../assets/img/card/icon_no.png" alt="" class="yOn">
                    </td>
                </tr>
                <tr>
                  <td>1000万航意险无限次2小时起赔航班延误险</td>
                  <td>
                      <img src="../../assets/img/card/icon_yes.png" alt="" class="yOn">
                    </td>
                    <td>
                      <img src="../../assets/img/card/icon_no.png" alt="" class="yOn">
                    </td>
                </tr>
                <tr>
                  <td>生日当天双倍积分（最高100万）</td>
                  <td>
                      <img src="../../assets/img/card/icon_yes.png" alt="" class="yOn">
                    </td>
                    <td>
                      <img src="../../assets/img/card/icon_no.png" alt="" class="yOn">
                    </td>
                </tr>
                <tr>
                  <td>倍多分精选白金商户积分礼遇</td>
                  <td>
                      <img src="../../assets/img/card/icon_yes.png" alt="" class="yOn">
                    </td>
                    <td>
                      <img src="../../assets/img/card/icon_no.png" alt="" class="yOn">
                    </td>
                </tr>
                <tr>
                  <td>25万积分抵基本年费</td>
                  <td>
                      <img src="../../assets/img/card/icon_yes.png" alt="" class="yOn">
                    </td>
                    <td>
                      <img src="../../assets/img/card/icon_no.png" alt="" class="yOn">
                    </td>
                </tr>
                <tr>
                  <td>积分兑换五大航空里程</td>
                  <td>
                      <img src="../../assets/img/card/icon_yes.png" alt="" class="yOn">
                    </td>
                    <td>
                      <img src="../../assets/img/card/icon_no.png" alt="" class="yOn">
                    </td>
                </tr>
                <tr>
                  <td>附属卡免年费</td>
                  <td>
                      <img src="../../assets/img/card/icon_yes.png" alt="" class="yOn">
                    </td>
                    <td>
                      <img src="../../assets/img/card/icon_no.png" alt="" class="yOn">
                    </td>
                </tr>
                <tr>
                  <td>短信提醒免费</td>
                  <td>
                      <img src="../../assets/img/card/icon_yes.png" alt="" class="yOn">
                    </td>
                    <td>
                      <img src="../../assets/img/card/icon_no.png" alt="" class="yOn">
                    </td>
                </tr>
                <tr>
                  <td>网点VIP优先叫号服务</td>
                  <td>
                      <img src="../../assets/img/card/icon_yes.png" alt="" class="yOn">
                    </td>
                    <td>
                      <img src="../../assets/img/card/icon_no.png" alt="" class="yOn">
                    </td>
                </tr>
                <tr>
                  <td>24小时白金秘书专线</td>
                  <td>
                      <img src="../../assets/img/card/icon_yes.png" alt="" class="yOn">
                    </td>
                    <td>
                      <img src="../../assets/img/card/icon_no.png" alt="" class="yOn">
                    </td>
                </tr>
              </table>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </swiper-slide>

      <!-- 第四页 我们有健康保障-->
      <swiper-slide class="swiper-basic" :style="{height:screenHeight}">
          <div class="mask-layer">
            <p class="title-img-container">
              <img src="../../assets/img/card/title_jkbz.png" class="title-img-jkbz"></p>
            <div class="tab-container" style="margin-top: -24px;">
              <div class="portal-even" @click="showDg3">
                <img src="../../assets/img/card/pic_hkyw.jpg">
                <div class="float-block-even">
                  <div class="bx-simple-desc desc-title" style="background-position:140px;">百万航空意外保险
                    
                  </div>
                  <div class="bx-simple-desc desc-content" style="margin-top:5px;">出差/出游全面保障</div>
                  <div class="bx-simple-desc desc-content">瑞华让您飞得更高更安心</div>
                </div>
              </div>
              <div class="portal-odd" @click="showDg4">
                <img src="../../assets/img/card/pic_zhyw.jpg">
                <div class="float-block-odd">
                  <div class="bx-simple-desc desc-title" style="background-position:124px;">个人综合意外险</div>
                  <div class="bx-simple-desc desc-content" style="margin-top:5px;">365天意外保障</div>
                  <div class="bx-simple-desc desc-content">呵护您的幸福生活</div>
                </div>
              </div>
              <div class="portal-even" @click="showDg2">
                <img src="../../assets/img/card/pic_ykzl.jpg">
                <div class="float-block-even">
                  <div class="bx-simple-desc desc-title" style="background-position:124px;">意外牙科治疗险</div>
                  <div class="bx-simple-desc desc-content" style="margin-top:5px;">万元牙科意外保障</div>
                  <div class="bx-simple-desc desc-content">让您微笑每一天</div>
                </div>
              </div>
              <div class="portal-odd" @click="showDg1">
                <img src="../../assets/img/card/pic_aiwy.jpg">
                <div class="float-block-odd">
                  <div class="bx-simple-desc desc-title" style="background-position:108px;">癌无忧防癌险</div>
                  <div class="bx-simple-desc desc-content" style="margin-top:5px;">爱来癌去</div>
                  <div class="bx-simple-desc desc-content">让全家乐享安心</div>
                </div>
              </div>
            </div>
          </div>
      </swiper-slide>

      <!-- 第五页 我们有健康服务-->
      <swiper-slide class="swiper-basic" :style="{height:screenHeight}">
          <div class="mask-layer">
            <p class="title-img-container">
              <img src="../../assets/img/card/title_jkfw.png" class="title-img-jkfw"></p>
            <div class="tab-container">
              <!-- 洁牙卡 start-->
              <div class="jkfw-jyk" @click="$router.push('teethPack')">
                  <div class="jyk-banner">
                    <img src="../../assets/img/card/pic_jyk.jpg" alt="" class="jyk-banner-img">
                    <div class="jyk-logan">
                      <span class="logan-title">洁牙卡</span>
                      <span class="logan-desc">美好生活从“齿”开始</span>
                      <span class="logan-desc">瑞华让您笑的更自信</span>
                    </div>
                    <div class="jy-detail">
                      <div class="service-item">
                        <img src="../../assets/img/privilege/icon_dot.png">
                        <span>口腔全面检查1次</span>
                      </div>
                      <div class="service-item">
                        <img src="../../assets/img/privilege/icon_dot.png">
                        <span>数字全景X片1次</span>
                      </div>
                      <div class="service-item">
                        <img src="../../assets/img/privilege/icon_dot.png">
                        <span>全口牙齿超声波洁牙1次</span>
                      </div>
                      <div class="service-item">
                        <img src="../../assets/img/privilege/icon_dot.png">
                        <span>全口牙齿抛光1次</span>
                      </div>
                    </div>
                  </div>
              </div>
              <!-- 洁牙卡 end-->

              <div style="clear:both;"></div>
              <!-- 健康管家服务卡 start-->
              <div class="jkfw-jyk" @click="$router.push('healthPack')" style="margin-top:20px;">
                  <div class="jyk-banner">
                    <img src="../../assets/img/card/pic_jkfw.jpg" alt="" class="jyk-banner-img">
                    <div class="jyk-logan">
                      <span class="logan-title">健康管家服务卡</span>
                      <span class="logan-desc">500+家三甲医院提供重疾绿色通道服务</span>
                      <span class="logan-desc">跟排队和黄牛告别，7个工作日安排专家面诊</span>
                    </div>
                    <div class="jy-detail">
                      <div class="service-item">
                        <img src="../../assets/img/privilege/icon_dot.png">
                        <span>电话医生</span>
                      </div>
                      <div class="service-item">
                        <img src="../../assets/img/privilege/icon_dot.png">
                        <span>专家诊疗</span>
                      </div>
                      <div class="service-item">
                        <img src="../../assets/img/privilege/icon_dot.png">
                        <span>住院手术安排</span>
                      </div>
                    </div>
                  </div>
              </div>
              <!-- 健康管家服务卡 end -->

            </div>           
          </div>
      </swiper-slide>

      <!-- 第六页 立即申请-->
      <swiper-slide class="swiper-basic">
          <div class="mask-layer">
            <p class="title-img-container" style="padding-top:0;">
              <img src="../../assets/img/card/title_ykzs.png" class="title-img-ykzs"></p>
            <p style="width:100%;">
              <img class="card-model" src="../../assets/img/card/pic_card_model.png" alt="">
            </p>
            <p style="width:100%;text-align:center;">
              <div @click="applyCard" class="card-apply-btn">立即申请</div>
            </p>
            <p class="owned">已持交通银行卡用户<a>点击此处</a>办理</p>
            <div class="rules-title-con">
              <div class="border-line"></div>
              <div class="rules-title-act">活动细则</div>
              <div class="border-line"></div>
            </div>
            <div class="rules-des">
              活动期间，成功核发指定交通银行瑞华保险信用卡主卡的新客户，在核卡日起45天（含）内激活信用卡，即可获赠好礼二选一：<br>
              套餐一：价值550元洁牙卡+意外牙科治疗险<br>
              套餐二：价值800元健康管家服务卡+癌无忧防癌险。<br>
              新老用户办理交通银行瑞华保险信用卡，激活后可享百万航空意外险和个人综合意外险
            </div>
            <div @click="$router.push('cardRules')" class="read-more">
              查看更多
            </div>
                      
          </div>
      </swiper-slide>

      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-scrollbar"   slot="scrollbar"></div>
    </swiper>

    <div v-if="applyBtnStatus" class="apply-now" @click="applyCard"><span>立即申请</span></div>
    
    <!-- dialog1 癌无忧防癌险详情  -->
    <cancer-insurance-detail :show.sync="showDialog1"></cancer-insurance-detail>

    <!-- dialog2 意外牙科治疗险详情  -->
    <dental-insurance-detail :show.sync="showDialog2"></dental-insurance-detail>

    <!-- dialog3 百万航空意外保险详情  -->
    <air-trave-insurance-detail :show.sync="showDialog3"></air-trave-insurance-detail>
    
    <!-- dialog4 个人综合意外险详情  -->
    <personal-insurance-detail :show.sync="showDialog4"></personal-insurance-detail>

  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import store from '../../vuex/store'
import CustomDialog from './../common/CustomDialog.vue'
import AirTraveInsuranceDetail from './components/AirTraveInsuranceDetail.vue'
import PersonalInsuranceDetail from './components/PersonalInsuranceDetail.vue'
import DentalInsuranceDetail from './components/DentalInsuranceDetail.vue'
import CancerInsuranceDetail from './components/CancerInsuranceDetail.vue'
export default {
  name: 'creditCard',
  components: {
    swiper,
    swiperSlide,
    CustomDialog,
    AirTraveInsuranceDetail,
    PersonalInsuranceDetail,
    DentalInsuranceDetail,
    CancerInsuranceDetail
  },
  data() {
      let nowTranslate,beforeTranslate,slideHeight,swiperHeight;
      return {
        // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        swiperOptionInner:{
          direction: 'vertical',
          slidesPerView: 'auto',
          freeMode: true,
          freeModeMomentum : false,
          mousewheelControl: true,
          mousewheelSensitivity : 0.5,
          onSetTransition: (swiper,translate) => {
            nowTranslate=swiper.translate;
            console.log(nowTranslate)
            if( typeof(beforeTranslate)=="undefined"){beforeTranslate=0};
            slideHeight=swiper.slides[0].scrollHeight;
            swiperHeight=swiper.height
            if(nowTranslate>-2 && nowTranslate > beforeTranslate){this.swiper.slideTo(0);}
            if(slideHeight-swiperHeight+nowTranslate<2 && nowTranslate < beforeTranslate){this.swiper.slideTo(2);}
            beforeTranslate=nowTranslate;
          },
          onTouchEnd: (swiper) => {
            if(swiper.translate>0){this.swiper.slideTo(0);}
            if(swiper.translate<(swiper.height-swiper.slides[0].scrollHeight)){this.swiper.slideTo(2);}
          }
        },
        swiperOption: {
          height:window.innerHeight,
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
          onTransitionStart: swiper=> {
            if(swiper.activeIndex == 5){
                this.applyBtnStatus = false;
            }else{
              this.applyBtnStatus = true;
            }
          },
          onSetTransition: swiper => {
            console.log(swiper.activeIndex)
            if(swiper.activeIndex==1){
              swiper.params.onlyExternal=true;
              swiper.disableMousewheelControl();
            }else{
              swiper.params.onlyExternal=false;
              swiper.enableMousewheelControl();
            }
          }
        }
        ,
        pageStatus:0,
        applyBtnStatus:true,
        showDialog1:false,
        showDialog2:false,
        showDialog3:false,
        showDialog4:false,
        screenHeight:document.documentElement.clientHeight
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
    applyCard() {
      if(!store.state.common.user){
        console.log("未登录");
        utils.cache.set('outSideLink','#');
        
        this.$router.push('login');
      }else{
        console.log("已登录");
        window.location.href = "#";
      }
      let requestParam = {
        openId: utils.cache.get('wxConfig').openId, //"oM9JHwQDXbqlMrMNgKpahUNIcvAUB", //所有状态（待完成、已完成、已取消）utils.cache.get('wxConfig').openId
        cardId: "BCM0001",//操作人 
        cApplyType:"1",
        cMemberCode:"",
      }
      
      utils.http.post('SAVEUSERRECORD', requestParam).then(response => {
        console.log(response.data)
        
      }).catch(error => {
        console.log(error)
        
      })
    },
    showDg1(){
      this.showDialog1 = true;
    },
    showDg2(){
      this.showDialog2 = true;
    },
    showDg3(){
      this.showDialog3 = true;
    },
    showDg4(){
      this.showDialog4 = true;
    }
   
  },
  mounted() {
      // you can use current swiper instance object to do something(swiper methods)
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      this.swiper.slideTo(0, 1000, false)
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped >
/* 自己定义的容器样式*/
@import 'src/assets/css/mine';
@import 'src/assets/css/card';

th,td{
    padding: 1%  0;
  }
  th{
    margin-bottom: 2%;
  }
  td{
    font-size: 1.2rem;
    padding-right: 30px;
  }
  th.layout-border{
      border-top: 1px solid $layout-border-color;
      border-bottom: 1px solid $layout-border-color;
    }

/* dialog */
  .toastContainer{
    height:100%;
    padding-bottom:43px;
    flex-direction:column;
    display:flex;
    align-items:center;
    justify-content:center;
  }
  .toastContainer{
    .t-title{
      width:100%;
      height:55px;
      line-height: 55px;
      text-align:center;
      color:#7C6837;
      font-size:1.7rem;
      border-bottom: 1px solid #ECBB3B;
    },
    table{
      margin-top: 16px;
      text-align:center;
    },
    .cy-prop{
      color:#7C6837;
    },
    .insur-duty-con{
      width:100%;
      margin-top:14px;
    }
    
  }
  td.prop-detail{
      font-size:1.5rem;
      line-height:21px;
      color:#394043;
    }
  .insur-duty-con{
    .insur-duty{
      height:30px;
       line-height:30px;
       font-size:1.2rem;
       color:#7C6837;
       text-align:center;
       margin:0 14px;
       background:#F5F4F2;
    }
  }
  .duty-detail{
    width:100%;
    color:#394043;
    font-size:1.3rem;
    text-align:left;
    padding-top:14px;
  }
  .duty-detail div{
    margin:0 28px;
    line-height:24px;
  }
</style>

<style rel="stylesheet/scss" lang="scss">
/* 修改Muse-Ui组件默认样式不能加scoped */


</style>