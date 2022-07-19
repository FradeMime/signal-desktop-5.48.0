// var fs = require('fs');
// // const mpinapp = require('./mpinapp');
// eval(fs.readFileSync('./mpinapp.js')+'');
// var tes = new mpinapp();
// tes.generateMasterKey();




// ts_test.js raw
// var hello = require('./hello');
// var he = new hello();
// he.generateMasterKey();
// he.createClientID('testUser@miracl.com');
// he.generateServerSecretKey();
// he.generateClientSecretKey();


var MPINAPP = require('../mpinapp')
var test = new MPINAPP();
test.generateMasterKey();
// he.createClientID('testUser@miracl.com');
// he.generateServerSecretKey();
// he.generateClientSecretKey();
