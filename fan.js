// Define canvas
const canvas = document.getElementById("fan"); // Canvas element
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

//! Colors
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
function randomColor() {
    var colorSetting = colorOptions[randomInt(0, colorOptions.length-1)];
    var color = "hsl("+colorSetting.h+","+colorSetting.s+"%,"+colorSetting.l+"%)";
    return color;
}

//!Fan
var angle = 0;
var innerRadius = 30;
function drawFan() {
    c.save();
    c.translate(canvas.width/2, canvas.height/2);
    c.rotate(toRad(angle));

    // Fan style
    c.lineWidth = 2;
    var grad = c.createRadialGradient(0, 0, 70, 0, 0, 100);
    grad.addColorStop(0, 'rgba(189, 190, 192, 1)');
    grad.addColorStop(1, 'rgba(88, 89, 91, 1)');

    
    // Solid background of fan
    c.beginPath();
    c.arc(0, 0, 105, 0, toRad(360));
    c.fillStyle = "white";
    c.fill();
    
    c.fillStyle = grad;
    // Fan blades
    var startAngle = 35;
    for(var i=0; i<3; i++) {
        c.save();
        // Rotate to draw fan blade
        c.rotate(i*toRad(120));

        c.beginPath();
        c.moveTo(Math.cos(toRad(startAngle))*innerRadius, Math.sin(toRad(startAngle))*innerRadius);
        c.lineTo(Math.cos(toRad(startAngle-10))*75, Math.sin(toRad(startAngle-10))*75);
        c.quadraticCurveTo(Math.cos(toRad(startAngle/2))*100, Math.sin(toRad(startAngle/2))*100, 98, 0);
        c.quadraticCurveTo(Math.cos(toRad(-startAngle/2))*100, Math.sin(toRad(-startAngle/2))*100, Math.cos(toRad(-startAngle+10))*75, Math.sin(toRad(-startAngle+10))*75);
        c.lineTo(Math.cos(toRad(-startAngle))*innerRadius, Math.sin(toRad(-startAngle))*innerRadius);
        c.lineWidth = 3;
        c.stroke();
        c.fill();

        c.restore();
    }

    // Fan middle
    c.beginPath();
    c.arc(0, 0, innerRadius, 0, toRad(360));
    c.fill();
    c.stroke();

    // SPiral?
    c.beginPath();
    c.moveTo(0, 0);
    for(var i=0; i<720; i++) {
        c.lineTo(Math.cos(toRad(-i))*i*(30/720), Math.sin(toRad(-i))*i*(30/720));
    }
    c.stroke();

    angle+=10;
    c.restore();
}

//! Particles
class Particle {
    constructor(position) {
        this.position = {"x":position.x, "y":position.y, "angle":position.angle};
        this.startPosition = {"x":position.x, "y":position.y};
        this.distanceToFan;
        this.velocity;
        this.movementState = 0;
        this.color = randomColor();
    }

    draw() {
        c.save();
        c.beginPath();
        c.arc(this.position.x, this.position.y, 12, 0, toRad(360));
        c.fillStyle = this.color;
        c.fill();
        c.restore();
    }

    update() {
        this.distanceToFan = Math.abs(distanceBetween(this.position, {"x":canvas.width/2, "y":canvas.height/2})-115);
        switch(this.movementState) {
            case 0:
                this.velocity = (this.distanceToFan/Math.abs(distanceBetween(this.startPosition, {"x":canvas.width/2, "y":canvas.height/2})-115))*7+5;
                if(this.distanceToFan < 20) {
                    this.movementState = 1;
                }
                break;
            case 1:
                this.velocity = (this.distanceToFan/Math.abs(distanceBetween(this.startPosition, {"x":canvas.width/2, "y":canvas.height/2})-115))*7+5;
                if(this.distanceToFan > 20) {
                    this.movementState = 2;
                }
                break;
            case 2:
                this.velocity += 1;
                break;
                
        }
        if(this.distanceToFan < 60) {
            this.position.angle -= ((canvas.width/2-this.distanceToFan)/(canvas.width/2))*7;
        }
        
        this.position.x += Math.cos(toRad(this.position.angle))*this.velocity;
        this.position.y += Math.sin(toRad(this.position.angle))*this.velocity;
        this.draw();
    }
}

//!Implementation
var particles;
function init() {
    particles = [];
}

function animate() {
    requestAnimationFrame(animate);
    c.save();
    c.fillStyle = "rgba(255, 255, 255, 0.2)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.restore();

    for(var i=0; i<particles.length; i++) {
        particles[i].update();
    }

    drawFan();
}

//!User interaction
function createParticle() {
    if(distanceBetween({"x":userX, "y":userY}, {"x":canvas.width/2, "y":canvas.height/2}) > 200) {
        var position = {};
        position.x = userX;
        position.y = userY;
        position.angle = angleBetween({"x":userX, "y":userY}, {"x":canvas.width/2, "y":canvas.height/2});
        if(userX > canvas.width/2) {
            position.angle += 180;
        }
    
        var newParticle = new Particle(position);
        particles.push(newParticle);
    }
}

var userX;
var userY;
var mousedown = false;
function userAction() {
    if(window.getComputedStyle(document.getElementById("screen-text")).display != "none") {
        init();
        animate();
        document.getElementById("screen-text").style.display = "none";
    } else {
        createParticle();
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
document.body.onmousedown = function () {
    mousedown = true;
}
document.body.onmouseup = function () {
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
userAction();