var lobbyAudio = document.createElement("audio");
lobbyAudio.setAttribute("src", "/raven_audio/Intro_Loop.aac");
lobbyAudio.setAttribute("autoplay", "autoplay");
lobbyAudio.addEventListener('timeupdate', function(){
    var buffer = 0.28;
    if(this.currentTime > this.duration - buffer){
        this.currentTime = 0;
        this.play();
    }
});

var loopIntro = document.getElementsByClassName("loop-intro");
var loopBody = document.getElementsByClassName("loop-body");
var previousTrack;
var trackIndex;

function setListeners() {
    for(item of loopIntro) {
        item.addEventListener('timeupdate', function(){
            var buffer = 0.28;
            console.log(this.getAttribute("track-number"), loopBody[trackIndex].getAttribute("track-number"));
            if(this.getAttribute("track-number") == loopBody[trackIndex].getAttribute("track-number")) {
                if(this.currentTime > this.duration - buffer){
                    loopBody[trackIndex].play();
                }
            } else {
                this.pause();
            }
        });
    }
    for(item of loopBody) {
        item.addEventListener('timeupdate', function(){
            var buffer = 0.25;
            console.log(this.getAttribute("track-number"), loopBody[trackIndex].getAttribute("track-number"));
            if(this.getAttribute("track-number") == loopBody[trackIndex].getAttribute("track-number")) {
                if(this.currentTime > this.duration - buffer){
                    this.currentTime = 0;
                    this.play();
                }
            } else {
                this.pause();
            }
        });
    }
}

function newTrack() {
    trackIndex = randomInt(0, loopIntro.length-1);
    if(trackIndex != previousTrack) {
        loopIntro[trackIndex].currentTime = 0;
        loopBody[trackIndex].currentTime = 0;
        loopIntro[trackIndex].play();
    } else {
        newTrack();
        console.log("reelecting track");
    }
}

var button = document.getElementById("rave");
button.onclick = function () {
    if(window.getComputedStyle(document.getElementById("hint")).display != "none") {
        setListeners();
        lights = true;
        lobbyAudio.pause();
        document.getElementById("hint").style.display = "none";
    }
    previousTrack = trackIndex;
    newTrack();
}

function consolePlay(track) {
    trackIndex = track-1;
    loopIntro[trackIndex].play();
    return "Playing track "+track;
}