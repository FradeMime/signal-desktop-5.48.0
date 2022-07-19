// var assert = require('assert');
var fs = require('fs');
eval(fs.readFileSync('/home/leiqiu/Desktop/Signal-Desktop/assets/mpin/js/DBIG.js') + '');
eval(fs.readFileSync('/home/leiqiu/Desktop/Signal-Desktop/assets/mpin/js/BIG.js') + '');
eval(fs.readFileSync('/home/leiqiu/Desktop/Signal-Desktop/assets/mpin/js/ROM.js') + '');
eval(fs.readFileSync('/home/leiqiu/Desktop/Signal-Desktop/assets/mpin/js/HASH.js') + '');
eval(fs.readFileSync('/home/leiqiu/Desktop/Signal-Desktop/assets/mpin/js/RAND.js') + '');
eval(fs.readFileSync('/home/leiqiu/Desktop/Signal-Desktop/assets/mpin/js/FP.js') + '');
eval(fs.readFileSync('/home/leiqiu/Desktop/Signal-Desktop/assets/mpin/js/FP2.js') + '');
eval(fs.readFileSync('/home/leiqiu/Desktop/Signal-Desktop/assets/mpin/js/ECP.js') + '');
eval(fs.readFileSync('/home/leiqiu/Desktop/Signal-Desktop/assets/mpin/js/ECP2.js') + '');
eval(fs.readFileSync('/home/leiqiu/Desktop/Signal-Desktop/assets/mpin/js/PAIR.js') + '');
eval(fs.readFileSync('/home/leiqiu/Desktop/Signal-Desktop/assets/mpin/js/MPIN.js') + '');

// const DBIG = require('../js/DBIG')
// const BIG = require('../js/BIG')
// const FP = require('../js/FP')
// const ROM = require('../js/ROM')
// const HASH = require('../js/HASH')
// const RAND = require('../js/RAND')
// const AES = require('../js/AES')
// const GCM = require('../js/GCM')
// const ECP = require('../js/ECP')
// const FP2 = require('../js/FP2')
// const ECP2 = require('../js/ECP2')
// const FP4 = require('../js/FP4')
// const FP12 = require('../js/FP12')
// const PAIR = require('../js/PAIR')
// const MPIN = require('../js/MPIN')

// var MPINAPP = function(){
//     this.CLIENT_ID = [];
//     this.HCID=[];
//     this.G1 = [];
//     this.G2 = [];
//     this.PERMIT = [];

//     this.S= [];
//     this.SST=[];
//     this.TOKEN=[];
//     this.PIN = 0;
//     this.DATE = 0;

//     // R & W used session secret key
//     this.R = [];
//     this.W = [];

//     this.nIter = 100;
    
//     this.PINERROR = true;
//     this.PERMITS = true;
//     this.FULL = false;
//     this.TIME_FUNCTIONS = false;
// }
// MPINAPP.prototype = {
//     generateMasterKey(){
//         var rng = new RAND();
//         rng.clean();
    
//         var RAW= [];
//         for(var i = 0; i< 100; i++) RAW[i] = i + 1;
//         rng.seed(100, RAW);
//         MPIN.RANDOM_GENERATE(rng, this.S);
//         console.log(`Master Secret Key:${MPIN.bytestostring(this.S)}`);
//         return this.S;
//     }
// }


class MPINAPP{
    constructor() {
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
    }

    generateMasterKey (){
        // const RAND = require('../js/RAND')
        var rng = new RAND();
        rng.clean();

        var RAW= [];
        for(var i = 0; i< 100; i++) RAW[i] = i + 1;
        rng.seed(100, RAW);
        MPIN.RANDOM_GENERATE(rng, this.S);
        console.log(`Master Secret Key:${MPIN.bytestostring(this.S)}`);
        return this.S;
    }

    static createClientID (clientId){
        console.log(`raw client id:${clientId}`);
        this.CLIENT_ID = MPIN.stringtobytes(clientId);
        this.HCID = MPIN.HASH_ID(this.CLIENT_ID);
        console.log(`CLIENT_ID:${MPIN.bytestostring(this.CLIENT_ID)}`);
    }

    static generateServerSecretKey(){
        MPIN.GET_SERVER_SECRET(this.S, this.SST);
        console.log(`server secret key:${MPIN.bytestostring(this.SST)}`);
    }
    static generateClientSecretKey(){
        MPIN.GET_CLIENT_SECRET(this.S, this.HCID, this.TOKEN);
        console.log(`client secret key:${MPIN.bytestostring(this.TOKEN)}`);
    }

    static generateTokenAndPin(pin){
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
    }


    static verifyMPINAccount(){
        
    }
    // 生成协商秘钥
    static generateSessionSecretKey(){
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
module.exports = MPINAPP;