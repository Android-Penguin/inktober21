// Define canvas
const canvas = document.getElementById("raven"); // Canvas element
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

var colourList = [
    "#FCFD52",
    "#F5935B",
    "#FE53FF",
    "#4EFF4D",
    "#FF1637",
    "#FFFFFF",
    "#51FEFF"
]

//! Raven object
class Raven {
    constructor() {

    }
}

//! Setting
var squareSize;
var squareSpacing = 10;
var height;
var heightSquish;
function drawDanceFloor() {
    squareSize = canvas.width/11;
    c.save();
    c.translate(-200, canvas.height);
    c.scale(1, -1);
    c.transform(1, 0, 0.7, 0.55, -300, 0);

    height = 0;
    heightSquish = 1;
    for(var rowNumber=0; rowNumber<6; rowNumber++) {
        for(var i=0; i<Math.ceil((canvas.width+600)/squareSize); i++) {
            // Large square
            c.fillStyle = "#262321";
            c.fillRect(i*squareSize, height, squareSize+5, squareSize*heightSquish+squareSpacing);

            // Small square
            c.save();
            c.fillStyle = colourList[randomInt(0, colourList.length-1)];
            c.shadowColor = c.fillStyle;
            c.shadowBlur = 5;
            c.fillRect(i*squareSize, height+squareSpacing, squareSize-squareSpacing, squareSize*heightSquish-squareSpacing);
            c.restore();
        }
        height += squareSize*heightSquish;
        heightSquish -= 0.1005;

    }
    setTimeout(() => {
        drawDanceFloor();
    }, 500);



    c.restore();
}

//!Implementation
function init() {
    drawDanceFloor();
}

function animate() {
    
}

//!User interaction
var userX;
var userY;
function userAction() {
    if(window.getComputedStyle(document.getElementById("screen-text")).display != "none") {
        animate();
        init();
    }
    document.getElementById("screen-text").style.display = "none";
}
// Tap and click
document.body.ontouchstart = function(e) {
    userX = e.touches[0].clientX;
    userY = e.touches[0].clientY;
    userAction();
};
document.body.onclick = function() {
    userAction();
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

//TODO remove before production
// userAction();