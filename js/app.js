"use strict";
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 80;
    this.height = 70;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    allEnemies.forEach(function(enemy) {
            enemy.x += enemy.speed * dt;
            if (enemy.x > 504) {
                enemy.y = enemy.randomRow();
                enemy.x = -50;
            }
            // Check for collisions
            if (player.x < enemy.x + enemy.width && player.x + player.width > enemy.x && player.y < enemy.y + enemy.height && player.y + player.height > enemy.y) {
                player.restart();
                player.score = 0;
                player.deathScore++;
            }
        })
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.randomRow = function () {
    var rndRow = Math.floor((Math.random() * 3) + 1);
    var row;
    switch (rndRow) {
      case 1:
        row = 60;
        break;
      case 2:
        row = 140;
        break;
      case 3:
        row = 220;
        break;
    }
    return row;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-pink-girl2.png';
    this.x = 202;
    this.y = 404;
    this.x2 = 0;
    this.y2 = 0;
    this.width = 60;
    this.height = 60;
    this.score = 0;
    this.highScore = 0;
    this.deathScore = 0;
};

Player.prototype.update = function() {
    this.x += this.x2;
    this.x2 = 0;
    this.y += this.y2;
    this.y2 = 0;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(pressedKey) {
    switch (pressedKey) {
        case 'up':
            if (this.y > 64) {
                this.y2 = -85;
            } else {
                player.restart();
                player.score++;
            }
            break;
        case 'down':
            if (this.y < 404) {
                this.y2 = 85;
            }
            break;
        case 'left':
            if (this.x > 0) {
                this.x2 = -101;
            }
            break;
        case 'right':
            if (this.x < 404) {
                this.x2 = 101;
            }
            break;
    }
};

Player.prototype.restart = function() {
    this.x = 202;
    this.y = 404;
};

Player.prototype.showScores = function () {
    document.getElementById('score').innerHTML = player.score;
    if (player.score > player.highScore) {
      player.highScore = player.score;
    }
    document.getElementById('high-score').innerHTML = player.highScore;
    document.getElementById('death-score').innerHTML = player.deathScore;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(-50, 60, 35);
var enemy2 = new Enemy(-50, 140, 45);
var enemy3 = new Enemy(-50, 220, 58);
var enemy4 = new Enemy(-50, 220, 25);
var allEnemies = [enemy1, enemy2, enemy3, enemy4];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
