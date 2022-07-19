"use strict";
// import {mpinapp} from './mpinapp'
// let mpin : any;
// mpin = new mpinapp();
// mpin.generateMasterKey();
// mpin.createClientID('testUser@miracl.com');
// mpin.generateServerSecretKey();
// mpin.generateClientSecretKey();
exports.__esModule = true;
// const mpinapp = require('./mpinapp');
// let test = new mpinapp();
// export function hello(){
//     test.generateMasterKey();
// }
// class hello{
//     name(): void{
//         console.log('caoqiulei');
//     }
// }
// let abc = new hello();
// abc.name();
// const getValue = () => {
//     return 0;
// }
// enum List{
//     A = getValue(),
//     B = 2,
//     C
// }
// console.log(List.A);
// console.log(List.B);
// console.log(List.C);
// (function(){
//     var x = 'hello';
//     console.log(x);
// })()
// var msg1 = function(){
//     return 'hello, cql';
// }
// console.log(msg1());
// var msg2 = function(a: number, b: number){
//     return a + b;
// }
// console.log(msg2(1, 2));
// Lambda
// var foo = (x: number) => 10 + x;
// console.log(foo(19));
// var funx = (x: any)=> {
//     if(typeof x == "number")
//         console.log(x+'是一个number');
//     else if(typeof x == "string")
//         console.log(x+'是一个string');
// }
// funx(112);
// funx('caoqiulei');
// let suits = ["hearts", "spades", "clubs", "diamonds"];
// // 定义重载签名
// function greet(persion: string): string;
// function greet(persions: string[]): string[];
// // 重新定义签名
// function greet(persion: unknown): unknown {
//     if(typeof persion === "string"){
//         return `hello, ${persion}`;
//     } else if(Array.isArray(persion)) {
//         return persion.map(name => `hello, ${name}`);
//     }
//     throw new Error('Unable to greet');
// }
// console.log(greet(suits[0]));
// console.log(greet(suits));
// // map
// // change tsc ts_test.ts to :  tsc ts_test.ts --lib "es6","dom" --downLevelIteration
// or change tsconfig
// {
//     "compilerOptions": {
//         "target": "es5",
//         "downlevelIteration": true
//     }
// }
// let mapName = new Map();
// mapName.set("baidu", 1);
// mapName.set("bing", 2);
// mapName.set("google", 3);
// for(let key of mapName.keys())
//     console.log(key);
// for(let value of mapName.values())
//     console.log(value);
// for(let entry of mapName.entries())
//     console.log(entry[0], entry[1])
// for(let [key, value] of mapName)
//     console.log(key, value);
// // 接口 interface
// interface IPersion{
//     firstName: string,
//     lastName: string,
//     sayHi: ()=> string
// }
// var student: IPersion = {
//     firstName: "cao",
//     lastName: "qiulei",
//     sayHi: ():string => {return "hi, i'm cql"}
// }
// console.log(student.firstName);
// console.log(student.lastName);
// console.log(student.sayHi());
// // 多重继承 extends
// interface IPersion1{
//     v1: number
// }
// interface IPersion2{
//     v2: number
// }
// interface child extends IPersion1, IPersion2{}
// var obj: child = {v1: 123, v2: 456}
// console.log(`v1 number:${obj.v1};  v2 number:${obj.v2}`)
// // 类 Class
// class Persion{
//     name: string;
//     constructor(name: string){
//         this.name = name;
//     }
//     print(): void{
//         console.log(`persion name:${this.name}`);
//     }
// }
// var tsPer = new Persion("caoqiulei");
// tsPer.print();
// // class && extends
// class student extends Persion{
//     change(name: string){
//         this.name = name;
//     }
// }
// var li = new student('leiqiu');
// li.print();
// li.change('leiqiu Cao')
// li.print();
// // instanceof
// var insof = new student('test');
// console.log(`insof是student类吗? ${insof instanceof student}`);
// // 对象
// var sites = {
//     name: "caoqiulei",
//     age: 18,
//     sayHi: function () { }
// }
// sites.sayHi = function(){
//     console.log(`${sites.name} is ${this.age} years old`);
// }
// sites.sayHi();
// var sites_db ={
//     name: "leiqiu",
//     age: 26
// };
// var psites = function(obj: {name: string , age: number}){
//     console.log(`name:${obj.name}`);
//     console.log(`age:${obj.age}`);
// }
// psites(sites_db);
// interface IPoint{
//     x: number,
//     y: number
// }
// function addPoint(a: IPoint, b: IPoint): IPoint{
//     var X = a.x + b.x;
//     var Y = a.y + b.y;
//     return {x:X, y:Y};
// }
// // correct
// var newPoint = addPoint({x:1, y:2}, {x:1, y:2});
// // error
// var errPoint = addPoint({x:1}, {x:1, y:2});
// // 命名空间
// namespace Drawing{
//     export interface IShape{
//         draw(): void;
//     }
// }
// module
// export interface SomeInterface{
//     print()；
// }
// eslint-disable-next-line camelcase
const mpinapp_1 = require("./mpinapp");

let mpin;
// eslint-disable-next-line prefer-const
mpin = new mpinapp_1();
// eslint-disable-next-line no-console
console.log(`\u7B56\u5212:${  mpin.generateMasterKey()}`);
mpin.createClientID('testUser@miracl.com');
mpin.generateServerSecretKey();
mpin.generateClientSecretKey();
