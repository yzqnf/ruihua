<template>
  <div class="page">
    <mu-appbar title="Demo">
      <mu-icon-button @click="back('home')" icon="chevron_left" slot="left" />
      <mu-icon-button disabled slot="right"/>
    </mu-appbar>
  
    <mu-content-block class="has-header" style="padding:0;">
      <div v-if="activeTab === 'tab1'" :style="{overflow:'auto',width: '100%',height:contentHeight+'px'}">
        <div class="pd-lg">
          <mu-stepper :activeStep="activeStep" class="step">
            <mu-step>
              <mu-step-label style="flex-direction:column;">
                <span>验证账号</span>
              </mu-step-label>
            </mu-step>
            <mu-step>
              <mu-step-label>
                <span>重置密码</span>
              </mu-step-label>
            </mu-step>
            <mu-step>
              <mu-step-label>
                <span>　完成　</span>
              </mu-step-label>
            </mu-step>
          </mu-stepper>
          <mu-text-field hintText="用户名" v-model="username"/>
          <br/>
          <mu-text-field hintText="密码" errorText="输入格式错误" v-model="password"/>
          <br/>
          <button :class="{'button-primary': username&&password, 'button-disabled': !(username&&password)}">登　录</button><br/><br/>
        </div>
      </div>
      <div v-if="activeTab === 'tab2'" :style="{width: '100%',height:contentHeight+'px'}">
        <div class="pd-lg">
          <mu-raised-button @click="showDialog(true)" class="button-primary" label="按钮样式一（提示）"/><br/><br/>
          <mu-raised-button @click="showPopup(true)" class="button-second" label="按钮样式二（底部）"/><br/><br/>
          <mu-raised-button class="button-disabled" label="按钮样式三（禁用）" disabled/><br/><br/>
          <mu-raised-button @click="showToast(true)" class="button-primary" label="Toast"/><br/><br/>

          <select-button :selectList = "insureList" :selectModel.sync = "insure"></select-button>          
          
          <div style="border:1px solid green;overflow-x:auto;">
            <mu-tabs :value="testTab" @change="handleTestTabChange" style="width:1000px;">
              <mu-tab value="tab1" title="tab1"/>
              <mu-tab value="tab2" title="tab2"/>
              <mu-tab value="tab3" title="tab3"/>
              <mu-tab value="tab4" title="tab4"/>
              <mu-tab value="tab5" title="tab5"/>
              <mu-tab value="tab6" title="tab6"/>
              <mu-tab value="tab7" title="tab7"/>
              <mu-tab value="tab8" title="tab8"/>
              <mu-tab value="tab9" title="tab9"/>
              <mu-tab value="tab10" title="tab10"/>
            </mu-tabs>
          </div>

          <toast :show="toast" @update="((val) => toast = val)">
            <mu-icon value="security" color="#52C750" :size="36"/>
            <div>身份认证成功</div>
          </toast>          
          <mu-dialog dialogClass="dialog" :open="isShowDialog" @close="showDialog(false)">
            <div class="center pd-hg">
              <img class="dialog-icon" src="../../assets/img/common/icon_warning.png">
              <div class="dialog-content">账号名与密码不匹配</div>
            </div>
            <div class="dialog-button-box">
              <button @click="showDialog(false)">重新输入</button>
              <button @click="showDialog(false)">找回密码</button>
            </div>
          </mu-dialog>

          <mu-popup position="bottom" popupClass="demo-popup-bottom" :open="bottomPopup" @close="showPopup(false)">
            <mu-appbar title="弹出">
              <mu-icon-button disabled slot="left" />
              <mu-icon-button slot="right" icon="close" color="white" @click="showPopup(false)"/>
            </mu-appbar>
            <div class="pd-lg">
              Popup 弹出框组件，可以从上下左右四个方位弹出，也可以直接渐变透明度显示，弹出框的宽度高度需要自己设置
            </div>
          </mu-popup>
        </div>
      </div>
      <div v-if="activeTab === 'tab3'" :style="{width: '100%',height:contentHeight+'px'}">
        <div class="pd-lg">
          <div class="group-title">标题一</div>
          <div class="mg-lg pd-lg box-bg">
            内容区域
            <div><a href="">超链接</a></div>
          </div>
        </div>
      </div>
    </mu-content-block>
    <mu-tabs style="position:fixed;bottom:0;" :value="activeTab" @change="handleTabChange">
      <mu-tab value="tab1" title="表单"/>
      <mu-tab value="tab2" title="弹窗"/>
      <mu-tab value="tab3" title="字体"/>
    </mu-tabs>
  </div>
</template>

<script>
import selectButton from '../common/SelectButton'
import Toast from '../common/Toast.vue'

export default {
	name: 'demo',
	components: {
		selectButton,
    'toast': Toast
	},
  data() {
    return {
      bottomPopup:false,
      isShowDialog: false,
      activeTab: 'tab1',
      testTab: 'tab1',
      activeStep: 0,
      auto: 99999,
      state: true,
      contentHeight: document.documentElement.clientHeight - 96,
      username: '',
      password: '',
      insure: 'value1', //默认值value1
      insureList: [
        { name: 'name1', value: 'value1' },
        { name: 'name2', value: 'value2', disabled: true },
        { name: 'name3', value: 'value3' },
      ],
      toast: false
    }
  },
  methods: {
    handleTabChange (value) {
      this.activeTab = value
    },
    handleTestTabChange(value) {
      this.testTab = value
    },
    trigger () {
      this.state = !this.state
    },
    showDialog(flag) {
      this.isShowDialog = flag
    },
    showPopup(flag) {
      this.bottomPopup = flag
    },
    showToast(flag) {
      this.toast = flag
    }
  },
  computed: {
    
  },
  mounted() {
    
  }
}
</script>
<style>

</style>