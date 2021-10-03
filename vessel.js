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

// Colours
var colourList = [
    "#E03939",
    "#CF404C",
    "#BE465F",
    "#AE4D72",
    "#9D5485",
    "#8C5A99",
    "#7B61AC",
    "#6B68BF",
    "#5A6ED2",
    "#4975E5",
]

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
function lineY(x, lineNumber) {
    switch(lineNumber) {
        case 1:
            return(-a*Math.cos(2*Math.PI*x/t)+a);
        case 2:
            return((-a/4)*Math.cos(4*Math.PI*x/t)+(5*a/4));
        case 3:
            return((a/4)*Math.cos(4*Math.PI*x/t)+(3*a/4));
        case 4:
            return((-a/4)*Math.cos(4*Math.PI*x/t)+(a/4));
        case 5:
            return((a/4)*Math.cos(4*Math.PI*x/t)-(a/4));
        case 6:
            return((-a/4)*Math.cos(4*Math.PI*x/t)-(3*a/4));
        case 7:
            return((a/4)*Math.cos(4*Math.PI*x/t)-(5*a/4));
        case 8:
            return(a*Math.cos(2*Math.PI*x/t)-a);
        default:
            return 0;
             
    }
}

//!Particle object
class Particle {
    constructor(position, lineNumber) {
        // Movement
        this.position = {"x":position.x, "y":position.y};
        this.lineNumber = lineNumber;
        // Style
        this.color = "black";
    }

    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, particleRadius, 0, Math.PI*2);
        c.closePath();
        c.fillStyle = this.color;
        c.fill();

    }

    update() {
        //? Line switching
        if(this.position.x > 0) {
            switch(this.lineNumber) {
                case 1:
                    // Jump to line 2
                    if(Math.abs(this.position.y-lineY(this.position.x, 2)) < particleRadius && this.position.x < canvas.width/2) {
                        if(particleVelocity > 2) {
                            this.lineNumber = randomInt(1, 2);
                        }
                    }
                    break;
                case 2:
                    // Return to line 1 (left side)
                    if(Math.abs(this.position.y-lineY(this.position.x, 1)) < particleRadius && this.position.x < canvas.width/2) {
                        this.lineNumber = randomInt(1, 2);
                    }
                    // Return to line 1 (right side)
                    if(Math.abs(this.position.y-lineY(this.position.x, 1)) < 2*particleRadius && this.position.x > canvas.width/2) {
                        this.lineNumber = 1;
                    }
                    // Jump to line 3
                    if(Math.abs(this.position.y-lineY(this.position.x, 3)) < particleRadius) {
                        if(particleVelocity > 8) {
                            this.lineNumber = randomInt(2, 3);
                        }
                    }
                    break;
                case 3:
                    // Return to line 4 (left side)
                    if(Math.abs(this.position.y-lineY(this.position.x, 4)) < particleRadius && this.position.x < canvas.width/2) {
                        this.lineNumber = randomInt(3, 4);
                    }
                    // Return to line 4 (right side)
                    if(Math.abs(this.position.y-lineY(this.position.x, 4)) < 2*particleRadius && this.position.x > canvas.width/2) {
                        this.lineNumber = 4;
                    }
                    // Jump to line 2
                    if(Math.abs(this.position.y-lineY(this.position.x, 2)) < particleRadius) {
                        if(particleVelocity > 8) {
                            this.lineNumber = randomInt(2, 3);
                        }
                    }
                    break;
                case 4:
                    // Jump to line 3
                    if(Math.abs(this.position.y-lineY(this.position.x, 3)) < particleRadius && this.position.x < canvas.width/2) {
                        if(particleVelocity > 7) {
                            this.lineNumber = randomInt(3, 4);
                        }
                    }
                    break;
                case 5:
                    // Jump to line 6
                    if(Math.abs(this.position.y-lineY(this.position.x, 6)) < particleRadius && this.position.x < canvas.width/2) {
                        if(particleVelocity > 7) {
                            this.lineNumber = randomInt(5, 6);
                        }
                    }
                    break;
                case 6:
                    // Return to line 5 (left side)
                    if(Math.abs(this.position.y-lineY(this.position.x, 5)) < particleRadius && this.position.x < canvas.width/2) {
                        this.lineNumber = randomInt(5, 6);
                    }
                    // Return to line 5 (right side)
                    if(Math.abs(this.position.y-lineY(this.position.x, 5)) < 2*particleRadius && this.position.x > canvas.width/2) {
                        this.lineNumber = 5;
                    }
                    // Jump to line 7
                    if(Math.abs(this.position.y-lineY(this.position.x, 7)) < particleRadius) {
                        if(particleVelocity > 8) {
                            this.lineNumber = randomInt(6, 7);
                        }
                    }
                    break;
                case 7:
                    // Return to line 8 (left side)
                    if(Math.abs(this.position.y-lineY(this.position.x, 8)) < particleRadius && this.position.x < canvas.width/2) {
                        this.lineNumber = randomInt(7, 8);
                    }
                    // Return to line 8 (right side)
                    if(Math.abs(this.position.y-lineY(this.position.x, 8)) < 2*particleRadius && this.position.x > canvas.width/2) {
                        this.lineNumber = 8;
                    }
                    // Jump to line 6
                    if(Math.abs(this.position.y-lineY(this.position.x, 6)) < particleRadius) {
                        if(particleVelocity > 8) {
                            this.lineNumber = randomInt(6, 7);
                        }
                    }
                    break;
                case 8:
                    // Jump to line 7
                    if(Math.abs(this.position.y-lineY(this.position.x, 7)) < particleRadius && this.position.x < canvas.width/2) {
                        if(particleVelocity > 2) {
                            this.lineNumber = randomInt(7, 8);
                        }
                    }
                    break;

            }
        }

        //? Colour
        for(var i=9; i>-1; i--) {
            if(this.position.x < (i+1)*colourBlock+canvas.width/3) {   
                this.color = colourList[i];
            }
        }

        //? Movement
        this.position.x += particleVelocity*(1+(Math.random()*0.6));
        if(this.position.x > canvas.width+particleRadius) {
            this.position.x = -particleRadius;
            this.lineNumber = startingLines[randomInt(0, 3)];
        }
        this.position.y = lineY(this.position.x, this.lineNumber);
        this.draw();
    }
}


