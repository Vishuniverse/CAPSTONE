var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var scythe, ghostImg, wave, waveimg, wgroup, fac;
var invisibleBlockGroup, invisibleBlock, ivs;
var victim, victimimg, vgroup
var gameState = "play"
var score, wingimg, restart, restartimg

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  waveimg = loadImage("th.png");
  wingimg=loadImage("wing.png");
  victimimg = loadImage("victim.png");
  jumpImg = loadImage("ghost-jumping.png");
  gameover = loadImage("gameover.png");
  restartimg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 600);
  score=0
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  scythe=createSprite(100,100,20,20)
  scythe.addImage(ghostImg)
  scythe.scale=0.5
  scythe.setCollider("circle",0,0)
  climbersGroup=createGroup();
  doorsGroup=createGroup();
  vgroup=createGroup();
  wgroup=createGroup();
  invisibleBlockGroup=createGroup();
  fac=createSprite(600,600,20,20)
  fac.visible=false
  ivs=createSprite(1,600,600,10)
}

function draw() {
 background(200); 
  if(gameState==="play")
  {
    if(keyDown("space")){
      scythe.velocityY=-10
     
     //scythe.setAnimation(ghostImg);
    }
    scythe.velocityY=scythe.velocityY+0.8
    
    if(keyDown("right_arrow")){
      scythe.x=scythe.x+5
      fac.velocityY=+1
     //scythe.setAnimation(ghostImg)
    }
    if(keyDown("left_arrow")){
      scythe.x=scythe.x-5
      fac.velocityX=+1
     
     //scythe.setAnimation(ghostImg)
    }
    if(tower.y > 400){
      tower.y = 300
    }
    
    
    rails()

   if(climbersGroup.isTouching(scythe)||scythe.isTouching(ivs)){
      gameState="End";
   }
   if(invisibleBlockGroup.isTouching(scythe)){
    scythe.velocityY=2
   }
   if(keyDown("x")){
     wave=createSprite(scythe.x,scythe.y,20,20)
     wave.scale=0.2
     wave.addImage(waveimg);
     wgroup.add(wave)
     if(fac.velocityX>fac.velocityY){
      wave.velocityX=-2;
     }
     else{
      wave.velocityX=+2;
     }
   }
   if(wgroup.isTouching(vgroup)){
    wgroup.destroyEach();
    victim.destroy();
    score=score+1
    scythe.velocityY=-1
    if(score===24){
    scythe.addImage(wingimg)
    }
   }
  }
  if(gameState ==="End")
  {
    console.log("Game Over")
    scythe.x=300
    scythe.y=300
    scythe.velocityY=0
    scythe.addImage(gameover);
    tower.velocityY=0
    tower.addImage("tower",gameover);
    climbersGroup.destroyEach()
    invisibleBlockGroup.destroyEach()
    background("cyan")
    doorsGroup.destroyEach()
    restart = createSprite(300,300,50,50)
    restart.scale=0.5;
    restart.addImage(restartimg)
    restart.mouseClicked(Restart);

  }
  drawSprites();
}
function rails(){
  if(frameCount % 240===0){
    var climber=createSprite(100,100,40,10)
    climber.velocityY=1;
    climber.addImage(climberImg);
    climber.scale=0.5;
    climber.lifetime=800;
    climbersGroup.add(climber);
    
    invisibleBlock = createSprite(200,100,50,2);
    invisibleBlock.visible=true;
    invisibleBlock.velocityY=1
    invisibleBlock.debug=false
    invisibleBlock.lifetime=800;
    invisibleBlockGroup.add(invisibleBlock);

    door=createSprite(Math.round(random(100,500)),160,40,10)
    door.velocityY=1
    door.depth=door.depth
    door.addImage(doorImg)
    door.y=climber.y+20
    door.lifetime=800;
    doorsGroup.add(door)

    victim=createSprite(Math.round(random(100,500)),160,40,10);
    victim.addImage(victimimg)
    victim.scale=0.2
    victim.velocityY=1;
    victim.debug=false;
    victim.lifetime=800
    vgroup.add(victim);

    climber.x=door.x
    invisibleBlock.x=climber.x


    
  }
}
function Restart(){
  gameState="play"
  scythe=createSprite(100,100,20,20)
  scythe.addImage(ghostImg)
  scythe.scale=0.5
  scythe.setCollider("circle",0,0)

}
