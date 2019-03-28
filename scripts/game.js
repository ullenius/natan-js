/* written by Anosh D. Ullenius 2019-03-29 */

var calculator = {
  userInput: [], // stored as a string
  sum: 0, // change name to userAnswer or similar
  correctAnswer: 0,
  clear : function() { // restore everything to default values
    this.userInput = [];
    this.sum = 0;
    this.correctAnswer = 0;
  }
};

var repetitions;
var counter = 0;
var points = 0;
window.onload = showButton(false,"calculate-button");

function addDigit(number) {
  calculator.userInput.push(number);
  addToTextbox(number);

  console.log(calculator.userInput);
  console.log("length = " + calculator.userInput.length);
}

function calculate() {
  for (var pos in calculator.userInput) {
    calculator.sum += '' + calculator.userInput[pos];
  }
  calculator.userInput = []; // emptying the array
  console.log("contents of array: " + calculator.userInput);

  calculator.sum = Number(calculator.sum);
  console.log("sum === " + calculator.sum);

  printVictoryMessage(calculator.sum === calculator.correctAnswer); // send boolean to this method
  calculator.sum = 0; // reset value before next turn

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

/* prints win/lose message if answer is correct */
function printVictoryMessage(result) {

  let victoryMessage = document.getElementById("victory-message");
  let pointsMessage = document.getElementById("points");

  let message;

  console.log("result === " + result);

  if (result === true) {
    message = "Rätt svar! Bra jobbat Natan! :)";
    points++;
  } else {
    message = "Fel svar :(";
  }

  victoryMessage.innerHTML = message;
  pointsMessage.innerHTML = "Poäng: " + points + "/" + Number(counter+1) // 3 == total number of questions
}

function clearMessagebox() {
  let victoryMessage = document.getElementById("victory-message");
  let pointsMessage = document.getElementById("points");
  victoryMessage.innerHTML = "";
  pointsMessage.innerHTML = "";
}

function clearTextbox() {
  var textbox = document.getElementById("textbox");
  textbox.value = "";
}

function addToTextbox(number) {
  var textbox = document.getElementById("textbox");
  textbox.value += number;
}

function generateQuestion() {
  let numberOne = Math.ceil(Math.random() * 10);
  let numberTwo = Math.ceil(Math.random() * 29);

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

// switches visibility on and off for the start-button
function showButton(showButton,buttonName) { // boolean

  var button = document.getElementById(buttonName);
  if (showButton === true) {
    button.style.visibility = "visible";
  } else {
    button.style.visibility = "hidden";
  }
}

/*
  * random comparator, used for randomized sorting (lambda)
  *
  *
  */
var randomComparator = function(numberOne, numberTwo) {

  if (numberOne === undefined || numberTwo === undefined) {
    alert("Incorrect input!");
  }

  if ((Math.floor(Math.random() *2) == true) {
    return numberOne - numberTwo;
  }
  else {
    return numberTwo - numberOne;
  }
}

// returns array
function getTwoRandomNumbers() {

  const UPPER_LIMIT_ONE = 10;
  const UPPER_LIMIT_TWO = 29;
  let randomNumbers = [];

  randomNumbers[0] = Math.ceil(Math.random() * UPPER_LIMIT_ONE);
  randomNumbers[1] = Math.ceil(Math.random() * UPPER_LIMIT_TWO);
  randomNumbers.sort(randomComparator);

  return randomNumbers;
}

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
