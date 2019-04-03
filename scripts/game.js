/* Written by Anosh D. Ullenius 2019-03-29 */

/** MVC stuff
-----------------------------------------------------------------

todo: replace magic numbers (e.g. -1)

 */

const DEFAULT_NUMBER = -1;


var model = {
		userInput : [],
		userAnswer : DEFAULT_NUMBER,
		correctAnswer : DEFAULT_NUMBER,
		points : 0,
		clear : function() { // restore everything to default values
			this.userInput = [];
			this.userAnswer = DEFAULT_NUMBER;
			this.correctAnswer = DEFAULT_NUMBER;
		}

};

var view = {
		victoryMessage : "Correct answer! Well done :)",
		failMessage : "Wrong answer :(",
		displayVictoryMessage : function(points) {
			/* Points to be displayed is passed as an argument
    to this method by the *controller*
			 */
			let resultMessage = document.getElementById("victory-message");
			let pointsMessage = document.getElementById("points");
			//  points++; // detta ska vara på ett annat ställe

			resultMessage.innerHTML = this.victoryMessage;
			pointsMessage.innerHTML = "Score: " + points + "/" + Number(counter+1) // 3 == total number of questions
		},
		displayFailMessage : function() {
			/* Points to be displayed is passed as an argument
    to this method by the *controller*
			 *
			 *
			 * REFACTOR THIS LATER
			 */
			let resultMessage = document.getElementById("victory-message");
			let pointsMessage = document.getElementById("points");
			//  points++; // detta ska vara på ett annat ställe

			resultMessage.innerHTML = this.victoryMessage;
			pointsMessage.innerHTML = "Score: " + points + "/" + Number(counter+1) // 3 == total number of questions

		},
		hideButton : function(buttonName) {
			// do stuff
		},
		printVictoryMessage(model.userAnswer === model.correctAnswer); // send boolean to this method
		model.userAnswer = 0; // reset value before next turn

		clearTextbox();

		console.log("counter == " + this.counter);
		console.log("repetitions == " + this.repetitions);

		if (this.counter < this.repetitions) {
			this.counter++;
			generateQuestion();
		} else {
			showButton(true,"start-button");
			showButton(false,"calculate-button");
			this.points = 0; // set them to default values once again
			this.counter = 0;
		}
},
function clearMessagebox() {
	let victoryMessage = document.getElementById("victory-message");
	let pointsMessage = document.getElementById("points");
	victoryMessage.innerHTML = "";
	pointsMessage.innerHTML = "";
}

function clearTextbox() {
	let textbox = document.getElementById("textbox");
	textbox.value = "";
}

function addToTextbox(number) {
	let textbox = document.getElementById("textbox");
	textbox.value += number;
}
};


//CONTROLLER
var controller = {

		repetitions: 0,
		counter: 0,
		points : 0,

		startGame : function() {

		},

		addDigit : function(number) {
			/*
			 * This function is asynchronously called by the user
			 * when clicking on the digit-buttons
			 *
			 */
			model.userInput.push(number);
			addToTextbox(number);

			console.log(model.userInput);
			console.log("length = " + model.userInput.length);
		},

		calculate : function() {
			/*
			 * this method is asynchronously called by the
			 * user when clicking the "KLAR"-button (swedish for 'done/finished')
			 *
			 * iterates through the input array. Converts it to a number
			 * also contains the iteration loop for the game
			 */

			for (var pos in model.userInput) {
				model.userAnswer += '' + model.userInput[pos];
			}
			model.userInput = []; // emptying the array
			console.log("contents of array: " + model.userInput);

			model.userAnswer = Number(model.userAnswer);
			console.log("userAnswer === " + model.userAnswer);


			if (model.userAnswer === model.correctAnswer) {
				model.points++;
				view.displayVictoryMessage();

			}



		};




		/* end of MVC stuff
-----------------------------------------------------------------
		 */

		window.onload = showButton(false,"calculate-button");

		/*
		 * Helper function.
		 * Prints win/lose message based on validity of the answer
		 *
		 */
//		function printVictoryMessage(result) {

//		let victoryMessage = document.getElementById("victory-message");
//		let pointsMessage = document.getElementById("points");
//		let message;

//		console.log("result === " + result);

//		if (result === true) {
//		message = "Correct answer! Well done :)";
//		points++;
//		} else {
//		message = "Wrong answer :(";
//		}

//		victoryMessage.innerHTML = message;
//		pointsMessage.innerHTML = "Score: " + points + "/" + Number(counter+1) // 3 == total number of questions
//		}



		/* generates the mathematical problem and puts it in the DOM */
		function generateQuestion() {

			let randomNumbers = getTwoRandomNumbers();
			const numberOne = randomNumbers[0]; // 2do: change these to upper-case
			const numberTwo = randomNumbers[1];
			let question = document.getElementById("question");

			/**
			 * Randomize addition or subtraction. 50% proability
			 * Generates a random number 0 or 1
			 * Javascript converts it to a boolean, 0 == false, 1 == true
			 *
			 * true == do addition
			 * false == do subtraction
			 *
			 * The program avoids negative results when doing subtraction
			 * in order to make it easier for kids
			 *
			 */
			if (Math.floor(Math.random() *2)) { // true or false, 0 or 1
				question.innerHTML = numberOne + " + " + numberTwo + " = ?";
				calculator.correctAnswer = numberOne + numberTwo;
			} else {

				if (numberOne >= numberTwo) {
					question.innerHTML = numberOne + " - " + numberTwo + " = ?";
					calculator.correctAnswer = numberOne - numberTwo;
				} else {
					question.innerHTML = numberTwo + " - " + numberOne + " = ?";
					calculator.correctAnswer = numberTwo - numberOne;
				}
			}

			console.log(numberOne);
			console.log(numberTwo);
			console.log("answer: " + calculator.correctAnswer);
		}

		/*
		 * Helper function
		 * Switches visibility on and off for the start-button
		 */
		function showButton(showButton,buttonName) { // boolean

			let button = document.getElementById(buttonName);
			if (showButton === true) {
				button.style.visibility = "visible";
			} else {
				button.style.visibility = "hidden";
			}
		}

		/*
		 * Random comparator, used for randomized sorting (lambda)
		 * is used by getTwoRandomNumbers
		 */
		var randomComparator = function(numberOne, numberTwo) {

			if (numberOne === undefined || numberTwo === undefined) {
				alert("Incorrect input!");
			}
			if ((Math.floor(Math.random() *2)) == true) {
				return numberOne - numberTwo;
			}
			else {
				return numberTwo - numberOne;
			}
		}

		/*
		 * Returns an array
		 *
		 */
		function getTwoRandomNumbers() {

			const UPPER_LIMIT_ONE = 10;
			const UPPER_LIMIT_TWO = 29;
			let randomNumbers = [];

			randomNumbers[0] = Math.ceil(Math.random() * UPPER_LIMIT_ONE);
			randomNumbers[1] = Math.ceil(Math.random() * UPPER_LIMIT_TWO);
			randomNumbers.sort(randomComparator);

			return randomNumbers;
		}

		/*
		 * Starts the game and cleans up DOM's and used variables
		 * in the calculator-object.
		 *
		 * This function is called asynchronously by the user
		 * when clicking the Start-button.
		 *
		 */
		function startGame(numberOfQuestions) {

			console.log("numberOfQuestions = " + numberOfQuestions);
			repetitions = numberOfQuestions - 1;
			calculator.clear();

			clearMessagebox();
			clearTextbox();
			showButton(false,"start-button");
			showButton(true,"calculate-button");
			generateQuestion(); // debug-stuff
		}
