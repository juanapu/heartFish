/**
 * Created by Administrator on 2017/6/5.
 */
var aneObj = function () {
    //start point, end point, control point
    this.rootX = [];
    this.headX = [];
    this.headY = [];
    this.alpha ;
    this.amp = [];
}
aneObj.prototype.num = 50;
aneObj.prototype.init = function () {
    this.alpha = 0;
    for(var i = 0; i < this.num; i++) {
        this.rootX[i] = i * 16 + Math.random() * 20; //(0, 1]
        this.headX[i] = this.rootX[i];
        this.headY[i] = canHeight - 200 + Math.random() * 50;
        this.amp[i] = Math.random() * 50 + 50;
    }
}
aneObj.prototype.draw = function () {
    this.alpha += deltaTime * 0.0008;
    var l = Math.sin(this.alpha);
    ctx2.save();
    ctx2.globalAlpha = 0.6;
    ctx2.lineWidth = 15;
    ctx2.lineCap = "round";
    ctx2.strokeStyle = "#3b154e";
    for(var i = 0; i < this.num; i++) {
        //beginPath, moveTo, lineTo, stroke, strokeStyle, lineWidth, lineCap, globleAlpha
        ctx2.beginPath();
        ctx2.moveTo(this.rootX[i], canHeight);
        this.headX[i] = this.rootX[i] + l * this.amp[i]
        ctx2.quadraticCurveTo(this.rootX[i], canHeight - 100,this.headX[i] , this.headY[i]);
        // ctx2.lineTo(this.x[i], canHeight - this.len[i]);
        ctx2.stroke();
    }
    ctx2.restore();
}