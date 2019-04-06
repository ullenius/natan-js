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

// TEST CODE
view.displayMessage("hello world");
view.displayScore("Poäng: 100");
view.displayQuestion("1 +1 = ?");

// view.clearTextbox();
// clearQuestionbox();
// clearMessagebox();
