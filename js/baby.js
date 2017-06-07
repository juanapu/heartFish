/**
 * Created by Administrator on 2017/6/6.
 */
var babyObj = function () {
    this.x;
    this.y;
    this.angle;
    this.babyEye = [];
    this.babyBody = [];
    this.babyTail = [];

    this.babyTailTimer = 0;
    this.babyTailCount = 0;

    this.babyEyeTimer = 0;
    this.babyEyeCount = 0;
    this.babyEyeInterval = 1000;

    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;
}
babyObj.prototype.init = function () {
    this.x = canWidth * 0.5 - 50;
    this.y = canHeight * 0.5 + 50;
    this.angle = 0;

    //小鱼尾巴
    for(var i = 0; i < 8; i++) {
        this.babyTail[i] = new Image();
        this.babyTail[i].src = "./img/babyTail" + i + ".png";
    }
    //小鱼眼睛
    for(var i = 0; i < 2; i++) {
        this.babyEye[i] = new Image();
        this.babyEye[i].src = "./img/babyEye" + i + ".png";
    }
    //小鱼身体颜色变化
    for(var i = 0; i < 20; i++) {
        this.babyBody[i] = new Image();
        this.babyBody[i].src = "./img/babyFade" + i + ".png";
    }
    // this.babyTail.src = "./img/babyTail0.png";
}
babyObj.prototype.draw = function () {
    this.x = lerpDistance(mom.x, this.x, 0.96);
    this.y = lerpDistance(mom.y, this.y, 0.96);
    //Math.atan2(y,x)
    var deltaY = mom.y - this.y;
    var deltaX = mom.x - this.x;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;
    //lerp angle
    this.angle = lerpAngle(beta, this.angle, 0.6);

    //babyTail
    this.babyTailTimer += deltaTime;
    if(this.babyTailTimer > 50) {
        this.babyTailCount = (this.babyTailCount + 1) % 8;
        this.babyTailTimer %= 50;
    }

    //babyEye
    this.babyEyeTimer += deltaTime;
    if(this.babyEyeTimer > this.babyEyeInterval) {
        this.babyEyeCount = (this.babyEyeCount + 1) % 2;
        this.babyEyeTimer %= this.babyEyeInterval;
        if(this.babyEyeCount == 0) {
            this.babyEyeInterval = Math.random() * 1500 + 2000; //[0, 1)
        } else {
            this.babyEyeInterval = 200;
        }
    }

    //babyBody
    this.babyBodyTimer += deltaTime;
    if(this.babyBodyTimer > 300) {
        this.babyBodyCount = this.babyBodyCount + 1;
        this.babyBodyTimer %= 300;
        if(this.babyBodyCount > 19) {
            this.babyBodyCount = 19;
            //gameOver
            data.gameOver = true;
        }
    }

    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);

    var babyTileCount = this.babyTailCount;
    var babyEyeCount = this.babyEyeCount;
    var babyBodyCount = this.babyBodyCount;
    ctx1.drawImage(this.babyTail[babyTileCount], -this.babyTail[babyTileCount].width * 0.5 + 25, -this.babyTail[babyTileCount].height * 0.5);
    ctx1.drawImage(this.babyBody[babyBodyCount], -this.babyBody[babyBodyCount].width * 0.5, -this.babyBody[babyBodyCount].height * 0.5);
    ctx1.drawImage(this.babyEye[babyEyeCount], -this.babyEye[babyEyeCount].width * 0.5, -this.babyEye[babyEyeCount].height * 0.5);
    ctx1.restore();
}