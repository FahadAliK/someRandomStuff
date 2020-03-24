const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

function getUserInput() {
  return parseInt(usrInput.value);
}

function createAndWriteOutput(operator, resultBeforecalc, calcNumber) {
  const calcDescription = `${resultBeforecalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDescription);
}

function writeToLog(operation, prevResult, number, result) {
  const logEntry = {
    operation: operation,
    prevResult: prevResult,
    number: number,
    result: result
  };
  logEntries.push(logEntry);
  console.log(logEntries);
}

function calculateResult(calculationType) {
  const enteredNumber = getUserInput();
  const initialResult = currentResult;
  let mathOperator;
  switch (calculationType) {
    case 'ADD':
      currentResult += enteredNumber;
      mathOperator = '+';
      break;
    case 'SUBTRACT':
      currentResult -= enteredNumber;
      mathOperator = '-';
      break;
    case 'MULTIPLY':
      currentResult *= enteredNumber;
      mathOperator = '*';
      break;
    case 'DIVIDE':
      currentResult /= enteredNumber;
      mathOperator = '/';
      break;
  }
  createAndWriteOutput(mathOperator, initialResult, enteredNumber);
  writeToLog(calculationType, initialResult, enteredNumber, currentResult);
}

function add() {
  calculateResult('ADD');
}
function subtract() {
  calculateResult('SUBTRACT');
}
function multiply() {
  calculateResult('MULTIPLY');
}
function divide() {
  calculateResult('DIVIDE');
}

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);
