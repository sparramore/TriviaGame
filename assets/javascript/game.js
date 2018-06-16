

$(document).ready(function() 
{
    $("#startButton").on("click",function(){
        HandleTriviaStart();
    });

    song = new Audio('assets/audio/music.mp3');
    initGame();
});

var questionCounter;
var questionList = ['What was the first movie to be filmed in TechnoColor?',
'Which hollywood actor starred in the most roles?',
'Which movie was first shot in Cinescope?',
'Which movie has the most goofs?',
'Which movie was the first to gross over 100 million dollars?'
];
var answerList = [
    ['Becky Sharp','Gone with the Wind','Jaws','The Shining'],
    ['Sidney Poitier','John Wayne','John Carradine','Jack Nicholson'],
    ['The Outsiders','The Birds','The Robe','Death Race'],
    ['Apocalypse Now','Harry Potter and the Prisoner of Azkaban','SuperMan 4: the Quest for Peace','The Lord of the Rings: Fellowship of the Ring'],
    ['Jaws',"Ocean's Eleven",'Gone with the Wind','Easy Rider'],
];
var correctAnswers = [0,1,2,0,0];
var questionTime;
var answeredCorrectly = 0;
var answeredIncorrectly = 0;
var missedAnswer = 0;
var intervalID = -1;

//once the start button is pushed song.play();
function HandleTriviaStart()
{
    startGame();
}

function startGame()
{
    //console.log("start!")
    //song.play();
    $("#startButton").hide();
    $("#middleSection").show();
    //start the timer for the question
    PostQuestion();
    $("#time-remaining").text("Time Remaining: " + questionTime);
    CountDown();
}

function buttonClick()
{
    console.log("buttonClick");
    var whichButton = $(this).attr("data-answer");
    if(whichButton === "-1")
    {
        resetGame();

    }
    else
    {
        handleAnswer(whichButton);
    }
}

function resetGame()
{
    initGame();
}

function handleAnswer(whichButton)
{
    //hide the buttons.
    $("#time-remaining").hide();
    $("#answer1").hide();
    $("#answer2").hide();
    $("#answer3").hide();
    $("#answer4").hide();
    //first we need to figure out if they answered correctly.
    // console.log(whichButton);
    // console.log(correctAnswers[questionCounter]);
    if(whichButton == correctAnswers[questionCounter])
    {
        //show that they answered the question correctly.
        var Correct = $("<p align='center' class='paragraph' >Correct!</p>");
        $("#mainTriviaBody").append(Correct);
        answeredCorrectly++;
    }
    else
    {
        var inCorrect = $("<p align='center' class='paragraph'>Incorrect!</p>");
        $("#mainTriviaBody").append(inCorrect);
        answeredIncorrectly++;
    }

    clearInterval(intervalID);

    var timeout = setTimeout(function(){
        $(".paragraph").hide();
        $("#time-remaining").show();
        $("#answer1").show();
        $("#answer2").show();
        $("#answer3").show();
        $("#answer4").show();
        questionTime = 30;
        console.log("still running");
        questionCounter++;
        PostQuestion();
        CountDown();
    }, 1000);

    //if we've reached the end of the game we need to give the user the option to reset.
    console.log(questionCounter);
    if(questionCounter === 4)
    {
        $("#time-remaining").hide();
        $("#question").hide();
        $("#answer1").hide();
        $("#answer2").hide();
        $("#answer3").hide();
        $("#answer4").hide();
        var resetGameButton = $("<button class='btn btn-primary resetButton' data-answer='-1'>Reset Game?</button>");
        var answeredCorrectlyParagraph = $("<p align='center' class='paragraph' id='answeredCorrectlyParagraph'>Questions Answered Correctly: </p>");
        $("#answeredCorrectlyParagraph").html = answeredCorrectly;
        var answeredIncorrectlyParagraph = $("<p align='center' class='paragraph' id='answeredIncorrectlyParagraph'>Questions Answered Incorrectly: </p>");
        var missedAnswerParagraph = $("<p align='center' class='paragraph' id='missedAnswerParagraph'>Missed Answers: </p>");
        $("#mainTriviaBody").append(answeredCorrectlyParagraph);
        $("#mainTriviaBody").append(answeredIncorrectlyParagraph);
        $("#mainTriviaBody").append(missedAnswerParagraph);
        $("#mainTriviaBody").append(resetGameButton);
        clearTimeout(timeout);
    }
}

function CountDown()
{
    questionTime = 30;
    //console.log("countDown!");
    intervalID = setInterval(function(){
        //console.log(questionTime);
        $("#time-remaining").text("Time Remaining: " + questionTime);
        questionTime--;
        if(questionTime <= 0)
        {
            questionTime = 30;
            questionCounter++;
            // console.log("we are done!");
            // console.log(questionCounter);
            PostQuestion();
            missedAnswer++;
            //do what we need to do in order to post the next question.
        }
      }, 1000)


}

function PostQuestion()
{
    $("#question").text(questionList[questionCounter]);
    $("#answer1").text(answerList[questionCounter][0]);
    $("#answer2").text(answerList[questionCounter][1]);
    $("#answer3").text(answerList[questionCounter][2]);
    $("#answer4").text(answerList[questionCounter][3]);
}

function initGame()
{
    //hide all assets but the startButton
    $("#time-remaining").show();
    $("#question").show();
    $("#answer1").show();
    $("#answer2").show();
    $("#answer3").show();
    $("#answer4").show();
    $(".paragraph").hide();
    $(".resetButton").hide();
    $("#startButton").show();
    $("#middleSection").hide();
    if(intervalID !== -1)
    {
        console.log("clearing interval");
        clearInterval(intervalID);
    }
    questionCounter = 0;
    questionTime = 30;
    answeredCorrectly = 0;
    answeredIncorrectly = 0;
    missedAnswer = 0;

}

$(document).on("click", ".btn", buttonClick);

//initGame();