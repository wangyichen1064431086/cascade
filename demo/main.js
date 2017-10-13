/*data*/
import cascade from "../main.js";
import myRawData from "./data.js";
const Cascade = cascade.Cascade;
const dealData = cascade.dealData;

console.log("new method");
const myDealedData = dealData(myRawData,["province","city","shop","phone"]);
console.log(`myDealdedData:${JSON.stringify(myDealedData)}`);
const mySelectElems = ["province","city","shop","phone"];
const myCascade = new Cascade(myDealedData, mySelectElems);
