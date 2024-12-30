var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
$(document).keypress(function(){
    if(!started){
        nextSequence();
        $("#level-title").text("Level "+level);
        started=true
    }
});
var user_click=-1;
$(".btn").click(function(){
    user_click+=1
    var userChosenColor=this.id;
    userClickedPattern.push(userChosenColor);
    play_sound(userChosenColor);
    animate_press(userChosenColor)
    checkAnswer(userClickedPattern.length-1)
});
function  nextSequence(){
    userClickedPattern=[]; 
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    play_sound(randomChosenColor);
    
}
function play_sound(name){
    var audio = new Audio("sounds/" + name+ ".mp3");
    audio.play();
}
function animate_press(currentColor){
    var a=$("#"+currentColor);
    a.addClass("pressed");
    setTimeout(function() { a. removeClass('pressed'); }, 100); 
}
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("Success");
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(nextSequence, 1000);
            
        }
    }
    else{
        console.log("Wrong");
        play_sound("wrong");
        $('body').addClass("game-over");
        setTimeout(function() { $('body'). removeClass('game-over'); }, 200);
        $('#level-title').text("Game Over Press Any Key to RESTART");
        startOver(); 
    }

}
function startOver(){
    level=0
    gamePattern=[]
    started=false
}

