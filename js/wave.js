/**
 * Created by Administrator on 2017/6/7.
 */
var waveObj = function () {
    this.x = [];
    this.y = [];
    this.alive = []; //false的时候可以执行任务
    this.r = [];
    this.type = [];
}
waveObj.prototype.num = 10;
waveObj.prototype.init = function () {
    for(var i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.r[i] = 0;
        this.type[i] = "orange";
    }
}
waveObj.prototype.draw = function () {
    ctx1.save();
    ctx1.lineWidth = 2;
    ctx1.shadowBlur = 10;
    for (var i = 0; i < this.num; i++) {
        if (this.alive[i]) {
            //draw
            this.r[i] += deltaTime * 0.04;
            var bigget = this.type[i] == "orange" ? 100 : 50;
            if(this.r[i] > bigget) {
                this.alive[i] = false;
                break;
            }
            var alpha = 1 - this.r[i] / bigget;

            ctx1.beginPath();
            ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
            ctx1.closePath();
            if(this.type[i] == "orange") {
                ctx1.shadowColor = "orange";
                ctx1.strokeStyle = "rgba(203,91,0," + alpha + ")";
            } else {
                ctx1.shadowColor = "white";
                ctx1.strokeStyle = "rgba(255,255,255," + alpha + ")";
            }
            ctx1.stroke();
        }
    }
    ctx1.restore();
}

waveObj.prototype.born = function (x, y, color) {
    for(var i = 0; i < this.num; i++) {
        if(!this.alive[i]) {
            //born
            this.alive[i] = true;
            this.r[i] = 10;
            this.x[i] = x;
            this.y[i] = y;
            this.type[i] = color;
            console.log("born");
            return;
        }
    }

}