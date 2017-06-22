/**
 * Created by Administrator on 2017/6/5.
 */

var fruitObj = function () {
    this.alive = []; //果实是否可见，为true则绘制果实。
    this.x = []; //果实的坐标
    this.y = [];
    this.aneNo = []; // 果实对应的海葵
    this.l = []; //果实的尺寸l*l
    this.spd = []; //果实移动和生长的速度
    this.fruitType = []; //果实类型，blue、yellow
    this.orange = new Image();
    this.blue = new Image();
}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function () {
    for(var i = 0; i < 30; i++) {
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.aneNo[i] = 0;
        this.l[i] = 0;
        this.spd[i] = Math.random() * 0.017 + 0.003;
        this.fruitType[i] = "";
    }
    this.orange.src = "./img/fruit.png";
    this.blue.src = "./img/blue.png";
}

//绘制果实
fruitObj.prototype.draw = function () {
    for(var i = 0; i < this.num; i++) {
        //find an ane, grow, fly up
        if(this.alive[i]) {
            var pic;
            if(this.fruitType[i] == "blue") {
                pic = this.blue;
            }else {
                pic = this.orange;
            }

            if(this.l[i] <= 14) {
                this.x[i] = ane.headX[this.aneNo[i]];
                this.y[i] = ane.headY[this.aneNo[i]];
                this.l[i] += this.spd[i] * deltaTime;
            } else {
                this.y[i] -= this.spd[i] * 7 * deltaTime;
            }
            ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
            if(this.y[i] < 10) {
                this.alive[i] = false;
            }
        }

    }
}

//随机一个海葵用来生产果实
fruitObj.prototype.born = function (i) {
    this.aneNo[i] = Math.floor(Math.random() * ane.num);
    this.l[i] = 0;
    this.alive[i] = true;

    var ran = Math.random();
    if(ran < 0.1) {
        this.fruitType[i] = "blue";
    } else {
        this.fruitType[i] = "orange";
    }
     //orange / blue
}

//果实被吃掉
fruitObj.prototype.dead = function (i) {
    this.alive[i] = false;
}

//检测屏幕上的果实是否有15个
function fruitMonitor() {
    var num = 0;
    for(var i = 0; i < fruit.num; i++) {
        if(fruit.alive[i]) {
            num++;
        }
    }
    if(num < 15) {
        sendFruit();
    }
}
//如果不如15个，随即一个alive的果实出生
function sendFruit() {
    for(var i = 0; i < fruit.num; i++) {
        if(!fruit.alive[i]) {
            fruit.born(i);
            return;
        }
    }
}


