// // test function
// // export function hello(){
// //     return 'caoqiulei';
// // }

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

let shouldQuitFlag = false;

export function markShouldQuit1(): void {
  shouldQuitFlag = true;
}

export function shouldQuit1(): boolean {
  return shouldQuitFlag;
}

let isReadyForShutdown = false;

export function markReadyForShutdown1(): void {
  isReadyForShutdown = true;
}

export function readyForShutdown1(): boolean {
  return isReadyForShutdown;
}
