<template>
  <div v-bind:class="[wBg?'':'page']" style="overflow-y: hidden;">
    <div class="content-scroll" ref="content">
      <div class="content" v-bind:style="{'min-height':screenHeight - footerHeight +'px'}">
        <!--防止垂直margin的合并机制-->
        <div class="prevent-margin-merge"></div>
        <slot></slot>
      </div>
      <Logo-footer v-show="!hideFooter"></Logo-footer>
    </div>
  </div>
</template>

<script>
import LogoFooter from './../common/LogoFooter.vue'

export default {
  name: 'page',
  props: ['paddingBottom', 'hideFooter', 'wBg', 'isListenerScroll','noBodyScroll'],
  components: {
    LogoFooter,
  },
  data() {
    return {
      scrollTop: 0,
      navScrollTop: 0,
      screenHeight: document.documentElement.clientHeight,
      footerHeight: this.hideFooter? 0 : 65,
    }
  },
  methods: {
    //监听body滚动
    addEventListener() {
      window.addEventListener('scroll', this.listenerScroll)
    },
    //关闭监听body滚动
    closeEventListener(){
      window.removeEventListener('scroll', this.listenerScroll)
    },
    //监听事件
    listenerScroll(){
      //注意这里高度不能小于100，有可能图片没有加载出来，所以导致计算错误
      this.navScrollTop = (this.navScrollTop && this.navScrollTop > 100) ? this.navScrollTop : document.getElementById('nav-sticky').offsetTop;
      let oldPath = null;
      //菜单栏吸附功能(注：菜单栏id:nav-sticky必须是page标签的一级子标签)
      let parentDom = document.getElementsByClassName('content')[0];
      let targetDom = document.getElementById('nav-sticky');
      let copyDom = document.getElementById('copyDom')
      //只有需要菜单栏吸附的时候，才监听
      if (this.navScrollTop < document.body.scrollTop && !copyDom) {
        let copyDomNode = targetDom.cloneNode(true);
        copyDomNode.id = 'copyDom';
        parentDom.insertBefore(copyDomNode, targetDom);
        targetDom.classList.add('add-fixed');
      } else if (this.navScrollTop > document.body.scrollTop && copyDom) {
        parentDom.removeChild(copyDom);
        targetDom.classList.remove('add-fixed');
      }

      //发送监听滚动事件
      this.$emit('isScroll',document.body.scrollTop);

      //当页面跳转的时候，点击的一瞬间，document.body.scrollTop会取到新页面的0，这里做比对判断，只取当前页面的body.scrollTop
      if (!oldPath || this.$route.path == oldPath) {
        //记录当前滚动位置
        this.scrollTop = document.body.scrollTop;
      }
      oldPath = this.$route.path;
    },
    //移除菜单栏属性
    removeDom(){
      document.getElementById('nav-sticky').classList.remove('add-fixed');
    }
  },
  computed: {
    gapButtom() {
      //默认65px的下间距
      return this.hideFooter ? 0 : (this.paddingBottom ? this.paddingBottom : 65);
    }
  },
  activated() {
    //滚动复位
    document.body.scrollTop = this.scrollTop;
    //页面被激活调用监听
    if(this.isListenerScroll){
      this.addEventListener();
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if(vm.noBodyScroll == 'true'){
        console.log(document.body)
      }
    })
  }
}
</script>

<style scoped>
.content-scroll {
  /* padding: 0 10px;
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  top: 0px;
  bottom: 0px;
  overflow: auto;
  -webkit-overflow-scrolling: touch; */
}

.content {
  min-height: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.prevent-margin-merge {
  width: 100px;
  height: 0.1px
}
</style>
