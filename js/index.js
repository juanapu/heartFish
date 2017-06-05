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

}

function gameLoop() {
    requestAnimFrame(gameLoop);
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    //绘制背景,如果只在初始化的时候绘制，那么果实运动的轨迹会在背景上保存
    ctx2.drawImage(bgPic, 0, 0, canWidth, canHeight);
    //绘制海葵
    ane.draw();
    //绘制果实
    fruitMonitor();
    fruit.draw();

}



window.onload = game();