// QUESTION CONSTRUCTOR
function Question(text, choices, answer) {
	this.text = text; // string
	this.choices = choices; // array
	this.answer = answer; // string
}
Question.prototype.isCorrect = function(choice) {
	// Return TRUE if choice matches correct answer
	return this.answer === choice; 
};

// QUIZ CONSTRUCTOR
function Quiz(questions) {
	// Array of questions
	this.questions = questions;
	// Track which question you're on, starting with the first question
	this.currentQuestionIndex = 0;
	this.score = 0; // Score keeper
}
Quiz.prototype.getCurrentQuestion = function() {
	return this.questions[this.currentQuestionIndex];
};
Quiz.prototype.checkAnswer = function(answer) {
	if(this.getCurrentQuestion().isCorrect(answer)) {
		this.score++; // Add 1 point if correct
	}
	this.currentQuestionIndex++; // Get ready for next question
};
// Check if quiz end is reached
Quiz.prototype.hasEnded = function() {
	// Return TRUE only after last question
	return this.currentQuestionIndex >= this.questions.length;
};



// QUIZ UI
var QuizUI = {
	displayNext: function() {
		if(quiz.hasEnded()) {
			this.showResults();
		} else {
			this.displayQuestion();
			this.displayChoices();
			this.displayProgress();
			this.displayScore();
		}
	},
	displayQuestion: function() {
		this.populateIdWithHTML('question', quiz.getCurrentQuestion().text);
	},
	displayChoices: function() {
		var choices = quiz.getCurrentQuestion().choices;
		// Loop through each choice and display on page
		for(var i = 0; i < choices.length; i++) {
			var choiceId = 'choice' + i;
			var choiceText = choices[i];
			this.populateIdWithHTML(choiceId, choiceText);
			this.checkAnswerHandler(choiceId, choiceText);
		}
	},
	checkAnswerHandler: function(id, guess) {
		var button = document.getElementById(id);
		button.onclick = function() {
			quiz.checkAnswer(guess);
			QuizUI.displayNext();
		}
	},
	displayScore: function() {
		var scoreText = 'Score: ' + quiz.score;
		this.populateIdWithHTML('score', scoreText);
	},
	displayProgress: function() {
		var questionNumber = quiz.currentQuestionIndex + 1;
		var totalQuestions = quiz.questions.length;
		var progressText = 'Question ' + questionNumber + ' of ' + totalQuestions;
		this.populateIdWithHTML('progress', progressText);
	},
	showResults: function() {
		var grade = quiz.score/quiz.questions.length;
		var results = '<h2>';
		if(grade >= 0.8) {
			results += 'Excellent! You are very space smart.';
		} else if(grade < 0.8 && grade > 0.5) {
			results += 'Not Bad! You know a bit about space.';
		} else {
			results += 'Good Try! You could brush up on some of your space knowledge...';
		}
		results += '</h2><h3>Your final score is: ' + quiz.score + '</h3>';
		results += '<button id="reset">Okay</button>';
		this.populateIdWithHTML('quiz', results);
		this.resetQuizHandler();
	},
	resetQuizHandler: function() {
		var resetBtn = document.getElementById('reset');
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

// Hover effect - move button down
//var hoverBtn = document.getElementByTagName('button');
//hoverBtn.onmouseover = function() {
//	this.style['margin-top'] = '25px';
//}

// CREATE QUESTIONS
var questions = [
	new Question('Which is the closest planet to the Sun?', ['Mercury', 'Venus', 'Earth', 'Mars'], 'Mercury'),
	new Question('How many days does it take for the earth to orbit the Sun?', ['300 days', '365 days', '400 days', 'None of the above'], '365 days'),
	new Question('Why do astronauts who live on the space station have to exercise every day?', ['There is not much else to do, and exercising passes the time.', 'Astronauts need to stay in good shape.', 'It prevents their bones and muscles from weakening.','It helps them to sleep better at night.'], 'It prevents their bones and muscles from weakening.'),
	new Question('What is the ISS?', ['International Student Services', 'Inside Sun Secrets', 'Internal Space Society','International Space Station'], 'International Space Station'),
	new Question('For which one of the following purposes are satellites not used?', ['Transmitting signals over large distances', 'Changing Earth’s orbit', 'Monitoring changes in Earth’s environment over time','Collecting different types of weather data'], 'Changing Earth’s orbit'),
	];
// CREATE QUIZ & DISPLAY FIRST QUESTION
var quiz = new Quiz(questions);
QuizUI.displayNext();








