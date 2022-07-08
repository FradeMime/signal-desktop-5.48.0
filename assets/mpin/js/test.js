const DBIG = require('./DBIG')
const BIG = require('./BIG')
const FP = require('./FP')
const ROM = require('./ROM')
const HASH = require('./HASH')
const RAND = require('./RAND')
const AES = require('./AES')
const GCM = require('./GCM')
const ECP = require('./ECP')
const FP2 = require('./FP2')
const ECP2 = require('./ECP2')
const FP4 = require('./FP4')
const FP12 = require('./FP12')
const PAIR = require('./PAIR')
const MPIN = require('./MPIN')

var i;
var EFS=MPIN.EFS;
var rng = new RAND()
rng.clean();
var RAW=[];
for (i=0;i<100;i++) RAW[i]=i+1;
rng.seed(100,RAW);
var S=[];
var HCID=[];
/* Trusted Authority set-up */
MPIN.RANDOM_GENERATE(rng,S);
/* Create Client Identity */
var IDstr = "testUser@miracl.com";
var CLIENT_ID = MPIN.stringtobytes(IDstr);  
HCID=MPIN.HASH_ID(CLIENT_ID);  /* Either Client or TA calculates Hash(ID) - you decide! */
console.log(`Client ID=${MPIN.bytestostring(CLIENT_ID)}`);