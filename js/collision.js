/**
 * Created by Administrator on 2017/6/6.
 */
//判断大鱼和果实的距离
function momFruitCollision() {
    if(!data.gameOver) {
        for(var i = 0; i < fruit.num; i++) {
            if(fruit.alive[i]) {
                var len = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
                if(len < 900) {
                    //fruit eaten
                    fruit.dead(i);
                    data.fruitNum++;
                    mom.bigBodyCount++;
                    if(mom.bigBodyCount > 7) mom.bigBodyCount = 7;
                    if(fruit.fruitType[i] == "blue") {
                        data.double = 2;
                    }
                    wave.born(fruit.x[i], fruit.y[i]);
                }
            }
        }
    }
}

//大鱼喂小鱼
function momBabyCollision() {
    if(data.fruitNum > 0 && !data.gameOver) {
        var l = calLength2(mom.x, mom.y, baby.x, baby.y);
        if(l < 900) {
            //baby recover
            baby.babyBodyCount = 0;
            mom.bigBodyCount = 0;
            //score update
            data.addScore();

        }
    }
}