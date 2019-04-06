const DEFAULT_NUMBER = -1;
const QUESTIONS_PER_GAME = 10;

let model = {
  numberOne : DEFAULT_NUMBER,
  numberTwo : DEFAULT_NUMBER,
  numQuestions: QUESTIONS_PER_GAME,
  operator : '+', // if true, addition will be used
  clear : function() { // resets values to default
    this.numberOne = DEFAULT_NUMBER;
    this.numberTwo = DEFAULT_NUMBER;
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
		textbox.value += number;
  },
  clearTextbox : function() {
  let textbox = document.getElementById("textbox");
  textbox.value = "";
  },
  showButton : function(showButton,buttonName) { // boolean
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

// TEST CODE
view.displayMessage("hello world");
view.displayScore("Poäng: 100");
view.displayQuestion("1 +1 = ?");

// view.clearTextbox();
// clearQuestionbox();
// clearMessagebox();
