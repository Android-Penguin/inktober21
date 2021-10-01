// Define canvas
const canvas = document.getElementById("crystal"); // Canvas element
var c = canvas.getContext("2d"); // Context
console.log(canvas);
// Canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// Resize
window.onresize = function() {
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
}


//! Math functions
// Convert to radians
function toRad(angle) {
    return angle*(Math.PI/180);
}
// Return random int
function randomInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}


//!Draw functions
var colorOptions = [
    {"h":358, "s":100, "l":67},
    {"h":23, "s":100, "l":65},
    {"h":44, "s":100, "l":61},
    {"h":83, "s":68, "l":47},
    {"h":162, "s":70, "l":59},
    {"h":222, "s":100, "l":61},
    {"h":295, "s":100, "l":61},
    {"h":277, "s":100, "l":68}
];

function drawTriangle(point1, point2, point3, lineColor, fillColor) {
    c.beginPath();
    c.lineWidth = 1;
    c.moveTo(point1.x, point1.y);
    c.lineTo(point2.x, point2.y);
    c.lineTo(point3.x, point3.y);
    c.lineTo(point1.x, point1.y);
    c.closePath();
    c.strokeStyle = lineColor;
    c.stroke();
    c.fillStyle = fillColor;
    c.fill();
}
function drawQuadrilateral(point1, point2, point3, point4, lineColor, fillColor) {
    c.beginPath();
    c.lineWidth = 1;
    c.moveTo(point1.x, point1.y);
    c.lineTo(point2.x, point2.y);
    c.lineTo(point3.x, point3.y);
    c.lineTo(point4.x, point4.y);
    c.lineTo(point1.x, point1.y);
    c.closePath();
    c.strokeStyle = lineColor;
    c.stroke();
    c.fillStyle = fillColor;
    c.fill();
}


//! Crystal generation
// Starting position
var layer = 1;
var height;
var angle;
// Crystal dimensions
var innerRadius;
var adjustmentAngle;
var innerAngle1;
var innerAngle2;
var offsetAngle;
// Node coordinates
var top = {"x":0, "y":0};
var left = {"x":0, "y":0};
var right = {"x":0, "y":0};
var innerL = {"x":0, "y":0};
var innerR = {"x":0, "y":0};
var bottomLeft = {"x":0, "y":0};
var bottomRight = {"x":0, "y":0};
var bottomInnerL = {"x":0, "y":0};
var bottomInnerR = {"x":0, "y":0};
// Appearance
var colorIndex;
var color = {"line":"", "fillLight":"", "fillDark":""};
// State variables
var drawState = 0;
var crystalCount = 0;

function drawCrystal() {
    // Randomize starting position
    if(crystalCount < 5 || crystalCount > 150) {
        layer = 1;
    } else if(crystalCount < 40) {
        layer = randomInt(1, 2);
    } else {
        layer = randomInt(1, 3);
    }
    angle = Math.random()*160;
    height = 300*layer+randomInt(-100, 100);
    top.x = Math.cos(toRad(-angle-10))*height+canvas.width/2;
    top.y = Math.sin(toRad(-angle-10))*height+canvas.height;
    
    // Randomize crystal dimensions
    innerRadius = randomInt(layer*30, layer*30+layer*10);
    adjustmentAngle = 90-(angle+10);
    innerAngle1 = randomInt(20, 50);
    innerAngle2 = randomInt(innerAngle1-10, innerAngle1+10);
    offsetAngle = (180-(2*innerAngle1+innerAngle2))/2;

    // Set node coordinates;
    // Top
    right.x = Math.cos(toRad(adjustmentAngle+offsetAngle))*innerRadius+top.x;
    right.y = Math.sin(toRad(adjustmentAngle+offsetAngle))*innerRadius+top.y;
    innerR.x = Math.cos(toRad(adjustmentAngle+offsetAngle+innerAngle1))*innerRadius+top.x;
    innerR.y = Math.sin(toRad(adjustmentAngle+offsetAngle+innerAngle1))*innerRadius+top.y;
    innerL.x = Math.cos(toRad(adjustmentAngle+offsetAngle+innerAngle1+innerAngle2))*innerRadius+top.x;
    innerL.y = Math.sin(toRad(adjustmentAngle+offsetAngle+innerAngle1+innerAngle2))*innerRadius+top.y;
    left.x = Math.cos(toRad(adjustmentAngle+offsetAngle+2*innerAngle1+innerAngle2))*innerRadius+top.x;
    left.y = Math.sin(toRad(adjustmentAngle+offsetAngle+2*innerAngle1+innerAngle2))*innerRadius+top.y;

    // Bottom
    bottomRight.x = Math.cos(toRad(adjustmentAngle+offsetAngle))*innerRadius+canvas.width/2;
    bottomRight.y = Math.sin(toRad(adjustmentAngle+offsetAngle))*innerRadius+canvas.height;
    bottomInnerR.x = Math.cos(toRad(adjustmentAngle+offsetAngle+innerAngle1))*innerRadius+canvas.width/2;
    bottomInnerR.y = Math.sin(toRad(adjustmentAngle+offsetAngle+innerAngle1))*innerRadius+canvas.height;
    bottomInnerL.x = Math.cos(toRad(adjustmentAngle+offsetAngle+innerAngle1+innerAngle2))*innerRadius+canvas.width/2;
    bottomInnerL.y = Math.sin(toRad(adjustmentAngle+offsetAngle+innerAngle1+innerAngle2))*innerRadius+canvas.height;
    bottomLeft.x = Math.cos(toRad(adjustmentAngle+offsetAngle+2*innerAngle1+innerAngle2))*innerRadius+canvas.width/2;
    bottomLeft.y = Math.sin(toRad(adjustmentAngle+offsetAngle+2*innerAngle1+innerAngle2))*innerRadius+canvas.height;

    // Set visual layer
    if(layer == 1) {
        c.globalCompositeOperation = "source-over";
    } else {
        c.globalCompositeOperation = "destination-over";
    }

    // Select colour
    colorIndex = randomInt(0, colorOptions.length-1);
    color.line = "hsl("+colorOptions[colorIndex].h+","+colorOptions[colorIndex].s+"%,"+colorOptions[colorIndex].l+"%)";
    color.fillLight = "hsl("+colorOptions[colorIndex].h+","+colorOptions[colorIndex].s+"%,"+(colorOptions[colorIndex].l+20)+"%)";
    color.fillDark = "hsl("+colorOptions[colorIndex].h+","+(colorOptions[colorIndex].s-10)+"%,"+(colorOptions[colorIndex].l-10)+"%)";

    // Draw top of crystal
    drawTriangle(top, right, innerR, color.line, color.fillDark);
    drawTriangle(top, innerR, innerL, color.line, color.fillLight);
    drawTriangle(top, innerL, left, color.line, color.fillLight);

    // Draw sides of crystal
    drawQuadrilateral(right, bottomRight, bottomInnerR, innerR, color.line, color.fillDark);
    drawQuadrilateral(innerR, bottomInnerR, bottomInnerL, innerL, color.line, color.fillLight);
    drawQuadrilateral(left, bottomLeft, bottomInnerL, innerL, color.line, color.fillLight);

    crystalCount ++;
}

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        document.getElementById("pressSpace").style.display = "none";
        drawCrystal();
    }
}
document.body.ontouchstart = function() {
    document.getElementById("pressSpace").style.display = "none";
    drawCrystal();
}