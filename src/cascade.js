/*
 * param Eg:
 ** @param data: Your cleaned json data,eg: 
		[
			{
				"name": "安徽",
				"state": [
					{
						"name": "蚌埠",
						"state": [{
							"name": "蚌埠分公司"
						}]
					},
					{
						"name": "阜阳",
						"state": [{
							"name": "阜阳分公司"
						}]
					},
					{
						"name": "合肥",
						"state": [{
							"name": "合肥分公司1"
						},
						{
							"name": "合肥分公司2"
						}
					}
				]
			},
			{
				"name": "江苏",
				"state": [
					{
						"name": "苏州",
						"state": [{
							"name": "苏州分公司"
						}]
					}, 
					{
						"name": "常州",
						"state": [
						{
							"name": "常州分公司1"
						},
						{
							"name": "常州分公司2"
						},
						{
							"name": "常州分公司3"
						}]
					},
					...
				]
			},
		]

 ** @param selectElArr: Type Array, each item is the id string of a select element in your html file. eg:["province","city","shop"]

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
		const dataByLevelArr = new Array(num);
		dataByLevelArr[0]= data;

		this.buildTipOption = this.buildTipOption.bind(this);
		this.fillCurrentLevelEl = this.fillCurrentLevelEl.bind(this);
		this.initTheEls = this.initTheEls.bind(this);
		this.toCascadeNextEl = this.toCascadeNextEl.bind(this);

		this.initTheEls(selectEls,dataByLevelArr);
		
		for(let i=0;i<num-1;i++){
			this.toCascadeNextEl(i,selectEls,dataByLevelArr);
		}	
	}

	/* Method buildTipOption: Produce the  <option value="-1">请选择</>
	*/
	buildTipOption(){
		const tipOption = document.createElement("option");
		tipOption.value = -1;
		tipOption.text ="请选择";
		return tipOption;
	}

	/* Method simulateChangedEvent: Simulate the behavior of the event "change"
	 * @param el——type:HTMLElement, a "select" HTMLElement;eg:selectEls[0]
	*/
	simulateChangeEvent(el){
		const changeEvent = document.createEvent("HTMLEvents");
		changeEvent.initEvent("change",false,true);
		el.dispatchEvent(changeEvent);
	}

	/* Methode fillCurrentLevelEl: Use currentLevelData to produce a list of option elements to fill in the currentLevelEl
	* @param currentLevelEl——type ：HTMLElement,a "select" HTMLElement; eg: selectsEls[0]
	* @param currentLevelData——type: Obj, a obj accord with the data structure of "data" ; eg:data
	*/
	fillCurrentLevelEl(currentLevelEl,currentLevelData){
		(currentLevelData).forEach(function(item){
			const oneOption = document.createElement("option");
			oneOption.value = item.name;
			oneOption.innerHTML = item.name;
			currentLevelEl.appendChild(oneOption);
		});
	}

	/* Method initTheEls:Set all "select" elements' content to "",then fill the selectEls[0]
	 * @param elArr——type: array,an array of "select" Element;eg:selectEls
	 * @param dataArr——type: array,an array of obj data which are accord with the data structure of "data"
	*/
	initTheEls(elArr,dataArr){
		//console.log(elArr);
		//console.log(dataArr);
		for(let i=0,len = elArr.length;i<len;i++){
			elArr[i].innerHTML = "";
		}
	
		elArr[0].appendChild(this.buildTipOption());
		this.fillCurrentLevelEl(elArr[0],dataArr[0]);
	}


	/* Method toCascadeNextEl: When current level "select" element onchange, fill in the next level "select" element.
	 * @param n——type:number,如果一共有n层级联，即 this.selectEls.length 为 n,则该参数值为当前发生onchange事件的级联元素的index:0,1,2...n-2,最多为倒数第二个元素
	 * @param elArr——type:array;eg:selectEls
	 * @param dataArr——type:array;eg:dataByLevelArr
	*/
	toCascadeNextEl(n,elArr,dataArr){
		elArr[n].onchange = (e) => {
			const targetValue = e.target.value;
			elArr[n+1].innerHTML = "";

			(dataArr[n]).forEach ((item) => {
				if(targetValue == item.name){
					dataArr[n+1] = item.state;//下一层使用的数据就是dataByLevelArr[n+1]
				}
			});

			this.fillCurrentLevelEl(elArr[n+1],dataArr[n+1]);
			if(elArr[n+2]){
				this.simulateChangeEvent(elArr[n+1]);
			}
			
		};
	}

}

export default Cascade;