/*
 /// param Eg:
* @param data: Your cleaned json data
* @param elemarr:["#province","#city","#shop"]

/// html Eg:
	<select name="province" id="province" style="top:290px;">
		<option value="-1">请选择</option>
		<option>湖南</option>
		<option>江苏</option>
		<option>上海</option>
		<option>浙江</option>
		<option>北京</option>
		<option>河北</option>
	</select>
	<select name="city" id="city" style="top:290px;left:192px;">
		<option>长沙</option>
		<option>郴州</option>
		<option>衡阳</option>
		<option>湘潭</option>
		<option>株洲</option>
	</select>
	<select name="shop" id="shop" style="top:387px;width:178px;">
		<option>湖南龙星行汽车销售服务有限公司</option>
		<option>湖南华美汽车销售服务有限公司</option>
		<option>湖南华美汽车销售服务有限公司星腾分公司</option>
		<option>湖南仁孚汽车销售服务有限公司</option>
		<option>湖南鹏龙瑞丰汽车销售服务有限公司</option>
	</select>
*/


class Cascade{
	constructor(data,selectElArr){
		const selectEls= [];
		for(let i=0,len=selectElArr.length;i<len;i++){
			const oneSelectEl = document.getElementById(selectElArr[i]);
			selectEls.push(oneInputEl);
		}
		this.selectEls = selectEls;


		selectEls[0].appendChild(buildTipOption());

		data.foreach(function(item){
			let oneOption = document.createElement("option");
			oneOption.value = item.name;
			selectEls[0].appendChild(oneOption);
		});



		selectEls[0].onchange = function(e){
			let level0 = this.value;
			selectEls[1].innerHTML = "";
			if (level0 === -1){
				selectEls[1].appendChild(buildTipOption());
			}

			data.foreach(function(item){
				if(level0 === item.name){
					let level1s = item.state;
					level1s.foreach(function(itema){
						let onelevel1 = itema.name;
						let oneLevel1Option = document.createElement("option");
						oneLevel1Option.value=onelevel1;
						selectEls[1].appendChild(oneLevel1Option);
					})
				}
			})
			selectEls[1].change();
		};

		selectEls[1].onchange=function(e){
			let level1 = this.value;
			selectEls[2].innerHTML ="";
			if(level1 === -1){
				selectEls[2].appendChild(buildTipOption());
			}
			data.foreach(function(item){
				let level1s=item.state;
				level1s.foreach(function(itema){
					if(level1==itema.name){
						let level2s = itema.state;
						level2s.foreach(function(itemb){
							let oneLevel2 = itemb.name;
							let oneLevel2Option = document.createElement("option");
							oneLevel2Option.value=oneLevel2;
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
		tipOption.text ="请选择"；
		return tipOption;
	}


}