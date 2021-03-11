var Count = 0;



var PLAY = 1;
var END = 0;
var gameState = PLAY;

var spaceShip, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;

var lazerGroup ,enemy , bullet ; 

var life = 2;

var bulletGroup ; 

localStorage["HighestScore"] = 0;

function preload(){

  spaceShipImg = loadImage("images/spaceShip1.png");
  
  groundImage = loadImage("images/background.png");

  sound = loadSound("Sound1.wav")

  enemyImg = loadImage("images/enemy2.png")
  lazerImg = loadImage("images/lazer.png")
  gameOverImg = loadImage("images/gameOver.png");
  restartImg = loadImage("images/reset.png");
  enemyBullet1 = loadImage("images/bullet9.png");
}

function setup() {
  createCanvas( windowWidth, windowHeight);
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  spaceShip = createSprite(50,180,280,200);
  
spaceShip.setCollider("rectangle",0,0,spaceShip.width,spaceShip.height)

  
 /* spaceShip.addAnimation("running", trex_running);
  spaceShip.addAnimation("collided", trex_collided);*/
  spaceShip.addImage("spaceShip",spaceShipImg);
  spaceShip.scale = 0.5;
  
  
  gameOver = createSprite(width/2,height/2);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2+200);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  
  cloudsGroup = new Group();
  enemyGroup = new Group();
  lazerGroup = new Group();
  bulletGroup = new Group();

 

  
  
  score = 0;
}

function draw() {
  
  background(255);
  
  if (gameState===PLAY){
  
    spawnEnemy();
    spaceShip.x = World.mouseX
    spaceShip.y = World.mouseY
  
  for(var i =0; i<enemyGroup.length;i++)


    if (enemyGroup.get(i).isTouching(lazerGroup)){
     
    
      enemyGroup.get(i).destroy();
       score=score+1;
      
      
       
    }
  
    if(enemyGroup.isTouching(spaceShip) || bulletGroup.isTouching(spaceShip)){
      sound.play();
    life=life-1;

 
    bulletGroup.destroyEach()

    if (life===0){
      gameState=END
    }
    
        
    }



    if (frameCount%10 === 0 ){

      spawnLazer();

    }

    
   
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    enemyGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the spaceShip animation
  //  spaceShip.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    enemyGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();

  textSize(20)
text("Score ="  +score,20,10)
text ("Life = "+life,40,50)
}





function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  enemyGroup.destroyEach();
  bulletGroup.destroyEach();
  life=2;
  
 
  
  score = 0;
  
}

function spawnEnemy(){
if(Count<10000){
for (var i =width/8; i <= width/2+500 ; i = i + 200 ){
 enemy = createSprite(i,100,20,20)


Count=Count+1
enemy.addImage(enemyImg);
enemy.scale=0.5;
enemyGroup.add(enemy);
if (frameCount%50===0){
var bullet = createSprite(enemy.x-18,enemy.y,20,20);
var bullet2 = createSprite(enemy.x+18,enemy.y+20,20,20)
bullet.velocityY = 10;
bullet.addImage(enemyBullet1);
bullet.scale=0.05;
bulletGroup.add(bullet)
bullet2.velocityY = 10;
bullet2.addImage(enemyBullet1);
bullet2.scale=0.05;
bulletGroup.add(bullet2);
}
}
}
}

function spawnLazer(){

var laxer = createSprite(mouseX,mouseY,20,20);

laxer.velocityY = -6
laxer.addImage(lazerImg);
//laxer.scale=0.1;
lazerGroup.add(laxer);

}
function spawnBullet(){

 // if (frameCount%80 === 0 ){


    var bullet = createSprite(enemy.x-18,enemy.y,20,20);
      var bullet2 = createSprite(enemy.x+18,enemy.y+20,20,20)
      bullet.velocityY = 4;
      bullet.addImage(enemyBullet1);
      bullet.scale=0.05;
      bulletGroup.add(bullet)
      bullet2.velocityY = 4;
      bullet2.addImage(enemyBullet1);
      bullet2.scale=0.05;
      bulletGroup.add(bullet2);
    }
//} 