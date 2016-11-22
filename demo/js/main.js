/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _cascade = __webpack_require__(1);
	
	var _data = __webpack_require__(2);
	
	/*data*/
	var mySelectElems = ["province", "city", "shop"];
	
	var myCascade = new _cascade.Cascade(_data.myCity, mySelectElems);

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/*
	 * param Eg:
	 ** @param data: Your cleaned json data,eg: 
	const myCity = [
		{
			"name": "安徽",
			"state": [
			{
				"name": "蚌埠",
				"state": [{
					"name": "蚌埠星辉汽车销售服务有限公司"
				}]
			},
			{
				"name": "合肥",
				"state": [{
					"name": "安徽之星汽车销售服务有限公司"
				},
				{
					"name": "合肥利之星汽车服务有限公司"
				},
				{
					"name": "安徽鹏龙融富汽车销售服务有限公司"
				}]
			}
		},
		{
			"name": "江苏",
			"state": [{
				"name": "苏州",
				"state": [
				{
					"name": "常熟中升之星汽车销售服务有限公司"
				},
				{
					"name": "张家港海星汽车销售服务有限公司"
				},
				{
					"name": "苏州鹏龙东昌汽车销售服务有限公司"
				}]
			},
			{
				"name": "淮安",
				"state": [
				{
					"name": "淮安之星汽车销售服务有限公司"
				},
				{
					"name": "淮安之星汽车销售服务有限公司清河新区分公司"
				},
				{
					"name": "淮安万帮金星汽车销售有限公司"
				}]
			},
			{
				"name": "南京",
				"state": [
				{
					"name": "江苏中驰汽车销售服务有限公司"
				},
				{
					"name": "南京江北之星汽车服务有限公司"
				}]
			},
		},
		{
			"name": "上海",
			"state": [
			{
				"name": "上海",
				"state": [{
					"name": "上海宝利德汽车有限公司"
				},
				{
					"name": "上海中升奉星汽车销售服务有限公司"
				},
				{
					"name": "上海越星汽车有限公司"
				}]
			}]
		}
	]
	 ** @param elemarr:eg:["province","city","shop"]
	
	 * html Eg:
		<select name="province" id="province" style="top:290px;">
		</select>
		<select name="city" id="city" style="top:290px;left:192px;">
			
		</select>
		<select name="shop" id="shop" style="top:387px;width:178px;">
		</select>
	*/
	var Cascade = function () {
		function Cascade(data, selectElArr) {
			_classCallCheck(this, Cascade);
	
			var selectEls = [];
			for (var i = 0, len = selectElArr.length; i < len; i++) {
				var oneSelectEl = document.getElementById(selectElArr[i]);
				selectEls.push(oneSelectEl);
			}
			var num = selectEls.length;
			var dataByLevelArr = new Array(num);
			dataByLevelArr[0] = data;
			console.log(dataByLevelArr[0]);
	
			this.buildTipOption = this.buildTipOption.bind(this);
			this.fillCurrentLevelEl = this.fillCurrentLevelEl.bind(this);
			this.initTheEls = this.initTheEls.bind(this);
			this.toCascadeNextEl = this.toCascadeNextEl.bind(this);
	
			this.initTheEls(selectEls, dataByLevelArr);
	
			for (var _i = 0; _i < num - 1; _i++) {
				this.toCascadeNextEl(_i, selectEls, dataByLevelArr);
			}
		}
	
		/* Method buildTipOption: Produce the  <option value="-1">请选择</>
	 */
	
	
		_createClass(Cascade, [{
			key: "buildTipOption",
			value: function buildTipOption() {
				var tipOption = document.createElement("option");
				tipOption.value = -1;
				tipOption.text = "请选择";
				return tipOption;
			}
	
			/* Method simulateChangedEvent: Simulate the behavior of the event "change"
	   * @param el——type:HTMLElement, a "select" HTMLElement;eg:selectEls[0]
	  */
	
		}, {
			key: "simulateChangeEvent",
			value: function simulateChangeEvent(el) {
				var changeEvent = document.createEvent("HTMLEvents");
				changeEvent.initEvent("change", false, true);
				el.dispatchEvent(changeEvent);
			}
	
			/* Methode fillCurrentLevelEl: Use currentLevelData to produce a list of option elements to fill in the currentLevelEl
	  * @param currentLevelEl——type ：HTMLElement,a "select" HTMLElement; eg: selectsEls[0]
	  * @param currentLevelData——type: Obj, a obj accord with the data structure of "data" ; eg:data
	  */
	
		}, {
			key: "fillCurrentLevelEl",
			value: function fillCurrentLevelEl(currentLevelEl, currentLevelData) {
				//console.log("fillCurrentLevelElp1:"+currentLevelEl);
				//console.log("fillCurrentLevelElp2:"+currentLevelData);
				currentLevelData.forEach(function (item) {
					var oneOption = document.createElement("option");
					oneOption.value = item.name;
					oneOption.innerHTML = item.name;
					currentLevelEl.appendChild(oneOption);
				});
			}
	
			/* Method initTheEls:Set all "select" elements' content to "",then fill the selectEls[0]
	   * @param elArr——type: array,an array of "select" Element;eg:selectEls
	   * @param dataArr——type: array,an array of obj data which are accord with the data structure of "data"
	  */
	
		}, {
			key: "initTheEls",
			value: function initTheEls(elArr, dataArr) {
				//console.log(elArr);
				//console.log(dataArr);
				for (var i = 0, len = elArr.length; i < len; i++) {
					elArr[i].innerHTML = "";
				}
	
				elArr[0].appendChild(this.buildTipOption());
				this.fillCurrentLevelEl(elArr[0], dataArr[0]);
			}
	
			/* Method toCascadeNextEl: When current level "select" element onchange, fill in the next level "select" element.
	   * @param n:如果一共有n层级联，即 this.selectEls.length 为 n,则该参数值为当前发生onchange事件的级联元素的index:0,1,2...n-2,最多为倒数第二个元素
	   * @param elArr = this.selectEls
	  */
	
		}, {
			key: "toCascadeNextEl",
			value: function toCascadeNextEl(n, elArr, dataArr) {
				var _this = this;
	
				elArr[n].onchange = function (e) {
					var targetValue = e.target.value; //this永远等于currentTarget，即被绑定的元素对象；而target为事件的实际目标
					elArr[n + 1].innerHTML = "";
	
					dataArr[n].forEach(function (item) {
						if (targetValue == item.name) {
							//var level1s = item.state;
							dataArr[n + 1] = item.state; //下一层使用的数据就是dataByLevelArr[1]
						}
					});
	
					_this.fillCurrentLevelEl(elArr[n + 1], dataArr[n + 1]);
					if (elArr[n + 2]) {
						_this.simulateChangeEvent(elArr[n + 1]);
					}
				};
			}
		}]);
	
		return Cascade;
	}();
	
	exports.Cascade = Cascade;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var myCity = [{
		"name": "安徽",
		"state": [{
			"name": "蚌埠",
			"state": [{
				"name": "蚌埠星辉汽车销售服务有限公司"
			}]
		}, {
			"name": "阜阳",
			"state": [{
				"name": "阜阳伟久汽车销售服务有限公司"
			}]
		}, {
			"name": "合肥",
			"state": [{
				"name": "安徽之星汽车销售服务有限公司"
			}, {
				"name": "合肥利之星汽车服务有限公司"
			}, {
				"name": "安徽鹏龙融富汽车销售服务有限公司"
			}]
		}, {
			"name": "马鞍山",
			"state": [{
				"name": "马鞍山之星汽车销售服务有限公司"
			}]
		}, {
			"name": "铜陵",
			"state": [{
				"name": "铜陵利星汽车销售服务有限公司"
			}]
		}, {
			"name": "芜湖",
			"state": [{
				"name": "芜湖中星汽车销售服务有限公司北京中路分公司"
			}, {
				"name": "芜湖中星汽车销售服务有限公司"
			}]
		}, {
			"name": "亳州",
			"state": [{
				"name": "亳州之星汽车有限公司"
			}]
		}, {
			"name": "淮南",
			"state": [{
				"name": "淮南之星汽车销售服务有限公司"
			}]
		}, {
			"name": "淮北",
			"state": [{
				"name": "淮北万帮之星汽车销售服务有限公司"
			}]
		}, {
			"name": "六安",
			"state": [{
				"name": "六安恒信之星汽车销售服务有限公司"
			}]
		}, {
			"name": "宣城",
			"state": [{
				"name": "宣城利星汽车销售服务有限公司"
			}]
		}]
	}, {
		"name": "江苏",
		"state": [{
			"name": "苏州",
			"state": [{
				"name": "常熟中升之星汽车销售服务有限公司"
			}, {
				"name": "昆山利星汽车服务有限公司"
			}, {
				"name": "苏州海星汽车销售服务有限公司"
			}, {
				"name": "苏州海星高新汽车销售服务有限公司"
			}, {
				"name": "苏州利星汽车服务有限公司"
			}, {
				"name": "苏州利星汽车服务有限公司园区旺墩路分公司"
			}, {
				"name": "苏州元星汽车服务有限公司"
			}, {
				"name": "太仓中升之星汽车销售服务有限公司"
			}, {
				"name": "吴江之星汽车销售服务有限公司"
			}, {
				"name": "张家港海星汽车销售服务有限公司"
			}, {
				"name": "苏州鹏龙东昌汽车销售服务有限公司"
			}]
		}, {
			"name": "常州",
			"state": [{
				"name": "常州之星汽车有限公司"
			}, {
				"name": "常州外汽星豪汽车销售服务有限公司"
			}, {
				"name": "常州万帮汽车销售服务有限公司"
			}, {
				"name": "常州外汽永豪汽车销售服务有限公司"
			}, {
				"name": "常州外汽东豪汽车销售服务有限公司"
			}]
		}, {
			"name": "淮安",
			"state": [{
				"name": "淮安之星汽车销售服务有限公司"
			}, {
				"name": "淮安之星汽车销售服务有限公司清河新区分公司"
			}, {
				"name": "淮安万帮金星汽车销售有限公司"
			}]
		}, {
			"name": "无锡",
			"state": [{
				"name": "江阴利之星汽车维修服务有限公司"
			}, {
				"name": "无锡可达汽车销售服务有限公司"
			}, {
				"name": "无锡德星汽车维修服务有限公司"
			}, {
				"name": "无锡德星汽车维修服务有限公司河埒口分公司"
			}, {
				"name": "无锡中升之星汽车销售服务有限公司"
			}, {
				"name": "无锡中升星辉汽车销售服务有限公司"
			}, {
				"name": "宜兴利星汽车销售服务有限公司"
			}, {
				"name": "宜兴市鹏龙汽车销售服务有限公司"
			}]
		}, {
			"name": "泰州",
			"state": [{
				"name": "泰州之星汽车销售服务有限公司靖江分公司"
			}, {
				"name": "泰州之星汽车销售服务有限公司"
			}, {
				"name": "泰州市海驰汽车销售服务有限公司"
			}]
		}, {
			"name": "连云港",
			"state": [{
				"name": "连云港之星汽车销售有限公司"
			}, {
				"name": "连云港之星汽车销售有限公司信驰分公司"
			}]
		}, {
			"name": "南京",
			"state": [{
				"name": "江苏中驰汽车销售服务有限公司"
			}, {
				"name": "南京利之星汽车销售服务有限公司"
			}, {
				"name": "南京利之星汽车销售服务有限公司红山路分公司"
			}, {
				"name": "南京宁星汽车维修服务有限公司"
			}, {
				"name": "南京中升之星汽车销售服务有限公司"
			}, {
				"name": "南京中升之星汽车销售服务有限公司建邺分公司"
			}, {
				"name": "江苏中驰汽车销售服务有限公司南京秦淮分公司"
			}, {
				"name": "南京万帮新区汽车销售服务有限公司"
			}, {
				"name": "南京宁星汽车维修服务有限公司雨花东路分公司"
			}, {
				"name": "南京江北之星汽车服务有限公司"
			}]
		}, {
			"name": "南通",
			"state": [{
				"name": "南通之星汽车维修服务有限公司"
			}, {
				"name": "南通文峰伟恒汽车销售服务有限公司"
			}, {
				"name": "南通和星汽车销售服务有限公司"
			}, {
				"name": "启东之星汽车销售服务有限公司"
			}]
		}, {
			"name": "宿迁",
			"state": [{
				"name": "宿迁文峰伟恒汽车销售服务有限公司"
			}]
		}, {
			"name": "徐州",
			"state": [{
				"name": "徐州利星行汽车服务有限公司"
			}, {
				"name": "徐州之星汽车有限公司"
			}]
		}, {
			"name": "盐城",
			"state": [{
				"name": "盐城之星汽车有限公司"
			}, {
				"name": "盐城市鹏龙森风汽车有限公司"
			}]
		}, {
			"name": "扬州",
			"state": [{
				"name": "扬州利之星汽车维修服务有限公司"
			}, {
				"name": "扬州海星汽车销售服务有限公司"
			}]
		}, {
			"name": "镇江",
			"state": [{
				"name": "镇江京之星汽车有限公司"
			}, {
				"name": "丹阳之星汽车零部件有限公司"
			}]
		}]
	}, {
		"name": "上海",
		"state": [{
			"name": "上海",
			"state": [{
				"name": "上海宝利德汽车有限公司"
			}, {
				"name": "上海东驰汽车有限公司"
			}, {
				"name": "上海东驰汽车有限公司世纪大道分公司"
			}, {
				"name": "上海东驰汽车有限公司昭化路分公司"
			}, {
				"name": "上海东华之星汽车维修服务有限公司宝山分公司"
			}, {
				"name": "上海冠松之星汽车销售服务有限公司"
			}, {
				"name": "上海汇之星汽车维修服务有限公司"
			}, {
				"name": "上海利之星汽车有限公司"
			}, {
				"name": "上海利之星汽车有限公司闵行分公司"
			}, {
				"name": "上海闵星汽车服务有限公司"
			}, {
				"name": "上海闵星汽车服务有限公司金桥分公司"
			}, {
				"name": "上海利星汽车维修有限公司"
			}, {
				"name": "上海利星汽车维修有限公司延安西路分公司"
			}, {
				"name": "上海星瀚汽车维修服务有限公司"
			}, {
				"name": "上海星瀚汽车维修服务有限公司金沙江路分公司"
			}, {
				"name": "上海星瀚汽车维修服务有限公司真陈路分公司"
			}, {
				"name": "上海中升之星汽车销售服务有限公司"
			}, {
				"name": "上海中升奉星汽车销售服务有限公司"
			}, {
				"name": "上海越星汽车有限公司"
			}]
		}]
	}, {
		"name": "浙江",
		"state": [{
			"name": "宁波",
			"state": [{
				"name": "浙江慈吉之星汽车有限公司"
			}, {
				"name": "浙江慈吉之星汽车有限公司周巷分公司"
			}, {
				"name": "宁波利星汽车服务有限公司"
			}, {
				"name": "宁波宁兴新宇汽车销售服务有限公司"
			}, {
				"name": "宁波之星汽车维修服务有限公司"
			}, {
				"name": "浙江慈吉之星汽车有限公司余姚分公司"
			}, {
				"name": "宁波利之星汽车服务有限公司"
			}, {
				"name": "宁波和星汽车销售服务有限公司"
			}, {
				"name": "宁海慈吉之星汽车有限公司"
			}]
		}, {
			"name": "金华",
			"state": [{
				"name": "浙江利星汽车有限公司"
			}, {
				"name": "金华金之星汽车贸易有限公司"
			}, {
				"name": "浦江丰之星汽车销售服务有限公司"
			}, {
				"name": "义乌欧龙汽车销售服务有限公司"
			}, {
				"name": "义乌欧龙汽车销售服务有限公司汽车城分公司"
			}, {
				"name": "义乌利星汽车有限公司雪峰路分公司"
			}, {
				"name": "义乌利星汽车有限公司"
			}, {
				"name": "永康市国邦汽车销售有限公司"
			}, {
				"name": "永康利之星汽车销售服务有限公司"
			}, {
				"name": "义乌市新徽汽车销售服务有限公司"
			}]
		}, {
			"name": "杭州",
			"state": [{
				"name": "杭州之信汽车有限公司"
			}, {
				"name": "杭州百得利之星汽车销售有限公司"
			}, {
				"name": "杭州东星行汽车维修有限公司"
			}, {
				"name": "浙江星杭汽车有限公司"
			}, {
				"name": "浙江星杭汽车有限公司教工路分公司"
			}, {
				"name": "浙江华策北控汽车有限公司"
			}, {
				"name": "浙江华策汽车有限公司"
			}, {
				"name": "浙江之信汽车有限公司"
			}, {
				"name": "杭州奕星汽车服务有限公司"
			}, {
				"name": "浙江鹏龙之奔汽车销售服务有限公司"
			}, {
				"name": "浙江鹏龙之奔汽车销售服务有限公司杭州富春路分公司"
			}]
		}, {
			"name": "嘉兴",
			"state": [{
				"name": "海宁利星汽车有限公司"
			}, {
				"name": "嘉兴宝利德汽车有限公司"
			}, {
				"name": "嘉兴合信汽车销售服务有限公司"
			}, {
				"name": "桐乡利之星汽车销售服务有限公司"
			}]
		}, {
			"name": "湖州",
			"state": [{
				"name": "长兴之星汽车有限公司"
			}, {
				"name": "湖州之星汽车有限公司"
			}, {
				"name": "湖州之星汽车有限公司德清分公司"
			}]
		}, {
			"name": "台州",
			"state": [{
				"name": "临海欧龙汽车有限公司"
			}, {
				"name": "台州欧普汽车销售有限公司"
			}, {
				"name": "台州之星汽车销售服务有限公司"
			}, {
				"name": "台州之星汽车销售服务有限公司路桥分公司"
			}, {
				"name": "台州德星汽车有限公司"
			}, {
				"name": "台州德星汽车有限公司温岭九龙分公司"
			}, {
				"name": "台州黄岩之星汽车销售服务有限公司"
			}]
		}, {
			"name": "丽水",
			"state": [{
				"name": "丽水市丽水之星汽车有限公司"
			}]
		}, {
			"name": "衢州",
			"state": [{
				"name": "衢州欧龙汽车有限公司"
			}]
		}, {
			"name": "温州",
			"state": [{
				"name": "瑞安市红升汽车销售服务有限公司"
			}, {
				"name": "温州之星汽车有限公司"
			}, {
				"name": "浙江欧龙汽车有限公司"
			}, {
				"name": "乐清华星汽车销售服务有限公司"
			}, {
				"name": "浙江欧龙汽车有限公司温州销售分公司"
			}, {
				"name": "温州华能达汽车销售服务有限公司"
			}]
		}, {
			"name": "绍兴",
			"state": [{
				"name": "绍兴之星汽车有限公司"
			}, {
				"name": "浙江越星汽车有限公司"
			}, {
				"name": "嵊州宝利德汽车有限公司"
			}, {
				"name": "浙江宝利德汽车有限公司"
			}]
		}, {
			"name": "舟山",
			"state": [{
				"name": "舟山利星汽车销售服务有限公司"
			}]
		}]
	}, {
		"name": "北京",
		"state": [{
			"name": "北京",
			"state": [{
				"name": "北京亚奥之星汽车服务有限公司"
			}, {
				"name": "北京市北奔汽车修理厂"
			}, {
				"name": "北京百得利之星汽车销售有限公司"
			}, {
				"name": "北京博瑞祥驰汽车销售服务有限公司"
			}, {
				"name": "北京波士诚达汽车销售服务有限公司"
			}, {
				"name": "北京波士瑞达汽车销售服务有限公司"
			}, {
				"name": "北京波士通达汽车销售服务有限公司"
			}, {
				"name": "北京金冠汽车服务有限公司"
			}, {
				"name": "北京中升之星汽车销售服务有限公司"
			}, {
				"name": "北京鹏龙大道汽车销售服务有限公司"
			}, {
				"name": "北京鹏龙星徽汽车销售服务有限公司"
			}, {
				"name": "北京鹏龙星徽汽车销售服务有限公司崇文展厅"
			}, {
				"name": "北京鹏龙星徽汽车销售服务有限公司分钟寺销售服务中心"
			}, {
				"name": "北京星徽旗舰汽车销售服务中心有限公司"
			}, {
				"name": "利星行（北京）汽车有限公司"
			}, {
				"name": "利星行平治（北京）汽车有限公司"
			}, {
				"name": "利星行平治（北京）汽车有限公司望京分公司"
			}, {
				"name": "利星行之星（北京）汽车有限公司"
			}, {
				"name": "利星行天竺之星汽车有限公司"
			}, {
				"name": "利星行天竺之星汽车有限公司顺义分公司"
			}, {
				"name": "利星行（北京）汽车维修服务有限公司"
			}, {
				"name": "北京之星汽车服务有限公司"
			}]
		}]
	}, {
		"name": "河北",
		"state": [{
			"name": "保定",
			"state": [{
				"name": "保定金锎至臻汽车销售服务有限公司"
			}, {
				"name": "保定极致汽车销售服务有限公司"
			}]
		}, {
			"name": "沧州",
			"state": [{
				"name": "沧州极致汽车销售服务有限公司"
			}, {
				"name": "利星行（沧州）汽车销售服务有限公司"
			}]
		}, {
			"name": "邯郸",
			"state": [{
				"name": "邯郸市庞大乐业汽车销售服务有限公司"
			}, {
				"name": "邯郸市庞大乐业汽车销售服务有限公司武安分公司"
			}]
		}, {
			"name": "衡水",
			"state": [{
				"name": "衡水庞大之星汽车销售服务有限公司"
			}]
		}, {
			"name": "秦皇岛",
			"state": [{
				"name": "利星行（秦皇岛）汽车销售有限公司"
			}]
		}, {
			"name": "石家庄",
			"state": [{
				"name": "河北跨世之星汽车贸易有限公司"
			}, {
				"name": "河北盛世之星汽车贸易有限公司"
			}, {
				"name": "石家庄庞大睿星汽车销售服务有限公司"
			}, {
				"name": "石家庄庞大睿星汽车销售服务有限公司建华分公司"
			}, {
				"name": "河北汇世之星汽车贸易有限公司"
			}]
		}, {
			"name": "唐山",
			"state": [{
				"name": "唐山市冀东之星汽车销售服务有限公司"
			}, {
				"name": "唐山市庞大润星汽车销售服务有限公司"
			}, {
				"name": "唐山市庞大之星汽车销售服务有限公司"
			}]
		}, {
			"name": "邢台",
			"state": [{
				"name": "邢台市庞大之星汽车销售服务有限公司"
			}]
		}, {
			"name": "承德",
			"state": [{
				"name": "承德市庞大之星汽车销售服务有限公司"
			}]
		}, {
			"name": "廊坊",
			"state": [{
				"name": "廊坊利星行汽车销售服务有限公司"
			}, {
				"name": "三河波士智达汽车销售服务有限公司"
			}]
		}]
	}, {
		"name": "黑龙江",
		"state": [{
			"name": "大庆",
			"state": [{
				"name": "大庆之星汽车有限公司"
			}]
		}, {
			"name": "哈尔滨",
			"state": [{
				"name": "哈尔滨之星汽车有限公司"
			}, {
				"name": "黑龙江中升之星汽车销售服务有限公司哈尔滨分公司"
			}, {
				"name": "黑龙江中升之星汽车销售服务有限公司"
			}, {
				"name": "黑龙江运通之星汽车销售服务有限公司"
			}]
		}, {
			"name": "绥化",
			"state": [{
				"name": "绥化市庞大之星汽车销售服务有限公司"
			}]
		}, {
			"name": "佳木斯",
			"state": [{
				"name": "佳木斯利星汽车有限公司"
			}]
		}]
	}, {
		"name": "河南",
		"state": [{
			"name": "安阳",
			"state": [{
				"name": "安阳极致汽车销售服务有限公司"
			}]
		}, {
			"name": "焦作",
			"state": [{
				"name": "焦作鹏龙得佳汽车销售有限公司"
			}]
		}, {
			"name": "漯河",
			"state": [{
				"name": "郑州鹏龙万通汽车销售有限公司漯河分公司"
			}]
		}, {
			"name": "洛阳",
			"state": [{
				"name": "洛阳市庞大乐业汽车销售服务有限公司"
			}]
		}, {
			"name": "平顶山",
			"state": [{
				"name": "平顶山利星汽车销售有限公司"
			}]
		}, {
			"name": "商丘",
			"state": [{
				"name": "商丘市鹏东汽车销售服务有限公司"
			}]
		}, {
			"name": "新乡",
			"state": [{
				"name": "新乡市利星汽车销售有限公司"
			}]
		}, {
			"name": "信阳",
			"state": [{
				"name": "信阳利星汽车销售有限公司"
			}]
		}, {
			"name": "许昌",
			"state": [{
				"name": "许昌利星汽车销售有限公司"
			}]
		}, {
			"name": "郑州",
			"state": [{
				"name": "郑州利星汽车有限公司"
			}, {
				"name": "郑州鹏龙万通汽车销售有限公司"
			}, {
				"name": "郑州之星汽车销售服务有限公司"
			}, {
				"name": "郑州之星汽车销售服务有限公司金水路分公司"
			}, {
				"name": "郑州汇升汽车销售服务有限公司"
			}]
		}, {
			"name": "驻马店",
			"state": [{
				"name": "驻马店鹏龙得佳汽车销售服务有限公司"
			}]
		}, {
			"name": "济源",
			"state": [{
				"name": "济源市庞大之星汽车销售服务有限公司"
			}]
		}, {
			"name": "南阳",
			"state": [{
				"name": "南阳市庞大之星汽车销售服务有限公司"
			}]
		}]
	}, {
		"name": "内蒙古",
		"state": [{
			"name": "包头",
			"state": [{
				"name": "内蒙古奥捷之星汽车销售服务有限公司"
			}, {
				"name": "包头中升之星汽车销售服务有限公司"
			}]
		}, {
			"name": "赤峰",
			"state": [{
				"name": "赤峰市庞大之星汽车销售服务有限公司"
			}]
		}, {
			"name": "呼和浩特",
			"state": [{
				"name": "内蒙古之星汽车有限公司"
			}, {
				"name": "呼和浩特中升之星汽车销售服务有限公司"
			}]
		}, {
			"name": "鄂尔多斯",
			"state": [{
				"name": "鄂尔多斯之星汽车有限公司"
			}]
		}, {
			"name": "通辽",
			"state": [{
				"name": "通辽市庞大之星汽车销售服务有限公司"
			}]
		}, {
			"name": "乌海",
			"state": [{
				"name": "乌海市庞大之星汽车销售有限公司"
			}]
		}, {
			"name": "呼伦贝尔",
			"state": [{
				"name": "呼伦贝尔利星汽车销售服务有限公司"
			}]
		}]
	}, {
		"name": "吉林",
		"state": [{
			"name": "长春",
			"state": [{
				"name": "长春华星行汽车销售服务有限公司"
			}, {
				"name": "长春之星汽车有限公司"
			}, {
				"name": "吉林省成邦之星汽车销售服务有限公司"
			}, {
				"name": "利星行（长春）汽车有限公司"
			}]
		}, {
			"name": "吉林",
			"state": [{
				"name": "长春之星汽车有限公司吉林市分公司"
			}]
		}, {
			"name": "延边朝鲜族自治州",
			"state": [{
				"name": "延吉市庞大之星汽车销售服务有限公司"
			}]
		}]
	}, {
		"name": "辽宁",
		"state": [{
			"name": "鞍山",
			"state": [{
				"name": "鞍山四隆之星汽车销售服务有限公司"
			}]
		}, {
			"name": "朝阳",
			"state": [{
				"name": "朝阳四隆之星汽车销售服务有限公司"
			}]
		}, {
			"name": "大连",
			"state": [{
				"name": "大连中星汽车有限公司"
			}, {
				"name": "大连中升之星汽车销售服务有限公司"
			}, {
				"name": "利星（大连）汽车服务有限公司"
			}, {
				"name": "大连鹏龙腾川汽车销售服务有限公司"
			}, {
				"name": "大连中升星辉汽车销售服务有限公司"
			}]
		}, {
			"name": "锦州",
			"state": [{
				"name": "锦州之星汽车有限公司"
			}]
		}, {
			"name": "沈阳",
			"state": [{
				"name": "辽宁业乔宏星汽车销售服务有限公司"
			}, {
				"name": "辽宁之星汽车维修服务有限公司"
			}, {
				"name": "辽宁之星汽车销售有限公司北市展示厅"
			}, {
				"name": "沈阳业乔瑞星汽车销售服务有限公司"
			}]
		}, {
			"name": "营口",
			"state": [{
				"name": "营口之星汽车有限公司"
			}]
		}, {
			"name": "辽阳",
			"state": [{
				"name": "辽阳业乔瑞星汽车销售服务有限公司"
			}]
		}, {
			"name": "盘锦",
			"state": [{
				"name": "盘锦之星汽车有限公司"
			}]
		}]
	}, {
		"name": "山东",
		"state": [{
			"name": "德州",
			"state": [{
				"name": "德州市庞大之星汽车销售服务有限公司"
			}]
		}, {
			"name": "东营",
			"state": [{
				"name": "东营泰岳星徽汽车有限公司"
			}, {
				"name": "东营五岳星徽汽车有限公司"
			}]
		}, {
			"name": "济南",
			"state": [{
				"name": "济南庞大之星汽车销售服务有限公司"
			}, {
				"name": "济南之星汽车服务有限公司"
			}, {
				"name": "济南万帮之星汽车有限公司"
			}]
		}, {
			"name": "济宁",
			"state": [{
				"name": "济宁吉星汽车销售服务有限公司"
			}]
		}, {
			"name": "聊城",
			"state": [{
				"name": "聊城欧龙汽车有限公司"
			}]
		}, {
			"name": "临沂",
			"state": [{
				"name": "临沂远通之星汽车销售服务有限公司"
			}, {
				"name": "临沂之星汽车销售服务有限公司"
			}]
		}, {
			"name": "青岛",
			"state": [{
				"name": "青岛三合汽车销售有限公司"
			}, {
				"name": "青岛之星汽车服务有限公司"
			}, {
				"name": "青岛之星汽车服务有限公司香港中路展厅"
			}, {
				"name": "青岛之星汽车服务有限公司黄岛展厅"
			}]
		}, {
			"name": "泰安",
			"state": [{
				"name": "泰安市庞大之星汽车销售服务有限公司"
			}]
		}, {
			"name": "潍坊",
			"state": [{
				"name": "潍坊鹏龙金阳光汽车销售服务有限公司"
			}, {
				"name": "潍坊之星汽车服务有限公司"
			}]
		}, {
			"name": "烟台",
			"state": [{
				"name": "烟台之星汽车服务有限公司"
			}, {
				"name": "烟台鹏龙伟东汽车销售服务有限公司"
			}]
		}, {
			"name": "淄博",
			"state": [{
				"name": "淄博星吉汽车销售服务有限公司"
			}, {
				"name": "淄博吉星汽车销售服务有限公司"
			}, {
				"name": "利星行（淄博）汽车销售服务有限公司"
			}]
		}, {
			"name": "威海",
			"state": [{
				"name": "威海之星汽车服务有限公司"
			}]
		}, {
			"name": "枣庄",
			"state": [{
				"name": "枣庄之星汽车销售服务有限公司"
			}]
		}, {
			"name": "日照",
			"state": [{
				"name": "日照金阳光之星汽车销售服务有限公司"
			}]
		}, {
			"name": "菏泽",
			"state": [{
				"name": "菏泽之星汽车服务有限公司"
			}]
		}]
	}, {
		"name": "山西",
		"state": [{
			"name": "长治",
			"state": [{
				"name": "长治市庞大之星汽车销售服务有限公司"
			}]
		}, {
			"name": "大同",
			"state": [{
				"name": "山西必高之星汽车销售服务有限公司"
			}]
		}, {
			"name": "临汾",
			"state": [{
				"name": "临汾之星汽车销售服务有限公司"
			}]
		}, {
			"name": "朔州",
			"state": [{
				"name": "山西必高之星汽车销售服务有限公司朔州开发区分公司"
			}, {
				"name": "山西必高之星汽车销售服务有限公司朔州分公司"
			}]
		}, {
			"name": "太原",
			"state": [{
				"name": "太原利星汽车有限公司"
			}, {
				"name": "太原之星汽车销售服务有限公司"
			}, {
				"name": "太原之星汽车销售服务有限公司亲贤分公司"
			}, {
				"name": "山西天健之星汽车销售服务有限公司"
			}, {
				"name": "山西龙星行汽车销售服务有限公司"
			}]
		}, {
			"name": "阳泉",
			"state": [{
				"name": "阳泉市庞大乐业汽车销售服务有限公司"
			}]
		}, {
			"name": "晋城",
			"state": [{
				"name": "晋城天健之星汽车销售服务有限公司"
			}]
		}, {
			"name": "运城",
			"state": [{
				"name": "山西神驰汽车销售有限公司"
			}]
		}]
	}, {
		"name": "天津",
		"state": [{
			"name": "天津",
			"state": [{
				"name": "天津市北信中乒之星汽车销售服务有限公司"
			}, {
				"name": "天津波士信达汽车销售服务有限公司"
			}, {
				"name": "天津市庞大之星汽车销售服务有限公司"
			}, {
				"name": "天津之星汽车维修服务有限公司"
			}, {
				"name": "天津之星汽车维修服务有限公司第一分公司"
			}, {
				"name": "利星行（天津）汽车销售服务有限公司"
			}, {
				"name": "天津波士宏达汽车销售服务有限公司"
			}, {
				"name": "天津市鹏龙九州汽车销售服务有限公司"
			}, {
				"name": "天津市鹏龙九州汽车销售服务有限公司南开分公司"
			}]
		}]
	}, {
		"name": "广东",
		"state": [{
			"name": "东莞",
			"state": [{
				"name": "东莞仁孚华星汽车服务有限公司"
			}, {
				"name": "东莞仁孚华星汽车服务有限公司常平分公司"
			}, {
				"name": "东莞中升之星汽车销售服务有限公司"
			}, {
				"name": "东莞仁孚溢华汽车服务有限公司"
			}, {
				"name": "东莞仁孚溢华汽车服务有限公司长安分公司"
			}]
		}, {
			"name": "佛山",
			"state": [{
				"name": "佛山怡和仁孚汽车服务有限公司"
			}, {
				"name": "佛山市鹏龙利泰汽车销售服务有限公司"
			}, {
				"name": "佛山市顺德区怡孚汽车销售服务有限公司"
			}, {
				"name": "佛山中升之星汽车销售服务有限公司"
			}, {
				"name": "佛山中升星辉汽车销售服务有限公司"
			}]
		}, {
			"name": "潮州",
			"state": [{
				"name": "潮州骏荣汽车销售服务有限公司"
			}]
		}, {
			"name": "广州",
			"state": [{
				"name": "广东仁孚怡邦汽车销售服务有限公司"
			}, {
				"name": "广东仁孚怡邦汽车销售服务有限公司岑村分公司"
			}, {
				"name": "广东仁孚怡邦汽车销售服务有限公司广州分公司"
			}, {
				"name": "广州市龙星行汽车销售服务有限公司"
			}, {
				"name": "广州市龙星行汽车销售服务有限公司番禺分公司"
			}, {
				"name": "广州市龙星骏宜汽车销售服务有限公司"
			}, {
				"name": "广州鸿粤星辉汽车销售服务有限公司"
			}, {
				"name": "广州锦星行汽车零配件贸易有限公司"
			}, {
				"name": "广州中升之星汽车销售服务有限公司"
			}, {
				"name": "广州仁孚汽车销售服务有限公司"
			}, {
				"name": "广州鸿粤星辉汽车销售服务有限公司白云分公司"
			}]
		}, {
			"name": "惠州",
			"state": [{
				"name": "惠州市驰峰投资有限公司"
			}, {
				"name": "惠州仁孚汽车服务有限公司"
			}, {
				"name": "惠州仁孚汽车服务有限公司河南岸分公司"
			}]
		}, {
			"name": "江门",
			"state": [{
				"name": "江门市合礼汽车销售服务有限公司"
			}, {
				"name": "江门仁孚汽车销售服务有限公司"
			}]
		}, {
			"name": "揭阳",
			"state": [{
				"name": "揭阳骏荣汽车销售服务有限公司"
			}, {
				"name": "揭阳骏荣汽车销售服务有限公司普宁分公司"
			}]
		}, {
			"name": "茂名",
			"state": [{
				"name": "茂名惠通之星汽车销售服务有限公司"
			}]
		}, {
			"name": "梅州",
			"state": [{
				"name": "汕头市骏荣汽车销售服务有限公司梅州分公司"
			}]
		}, {
			"name": "清远",
			"state": [{
				"name": "清远市南菱星晖汽车有限公司"
			}]
		}, {
			"name": "汕头",
			"state": [{
				"name": "汕头金豪汽车服务有限公司"
			}, {
				"name": "汕头市骏荣汽车销售服务有限公司"
			}]
		}, {
			"name": "韶关",
			"state": [{
				"name": "韶关市龙星行汽车销售服务有限公司"
			}]
		}, {
			"name": "深圳",
			"state": [{
				"name": "深圳市鹏峰汽车销售服务有限公司"
			}, {
				"name": "深圳市大兴宝德汽车销售服务有限公司"
			}, {
				"name": "深圳市大兴宝德汽车销售服务有限公司罗湖分公司"
			}, {
				"name": "深圳市福日汽车销售有限公司"
			}, {
				"name": "深圳市南方腾星汽车销售服务有限公司"
			}, {
				"name": "深圳市南方腾星汽车销售服务有限公司福田分公司"
			}, {
				"name": "鹏星行汽车服务（深圳）有限公司"
			}, {
				"name": "鹏星行汽车服务（深圳）有限公司罗湖分公司"
			}, {
				"name": "鹏星行汽车服务（深圳）有限公司南山分公司"
			}, {
				"name": "深圳中升星辉汽车销售服务有限公司福田分公司"
			}, {
				"name": "深圳中升星辉汽车销售服务有限公司"
			}, {
				"name": "深圳市仁孚特力汽车服务有限公司"
			}, {
				"name": "深圳市仁孚特力汽车服务有限公司龙岗分公司"
			}, {
				"name": "深圳市仁孚特力汽车服务有限公司罗湖分公司"
			}]
		}, {
			"name": "湛江",
			"state": [{
				"name": "湛江市南菱星晖汽车有限公司"
			}]
		}, {
			"name": "肇庆",
			"state": [{
				"name": "肇庆鸿粤嘉泰汽车销售服务有限公司"
			}]
		}, {
			"name": "中山",
			"state": [{
				"name": "中山惠通之星汽车销售有限公司"
			}, {
				"name": "中山仁孚汽车销售服务有限公司"
			}]
		}, {
			"name": "珠海",
			"state": [{
				"name": "珠海仁孚汽车销售服务有限公司"
			}, {
				"name": "珠海仁孚汽车销售服务有限公司拱北分公司"
			}]
		}, {
			"name": "汕尾",
			"state": [{
				"name": "汕尾骏荣汽车销售服务有限公司"
			}]
		}]
	}, {
		"name": "福建",
		"state": [{
			"name": "福州",
			"state": [{
				"name": "福建波士运达汽车销售服务有限公司"
			}, {
				"name": "福建波士骏达汽车销售服务有限公司"
			}, {
				"name": "福州东星汽车维修服务有限公司"
			}, {
				"name": "福州利之星汽车销售服务有限公司"
			}, {
				"name": "福州之星汽车贸易有限公司梅峰路分公司"
			}, {
				"name": "福州鹏龙国戎汽车销售服务有限公司"
			}]
		}, {
			"name": "泉州",
			"state": [{
				"name": "福建省泉州闽星汽车销售服务有限公司"
			}, {
				"name": "福建省泉州市瑞星汽车销售服务有限公司"
			}, {
				"name": "泉州之星汽车销售服务有限公司"
			}, {
				"name": "泉州之星汽车销售服务有限公司丰泽分公司"
			}, {
				"name": "泉州中升之星汽车销售服务有限公司"
			}, {
				"name": "石狮大长江红星汽车销售服务有限公司"
			}, {
				"name": "泉州中升星辉汽车销售服务有限公司"
			}]
		}, {
			"name": "龙岩",
			"state": [{
				"name": "龙岩之星汽车销售服务有限公司"
			}, {
				"name": "龙岩之星汽车销售服务有限公司东肖分公司"
			}]
		}, {
			"name": "宁德",
			"state": [{
				"name": "福州利之星汽车销售服务有限公司宁德分公司"
			}, {
				"name": "宁德宝利德汽车有限公司"
			}]
		}, {
			"name": "莆田",
			"state": [{
				"name": "莆田之星汽车有限公司荔城分公司"
			}, {
				"name": "莆田之星汽车有限公司"
			}]
		}, {
			"name": "三明",
			"state": [{
				"name": "福建吉诺中星汽车销售服务有限公司"
			}]
		}, {
			"name": "厦门",
			"state": [{
				"name": "厦门市东之星汽车销售有限公司第一分公司"
			}, {
				"name": "厦门空港航星汽车维修服务有限公司"
			}, {
				"name": "厦门市东之星汽车销售有限公司"
			}, {
				"name": "福建波士骏达汽车销售服务有限公司厦门分公司"
			}]
		}, {
			"name": "漳州",
			"state": [{
				"name": "漳州极致汽车销售服务有限公司"
			}]
		}, {
			"name": "南平",
			"state": [{
				"name": "南平极致汽车销售服务有限公司"
			}]
		}]
	}, {
		"name": "广西",
		"state": [{
			"name": "桂林",
			"state": [{
				"name": "桂林龙星行汽车销售服务有限公司"
			}]
		}, {
			"name": "柳州",
			"state": [{
				"name": "柳州市华星行汽车销售服务有限公司"
			}]
		}, {
			"name": "南宁",
			"state": [{
				"name": "广西龙星行汽车销售服务有限公司"
			}, {
				"name": "广西龙星行汽车销售服务有限公司南宁分公司"
			}, {
				"name": "南宁冠星汽车服务有限公司"
			}, {
				"name": "南宁冠星汽车服务有限公司高新分公司"
			}, {
				"name": "南宁恒信之星汽车销售服务有限公司"
			}]
		}, {
			"name": "北海",
			"state": [{
				"name": "北海弘之星汽车销售服务有限公司"
			}]
		}, {
			"name": "玉林",
			"state": [{
				"name": "玉林市龙星行汽车销售服务有限公司"
			}]
		}]
	}, {
		"name": "海南",
		"state": [{
			"name": "海口",
			"state": [{
				"name": "海南联合皇冠汽车服务有限公司"
			}, {
				"name": "海南嘉华之星汽车销售服务有限公司"
			}]
		}, {
			"name": "三亚",
			"state": [{
				"name": "海南华诚之星汽车销售服务有限公司"
			}]
		}]
	}, {
		"name": "湖南",
		"state": [{
			"name": "长沙",
			"state": [{
				"name": "湖南龙星行汽车销售服务有限公司"
			}, {
				"name": "湖南华美汽车销售服务有限公司"
			}, {
				"name": "湖南华美汽车销售服务有限公司星腾分公司"
			}, {
				"name": "湖南仁孚汽车销售服务有限公司"
			}, {
				"name": "湖南鹏龙瑞丰汽车销售服务有限公司"
			}]
		}, {
			"name": "郴州",
			"state": [{
				"name": "郴州鹏龙驰峰汽车销售服务有限公司"
			}]
		}, {
			"name": "衡阳",
			"state": [{
				"name": "衡阳市驰峰汽车贸易有限公司"
			}]
		}, {
			"name": "湘潭",
			"state": [{
				"name": "湘潭鸿粤凯泰汽车销售服务有限公司"
			}]
		}, {
			"name": "株洲",
			"state": [{
				"name": "株洲溢华汽车销售服务有限公司"
			}]
		}, {
			"name": "邵阳",
			"state": [{
				"name": "邵阳市大昌行汽车销售服务有限公司"
			}]
		}, {
			"name": "娄底",
			"state": [{
				"name": "娄底宝利德汽车有限公司"
			}]
		}, {
			"name": "常德",
			"state": [{
				"name": "常德仁孚汽车服务有限公司"
			}]
		}, {
			"name": "怀化",
			"state": [{
				"name": "怀化恒信之星汽车销售服务有限公司"
			}]
		}, {
			"name": "岳阳",
			"state": [{
				"name": "岳阳蓝马汽车销售服务有限公司"
			}]
		}]
	}, {
		"name": "江西",
		"state": [{
			"name": "赣州",
			"state": [{
				"name": "赣州华宏星汽车有限公司"
			}, {
				"name": "赣州华宏星汽车有限公司章贡区分公司"
			}]
		}, {
			"name": "景德镇",
			"state": [{
				"name": "景德镇宝利德汽车有限公司"
			}]
		}, {
			"name": "九江",
			"state": [{
				"name": "九江英之杰九星汽车销售服务有限公司"
			}]
		}, {
			"name": "南昌",
			"state": [{
				"name": "江西华宏名驰汽车有限公司"
			}, {
				"name": "南昌东之星汽车维修服务有限公司"
			}, {
				"name": "江西华宏星汽车有限公司"
			}, {
				"name": "南昌中升之星汽车销售服务有限公司"
			}, {
				"name": "南昌迎星汽车销售服务有限公司"
			}]
		}, {
			"name": "上饶",
			"state": [{
				"name": "江西省星徽行汽车销售有限公司"
			}]
		}, {
			"name": "新余",
			"state": [{
				"name": "新余之星汽车服务有限公司"
			}]
		}, {
			"name": "宜春",
			"state": [{
				"name": "宜春市星宜汽车销售服务有限公司"
			}]
		}, {
			"name": "抚州",
			"state": [{
				"name": "景德镇宝利德汽车有限公司抚州分公司"
			}]
		}, {
			"name": "吉安",
			"state": [{
				"name": "赣州华宏星汽车有限公司吉安分公司"
			}]
		}, {
			"name": "鹰潭",
			"state": [{
				"name": "贵溪鹰之星汽车销售服务有限公司"
			}]
		}]
	}, {
		"name": "重庆",
		"state": [{
			"name": "重庆",
			"state": [{
				"name": "重庆市合翘汽车销售服务有限公司"
			}, {
				"name": "重庆星顺汽车有限公司"
			}, {
				"name": "重庆星顺汽车有限公司涪陵分公司"
			}, {
				"name": "重庆星顺汽车有限公司联芳分公司"
			}, {
				"name": "重庆星顺汽车有限公司万州分公司"
			}, {
				"name": "重庆商社麒兴汽车销售服务有限公司"
			}, {
				"name": "仁孚美源（重庆）汽车服务有限公司"
			}, {
				"name": "仁孚美源（重庆）汽车服务有限公司南岸分公司"
			}, {
				"name": "重庆仁星汽车服务有限公司"
			}]
		}]
	}, {
		"name": "甘肃",
		"state": [{
			"name": "兰州",
			"state": [{
				"name": "甘肃鹏龙金城汽车销售服务有限责任公司"
			}, {
				"name": "兰州之星汽车有限公司"
			}]
		}]
	}, {
		"name": "贵州",
		"state": [{
			"name": "贵阳",
			"state": [{
				"name": "贵州鹏龙晨羲汽车销售服务有限公司"
			}, {
				"name": "贵州贵星汽车销售服务有限公司"
			}, {
				"name": "贵州贵星汽车销售服务有限公司贵阳分公司"
			}]
		}, {
			"name": "遵义",
			"state": [{
				"name": "遵义仁孚汽车服务有限公司"
			}]
		}]
	}, {
		"name": "湖北",
		"state": [{
			"name": "十堰",
			"state": [{
				"name": "十堰鹏贤汽车销售服务有限公司"
			}]
		}, {
			"name": "武汉",
			"state": [{
				"name": "武汉中升聚星汽车销售服务有限公司硚口分公司"
			}, {
				"name": "武汉宝利德汽车有限公司青山分公司"
			}, {
				"name": "武汉星隆汽车销售服务有限公司"
			}, {
				"name": "武汉星威汽车销售服务有限公司"
			}, {
				"name": "武汉宝利德汽车有限公司"
			}, {
				"name": "武汉中升聚星汽车销售服务有限公司"
			}, {
				"name": "武汉鹏龙华通汽车贸易有限公司"
			}]
		}, {
			"name": "襄阳",
			"state": [{
				"name": "襄阳恒信之星汽车销售服务有限公司"
			}]
		}, {
			"name": "宜昌",
			"state": [{
				"name": "宜昌恒信之星汽车销售服务有限公司"
			}]
		}, {
			"name": "黄石",
			"state": [{
				"name": "黄石市新源汽车销售有限公司"
			}]
		}, {
			"name": "黄冈",
			"state": [{
				"name": "黄冈恒信之星汽车销售服务有限公司"
			}]
		}, {
			"name": "荆州",
			"state": [{
				"name": "荆州恒信之星汽车销售服务有限公司"
			}]
		}, {
			"name": "恩施",
			"state": [{
				"name": "恩施恒信之星汽车销售服务有限公司"
			}]
		}, {
			"name": "荆门",
			"state": [{
				"name": "荆门恒信之星汽车销售服务有限公司"
			}]
		}]
	}, {
		"name": "宁夏",
		"state": [{
			"name": "银川",
			"state": [{
				"name": "宁夏驰川汽车销售服务有限公司"
			}, {
				"name": "宁夏利之星汽车有限公司"
			}]
		}]
	}, {
		"name": "青海",
		"state": [{
			"name": "西宁",
			"state": [{
				"name": "青海嘉德汽车销售服务有限公司"
			}, {
				"name": "青海之星汽车有限公司"
			}]
		}]
	}, {
		"name": "陕西",
		"state": [{
			"name": "宝鸡",
			"state": [{
				"name": "西安之星汽车有限公司宝鸡分公司"
			}]
		}, {
			"name": "西安",
			"state": [{
				"name": "西安华中星辉汽车销售服务有限公司"
			}, {
				"name": "西安利之星汽车有限公司"
			}, {
				"name": "西安利之星汽车有限公司高新分公司"
			}, {
				"name": "西安之星汽车有限公司"
			}, {
				"name": "西安新丰泰之星汽车销售服务有限公司"
			}]
		}, {
			"name": "榆林",
			"state": [{
				"name": "榆林市庞大乐业汽车销售服务有限公司"
			}]
		}, {
			"name": "咸阳",
			"state": [{
				"name": "咸阳市庞大之星汽车销售服务有限公司"
			}]
		}, {
			"name": "渭南",
			"state": [{
				"name": "西安利之星汽车有限公司渭南分公司"
			}]
		}, {
			"name": "汉中",
			"state": [{
				"name": "陕西汉中鹏龙中联之星汽车贸易有限公司"
			}]
		}, {
			"name": "延安",
			"state": [{
				"name": "延安广汇之星汽车销售服务有限公司"
			}]
		}]
	}, {
		"name": "四川",
		"state": [{
			"name": "成都",
			"state": [{
				"name": "成都武侯华星锦业汽车销售服务有限公司"
			}, {
				"name": "成都怡星仁孚汽车服务有限公司"
			}, {
				"name": "成都中升之星汽车销售服务有限公司"
			}, {
				"name": "成都仁孚南星汽车服务有限公司"
			}, {
				"name": "成都仁孚汽车销售服务有限公司"
			}, {
				"name": "四川华星锦业汽车销售服务有限公司"
			}, {
				"name": "四川瑞星行汽车销售服务有限公司"
			}, {
				"name": "成都中升智星汽车服务有限公司"
			}]
		}, {
			"name": "德阳",
			"state": [{
				"name": "德阳华星锦业汽车销售服务有限公司"
			}]
		}, {
			"name": "乐山",
			"state": [{
				"name": "乐山华星锦业汽车销售服务有限公司"
			}, {
				"name": "乐山华星锦业汽车销售服务有限公司峨眉山分公司"
			}]
		}, {
			"name": "眉山",
			"state": [{
				"name": "眉山华星锦业汽车销售服务有限公司"
			}, {
				"name": "眉山华星锦业汽车销售服务有限公司仁寿分公司"
			}]
		}, {
			"name": "绵阳",
			"state": [{
				"name": "绵阳华星锦业汽车销售服务有限公司"
			}]
		}, {
			"name": "南充",
			"state": [{
				"name": "南充华星锦业汽车销售服务有限公司"
			}]
		}, {
			"name": "攀枝花",
			"state": [{
				"name": "攀枝花远邦之星汽车销售服务有限公司"
			}]
		}, {
			"name": "宜宾",
			"state": [{
				"name": "宜宾仁孚汽车服务有限公司"
			}]
		}, {
			"name": "自贡",
			"state": [{
				"name": "自贡仁孚汽车服务有限公司"
			}]
		}, {
			"name": "达州",
			"state": [{
				"name": "达州仁孚汽车服务有限公司"
			}]
		}, {
			"name": "遂宁",
			"state": [{
				"name": "遂宁华星锦业汽车销售服务有限公司"
			}]
		}, {
			"name": "广安",
			"state": [{
				"name": "广安华星锦业汽车销售服务有限公司"
			}]
		}, {
			"name": "广元",
			"state": [{
				"name": "绵阳华星锦业汽车销售服务有限公司广元分公司"
			}]
		}]
	}, {
		"name": "西藏",
		"state": [{
			"name": "拉萨",
			"state": [{
				"name": "西藏之星汽车销售有限公司"
			}]
		}]
	}, {
		"name": "新疆",
		"state": [{
			"name": "乌鲁木齐",
			"state": [{
				"name": "新疆利星行汽车有限公司"
			}, {
				"name": "新疆之星汽车有限公司"
			}, {
				"name": "新疆天汇华驰汽车销售服务有限公司"
			}]
		}, {
			"name": "阿克苏",
			"state": [{
				"name": "新疆阿克苏华驰汽车销售服务有限公司"
			}]
		}, {
			"name": "喀什",
			"state": [{
				"name": "新疆喀什华驰汽车销售服务有限公司"
			}]
		}, {
			"name": "哈密",
			"state": [{
				"name": "哈密汇驰汽车销售服务有限公司"
			}]
		}, {
			"name": "伊犁",
			"state": [{
				"name": "新疆天汇汇驰汽车销售服务有限公司"
			}]
		}]
	}, {
		"name": "云南",
		"state": [{
			"name": "大理",
			"state": [{
				"name": "大理俊星汽车有限公司"
			}]
		}, {
			"name": "昆明",
			"state": [{
				"name": "昆明星旗汽车有限公司"
			}, {
				"name": "云南俊星汽车销售有限公司"
			}, {
				"name": "云南远安昆星汽车维修有限公司"
			}]
		}, {
			"name": "曲靖",
			"state": [{
				"name": "曲靖嘉麒汽车销售有限公司"
			}]
		}, {
			"name": "玉溪",
			"state": [{
				"name": "云南中凯虹星汽车销售服务有限公司"
			}]
		}]
	}];
	
	exports.myCity = myCity;

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map