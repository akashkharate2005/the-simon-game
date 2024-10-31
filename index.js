var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

$(document).keypress(function()
{   
    if(!started)
    {
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
})

$(".btn").click(function()
{
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userChosenColour);
});

function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var r13=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[r13];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}



function playSound(name)
{
    var aud=new Audio("sounds/"+name+".mp3");
    aud.play();
}

function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function()
    {
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel)
{
    if(gamePattern[userClickedPattern.length - 1] === userClickedPattern[userClickedPattern.length - 1])
    {
        console.log("Success");
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function()
        {
            nextSequence();
        },1000);
        }
    }
    else
    {
        console.log("wrong");
        $("body").addClass("game-over");
        var ad=new Audio("Sounds/wrong.mp3");
        ad.play();
        setTimeout(function()
    {
        $("body").removeClass("game-over");
    },200);
        $("#level-title").text("Game Over!");
        setTimeout(function()
    {
        window.location.reload();
    },1000);    
    }
}

function kbdpress(ke)
{
    var userChosenColour=ke;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userChosenColour);
}

$(document).keypress(function(event)
{
    if(event.key=="r")
    {kbdpress("red");}
    if(event.key=="g")
        {kbdpress("green");}
    if(event.key=="b")
        {kbdpress("blue");}
    if(event.key=="y")
        {kbdpress("yellow");}
})

