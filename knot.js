// Define canvas
const canvas = document.getElementById("knot"); // Canvas element
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

//! Colours
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
var color = colorOptions[randomInt(0, colorOptions.length-1)];
var mainColor = "hsl("+color.h+","+color.s+"%,"+color.l+"%)";
var shadedColor = "hsl("+color.h+","+color.s+"%,"+(color.l-30)+"%)";
console.log(mainColor);
function createGradient(x1, y1, x2, y2) {
    var grad = c.createLinearGradient(x1, y1, x2, y2);
    grad.addColorStop(0.15, mainColor);
    grad.addColorStop(0.5, shadedColor);
    grad.addColorStop(0.85, mainColor);
    return grad;
}

var upperHeadHeight;
var headWidth;
var arm1;
var arm2;
var center = {"x":0, "y":0};
var lowerOrigin = {"x":0, "y":0};
//!Drawing octopus
function drawUpperOctopus() {
    // Dimensions
    upperHeadHeight = 1.6*heightUnit;
    headWidth = 1.4*heightUnit;
    center = {"x":canvas.width/2, "y":1.6*heightUnit+40};

    // Head
    c.beginPath();
    c.ellipse(center.x, center.y, headWidth, upperHeadHeight, 0, toRad(180), 0);
    c.arc(center.x, center.y, headWidth, 0, toRad(180));
    c.fillStyle = mainColor;
    c.fill();

    // Face
    c.fillStyle = "white";
    c.strokeStyle = "black";
    c.beginPath();
    c.ellipse(center.x+heightUnit*0.4, center.y+heightUnit*0.2, heightUnit*0.32, heightUnit*0.4, toRad(30), 0, toRad(360));
    c.fill();
    // c.stroke();
    c.beginPath();
    c.ellipse(center.x-heightUnit*0.4, center.y+heightUnit*0.2, heightUnit*0.32, heightUnit*0.4, toRad(-30), 0, toRad(360));
    c.fill();
    // c.stroke();

    c.fillStyle = "black";
    c.beginPath();
    c.arc(center.x+heightUnit*0.3, center.y+heightUnit*0.3, heightUnit*0.15, 0, toRad(360));
    c.fill();
    c.beginPath();
    c.arc(center.x-heightUnit*0.3, center.y+heightUnit*0.3, heightUnit*0.15, 0, toRad(360));
    c.fill();

    // Arm styles
    c.lineCap = "round";
    c.lineWidth = 25;
    c.strokeStyle = mainColor;

    // Wavy arms
    c.beginPath();
    c.ellipse(center.x+Math.cos(toRad(155))*headWidth, center.y-5+Math.sin(toRad(155))*headWidth-2*heightUnit, 1.5*heightUnit, 2*heightUnit, 0, toRad(90), toRad(arm1));
    c.stroke();
    c.beginPath();
    c.ellipse(center.x+Math.cos(toRad(25))*headWidth, center.y-5+Math.sin(toRad(25))*headWidth-2*heightUnit, 1.5*heightUnit, 2*heightUnit, 0, toRad(90), toRad(arm2), true);
    c.stroke();

    // // Upper arms
    // for(var i=1; i<7; i++) {
    //     c.beginPath();
    //     c.moveTo(center.x+Math.cos(toRad((i+1)*20))*headWidth, center.y-5+Math.sin(toRad((i+1)*20))*headWidth);
    //     c.quadraticCurveTo(center.x+150-((i-1)*(300/5)), center.y+headWidth+2, center.x+150-((i-1)*(300/5)), center.y+headWidth+10);
    //     if(i==6) {
    //         lowerOrigin.x = center.x+150-((i-1)*(300/5));
    //         lowerOrigin.y = center.y+headWidth+10;
    //     }
    //     c.stroke();
    // }
}

