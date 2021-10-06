// Define canvas
const canvas = document.getElementById("spirit"); // Canvas element
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

//!LAMP
// Temp
function drawLamp() {
    // Save and translate canvas
    c.save();
    c.translate(canvas.width/2, canvas.height-lengthUnit*0.48-lengthUnit*0.2);
    // Generic styles
    c.lineWidth = 3;
    c.strokeStyle = "black";
    c.fillStyle = "#FF820A";
    // Main body
    c.save();
    c.beginPath();
    c.ellipse(0, 0, lengthUnit*0.7, lengthUnit*0.48, 0, 0, toRad(360));
    var grad = c.createRadialGradient(-lengthUnit*0.09, -lengthUnit*0.24, 0, -lengthUnit*0.09, -lengthUnit*0.24, lengthUnit*0.75);
    grad.addColorStop(0, 'rgba(255, 255, 0, 1)');
    grad.addColorStop(0.4, 'rgba(255, 130, 10, 1)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 1)');
    c.fillStyle = grad;
    c.globalCompositeOperation = "source-over";

    c.fill();
    c.stroke();
    c.restore();
    // Base
    c.beginPath();
    c.ellipse(0, lengthUnit*0.49, lengthUnit*0.4, lengthUnit*0.13, 0, 0, toRad(360));
    c.globalCompositeOperation = "destination-over";
    grad = c.createRadialGradient(0, lengthUnit*0.4, lengthUnit*0.1,  0, lengthUnit*0.4, lengthUnit*0.5);
    grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
    grad.addColorStop(1, 'rgba(255, 130, 10, 1)');
    c.fillStyle = grad;
    c.stroke();
    c.fill();
    // Lid
    c.beginPath();
    c.ellipse(0, -lengthUnit*0.5, lengthUnit*0.35, lengthUnit*0.2, 0, 0, toRad(360));
    c.globalCompositeOperation = "source-over";
    grad = c.createRadialGradient(0, -lengthUnit*0.5, 0, 0, -lengthUnit*0.55, lengthUnit*0.3);
    grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
    grad.addColorStop(1, 'rgba(255, 130, 10, 1)');
    c.fillStyle = grad;
    c.fill();
    c.stroke();
    // Lid Pt.2
    c.beginPath();
    c.ellipse(0, -lengthUnit*0.5, lengthUnit*0.35, lengthUnit*0.2, 0, toRad(180), toRad(360));
    c.ellipse(0, -lengthUnit*0.55, lengthUnit*0.33, lengthUnit*0.1, 0, 0, toRad(180));
    c.globalCompositeOperation = "source-over";
    grad = c.createRadialGradient(0, -lengthUnit*0.5, 0, 0, -lengthUnit*0.5, lengthUnit*0.3);
    grad.addColorStop(0, 'hsla(29, 100%, 30%, 1)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 1)');
    c.fillStyle = grad;
    c.fill();
    c.stroke();
    // Right handle
    c.beginPath();
    c.moveTo(lengthUnit*0.55, -lengthUnit*0.25);
    c.quadraticCurveTo(lengthUnit*0.9, -lengthUnit*0.65, lengthUnit*1.08, -lengthUnit*0.4);
    c.quadraticCurveTo(lengthUnit*1.15, -lengthUnit*0.25, lengthUnit*0.95, -lengthUnit*0.1); 
    c.quadraticCurveTo(lengthUnit*0.55, lengthUnit*0.1, lengthUnit*0.75, lengthUnit*0.3);
    c.globalCompositeOperation = "destination-over";
    c.lineCap = "round";
    c.lineWidth = 12;
    c.stroke();
    // Left handle
    c.save();
    c.scale(-1, 1);
    c.beginPath();
    c.moveTo(lengthUnit*0.55, -lengthUnit*0.25);
    c.quadraticCurveTo(lengthUnit*0.9, -lengthUnit*0.65, lengthUnit*1.08, -lengthUnit*0.4);
    c.quadraticCurveTo(lengthUnit*1.15, -lengthUnit*0.25, lengthUnit*0.95, -lengthUnit*0.1); 
    c.quadraticCurveTo(lengthUnit*0.55, lengthUnit*0.1, lengthUnit*0.75, lengthUnit*0.3);
    c.globalCompositeOperation = "destination-over";
    c.lineCap = "round";
    c.lineWidth = 12;
    c.stroke();
    c.restore();

    c.restore();// Restore canvas context at the end of drawing lamp
}

