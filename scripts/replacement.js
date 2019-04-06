const DEFAULT_NUMBER = -1;
const QUESTIONS_PER_GAME = 10;

let model = {
  numberOne : DEFAULT_NUMBER,
  numberTwo : DEFAULT_NUMBER,
  numQuestions: QUESTIONS_PER_GAME,
  subtraction: false, // if true, addition will be used
  clear : function() { // resets values to default
    this.numberOne = DEFAULT_NUMBER;
    this.numberTwo = DEFAULT_NUMBER;
  },
  isAnswerCorrect : function(answer) { // returns boolean
    if (subtraction) {
      return (answer === (numberOne - numberTwo));
    }
    return (answer === (numberOne + numberTwo)); // addition is default behaviour
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
  showButton : function(showButton,buttonName) { // (string,boolean)
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
function parseGuess(guess) {
  let total = "";
  for (let i = 0; i < guess.length; i++) {
    total += guess[i];
  }
  return total;
}

// TEST CODE
view.displayMessage("hello world");
view.displayScore("Poäng: 100");
view.displayQuestion("1 +1 = ?");

view.clearTextbox();
// clearQuestionbox();
// clearMessagebox();

view.addToTextbox(5);
view.addToTextbox(1);

let numbers = [1,1,5];
console.log(parseGuess(numbers));

model.generateQuestion();
console.log("model === " + JSON.stringify(model));
