gamePattern = [];
userClickedPattern = [];
buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var start = false;
var randomNumber;
var randomChosenColor;
$(document).keypress(function() {
  if (!start) {
    nextSquence();
    start = true;
  }
});

function nextSquence() {
  level++;
  $("#level-title").text("Level  " + level);
  randomNumber = Math.floor(Math.random() * 4) + 1;
  randomChosenColor = buttonColours[randomNumber-1];
  gamePattern.push(randomChosenColor);
  makeSound(randomChosenColor);
  animate(randomChosenColor);
}
$(".btn").click(function() {
  randomChosenColor = $(this).attr("id");
  userClickedPattern.push(randomChosenColor);
  makeSound(randomChosenColor);
  animate(randomChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(curLevel) {
  if (userClickedPattern[curLevel] === gamePattern[curLevel]) {
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        randomNumber = nextSquence();
      }, 1000);
      userClickedPattern = [];
    }
  }else {
    $("#level-title").text("Game Over Press Any Key to Restart");
    makeSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
    gameOver();
  }
}
function animate(randomChosenColor) {
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  $("#"+randomChosenColor).addClass("pressed");
  setTimeout(function () {
    $("#"+randomChosenColor).removeClass("pressed");
  },100);
}

function makeSound(randomChosenColor) {
  var audio = new Audio('sounds/' + randomChosenColor + '.mp3');
  audio.play();
}
function gameOver() {
  gamePattern = [];
  userClickedPattern = [];
  start = false;
  level = 0 ;
}
