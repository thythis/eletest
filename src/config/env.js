/**
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 *
 */
let baseUrl = '/baseurl';
// let baseUrl = 'http://127.0.0.1:8080/wbaobei';
// let baseUrl = 'http://120.24.213.23:8080/wbaobei';
let routerMode = 'history';
// let loginUrl = baseUrl + '/phone/login';
// let loginUrl = '/logurl/phone/login';
let loginUrl = baseUrl + '/phone/login';
let regUrl = baseUrl + '/phone/register';
let getProtocol = '/getIntr/html/protocol.html';
let getYzm = baseUrl + '/phone/hqyzm';
let getYzmzhmm = baseUrl + '/phone/hqyzmzhmm';
let zhmmUrl = baseUrl + '/phone/zhmm';
let changepwd = baseUrl + '/users/xgmm';
let getRecord = baseUrl + '/phone/pgbrecord';
let getReport = baseUrl + '/phone/report';
let getTC = baseUrl + '/phone/tc';
let hqpgbmx = baseUrl + '/phone/hqpgbmx';
let bbpgbxq = baseUrl + '/phone/bbpgbxq';
let savePgb = baseUrl + '/phone/pgbbc';
let getTclist = baseUrl + '/phone/tclist';
let ggkCheck = baseUrl + '/ggk/check';
let ggkdh = baseUrl + '/phone/ggkdh';
let addBaby = baseUrl + '/phone/bbbc';
let editBaby = baseUrl + '/phone/bbxg';
let delBaby = baseUrl + '/phone/bbsc';

// if (process.env.NODE_ENV == 'development') {
// }else{
// }

export {
	baseUrl,
	routerMode,
	baseImgPath,
  loginUrl,
	regUrl,
	getProtocol,
	getYzm,
	getYzmzhmm,
	zhmmUrl,
	changepwd,
  getRecord,
  getReport,
  getTC,
  hqpgbmx,
  bbpgbxq,
  savePgb,
  getTclist,
	ggkCheck,
  ggkdh,
  addBaby,
  editBaby,
  delBaby,
}
