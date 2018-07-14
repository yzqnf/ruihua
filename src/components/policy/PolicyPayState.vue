<template>
  <!-- <page> -->
  <div class="page page_policy_pay_state">
    <!-- <mu-content-block class="has-header"> -->
    <section v-bind:style="{'min-height':screenHeight - 64 +'px'}" style="background:white">
      <section class="mine-body">
      </section>
			<!-- 投保成功 -->
      <section v-if="!payFail" class="pay_state">
        <img src="../../assets/img/policy/icon_pay_success.png" />
        <h2 class="pay_text">投保成功</h2>
        <span>
          <!-- 您可在我的订单中查询保单详情 <br/>-->
          如遇问题，请拨打官方服务热线：400-609-6868 <br/>或 021-60376868</span>
      </section>

			<!-- 支付失败 -->
      <mu-list-item v-else class="pay_state">
        <img src="../../assets/img/policy/icon_pay_fail.png" />
        <h2 class="pay_text">支付失败</h2>
        <span class="pay_text_fail" style="display:block">失败原因：{{failMsg}}</span>
        <span>如遇问题，请拨打官方服务热线：400-609-6868 或 021-60376868</span>
      </mu-list-item>

			<!-- 订单详情 -->
      <mu-list-item style="padding:0px 16px;margin-top: 37px;" v-if="payFail" @click="toPolicyDetail">
        <mu-card>
          <mu-card-header title="查看订单详情" subTitle="今日24点前可继续支付！">
            <mu-avatar :src="imgUrl[0]" slot="avatar" />
          </mu-card-header>
        </mu-card>
      </mu-list-item>

			<!-- 保单查询 -->
      <mu-list-item style="padding:0px 16px;margin-top: 37px;" v-else @click="go('/page/myInsuranceList')">
        <mu-card class="to_home">
          <mu-card-header title="保单查询">
            <mu-avatar :src="imgUrl[0]" slot="avatar" />
          </mu-card-header>
        </mu-card>
      </mu-list-item>

			<!-- 在线回访 -->
			<mu-list-item style="padding:0px 16px;margin-top: 16px;" v-if="!payFail" @click="toVisit()">
				<mu-card>
					<mu-card-header title="在线回访" subTitle="根据监管要求，为保障您的权益，请您点击此处进行在线回访，谢谢您的配合！">
						<mu-avatar :src="imgUrl[2]" slot="avatar" />
					</mu-card-header>
				</mu-card>
      </mu-list-item> 
    </section>
		<!-- 底部logo -->
    <LogoFooter></LogoFooter>
  </div>
</template>

<script>
import LogoFooter from "../common/LogoFooter";
export default {
  name: "policyPayState",
  components: {
    LogoFooter
  },
  data() {
    return {
      title: "确认订单",
      //是否失败
      payFail: true,
      failMsg: "",
      imgUrl: [
        require("../../assets/img/icon_policy.png"),
        require("../../assets/img/icon_home.png"),
        require("../../assets/img/policy/icon_visit.png")
      ]
    };
  },
  methods: {
    //跳转订单详情
    toPolicyDetail() {
      console.log(utils.cache.get("PUTPOLICYINFO"));
      this.$router.push({
        name: "orderDetails",
        params: {
          orderCode: utils.cache.get("PUTPOLICYINFO").orderNo || "1",
          isShare: false
        }
      });
    },
    /**
     * 获取支付状态
     */
    getPayStatus() {},
    /**
		 * 跳转至在线回访
		 */
    toVisit() {
    	//设置进入回访标识
      utils.cache.set('detailToVisit','true')
      this.$router.push({
        name: "returnVisit",
        params: {
          cPlyNo: this.$route.params.policyNo||" "
        }
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    next(to.name !== "policyPay");
	},
	mounted(){
		this.payFail =  this.$route.params.pay === "false";
		this.failMsg = this.$route.params.result;
	}
};
</script>

<style rel="stylesheet/scss" lang="scss">
.page_policy_pay_state {
  .mu-item {
    padding: 0px;
  }
  .mu-card {
    background: rgba(1, 1, 1, 0);
    background-image: url("../../assets/img/icon_right.png");
    background-repeat: no-repeat;
    background-size: 14px 14px;
    background-position: 95%;
    box-shadow: 0 0 10px 0 #e9ecee;
    .mu-card-header {
      .mu-card-header-title {
        padding-right: 0px;
      }
      padding: 24px;
      .mu-card-title {
        font-size: 1.5rem;
      }
      .mu-card-sub-title {
        font-size: 1.3rem;
        width: 86%;
        font-family: PingFangSC-Regular;
      }
      .mu-avatar {
        background: rgba(1, 1, 1, 0);
        width: 30px;
        margin-right: 8px;
        height: 40px;
        img {
          border-radius: 0px;
          width: 24px;
          height: 24px;
        }
      }
    }
  }
  .to_home {
    .mu-card-title {
      margin-top: 8px;
    }
  }
  .pay_state {
    text-align: center;
    img {
      width: 87px;
      margin-top: 32px;
    }
    span {
      font-size: 1.3rem;
      color: #556074;
      line-height: 24px;
    }
    .pay_text {
      font-size: 1.9rem;
      margin: 8px 0px;
    }
    .pay_text_fail {
      color: #e34545;
    }
  }
}
</style>
