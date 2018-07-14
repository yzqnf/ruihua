<template>
  <div class="person-info">
    <section>
      <!-- 本人 -->
      <section style="transition: all .25s linear;">
        <div class="group-title">{{title}}</div>
				<!-- 内容区域 -->
        <section class="pd-lg">
          <div class="field">
            <label>姓名</label>
						<!-- :disabled="isAuth && isHolder" -->
            <ValidatorInput :disabled="isAuth && isHolder"  :form.sync="validateObj.name" :validator="{rules:['require:请输入姓名','name:姓名不符合规则校验',{reg:/^\S{2,10}$/,msg:'姓名长度应该为2-10个汉字'}]}" v-model="personInfo.name" hintText="请输入姓名" fullWidth />
          </div>
          <div class="field">
            <label>证件类型</label>
            <mu-select-field @change="change" :disabled="isHolder && isAuth" hintText="请选择证件类型" iconClass="cloud_download" v-model="personInfo.certType">
              <mu-menu-item v-for="(item, index)  in certCode" :key="index" :value="item.code" :title="item.desc" />
            </mu-select-field>
            <img src="../../../assets/img/icon_right.png" />
          </div>
          <div class="field">
            <label>证件号码</label>
            <ValidatorInput  needRule="true" :disabled="isHolder && isAuth" :form.sync="validateObj.certCode" :validator="{rules:['require:请输入证件号码',personInfo.certType=='0'?'idcard:证件号码不符合规则校验':'passport:证件号码不符合规则校验']}" v-model="personInfo.certCode" :hintText="isHolder?title=='您的信息'?'请填写证件号码':'请填写投保人证件号码':'请填写被保人证件号码'" fullWidth />
          </div>
          <div class="field">
            <label>电话</label>
            <ValidatorInput type="tel" :form.sync="validateObj.phone" :validator="{rules:['require:请输入手机号码','mobile:请输入正确的手机号']}" v-model="personInfo.phone" hintText="请填写正确的手机号码" fullWidth />
          </div>
          <div class="field">
            <label>电子邮箱</label>
            <ValidatorInput :form.sync="validateObj.email" :validator="{rules:['require:请输入邮箱地址','email:请输入正确的邮箱地址',{reg:/^\S{3,30}$/,msg:'请输入正确的邮箱地址'}]}" v-model="personInfo.email" hintText="请输入邮箱地址" fullWidth />
          </div>
          <div class="field has-img" @click="addressModal=!addressModal">
            <label>常住地</label>
            <!-- <mu-text-field v-model="addressData.text" hintText="常住地" fullWidth disabled/> -->
            <div v-if="!addressData.text||addressData.text == ''" style="color: rgba(0,0,0,.38);" class="input_box">请选择常住地址</div>
            <div v-else class="input_box font-normal">{{addressData.text}}</div>
            <img src="../../../assets/img/icon_right.png" />
          </div>
          <div class="field">
            <label></label>
            <ValidatorInput v-if="riskType != '2'" :form.sync="validateObj.address" :validator="{rules:['require:请填写详细地址',{reg:/^\S{2,50}$/,msg:'地址长度为2-50个文字'}]}" v-model="personInfo.address" hintText="请填写详细地址" fullWidth isMultiLine="2-2" />
            <ValidatorInput v-else :form.sync="validateObj.address" :validator="{rules:[]}" v-model="personInfo.address" hintText="请填写详细地址" fullWidth isMultiLine="2-2" />
          </div>
        </section>
      </section>
    </section>
    <!-- 地址控件 -->
    <DistrictAddress @onSelected="onSelected" :openModal="addressModal" :title="'请选择常住地址'" :data="addressData"></DistrictAddress>
  </div>
