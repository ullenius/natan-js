var calculator = {
  userAnswer: 0,
  correctAnswer: 0
};

function addDigit(number) {
  calculator.userAnswer += number;
  alert(calculator.userAnswer);
}
