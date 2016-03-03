
//var target= document.getElementById("follower");
var handle= document.getElementById("handler");

var socket = io();

//console.log("handle: "+handle.id);

$('.handler').mousedown(function() {
      //console.log('mouse down');
      document.onmousemove = function(event) {
      var SharedScreenOffset= $('#ninjaScreen').offset();
      var MentorWidth = $('#ninjaScreen').width();
      var MentorHeight = $('#ninjaScreen').height();
	  
      var ArrowCorTocreenLeft = event.pageX-20-SharedScreenOffset.left;
      var ArrowCorTocreenTop = event.pageY-20-SharedScreenOffset.top
      
      var x=ArrowCorTocreenLeft+"px";
	  var y=ArrowCorTocreenTop+"px";
 	  $('.handler').css({
           "left":x,
           "top":y
       });
	  
      
      
      //console.log("x:"+ x +" y:"+ y);
	  socket.emit('RTPointing',{ MX: ArrowCorTocreenLeft,
                                 MY: ArrowCorTocreenTop,
                                 Mwidth: MentorWidth,
                                 Mheight: MentorHeight});      
    }
});
document.onmouseup = function() {
      document.onmousemove = function(event){};
      return;
    //}
}

socket.on('RTPointing', function(data) {
	var Mx = data.MX;
	var My = data.MY;
    var Mwidth = data.Mwidth;
    //var Mheight = data.Mheight;
    
    var NinjaScreen = $('#localScreen').offset();
    var Nwidth = $('#localScreen').width();
    var Nx = Mx * (Nwidth/Mwidth);
    var Ny = My * (Nwidth/Mwidth);
    var Nx_ab = Nx+NinjaScreen.left+"px";
    var Ny_ab = Ny+NinjaScreen.top+"px";
    $('.follower').css({
        "left":Nx_ab,
        "top":Ny_ab
    });
});

$('.icon-btn').click(function(){
    $('.point-icon').css("display","none");
    var choice = $(this).attr('value');
    $('#follower-'+choice).css("display","block");
    $('#handler-'+choice).css("display","block");
});