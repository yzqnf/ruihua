<template>
  <div class="page mine-page page-mycenter">
    <mu-content-block class="has-header no-padding">
      <section v-bind:style="{'min-height':screenHeight - 81 +'px'}">
        <section class="mine-header bg-primary">
        </section>
        <section class="mine-avatar mine-section mg-lg">
          <div @click="go('myProfile')">
            <mu-list>
              <mu-list-item class="personal-info-row">
                <mu-avatar v-if="!mobileNum" :src="unloggedImg" class="unlogged-avatar mine-avatar-img" slot="leftAvatar" :size="56"/>
                <mu-avatar v-else :src="headimgurl" slot="leftAvatar" class="wx-avatar mine-avatar-img" :size="56"/>
                <div class="personal-info-col">
                  <div v-if="!mobileNum" class="not-logged personal-info font-bold">未登录</div>
                  <div v-else class="has-logged personal-info">
                    <div class="mobile-num font-bold">{{mobileNum | formatNum}}</div>
                    <div class="points-and-authentication">
                      <div width="48" v-if="credits>0" class="info-col">
                        <img src="../../assets/img/mine/icon_points_level.png">
                        <div>{{credits}}积分</div>
                      </div>
                      <div width="50" v-if="isAuth" class="info-col">
                        <img src="../../assets/img/mine/icon_id_has_authenticated.png">
                        <div>已认证</div>
                      </div>
                      <div width="50" v-else class="info-col">
                        <img src="../../assets/img/mine/icon_id_not_authenticated.png">
                        <div>未认证</div>
                      </div>
                    </div>
                  </div>
                </div>
                <img v-show="mobileNum" slot="right" src="../../assets/img/icon_right.png" class="arrow-right"/>
              </mu-list-item>
            </mu-list>
          </div>
          <div class="order-row">
            <div class="order-col">
              <div @click="go('myOrderList')">
                <div v-if="!mobileNum" class="order-num">--</div>
                <div v-else class="order-num">{{orderNum}}</div>
                <div class="order-type">我的订单</div>
              </div>
            </div>
            <div class="order-col">
              <div @click="go('myInsuranceList')">
                <div v-if="!mobileNum" class="order-num">--</div>
                <div v-else class="order-num">{{policyServiceNum}}</div>
                <div class="order-type">保单服务</div>
              </div>
            </div>
            <div class="order-col">
              <div>
                <div v-if="!mobileNum" class="order-num">--</div>
                <div v-else class="order-num">{{healthServiceNum}}</div>
                <div class="order-type">健康服务</div>
              </div>
            </div>
          </div>
        </section>
        <section class="mine-section mg-lg">
          <mu-list>
            <mu-list-item 
              title="尊享权益" 
              describeText="瑞华保险信用卡用户专享"
              :describeTextClass="[describeTextClass]"
              to="myPrivilege">
              <img slot="left" src="../../assets/img/mine/icon_points_interest.png"/>
              <!--<div slot="after" class="rh-privilege">瑞华保险信用卡用户专享</div>-->
              <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right"/>
            </mu-list-item>
          </mu-list>
        </section>
        <section class="mine-section mg-lg">
          <mu-list>
            <mu-list-item title="常见问题" to="faq">
              <img slot="left" src="../../assets/img/mine/icon_faq.png"/>
              <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right"/>
            </mu-list-item>
            <mu-divider/>
            <mu-list-item title="用户反馈" to="feedback">
              <img slot="left" src="../../assets/img/mine/icon_suggest.png"/>
              <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right"/>
            </mu-list-item>
            <mu-divider/>
            <mu-list-item title="联系我们" to="contactUs">
              <img slot="left" src="../../assets/img/mine/icon_contact_us.png"/>
              <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right"/>
            </mu-list-item>
          </mu-list>
        </section>
      </section>
      <rh-footer></rh-footer>
    </mu-content-block>
    <mu-dialog :open="loading" dialogClass="loadingDialog">
      <img src="../../assets/img/common/loading.gif" />
      <div class="font-load font-md">正在加载</div>
    </mu-dialog>
  </div>
</template>

