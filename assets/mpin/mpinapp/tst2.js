/// <reference path = "ts_test.ts" />
var Drawing;
(function (Drawing) {
    var Cricle = /** @class */ (function () {
        function Cricle() {
        }
        Cricle.prototype.draw = function () {
            console.log('this is cricle');
        };
        return Cricle;
    }());
    Drawing.Cricle = Cricle;
})(Drawing || (Drawing = {}));
