var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
var x = 10, y = 10, dx = 1, dy= 1, radius = 4;
var bar={
    width: 40, height: 4, x: 0, y: canvas.height - 4, speed: 2, movingLeft: false, movingRight: false
};
var brick={
    offsetX: 8,
    offsetY: 8,
    margin: 8,
    width: 50,
    height: 5,
    totalRow: 4,
    totalCol: 5
}
var brickList = []
for(var i = 0; i < brick.totalRow; i++){
    for(var j = 0; j < brick.totalCol; j++){
        brickList.push({
            x: brick.offsetX + j *(brick.width + brick.margin),
            y: brick.offsetY + i *(brick.height + brick.margin),
            isBroken: false
        })
    }
}
function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    moveBall();
    drawBar();
    moveBar();
    collideBar();
    drawBricks()
    collideBrick();


    requestAnimationFrame(draw);
}
draw();
//vẽ bóng
function drawBall(){
    context.beginPath();
    context.arc(x,y, radius, 0, Math.PI *2);
    context.fillStyle = 'red';
    context.fill();
    context.closePath();
}
// chuyển động quả bóng
function moveBall(){
    if(x< radius || x > canvas.width -10){
        dx = -dx;
    }
    if(y< radius){
        dy = -dy;
    }
    x += dx;
    y += dy;
}
// vẽ thanh đỡ
function drawBar(){
    context.beginPath();
    context.rect(bar.x, bar.y, bar.width, bar.height);
    context.fill();
    context.closePath();
}
//xử lý thanh đỡ khi duy chuyển
// bắt sự kiện khi nhấn nút duy chuyển qua trái, quay phải
// key code
// left arrow 37
// up arrow	38
// right arrow 39
// down arrow 40
document.addEventListener("keyup", function (evt){
    console.log('KEY UP');
    console.log(evt);
    if(evt.keyCode === 37){
        bar.movingLeft = false;
    }else if(evt.keyCode === 39){
        bar.movingRight = false;
    }
});
document.addEventListener("keydown", function (evt){
    console.log('KEY DOWN');
    console.log(evt);
    if(evt.keyCode === 37){
        bar.movingLeft = true;
    }else if(evt.keyCode === 39){
        bar.movingRight = true;
    }
});
//duy chuyển thanh đỡ qua trái và phải
function moveBar(){
    if(bar.movingLeft){
        bar.x -= bar.speed;
    }
    else if(bar.movingRight){
        bar.x += bar.speed;
    }
    //cố định thanh đỡ trong board game
    if(bar.x < 0) bar.x = 0;
    else if (bar.x > canvas.width - bar.width) bar.x = canvas.width - bar.width;
}
//bar chạm vào thanh đỡ
function collideBar(){
    if(x + radius >= bar.x && x + radius <= bar.x + bar.width
        && y + radius >= canvas.height - bar.height ){
        dy = -dy;
    }
}
//vẽ cách viên gạch với row = 4; col = 5
function drawBricks(){
    brickList.forEach(function (b){
        if(!b.isBroken){
            context.beginPath()
            context.rect(b.x, b.y, brick.width, brick.height)
            context.fill()
            context.closePath()
        }
    })
}
//xử lý va chạm của bóng và các viên gạch
function collideBrick(){
    brickList.forEach(function (b){
        if(!b.isBroken){
            if(x >= b.x && x <= b.x + brick.width
                && y + radius >= b.y
                && y - radius <= b.y + brick.height){
                dy = -dy;
                b.isBroken = true;
            }
        }
    })
}




