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
    init();
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

//!Card object
class Card {
    constructor(position, number, suit) {
        // Movement
        this.position = {"x":position.x, "y":position.y, "angle":position.angle};
        this.velocity = 5;
        this.acceleration = 0;
        // Style
        this.number = number;
        this.suit = suit;
        this.width = 180;
        this.height = 280;
        this.cornerRadius = 20;
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
        c.shadowOffsetX = 3;
        c.shadowOffsetY = 3;
        c.shadowBlur = 3; 
        c.shadowColor = "grey";
        c.fillStyle = "hsl(0, 0%, 90%)";
        c.fill();



        // Restore canvas origin to top left of page
        c.restore();
    }
}

//! Initialize cards
var cards;
function init() {
  cards = [];

  for (item of cardList) {
    // cards.push()
  }
}

//! Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  for (item of cards) {
      item.update;
  }
}

//! Manual stuff
init();
// animate();
var testPos = {"x":300, "y":300, "angle":-10};
var testCard =  new Card(testPos, 3, "diamonds");
testCard.draw();