"use strict";
// // test function
// // export function hello(){
// //     return 'caoqiulei';
// // }
exports.__esModule = true;
// export class Hello{
//     name: string | undefined;
//     constructor(){
//         this.name = 'caoqiulei';
//     };
//     print(a: string){
//         this.name = a;
//         return this.name;
//     }
// }
// export { Hello as HELLO };
// Copyright 2017-2020 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
var shouldQuitFlag = false;
function markShouldQuit1() {
    shouldQuitFlag = true;
}
exports.markShouldQuit1 = markShouldQuit1;
function shouldQuit1() {
    return shouldQuitFlag;
}
exports.shouldQuit1 = shouldQuit1;
var isReadyForShutdown = false;
function markReadyForShutdown1() {
    isReadyForShutdown = true;
}
exports.markReadyForShutdown1 = markReadyForShutdown1;
function readyForShutdown1() {
    return isReadyForShutdown;
}
exports.readyForShutdown1 = readyForShutdown1;
