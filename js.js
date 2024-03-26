var canvas = document.getElementById("canvas")
var context = canvas.getContext('2d')
var x = 10, y = 10, dx = 3, dy= 2, radius = 4;

function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    // vẽ bóng
    drawBall();
    moveBall();

    requestAnimationFrame(draw)
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
    y += dy

}