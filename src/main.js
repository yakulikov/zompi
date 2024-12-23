const game = new Game();

/**
 * A function that's called once to load assets before the sketch runs
 */
function preload() {
  soundFormats('mp3', 'wav');

  game.spawnStarSfx = loadSound('assets/sound/spawn star.mp3');
  game.spawnStarSfx.setVolume(0.3);

  game.shotSfx = loadSound('assets/sound/shot1.mp3');
  game.shotSfx.setVolume(0.1);

  game.shotGoldSfx = loadSound('assets/sound/shot2.wav');
  game.shotGoldSfx.setVolume(0.1);

  game.musicSfx = loadSound('assets/sound/music.mp3');

  game.hitStarSfx = loadSound('assets/sound/hit star.wav');
  game.hitStarSfx.setVolume(0.2);

  game.cricketsSfx = loadSound('assets/sound/crickets.mp3');
  game.clickSfx    = loadSound('assets/sound/Menu Selection Click.wav');
  game.clickSfx.setVolume(0.5);

  for (let i = 1; i < 7; i++) {
    let enemyHit = loadSound(`assets/sound/aw0${i}.ogg`);
    enemyHit.setVolume(0.1);
    game.enemyHitSfx.push(enemyHit);
  }

  game.noAmmoSfx = loadSound('assets/sound/outofammo-1.ogg');
  game.noAmmoSfx.setVolume(0.15);

  game.reloadSfx = loadSound('assets/sound/reload.wav');
  game.reloadSfx.setVolume(0.2);

  game.crackSfx = loadSound('assets/sound/crack.mp3');

  game.wrongSfx = loadSound('assets/sound/wrong.wav');
  game.wrongSfx.setVolume(0.2);

  // Load images
  game.goldenGunImg    = loadImage('assets/1733592684690.png');
  game.powerUpImg      = loadImage('assets/1F31F_color.png');
  game.explosionImg    = loadImage('assets/1F4A5_color.png');
  game.playerImg       = loadImage('assets/1F64D_color.png');
  game.vampireImg      = loadImage('assets/1F9DB_color.png');
  game.zombieImg       = loadImage('assets/1F9DF_color (1).png');
  game.skullImg        = loadImage('assets/2620_color.png');
  game.gunImg          = loadImage('assets/image.png');
  game.bushImg         = loadImage('assets/1F333_color.png');
  game.heartImg        = loadImage('assets/2764_color (1).png');
  game.brockenHeartImg = loadImage('assets/1F494_color (1).png');
}

/**
 * A function that's called once when the sketch begins running
 */
function setup() {
  createCanvas(700, 500);
  frameRate(30);

  for (let i = 0; i < 28; i++) {
    const zombie      = new Sprite(random(0, 800), 500);
    zombie.img      = game.zombieImg;
    zombie.scale    = random(0.3, 0.6);
    zombie.collider = 'none';
    zombie.vel.x    = -1;

    game.menuEnemies.push(zombie);
  }
}

/**
 * A function that's called repeatedly while the sketch runs
 */
