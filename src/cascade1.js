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
class Cascade{
	constructor(data,selectElArr){
		const selectEls= [];
		for(let i=0,len=selectElArr.length;i<len;i++){
			const oneSelectEl = document.getElementById(selectElArr[i]);
			selectEls.push(oneSelectEl);
		}
		const num = selectEls.length;
		let dataByLevelArr = new Array(num);
		dataByLevelArr[0]= data;
		console.log(dataByLevelArr[0]);

		this.buildTipOption = this.buildTipOption.bind(this);
		this.fillCurrentLevelEl = this.fillCurrentLevelEl.bind(this);
		this.toCascadeNextEl = this.toCascadeNextEl.bind(this);
		this.initTheEls = this.initTheEls.bind(this);

		/*
		this.selectEls[0].innerHTML = "";
		this.selectEls[1].innerHTML = "";
		this.selectEls[2].innerHTML = "";

		this.selectEls[0].appendChild(this.buildTipOption());
		this.fillCurrentLevelEl(selectEls[0],data);
		*/
		this.initTheEls(selectEls,dataByLevelArr);
		/*
		selectEls[0].onchange = (e) => {
			const level0 = e.target.value;//this永远等于currentTarget，即被绑定的元素对象；而target为事件的实际目标
			selectEls[1].innerHTML = "";

			dataByLevelArr[0].forEach ((item) => {
				if(level0 === item.name){
					//var level1s = item.state;
					this.dataByLevelArr.push(item.state);//下一层使用的数据就是dataByLevelArr[1]
				}
			});

			this.fillCurrentLevelEl(selectEls[1],level1s);
			this.simulateChangeEvent(selectEls[1]);
		};*/
		this.toCascadeNextEl(0,selectEls,dataByLevelArr);


		/*
		selectEls[1].onchange = (e) => {
			const level1 = e.target.value;
			selectEls[2].innerHTML ="";
	
			dataByLevelArr[1].forEach((itema) => {
				if(level1==itema.name){
					//const level2s = itema.state;
					dataByLevelArr[2]=itema.state;//下一层使用的数据就是dataByLevelArr[2]
				}
			});

			this.fillCurrentLevelEl(selectEls[2],dataByLevelArr[2]);
		}
		*/
		this.toCascadeNextEl(1,selectEls,dataByLevelArr);
	}

	buildTipOption(){
		const tipOption = document.createElement("option");
		tipOption.value = -1;
		tipOption.text ="请选择";
		return tipOption;
	}

	simulateChangeEvent(el){
		const changeEvent = document.createEvent("HTMLEvents");
		changeEvent.initEvent("change",false,true);
		el.dispatchEvent(changeEvent);
	}

	/*
	* @param currentLevelEl——type ：a select HTMLElement; eg: selectsEls[0]
	* @param currentLevelData——type: a obj accord with here "data" form; eg:data
	*/
	fillCurrentLevelEl(currentLevelEl,currentLevelData){
		//currentLevelEl.innerHTML = "";
		//currentLevelEl.appendChild(this.buildTipOption());
		console.log("fillCurrentLevelElp1:"+currentLevelEl);
		console.log("fillCurrentLevelElp2:"+currentLevelData);
		(currentLevelData).forEach(function(item){
			const oneOption = document.createElement("option");
			oneOption.value = item.name;
			oneOption.innerHTML = item.name;
			currentLevelEl.appendChild(oneOption);
		});
	}


	initTheEls(elArr,dataArr){
		console.log(elArr);
		console.log(dataArr);
		for(let i=0,len = elArr.length;i<len;i++){
			elArr[i].innerHTML = "";
		}
	
		elArr[0].appendChild(this.buildTipOption());
		this.fillCurrentLevelEl(elArr[0],dataArr[0]);
	}


	/*
	 * @param n:如果一共有n层级联，即 this.selectEls.length 为 n,则该参数值为当前发生onchange事件的级联元素的index:0,1,2...n-2,最多为倒数第二个元素
	 * @param elArr = this.selectEls
	*/
	toCascadeNextEl(n,elArr,dataArr){
		console.log(typeof(n));
		console.log("toCasecadeNextEl_data:"+ dataArr);
		console.log("toCasecadeNextEl_p2: "+elArr[n]);
		console.log("toCasecadeNextEl_p3: "+dataArr[n]);


		elArr[n].onchange = (e) => {
			const targetValue = e.target.value;//this永远等于currentTarget，即被绑定的元素对象；而target为事件的实际目标
			elArr[n+1].innerHTML = "";

			(dataArr[n]).forEach ((item) => {
				if(targetValue == item.name){
					//var level1s = item.state;
					dataArr[n+1] = item.state;//下一层使用的数据就是dataByLevelArr[1]
				}
			});

			this.fillCurrentLevelEl(elArr[n+1],dataArr[n+1]);
			if(elArr[n+2]){
				this.simulateChangeEvent(elArr[n+1]);
			}
			
		};

	}

}

export { Cascade }