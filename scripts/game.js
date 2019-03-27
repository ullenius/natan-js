var calculator = {
  userInput: [], // stored as a string
  sum: 0,
  correctAnswer: 0
};

function addDigit(number) {
  calculator.userInput.push(number);
  addToTextbox(number);

  console.log(calculator.userInput);
  console.log("length = " + calculator.userInput.length);
}

function calculate() {
  for (var pos in calculator.userInput) {
    calculator.sum += calculator.userInput[pos];
  }
  printSum();
  calculator.userInput = []; // emptying the array
  console.log("contents of array: " + calculator.userInput);
}

// displays sum in textbox
function printSum() {

  var textbox = document.getElementById("textbox");
  textbox.value = calculator.sum;
}

function addToTextbox(number) {
  var textbox = document.getElementById("textbox");
  textbox.value += number;
}
