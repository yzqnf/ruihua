import Vue from 'vue'
import codeData from '../assets/data/CodeData'
import addressData from '../assets/data/addressData' //地址码表Json
import utils from '../utils/index';
import format from '../utils/format';

let allMap = {};
for (var key in codeData) {
  if (!allMap[key]) allMap[key] = {};
  for (var key_ in codeData[key]) {
    allMap[key][
      codeData[key][key_].code
    ] = codeData[key][key_].desc;
  }
}

/**
 * 全局公共过滤器 使用:{{'0' |commonFilter('relationFilter') }}
 * value 值
 * type 类型 对应码表(codeData)中的参数
 * default1 默认值
 */
Vue.filter('commonFilter', (value, type, default1) => {
  return allMap[type][value] || default1 || '——'
});

//时间戳过滤
Vue.filter('dateFilter', (value) => {
  let tempDate = new Date(value)
  let tempMonth = (tempDate.getMonth() + 1) < 10 ? '0' + (tempDate.getMonth() + 1) : (tempDate.getMonth() + 1);
  let tempDay = tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate();
  let tempHours = tempDate.getHours() < 10 ? '0' + tempDate.getHours() : tempDate.getHours();
  let tempMinutes = tempDate.getMinutes() < 10 ? '0' + tempDate.getMinutes() : tempDate.getMinutes();
  let tempSeconds = tempDate.getSeconds() < 10 ? '0' + tempDate.getSeconds() : tempDate.getSeconds();
  return tempDate.getFullYear() + '-' + tempMonth + '-' + tempDay + ' ' + tempHours + ':' + tempMinutes + ':' + tempSeconds;
});

//地址过滤
Vue.filter('addressFilter', (value) => {
  return addressData[value] || '——'
})

//小数过滤 @param digit:保留小数点位数，默认两位
// <<<<<<< HEAD
// Vue.filter('toFixedFilter', (value, digit = 2) => {
//   return new Number(value).toFixed(digit)
// =======
Vue.filter('toFixedFilter', (value, digit = 2) => {
  return isNaN(value) ? value : (new Number(value).toFixed(digit));
})

//保障期限过滤器

Vue.filter('insuYearFilter', (value, startTime) => {
  let startDate;
  if (/^[0-9]+$/.test(startTime)) {
    startTime = parseFloat(startTime)
    startDate = new Date(startTime)
  } else {
    startDate = utils.format.parseDate((startTime));
  }
  let timeStr = utils.format.toDate(startDate, "yyyy-MM-dd");
  let timeList = timeStr.split("-");
  let tempDate = utils.format.parseDate((parseInt(timeList[0]) + parseInt(value)) + "-" + timeList[1] + "-" + timeList[2])
  let endDate = tempDate.setDate(tempDate.getDate() - 1);
  return "自"+utils.format.toDate(startDate, "yyyy年MM月dd日") + "00时起<br/>至" + utils.format.toDate(new Date(endDate), "yyyy年MM月dd日")+"24时止";

  // return timeStr + " 至 " + utils.format.toDate(new Date(endDate), "yyyy年MM月dd日");
})
//保障期限过滤器

Vue.filter('timeFilter', (value, startTime) => {
	console.log('timeFilter',value)
  let startDate;
  if (/^[0-9]+$/.test(value)) {
    startDate = new Date(startTime)
  } else {
    startDate = utils.format.parseDate((value.replace(/\-/g,"/")));
	}

	if(startTime){
		startDate.setDate(startDate.getDate() - parseInt(startTime))
		return utils.format.toDate(startDate, "yyyy年MM月dd日") + "24时";
	}
  return utils.format.toDate(startDate, "yyyy年MM月dd日") + "00时";

  // return timeStr + " 至 " + utils.format.toDate(new Date(endDate), "yyyy年MM月dd日");
})

//金额过滤器 这里暂时按10000
Vue.filter('moneyFilter', (value) => {
  return isNaN(value) ? value : (new Number(value) / 10000).toFixed(0) + '万';
})

//关系过滤器
// 0	本人
// 31	父母
// 32	子女
// 33	配偶
// Vue.filter('relationFilter', (value) => {
//   return allMap['relationCode'][value]
// });
// 证件类型
// Vue.filter('certTypeFilter', (value) => {
//   return allMap['certCode'][value]
// });
//缴费方式
// Vue.filter('yearFilter', (value) => {
//   return allMap['typeCode'][value]
// });
//订单状态
// Vue.filter('orderStatusFilter', (value) => {
//   return allMap['orderCode'][value]
// })