//! Implementation
var particles;
var lineIndex = 0;
var startingLines = [1, 4, 5, 8];
var particleRadius = 10;
var particleVelocity = 0;
var speedUp = false;
var colourBlock = (canvas.width/3)/10;
var a;
var t;
function init() {
    a = (canvas.height-200)/4;//Amplitude of graphs
    t = canvas.width//Period of graphs
    colourBlock = (canvas.width/3)/10;
    // Set canvas context to correct axes
    c.translate(0, canvas.height/2);
    c.scale(1, -1);

    particles = [];

    for(let i=0; i<4; i++) {
        var position = {"x":-particleRadius, "y":0};
        var newParticle = new Particle(position, startingLines[lineIndex]);
        particles.push(newParticle);

        lineIndex ++;
        if(lineIndex > 3) {
            lineIndex = 1;
        }
    }
    for(let i=2; i<600; i++) {
        var position = {"x":-i*particleRadius, "y":0};
        var newParticle = new Particle(position, startingLines[randomInt(0, 3)]);
        particles.push(newParticle);
    }

}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, -canvas.height/2, canvas.width, canvas.height);

    if(speedUp) {
        if(particleVelocity < 10) {
            particleVelocity += 0.1;
        }
    } else {
        if(particleVelocity > 1) {
            particleVelocity -= 0.1;
        }
        if(particleVelocity < 0) {
            particleVelocity = 0.5;
        }
    }

    for(item of particles) {
        item.update();
    }
}

// Start
init();
animate();

//!User interaction
function userAction(userSetting) {
    document.getElementById("press-space").style.display = "none";
    speedUp = userSetting;
}

// Screen touched
document.body.ontouchstart = function() {
    userAction(true);
};
// Screen untouched
document.body.ontouchend = function() {
    userAction(false);
}
// Space pressed
document.body.onkeydown = function(e){
    if(e.keyCode == 32){
        userAction(true);
    }
}
// Space released
document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        userAction(false);
    }
}