<template>
  <div class="page mine-page page-myprofile">
    <mu-content-block class="has-header no-padding">
      <section v-bind:style="{'min-height':screenHeight - 81 +'px'}">
        <section class="mine-header bg-primary">
        </section>
        <section class="mine-avatar mine-section mg-lg">
          <div class="avatar-row">
            <div class="avatar">
              <mu-avatar @click="toLogin" :src="headimgurl" :size="56" class="mine-avatar-img"/>
            </div>
            <div v-if="!idNum" class="personal-info font-bold">{{mobileNum | formatNum}}</div>
            <div v-if="idNum" class="personal-info font-bold">{{name}}</div>
          </div>
          <mu-list>
            <!-- 未提交身份信息 -->
            <mu-list-item v-if="!idNum" to="idAuthentication">
              <img slot="left" src="../../assets/img/mine/icon_id_authenticate.png" />
              <div class="authenticated-info">
                <div class="font-bold" style="font-size:15px;">身份认证</div>
                <div>完善个人信息，查询全渠道保单</div>
              </div>
              <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right" />
            </mu-list-item>
            <!-- 提交过身份信息但未认证 -->
            <mu-list-item v-else-if="true" to="idAuthentication">
              <img slot="left" src="../../assets/img/mine/icon_id_authenticate.png" />
              <div class="authenticated-info">
                <div>真实姓名&nbsp&nbsp&nbsp{{name}}</div>
                <div style="white-space: nowrap;">身份证号&nbsp&nbsp&nbsp{{idNum | formatIdNum}}</div>
              </div>
              <img v-if="true" slot="right" src="../../assets/img/icon_right.png" class="arrow-right" />
            </mu-list-item>
            <!-- 已认证 -->
            <mu-list-item v-else>
              <img slot="left" src="../../assets/img/mine/icon_id_authenticate.png" />
              <div class="authenticated-info">
                <div>真实姓名&nbsp&nbsp&nbsp{{name}}</div>
                <div style="white-space: nowrap;">身份证号&nbsp&nbsp&nbsp{{idNum | formatIdNum}}</div>
              </div>
            </mu-list-item>
          </mu-list>
        </section>
        <section class="contact-section mine-section mg-lg">
          <mu-list>
            <mu-list-item :title="mobileNum | formatNum">
              <img slot="left" src="../../assets/img/mine/icon_mobile_num.png" />
            </mu-list-item>
            <mu-divider/>
            <mu-list-item :title="email? email:'电子邮箱'" to="emailAuthentication">
              <img slot="left" src="../../assets/img/mine/icon_email.png" />
              <div v-if="!email" slot="after">前去填写</div>
              <div v-else slot="after">
                <span v-if="emailFlag == '0'" class="flag un-auth">未认证</span>
                <span v-else-if="emailFlag == '1'" class="flag auth">已认证</span>
                更改
              </div>            
              <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right" />
            </mu-list-item>
            <mu-divider/>
            <mu-list-item :title="address? address:'常住地址'" to="myAddress">
              <img slot="left" src="../../assets/img/mine/icon_address.png" />
              <div v-if="!address" slot="after">前去填写</div>
              <div v-else slot="after">更改</div>
              <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right" />
            </mu-list-item>
          </mu-list>
        </section>
        <section class="mine-section mg-lg">
          <mu-list>
            <mu-list-item title="修改密码" to="changePassword">
              <img slot="left" src="../../assets/img/mine/icon_change_password.png" />
              <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right" />
            </mu-list-item>
          </mu-list>
        </section>
      </section>
      <rh-footer></rh-footer>
    </mu-content-block>
  </div>
</template>

<script>
import store from '../../vuex/store'
import LogoFooter from './../common/LogoFooter.vue'
export default {
  name: 'myProfile',
  components: {
    'rh-footer': LogoFooter
  },
  data() {
    return {
      mobileNum: '',
      name: '',
      idNum: '',
      email: '',
      emailFlag: '', //0:未认证，1:已认证, 空：未提交过email
      address: '',
      headimgurl: '',
      screenHeight: document.documentElement.clientHeight,
    }
  },
  methods: {
    toLogin() {
      if (globalConfig.isDebug) {
        this.go("/page/login/wx")
      }
    },
    assignUserInfo(userInfo) {
      this.mobileNum = userInfo.CMobile
      if(userInfo.CCertfCde){
        this.idNum = userInfo.CCertfCde
        this.name = userInfo.CName
      }
      if (userInfo.CEmail) {
        this.email = userInfo.CEmail
        if(userInfo.CEmailFlag){
          this.emailFlag = userInfo.CEmailFlag
        }
      }
      if (userInfo.CAddrProvince) {
        let district = utils.help.getAddressOfCn(userInfo.CAddrDistrict)
        this.address = district + userInfo.CAddrDetail
      }
    }
  },
  computed: {

  },
  filters: {
    formatNum (value) {
      if (!value) return ''
      value = value.toString()
      return value.substring(0,3)+'****'+value.substring(7)
    },
    formatIdNum (value) {
      if (!value) return ''
      value = value.toString()
      if (value.length == 18) {
        return value.substring(0, 6) + '********' + value.substring(value.length - 4)
      } else {
        return value.substring(0, 6) + '*****' + value.substring(value.length - 4)
      }
    }
  },
  created() {
    //微信头像
    utils.wx.wxUserInfo().then(req => {
      console.log("返回数据", req)
      this.headimgurl = req.headimgurl
      console.log(this.headimgurl)
    });
    //从cache里获取user信息
    let userInfo = utils.cache.get('user')
    console.log(userInfo)
    this.assignUserInfo(userInfo)
  },
  activated() {
    //从后台更新user信息
    let openId = utils.cache.get('wxConfig').openId
    store.commit('LOADING_DISABLED', true)
    utils.http.post('FINDUSERINFO', {openID: openId})
      .then(response => {
        let userInfo = JSON.parse(response.data.getUserInfo)
        console.log('userInfo',userInfo)
        //暂时定义没有进行实名认证
        userInfo.isAuth = false;
        utils.cache.set('user', userInfo)
        store.commit('LOGIN', userInfo)
        this.assignUserInfo(userInfo)
      }).catch(error => {
        
      })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped >
@import 'src/assets/css/mine';
.page-myprofile {
  .mine-avatar {
    min-height: 221px;
    .avatar-row {
      padding-top: 24px;
      .avatar {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 16px;
      }
      .personal-info {
        width: 100%;
        text-align: center;
        color: $normal-color;
        font-size: 1.7rem;
        line-height: 17px;
        padding-bottom: 20px;
      }
    }
    .authenticated-info {
      div {
        color: $normal-color-light;
        font-size: 1.3rem;
        line-height: 24px;
      }
    }
  }
  .flag {
    font-size: 1.1rem;
    padding: 1px 3px;
    margin-right:6px;
  }
  .flag.un-auth {
    color: $memo-color;
    background: #FAEDD8;
  }
  .flag.auth {
    color: $primary-color;
    background:  #E2F2E1;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
@import 'src/assets/css/mine';
.page-myprofile {
  .mine-avatar .mu-item-left img {
    width: 24px;
    height: 24px;
    margin-left: 1px;
    vertical-align: middle;
  }
  .contact-section .mu-item-title {
    line-height:1.5rem;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    margin-right: 20px;
  }
}
</style>
