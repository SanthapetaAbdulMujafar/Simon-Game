var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
level = 0;
started = false;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level - " + level);
        nextSequence();
        started = true;
    }
});

 function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("level - " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
}

$(".btn").click( function(){
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
       $("#" + currentColor).removeClass("pressed"); 
    }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(() => {
                nextSequence(); 
            }, 1000);
        }
    }
    else{
        $("#level-title").text("Game Over, Restart Again");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}
function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}
