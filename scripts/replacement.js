/* natan-js - number game for kids
* https://www.github.com/ullenius/natan-js
* Written by Anosh D. Ullenius in 2019
*
*/
const DEFAULT_NUMBER = -1;
const NO_QUESTIONS = 10;

let model = {
  userInput : [""],
  numberOne : DEFAULT_NUMBER,
  numberTwo : DEFAULT_NUMBER,
  numQuestions: NO_QUESTIONS,
  subtraction: false, // if true, addition will be used
  clear : function() { // resets values to default
    this.numberOne = DEFAULT_NUMBER;
    this.numberTwo = DEFAULT_NUMBER;
    this.userInput = [""];
  },
  addToUserInput : function(digit) {
    this.userInput.push(digit);
  },
  isAnswerCorrect : function(answer) { //
    /*
     * Returns a boolean
     *
     * Parameter *MUST* to be a Number, Strings will fail due to use of
     * strict comparison
     *
     */
    if (this.subtraction) {
      return (answer === (this.numberOne - this.numberTwo));
    }
    return (answer === (this.numberOne + this.numberTwo)); // addition is default behaviour
  },
  /* generates the mathematical problem and puts it in the DOM */
  generateQuestion : function() {
    let randomNumbers = getTwoRandomNumbers();
    let numberOne = randomNumbers[0]; // 2do: change these to -case
    let numberTwo = randomNumbers[1];
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
    if (Math.floor(Math.random() * 2)) { // true or false, 0 or 1
        this.subtraction = false;
        this.numberOne = numberOne;
        this.numberTwo = numberTwo;
        view.displayQuestion(this.numberOne + " + " + this.numberTwo + " = ?");
    } else { // subtraction
      this.subtraction = true;
      if (numberOne >= numberTwo) {
        view.displayQuestion(numberOne + " - " + numberTwo + " = ?")
        this.numberOne = numberOne; // reverse the ordering
        this.numberTwo = numberTwo;
      } else {
        view.displayQuestion(numberTwo + " - " + numberOne + " = ?");
        this.numberOne = numberTwo; // reverse the ordering
        this.numberTwo = numberOne;
      }
    }
    console.log(JSON.stringify(model));
  }
};

// View in MVC
// handles displaying everything on the DOM
let view = {
  displayMessage : function(message) { // displays message & score
    let resultMessage = document.getElementById("victory-message"); // need to rename this HTML-element
		resultMessage.innerHTML = message;
  },
  displayScore : function(message) {
    let pointsMessage = document.getElementById("points");
    pointsMessage.innerHTML = message;
  },
  displayQuestion : function(mathsProblem) {
    let question = document.getElementById("question");
    question.innerHTML = mathsProblem;
  },
  addToTextbox : function(digit) { // adds digit when user clicks a button
    let textbox = document.getElementById("textbox");
		textbox.value += digit;
  },
  clearTextbox : function() {
  let textbox = document.getElementById("textbox");
  textbox.value = "";
  },
  showButton : function(showButton,buttonName) { // (boolean,string)
    /*
    * Switches visibility on and off for button
    */
    var button = document.getElementById(buttonName);
    if (showButton === true) {
      button.style.visibility = "visible";
    } else {
      button.style.visibility = "hidden";
    }
  }
};

// helper functions
function clearMessagebox() {
  view.displayMessage("");
}

function clearQuestionbox() {
  view.displayQuestion("");
  view.displayScore("");
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

// parse user input
// takes a String array as input, parses it as number using the individual digits
// returns a NUMBER not a String
function parseGuess(guess) {
  let total = "";
  for (let i = 0; i < guess.length; i++) {
    total += guess[i];
  }
  return Number(total);
}

// CONTROLLER in MVC
let controller = {
  counter : 0,
  points : 0,
  no_questions: 10, // default value
  startGame : function(no_questions) { // when start-button is clicked
    view.clearTextbox();
    this.counter = 1;
    this.points = 0;
    view.showButton(false,"start-button");
    view.showButton(true,"calculate-button")
    this.playGame();
  },
  playGame : function() {
    model.clear(); // resetting model
    view.clearTextbox(); // clear input box

    if (this.counter <= this.no_questions) {
      model.generateQuestion();
      console.log("counter === " + this.counter); // debug message
    } else if (this.counter === this.no_questions) { // game is finished
      view.showButton(true,"start-button");
      view.showButton(false,"calculate-button");
    }
  },
  submitAnswer : function() {
    let userAnswer = parseGuess(model.userInput);
    if (model.isAnswerCorrect(userAnswer)) {
      this.points++;
      view.displayMessage("Correct answer! Well done :)");
    } else { // wrong answer
      view.displayMessage("Wrong answer :(");
    }
    this.counter++;
    view.displayScore("Score: " + this.points + "/" + NO_QUESTIONS);
    this.playGame(); // continue with the next question
  },
  addDigit : function(digit) {
    view.addToTextbox(digit);
    model.addToUserInput(digit);
  }
};

// event handler when page loads for the first time
window.onload = controller.startGame();

// TEST CODE -------------------------------------------------------
// view.displayMessage("hello world");
// view.displayScore("Poäng: 100");
// view.displayQuestion("1 +1 = ?");
//
view.clearTextbox();
// clearQuestionbox();
// clearMessagebox();
//
// view.addToTextbox(5);
// view.addToTextbox(1);
//
// let numbers = [1,1,5];
// console.log(parseGuess(numbers));
//
// model.generateQuestion();
console.log("model === " + JSON.stringify(model));

// END OF TEST CODE -------------------------------------------------------