</template>
<script>
// 码表
import CodeData from '../../../assets/data/CodeData'
export default {
  name: 'personInfo',
  components: {
		// 地址控件
    DistrictAddress: r => { require(['../../common/DistrictAddress'], r) }
  },
  data() {
    return {
			// 地址信息
      addressData: {
        province: this.personInfo.province,
        provinceDesc: this.personInfo.provinceDesc,
        city: this.personInfo.city,
        cityDesc: this.personInfo.cityDesc,
        area: this.personInfo.county,
        areaDesc: this.personInfo.countyDesc,
        text: this.personInfo.countyDesc
      },
			addressModal: false,
			//证件类型码表
			certCode: CodeData.certCode,
			//是否实名认证
      isAuth: utils.cache.get("user").isAuth//判断是否验证
    }
  },
  created() {
		// 初始化数据
    this.personInfo.certType = parseInt(this.personInfo.certType);
  },
  props: {
    personInfo: Object,//用户信息
    title: String,//标题
    validateObj: Object,//验证对象
    isHolder: Boolean,//是否为投保人
    isChange: String,//信息是否改变
    riskType: String//险种类型
  },
  watch: {
    //监听对象的属性变化----证件号码
    ['addressData.text'](curVal, oldVal) {
      this.validateObj.allStatus = this.getAllStatus(this.validateObj) && this.addressData.text && !isNaN(this.personInfo.certType);
    },
    //监听地址变化   ---区
    ['addressData.text'](curVal, oldVal) {
      this.validateObj.allStatus = this.getAllStatus(this.validateObj) && this.addressData.text && !isNaN(this.personInfo.certType);
    },
    ['personInfo.certCode'](curVal, oldVal) {
      // console.log("我变了" + this.isChange)
      this.$emit("update:isChange", curVal);
    },
    //监听地址变化
    ['personInfo.countyDesc'](curVal, oldVal) {
      !curVal && (this.addressData = {
        province: this.personInfo.province,
        provinceDesc: this.personInfo.provinceDesc,
        city: this.personInfo.city,
        cityDesc: this.personInfo.cityDesc,
        area: this.personInfo.county,
        areaDesc: this.personInfo.countyDesc,
        text: this.personInfo.countyDesc
      })
    },
    //监听验证对象变化
    validateObj: {
      handler: function(val, oldVal) {
        this.validateObj.allStatus = this.getAllStatus(this.validateObj) && this.addressData.text && !isNaN(this.personInfo.certType);
      },
      deep: true
    }
  },
  methods: {
    //地址选择后 对投被保人的信息进行写入
    onSelected(val) {
      this.personInfo.province = val.province;
      this.personInfo.provinceDesc = val.provinceDesc;
      this.personInfo.city = val.city;
      this.personInfo.cityDesc = val.cityDesc;
      this.personInfo.county = val.area;
      this.personInfo.countyDesc = val.areaDesc;
      this.addressData.text = val.areaDesc;
    },
    /**
     * 当证据类型改变的时候
     */
    change() {
      this.validateObj.allStatus = this.getAllStatus(this.validateObj) && this.addressData.text && !isNaN(this.personInfo.certType);
      if (this.personInfo.certCode) {
        this.personInfo.certCode += " ";
        setTimeout(() => {
          this.personInfo.certCode = this.personInfo.certCode.replace(/(^\s*)|(\s*$)/g, "")
        }, 200);
      }
    },
    /**
     * 检查信息
     */
    getAllStatus(obj) {
      let valiStr = 'text-allStatus-needRet';
      //判断长短险种 短险种不需要地址校验 1长险 2短险
      if (this.riskType == '2') {
        valiStr += "-address"
      }
      for (let key in obj) {
        if (valiStr.indexOf(key) < 0 && !obj[key].status) {
          return false;
        }
      }
      return true;
    }
  }
}
</script>
<style lang='scss' scoped>
.person-info {
  .has-img img {
    height: 1.2rem;
    margin-top: 15px;
    position: absolute;
    z-index: 2;
    right: 14px;
    background: white;
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

