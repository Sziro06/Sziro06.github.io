//.js filer som jeg har importet
import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";
import { score } from "./EnemyController.js";

// Under her er det variabeler
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let runde = 1;
let startButton = document.getElementById("start");
let name;
let namebox = document.getElementById("namebox");
let menu = document.getElementById("menu");
let togglenameboxandhighscoremenu = document.getElementById("togglenameboxandhighscoremenu");
togglenameboxandhighscoremenu.addEventListener("click", toggleNameboxAndHighscoreMenu)
let save = document.getElementById("showhighscores");
save.addEventListener("click", showhighscores);



//localStorage.setItem('highScores', JSON.stringify([]));
let highScores = JSON.parse(localStorage.getItem('highScores')) || [] && localStorage.setItem('highScores', JSON.stringify([]));
displayHighScores(highScores);


canvas.width = 600;
canvas.height = 450;

const background = new Image();
background.src = "grafisken/fyrstikkalleen.png";

const playerBulletController = new BulletController(canvas, 2, "grafisken/stein.png",true);
const enemyBulletController = new BulletController(canvas, 4, "grafisken/visma.png", false);
const enemyController = new EnemyController(
    canvas, 
    enemyBulletController,
    playerBulletController
    );
const player = new Player(canvas, 3, playerBulletController);

let isGameOver = false;
let didWin = false;
let setIntervalID = 0;

//funksjoner nede her
startButton.addEventListener("click", function() {
  setGameMode("start");
});

function setGameMode(mode) {
    let checkClickButton = false;
    // Gjør endringer i spillets logikk og visning basert på valgt modus
    if (mode === "start") {
        setIntervalID = setInterval(game, 900 / 60)
        menu.style.display = "none";
    } //if (checkClickButton){
    // }
}

function game() {
    checkGameOver();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayGameOver();
    name
    if (!isGameOver) {
        setGameMode();
        enemyController.draw(ctx);
        player.draw(ctx);
        playerBulletController.draw(ctx);
        enemyBulletController.draw(ctx);
    }
    else {
        checkGameOver();
        displayGameOver();
        clearInterval(setIntervalID)
    }
}

function displayGameOver(){
    if(isGameOver) {
        let text = didWin ? "DU VANT" : " DU TAPTE";
        let textOffset = didWin ? 3.5 : 5;
        ctx.fillStyle = "black";
        ctx.font = "70px Arial";
        ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
    }
}

function checkGameOver(){
    if (isGameOver) {
        if(isGameOver = true){
        document.getElementById('name').style.display = "block";

        }
        name = document.getElementById("name").value;
        highScores = updateHighScores(score, name, highScores);
        localStorage.setItem('highScores', JSON.stringify(highScores));
        displayHighScores(highScores);
    }
    if(enemyBulletController.collideWith(player)){
        isGameOver = true;
    }
    if(enemyController.collideWith(player)) {
        isGameOver = true;
    }
    if(enemyController.enemyRows.length === 0){
        runde += 1;
        enemyController.defaultXVelocity = runde;
        enemyController.defaultYVelocity = runde;
        enemyController.forceRight();
        enemyController.moveDownTimer = 0;
        if(runde === 2){
            enemyController.createBoss(enemyController.enemyMap2,56, 83, 10)
            background.src = "grafisken/kantina.png";
        }
        else if(runde === 3){
            enemyController.createEnemies(enemyController.enemyMap1,34, 42)
            background.src = "grafisken/fyrstikkalleen.png";
        } else if(runde === 4){
            enemyController.createBoss(enemyController.enemyMap3,94,92, 20)
            background.src = "grafisken/basketballBane.png";
             
        }
        }
    if(enemyController.enemyRows.length === 0) {
        didWin = true;
        isGameOver = true; 
        menu.style.display = "none";
    }
}

function updateHighScores(score, name, highScores) {
    const newScore = { name, score };
    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores = highScores.slice(0, 8);
    return highScores;
  }
  
function displayHighScores(highScores) {
    var highScoresList = document.getElementById('highScoresList');
    highScoresList.innerHTML = '';
  
    highScores.forEach(function(score, index) {
      var scoreElement = document.createElement('div');
      scoreElement.textContent = index + 1 + '.' + ' ' + score.name + ' - ' + score.score;
      highScoresList.appendChild(scoreElement);
    });
}

function showhighscores() {
    menu.style.display = "block";
    namebox.style.display = "none";
    togglenameboxandhighscoremenu.innerText = "Name";
    togglenameboxandhighscoremenu.style.left = "25%"
}

function toggleNameboxAndHighscoreMenu() {
    if (namebox.style.display === "block") {
        namebox.style.display = "none";
        menu.style.display = "block";
        togglenameboxandhighscoremenu.innerText = "Name";
        togglenameboxandhighscoremenu.style.left = "25%"
    } else {
        menu.style.display = "none";
        namebox.style.display = "block"; 
        togglenameboxandhighscoremenu.innerText = "Highscorelist";
        togglenameboxandhighscoremenu.style.left = "23%"
    }
}

if(highScores.length === 1 || highScores.length === 2) {
    startButton.style.left = '36%';
    startButton.style.top = '-70%';
} else if ( highScores.length === 3) {
    startButton.style.left = '38%';
    startButton.style.top = '-50%';
} else if (highScores.length === 4) {
    startButton.style.left = '38%';
    startButton.style.top = '-25%';
} else if (highScores.length === 5) {
    startButton.style.left = '38%';
    startButton.style.top = '-5%';
} else if (highScores.length === 6) {
    startButton.style.left = '38%';
    startButton.style.top = '0%';
} else if (highScores.length === 7) {
    startButton.style.left = '38%';
    startButton.style.top = '5%';
} else if (highScores.length === 8) {
    startButton.style.left = '38%';
    startButton.style.top = '10%';
}

//eksportet variabel.
export {runde};

//innebygd JavaScript funksjon. Koden kan endre hastigheten til spille.
//const setIntervalID = setInterval(game, 900 / 60)