var spacing = 60;
var ySpacing = 45+Math.sin(toRad(45))*spacing;
function drawLowerOctopus(xAdj, yAdj) {
    c.save();
    c.lineCap = "round";
    c.lineWidth = 25;
    c.strokeStyle = mainColor;

    // Translate context to skew it
    c.translate(center.x, center.y);
    c.transform(1, 0, xAdj, yAdj, 0, 0);
    c.translate(-center.x, -center.y);

    //? Upper arms
    for(var i=1; i<7; i++) {
        c.beginPath();
        c.moveTo(center.x, center.y);
        c.quadraticCurveTo(center.x+150-((i-1)*(300/5)), center.y+headWidth+2, center.x+150-((i-1)*(300/5)), center.y+headWidth+10);
        if(i==6) {
            lowerOrigin.x = center.x+150-((i-1)*(300/5));
            lowerOrigin.y = center.y+headWidth+10;
        }
        c.globalCompositeOperation = "destination-over";
        c.stroke();
    }

    // Translate context for rest of tentacles
    c.translate(lowerOrigin.x, lowerOrigin.y);

    var cp = {"x":0, "y":12.5};

    //? Stage 1 Upper
    c.globalCompositeOperation = "source-over";
    for(i=0; i<5; i+=2) {
        c.beginPath();
        // c.arc((i+1)*spacing, 0, spacing, toRad(180), toRad(135), true);
        c.moveTo(i*spacing, 0);
        if(i == 0) {
            cp.x = -0.15*spacing;
        } else if(i==2) {
            cp.x = 0.95*i*spacing;
        } else if(i==4) {
            cp.x = 0.95*i*spacing;
        }
        c.quadraticCurveTo(cp.x, cp.y, i*spacing, 25);
        c.lineTo((i+1)*spacing, ySpacing);
        c.stroke();
    }
    //? Stage 1 Lower
    c.globalCompositeOperation = "destination-over";
    for(i=1; i<6; i+=2) {
        c.beginPath();
        // c.arc((i-1)*spacing, 0, spacing, 0, toRad(45));
        c.moveTo(i*spacing, 0);
        if(i == 1) {
            cp.x = 1.2*i*spacing;
        } else if(i==3) {
            cp.x = 1.04*i*spacing;
        } else if(i==5) {
            cp.x = 1.03*i*spacing;
        }
        c.quadraticCurveTo(cp.x, cp.y, i*spacing, 25);
        c.lineTo((i-1)*spacing, ySpacing);
        var gradient = c.createLinearGradient(i*spacing, 0, (i-1)*spacing, ySpacing);
        gradient.addColorStop(0.35, mainColor);
        gradient.addColorStop(0.5, shadedColor);
        gradient.addColorStop(0.9, mainColor);
        c.strokeStyle = gradient;
        c.stroke();
    }

    //? Stage 2 Upper
    c.globalCompositeOperation = "source-over";
    c.beginPath();
    c.moveTo(0, ySpacing); 
    c.quadraticCurveTo(-spacing/2, ySpacing+spacing/2, 0, ySpacing+spacing);
    c.strokeStyle = mainColor;
    c.stroke();
    for(i=1; i<3; i++) {
        c.beginPath();
        c.moveTo(2*i*spacing, ySpacing);
        c.lineTo((2*i-1)*spacing, ySpacing+spacing);
        c.stroke();
    }
    //? Stage 2 Lower
    c.globalCompositeOperation = "destination-over";
    c.beginPath();
    for(i=1; i<3; i++) {
        c.beginPath();
        c.moveTo((2*i-1)*spacing, ySpacing);
        c.lineTo(2*i*spacing, ySpacing+spacing);
        c.strokeStyle = createGradient((2*i-1)*spacing, ySpacing, 2*i*spacing, ySpacing+spacing);
        c.stroke();
    }
    c.beginPath();
    c.moveTo(5*spacing, ySpacing); 
    c.quadraticCurveTo(5*spacing+spacing/2, ySpacing+spacing/2, 5*spacing, ySpacing+spacing);
    c.stroke();

    //? Stage 3 Upper
    c.globalCompositeOperation = "source-over";
    for(i=1; i<6; i+=2) {
        c.beginPath();
        c.moveTo((i-1)*spacing, ySpacing+spacing);
        c.lineTo(i*spacing, ySpacing+2*spacing);
        c.strokeStyle = mainColor;
        c.stroke();
    }
    //? Stage 3 Lower
    c.globalCompositeOperation = "destination-over";
    for(i=1; i<4; i++) {
        c.beginPath();
        c.moveTo((2*i-1)*spacing, ySpacing+spacing);
        c.lineTo((2*i-2)*spacing, ySpacing+2*spacing);
        c.strokeStyle = createGradient((2*i-1)*spacing, ySpacing+spacing, (2*i-2)*spacing, ySpacing+2*spacing);
        c.stroke();
    }

    //? Stage 4 Upper
    c.globalCompositeOperation = "source-over";
    c.beginPath();
    c.moveTo(0, ySpacing+2*spacing); 
    c.quadraticCurveTo(-spacing/2, ySpacing+5*spacing/2, 0, ySpacing+3*spacing);
    c.strokeStyle = mainColor;
    c.stroke();
    for(i=1; i<3; i++) {
        c.beginPath();
        c.moveTo(2*i*spacing, ySpacing+2*spacing);
        c.lineTo((2*i-1)*spacing, ySpacing+3*spacing);
        c.stroke();
    }
    //? Stage 4 Lower
    c.globalCompositeOperation = "destination-over";
    c.beginPath();
    for(i=1; i<3; i++) {
        c.beginPath();
        c.moveTo((2*i-1)*spacing, ySpacing+2*spacing);
        c.lineTo(2*i*spacing, ySpacing+3*spacing);
        c.strokeStyle = createGradient((2*i-1)*spacing, ySpacing+2*spacing, 2*i*spacing, ySpacing+3*spacing);
        c.stroke();
    }
    c.beginPath();
    c.moveTo(5*spacing, ySpacing+2*spacing); 
    c.quadraticCurveTo(5*spacing+spacing/2, ySpacing+5*spacing/2, 5*spacing, ySpacing+3*spacing);
    c.stroke();

    //? Stage 5 Upper
    c.globalCompositeOperation = "source-over";
    for(i=1; i<6; i+=2) {
        c.beginPath();
        c.moveTo((i-1)*spacing, ySpacing+3*spacing);
        c.lineTo(i*spacing, ySpacing+4*spacing);
        c.strokeStyle = mainColor;
        c.stroke();
    }
    //? Stage 5 Lower
    c.globalCompositeOperation = "destination-over";
    for(i=1; i<4; i++) {
        c.beginPath();
        c.moveTo((2*i-1)*spacing, ySpacing+3*spacing);
        c.lineTo((2*i-2)*spacing, ySpacing+4*spacing);
        c.strokeStyle = createGradient((2*i-1)*spacing, ySpacing+3*spacing, (2*i-2)*spacing, ySpacing+4*spacing);
        c.stroke();
    }

    //? Stage 6!!
    c.globalCompositeOperation = "source-over"
    for(i=0; i<6; i++) {
        c.beginPath();
        c.moveTo(i*spacing, ySpacing+4*spacing);

        cp.y = 4.3*spacing+ySpacing;
        switch(i) {
            case 0:
                cp.x = -0.3*spacing;
                break;
            case 1:
                cp.x = 1.3*i*spacing;
                break;
            case 2:
                cp.x = 0.83*i*spacing
                break;
            case 3:
                cp.x = 1.1*i*spacing;
                break;
            case 4:
                cp.x = 0.91*i*spacing;
                break;
            case 5:
                cp.x = 1.08*i*spacing;
                break;
        }
        c.quadraticCurveTo(cp.x, cp.y, i*spacing, ySpacing+5*spacing);
        c.strokeStyle = mainColor;
        c.stroke();
    }
    c.restore();
}


//!Implementation
var octopusHeight;
var heightUnit;
function init() {
    octopusHeight = canvas.height*(2/3);
    heightUnit = octopusHeight/9;
    color = colorOptions[randomInt(0, colorOptions.length-1)];
    mainColor = "hsl("+color.h+","+color.s+"%,"+color.l+"%)";
    shadedColor = "hsl("+color.h+","+color.s+"%,"+(color.l-30)+"%)";
    arm1 = randomInt(150, 180);
    arm2 = randomInt(0, 30);
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    drawUpperOctopus();
    drawLowerOctopus(0, 1);
}


//!User interaction
var userX;
var userY;
function userAction(e) {
    userX = e.clientX;
    userY = e.clientY;
    if(window.getComputedStyle(document.getElementById("screen-text")).display != "none") {
        animate();
    }
    init();
    document.getElementById("screen-text").style.display = "none";
}
// Tap and click
document.body.ontouchstart = function(e) {
    userAction(e);
};
document.body.onclick = function(e) {
    userAction(e);
}

// Move mouse or finger
// TODO wiggle !