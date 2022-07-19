var bg,bgImg;
var player, shooterImg, shooter_shooting;
var life = 3
var gameState = "play"
var pontuation = 0
var bullets = 60

function preload(){
  zombieImg = loadAnimation("assets/zombieWalk/0.png","assets/zombieWalk/16.png")
  shooterImg = loadAnimation("assets/shotgun/0.png","assets/shotgun/19.png")
  
  bgImg = loadImage("assets/bg.jpeg")
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
  bulletImg = loadImage("assets/bullet1.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adicionando a imagem de fundo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.1
  

//criando o sprite do jogador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addAnimation("shooter",shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

  zombies = new Group()
  bulletGroup = new Group()

  heart1 = createSprite(displayWidth - 150,40,20,20)
  heart1.addImage("heart1",heart1Img)
  heart1.scale = 0.4
  heart1.visible = false

  heart2 = createSprite(displayWidth - 100,40,20,20)
  heart2.addImage("heart2",heart2Img)
  heart2.scale = 0.4
  heart2.visible = false

  heart3 = createSprite(displayWidth - 150,40,20,20)
  heart3.addImage("heart3",heart3Img)
  heart3.scale = 0.4
}

function draw() {
  background(0); 

  if (gameState == "play") {
    //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usan
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30
  }

  if(keyDown("DOWN_ARROW")||touches.length>0){
    player.y = player.y+30
  }

  if (life == 3) {
    heart3.visible = true
    heart2.visible = false
    heart1.visible = false
  }

  if (life == 2) {
    heart3.visible = false
    heart2.visible = true
    heart1.visible = false
  }

  if (life == 1) {
    heart3.visible = false
    heart2.visible = false
    heart1.visible = true
  }

  if (life == 0) {
    heart1.visible = false
    gameState = "end"
  }

  if (bullets == 0) {
    gameState = "bullets"
  }

  if (pontuation == 100) {
    gameState = "win"
  }
    
    //atire quando apertar a barra de espaço
  if(keyWentDown("space")){
    bullet = createSprite(player.x + 60,player.y + 15,20,10)
    bullet.addImage("bullet",bulletImg)
    bullet.scale = 0.09
    bullet.velocityX = 30
    bullets -= 1
    bulletGroup.add(bullet)
  }

  if (zombies.isTouching(bulletGroup)) {
    for (var i = 0; i < zombies.length; i++) {
      if (zombies[i].isTouching(bulletGroup)) {
        zombies[i].destroy()
        pontuation += Math.round(random(2,3))
      }
    }
  }

if (zombies.isTouching(player)) {
  for (var i = 0; i < zombies.length; i++) {
      if (zombies[i].isTouching(player)) {
          zombies[i].destroy()
          life -= 1
        }
      }
    }
    zombieSpawner()
  }

  drawSprites();

  if (gameState == "end") {
    textSize(100)
    text("FIM DO JOGO",width / 2 - 300,height / 2)
    zombies.destroyEach()
    player.destroy()
  }  

  else if (gameState == "win") {
    textSize(60)
    text("PARABÉNS, VOCÊ GANHOU!!",width / 2 - 300,height / 2)
    zombies.destroyEach()
    player.destroy()
  }

  else if (gameState == "bullets") {
    textSize(100)
    text("ACABOU A MUNIÇÃO...",width / 2 - 300,height / 2)
    zombies.destroyEach()
    player.destroy()
    bulletGroup.destroyEach()
  }

  textSize(20)
  fill("white")
  text("Vidas:" + life,displayWidth / 3,displayHeight / 2 - 300)
  text("Munição:" + bullets,displayWidth / 3,displayHeight / 2 - 270)
  text("Pontuação:" + pontuation,displayWidth / 3,displayHeight / 2 - 240)
}

function zombieSpawner(){
  if (frameCount % 80 == 0) {
    zombie = createSprite(width,random(500,height))
    zombie.addAnimation("zombie",zombieImg)
    zombie.velocityX = -6
    zombie.lifetime = 800
    zombies.add(zombie)
  }
}
