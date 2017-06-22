/**
 * Created by Administrator on 2017/6/7.
 */
var dataObj = function () {
    this.fruitNum = 0;
    this.double = 1;
    this.score = 0;
    this.gameOver = false;
    this.alpha = 0;
}
dataObj.prototype.reset = function () {
    this.fruitNum = 0;
    this.double = 1;
    this.score = 0;
}
dataObj.prototype.draw = function () {
    var w = can1.width;
    var h = can1.height;
    ctx1.save();
    ctx1.shadowBlur = 10;
    ctx1.shadowColor = "white";
    ctx1.fillStyle = "white";
    ctx1.font = "24px Verdana";
    ctx1.textAlign = "center";
    // ctx1.fillText("fruitNum:" + this.fruitNum, w * 0.5, h - 50);
    // ctx1.fillText("fruitType:" + this.double, w*0.5, h - 80);
    ctx1.fillText("SCORE:" + this.score, w*0.5, h - 30);


    if(this.gameOver) {
        this.alpha += deltaTime * 0.0005;
        if(this.alpha > 1) {
            this.alpha = 1;
        }
        ctx1.fillStyle = "rgba(255,255,255," + this.alpha +")";
        ctx1.fillText("GAMEOVER!", w*0.5, h * 0.5);
        again.style.display = "block";
        again.style.backgroundColor = "rgba(255,0,0," + this.alpha +")";
        again.style.color = "rgba(0,0,0," + this.alpha +")";
    } else {
        again.style.display = "none";
    }

    ctx1.restore();
}

dataObj.prototype.addScore = function () {
    this.score += this.fruitNum * this.double;
    this.fruitNum = 0;
    this.double = 1;

}
