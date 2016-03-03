function sendScreenshot(){
	    var canvas= document.getElementById("myCanvas");
	    if (!canvas){
		 console.log(' Canvas Null!');
	    }
		var image = canvas.toDataURL("img/png");
		 socket.emit('screenshot', {image: image, name: getParameterByName('user'),url:"/img/mentor.png"});
		
		var img = "<img style='width:25px;' src='/img/mentor.png'>";
		var snapshot= "<img style='width:30%;' class='fancybox' src='"+image+"'>";
		
		var input = "<p>"+img+""+snapshot +"</p>";
		$(chatWindow).append(input);
		$(message).val('');
		chatWindow.scrollTop = chatWindow.scrollHeight;
        add_ZoomIn();
        //$('#title').toggle();
        var canvasZone= document.getElementById("canvasZone");
		canvasZone.remove();

      }