//! Genie
class Genie {
    constructor() {
        this.a = lengthUnit*0.4;
        this.t = 2.5*lengthUnit;
        this.height = 0;
        this.grow = false;
        this.radius;
        this.x = 0;
        this.y = 0;
        this.min = 1;
        this.max = 100;
        this.rand = 20;
    }

    changeRand(min, max) {
        this.min = parseInt(min);
        this.max = parseInt(max);
        console.log("change received", this.min, this.max);
    }

    setRand() {
        this.rand = randomInt(this.min, this.max);
        this.grow = !this.grow;
    }

    draw() {
        c.save();
        c.translate(canvas.width/2, canvas.height-lengthUnit*1.2);
        c.rotate(toRad(-90));
        c.scale(1, -1);
        c.shadowBlur = 5;
        c.fillStyle = "#1D73F7";
        c.shadowColor = c.fillStyle;
        c.globalCompositeOperation = "source-over";
        for(var i=0; i<this.height; i+=5) {
            c.beginPath();
            c.arc(i, this.a*Math.sin((2*Math.PI*i/this.t)+Math.PI/2)-this.a, i*0.4, 0, toRad(360));
            c.fill();
            if(i >= this.t-5) {
                this.x = i;
                this.y = this.a*Math.sin((2*Math.PI*i/this.t)+Math.PI/2)-this.a;
                // console.log(this.x, this.y);
                c.save();
                c.translate(this.x, this.y)
                c.rotate(toRad(90));
                c.scale(-1, 1);
                c.fillStyle = "white";
                c.textAlign = "center";
                c.font = "150px Averia Gruesa Libre";
                c.textBaseline = "middle";
                c.fillText(this.rand, 0, 0);
                c.restore();
            }
        }
        c.restore();
    }

    update() {
        if(this.grow) {
            if(this.height < this.t) {
                this.height += 7;
            }
        } else {
            if(this.height > 0) {
                this.height -= 7;
            }
        }
        if(this.height < 0) {
            this.height = 0;
        }
        genie.draw();
    }
}

//!Implementation
var lengthUnit;
var genie;
function init() {
    lengthUnit=canvas.height/5;
    genie = new Genie();
}

var time = 0.5;
var newMin;
var newMax;
var cooldown = false;
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    drawLamp();
    if(distanceBetween({"x":userX, "y":userY}, {"x":canvas.width/2, "y":canvas.height-lengthUnit*0.48-lengthUnit*0.2}) < lengthUnit*0.7 && mousedown) {
        c.save();
        c.beginPath();
        c.moveTo(previousX, previousY);
        c.lineTo(userX, userY);
        c.globalCompositeOperation = "source-over";
        c.lineWidth = time;
        c.shadowBlur = time;
        c.lineCap = "round";
        c.strokeStyle = "rgba(255, 255, 0, 1)";
        c.shadowColor = c.strokeStyle;
        c.stroke();
        if(time < 20) {
            time += 0.4;
        } else {
            genie.setRand();
            time = 0;
        }
        c.restore();
    } else {
        time = 0;
    }
    if(distanceBetween({"x":userX, "y":userY}, {"x":canvas.width, "y":0}) < 100 && mousedown && !cooldown) {
        cooldown = true;
        mousedown = false;
        newMin = prompt("Enter new min", 0);
        newMax = prompt("Enter new max", 100);
        if(!isNaN(newMin) && !isNaN(newMax)) {
            console.log("values updated", newMin, newMax);
            genie.changeRand(newMin, newMax);
            
        }
        newMin = 0;
        newMax = 0;
        cooldown = false;
    }
    previousX = userX;
    previousY = userY;
    genie.update();
    
}

//!User interaction
var userX;
var userY;
var previousX;
var previousY;
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