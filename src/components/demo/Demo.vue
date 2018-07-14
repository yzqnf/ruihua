<template>
  <div class="page">
    <mu-appbar title="Demo">
      <mu-icon-button @click="back('home')" icon="chevron_left" slot="left" />
      <mu-icon-button disabled slot="right" />
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
          <mu-text-field hintText="用户名" v-model="username" />
          <br/>
          <mu-text-field hintText="密码" errorText="输入格式错误" v-model="password" />
          <br/>
          <button :class="{'button-primary': username&&password, 'button-disabled': !(username&&password)}">登　录</button><br/><br/>
          <button @click="getAddressData()" class="button-primary">登　录</button><br/><br/>
        </div>
      </div>
      <div v-if="activeTab === 'tab2'" :style="{width: '100%',height:contentHeight+'px'}">
        <div class="pd-lg">
          <mu-raised-button class="button-primary" label="按钮样式一（提示）" /><br/>
          <mu-raised-button class="button-second" label="按钮样式二（底部）" /><br/>
          <mu-raised-button class="button-disabled" label="按钮样式三（禁用）" disabled/><br/>
          <mu-raised-button @click="toast" label="toast" primary/>
          <mu-raised-button @click="snackbar" label="snackbar" primary/>
          <mu-raised-button @click="dialog" label="dialog" primary/>
          <mu-raised-button @click="popup" label="popup" primary/>
          <mu-raised-button @click="loadding" label="loadding" primary/>
          <mu-raised-button @click="customDialog" label="custom" primary/>
          <CustomDialog :show.sync="showCustomDialog" headPic="../../assets/img/head.jpg">
            <p>fejwifwe</p>
            <p>fejwifwe</p>
            <p>fejwifwe</p>
            <p>fejwifwe</p>
            <p>fejwifwe</p>
            <p>fejwifwe</p>
          </CustomDialog>

          <div style="border:1px solid green;overflow-x:auto;">
            <mu-tabs :value="testTab" @change="handleTestTabChange" style="width:1000px;">
              <mu-tab value="tab1" title="tab1" />
              <mu-tab value="tab2" title="tab2" />
              <mu-tab value="tab3" title="tab3" />
              <mu-tab value="tab4" title="tab4" />
              <mu-tab value="tab5" title="tab5" />
              <mu-tab value="tab6" title="tab6" />
              <mu-tab value="tab7" title="tab7" />
              <mu-tab value="tab8" title="tab8" />
              <mu-tab value="tab9" title="tab9" />
              <mu-tab value="tab10" title="tab10" />
            </mu-tabs>
          </div>
        </div>

        <mu-raised-button @click="showZoom = true" class="button-primary" label="zoom" /><br/>
        <zoom title="放大缩小" :show.sync="showZoom">
          <img style="width:100%;" src="../../assets/img/product-detail-read.png">
        </zoom>
      </div>
      <div v-if="activeTab === 'tab3'" :style="{width: '100%',height:contentHeight+'px'}">
        <div class="pd-lg">
          <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
            <!-- slides -->
            <swiper-slide>
              <img style="width:100%;" src="../../assets/img/product-detail-header.png" alt="">
            </swiper-slide>
            <swiper-slide>
              <img style="width:100%;" src="../../assets/img/product-detail-header.png" alt="">
            </swiper-slide>
            <swiper-slide>
              <img style="width:100%;" src="../../assets/img/product-detail-header.png" alt="">
            </swiper-slide>
            <swiper-slide>
              <img style="width:100%;" src="../../assets/img/product-detail-header.png" alt="">
            </swiper-slide>
            <swiper-slide>
              <img style="width:100%;" src="../../assets/img/product-detail-header.png" alt="">
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-scrollbar" slot="scrollbar"></div>
          </swiper>

          <div class="group-title">标题一</div>
          <div class="mg-lg pd-lg box-bg">
            内容区域
            <div>
              <a href="">超链接</a>
            </div>
          </div>

        </div>
      </div>
    </mu-content-block>
    <mu-tabs style="position:fixed;bottom:0;" :value="activeTab" @change="handleTabChange">
      <mu-tab value="tab1" title="表单" />
      <mu-tab value="tab2" title="弹窗" />
      <mu-tab value="tab3" title="字体" />
    </mu-tabs>
  </div>
</template>

<script>
import addressDate from '../../assets/lib/vDistpicker/src/districts'
import selectButton from '../common/SelectButton'
import Toast from '../common/Toast.vue'
import AddData from '../../assets/lib/vDistpicker/src/rhdistricts'
import textData from './test'
import store from '../../vuex/store'
import Zoom from '../common/Zoom.vue'
import CustomDialog from '../common/CustomDialog.vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
require('swiper/dist/css/swiper.css')

export default {
  name: 'demo',
  components: {
    selectButton,
    'toast': Toast,
    'zoom': Zoom,
    swiper,
    swiperSlide,
    CustomDialog
  },
  data() {
    return {
      bottomPopup: false,
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
      showZoom: false,
      showCustomDialog:false,
      insureList: [
        { name: 'name1', value: 'value1' },
        { name: 'name2', value: 'value2', disabled: true },
        { name: 'name3', value: 'value3' },
      ],
      banners: ['/1.jpg', '/2.jpg', '/3.jpg'],
      notNextTick: true,
      swiperOption: {
        autoplay: 3000,
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true,
        debugger: true,
        onTransitionStart(swiper) {
          console.log(swiper)
        }
      }
    }
  },
  methods: {
    handleTabChange(value) {
      this.activeTab = value
    },
    handleTestTabChange(value) {
      this.testTab = value
    },
    toast() {
      utils.ui.toast('自定义toast内容', require('../../assets/img/icon_service.png'))
    },
    snackbar() {
      utils.ui.snackbar('自定义提示框内容')
    },
    dialog() {
      utils.ui.dialog('自定义对话框内容', require('../../assets/img/common/icon_warning.png'), ['确定购买', '下次再说'], index => {
        alert(index)
      })
    },
    popup() {
      utils.ui.popup('自定义弹出窗标题', '自定义弹出窗内容', () => {
        alert('关闭了弹出窗')
      })
    },
    loadding() {
      store.commit('LOADING', {
        loading: true,
        msg: '正在加载'
      })
    },
    customDialog() {
      this.showCustomDialog = !this.showCustomDialog
    },
    getAddressData() {
      console.log(addressDate)
      for (var key in addressDate) {
        console.log(key)
      }
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
