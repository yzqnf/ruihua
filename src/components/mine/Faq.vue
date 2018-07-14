<template>
  <div class="page mine-page page-faq">
    <mu-content-block class="has-header no-padding">
      <section class="mine-section" v-bind:style="{'min-height':screenHeight +'px'}">
        <!--<div class="question-tab-row">
          <div class="question-tab-row-inner">
            <mu-tabs :value="questionTab" @change="handleQuestionTabChange">
              <mu-tab value="tab0" title="理赔" titleClass="font-bold" style="width:100%"/>
              <mu-tab value="tab1" title="问题分类一" titleClass="font-bold"/>
              <mu-tab value="tab2" title="问题分类二" titleClass="font-bold"/>
              <mu-tab value="tab3" title="问题分类三" titleClass="font-bold"/>
              <mu-tab value="tab4" title="问题分类四" titleClass="font-bold"/>
            </mu-tabs>
          </div>
        </div>-->
        <!--保障问题-->
        <div class="question-list">
          <div class="question-item">
            <div class="question-param" @click="changeQuestionStatus(0)">发生理赔事故时，我该如何通知保险公司？</div>
            <transition name="slide-left">
              <div class="question-value" v-show="questionList[0]">
                <div class="question-value-item">
                  <ol>
                    <li>
                      <p class="font-bold">如何报案？</p>
                      <p>拨打24小时服务热线400-609-6868进行报案，我们会提醒您理赔应备材料及相关注意事项。</p>
                    </li>
                    <li>
                      <p class="font-bold">如何提交理赔申请？</p>
                      <p>请您准备齐全相关理赔材料后通过以下方式及时向我司递交理赔申请。</p>
                      <p>（1） 申请填写及材料准备：请登陆瑞华健康险官网www.***.com，下载《理赔申请书》并按要求完整填写并提供相关理赔材料。（注意选择双面打印）</p>
                      <p>（2） 提交理赔材料：索赔材料准备齐全后提交至我司，应备材料详见《理赔材料一览表》。</p>
                    </li>
                  </ol>
                </div>
              </div>
            </transition>
          </div>
          <div class="question-item">
            <div class="question-param" @click="changeQuestionStatus(1)">哪些人可以作为理赔申请人？</div>
            <transition name="slide-left">
              <div class="question-value" v-show="questionList[1]">
                <div class="question-value-item">
                  <ol>
                    <li>申请生存保险金（医疗保险金、残疾保险金、重疾保险金等），由被保险人本人申请；</li>
                    <li>申请身故保险金，由身故受益人（继承人）申请；</li>
                    <li>申请保费豁免，由投保人或被保人申请。</li>
                  </ol>
                  <p>上述申请人未成年或不具备完全民事行为能力时，由申请人的监护人代为申请。</p>
                </div>
              </div>
            </transition>
          </div>
          <div class="question-item">
            <div class="question-param" @click="changeQuestionStatus(2)">理赔申请材料如何填写？</div>
            <transition name="slide-left">
              <div class="question-value" v-show="questionList[2]">
                <div class="question-value-item">
                  <ol>
                    <li>请索赔申请人使用黑色水笔或钢笔亲笔填写、签署申请书，并注意不得涂改；</li>
                    <li>如索赔申请人委托他人办理，请额外提交由申请人本人签署的《理赔授权委托书》及受托人有效身份证明；</li>
                    <li>如索赔申请人为未成年人或无民事行为能力人时，请提供监护人有效身份证明及合法监护证明，并由监护人在申请人处签字；</li>
                    <li>如申请理赔的意外事故经公安、交警部门处理，请提供相关部门提供的意外事故证明。</li>
                  </ol>
                </div>
              </div>
            </transition>
          </div>
          <div class="question-item">
            <div class="question-param" @click="changeQuestionStatus(3)">身故保险金如何申请？</div>
            <transition name="slide-left">
              <div class="question-value" v-show="questionList[3]">
                <div class="question-value-item">
                  <ol>
                    <li>申请身故保险金时，如受益人为法定或被保人继承人的，受益人需填写《身故保险金领取声明书》；</li>
                    <li>如身故受益人为多人，每位受益人（继承人）均需作为申请人填写《理赔申请书》，多个受益人可共同申请保险金，也可委托一人办理理赔申请，多人委托一人办理时，每个委托人均需填写《理赔授权委托书》；</li>
                    <li>如索赔申请人为受益人的继承人，除提供申请人身份证明外，须额外提供合法继承权证明文件。</li>
                  </ol>
                </div>
              </div>
            </transition>
          </div>
          <div class="question-item">
            <div class="question-param" @click="changeQuestionStatus(4)">住院费用明细及意外事故证明如何获得？</div>
            <transition name="slide-left">
              <div class="question-value" v-show="questionList[4]">
                <div class="question-value-item">
                  <dl>
                    <dt class="font-bold">住院费用明细</dt>
                    <dd>您可以在办理出院手续时，在医院收费处打印住院费用明细清单。</dd>
                    <dt class="font-bold">意外事故证明</dt>
                    <dd>
                      <ol>
                        <li>如意外事故为交通事故，请提供交警出具的《道路交通责任认定书》；</li>
                        <li>如意外事故为经警方处理的案件（如抢劫案、伤人案等），请提供报警回执或派出所出具的相关证明；</li>
                        <li>如意外事故为单位工伤事故，请提供单位出具的意外事故证明。</li>
                      </ol>
                    </dd>
                  </dl>
                </div>
              </div>
            </transition>
          </div>
          <div class="question-item">
            <div class="question-param" @click="changeQuestionStatus(5)">出险后多长时间内可以提出理赔申请？</div>
            <transition name="slide-left">
              <div class="question-value" v-show="questionList[5]">
                <div class="question-value-item">
                  <p>受益人向保险公司申请给付保险金的诉讼时效期间为2年，自知道或者应当知道保险事故发生之日起计算。</p>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </section>
    </mu-content-block>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'faq',
  components: {

  },
  data() {
    return {
      questionTab: 'tab0',
      questionList: [true, false, false, false, false, false],
      screenHeight: document.documentElement.clientHeight
    }
  },
  methods: {
    handleQuestionTabChange(value) {
      this.questionTab = value
    },
    changeQuestionStatus(index){
      Vue.set(this.questionList, index, !this.questionList[index]);
    },
  },
  computed: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped >
