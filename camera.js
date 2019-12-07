// Set constraints for the video stream
var constraints = { audio: true, video: { facingMode: { exact: "environment" } } } // rear camera
/* var constraints = { video: { facingMode: "user" }, audio: false }; // front camera */
 
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")
              
// Access the device camera and stream to cameraView
function cameraStart() {
              
	navigator.mediaDevices.getUserMedia(constraints)
		.then(function(mediaStream) {
			var video = document.querySelector('video');
			video.srcObject = mediaStream;
			video.onloadedmetadata = function(e) {
				video.play();
			};
		})
	  	.catch(function(err) { 
	  		console.log(err.name + ": " + err.message); 
	  	}); // always check for errors at the end.
}
 
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/jpeg");
    cameraOutput.classList.add("taken");
};
 
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
