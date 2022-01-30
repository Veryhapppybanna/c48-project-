var PLAY = 1;
var END = 0;
var gameState = PLAY

var dog, dogImg
var bush, bushImg
var bone, boneImg

var invisibleGround
var backgroundImg

score = 0;

function preload()
{
dogImg = loadImage("Dogrunning.gif")
bushImg = loadImage("grass.png")
boneImg = loadImage("bone.png")
backgroundImg = loadImage("Background.jpg")
}

function setup() {
	createCanvas(600, 200);

	dog = createSprite(50,180,20,50);
	dog.addImage(dogImg)
	dog.scale = 0.3

	invisibleGround = createSprite(200,190,400,10);
	invisibleGround.visible = false;

	bushGroup = new Group()
	boneGroup = new Group()

	score = 0;
}

function draw() {
  //dog.debug = true;
  background(backgroundImg);
 
  if (gameState === PLAY){
	fill("black")
	text("Score: "+ score, 500,50);
	
	fill("black")
	text("Press Space Bar to Jump", 50, 50)

	 	 score = score + Math.round(getFrameRate()/60);
  	     spawnBushes();
		 spawnBones();
  
	     if(keyDown("space") && dog.y >= 159) {
		 dog.velocityY = -12;
         }  

  		dog.velocityY = dog.velocityY + 0.5
 		dog.collide(invisibleGround);

        if(boneGroup.isTouching(dog)){
			score = score + 10
			boneGroup.destroyEach()
		}

  		 if(bushGroup.isTouching(dog)){
				gameState = END;
   		  }
   }  
	else if(gameState === END){
  		dog.velocityY = 0;
		dog.visible = false;

		textSize(75)
		fill("black")
		text("Game Over", 100, 100)
        textSize(15)
		fill("black")
		text("Your Score Was: "+ score, 200,150);

		bushGroup.destroyEach();
		boneImg.destroyEach();
    	bushGroup.setVelocityXEach(0);
		boneGroup.setVelocityXEach(0)
		bushGroup.setLifetimeEach(-1);
		boneGroup.setLifetimeEach(-1);
	}
drawSprites(); 
}

function spawnBushes() {
	if(frameCount % 60 === 0) {
	  var bush = createSprite(600,165,10,40);
	  //bush.debug = true;

        bush.velocityX = -(6 + 3*score/100);
	  	bush.addImage(bushImg);
		bush.scale = 0.1;
		bush.lifetime = 300;
	 	bushGroup.add(bush);
	}
  }

function spawnBones(){
	if(frameCount % 500 === 0){
		var bone = createSprite(600,165,10,40)
		bone.velocityX = -(6 + 3*score/100);
		bone.addImage(boneImg);
		bone.scale = 0.02;
		bone.lifetime = 300;
		boneGroup.add(bone);
	}
}


