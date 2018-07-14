<template>
  <!-- <page :hideFooter="'false'" wBg="true"> -->
  <div class="page_health has_end">
    <section class="content_text" style="padding:16px 24px;max-height:calc(100% - 54px);padding-top: 0px;">
      <p>
        被保险人是否存在下述情况：
      </p>
      <section v-for="(item,index) in data" :key="index">
        <p>
          {{item.title}}
          <br/>{{item.content}}
          <div class="mu-text-field-line" style="position:relative"></div>
        </p>
      </section>
    </section>
    <section class="he_footer footer_fixd">
      <mu-raised-button style="background:white" @click="chooseSome(false)" class="he_footer_item font-primary button-second next_btn" label="是" />
      <mu-raised-button style="background:white" @click="chooseSome(true)" class="he_footer_item button-second next_btn" label="否" />
    </section>
  </div>
  <!-- </page> -->
</template>

<script>
import healthData from "../../assets/data/health";
import personInfo from "./data/person";
export default {
  name: "Health",
  components: {},
  data() {
    return {
			// 
      data: healthData
    };
  },
  methods: {
    /**
		 * @augments flag标志位
		 * 选择了部分 跳转订单页面
		 */
    chooseSome(flag) {
      //初始化页面数据
      let policyInfo = utils.cache.get("PUTPOLICYINFO"),
        wxConfig = utils.cache.get("wxConfig"),
        req = {
          openId: wxConfig.openId,
          orderId: policyInfo.orderId,
          isPass: flag
        };
      utils.http
        .post("ORDERSAVEHEALTHINFO", req)
        .then(response => {
          if (flag) {
            //进行数据赛值
            this.mergePolicy(policyInfo);
          }
        })
        .catch(error => {
          if (!flag) {
            utils.ui.alert("抱歉，被保险人未到达购买此产品的健康要求", () => {
              window.history.back();
            });
          }
        });
    },
    /**
    * 对象合并
    */
    mergePolicy(newObj) {
      let user = utils.cache.get("user");
      console.log("用户对象", personInfo, utils.cache.get("user"));
      console.log("入参", newObj);
      //塞入地区中文 投保人
      if (newObj.holder) {
        newObj.holder.provinceDesc = utils.help.getAddressOfCn(
          newObj.holder.province
        );
        newObj.holder.cityDesc = utils.help.getAddressOfCn(newObj.holder.city);
        newObj.holder.countyDesc = utils.help.getAddressOfCn(
          newObj.holder.county
        );
      }
      //塞入地区中文 被保人
      if (newObj.insureds) {
        newObj.insureds[0].provinceDesc = utils.help.getAddressOfCn(
          newObj.insureds[0].province
        );
        newObj.insureds[0].cityDesc = utils.help.getAddressOfCn(
          newObj.insureds[0].city
        );
        newObj.insureds[0].countyDesc = utils.help.getAddressOfCn(
          newObj.insureds[0].county
        );
      }
      // ----------- 给投保人初始化数据
      !newObj.holder &&
        (newObj.holder = {}) &&
        (newObj.holder = {
          name: user.CName || newObj.holder.name,
          certType: user.CCertfCls || newObj.holder.certType,
          certCode: user.CCertfCde || newObj.holder.certCode || "",
          phone: user.CMobile || newObj.holder.phone,
          email: user.CEmail || newObj.holder.email,
          province: user.CAddrProvince || newObj.holder.province,
          provinceDesc: utils.help.getAddressOfCn(user.CAddrProvince),
          city: user.CAddrCity || newObj.holder.city,
          cityDesc: utils.help.getAddressOfCn(user.CAddrCity),
          county: user.CAddrDistrict || newObj.holder.county,
          countyDesc: utils.help.getAddressOfCn(user.CAddrDistrict),
          address: user.CAddrDetail || newObj.holder.address
        });
      // 进行初始化
      //如果是本人的情况下 清除被保人信息
      if (
        newObj.insureds &&
        newObj.insureds.length == 1 &&
        newObj.insureds[0].relationship == this.constSet.oneself
      ) {
        delete newObj.insureds;
      }
      let obj = Object.assign(personInfo, newObj);
      obj.openId = utils.cache.get("wxConfig").openId;
      obj.premium = newObj.risk.premium;
      //存储投保数据
      console.log(obj);
      utils.cache.set("PUTPOLICYINFO", obj);
      this.$router.push({ name: "policyInfo" });
    }
  }
};
</script>
