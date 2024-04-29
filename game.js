//Variables.
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Detect when a keyboard is pressed and starts the game.
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})

// Check which button was pressed and construct an array.
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id"); 
  userClickedPattern.push(userChosenColour);  
  playSound(userChosenColour);// User click sound.   
  animatePress(userChosenColour);// Animate the click when user choose a colour.  
  checkAnswer(userClickedPattern.length-1);// Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
});

// Random color generation on array.
function nextSequence () {
  userClickedPattern = []; //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  level++; //Increase the level by 1 every time the function is called.
  $("#level-title").text("Level " + level); //Updates the h1 title.
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);  
  // Animation.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  // Game order sound.
  playSound(randomChosenColour);
}

// Sounds.
  function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    // If you loose sound.    
  }
 
// Animation when Btn pressed.
  function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
      $("#" + currentColour).removeClass("pressed");
    }, 100);
  }

//Check answers.
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      // Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    // If you loose sound and background.
    playSound("wrong");
    // Flash red-light in background when you loose and change the h1 text.
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    //Restart the game
    startOver();
  }
}

//Restart.
function startOver() {  
    level = 0;
    gamePattern = [];
    started = false;  
}




