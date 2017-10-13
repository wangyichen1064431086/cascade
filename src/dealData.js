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
    
  const fieldLength = fieldArr.length;//字段数组长度： 3
  let outKeyValuePrev = "";

  const dealOnefield = function(fieldIndex){//@param fieldIndex：当前要处理的字段层级   
    const fieldItem = fieldArr[fieldIndex];//当前字段："province"

    const outKeyArr = [];//存放当前层级字段值数组，最后应该为["安徽","江苏"]
    const outValueArr = [];//存放当前层级字段对象数组，最后应该为[{"name":"安徽", "state":[]}, {"name":"江苏"，"state":[]}]
    const nameValueArr =[];//保证每个对象的name值只出现过一次
    let fieldItemPrev = "";
    
    if(fieldIndex > 0) {
      fieldItemPrev = fieldArr[fieldIndex-1];
    } //fieldItemPrev存放上一字段，如果fieldItem="shop",则fieldItemPrev="province";如果fieldItem="province"，则fieldItemPrev=""

    ///MARK:先取出本层级的所有值的数组，即完成对outKeyArr的填写
    for(const dataItem of inputData) { //遍历inputData
      let outKeyOne = dataItem[fieldItem];//值:"安徽"

      if(fieldItemPrev == "" || dataItem[fieldItemPrev] == outKeyValuePrev) {
        if(outKeyArr.indexOf(outKeyOne) == -1) { //outKeyArr:原 var provinceArray
          outKeyArr.push(outKeyOne);
        }
      } 
    }

    console.log(`outKeyArr:${JSON.stringify(outKeyArr)}`);
    //MARK:完成对本级outValueArr的填写
    for(const dataItem of inputData) {
      for(const [outKeyIndex, outKey] of outKeyArr.entries()) { //遍历当前值数组：["安徽","江苏"]
        let outValueOne = new Object();//创建一个对象，存放对应该值数组每个值的结果对象即{"name":"安徽", "state":[]}
        
        outKeyValuePrev = outKey;
        console.log(`here fieldItemPrev:${fieldItemPrev}`);
        console.log(`here fieldIndex:${fieldIndex}`);

        if(dataItem[fieldItem] == outKey) { //如果此次遍历的当前字段和outValueOne.name相等
         
          if(nameValueArr.indexOf(outKey) == -1) { //没有处理过这个outKey的才需要处理
            nameValueArr.push(outKey);
            outValueOne.name = outKey;

            if(fieldIndex+1 < fieldLength) {//如果还有下一个字段，则state为下一个字段执行dealOnefield
              console.log("nextField");
              console.log(`fieldIndex+1:${fieldIndex+1}`);
              
              console.log(`outKeyValuePrev:${outKeyValuePrev}`);
              outValueOne.state = dealOnefield(fieldIndex+1);
            } else {
              console.log("leaf")
            }

            outValueArr.push(outValueOne); 
          }
          
         
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
