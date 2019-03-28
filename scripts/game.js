/* written by Anosh D. Ullenius 2019-03-29 */

var calculator = {
  userInput: [], // stored as a string
  sum: 0, // change name to userAnswer or similar
  correctAnswer: 0
};

var repetitions = 0;
var points = 0;

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

  // repeat 3 times
  if (repetitions < 3) {
    repetitions++;
    generateQuestion();
  }

}

/* prints win/lose message if answer is correct */
function printVictoryMessage(result) {

  let victoryMessage = document.getElementById("victoryMessage");
  let pointsMessage = document.getElementById("points");

  let message;

  if (result === true) {
    message = "Rätt svar! Bra jobbat Natan! :)";
    points++;
  } else {
    message = "Fel svar :(";
  }

  victoryMessage.innerHTML = message;
  pointsMessage.innerHTML = "Poäng: " + points + "/" + Number(repetitions+1); // 3 == total number of questions
}


// displays sum in textbox
function printSum() {

  var textbox = document.getElementById("textbox");
  textbox.value = calculator.sum;
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

generateQuestion();
