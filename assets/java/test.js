

var java = require("java");
java.classpath.push("./com.weing.jar");
//keymanager 私钥   phone 公钥
var keymanager = java.callStaticMethodSync(
    "com.weing.vChatTest.util.Util",
    "getkeymanager",
    "159189189561546165"
    );

// var keymanager = java.callStaticMethodSync("com.weing.vChatTest.util.Util", "getkeymanager","+8615000000000");
console.log(keymanager);
console.log('hello')
