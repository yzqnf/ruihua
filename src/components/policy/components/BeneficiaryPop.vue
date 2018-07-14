<template>
  <div class="beneficiary">
    <mu-popup position="bottom" popupClass="demo-popup-bottom" :open="bottomPopup" @close="showPopup(false)">
      
			<mu-appbar title="受益人信息">
        <mu-icon-button disabled slot="left" />
        <img src="../../../assets/img/icon_close.png" slot="right" color="white" @click="showPopup(false)" />
      </mu-appbar>
      <!-- 受益人内容 -->
			<mu-content-block class="beneficiary no-padding" >
        <p class="pd-msg">
          依照《中华人民共和国继承法》规定，第一顺序的继承人为配偶、父母、子女。第二顺序的继承人为兄弟姐妹、祖父母、外祖父母。 继承开始后，由第一顺序继承人继承，没有第一顺序继承人继承的，由第二顺序继承人继承。
        </p>
      </mu-content-block>
      <mu-raised-button @click="showPopup('k')" class="button-second next_btn" label="我知道了" />
    </mu-popup>
  </div>
</template>
<script>
export default {
  name: 'beneficiaryPop',
  components: {
  },
  data() {
    return {
      bottomPopup: false,
    }
  },
  props: {
    openModal: Boolean,//弹出框
  },
  watch: {
    openModal(value) {
      this.bottomPopup = true;
    }
  },
  methods: {
		//打开弹出框
    showPopup() {
      this.bottomPopup = false;
    }
  }
}
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

