//var room = 'default';
var room = 'waiting';
var lastPeer;

function setRoom(newRoom) {
	room = newRoom;
}

function showVolume(el, volume) {
		if (!el) return;
		if (volume < -45) volume = -45; // -45 to -20 is
		if (volume > -20) volume = -20; // a good range
		el.value = volume;
}

function webrtcInit(peerConnectionConfig, opts, video) {
	// Create the SimpleWebRTC object
	if (video) {
		var mediaOptions = {
			audio: true,
			video: true
		};
		var localVideoOptions = {
			muted: true,
			mirror: true,
			autoplay: true
		}
	} else {
		var mediaOptions = {
			audio: true,
			video: true  
		};
		var localVideoOptions = {
			muted: false,
			mirror: true,
			autoplay: true
		}
	}
	var webrtc = new SimpleWebRTC({
		// Holder for the local webcam
		localVideoEl: opts.localCamBox,
		remoteVideosEl: '',
		autoRequestMedia: false,
		debug: false,
		detectSpeakingEvents: true,
		autoAdjustMic: false,
		localVideo: localVideoOptions,
		media: mediaOptions,
		// Add the new peerConnectionConfig object
		peerConnectionConfig: peerConnectionConfig
	});
	
	webrtc.on('readyToCall', function() {
		if (room != 'waiting') {
			console.log('Ready to call');
			console.log('connecting to room: ' + room);
			webrtc.joinRoom(room);
		}
	});
	
	webrtc.on('videoAdded', function (video, peer) {
		var inType = peer.type;
		var container;
		if (inType == 'video') {
			container = opts.remoteCamBox;
		} else {
			container = opts.screenBox;
		}
		if (container) {
            
            if (inType != 'video') {
                var newContainer = document.getElementById('container_' + webrtc.getDomId(peer));
                if (newContainer == null){
			        newContainer = document.createElement('div');
			        newContainer.id = 'container_' + webrtc.getDomId(peer);
			//$(newContainer).addClass("video-box embed-responsive embed-responsive-4by3");
			        $(newContainer).addClass("video-box");
			        $(video).addClass("embed-responsive-item");
                    lastPeer=webrtc.getDomId(peer);
                    newContainer.appendChild(video);
                    }
			        container.appendChild(newContainer);      
            
                    console.log('Add video');
                    video.id="ninjaScreen";
                    addEditZone();
                    showMentorFeedbackZone()
            }
            else{
                var newContainer_remote = document.createElement('div');
			    newContainer_remote.id = 'container_remote_' + webrtc.getDomId(peer);
			    $(newContainer_remote).addClass("embed-responsive embed-responsive-4by3");
			    $(video).addClass("embed-responsive-item");
			    newContainer_remote.appendChild(video);
			    container.appendChild(newContainer_remote);
                if ($.browser.mozilla) {
                    video.mozSrcObject = video.stream;
                }
            }


		}
	});
	
	webrtc.on('videoRemoved',function (video, peer) {
		var container;
		if (peer) {
			var inType = peer.type;
			var el = document.getElementById('container_' + webrtc.getDomId(peer));
            var el_remote = document.getElementById('container_remote_' + webrtc.getDomId(peer));
            var v = document.getElementById('ninjaScreen');
			if (inType == 'video') {
				container = opts.remoteCamBox;
			} else {                
                $('#editScreenshot').remove();
                var es=$('#editScreenshot');
                es = null;
				container = opts.screenBox;
                el.removeChild(v);
			}
			if (container && el) {
				container.removeChild(el);
                hideFeedbackZone();
			}
		} else { // Thanks &yet for this silly case for local screen removal
			container = opts.screenBox;
			var screen = document.getElementById('localScreen');
			if (container && screen) {
				container.removeChild(screen);
			}
		}
	});

	webrtc.on('localScreenAdded', function(video) {
		if (opts.screenBox) {
			video.id = 'localScreen';
			opts.screenBox.appendChild(video);
		}
	});
	
	webrtc.on('volumeChange', function (volume, treshold) {
		showVolume(document.getElementById('myVolume'), volume);
	});
	
	webrtc.on('remoteVolumeChange', function (peer, volume) {
		if (document.getElementById('ninjaVolume')) {
			showVolume(document.getElementById('ninjaVolume'), volume);
		}
	});
	
	return webrtc;
};
