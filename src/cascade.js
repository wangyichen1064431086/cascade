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
		this.selectEls = selectEls;


		selectEls[0].appendChild(this.buildTipOption());
		data.forEach(function(item){
			const oneOption = document.createElement("option");
			oneOption.value = item.name;
			oneOption.innerHTML = item.name;
			selectEls[0].appendChild(oneOption);
		});



		selectEls[0].onchange = (e) => {
			const level0 = e.target.value;//this永远等于currentTarget，即被绑定的元素对象；而target为事件的实际目标
			selectEls[1].innerHTML = "";
			/*
			if (level0 === -1){
				selectEls[1].appendChild(this.buildTipOption());
			}
			*/
			data.forEach ((item) => {
				if(level0 === item.name){
					const level1s = item.state;
					level1s.forEach((itema) => {
						const onelevel1 = itema.name;
						const oneLevel1Option = document.createElement("option");
						oneLevel1Option.value=onelevel1;
						oneLevel1Option.innerHTML = onelevel1;
						selectEls[1].appendChild(oneLevel1Option);
					});
				}
			});

			this.simulateChangeEvent(selectEls[1]);
		};



		selectEls[1].onchange = (e) => {
			const level1 = e.target.value;
			selectEls[2].innerHTML ="";
			/*
			if(level1 === -1){
				selectEls[2].appendChild(this.buildTipOption());
			}
			*/
			data.forEach(function(item){
				const level1s=item.state;
				level1s.forEach(function(itema){
					if(level1==itema.name){
						const level2s = itema.state;
						level2s.forEach(function(itemb){
							const oneLevel2 = itemb.name;
							const oneLevel2Option = document.createElement("option");
							oneLevel2Option.value=oneLevel2;
							oneLevel2Option.innerHTML=oneLevel2;
							selectEls[2].appendChild(oneLevel2Option);
						});
					}
				});

			});
		}
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

}

export { Cascade }