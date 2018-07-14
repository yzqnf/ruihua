<template>
  <div class="page mine-page page-my-address">
    <mu-content-block class="has-header no-padding">
      <section v-bind:style="{'min-height':screenHeight - 81 +'px'}">
        <section class="mine-header bg-primary">
        </section>
        <section class="mine-avatar mine-section mg-lg">
          <div class="mine-inner-group mg-lg" @click="addressModal=!addressModal">
            <!--<ValidatorInput :form.sync="validateObj.addressText" :validator="{rules:['require']}" 
              v-model="addressText" hintText="选择常住地址" class="address-text" fullWidth disabled/>-->
            <div v-if="!addressText||addressText == ''" style="color: rgba(0,0,0,.38);" class="input_box">选择常住地址</div>
            <div v-else class="input_box font-normal">{{addressText}}</div>
            <img src="../../assets/img/icon_right.png" class="arrow-right"/>
          </div>
          <div class="mine-inner-group mg-lg">
            <ValidatorInput :form.sync="validateObj.addrDetail" :validator="{rules:['require',{reg:/^(\S|\s){0,50}$/,msg:'详细地址不超过50个字符'}]}" 
              v-model="addressModel.addrDetail" hintText="填写详细地址" fullWidth isMultiLine="1-2"/>
          </div>
          <div class="mine-inner-group mg-lg">
            <mu-raised-button @click="submit" 
              :disabled="isDisabled" :class="buttonClassObject" label="提交"/>          
          </div>
        </section>
      </section>
      <rh-footer></rh-footer>
    </mu-content-block>
    <toast :show="toast" @update="handleResult">
      <div class="mine-toast">
        <img src="../../assets/img/mine/icon_add_address_succeeded.png">
        <div>地址修改成功</div>
      </div>
    </toast>
    <!-- 地址控件 -->
    <DistrictAddress @onSelected="onSelected" :openModal="addressModal" :title="'选择常住地址'" :data="addressData"></DistrictAddress>
  </div>
</template>

<script>
import LogoFooter from './../common/LogoFooter.vue'
import Toast from '../common/Toast.vue'
export default {
  name: 'myAddress',
  components: {
    'rh-footer': LogoFooter,
    'toast': Toast,
    DistrictAddress: r => { require(['../common/DistrictAddress'], r) },
  },
  data() {
    return {
      addressData: {
      },
      addressText: '',
      addressModal: false,
      toast: false,
      addressModel:{
        'addrProvince': '',
        'addrCity': '',
        'addrDistrict': '',
        'addrDetail': '',
        'userId':''
      },
      validateObj: {
        addrDetail: {},
      },
      screenHeight: document.documentElement.clientHeight,
    }
  },
  methods: {
    showToast(flag) {
      this.toast = flag
    },
    //地址选择后
    onSelected(val) {
      this.addressModel.addrProvince = val.province;
      this.addressModel.addrCity = val.city;
      this.addressModel.addrDistrict = val.area;
      this.addressText = val.areaDesc;
    },
    submit() {
      utils.http.post('ADDRESS', this.addressModel).then(response => {
        console.log(response.data)
        //存cache
        let user = utils.cache.get('user')
        user.CAddrProvince = this.addressModel.addrProvince
        user.CAddrCity = this.addressModel.addrCity
        user.CAddrDistrict = this.addressModel.addrDistrict
        user.CAddrDetail = this.addressModel.addrDetail
        utils.cache.set('user', user)
        this.showToast(true)
      }).catch(error => {
        if (error.isLogicError) {
          utils.ui.dialog(error.errorMessage, require('../../assets/img/common/icon_warning.png'), [], index => {
          })
        }
      })
    },
    handleResult(){
      this.toast = false
      window.history.back()
    }
  },
  computed: {
    isDisabled() {
      return !(this.validateObj.addrDetail.status && this.addressText)
    },
    buttonClassObject() {
      return {
        'button-primary': !this.isDisabled,
        'button-disabled': this.isDisabled,
      }
    }
  },
  activated() {
    //获取user信息
    console.log(utils.cache.get('user'))
    let userInfo = utils.cache.get('user')
    this.addressModel.userId = userInfo.CUserId
    if(userInfo.CAddrProvince){
      this.addressModel.addrProvince = userInfo.CAddrProvince
      this.addressModel.addrCity = userInfo.CAddrCity
      this.addressModel.addrDistrict = userInfo.CAddrDistrict
      this.addressModel.addrDetail = userInfo.CAddrDetail
      let district = utils.help.getAddressOfCn(userInfo.CAddrDistrict)
      this.addressText = district
    }
  } 
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped >
@import 'src/assets/css/mine';
.page-my-address {
  .mine-avatar {
    height: 215px;
    margin-top: -104px;
    .mine-inner-group:first-child{
      padding-top: 24px;
    }
    .mine-inner-group:nth-child(2) {
      margin-bottom: -20px;
    }
    .arrow-right {
      position: absolute;
      z-index: 2;
      right:40px;
      top: 52px;
      width: 14px;
      height: 14px;
    }
  }
  .input_box {
    border-bottom: 1px solid rgb(233, 236, 238);
    width: 100%;
    height: 39px;
    line-height: 39px;
    font-size: 1.3rem;
    overflow: hidden;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
@import 'src/assets/css/mine';
.page-my-address {
  .address-text input:disabled {
    -webkit-text-fill-color: #394043;
  }
}
</style>