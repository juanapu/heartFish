/**
 * Created by lyn on 2017/6/5.
 */
//canvas
var can1, can2;
var ctx1, ctx2;
var canWidth, canHeight;

//时间间隔
var lastTime;
var deltaTime;

//背景图片
var bgPic = new Image();

//海葵
var ane;

//果实
var fruit;

//大鱼
var mom ;

//鼠标位置
var mx, my;

//小鱼
var baby;

function game() {
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameLoop();
}
function init() {

    //获取canvas
    can1 = document.getElementById("canvas1");//fishes, dust, UI, circle
    ctx1 = can1.getContext("2d");
    can2 = document.getElementById("canvas2"); //background, ane, fruits
    ctx2 = can2.getContext("2d");

    canWidth = parseInt(can1.width);
    canHeight = parseInt(can1.height);
    //背景图片
    bgPic.src = "./img/background.jpg"

    // 海葵
    ane = new aneObj();
    ane.init();

    //果实
    fruit = new fruitObj();
    fruit.init();

    //大鱼
    mom = new momObj();
    mom.init();

    //鼠标位置初始化为画布中间
    mx = canWidth * 0.5;
    my = canHeight * 0.5;
    //鼠标监听
    can1.addEventListener("mousemove", onMouseMove, false);

    //小鱼
    baby = new babyObj();
    baby.init();
}

function gameLoop() {
    requestAnimFrame(gameLoop);
    var now = Date.now();
    deltaTime = now - lastTime;
    if(deltaTime > 40) deltaTime = 40;
    lastTime = now;
    //绘制背景,如果只在初始化的时候绘制，那么果实运动的轨迹会在背景上保存
    ctx2.drawImage(bgPic, 0, 0, canWidth, canHeight);
    //绘制海葵
    ane.draw();
    //绘制果实
    fruitMonitor();
    fruit.draw();

    ctx1.clearRect(0,0,canWidth,canHeight);
    //绘制大鱼
    mom.draw();
    //大鱼吃果实
    momFruitCollision();

    //绘制小鱼
    baby.draw();
}

function onMouseMove(e) {
    if(e.offsetX || e.layerX) {
        mx = e.offsetX == undefined ? e.layerX : e.offsetX;
        my = e.offsetY == undefined ? e.layerY : e.offsetY;
    }
}

window.onload = game();