# cascade

## Introduce
This is a tool for producing a cascade form comprised of a series of "select" elements and data of specified structure.

### The file "src/cascade1.js"
This is the key js file. There is the class "Cascade",which can help you to produce the cascade form. 


### The folder "src/demo"
The foler has a simple example,which you can preview the effect of a webpage with a cascade form.


## How to use

### First prepare your data
You need to convert your data to a javascript array, like:

```
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
        }
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

```

Yes,it is a 3 level data. But you can have any level data as long as you like. Every element of the array is a object like {"name":"","state":[]},the content of "state" is an array with the same structure as the top array.

### Next write your html 
Your html must have a "form" Element. And the "form" Element must have a list of "select" elements. Note that the number of your "select" element must be the same as the number of your data levels. 
For example, the above data, myCity,has 3 levels, so the html must have 3 "select" elements.

### Produce an instance of the class "Cascade"
You just need to write

```
    const myCascade = new Cascade(paramA,paramB);`
 
```

The paramA is your data, eg:myCity. And the paramB is an array of the ids of your "select" element, eg :["id1","id2","id3"]

## Preview the demo
I had written a demo for you to preview the effect.

You just need to 

```
  git clone THIS REPOSITORY
  
  cd cascade
  
  npm install
  
  npm install "gulpjs/gulp#4.0" -g
  npm install "gulpjs/gulp#4.0" (for "npm install" cannot install gulp4.0 successfully)
  
  gulp serve
  
```

Your bower will be opened ,and then you can see and try the cascade form.

