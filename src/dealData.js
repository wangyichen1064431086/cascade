// You can use this the func dealData to change data from excel to the json we Cascade need
// There is the tool of translating excel to json:http://www.bejson.com/json/col2json/


/* Eg data: 3 level
const rawData=[
  {"province":"安徽","city":"蚌埠","shop":"蚌埠星辉汽车销售服务有限公司"},
  {"province":"安徽","city":"阜阳","shop":"阜阳伟久汽车销售服务有限公司"},
  {"province":"安徽","city":"合肥","shop":"安徽之星汽车销售服务有限公司"},
  {"province":"安徽","city":"合肥","shop":"合肥利之星汽车服务有限公司"},
  {"province":"安徽","city":"马鞍山","shop":"马鞍山之星汽车销售服务有限公司"},
  {"province":"安徽","city":"铜陵","shop":"铜陵利星汽车销售服务有限公司"},
  {"province":"安徽","city":"芜湖","shop":"芜湖中星汽车销售服务有限公司北京中路分公司"},
  {"province":"江苏","city":"苏州","shop":"常熟中升之星汽车销售服务有限公司"},
  {"province":"江苏","city":"常州","shop":"常州之星汽车有限公司"},
  {"province":"江苏","city":"常州","shop":"常州外汽星豪汽车销售服务有限公司"},
  {"province":"江苏","city":"常州","shop":"常州万帮汽车销售服务有限公司"},
  {"province":"江苏","city":"淮安","shop":"淮安之星汽车销售服务有限公司"},
  {"province":"江苏","city":"淮安","shop":"淮安之星汽车销售服务有限公司清河新区分公司"}
]
*/
function dealData(inputData, fieldArr) {//inputData是一个对象组成的数组
  /**
   * @param inputData: TYPE Array, such as eg data
   * @param keyArray:Type Array, each item is a string.deal Data following order of this array.such as ["provice","city","shop"]
   */
  //先取出不同的省份存入数组provinceArray,并为outputData生成最外层的name字段（即省份）
  /*
  var provinceArray=new Array;
  var province="";
  var provinceObj=new Object;
  var provinceObjArray=new Array;

  var city="";
  var cityArray;
  var cityObj;
  var cityObjArray;

  var shop="";
  var shopArray;
  var shopObj;
  var shopObjArray;
  */
  
    
  const fieldLength = fieldArr.length;
  let fieldItemPrev = "";
  let outKeyOnePrev = "";//存放上一级的key值
  
  let n = 0; 
  let m = 0;

  const dealOnefield = function(fieldIndex){
    //for(var i=0,len=inputData.length;i<len;i++) {
    console.log(`n:${n++}`);
    const fieldItem = fieldArr[fieldIndex];

    const outKeyArr = new Array();
    const outValueArr = new Array();

    for(const dataItem of inputData) {
      //let outKeyOne = "";
      //let outValueOne = new Object();
      console.log(`m:${m++}`);
      if(fieldItemPrev == "" || dataItem[fieldItemPrev] == outKeyOnePrev) {
        let outKeyOne = dataItem[fieldItem];//原var province值:"安徽"
        let outValueOne = new Object();
  
        if(outKeyArr.indexOf(outKeyOne) == -1) { //outKeyArr:原 var provinceArray
          outKeyArr.push(outKeyOne);
          outValueOne.name = outKeyOne;
  
          fieldItemPrev = fieldItem;
          outKeyOnePrev = outKeyOne;
          
          /*
            ///处理城市
            cityArray=new Array;
            cityObjArray=new Array;
            for(var j = 0, len2 = inputData.length; j < len2; j++) {//取出该省下的所有市
              if(inputData[j].province==province) {
                city=inputData[j].city;
                cityObj=new Object;
                if(cityArray.indexOf(city)==-1) {
                  cityArray.push(city);
                  cityObj.name=city;
                  
                  ///处理供销商
                  shopArray=new Array;
                  shopObjArray=new Array;
                  for(var k=0,len3=inputData.length;k<len3;k++) {
                    if(inputData[k].city==city) {
                      shop=inputData[k].shop;
                      shopObj=new Object;
                      if(shopArray.indexOf(shop)==-1) {
                        shopArray.push(shop);
                        shopObj.name=shop;
                        shopObjArray.push(shopObj);
                      }
    
                    }
                  }
                  cityObj.state=shopObjArray;
    
    
                  cityObjArray.push(cityObj);
                }				
              }
            }
          */
  
          //provinceObj.state = cityObjArray;
          if(fieldIndex + 1 < fieldLength) {
            outValueOne.state = dealOnefield(fieldIndex+1);
          }
          //provinceObjArray.push(provinceObj);
          outValueArr.push(outValueOne);  
        }
  
      }  
    }
    return outValueArr;
  };
  


  const result = dealOnefield(0);
  return result;
}



//得到数据后使用json在线格式化工具：http://www.json.cn/
export default dealData;
