/**
 * Created by Administrator on 2017/6/6.
 */
var babyObj = function () {
    this.x;
    this.y;
    this.angle;
    this.babyEye = new Image();
    this.babyBody = new Image();
    this.babyTail = [];

    this.babyTailTimer;
    this.babyTailCount;
}
babyObj.prototype.init = function () {
    this.x = canWidth * 0.5 - 50;
    this.y = canHeight * 0.5 + 50;
    this.angle = 0;
    this.babyTailTimer = 0;
    this.babyTailCount = 0;
    this.babyEye.src = "./img/babyEye0.png";
    this.babyBody.src = "./img/babyFade0.png";
    //小鱼尾巴
    for(var i = 0; i < 8; i++) {
        this.babyTail[i] = new Image();
        this.babyTail[i].src = "./img/babyTail" + i + ".png";
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

    //babyTile
    this.babyTailTimer += deltaTime;
    if(this.babyTailTimer > 50) {
        this.babyTailCount = (this.babyTailCount + 1) % 8;
        this.babyTailTimer %= 50;
    }

    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);

    var babyTileCount = this.babyTailCount;
    ctx1.drawImage(this.babyTail[babyTileCount], -this.babyTail[babyTileCount].width * 0.5 + 25, -this.babyTail[babyTileCount].height * 0.5);
    ctx1.drawImage(this.babyBody, -this.babyBody.width * 0.5, -this.babyBody.height * 0.5);
    ctx1.drawImage(this.babyEye, -this.babyEye.width * 0.5, -this.babyEye.height * 0.5);
    ctx1.restore();
}