/// <reference path = "ts_test.ts" />   
/// <reference path = "tst1.ts" />
/// <reference path = "tst2.ts" />

function isDrr(shape: Drawing.IShape){
    shape.draw();
}
isDrr(new Drawing.Cricle());
isDrr(new Drawing.Triangle());