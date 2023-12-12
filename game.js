var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function startOver() {
    level = 0;
    gamePattern = [];
    
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }   
    }
    else{
        console.log("wrong");
        startOver();
        var wrongSound = new Audio("./sounds/wrong.mp3");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press any key to Restart.");
    }
}


function nextSequence(){

    userClickedPattern = [];

    var randomNumber  = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    var sound = new Audio("./sounds/" + randomChosenColour + ".mp3");
    sound.play();

    $("#level-title").text("Level "+ level);    
    level++;
}

$(".btn").click(function () { 
    var userChosenColour = $(this).attr("id"); 
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    function playSound(name) {
        var sound = new Audio("./sounds/" + name + ".mp3");
        sound.play();
    }

    function animatePress(currentColour) {
        $("#"+currentColour).addClass("pressed");
    }

    setTimeout(function() {
        $("#"+ userChosenColour).removeClass("pressed");
    }, 100);

    checkAnswer(userClickedPattern.length-1)
});

$(document).keypress(function(){
    nextSequence();
    //$("h1").text("Level 0")
});