function draw() {
  if (game.screen === 'start') {
    let idk1 = 0;
    let idk2 = 0;

    background(0, 0, 100);
    strokeWeight(6);
    textAlign(CENTER);
    textSize(100);
    strokeWeight(10);
    stroke(25);

    fill(0, 200, 0);
    text('ZomPi', 350, 100);

    strokeWeight(6);
    textSize(25);

    // Hover over first button
    if (mouseX > 250 && mouseX < 450 && mouseY > 180 && mouseY < 220) {
      idk1 = 50;
    }

    fill(50 + idk1, 100 + idk1, 50 + idk1);
    rect(250, 180, 200, 50, 20);
    fill(0 + idk1, 200 + idk1, 0 + idk1);
    text('Play', 350, 210);

    // Hover over second button
    if (mouseX > 250 && mouseX < 450 && mouseY > 270 && mouseY < 320) {
      idk2 = 50;
    }

    fill(50 + idk2, 100 + idk2, 50 + idk2);
    rect(250, 270, 200, 50, 20);
    fill(0 + idk2, 200 + idk2, 0 + idk2);
    text('Rules', 350, 300);

    if (mouseIsPressed && idk1 === 50) {
      game.screen = 'setup';
      game.clickSfx.play();
    } else if (mouseIsPressed && idk2 === 50) {
      game.screen = 'rules';
      game.clickSfx.play();
      game.menuPlayer       = new Sprite();
      game.menuPlayer.img   = game.playerImg;
      game.menuPlayer.x     = 600;
      game.menuPlayer.y     = 385;
      game.menuPlayer.scale = 0.6;
    }

    // Loop of menu zombies
    for (let object = 0; object < 28; object++) {
      if (game.menuEnemies[object].x < -50) {
        game.menuEnemies[object].x     = 750 + random(0, 20);
        game.menuEnemies[object].scale = random(0.3, 0.6);
      }
    }
  } else if (game.screen === 'rules') {
    for (let i = 0; i < 28; i++) {
      game.menuEnemies[i].visible = false;
      game.menuEnemies[i].vel.x   = 0;
    }

    let idk3 = 0;
    if (mouseX > 100 && mouseX < 300 && mouseY > 420 && mouseY < 470) {
      idk3 = 50;
    }

    if (idk3 === 50 && mouseIsPressed) {
      game.clickSfx.play();
      for (let i = 0; i < 28; i++) {
        game.menuEnemies[i].visible = true;
        game.menuEnemies[i].vel.x   = -1;
        game.screen                 = 'start';
        game.menuPlayer.remove();
      }
    }

    background(0, 0, 100);
    textSize(40);
    textAlign(LEFT);

    fill(0, 200, 0);
    text('press LEFT CLICK to shoot;', 20, 35);
    text('aim with the MOUSE;', 20, 105);
    text('reload with key R;', 20, 175);
    text('solve maths questions to gain AMMO;', 20, 245);
    text('shoot down falling STARS\nto get POWER UP;', 20, 325);

    fill(50 + idk3, 100 + idk3, 50 + idk3);
    rect(100, 420, 200, 50, 20);

    textAlign(CENTER);
    textSize(25);
    fill(0, 200, 0);
    text('Back to menu', 200, 450);
  } else if (game.screen === 'setup') {
    strokeWeight(1);

    for (let i = 0; i < 3; i++) {
      let heart      = new Sprite();
      heart.img      = game.heartImg;
      heart.collider = 'none';
      heart.scale    = 0.05;
      heart.y        = 50;
      heart.x        = 20 + i * 30;
      game.hearts.push(heart);
    }

    for (let i = 0; i < 28; i++) {
      game.menuEnemies[i].remove();
    }

    game.player          = new Sprite(20, 300);
    game.player.img      = game.playerImg;
    game.player.scale    = 0.08;
    game.player.collider = 'static';

    game.gun          = new Sprite(50, 305);
    game.gun.img      = game.gunImg;
    game.gun.scale    = 0.07;
    game.gun.collider = "kinematic";
    game.gun.offset.y = 15;
    game.gun.layer    = 9;

    for (let i = 0; i < 5; i++) {
      let tmp = new Enemy(700 + i * random(100, 130), random(150, 480));
      game.enemies.push(tmp);
    }

    for (let i = 0; i < 10; i++) {
      let bush      = new Sprite(695 + random(-15, 10), 175 + i * 35);
      bush.img      = game.bushImg;
      bush.scale    = random(0.13, 0.15);
      bush.collider = 'none';
    }

    game.screen = 'game';
  } else if (game.screen == 'game') {

    // loop of enemies
    for (let object = 0; object < game.enemies.length; object++) {

      let newY = game.enemies[object].sprite.y + game.enemies[object].deltaY()
      if (newY > 150 && newY < 470) {
        game.enemies[object].sprite.y = newY
      }

      if (game.enemies[object].sprite.x < 50) {
        game.playerLifes -= 1
        game.hearts[game.playerLifes].img = game.brockenHeartImg
        game.crackSfx.play()

        if (game.playerLifes != 0) {
          game.enemies[object].death()

        } else {
          game.dead       = true
          game.player.img = game.skullImg
          game.gun.remove()

          for (let object = 0; object < game.enemies.length; object++) {
            game.enemies[object].sprite.vel.x *= -1
            game.enemies[object].sprite.vel.y *= -1
          }
        }
      }
    }

    // loop of projectiles
    game.projectiles     = game.projectiles.filter(object => !game.toDeleteEnemies.includes(object));
    game.toDeleteEnemies = []

    for (let projectile = 0; projectile < game.projectiles.length; projectile++) {

      game.projectiles[projectile].sprite.move(15, atan((game.projectiles[projectile].target_y - 305) / (game.projectiles[projectile].target_x - 50)), 100)

      if (game.projectiles[projectile].sprite.x > 700) {
        game.toDeleteEnemies.push(game.projectiles[projectile])
        game.projectiles[projectile].sprite.remove()
      }

      // on enemy hit
      for (let enemy = 0; enemy < game.enemies.length; enemy++) {
        if (game.projectiles[projectile].sprite.overlap(game.enemies[enemy].sprite)) {
          game.enemies[enemy].hp -= 1

          if (game.enemies[enemy].hp === 0) {
            if (game.enemies[enemy].type === 'classic') {
              game.score += 1
            } else {
              game.score += 2
            }

            game.enemies[enemy].death()
            random(game.enemyHitSfx).play()

          } else {
            game.enemies[enemy].sprite.scale = 0.08
            game.enemies[enemy].sprite.addCollider(0, 0, 50)
          }

          game.toDeleteEnemies.push(game.projectiles[projectile])
          game.projectiles[projectile].sprite.remove()
        }
      }

      // on power up hit
      for (let object = 0; object < game.powerUps.length; object++) {
        if (game.projectiles[projectile].sprite.overlap(game.powerUps[object].sprite)) {
          game.powerUps[object].sprite.remove()
          game.powerUps.splice(object, 1)
          game.toDeleteEnemies.push(game.projectiles[projectile])
          game.projectiles[projectile].sprite.remove()
          game.hitStarSfx.play()


          game.powerUpTimer = 150
        }
      }
    }

    // loop of explosion
    for (let object = game.explosions.length - 1; object >= 0; object--) {
      game.explosions[object].sprite.scale -= 0.002

      if (game.explosions[object].sprite.scale <= 0) {
        game.explosions[object].sprite.remove()
        game.explosions.splice(object, 1);
      }
    }

    // loop of power ups
    for (let object = 0; object < game.powerUps.length; object++) {
      game.powerUps[object].sprite.y += 2
      game.powerUps[object].sprite.x += game.powerUps[object].deltaX()

      if (game.powerUps[object].sprite.y > 550) {
        game.powerUps[object].sprite.remove()
        game.powerUps.splice(object, 1)
      }
    }

    // gun following the mouse logic
    if (!game.gunAnimation) {
      if (mouseX < 45) {
        game.gun.rotationSpeed = 0

      } else {
        game.gun.rotateTowards(mouse, 0.2)
      }

    } else if (game.gunCounter > 0) {
      game.gunCounter -= 1

    } else {
      game.gunAnimation = false
      game.ammo         = 6
    }

    background(0, 0, 100);
    fill(50, 100, 50)
    rect(0, 150, 700, 350)
    fill(255)
    textAlign(LEFT)

    // line(50, 300, mouseX, mouseY)

    if (!game.dead) {
      textSize(12)
      text(`${game.ammo}/6`, 11, 280)
      textSize(16)
      text(`score: ${game.score}`, 20, 30)

      if (game.powerUpTimer != 0) {
        fill(0, 255, 0)
        rect(5, 260, (game.powerUpTimer) / 10, 7)
        game.powerUpTimer -= 1
        game.ammo      = 6
        game.gun.img   = game.goldenGunImg
        game.gun.scale = 0.04

        if (mouseIsPressed && game.powerUpTimer % 2 == 0) {
          game.projectiles.push(new Projectile(mouseX, mouseY))
          game.shotGoldSfx.play()
        }
      } else {
        game.gun.img   = game.gunImg
        game.gun.scale = 0.07
      }

    } else {
      textAlign(CENTER)
      textSize(80)
      text('GAME OVER', 350, 210)
      textSize(60)
      text(`your final score: ${game.score}`, 350, 280)
    }

    if (game.reloading) {
      fill(255)
      rect(150, 20, 400, 110)
      fill(0)
      textAlign(CENTER);
      textSize(50)
      text(`${game.question[0]} ${game.question[1]} ${game.question[2]} = ${game.suggestion}`, 350, 85)
      fill(255)
    }
  }
}

