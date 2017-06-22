/**
 * Created by lyn on 2017/6/5.
 */
//canvas
var can1, can2;
var ctx1, ctx2;
var canWidth, canHeight;

//再来一局
var again;

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

//分值
var data;

//wave
var wave;

//dust
var dust;
var dustPic = [];

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

    //再来一局
    again = document.getElementById("again");
    again.addEventListener("click", onClick, false);

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

    //分值计算
    data = new dataObj();

    //wave
    wave = new waveObj();
    wave.init();

    //dust
    for(var i = 0; i < 7; i++) {
        dustPic[i] = new Image();
        dustPic[i].src = "./img/dust" + i + ".png";
    }
    dust = new dustObj();
    dust.init();
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
    //大鱼喂小鱼
    momBabyCollision();

    //绘制分值
    data.draw();

    //绘制wave
    wave.draw();

    //绘制dust
    dust.draw();

}

function onMouseMove(e) {
    if(!data.gameOver) {
        if(e.offsetX || e.layerX) {
            mx = e.offsetX == undefined ? e.layerX : e.offsetX;
            my = e.offsetY == undefined ? e.layerY : e.offsetY;
        }
    }
}

//再来一局
function onClick() {
    data.gameOver = false;
    baby.babyBodyCount = 0;
    mom.bigBodyCount = 0;
    mom.x = canWidth * 0.5;
    mom.y = canHeight * 0.5;
    baby.x = canWidth * 0.5 - 50;
    baby.y = canHeight * 0.5 + 50;
    data.reset();
}

window.onload = game();