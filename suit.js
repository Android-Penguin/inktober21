// Define canvas
const canvas = document.getElementById("suit"); // Canvas element
var c = canvas.getContext("2d"); // Context
console.log(canvas);
// Canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// Resize
window.onresize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    reset("resize");
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

//!Card object
class Card {
    constructor(position, number, suit) {
        // Movement
        this.position = {"x":position.x, "y":position.y, "angle":position.angle};
        this.speed = 5;
        this.flightAngle = 0;
        this.acceleration = 0.5+Math.random();
        // Style
        this.number = number;
        this.suit = suit;
        this.width = 135;
        this.height = 210;
        this.cornerRadius = 20;
        // State variables
        this.movementState = 0;
    }

    draw() {
        // Save canvas origin
        c.save();
        // Move canvas origin to card coords
        c.translate(this.position.x, this.position.y);
        // Rotate around card coords by given angle
        c.rotate(toRad(this.position.angle));

        // Begin drawing, treating centre of card as (0,0)
        c.beginPath();
        // Start top left below corner
        c.moveTo(-this.width/2, -this.height/2+this.cornerRadius);
        // Draw top left corner
        c.arc(-this.width/2+this.cornerRadius, -this.height/2+this.cornerRadius, this.cornerRadius, toRad(180), toRad(270));
        // Draw top side
        c.lineTo(this.width/2-this.cornerRadius, -this.height/2);
        // Draw top right corner
        c.arc(this.width/2-this.cornerRadius, -this.height/2+this.cornerRadius, this.cornerRadius, toRad(270), toRad(0));
        // Draw right side
        c.lineTo(this.width/2, this.height/2-this.cornerRadius);
        // Draw bottom right corner
        c.arc(this.width/2-this.cornerRadius, this.height/2-this.cornerRadius, this.cornerRadius, toRad(0), toRad(90));
        // Draw bottom side
        c.lineTo(-this.width/2+this.cornerRadius, this.height/2);
        // Draw bottom left corner
        c.arc(-this.width/2+this.cornerRadius, this.height/2-this.cornerRadius, this.cornerRadius, toRad(90), toRad(180));
        // Draw left side
        c.lineTo(-this.width/2, -this.height/2+this.cornerRadius);
        c.closePath();

        // Style Shape
        c.save();
        c.shadowOffsetX = 3;
        c.shadowOffsetY = 3;
        c.shadowBlur = 3; 
        c.shadowColor = "grey";
        c.fillStyle = "hsl(0, 0%, 90%)";
        c.fill();
        c.restore();//Removes styling used in filling card

        // Card number
        var displayValue;
        switch(this.number) {
            // Ace
            case 1:
                displayValue = "A"
                break;
            // Jack
            case 11:
                displayValue = "J";
                break;
            // Queen
            case 12:
                displayValue = "Q";
                break;
            // King
            case 13:
                displayValue = "K";
                break;
            // Every other value
            default:
                displayValue = this.number;
                break;
        }
        // Card suit
        var charCode;
        switch(this.suit) {
            case "clubs":
                charCode = "0x2663";
                break;
            case "diamonds":
                charCode = "0x2666"
                break;
            case "hearts":
                charCode = "0x2665"
                break;
            case "spades":
                charCode = "0x2660"
                break;
        }

        // Generic text style
        if(this.suit == "clubs" || this.suit == "spades") {
            c.fillStyle = "black";
        } else {
            c.fillStyle = "red";
        }

        // Corner text style and print
        c.save();
        c.font = "35px Averia Gruesa Libre";
        c.textAlign = "center";
        c.textBaseline = "top";
        c.fillText(displayValue, -this.width/2+this.cornerRadius, -this.height/2+this.cornerRadius-10);
        c.fillText(String.fromCharCode(charCode), -this.width/2+this.cornerRadius, -this.height/2+this.cornerRadius+20);
        c.rotate(toRad(180));
        c.fillText(displayValue, -this.width/2+this.cornerRadius, -this.height/2+this.cornerRadius-10);
        c.fillText(String.fromCharCode(charCode), -this.width/2+this.cornerRadius, -this.height/2+this.cornerRadius+20);
        c.restore();

        // Centre text style and print
        c.font = "80px Averia Gruesa Libre";
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillText(String.fromCharCode(charCode), 0, 0);

        // Restore canvas origin to top left of page
        c.restore();
    }//End of draw

    update() {
        switch(this.movementState) {
            // Dummy state
            case 0:
                break;
            // Fly away
            case 1:
                this.position.x += Math.cos(toRad(this.flightAngle))*this.speed;
                this.position.y += Math.sin(toRad(this.flightAngle))*this.speed;
                this.speed += this.acceleration;

                if(this.position.x > canvas.width+250 || this.position.x < -canvas.width-250 ||
                   this.position.y > canvas.height+250 || this.position.y < -canvas.height-250) {
                    this.movementState = 2;
                }
                break;
            case 2:
                cardsGone ++
                console.log(cardsGone);
                if(cardsGone >= 52) {
                    reset("empty")
                }
                this.movementState = 0;
                break;
        }
        this.draw();
    }

    mouseClick(mouse) {
        if(distanceBetween(this.position, mouse) < this.width/2) {
            this.flightAngle = angleBetween(mouse, this.position);
            if(mouse.x > this.position.x) {
                this.flightAngle += 180;
            }
            this.movementState = 1;
        }
    }
}

//! Initialize cards
var cards;
var spawnLimit = 70;
function init() {
    cards = [];

    for (item of cardList) {
        
    }
    for (var i=0; i<cardList.length; i++) {
        var position = {"x":0, "y":0, "angle":0};
        position.x = randomInt(spawnLimit, canvas.width-spawnLimit);
        position.y = randomInt(spawnLimit, canvas.height-spawnLimit);
        position.angle = randomInt (0, 360);

        var newCard = new Card(position, cardList[i].number, cardList[i].suit);
        cards.push(newCard);
    }
}

//! Animation Loop
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (item of cards) {
        item.update();
    }
    if(animateSelf) {
        requestAnimationFrame(animate);
    } else {
        cancelAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);
    }
}

//! User interaction
var animateSelf = true;
var started = false;
var cardsGone = 0;
var screenText = document.getElementById("screen-text");
var mousePos = {"x":0, "y":0}
function reset(cause) {
    animateSelf = false;
    start = false;
    cardsGone = 0;
    if(cause == "resize") {
        screenText.innerHTML = "Click or tap to interact with canvas...";
    } else {
        screenText.innerHTML = "Click for more cards..."
    }
    screenText.style.display = "block";
}
function startFunction() {
    started = true;
    animateSelf = true;
    init();
    animate();
}
function clickAction(e) {
    if(getComputedStyle(screenText).display == "block") {
        screenText.style.display = "none";
        startFunction();
    } else {
        mousePos.x = e.clientX;
        mousePos.y = e.clientY;
        // console.log(mousePos);
        for (item of cards) {
            item.mouseClick(mousePos);
        }
    }
}
document.body.ontouchstart = function(e) {
    clickAction(e);
};
document.body.onclick = function(e) {
    clickAction(e);
};