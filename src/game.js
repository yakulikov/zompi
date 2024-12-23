class Game {
  constructor() {
    this.screen             = 'start'
    this.player             = ''
    this.gun                = ''
    this.gunAnimation       = false
    this.reloading          = false
    this.gunCounter         = 0
    this.ammo               = 7
    this.symbols            = ['+', '-', '×', '÷']
    this.question           = ''
    this.mathsSymbols       = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-']
    this.suggestion         = ''
    this.dead               = false
    this.score              = 0
    this.zombieTypes        = ['classic', 'classic', 'classic', 'runner', 'small', 'big']
    this.enemiesKilled      = 0
    this.playerLifes        = 3
    this.explosions         = []
    this.powerUps           = []
    this.projectiles        = []
    this.toDeleteEnemies    = []
    this.toDeleteExplosions = []
    this.enemies            = []
    this.menuEnemies        = []
    this.hearts             = []
    this.powerUpTimer       = 0
    this.menuPlayer         = ''
    this.goldenGunImg       = ''
    this.powerUpImg         = ''
    this.explosionImg       = ''
    this.playerImg          = ''
    this.vampireImg         = ''
    this.zombieImg          = ''
    this.skull              = ''
    this.gunImg             = ''
    this.bushImg            = ''
    this.heartImg           = ''
    this.brockenHeartImg    = ''
    this.spawnStarSfx       = ''
    this.shotSfx            = ''
    this.shotGoldSfx        = ''
    this.musicSfx           = ''
    this.hitStarSfx         = ''
    this.cricketsSfx        = ''
    this.clickSfx           = ''
    this.enemyHitSfx        = []
    this.noAmmoSfx          = ''
    this.reloadSfx          = ''
    this.crackSfx           = ''
    this.wrongSfx           = ''
  }

  reload() {
    this.gun.rotationSpeed = 35
    this.gunAnimation      = true
    this.gunCounter        = 15
  }

  generateMathsQuestion() {
    let index  = random([0, 1, 2, 3])
    let symbol = this.symbols[index]

    let n1 = round(random(1, 10))
    let n2 = round(random(1, 10))

    let answer

    if (index === 3) {
      let multiple = round(random(1, 10))
      n1           = n2 * multiple
      answer       = round(n1 / n2)
    } else if (index === 2) {
      answer = n1 * n2
    } else if (index === 1) {
      if (n1 < n2) {
        let tmp = n2
        n2      = n1
        n1      = tmp
      }
      answer = n1 - n2
    } else {
      answer = n1 + n2
    }

    this.question = [n1, symbol, n2, answer]
  }

  askQuestion() {
    game.generateMathsQuestion()
    this.reloading  = true
    this.suggestion = ''
  }
}

class PowerUp {
  constructor() {
    this.sprite          = new Sprite(random(150, 600), -200)
    this.sprite.img      = game.powerUpImg
    this.sprite.collider = 'kinematic'
    this.sprite.scale    = 0.05
    this.sprite.addSensor(0, 0, 50)

    this.wobblines   = random(3, 5)
    this.wobbleSpeed = random(2, 3)
  }

  deltaX() {
    return sin(this.sprite.y * this.wobbleSpeed) * this.wobblines
  }
}

class Explosion {
  constructor(x, y) {
    this.sprite          = new Sprite(x, y)
    this.sprite.img      = game.explosionImg
    this.sprite.scale    = 0.1
    this.sprite.collider = 'none'
  }
}

class Projectile {
  constructor(target_x, target_y) {
    this.sprite        = new Sprite(50, 305);
    this.target_x      = target_x
    this.target_y      = target_y
    this.sprite.radius = 5
    this.sprite.color  = '#FFEB3B'
    this.layer         = 2
  }
}

class Enemy {
  constructor(x, y) {
    this.sprite       = new Sprite(x, y);
    this.sprite.img   = game.zombieImg
    this.sprite.scale = 0.08
    this.sprite.addCollider(0, 0, 50)

    this.speed = 0.6

    this.deltaSpeed = 0
    this.sprite.moveTowards(20, 300, (this.speed + this.deltaSpeed) / 1500)

    this.sprite.collider  = 'kinematic'
    this.layer            = 3
    this.wobbliness       = 2
    this.wobbleSpeed      = 3
    this.deltaWobbleSpeed = 0
    this.hp               = 1
    this.type             = 'classic'
  }

  changeType() {
    this.type = random(game.zombieTypes)

    if (this.type === 'classic') {
      this.sprite.img   = game.zombieImg
      this.wobbliness   = 2 * (this.speed + this.deltaSpeed)
      this.wobbleSpeed  = 3
      this.sprite.scale = 0.08
      this.speed        = 0.6
      this.sprite.addCollider(0, 0, 50)
      this.hp = 1

    } else if (this.type === 'runner') {
      this.sprite.img   = game.vampireImg
      this.wobbliness   = 0.6 * (this.speed + this.deltaSpeed)
      this.wobbleSpeed  = 3
      this.sprite.scale = 0.08
      this.speed        = 1.8
      this.sprite.addCollider(0, 0, 50)
      this.hp = 1

    } else if (this.type == 'big') {
      this.sprite.img   = game.zombieImg
      this.wobbliness   = 2 * (this.speed + this.deltaSpeed)
      this.wobbleSpeed  = 3
      this.sprite.scale = 0.12
      this.speed        = 0.4
      this.sprite.addCollider(0, 0, 100)
      this.hp = 2

    } else {
      this.sprite.img   = game.zombieImg
      this.wobbliness   = 2 * (this.speed + this.deltaSpeed)
      this.wobbleSpeed  = 3
      this.sprite.scale = 0.04
      this.speed        = 0.6
      this.sprite.addCollider(0, 0, 25)
      this.hp = 1

    }
  }

  deltaY() {
    return sin(this.sprite.x * (this.wobbleSpeed + this.deltaWobbleSpeed)) * this.wobbliness
  }

  death() {
    if (this.deltaSpeed < 1) {
      this.deltaSpeed += 0.2
      this.deltaWobbleSpeed += 0.1
    }

    if (game.powerUpTimer === 0) {
      game.enemiesKilled += 1
    }

    if (game.enemiesKilled > 39 && game.enemiesKilled % 20 === 0) {
      let tmp = new Enemy(700 + random(100, 500), random(150, 480))
      game.enemies.push(tmp)
    }

    if (game.enemiesKilled % 5 === 0 && game.powerUpTimer === 0) {
      game.powerUps.push(new PowerUp())
      game.spawnStarSfx.play()
    }

    game.explosions.push(new Explosion(this.sprite.x, this.sprite.y))

    this.changeType()

    this.sprite.x = 1000 + random(100, 500)
    this.sprite.y = random(150, 480)

    this.sprite.moveTowards(20, 300, (this.speed + this.deltaSpeed) / 1500)
  }
}

