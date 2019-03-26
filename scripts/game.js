var calculator = {
  userAnswer: 0,
  correctAnswer: 0
};

function addDigit(number) {
  calculator.userAnswer += number;
  console.log(calculator.userAnswer);
}

function refreshTextbox() {
  var textbox = document.getElementById("textbox");
  textbox.value = calculator.userAnswer;
}
