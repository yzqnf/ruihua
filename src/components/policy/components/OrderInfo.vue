<template>
  <div class="order_info">
    <img @click="showPopup" style="width: 14px;" src="../../../assets/img/icon_dot.png">
    <mu-popup position="bottom" popupClass="demo-popup-bottom" :open="bottomPopup" @close="showPopup(false)">
      <mu-appbar title="订单详情">
        <mu-icon-button disabled slot="left" />
        <img src="../../../assets/img/icon_close.png" slot="right" color="white" @click="showPopup(false)" />
      </mu-appbar>
      <mu-content-block class="order_info" v-bind:style="{height:screenHeight+'px'}" style="padding: 24px;">
        <span class="risk_name">{{policyData.risk.productName}}</span>
        <!-- 投被保人信息 -->
       
			  <section class="section_content border_bottom_style">
          <section class="order">
            <div class="order_item_h font-normal">投保人信息</div>
            <div class="order_item_b font-normal-light">{{policyData.holder.name}}
              <br/>{{policyData.holder.certType|commonFilter('certCode')}} {{policyData.holder.certCode}}
              <br/>{{policyData.holder.email}}
              <br/>{{policyData.holder.phone}}
              <br/>{{policyData.holder.county | addressFilter}}{{policyData.holder.address}}
            </div>
          </section>
          
					<!--  v-show="policyData.insureds[0].relationship=='0'" -->
          <section class="order" style="margin-top:24px">
            <div class="order_item_h font-normal">被保人信息</div>
            <div class="order_item_b font-normal-light">{{policyData.insureds[0].name}}
              <br/>{{policyData.insureds[0].certType|commonFilter('certCode')}} {{policyData.insureds[0].certCode}}
              <br/>{{policyData.insureds[0].email}}
              <br/>{{policyData.insureds[0].phone}}
              <br/>{{policyData.insureds[0].county | addressFilter}}{{policyData.insureds[0].address}}
            </div>
          </section>
          <!-- <section class="order" style="margin-top:24px">
            <div class="order_item_h font-normal">受益人信息</div>
            <div class="order_item_b font-normal-light">法定受益人
            </div>
          </section> -->
        </section>
        
				<!-- 产品信息 -->
        <section class="section_content border_bottom_style" style="padding-top:24px">
          <section class="order ">
            <div class="order_item_h font-normal">保障权益</div>
            <div class="order_item_b font-normal-light">
              <section>
                <div class="order_left">
                  保障计划
                </div>
                <div class="order_right">
                  {{prmData.cvrgList[0].NAmt | moneyFilter}}元
                </div>
                <div class="border_bottom_style"></div>
                <div style="padding:16px 0px 0px 0px">
                  <section style="clear:both" v-for="(item,index) in prmData.cvrgList" :key="index">
                    <div class="order_left">
                      {{item.CCustCvrgNme}}
                    </div>
                    <div class="order_right" v-if="item.CCvrgNo !== '200300'">
                      {{item.NAmt | moneyFilter}}元
                    </div>
                    <div class="order_right" v-else>
                      免费赠送
                    </div>
                  </section>
                  <div style="clear:both"></div>
                </div>
              </section>
            </div>
          </section>
        </section>

        <!-- 保险期限 -->
        <section class="section_content border_bottom_style" style="padding-top:26px">
          <section class="order ">
            <div class="order_item_h font-normal">保险期限</div>
            <div class="order_item_b">
              {{policyData.paramObj.CInsuYear | commonFilter('insuredTimeCode')}}
            </div>
          </section>
        </section>

        <!-- 缴费类型 -->
        <section class="section_content " style="padding-top:26px">
          <section class="order ">
            <div class="order_item_h font-normal">缴费类型</div>
            <div class="order_item_b ">
              <div class="order_left">
                {{policyData.paramObj.CFinTyp | commonFilter('typeCode')}}
              </div>
              <div v-if="policyData.paramObj.CFinTyp !=0" class="order_right">
                {{policyData.paramObj.NPayTime}}年
              </div>
            </div>
          </section>
        </section>
      </mu-content-block>
      <mu-raised-button @click="showPopup('k')" class="button-second next_btn" label="我知道了" />
    </mu-popup>
  </div>
</template>
<script>
export default {
  name: 'OrderInfo',
  components: {
  },
  data() {
    return {
			// 弹出框
      bottomPopup: false,
      screenHeight: document.documentElement.clientHeight * 0.75,
      prmData: {}
    }
  },
  props: {
		//显示
		show: Boolean,
		//保单数据
    policyData: Object
  },
  watch: {
		// 显示
    show(val) {
      this.bottomPopup = true;
    }
  },
  created() {
		// 初始化数据
    if (typeof this.policyData.risk.calculateJson === "string") {
      this.prmData = JSON.parse(this.policyData.risk.calculateJson);
    } else {
      this.prmData = this.policyData.risk.calculateJson;
    }
  },
  methods: {
    showPopup(type) {
      this.bottomPopup = !this.bottomPopup;
      if (type == 'k') {
        this.$emit('konw');
      }
    }
  },
  computed: {

  },
  mounted() {

  }
}
</script>
<style lang='scss' >
.order_info {
  //
  .risk_name {
    font-size: 1.7rem;
    color: #394043;
    letter-spacing: 0;
    line-height: 17px;
  }
  .border_bottom_style {
    border-bottom: 1px solid #E9ECEE;
    min-height: 16px;
    clear: both;
  }
}
</style>

