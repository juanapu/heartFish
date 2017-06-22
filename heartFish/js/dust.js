/**
 * Created by Administrator on 2017/6/8.
 */
var dustObj = function () {
    this.x = [];
    this.y = [];
    this.amp = []; //振幅
    this.NO = [];

    this.alpha;
}
dustObj.prototype.num = 30;
dustObj.prototype.init = function () {
    for(var i = 0; i < this.num; i++) {
        this.x[i] = Math.random() * canWidth;
        this.y[i] = Math.random() * canHeight;
        this.amp[i] = Math.random() * 15 + 50;
        this.NO[i] = Math.floor(Math.random() * 7);
    }
    this.alpha = 0;
}

dustObj.prototype.draw = function () {
    this.alpha += deltaTime * 0.0008;
    var l = Math.sin(this.alpha);
    for(var i = 0; i < this.num; i++) {
        var no = this.NO[i];
        ctx1.drawImage(dustPic[no], this.x[i] + this.amp[i] * l, this.y[i])
    }
}