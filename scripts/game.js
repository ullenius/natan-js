var calculator = {
  userInput: [], // stored as a string
  sum: 0,
  correctAnswer: 0
};

function addDigit(number) {
  calculator.userInput.push(number);
  console.log(calculator.userInput);
  console.log("length = " + calculator.userInput.length);
}

function refreshTextbox() {
  var textbox = document.getElementById("textbox");

  for (var pos in calculator.userInput) {
    calculator.sum += calculator.userInput[pos];
  }
  textbox.value = calculator.sum;
  calculator.userInput = []; // emptying the array
  console.log("contents of array: " + calculator.userInput);
}