/**
 * A function that's called once after a mouse button is pressed and released
 */
function mouseClicked() {
  if (game.screen === 'game' && game.ammo === 7) {
    game.ammo -= 1;
  } else if (game.ammo > 0 && !game.dead && game.powerUpTimer === 0 && game.screen === 'game') {
    game.projectiles.push(new Projectile(mouseX, mouseY));
    game.ammo -= 1;
    game.shotSfx.play();
  } else if (game.ammo === 0 && !game.dead && game.powerUpTimer === 0 && game.screen === 'game') {
    game.noAmmoSfx.play();
  }
}

/**
 * A function that's called once when any key is pressed
 */
function keyPressed() {
  if (key === 'r' && !game.dead) {
    game.askQuestion();
  }

  if (game.reloading) {
    if (game.mathsSymbols.includes(key)) {
      game.suggestion += key;
    }

    if (game.suggestion.length > 4) {
      game.reloading = false;
    }

    if (key === 'Enter') {
      if (game.suggestion === game.question[3]) {
        game.reloading = false;
        game.reload();
        game.reloadSfx.play();
      } else {
        game.reloading = false;
      }
    }

    if (key === 'Backspace') {
      game.suggestion = game.suggestion.substring(0, game.suggestion.length - 1);
    }
  }
}
