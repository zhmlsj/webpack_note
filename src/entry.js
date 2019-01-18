import css from "./css/index.css";
import le from "./css/le.less";
import sa from "./css/sa.scss";

document.getElementById("title").innerHTML = "hello webpack 111!";

let ss = "1";

let b = () => {
  console.log(1);
};

let a = b => c => d => b + c + d;

let obj = { school: "1" };
let obj1 = { age: "2" };

let newObj = { ...obj, ...obj1 }; //es7语法

let input = [1, 2, 4];
input.map(item => item + 1);

$("#title").html("Hello zzz");

var json = require("../config.json");
document.getElementById("json").innerHTML = json;
