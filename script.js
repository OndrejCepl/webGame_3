/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 20;
const enemiesArray = [];

let gameFrame = 0;
class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = './images/enemy4.png';
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 213;
        this.spriteHeight = 213;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1); 
        // this.angle = Math.random() * 2;

        // this.angle = Math.random();
        // this.angleSpeed = Math.random() * 2 + 0.5;
        // this.amplitude = Math.random() * 200 + 50;

        this.interval = Math.floor(Math.random() * 200 + 50);
        this.newX = Math.random() * (canvas.width);
        this.newY = Math.random() * (canvas.height);
    }
    updateCoordinates() {
        /**  move pattern of the first enemy */
        // this.x += Math.random() * 15 - 7.5;
        // this.y += Math.random() * 15 - 7.5;

        /** move pattern of the second enemy */ 
        // this.x -= this.speed;
        // this.y += Math.sin(this.angle) * this.amplitude;
        // this.angle += 0.05;

        /** move pattern of the third enemy */
        // this.x = canvas.width/2 * Math.sin(this.angle * Math.PI/200) + (canvas.width/2 - this.width/2);
        // this.y = canvas.height/2 * Math.cos(this.angle * Math.PI/360) + (canvas.height/2 - this.height/2);
        // this.angle += this.angleSpeed;

        /** move pattern of the fourth enemy */
        if (gameFrame % this.interval === 0) {
            this.newX = Math.random() * (canvas.width - this.width);
            this.newY = Math.random() * (canvas.height - this.height);
        }
        let dx = this.x - this.newX;
        let dy = this.y - this.newY;
        this.x -= dx/70;
        this.y -= dy/70;
        // this.x = 0; 
        // this.y = 0;
        // this.y += this.speed;
        if (this.x + this.width < 0) this.x = canvas.width;
        // animation of sprites
        if (gameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    draw() {
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
        // what we want to crop 
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, 
            this.spriteWidth, this.spriteHeight,  // where we want to diplay it
            this.x, this.y, this.width, this.height);
    }
};

for (let i = 0; i < numberOfEnemies; i++){
    enemiesArray.push(new Enemy());
}
console.log(enemiesArray);
function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
    enemiesArray.forEach(enemy => {
        enemy.updateCoordinates();
        enemy.draw();
    });
    gameFrame++;
    requestAnimationFrame(animate);

}
animate();