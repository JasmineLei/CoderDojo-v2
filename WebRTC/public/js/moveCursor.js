window.onload = function(){   
var target= document.getElementById("follower");
var handle= document.getElementById("myHandle");
makeMovable(target, handle);

function makeMovable (target, handle) {
  //target = $(target);

   cooX=document.getElementById("x");
   cooY=document.getElementById("y");
  handle.onmousedown = function(event) {
	var Xlen= target.style.left.length;
	var Ylen= target.style.top.length;
    var initialXOffset = target.offsetLeft - event.pageX;//target.offsetLeft - event.pageX;
    var initialYOffset = target.offsetTop - event.pageY;//target.offsetTop - event.pageY;

    document.onmousemove = function(event) {
	  
	  target.style.scrollX= event.pageX;
	  target.style.scrollY= event.pageY;
	  handle.style.left=event.pageX + "px";
	  handle.style.top=event.pageY + "px";
      target.style.left = target.style.scrollX + initialXOffset + "px";
      target.style.top = target.style.scrollY + initialYOffset + "px"; 
	  cooX.innerHTML = "X:"+ target.style.left;
	  cooY.innerHTML = "Y:"+ handle.style.top;
	  //var url='./moveCursor.js';
	  //$('#myContent').load(url + ' #dmyContent'); 
    }

    document.onmouseup = function() {
      document.onmousemove = null;
      document.onmouseup = null;
    }

    return false;
  }
}
}