// var assert = require('assert');
var fs = require('fs');
eval(fs.readFileSync('../js/DBIG.js') + '');
eval(fs.readFileSync('../js/BIG.js') + '');
eval(fs.readFileSync('../js/ROM.js') + '');
eval(fs.readFileSync('../js/HASH.js') + '');
eval(fs.readFileSync('../js/RAND.js') + '');
eval(fs.readFileSync('../js/FP.js') + '');
eval(fs.readFileSync('../js/FP2.js') + '');
eval(fs.readFileSync('../js/ECP.js') + '');
eval(fs.readFileSync('../js/ECP2.js') + '');
eval(fs.readFileSync('../js/PAIR.js') + '');
eval(fs.readFileSync('../js/MPIN.js') + '');
var MPINAPP = function(){
    // this.CLIENT_ID = '';
    this.CLIENT_ID = [];
    this.HCID=[];
    this.G1 = [];
    this.G2 = [];
    this.PERMIT = [];

    this.S= [];
    this.SST=[];
    this.TOKEN=[];
    this.PIN = 0;
    this.DATE = 0;

    // R & W used session secret key
    this.R = [];
    this.W = [];

    this.nIter = 100;
    
    this.PINERROR = true;
    this.PERMITS = true;
    this.FULL = false;
    this.TIME_FUNCTIONS = false;
};
MPINAPP.prototype = {
    // Trust Root Master key
    // DTA生成并保存主密钥S
    generateMasterKey: function(){
        var rng = new RAND();
        rng.clean();

        var RAW= [];
        for(var i = 0; i< 100; i++) RAW[i] = i + 1;
        rng.seed(100, RAW);
        MPIN.RANDOM_GENERATE(rng, this.S);
        console.log(`Master Secret Key:${MPIN.bytestostring(this.S)}`);
    },
    // Hash(client_id)
    // Client自行生成
    createClientID: function(clientId){
        console.log(`raw client id:${clientId}`);
        this.CLIENT_ID = MPIN.stringtobytes(clientId);
        this.HCID = MPIN.HASH_ID(this.CLIENT_ID);
        console.log(`CLIENT_ID:${MPIN.bytestostring(this.CLIENT_ID)}`);
    },
    // generate server secret key from master key
    // s·Q
    // 由DAT运算分发
    generateServerSecretKey(){
        MPIN.GET_SERVER_SECRET(this.S, this.SST);
        console.log(`server secret key:${MPIN.bytestostring(this.SST)}`);
    },
    // generate client secret key from master key
    // s·HCID = s·H(client_id)
    // 由DTA运算分发
    generateClientSecretKey: function(){
        MPIN.GET_CLIENT_SECRET(this.S, this.HCID, this.TOKEN);
        console.log(`client secret key:${MPIN.bytestostring(this.TOKEN)}`);
    },
    // 客户端根据PIN和TOKEN，导出新的TOKEN
    generateTokenAndPin(pin){
        console.log(`raw pin:${pin}`);
        var rtn = MPIN.EXTRACT_PIN(this.CLIENT_ID, pin, this.TOKEN);
        if(rtn != 0)
            console.log('Failed to extract PIN');
        console.log(`Client TokenTK:${MPIN.bytestostring(this.TOKEN)}`);
        
        if(this.FULL)
            MPIN.PRECOMPUTE(this.TOKEN, this.HCID, this.G1, this.G2);
        
        // var date;
        if(this.PERMITS)
        {
            // 这个应该在DTA/Server端，代码不放这
            this.DATE = MPIN.today();
            // Client从DTA中获取time token
            MPIN.GET_CLIENT_PERMIT(this.DATE, this.S, this.HCID, this.PERMIT);
            console.log(`Time Permit TP:${MPIN.bytestostring(this.PERMIT)}`);
            
            // this encoding makes time permit look random - Elligator squared
            MPIN.ENCODING(this.rng, this.PERMIT);
            console.log(`Encoded Time Permit TP:${MPIN.bytestostring(this.PERMIT)}`);
            MPIN.DECODING(this.PERMIT);
            console.log(`Decoded Time Permit TP:${MPIN.bytestostring(this.PERMIT)}`);
        }
        else
            this.DATE = 0;
        this.PIN = pin;
    },
    verifyMPINAccount(){
        
    },
    // 生成协商秘钥
    generateSessionSecretKey(){
        if(this.FULL){
            if(this.TIME_FUNCTIONS){
                var start = new Date().getTime();
                for(i = 0 ; i < this.nIter; i++){
                    MPIN.CLIENT_KEY(this.G1, this.G2, this.PIN, )
                }
            }
        }
    }
}

module.exports = MPINAPP