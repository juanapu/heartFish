/**
 * Created by Administrator on 2017/6/5.
 */
var momObj = function() {
    this.x; //坐标
    this.y;
    this.angle; //角度
    this.bigEye = [];
    // this.bigBody = new Image();
    this.bigTail = [];
    this.bigBodyOrange = [];
    this.bigBodyBlue = [];

    this.bigTailTimer = 0;
    this.bigTailCount = 0;

    this.bigEyeTimer = 0;
    this.bigEyeCount = 0;
    this.bigEyeInterval = 1000;

    this.bigBodyCount = 0;
}
momObj.prototype.init = function () {
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    this.angle = 0;
    // this.bigEye.src = "./img/bigEye0.png";
    // this.bigBody.src = "./img/bigSwim0.png";
    // this.bigTail.src = "./img/bigTail0.png";
    //大鱼尾巴
    for (var i = 0; i < 8; i++) {
        this.bigTail[i] = new Image();
        this.bigTail[i].src = "./img/bigTail" + i + ".png";
    }
    //大鱼眼睛
    for (var i = 0; i < 2; i++) {
        this.bigEye[i] = new Image();
        this.bigEye[i].src = "./img/bigEye" + i + ".png";
    }

    //大鱼身体
    for (var i = 0; i < 8; i++) {
        this.bigBodyOrange[i] = new Image();
        this.bigBodyOrange[i].src = "./img/bigSwim" + i + ".png";
    }
    for (var i = 0; i < 8; i++) {
        this.bigBodyBlue[i] = new Image();
        this.bigBodyBlue[i].src = "./img/bigSwimBlue" + i + ".png";
    }
}
// momObj.prototype.reset() {
//     this.x = canWidth * 0.5;
//     this.y = canHeight * 0.5;
//     this.angle = 0;
// }

momObj.prototype.draw = function () {
    //lerp x, y
    this.x = lerpDistance(mx, this.x, 0.96);
    this.y = lerpDistance(my, this.y, 0.96);

    //delta angle
    //Math.atan2(y,x)
    var deltaY = my - this.y;
    var deltaX = mx - this.x;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;
    //lerp angle
    this.angle = lerpAngle(beta, this.angle, 0.6);

    //babyTail
    this.bigTailTimer += deltaTime;
    if(this.bigTailTimer > 50) {
        this.bigTailCount = (this.bigTailCount + 1) % 8;
        this.bigTailTimer %= 50;
    }
    //babyEye
    this.bigEyeTimer += deltaTime;
    if(this.bigEyeTimer > this.bigEyeInterval) {
        this.bigEyeCount = (this.bigEyeCount + 1) % 2;
        this.bigEyeTimer %= this.bigEyeInterval;
        if(this.bigEyeCount == 0) {
            this.bigEyeInterval = Math.random() * 1500 + 2000; //[0, 1)
        } else {
            this.bigEyeInterval = 200;
        }
    }
    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);
    var bigTailCount = this.bigTailCount;
    var bigEyeCount = this.bigEyeCount;
    var bigBodyCount = this.bigBodyCount;
    ctx1.drawImage(this.bigTail[bigTailCount], -this.bigTail[bigTailCount].width * 0.5 + 30, -this.bigTail[bigTailCount].height * 0.5);
    if(data.double == 1) {
        ctx1.drawImage(this.bigBodyOrange[bigBodyCount], -this.bigBodyOrange[bigBodyCount].width * 0.5, -this.bigBodyOrange[bigBodyCount].height * 0.5);
    } else {
        ctx1.drawImage(this.bigBodyBlue[bigBodyCount], -this.bigBodyBlue[bigBodyCount].width * 0.5, -this.bigBodyBlue[bigBodyCount].height * 0.5);
    }
    // ctx1.drawImage(this.bigBody, -this.bigBody.width * 0.5, -this.bigBody.height * 0.5);
    ctx1.drawImage(this.bigEye[bigEyeCount], -this.bigEye[bigEyeCount].width * 0.5, -this.bigEye[bigEyeCount].height * 0.5);
    ctx1.restore();
}