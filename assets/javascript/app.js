$(document).ready(function () {
    // questions//
    var options = [
        {
            question: "What was the first movie to prompt a PG-13 rating?",
            answers: ["Rocky", "Stand By Me", "Ghostbusters", "Indiana Jones and the Temple of Doom"],
            correctAnswer: 3,
            photo: "assets/images/IJTOD.jpg"
        },
        {
            question: "Which actor never appeared in the first four Batman movies?",
            answers: ["Kevin Spacey", "Drew Barrymore", "Christopher Walken", "Billy Dee Williams"],
            correctAnswer: 0,
            photo: "assets/images/batman.jpg"
        },
        {
            question: "What is the name of the hobbit played by Elijah Wood in the Lord of the Rings movies?",
            answers: ["Bilbo Baggins", "Samwise Gamgee", "Frodo Baggins", "Harry Goatleaf"],
            correctAnswer: 2,
            photo: "assets/images/LOTR.jpg"

        },
        {
            question: " Which film includes these 4 actresses ? Maya Rudolph, Kristen Wiig, Rose Byrne and Melissa McCarthy.?",
            answers: ["Anchorman 2: The Legend Continues", "Ghostbusters ", "Life of the Party ", "Bridesmades"],
            correctAnswer: 3,
            photo: "assets/images/bridesmaids.jpg"

        },
        {
            question: "What 1961 movie has Audrey Hepburn note: Personally, I think it's a bit tacky to wear diamonds before I'm 40?",
            answers: ["Sabrina", "Breakfast at Tiffany's", "Roman Holiday", "My Fair Lady"],
            correctAnswer: 1,
            photo: "assets/images/tiffanys.jpg"

        },
        {
            question: "Which actress plays Katniss Everdeen in the Hunger Games movies?",
            answers: ["Jennifer Lawrence ", "Shailene Woodley", "Kiera Knightley", "Emma Watson"],
            correctAnswer: 0,
            photo: "assets/images/hunger.jpg"

        },
        {
            question: "What is the name of the kingdom where the 2013 animated movie Frozen is set",
            answers: ["Arendelle", "Eruburg", "Arnor", "Gondor"],
            correctAnswer: 0,
            photo: "assets/images/frozen.jpg"
        },
        {
            question: "Which classic thriller movie stars Roy Schieder as the police chief Martin Brody",
            answers: ["Rosemary's Baby", "Exorcist", "Holloween", "Jaws"],
            correctAnswer: 3,
            photo: "assets/images/jaws.jpg"
        },
        {
            question: "Which Tom Hanks movie won the Academy Award for Best Picture in 1994?",
            answers: ["Cast Away", "Forrest Gump", "Green Mile ", "Philladelphia"],
            correctAnswer: 1,
            photo: "assets/images/forrest.jpg"

        },
        {
            question: "Which 1997 science fiction movie starring Will Smith and Tommy Lee Jones tells the story of a secret agency that polices alien refugees who are living on earth disguised as humans?",
            answers: ["Cowboys vs. Aliens ", "The Fugitive", "Men in Black", "Bad Boys"],
            correctAnswer: 2,
            photo: "assets/images/MIB.jpg"

        }];

    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 10;
    var intervalId;
    var userGuess = "";
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
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer--;

        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.answers[pick.correctAnswer] + "</p>");
            score();



        }
    }

    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array
    //display question and loop though and display answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random() * options.length);
        pick = options[index];


        console.log(`pick :  ${pick}
        options:  ${options}
        `)
        //	if (pick.shown) {
        //	generate new index until a question is picked that hasn't been used yet
        		// displayQuestion();
        //	} else {
        //		console.log(pick.question);
        //run answer array and display
        $("#questionblock").html("<h2>" + pick.question+ "</h2>");
        for (var i = 0; i < pick.answers.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.answers[i]);
            //assign array to check answer
            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);
            console.log(pick.answers);
        }



        //click function to select answer and outcomes
        $(".answerchoice").on("click", function () {
            //grab array position from userGuess
            userGuess = parseInt($(this).attr("data-guessvalue"));
            console.log("Correct answer: ", pick.answers[pick.correctAnswer]);
            console.log("userGuess: ", userGuess);

            //correct / incorrect//
            if (userGuess === pick.correctAnswer) {
                stop();
                correctCount++;
                userGuess = "";
                $("#answerblock").html("<p>Correct!</p>");
                score();
            } else {
                stop();
                wrongCount++;
                userGuess = "";
                $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.answers[pick.correctAnswer] + "</p>");
               score()
            }

        })
    }




    // scoring//
    function score() {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index, 1);

        var hidpic = setTimeout(function () {
            $("#answerblock").empty();
            timer = 10;
            //run the score screen if all questions answered
            if ((wrongCount + correctCount + unanswerCount) === qCount) {
                $("#questionblock").empty();
                $("#questionblock").html("<h3>Game Over!  Final Score: </h3>");
                $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>");
                $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>");
                $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>");
                $("#reset").show();
                correctCount = 0;
                wrongCount = 0;
                unanswerCount = 0;

            } else {
                runTimer();
                displayQuestion();
            }

        }, 1000);
    }
        // reset function//
        $("#reset").on("click", function () {
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



