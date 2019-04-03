/* Written by Anosh D. Ullenius 2019-03-29 */

var calculator = {
  userInput: [], // stored as a string
  userAnswer: 0, // change name to userAnswer or similar
  correctAnswer: 0,
  clear : function() { // restore everything to default values
    this.userInput = [];
    this.userAnswer = 0;
    this.correctAnswer = 0;
  }
};

let repetitions;
let counter = 0;
let points = 0;
window.onload = showButton(false,"calculate-button");

/*
 * This function is asynchronously called by the user
 * when clicking on the digit-buttons
 *
 */
function addDigit(number) {
  calculator.userInput.push(number);
  addToTextbox(number);

  console.log(calculator.userInput);
  console.log("length = " + calculator.userInput.length);
}

/*
 * this method is asynchronously called by the
 * user when clicking the "KLAR"-button (swedish for 'done/finished')
 *
 * iterates through the input array. Converts it to a number
 * also contains the iteration loop for the game
 */
function calculate() {
  for (var pos in calculator.userInput) {
    calculator.userAnswer += '' + calculator.userInput[pos];
  }
  calculator.userInput = []; // emptying the array
  console.log("contents of array: " + calculator.userInput);

  calculator.userAnswer = Number(calculator.userAnswer);
  console.log("userAnswer === " + calculator.userAnswer);

  printVictoryMessage(calculator.userAnswer === calculator.correctAnswer); // send boolean to this method
  calculator.userAnswer = 0; // reset value before next turn

  clearTextbox();

  console.log("counter == " + counter);
  console.log("repetitions == " + repetitions);

  if (counter < repetitions) {
    counter++;
    generateQuestion();
  } else {
    showButton(true,"start-button");
    showButton(false,"calculate-button");
    points = 0; // set them to default values once again
    counter = 0;
  }
}

/*
* Helper function.
* Prints win/lose message based on validity of the answer
*
*/
function printVictoryMessage(result) {

  let victoryMessage = document.getElementById("victory-message");
  let pointsMessage = document.getElementById("points");
  let message;

  console.log("result === " + result);

  if (result === true) {
    message = "Correct answer! Well done :)";
    points++;
  } else {
    message = "Wrong answer :(";
  }

  victoryMessage.innerHTML = message;
  pointsMessage.innerHTML = "Score: " + points + "/" + Number(counter+1) // 3 == total number of questions
}

/* Helper function */
function clearMessagebox() {
  let victoryMessage = document.getElementById("victory-message");
  let pointsMessage = document.getElementById("points");
  victoryMessage.innerHTML = "";
  pointsMessage.innerHTML = "";
}

/* Helper function */
function clearTextbox() {
  let textbox = document.getElementById("textbox");
  textbox.value = "";
}

/* Helper function */
function addToTextbox(number) {
  let textbox = document.getElementById("textbox");
  textbox.value += number;
}

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
