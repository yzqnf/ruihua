<template>
  <div class="page">
    <mu-appbar title="我的">
      <mu-icon-button @click="back" icon="chevron_left" slot="left"/>
      <mu-icon-button href="#/page/login/wx" icon="person" slot="right"/>
    </mu-appbar>

    <mu-content-block class="has-header has-footer">
      <mu-raised-button @click="toast" label="toast" class="demo-raised-button" primary/><br/><br/>
      <mu-raised-button @click="snackbar" label="snackbar" class="demo-raised-button" primary/><br/><br/>
      <mu-raised-button @click="dialog" label="dialog" class="demo-raised-button" primary/><br/><br/>
      <mu-raised-button @click="popup" label="popup" class="demo-raised-button" primary/><br/><br/>
      

    </mu-content-block>
  </div>
</template>

<script>
  export default {
    name: 'about',
    data () {
      return {
        state: true,
        msg: 'About page'
      }
    },
    methods: {
      toast() {
        utils.ui.toast('自定义toast内容', require('../../assets/img/icon_service.png'))
      },
      snackbar() {
        utils.ui.snackbar('自定义提示框内容')
      },
      dialog(){
        utils.ui.dialog('自定义对话框内容', require('../../assets/img/common/icon_warning.png'), ['确定购买','下次再说'], index => {
          alert(index)
        })
      },
      popup(){
        utils.ui.popup('自定义弹出窗标题', '自定义弹出窗内容', () => {
          alert('关闭了弹出窗')
        })
      }
    },
    mounted () {
      
    }
  }
</script>
