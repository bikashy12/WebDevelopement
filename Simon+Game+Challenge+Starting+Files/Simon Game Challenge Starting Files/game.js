var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 1;
var randomNumber;
var flag = 0;
$(document).keypress(trigger);
  function trigger(){
  if(flag === 0){
    flag = 1;
    nextSequence();
     }
}

function nextSequence(){
    var newHeading = "Level " + level;
    $("h1").text(newHeading);
    randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level = level + 1;
}

$(".btn").click(function(){
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer((userClickedPattern.length)-1);
});

function playSound(name){
  var  soundPath = name + ".mp3";
  var buttonAudio = new Audio("sounds/" + soundPath);
  buttonAudio.play();
}

function animatePress(currentColour){
  $("."+currentColour).addClass("pressed");
  setTimeout(shadowStart, 100);
  function shadowStart(){
    $("."+currentColour).removeClass("pressed");
  }
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
    if(gamePattern.length == currentLevel+1){
      userClickedPattern = [];
      setTimeout(nextSequence, 1000);
    }
  }
  else {
    playSound("wrong"); 
    $("body").addClass("game-over");
    $("h1").text( "Game Over, Press Any Key to Restart");
    startOver();
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
  }
}

function startOver(){
  level = 1;
  flag = 0;
  gamePattern = [];
  userClickedPattern = [];
}
