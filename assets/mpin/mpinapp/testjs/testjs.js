var DBIG = function(x) {
    this.num = x;
};

DBIG.prototype = {
    zero: function(){
        this.num = 0;
    },
    set: function(x){
        this.num = x;
    },
    get: function(){
        return this.num;
    }
}
