$(document).ready(function () {
    // questions//
    var options=[
        {
            question: "What was the first movie to prompt a PG-13 rating?",
            answers: ["Rocky", "Stand By Me", "Ghostbusters", "Indiana Jones and the Temple of Doom"],
        correctAnswer: 3,

},
    {
        question: "Which actor never appeared in the first four Batman movies?",
        answers: ["Kevin Spacey", "Drew Barrymore", "Christopher Walken", "Billy Dee Williams"],
        correctAnswer: 0,

    },
    {
        question: "Cathryn and Sebastian were wealthy, step-siblings with a sinister plan. Annette was wholesome and pure and Sebastian fell head over heels for her.Do you remember the name of this movie ?",
        answers: ["The Secret Garden", "Dangerous Liasons", "Cruel Intentions", "The Burbs"],
        correctAnswer: 2,
    },
    {
        question: " Which film includes these 4 actresses ? Maya Rudolph, Kristen Wiig, Rose Byrne and Melissa McCarthy.?",
        answers: ["Anchorman 2: The Legend Continues", "Ghostbusters ", "Life of the Party ", "Bridesmades"],
        correctAnswer: 3,

    },
    {
        question: "What 1961 movie has Audrey Hepburn note: Personally, I think it's a bit tacky to wear diamonds before I'm 40?",
        answers: ["Sabrina", "Breakfast at Tiffany's", "Roman Holiday", "My Fair Lady"],
        correctAnswer: 1,

    },
    {
        question: "Which actress plays Katniss Everdeen in the Hunger Games movies?",
        answers: ["Jennifer Lawrence ", "Shailene Woodley", "Kiera Knightley", "Emma Watson"],
        correctAnswer: 0,

    },
    {
        question: "What is the name of the kingdom where the 2013 animated movie Frozen is set",
        answers: ["Gregor Clegane", "King Aerys", "He did it to himself", "Ser Iln Payne"],
        correctAnswer: 0,

    },
    {
        question: "Which classic thriller movie stars Roy Schieder as the police chief Martin Brody",
        answers: ["", "", "", "Jaws"],
        correctAnswer: 3,

    },
    {
        question: "Which Tom Hanks movie won the Academy Award for Best Picture in 1994?",
        answers: ["Cast Away", "Forrest Gump", "Green Mile ", "Philladelphia"],
        correctAnswer: 1,

    },
    {
        question: "Which 1997 science fiction movie starring Will Smith and Tommy Lee Jones tells the story of a secret agency that polices alien refugees who are living on earth disguised as humans?",
        answers: ["Cowboys vs. Aliens ", "The Fugitive", "Men in Black", "Bad Boys"],
        correctAnswer: 2,

    }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
    //	if (pick.shown) {
    //		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
    //		displayQuestion();
    //	} else {
    //		console.log(pick.question);
            //iterate through answer array and display
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                //assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
    //		}
    }
    
    
    
    //click function to select answer and outcomes
    $(".answerchoice").on("click", function () {
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
    
        //run the score screen if all questions answered
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })
   

    