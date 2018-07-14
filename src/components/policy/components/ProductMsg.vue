<template>
  <section>
    <div class="pd-lg box-bg box-bg-black">
      <mu-checkbox v-model="checkObj.isChecked" label="" class="demo-checkbox" />
      <p>我已阅读
        <a @click="showModal('bottom','1')">《保险条款》</a>、
        <!-- <a @click="showModal('bottom','2')">产品说明书</a>、 -->
        <a @click="showModal('bottom','3')">《投保须知》</a>、
        <a @click="showModal('bottom','3')">《投保声明》</a>和
        <a @click="showModal('bottom','4')">《反洗钱声明》</a>
        <!-- 和 -->
        <!-- <a @click="showModal('bottom','4')">投保提示书</a> -->
        ，并了解本产品的特点。
      </p>
    </div>
    <ContentTemplet :openModal="checkObj.moneyModal" :type="'1'"></ContentTemplet>
  </section>
</template>
<script>
export default {
  name: "productionMsg",
  components: {
    ContentTemplet: r => {
      require(["../../../components/common/ContentTemplate"], r);
    }
  },
  data() {
    return {
      isCheck: this.isChecked
    };
  },
  props: {
    checkObj: Object
  },
  watch: {
    open(value) {
      this.isCheck.bottomPopup = true;
    },
    ["checkObj.isChecked"](val) {
      // !globalConfig.isDebug && val && this.$router.push({ name: "clauseList", params: { productId: utils.cache.get("PUTPOLICYINFO").paramObj.CProdNo } });
    }
  },
  methods: {
    //显示协议对象
    showModal(position, type) {
      let map = {
        "1": "clauseList",
        "2": "产品说明书",
        "3": "insureNotes",
        "4": "反洗钱声明"
      };
      if (type == "1" || type == "3") {
        this.$router.push({
          name: map[type],
          params: {
            productId: utils.cache.get("PUTPOLICYINFO").paramObj.CProdNo
          }
        });
      } else if (type == "2") {
        utils.wx.wxSetTitle(map[type]);
        this.checkObj.openModal = !this.checkObj.openModal;
      }else if(type == "4"){
				this.$router.push({name:"moneyLaundering"})
			}
    }
  }
};
</script>
<style lang='scss' >
.beneficiary {
  .pd-msg {
    padding: 17px 24px;
    font-size: 1.3rem;
    color: #556074;
    line-height: 26px;
  }
}
</style>

