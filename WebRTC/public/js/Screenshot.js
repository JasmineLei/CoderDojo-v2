
    
function addEditZone(){
        var editZone = document.getElementById('editScreenshot');
        if (editZone==null){
           editZone = document.createElement('div'); 
           editZone.id="editScreenshot"; 
           console.log("Add editzone completed");
        }   
        $('#screenBox').append(editZone);
        
    }
    
   
function PIXEL_RATIO() {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;
    console.log("ratio:"+ dpr / bsr);
    return dpr / bsr;
}

var ratio;
function createHiDPICanvas(can, w, h) {
    ratio = PIXEL_RATIO(); 
    can.width = w * ratio;
    can.height = h * ratio;
    can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
}


        
var screenshot=function(){

        var video = document.getElementById("ninjaScreen");
        
        var canvas = document.createElement('canvas');
        var w=jQuery(window).width()*0.37;
        var h=w*(video.videoHeight/video.videoWidth);
        createHiDPICanvas(canvas, w, h);
        canvas.id="myCanvas";
        //Create canvas with the device resolution.
        
        var ctx = canvas.getContext("2d");
        ctx.mozImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        
        
        
        ctx.drawImage(video ,0,0,video.videoWidth,video.videoHeight,0,0,canvas.width/2,canvas.height/2);
        createEditZone(canvas,ctx,video);
        console.log(' video width: '+ video.videoWidth+" height: "+ video.videoHeight);	
		console.log('done');
      }

function createEditZone(canvas,ctx,video){
    
    var canvasZone = document.createElement('div');
    canvasZone.id="canvasZone";
    
    var clear_btn = document.createElement('input');
        clear_btn.type = "button";
        clear_btn.id = 'clearCanvas';
        clear_btn.className = "canvas_btn";
        clear_btn.value='Clear';
        clear_btn.onclick=function(){clearArea(ctx)};
        
    var close_btn = document.createElement('input');
        close_btn.type = "button";
        close_btn.className = "canvas_btn";
        close_btn.id = 'closeCanvas';
        close_btn.value='Close';
        close_btn.onclick=function(){canvasZone.remove();};
    

    
    var send_btn = document.createElement('input');
        send_btn.type = "button";
        send_btn.id = 'sendscreenShot';
        send_btn.className = "canvas_btn";
        send_btn.value='Send screenshot';
        send_btn.onclick=function(){sendScreenshot()};
        
   
    $('#editScreenshot').append(canvasZone);
    $('#canvasZone').append(clear_btn);
    $('#canvasZone').append(close_btn);
    $('#canvasZone').append(send_btn);    
    $('#canvasZone').append(canvas);  
    
    InitThis(ratio,canvas,video);
}	  

exports.screenshot = screenshot();
exports.test = "succeed!!";