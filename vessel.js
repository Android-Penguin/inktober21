// Define canvas
const canvas = document.getElementById("vessel"); // Canvas element
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

//!Line equations
var a = (canvas.height-200)/4;//Amplitude of graphs
var t = canvas.width//Period of graphs

function line1(x) {
    return(-a*Math.cos(2*Math.PI*x/t)+a);
}
function line2(x) {
    return((-a/4)*Math.cos(4*Math.PI*x/t)+(5*a/4));
}
function line3(x) {
    return((a/4)*Math.cos(4*Math.PI*x/t)+(3*a/4));
}
function line4(x) {
    return((-a/4)*Math.cos(4*Math.PI*x/t)+(a/4));
}
function line5(x) {
    return((a/4)*Math.cos(4*Math.PI*x/t)-(a/4));
}
function line6(x) {
    return((-a/4)*Math.cos(4*Math.PI*x/t)-(3*a/4));
}
function line7(x) {
    return((a/4)*Math.cos(4*Math.PI*x/t)-(5*a/4));
}
function line8(x) {
    return(a*Math.cos(2*Math.PI*x/t)-a);
}


c.translate(0, canvas.height/2);
c.scale(1, -1);

// Line 1
c.beginPath();
console.log(a);
c.moveTo(0, 0);
for(var i=0; i<canvas.width; i++) {
    c.lineTo(i, line1(i));
}
c.stroke();

// Line 2
c.beginPath();
for(var i=0; i<canvas.width; i++) {
    if (line7(i)==line8(i)) {
        c.moveTo(i, line7(i));
    }
    if(line2(i) < line1(i)) {
        c.lineTo(i, line2(i));
    }
}
c.stroke();

// Line 3
c.beginPath();
for(var i=0; i<canvas.width; i++) {
    if (line7(i)==line8(i)) {
        c.moveTo(i, line7(i));
    }
    if(line3(i) < line1(i)) {
        c.lineTo(i, line3(i));
    }
}
c.stroke();

// Line 4
c.beginPath();
c.moveTo(0, 0);
for(var i=0; i<canvas.width; i++) {
    c.lineTo(i, line4(i));
}
c.stroke();

// Line 5
c.beginPath();
c.moveTo(0, 0);
for(var i=0; i<canvas.width; i++) {
    c.lineTo(i, line5(i));
}
c.stroke();

// Line 6
c.beginPath();
for(var i=0; i<canvas.width; i++) {
    if (line7(i)==line8(i)) {
        c.moveTo(i, line7(i));
    }
    if(line6(i) > line8(i)) {
        c.lineTo(i, line6(i));
    }
}
c.stroke();

// Line 7
c.beginPath();
for(var i=0; i<canvas.width; i++) {
    if (line7(i)==line8(i)) {
        c.moveTo(i, line7(i));
    }
    if(line7(i) > line8(i)) {
        c.lineTo(i, line7(i));
    }
}
c.stroke();

// Line 8
c.beginPath();
c.moveTo(0, 0);
for(var i=0; i<canvas.width; i++) {
    c.lineTo(i, line8(i));
}
c.stroke();