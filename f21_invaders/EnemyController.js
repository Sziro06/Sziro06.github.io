import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";
import {runde} from "./F21_Invaders.js";

let bossLiv = 8;
let isBoss = false;
let score = 0;

//class
export default class EnemyController {
    
    //enemies posistion
    enemyMap1 =[
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2, 2, 2, 2, 2],
        [3, 3, 3, 3, 3, 3, 3, 3, 3],
        [4, 4, 4, 4, 4, 4, 4, 4, 4],
    ];
    enemyMap2 =[
        [6]
    ];
    enemyMap3 =[
        [5]
    ];

    enemyRows = [];

    

    currentDirection = MovingDirection.right;
    xVelocity = 0;
    yVelocity = 0;  
    defaultXVelocity = 1;
    defaultYVelocity = 1;
    moveDownTimerDefault = 30;
    moveDownTimer = this.moveDownTimerDefault;
    fireBulletTimerDefault = 100;
    fireBulletTimer = this.fireBulletTimerDefault;
    
    constructor(canvas, enemyBulletController, playerBulletController){
      this.canvas = canvas;
      this.enemyBulletController = enemyBulletController;
      this.playerBulletController = playerBulletController;

      this.enemyDeathSound = new Audio('lyd/');
      this.enemyDeathSound.volume = 0.5;  

      this.createEnemies(this.enemyMap1, 34, 42);
    }

    draw(ctx){
        this.decrementMoveDownTimer();
        this.updateVelocityAndDirection();
        this.collisionDetection();
        this.drawEnemies(ctx);
        this.resetMoveDownTimer();
        this.fireBullet();
    }

    collisionDetection() {
        this.enemyRows.forEach((enemyRow) => {
            enemyRow.forEach((enemy, enemyIndex) => {
                if (this.playerBulletController.collideWith(enemy)) {
                    this.enemyDeathSound.currentTime = 0;
                    this.enemyDeathSound.play();
                    if(isBoss && bossLiv >= 0){
                        bossLiv -= 1
                    } else {
                        if (isBoss){
                            score += 4000;
                        } else{
                        score += 200;
                        }
                        document.getElementById("telleren").innerHTML = score + "<br>poeng";
                        enemyRow.splice(enemyIndex, 1);
                        isBoss = false;
                    }
                }
            });
        });

        this.enemyRows = this.enemyRows.filter((enemyRow) => enemyRow.length > 0);
    }

    fireBullet(){
        this.fireBulletTimer--;
        if (this.fireBulletTimer <= 0) {
            this.fireBulletTimer = this.fireBulletTimerDefault;
            const allEnemies = this.enemyRows.flat();
            const enemyIndex = Math.floor(Math.random() * allEnemies.length);
            const enemy = allEnemies[enemyIndex];
            this.enemyBulletController.shoot(enemy.x, enemy.y, -3);
            console.log(enemyIndex);
        }
    }

    resetMoveDownTimer(){
        if (this.moveDownTimer <= 0) {
            this.moveDownTimer = this.moveDownTimerDefault / runde;
        }
    }

    decrementMoveDownTimer(){
        if(
        this.currentDirection === MovingDirection.downLeft || 
        this.currentDirection === MovingDirection.downRight
        ){
            this.moveDownTimer--;
        }
    }

    updateVelocityAndDirection(){
        for(const enemyRows of this.enemyRows) {
            if(this.currentDirection == MovingDirection.right) {
                this.xVelocity = this.defaultXVelocity;
                this.yVelocity = 0;
                const rightMostEnemy = enemyRows[enemyRows.length -1];
                if(rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width){
                    this.currentDirection = MovingDirection.downLeft;
                    break;
                }
            } else if (this.currentDirection === MovingDirection.downLeft) {
                if(this.moveDown(MovingDirection.left)) {
                    break;
                }
            }else if(this.currentDirection === MovingDirection.left){
                this.xVelocity = -this.defaultXVelocity;
                this.yVelocity = 0;
                const leftMostEnemy = enemyRows[0];
                if(leftMostEnemy.x <= 0) {
                    this.currentDirection = MovingDirection.downRight;
                    break;
                }
            } else if(this.currentDirection === MovingDirection.downRight){
                if(this.moveDown(MovingDirection.right)) {
                    break;
                }
            }
        }
    }

    forceRight(){
        this.xVelocity = -this.defaultXVelocity;
        this.currentDirection = MovingDirection.right;
    }

    moveDown(newDirection) {
        this.xVelocity = 0;
        this.yVelocity = this.defaultYVelocity;
        if(this.moveDownTimer <= 0){
            this.currentDirection = newDirection;
            return true;
        }
        return false;
    }

    drawEnemies(ctx){
        this.enemyRows.flat().forEach((enemy) => {
            enemy.move(this.xVelocity, this.yVelocity);
            enemy.draw(ctx);
        })
    }

    createBoss(enemyMap1,w,h,liv){
        this.createEnemies(enemyMap1,w,h);
        bossLiv = liv;
        isBoss = true;
    }

    createEnemies(enemyMap1,w,h) {
        enemyMap1.forEach((row, rowIndex) => {
            this.enemyRows[rowIndex] = [];
            row.forEach((enemyNumber, enemyIndex) => {
                if (enemyNumber > 0) {
                    this.enemyRows[rowIndex].push(
                        new Enemy(enemyIndex * 50, rowIndex * 50, enemyNumber,w,h)
                    );
                }
            });
        });
    };

    collideWith(sprite){
        return this.enemyRows.flat().some(enemy=>enemy.collideWith(sprite));
    }
}

export {score};