// Define canvas
const canvas = document.getElementById("raven"); // Canvas element
const canvas2 = document.getElementById("raven2");
var c = canvas.getContext("2d"); // Context
var c2 = canvas2.getContext("2d");
console.log(canvas);
// Canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;
// Resize
window.onresize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;
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
    "#51FEFF",
    "#FFFFFF"
]

//! Raven object
class Raven {
    constructor(position, dimensions, bobUp) {
        this.position = {"x":position.x, "y":position.y, "direction":position.direction};
        this.dimensions = {"w":dimensions.w, "h":dimensions.h, "scale":dimensions.scale};
        this.bobUp = bobUp;
        this.img;
        this.loaded = false;
    }

    draw() {
        c2.save();
        c2.translate(this.position.x, this.position.y);
        c2.scale(this.position.direction, 1);
        c2.drawImage(this.img, -this.dimensions.w/2, -(this.dimensions.h/2+(this.dimensions.h*this.dimensions.scale-this.dimensions.h)),
            this.dimensions.w, this.dimensions.h*this.dimensions.scale);
        c2.restore();
    }

    init() {
        this.img = new Image();
        this.img.src = "/raven/raven.png";
        this.img.onload = this.toggleFlag();
    }
    toggleFlag() {
        this.loaded = true;
    }
    update() {
        // Swap bob direction
        this.bobUp = !this.bobUp;
        // Randomize direction
        this.position.direction = randomInt(1, 2);
        if(this.position.direction % 2 == 0) {
            this.position.direction = 1;
        } else {
            this.position.direction = -1;
        }

        // Draw if loaded
        if(this.loaded) {
            this.draw();
        } else {
            this.init();
        }
    }
    changeSize() {
        if(this.bobUp) {
            this.dimensions.scale += 0.01;
        } else {
            this.dimensions.scale -= 0.01;
        }
        
        if(this.loaded) {
            this.draw();
        }
    }
}

//! Scene drawing
var lights = false;
var lines;
var squareSize;
var squareSpacing = 10;
var height;
var heightSquish;

function drawDanceFloor() {
    // Background
    c.save();
    c.fillStyle = "hsl(0, 100%, 5=2=4=3%)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.restore();

    // Lights
    c.save();
    c.translate(canvas.width/2, 0);
    // Laser machine
    c.beginPath();
    c.arc(0, 0, 20, 0, toRad(180));
    var gradient = c.createRadialGradient(0, 0, 0, 0, 20, 20);
    gradient.addColorStop(0, "white");
    gradient.addColorStop(1, "grey");
    c.fillStyle = gradient;
    c.fill();

    // Lasers!!!!
    if(lights == true) {
        lines = randomInt(5, 15);
        for(i=0; i<lines; i++) {
            c.beginPath();
            c.moveTo(0, 2);
            var angle = randomInt(20, 160);
            c.lineTo(Math.cos(toRad(angle))*2000, Math.sin(toRad(angle))*2000);
            c.strokeStyle = colourList[randomInt(0, colourList.length-2)];
            c.shadowColor = c.strokeStyle;
            c.shadowBlur = randomInt(20, 30);
            c.lineWidth = 2.5;
            c.stroke();
        }
    }
    c.restore();

    // Floor
    c.save();
    c.translate(-canvas.width, canvas.height);
    c.scale(1, -1);
    c.transform(1, 0, 0.7, 0.55, -300, 0);
    squareSize = canvas.width/11;
    height = 0;
    heightSquish = 1;
    for(var rowNumber=0; rowNumber<6; rowNumber++) {
        for(var i=0; i<Math.ceil((4*canvas.width)/squareSize); i++) {
            // Large square
            c.fillStyle = "#262321";
            c.fillRect(i*squareSize, height, squareSize+5, squareSize*heightSquish+squareSpacing);

            // Small square
            c.save();
            c.fillStyle = colourList[randomInt(0, colourList.length-1)];
            if(lights == true) {
                c.shadowColor = c.fillStyle;
            }
            c.shadowBlur = 5;
            c.fillRect(i*squareSize, height+squareSpacing, squareSize-squareSpacing, squareSize*heightSquish-squareSpacing);
            c.restore();
        }
        height += squareSize*heightSquish;
        heightSquish -= 0.1005;

    }
    c.restore();
}

//!Implementation
var sceneStarted = false;
var ravens;
var ravenCount;
function init() {
    ravens = [];
    ravenCount = Math.floor(canvas.width/250);
    console.log(ravenCount);
    for(var i=0; i<ravenCount; i++) {
        var position = {"x":0, "y":0, "direction":1};
        position.x = i*(canvas.width/ravenCount)+130;
        switch(ravenCount) {
            case 1:
                position.y = canvas.height-150;
                break;
            case 2:
                position.y = randomInt(canvas.height-210, canvas.height-150);
                break;
            case 3:
                position.y = randomInt(canvas.height-260, canvas.height-150);
                break;
            case 4:
                position.y = randomInt(canvas.height-300, canvas.height-150);
                break;
            default:
                position.y = randomInt(canvas.height-350, canvas.height-150);
                break;
        }
        var dimensions = {"w":250, "h":250, "scale":1};
        var bobUp;
        if(i % 2 == 0) {
            bobUp = true;
        } else {
            bobUp = false;
        }
        var newRaven = new Raven(position, dimensions, bobUp);
        ravens.push(newRaven);
    }

    for(bird of ravens) {
        bird.init();
    }

    if(sceneStarted == false) {
        updateScene();
        animate();
        sceneStarted = true;
    }
}

// Reoccurring function
function updateScene() {
    drawDanceFloor();
    for(bird of ravens) {
        bird.update();
    }
    setTimeout(() => {
        updateScene();
    }, (15/32)*1000);
}

function animate() {
    requestAnimationFrame(animate);
    c2.clearRect(0, 0, canvas2.width, canvas2.height);
    if(lights) {
        for(bird of ravens) {
            bird.changeSize();
        }
    }
}


//!User interaction
var userX;
var userY;
function userAction() {
    if(window.getComputedStyle(document.getElementById("screen-text")).display != "none") {
        lobbyAudio.play();
        init();
    }
    if(!lights) {
        document.getElementById("hint").style.display = "block";
    }
    document.getElementById("screen-text").style.display = "none";
    document.getElementById("rave").style.display = "flex";
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