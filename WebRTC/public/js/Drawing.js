var mousePressed = false;
var lastX, lastY;
var ctx;
var CurrentVideo;
var CurrentCanvas;
var ctx;
function InitThis(ratio,canvas,video) {
    //ctx = document.getElementById('myCanvas').getContext("2d");
    ctx=canvas.getContext("2d");
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    CurrentVideo=video;
    CurrentCanvas=canvas;
    

    $(myCanvas).mousedown(function (e) {
        mousePressed = true;
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    });

    $(myCanvas).mousemove(function (e) {
        if (mousePressed) {
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    $(myCanvas).mouseup(function (e) {
        mousePressed = false;
    });
	    $(myCanvas).mouseleave(function (e) {
        mousePressed = false;
    });
}

function Draw(x1, y1, isDown) {
    var x;
    var y;
    if (isDown) {
        x=x1/2;
        y=y1/2;
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x; lastY = y;
}
	
function clearArea(ctx) {
    // Use the identity matrix while clearing the canvas
    //ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(CurrentVideo ,0,0,CurrentVideo.videoWidth,CurrentVideo.videoHeight,0,0,CurrentCanvas.width/2,CurrentCanvas.height/2);
}