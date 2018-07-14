<template>
  <div class="page">
    <mu-appbar title="首页"></mu-appbar>

    <mu-content-block class="has-header has-footer" style="padding-top:0;padding-left:0;padding-right:0;">
      <swipe class="swipe-home" :style="{zIndex:99999,width:'100%',height:screenWidth*0.66+'px'}">
        <swipe-item>
          <img src="../../assets/img/banner1.jpg">
        </swipe-item>
        <swipe-item>
          <img src="../../assets/img/banner2.jpg">
        </swipe-item>
        <swipe-item>
          <img src="../../assets/img/banner3.jpg">
        </swipe-item>
      </swipe>

      <table class="menu-table">
        <tr>
          <td>
            <div @click="go('productNav/product')">
              <mu-icon value="map" color="#cd5c5c" />
              <span>产品</span>
            </div>
          </td>
          <td>
            <div @click="getPolicyInfo()">
              <mu-icon value="map" color="#cd5c5c" />
              <span>在线投保</span>
            </div>
          </td>
          <td>
            <div @click="go('myCenter')">
              <mu-icon value="map" color="#cd5c5c" />
              <span>个人中心</span>
            </div>
          </td>
          <td>
            <div @click="go('demo')">
              <mu-icon value="extension" color="#6495ed" />
              <span>示例</span>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div @click="go('wechat')">
              <mu-icon value="extension" color="#6495ed" />
              <span>微信测试</span>
            </div>
          </td>
        </tr>
      </table>
      <mu-text-field :hintText="'dsadasdsa'"/>

    </mu-content-block>
  </div>
</template>

<script>
import store from '../../vuex/store'
export default {
  name: 'home',
  data() {
    return {

    }
  },
  methods: {
    //获取订单信息
    getPolicyInfo() {
      var req = {
        openId: utils.cache.get('wxConfig').openId,
        orderId: "6a1b470a1a2a4c818f377cee9a80787b"
      }
      utils.http.post('ORDERUNFINISHEDINFO', req).then(response => {
        console.log(JSON.stringify(response.data))
        response.data.openId = "openId-1241251244";
        store.commit("PUTPOLICYINFO", response.data);
        this.$router.push("policy/health");
      }).catch(error => {
        console.log(JSON.stringify(error))
        if (error.isLogicError) {
          utils.ui.alert(error.errorMessage, e => { })
        }
      })
    }

  },
  mounted() {

  },
  activated() {

  }
}
</script>
<style scoped>
.swipe-home {
  width: 100%;
  height: 45%;
}

.swipe-home img {
  width: 100%;
  height: 100%;
}

.menu-table {
  width: 100%;
  border-collapse: collapse;
}

.menu-table td {
  width: 25%;
  padding: 10px;
  text-align: center;
  border: 1px solid #f0f0f0;
}

.menu-table .mu-icon {
  display: block;
  font-size: 36px;
}
</style>
