function Question(text, choices, answer) {
	this.text = text; // string
	this.choices = choices; // array
	this.answer = answer; // string
}
Question.prototype.isCorrect = function(choice) {
	// Return TRUE if choice matches correct answer
	return this.answer === choice; 
};

function Quiz2(questions) {
	// Array of questions
	this.questions = questions;
	// Track which question you're on, starting with the first question
	this.currentQuestionIndex = 0;
	this.score = 0; // Score keeper
}
Quiz2.prototype.getCurrentQuestion = function() {
	return this.questions[this.currentQuestionIndex];
};
Quiz2.prototype.checkAnswer = function(answer) {
	if(this.getCurrentQuestion().isCorrect(answer)) {
		this.score++; // Add 1 point if correct
	}
	this.currentQuestionIndex++; // Get ready for next question
};
// Check if quiz end is reached
Quiz2.prototype.hasEnded = function() {
	// Return TRUE only after last question
	return this.currentQuestionIndex >= this.questions.length;
};



var QuizUI2 = {
	displayNext: function() {
		if(quiz2.hasEnded()) {
			this.showResults();
		} else {
			this.displayQuestion();
			this.displayChoices();
			this.displayProgress();
			this.displayScore();
		}
	},
	displayQuestion: function() {
		this.populateIdWithHTML('question2', quiz2.getCurrentQuestion().text);
	},
	displayChoices: function() {
		var choices = quiz2.getCurrentQuestion().choices;
		// Loop through each choice and display on page
		for(var i = 0; i < choices.length; i++) {
			var choiceId = '2choice' + i;
			var choiceText = choices[i];
			this.populateIdWithHTML(choiceId, choiceText);
			this.checkAnswerHandler(choiceId, choiceText);
		}
	},
	checkAnswerHandler: function(id, guess) {
		var button = document.getElementById(id);
		button.onclick = function() {
			quiz2.checkAnswer(guess);
			QuizUI2.displayNext();
		}
	},
	displayScore: function() {
		var scoreText = 'Score: ' + quiz2.score;
		this.populateIdWithHTML('score2', scoreText);
	},
	displayProgress: function() {
		var questionNumber = quiz2.currentQuestionIndex + 1;
		var totalQuestions = quiz2.questions.length;
		var progressText = 'Question ' + questionNumber + ' of ' + totalQuestions;
		this.populateIdWithHTML('progress2', progressText);
	},
	showResults: function() {
		var grade = quiz2.score/quiz2.questions.length;
		var results = '<h2>';
		if(grade >= 0.8) {
    			results += 'Excellent! You are very very space smart.';
		} else if(grade < 0.8 && grade > 0.5) {
			results += 'Not Bad! Check out more of our articles here.';
		} else {
			results += 'Good Try! Check out more of our articles here.';
		}
		results += '</h2><h3>Your final score is: ' + quiz2.score + '</h3>';
		results += '<button id="reset2">Okay</button>';
		this.populateIdWithHTML('quiz2', results);
		this.resetQuizHandler();
	},
	resetQuizHandler: function() {
		var resetBtn = document.getElementById('reset2');
		// Reload quiz to start from beginning
		resetBtn.onclick = function() {
			window.location.reload(false);
		}
	},
	populateIdWithHTML: function(id, content) {
		var element = document.getElementById(id);
		element.innerHTML = content;
	}
};

var questions2 = quizQuestions = [
    new Question("What are the approximate measurements of a CubeSat?", [ "9cm x 9cm x 9cm", "10cm x 10cm x 10cm", "11cm x 11cm x 11cm", "12cm x 12cm x 12cm"], "10cm x 10cm x 10cm"),
    new Question("What is the most likely purpose of the Global Positioning System (GPS)?", ["Navigation", "Data collection", "Communication", "Sample collection"], "Navigation"),
    new Question("What benefits do uncrewed spacecraft provide to space scientists?", ["Instruments never commit errors", "Instruments can replace analysis by human scientists", "Instruments can be sent to places humans can't go", "Instruments require more environment than human flight does"],"Instruments can be sent to places humans can't go"),
    new Question("Which of these spacecraft can people use to travel to and from orbits close to Earth?", ["Space probe", "Space station", "Space shuttle", "Space telescope"],"Space shuttle"),
    new Question("In which of the following locations would you expect to find a satellite?", ["In the ocean", "On the surface of another planet", "In the desert", "Orbiting Earth"], "Orbiting Earth")
  ];
var quiz2 = new Quiz(questions2);
QuizUI2.displayNext();
