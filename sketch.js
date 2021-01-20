//Create variables here
var snapchat, happysnapchat, database, foodS, foodStock, lastfeed;

function preload()
{
  //load images here
  snapchat = loadImage('images/dogImg.png');
  happysnapchat = loadImage('images/dogImg1.png');
}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(500, 500);
  
  snapchat = createSprite(250, 350, 10, 60);
  snapchat.addImage("dogImg.png");
  snapchat.scale = 0.5;

  //happysnapchat = createSprite(25);
  //happysnapchat.shapeColor="yellow";
  //happysnapchat.addImage("dogImg1.png");

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  foodStock.set(34);
  
}


function draw( ) {  
  text("Note: Press UP_ARROW key to feed Snapchat milk",50,50);
  text("Food Remainig: "+foodS, 150, 150);  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    snapchat.addImage(happysnapchat);
  }

  if(keyWentUp(UP_ARROW)){
    snapchat.addImage("dobImg.png"); 
  }

  if(foodS === 0){
 foodS = 35; 
  }
  drawSprites();
  //add styles here

  textSize(20)
  fill(black)
  stroke(20)
  
}

//to read values from DB
function readStock(data){
  foodS=data.val();
}

//to write values from DB
function writeStock(x){

  if(x<=0){
    x=0;
  } else{
    x=x-1;
  }


  database.ref("/").update({
    foodS:x
  })
}
