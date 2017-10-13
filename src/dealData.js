// You can use this the func dealData to change data from excel to the json we Cascade need
// There is the tool of translating excel to json:http://www.bejson.com/json/col2json/

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

    //MARK:完成对本级outValueArr的填写
    for(const dataItem of inputData) {
      for(const [outKeyIndex, outKey] of outKeyArr.entries()) { //遍历当前值数组：["安徽","江苏"]
        let outValueOne = new Object();//创建一个对象，存放对应该值数组每个值的结果对象即{"name":"安徽", "state":[]}
        
        outKeyValuePrev = outKey;

        if(dataItem[fieldItem] == outKey) { //如果此次遍历的当前字段和outValueOne.name相等
         
          if(nameValueArr.indexOf(outKey) == -1) { //没有处理过这个outKey的才需要处理
            nameValueArr.push(outKey);
            outValueOne.name = outKey;

            if(fieldIndex+1 < fieldLength) {//如果还有下一个字段，则state为下一个字段执行dealOnefield
              outValueOne.state = dealOnefield(fieldIndex+1);
            }/* else {
              console.log("leaf");
            }*/

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