@import 'src/assets/css/mine';
.page-faq {
  .mine-section {
    height: 100%;
    .question-tab-row {
      position: fixed;
      top:0px;
      left:0px;
      width:100%;
      z-index:99;
      overflow: hidden; 
      height:48px;
      box-shadow: 0 6px 16px $shadow-color;
    }
    .question-tab-row-inner {
      overflow-x:auto;
      height:58px;
    }
  }
  .question-list{
    //padding:38px 16px 10px 16px;
    padding:14px 16px 10px 16px;
    //margin-top: 24px;
  }
  .question-item{
    position: relative;
    margin-top: 10px;
  }
  .question-param{
    padding: 11px 6px 11px 42px;
    min-height: 40px;
    background: $bgcolor;
    font-size: 1.3rem;
    line-height: 18px;
    font-weight:bold;
    color:$normal-color-light;
  }
  .question-param::before{
    content: '';
    background: url(../../assets/img/icon_Q.png);
    background-size: 100% 100%;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 10px;
    left: 8px;
  }
  .question-value{
    position: relative;
    transition: .1s all ease-out;
    margin-top: 12px;
    margin-bottom: 16px;
  }
  .question-value-item{
    padding: 6px 6px 8px 42px;
    font-size: 1.3rem;
    line-height: 24px;
    color:$normal-color-light;
    ol {
      padding:0 0 0 16px;
      margin: 0px;
    }
    li {
      margin-bottom: 0px;
    }
    p {
      margin: 0px;
    }
    dl{
      margin: 0px;
    }
    dd {
      margin-left: 0px;
    }
  }
  .question-value-item::before{
    content: '';
    background: url(../../assets/img/icon_A.png);
    background-size: 100% 100%;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 6px;
    left: 8px;
  }
}
</style>