const CodeData = {
  //证件类型
  certCode: [{
    code: 0,
    desc: "身份证"
  }],
  // , {
  //   code: 1,
  //   desc: "护照"
  // }
  //基本保额
  insureCode: [
    { code: '50000', desc: '5万元' },
    { code: '100000', desc: '10万元' },
    { code: '150000', desc: '15万元' },
    { code: '200000', desc: '20万元' },
    { code: '250000', desc: '25万元' },
    { code: '300000', desc: '30万元' },
    { code: '400000', desc: '40万元' },
    { code: '500000', desc: '50万元' },
    { code: '1000000', desc: '100万元' },
    { code: '3000000', desc: '300万元' },
  ],
  //性别
  sexCode: [
    { code: 'm', desc: '男' },
    { code: 'f', desc: '女' }
  ],
  //保障期限
  insuredTimeCode: [
    { code: '1', desc: '一年' },
    { code: '20', desc: '20年' },
    { code: '30', desc: '30年' },
    { code: '40', desc: '40年' },
    { code: '50', desc: '50年' },
    { code: '60', desc: '60年' },
    { code: '70', desc: '70年' },
    { code: '106', desc: '终身' }
  ],
  //交费类型
  typeCode: [
    { code: '12', desc: '年缴' },
    { code: '0', desc: '一次性交清' }
  ],
  //交费年限
  termCode: [
    { code: '5', desc: '5年' },
    { code: '10', desc: '10年' },
    { code: '15', desc: '15年' },
    { code: '20', desc: '20年' }
  ],
  //订单状态
  orderCode: [
    { code: '01', desc: '待生效' },
    { code: '02', desc: '已失效' },
    { code: '03', desc: '继续投保' }, //待确认
    { code: '06', desc: '去支付' }, //待支付
    // { code: '08', desc: '已生效' },
    { code: '08', desc: ' ' },
  ],
  //保单状态
  insuranceCode: [
    { code: '0', desc: '待生效' },
    // { code: '1', desc: '已承保' },
    { code: '1', desc: ' ' },
    { code: '4', desc: '已失效' },
  ],

  //是否有社保
  CIsSocCode:[
    { code:'1', desc: '有'},
    { code:'0', desc: '无'},
  ],

  //关系
  relationCode: [{
    code: '00',
    desc: "本人"
  }, {
    code: '31',
    desc: "父母"
  }, {
    code: '32',
    desc: "子女"
  }, {
    code:'33',
    desc: "配偶"
  }],

  //反馈类型
  feedbackCode: [
    { code: '1', desc: '建议' },
    { code: '2', desc: '投诉' },
  ],
  //反馈类型
  bankCode: [
    { code: '1', desc: '招商' },
    { code: '2', desc: '建设' },
  ],

  //产品大类中文替换(注：后期还是以后台传递过来的值为准)
  productName: [
    { code: '13', desc: '医疗险' },
    { code: '30', desc: '重疾险' },
    { code: '89', desc: '意外险' },
  ],
};
export default CodeData;