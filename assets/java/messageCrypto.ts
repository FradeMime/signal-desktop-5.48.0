const execFile = require('child_process').execFile;
function func1(inputMsg: string, friendId: string, callBackFunc: any){
  const filepath = '/home/leiqiu/Desktop/weing/client.js';
  const processSendMsg = {
    type: 'encrypt',
    idSelf: '15051510559',
    idFriend: friendId,
    msg: inputMsg,
  };
  let retStr = '';
  
  execFile(
    filepath,
    [JSON.stringify(processSendMsg)],
    (err: string, stdout: string, _stderr: any) => {
      if (err) {
        console.log(`错误信息:${err}`);
        return;
      }
      retStr = stdout;
      console.log(`1接收数据:${stdout}`);
      callBackFunc(retStr);
    }
  );
}

export function func2(inputMsg: any, friendId: any){
  return new Promise<string>((resolve) => {
    func1(inputMsg, friendId,(successResponse: any) => {
        resolve(successResponse);
    });
});}