# Cascade

The methods of building cascade select elements, including the method related with data processing.


## Introduce
This is a tool for producing a form part comprised of a series of "select" elements. The data of them are cascaded, so there is also a method to convert common data to the data with specified structure.

## Installation
```
npm install "@ftchinese/cascade" --save
```

### Import 
```
import cascade from "@ftchinese/cascade";
```
## API


### cascade.dealData(inputData, fieldArr)
Convert common data to data with specified structure.
#### Usage Example
```
const dealData = cascade.dealData;
const myDealedData = dealData(myRawData,["province","city","shop","phone"]);
```
#### param
- @param inputData: TYPE Array, it shoud be specfied structure like the **Eg Data1**:
    ```
   [
    {"province":"安徽","city":"蚌埠","shop":"蚌埠分公司"},
    {"province":"安徽","city":"阜阳","shop":"阜阳分公司"},
    {"province":"安徽","city":"合肥","shop":"合肥分公司1"},
    {"province":"安徽","city":"合肥","shop":"合肥分公司2"},
    {"province":"江苏","city":"苏州","shop":"苏州分公司"},
    {"province":"江苏","city":"常州","shop":"常州分公司1"},
    {"province":"江苏","city":"常州","shop":"常州分公司2"},
    {"province":"江苏","city":"常州","shop":"常州分公司3"},
    {"province":"江苏","city":"淮安","shop":"淮安分公司1"},
    {"province":"江苏","city":"淮安","shop":"淮安分公司2"}
  ]
    ```
- @param keyArray:Type Array, each item is a string. The func will process data following the order of this array.Here，it can be:["provice","city","shop"]

#### more detail
##### 1. How to get the input data in correct structure?
 It is simple to get your input data(as structure of **Eg Data1**).

 Usually, our raw data is excel data, like:

 province | city | shop
 ---------|------|-----
  安徽|蚌埠|蚌埠分公司 
  安徽|阜阳|阜阳分公司
  安徽|合肥|合肥分公司
  安徽|合肥|合肥分公司 
  江苏|苏州|苏州分公司
  江苏|常州|常州分公司1
  江苏|常州|常州分公司2
  江苏|常州|常州分公司3
  

There are a lot of tools of translating this excel data to  **Eg Data1**, such as <http://www.bejson.com/json/col2json/>. What you need to do is just copying the excel data, pasting it in the page, and clicking the convert button. Then you can get the data like **Eg Data1**.

##### 2. It can only process the data with 3 fields?
No. You can have any number of fields as many as you like. 

### new cascade.Cascade(myDealeddata,selectElArr)
Loading the structured data to the select elements. Then the select elements can be cascaded.

#### Usage Example
```
const Cascade = cascade.Cascade;
const dealData = cascade.dealData;

const myDealedData = dealData(myRawData,["province","city","shop","phone"]);
const mySelectElems = ["province","city","shop","phone"];
const myCascade = new Cascade(myDealedData, mySelectElems);
```
#### param
-  @param myDealeddata: TYPE Array, the data returned by executing func dealData(as above), which structure is like **Eg Data2**:

    ```
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
    ```
-  @param selectElArr: Type Array, each item is the id string of a select element in your html file, eg:["province","city","shop"]. The html fragment is like:

    ```
      <form>
        ...
        <select name="province" id="province" style="top:290px;">
        </select>
        <select name="city" id="city" style="top:290px;left:192px;">
        </select>
        <select name="shop" id="shop" style="top:387px;width:178px;">
        </select>
        ...
      </form>
    ```
