import axios from 'axios'
import format from './format'
import store from '../vuex/store'

let instance = axios.create({
  timeout: 50000,
  method: 'post',
  headers: {
    post: {
      'Content-Type': ''
    }
  }
});
//当请求异常，网络异常,返回异常时候进行提示
function showError() {
  store.commit('LOADING', {
    loading: false
  })
  store.commit('TOGGLE_TOAST', {
    toast: true,
    toastMsg: '网络异常,请检查网络'
  })
};
//请求拦截器
instance.interceptors.request.use(config => {
  store.commit('LOADING', {
    loading: true,
    msg: '正在加载'
  })

  let params = {
    "packageList": {
      "packages": {
        "header": {
          "requestType": config.url,
          "comId": globalConfig.comId,
          "from": globalConfig.from,
          "sendTime": new Date().format('yyyy-MM-dd HH:mm:ss'),
          "orderSerial": "orderId",
          "comSerial": "comSerial"
        },
        request: DES3.encrypt('', JSON.stringify({
          requestPayload: Base64.encode(JSON.stringify(config.data))
        }).replace(/\s/g, ""))
      }
    }
  }
  let paramStr = JSON.stringify(params)
  let sign = hex_hmac_md5(globalConfig.transfer, paramStr)
  config.url = globalConfig.rootUrl + 'interfaceChannel?sign=' + sign + '&com_id=' + globalConfig.comId
  config.data = paramStr
  return config
}, error => {
  store.commit('TOGGLE_TOAST', {
    toast: true,
    toastMsg: '发送请求失败！'
  })
  return Promise.reject({
    isLogicError: false,
    errorMessage: "网络异常,请检查网络"
  })
});
//返回拦截器
instance.interceptors.response.use(response => {
	let responsePayload;
  if (location.href.indexOf('page/access') == -1) {
    store.commit('LOADING_DISABLED', false)
    setTimeout(() => {
      store.commit('LOADING', { 
        loading: false
      })
    }, 500);
  }
  try {
    console.log(DES3.decrypt('','ZN2zFL63ZhSAikXorZkh4+BRA4u/YyAxAR7qQPxlb+ltjeuxvyTt2JAfF1Pk7LE8bkvREVK7Omc9FQJHRkK9uk01WeVvlzwo'))
    response.data.packageList.packages.response = JSON.parse(DES3.decrypt('', response.data.packageList.packages.response))
		console.log(response.data)
		responsePayload =response.data.packageList.packages.response.responsePayload; 
		if(typeof responsePayload.data == "string"){
			try {
				responsePayload.data = JSON.parse(responsePayload.data)
			} catch (error) {
				
			}
		}
		// response.data.packageList.packages.response.responsePayload.result = false
		console.log("%c 返回数据>>>>>>>", 'color:green', JSON.parse(JSON.stringify(response)))
    if (!responsePayload.result) {
      // let errorMsg = "后台返回数据data为空";
      // if (response.data.packageList.packages.response.responsePayload.data) {
			let errorMsg = (responsePayload.data && responsePayload.data.ErrorMessage) || responsePayload.msg || "网络异常";
      // }else{
				// errorMsg
			// }
      return Promise.reject({
        isLogicError: true,
        errorMessage: errorMsg,
        data: responsePayload
      })
    }
  } catch (e) {
    console.error(e)
    showError();
    return Promise.reject({
      isLogicError: false,
      errorMessage: "网络异常,请检查网络"
    })
	}
  response.data = responsePayload.data;
  return response
}, error => {
  store.commit('LOADING_DISABLED', false)
  showError();
  return Promise.reject({
    isLogicError: false,
    errorMessage: "网络异常,请检查网络"
  })
})

export default {
  axios: axios,
  post(service, params) {
    console.log("%c 请求数据>>>>>>>", 'color:green', JSON.parse(JSON.stringify(params)))
    return instance.post(service, params)
  }
}