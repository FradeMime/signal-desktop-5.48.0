var execFile = require('child_process').execFile;
function func1(inputMsg, callBackFunc) {
    var filepath = '/home/leiqiu/Desktop/weing/client.js';
    var processSendMsg = {
        type: 'encrypt',
        idSelf: '15051510559',
        idFriend: '15055555555',
        msg: inputMsg
    };
    var retStr = '';
    execFile(filepath, [JSON.stringify(processSendMsg)], function (err, stdout, _stderr) {
        if (err) {
            console.log("\u9519\u8BEF\u4FE1\u606F:" + err);
            return;
        }
        // console.log(`1接收数据:${stdout}`);
        retStr = stdout;
        console.log("1\u63A5\u6536\u6570\u636E:" + stdout);
        callBackFunc(retStr);
    });
}
function func2(inputMsg) {
    return new Promise(function (resolve) {
        func1(inputMsg, function (successResponse) {
            resolve(successResponse);
        });
    });
}
module.exports = func2;