<script>
import store from '../../vuex/store'
import LogoFooter from './../common/LogoFooter.vue'
import Toast from '../common/Toast.vue'
export default {
  name: 'myCenter',
  components: {
    'rh-footer': LogoFooter,
  },
  data() {
    return {
      orderNum: '--',
      policyServiceNum: '--',
      healthServiceNum: '0',
      mobileNum: '',
      name: '',
      isAuth: false, //是否实名认证
      credits: 200,
      headimgurl: '',
      unloggedImg: require('../../assets/img/mine/icon_unlogged.png'),
      loading: false,
      screenHeight: document.documentElement.clientHeight,
      describeTextClass: 'describe-text',
    }
  },
  methods: {
    //获取订单列表
    getOrderList() {
      let requestParam = {
        ststList: ["01","08","03","06","02"], //所有状态（待完成、已完成、已取消）
        COprCde: utils.cache.get('user').CUserId,//操作人 
        currentPage:1,
        pageSize:10,
      }
      return utils.http.post('MYORDERLIST', requestParam)
    },
    //获取保单列表
    getPolicyList() {
      let user = utils.cache.get('user');
      let requestParam = {
        CAppName:user.CName,//投保人姓名 *  
        CCertfCde:user.CCertfCde,//证件号码 *
        CCertfCls:user.CCertfCls,//证件类型 *
        ststList:['0','1','4'], //所有状态（待完成、已完成、已取消） 
        COprCde:utils.cache.get('user').CUserId,//操作人 
        currentPage:1,
        pageSize:10,
      }
      return utils.http.post('RHPOLICYLIST', requestParam)
    },
  },
  computed: {

  },
  filters: {
    formatNum (value) {
      if (!value) return ''
      value = value.toString()
      return value.substring(0,3)+'****'+value.substring(7)
    }
  },
  created() {
    //微信头像
    store.commit('LOADING_DISABLED', true)
    utils.wx.wxUserInfo().then(req => {
      console.log("返回数据", req)
      this.headimgurl = req.headimgurl
      console.log('this.headimgurl',this.headimgurl)
    })
  },
  activated() {
    let userInfo = utils.cache.get('user')
    console.log('userInfo',userInfo)
    if(userInfo){
      //暂时定义没有进行实名认证
      userInfo.isAuth = false;
      utils.cache.set('user', userInfo)
      store.commit('LOGIN', userInfo)
      //user手机号
      this.mobileNum = userInfo.CMobile
      this.name = userInfo.CName
      this.isAuth = userInfo.isAuth
      //获取订单保单数量
      if (!store.state.common.loading) {
        store.commit('LOADING_DISABLED', true)
        this.loading = true
      }

      let interfaceArray=[]
      //当没有身份信息时，查询保单列表接口会返回错误，所以先做判断，如无身份信息则不调保单列表接口，设置数量为0
      if(userInfo.CCertfCde && userInfo.CCertfCls){
        interfaceArray = [this.getOrderList(),this.getPolicyList()]
      }else{
        interfaceArray = [this.getOrderList()]
      }
      let vm = this
      utils.http.axios.all(interfaceArray).then(utils.http.axios.spread((orders, policy) => {
        vm.loading = false
        store.commit('LOADING_DISABLED', false)
        console.log('orderList',orders)
        console.log('policyList',policy)
        this.orderNum = orders.data.totalRows;
        if(policy){
          this.policyServiceNum = policy.data.totalRows;
        }else{
          this.policyServiceNum = 0
        }
      })).catch(function(e){
        vm.loading = false
        console.log(e)
      })
    }
  },
  beforeRouteLeave(to, from, next) {    
    if (to.name == 'login' && utils.cache.get('user')) {
      next(false)
      utils.wx.wxClose();
    }else{
      next(true)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/assets/css/mine';
.mine-body .mu-divider{
  height:2px;
}
.page-mycenter {
  .mine-avatar {
    .personal-info-row {
      height: 88px;
      .personal-info-col {
        .not-logged {
          font-size: $font-lg;
          color: $normal-color-light;
        }
        .has-logged {
          .mobile-num {
            font-size: 1.7rem;
            margin-bottom: 6px;
            color: $normal-color;
          }
          .points-and-authentication{
            display: flex;
            max-width:160px;
          }
          .info-col {
            flex-grow: 1;
            display: flex;
            height: 17px;
            line-height: 17px;
            font-size: $font-tn;
            color: $memo-color-light;
            img {
              width: 17px;
              height: 17px;
              vertical-align: middle;
            }
            div {
              flex-grow: 1;
              padding-left:8%;
              padding-top: 1px;
              line-height: 17px;
            }
          }
        }
      }
    }
    .order-row {
      height: 88px;
      text-align: center;
      display: flex;
      .order-col {
        height: 100%;
        .order-num {
          height: 26px;
          line-height: 26px;
          font-size: 1.9rem;
          font-weight: bold;
          margin-top:12px;
        }
        .order-type {
          height: 18px;
          line-height: 18px;
          font-size: 1.3rem;
          margin-top:8px;
          margin-bottom: 24px;
        }
      }
      .order-col:first-child {
        flex-grow: 3;
      }
      .order-col:nth-child(2) {
        flex-grow: 4;
      }
      .order-col:nth-child(3) {
        flex-grow: 3;
      }
    }
  }
  .rh-privilege {
    color:$golden-color;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" >
@import 'src/assets/css/mine';
.page-mycenter {
  .mine-avatar {
    .personal-info-row {
      .mu-item {
        height: 88px;
        padding: 24px 56px 8px 72px;
        .mu-item-left {
          width: 56px;
          margin: 16px 0 0 10px;
          .mu-avatar {
            background-color: $input-border-color;
          }
          .unlogged-avatar img {
            width: 28px;
            height: 28px;
            margin:0px;
            border-radius:0%;
          }
          .wx-avatar img {
            width: 56px;
            height: 56px;
            margin:0px;
          }
        }
        .mu-item-content {
          margin-left: 16.8%;
          margin-right: -2%;
        }
        .mu-item-right {
          margin-top: 14px;
        }
      }
    }
  }
  .describe-text {
    font-size: 1.3rem;
    line-height: 18px;
    color: #D5A733;
  }
}
</style>
