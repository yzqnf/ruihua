<template>
  <div class="page page-privilege packs-to-take">
    <div class="black-header">
      <img src="../../../../assets/img/privilege/pic_packs_to_take.png">
    </div>
    <section class="privilege-packs">
      <div class="teeth-pack card-shadow"  @click="$router.push('teethPackDetail')">
        <img class="radius-top-2" src="../../../../assets/img/privilege/pic_teeth_cleaning_pack.jpg" style="width:100%">
        <div class="pack-row">
          <div class="pack-content">            
            <div class="title">牙齿健康套餐</div>
            <div class="description"><span>意外牙科治疗险</span><span>洁牙卡</span></div>
          </div>
          <mu-raised-button 
            class="take-button" 
            label="立即领取" 
            @click.stop="open(1)">
          </mu-raised-button>
        </div>
      </div>
      <div class="health-pack card-shadow" @click="$router.push('healthPackDetail')">
        <img class="radius-top-2" src="../../../../assets/img/privilege/pic_health_pack.jpg" style="width:100%">
        <div class="pack-row">
          <div class="pack-content">            
            <div class="title">健康管家服务套餐</div>
            <div class="description"><span>癌无忧防癌险</span><span>健康管家服务卡</span></div>
          </div>
          <mu-raised-button 
            class="take-button" 
            label="立即领取"
            @click.stop="open(2)">
          </mu-raised-button>
        </div>
      </div>
    </section>
    <mu-dialog dialogClass="dialog packs-to-take-dialog" :open="dialog" @close="close">
      <div class="dialog-content">
        <div class="packs-to-take-dialog-title">领取{{type | packNameFilter}}</div>
        <div class="packs-to-take-dialog-description">您是否确认领取该套餐，领取后将不可更改</div>
      </div>
      <div class="buttons">
        <mu-flat-button slot="actions" class="action-button" @click="close" label="取消"/>
        <mu-flat-button slot="actions" class="action-button" @click="takePack" label="确定"/>
      </div>
    </mu-dialog>
  </div>
</template>

<script>
export default {
  name: 'packsToTake',
  components: {

  },
  filters: {
    packNameFilter(val) {
      if(val == 1) return '牙齿健康套餐'
      else return '健康管家服务套餐'
    },
  },
  data() {
    return {
      dialog: false,
      type: 1, //1.牙齿健康套餐；2.健康管家服务套餐
    }
  },
  computed: {

  },
  watch: {
  
  },
  mounted() {
  
  },
  methods: {
    open (type) {
      this.type = type
      this.dialog = true
    },
    close () {
      this.dialog = false
    },
    takePack() {
      this.close()
      let model = {
        cardId: 'BCM0001',
        //openId: 'oM9JHwQDXbqlMrMNgKpahUNIcvAUB',
        openId: utils.cache.get('wxConfig').openId,
        activityId:'ac2017090801',
      }
      if(this.type == 1){
        model.packageId = 'ncp2017090801'     //洁牙套餐
      }else if(this.type == 2){
        model.packageId = 'ncp2017090802'  //健保套餐
      }
      utils.http.post('RECEIVEPROFITLIST', model).then(response => {
        console.log('RECEIVEPROFITLIST.response.data', response.data)
                  utils.ui.toast('领取成功')
          this.$emit('takePackSuccess',this.type)
        if(response.data.body){
          //领取成功
          utils.ui.toast('领取成功')
          this.$emit('takePackSuccess',this.type)
        }else{
          //领取失败
          utils.ui.toast('领取失败')
        }
      }).catch(error => {
        utils.ui.toast(error.errorMessage)
      })
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped >
@import 'src/assets/css/privilege';
.page-privilege.packs-to-take{
  .privilege-packs {
    margin: -40px 16px 16px 16px;
  }
  .privilege-packs>div {
    background: #FFF;
    margin-bottom: 20px;
  }
  .pack-row {
    display: flex;
    align-items: center;
    padding:16px 16px 16px 20px;
  }
  .pack-row .pack-content {
    width:70%;
  }
  .pack-row .pack-content .title {
    padding-bottom:8px;
  }
  .pack-row .take-button {
    width:20%;
    color:$golden-color;
    font-size:1.2rem;
    border: 1px solid $golden-color;
    border-radius: 2px;
  }
  .description {
    line-height:12px;
    padding-right:6px;
  }
  .description span:nth-child(1) {
    padding-right:6%;
    border-right: 1px solid #556074;
  }
  .description span:nth-child(2) {
    padding-left:5%;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss" >
@import 'src/assets/css/privilege';

</style>