/*data*/
import { Cascade } from "../src/cascade.js";
import { myCity } from "./data.js";

const mySelectElems = ["province","city","shop"];
const myCascade = new Cascade(myCity,mySelectElems);
