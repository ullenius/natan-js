/* Written by Anosh D. Ullenius 2019-03-29 */

/** MVC stuff
-----------------------------------------------------------------

 */

const DEFAULT_NUMBER = -1;

//MODEL in MVC
var model = {
		userInput : [],
		userAnswer : DEFAULT_NUMBER,
		correctAnswer : DEFAULT_NUMBER,
		points : 0,
		numberOne : DEFAULT_NUMBER,
		numberTwo : DEFAULT_NUMBER,
		/*
		* To display subtraction in question instead of addition (default). 
		* RNG ordering depends on size if subtraction is too be used. 
		* To avoid results less than 0 (< 0)
		*/
		subtraction : false, 
		clear : function() { // restore everything to default values
			this.userInput = [];
			this.userAnswer = DEFAULT_NUMBER;
			this.correctAnswer = DEFAULT_NUMBER;
		},
		/* generates the mathematical problem */
		generateQuestion : function() {

			let randomNumbers = getTwoRandomNumbers();
			const numberOne = randomNumbers[0]; // 2do: change these to upper-case
			const numberTwo = randomNumbers[1];
			var question = document.getElementById("question");

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
				this.subtraction = false;
				this.correctAnswer = numberOne + numberTwo;
			} else {
				// this code deals with subtraction
					this.subtraction = true;

				if (numberOne >= numberTwo) {
					this.correctAnswer = numberOne - numberTwo;
					this.numberOne = numberOne;
					this.numberTwo = numberTwo;
				} else {
					this.correctAnswer = numberTwo - numberOne;
					// swap the numbers
					this.numberOne = numberTwo;
					this.numberTwo = numberOne;
				}
			}
			console.log(numberOne);
			console.log(numberTwo);
			console.log("answer: " + calculator.correctAnswer);
		}
};

//VIEWER in MVC
var view = {

		// TODO: fixa denna metoden. Återställ kod som jag tog bort
		displayVictoryMessage : function(victory) { // boolean
			let resultMessage = document.getElementById("victory-message");
			let pointsMessage = document.getElementById("points");
			//  points++; // detta ska vara på ett annat ställe

			resultMessage.innerHTML = this.victoryMessage;
			pointsMessage.innerHTML = "Score: " + points + "/" + Number(counter+1) // 3 == total number of questions
		},
		clearMessagebox : function() {
			let victoryMessage = document.getElementById("victory-message");
			let pointsMessage = document.getElementById("points");
			victoryMessage.innerHTML = "";
			pointsMessage.innerHTML = "";
		},
		clearTextbox : function() {
			let textbox = document.getElementById("textbox");
			textbox.value = "";
		},
		addToTextbox : function(number) {
			let textbox = document.getElementById("textbox");
			textbox.value += number;
		},
		
		printQuestion : function() {
			// Refreshes data from the model and displays it
			// either addition or subtraction. Based on the boolean flag in the model
			let question = document.getElementById("question");
			
			if (model.subtraction === true) {
				question.innerHTML = model.numberOne + " - " + model.numberTwo + " = ?";
			} else { // this is for addition
				question.innerHTML = model.numberOne + " + " + model.numberTwo + " = ?";
			}
		},
		
		
		/*
		 * Switches visibility on and off for the start-button
		 */
		showButton : function(showButton,buttonName) { // showButton is boolean

			let button = document.getElementById(buttonName);
			if (showButton === true) {
				button.style.visibility = "visible";
			} else if (showButton === false) {
				button.style.visibility = "hidden";
			}
		}
};


//CONTROLLER
var controller = {
		victoryMessage : "Correct answer! Well done :)",
		failMessage : "Wrong answer :(",
		repetitions: 0,
		counter: 0,
		points : 0,

			startGame : function(numberOfQuestions) {
				/*
				 * Starts the game and cleans up DOM's and used variables
				 * in the calculator-object.
				 *
				 * This function is called asynchronously by the user
				 * when clicking the Start-button.
				 *
				 */
				console.log("numberOfQuestions = " + numberOfQuestions);
				repetitions = numberOfQuestions - 1;
				calculator.clear();

				view.clearMessagebox();
				view.clearTextbox();
				view.showButton(false,"start-button");
				view.showButton(true,"calculate-button");
				this.generateQuestion();

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
				this.points++;
				view.displayVictoryMessage(true);
			} else {
				view.displayVictoryMessage(false);
			}
			model.userAnswer = 0; // reset value before next turn
			view.clearTextbox();

			console.log("counter == " + this.counter);
			console.log("repetitions == " + this.repetitions);

			if (this.counter < this.repetitions) {
				this.counter++;
				generateQuestion();
			} else {
				view.showButton(true,"start-button");
				view.showButton(false,"calculate-button");
				this.points = 0; // set them to default values once again
				this.counter = 0;
			}
			
		}, // end of calculate-method
		

}; // END OF CONTROLLER

		/* end of MVC stuff
-----------------------------------------------------------------
		 */

window.onload = showButton(false,"calculate-button");


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

