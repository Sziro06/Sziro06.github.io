export default class Bullet {
    constructor(canvas, x, y, velocity, bulletImage) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        //this.bulletImage = bulletImage;

        this.width = 20; 
        this.height = 20;
        this.image = new Image();
        this.image.src = bulletImage;
    }

    draw(ctx){
        this.y -= this.velocity;
        ctx.fillStyle = this.bulletColor;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    //sjekker kollisjoner (hitboksen til karakterene)
    collideWith(sprite) {
        if (
            this.x + this.width > sprite.x &&
            this.x < sprite.x + sprite.width &&
            this.y + sprite.height > sprite.y +36 &&
            this.y < sprite.y + sprite.height
        ) {
            return true;
        } else {
            return false;
        }
 }
}