// Define canvas
const canvas = document.getElementById("CANVAS NAME"); // Canvas element
var c = canvas.getContext("2d"); // Context
console.log(canvas);
// Canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// Resize
window.onresize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
}

//! Math functions
// Convert to radians
function toRad(angle) {
    return angle*(Math.PI/180);
}
function toDeg(angle) {
    return angle*(180/Math.PI);
}
// Return random int
function randomInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
// Return distance between 2 points
function distanceBetween(p1, p2) {
    xDist = p2.x - p1.x;
    yDist = p2.y - p1.y;
    return(Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2)));
}
// Return angle between 2 points
function angleBetween(p1, p2) {
    xDist = p2.x - p1.x;
    yDist = p2.y - p1.y;
    return(toDeg(Math.atan(yDist/xDist)));
}

//!Implementation
function init() {
    
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
}

//!User interaction
var userX;
var userY;
var mousedown = false;
function userAction() {
    if(window.getComputedStyle(document.getElementById("screen-text")).display != "none") {
        init();
        animate();
        document.getElementById("screen-text").style.display = "none";
    }
}
// Tap and click
document.body.ontouchstart = function(e) {
    userX = e.touches[0].clientX;
    userY = e.touches[0].clientY;
    userAction();
    mousedown = true;
};
document.body.ontouchend = function () {
    mousedown = false;
}
document.body.onclick = function() {
    userAction();
}
document.body.onmousedown = function (params) {
    mousedown = true;
}
document.body.onmouseup = function (params) {
    mousedown = false;
}

// Move mouse or finger
document.body.onmousemove = function (e) {
    userX = e.clientX;
    userY = e.clientY;
}
document.body.ontouchmove = function (e) {
    userX = e.touches[0].clientX;
    userY = e.touches[0].clientY;
}

// TODO REMOVE BEFORE PRODUCTION
// userAction();