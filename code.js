// Calculadora JavaScript con corrección del bug de operadores en secuencia

const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

const buttons = $$('.button');
const previewResult = $('.preview-result');
const screen = $('#result');

let isOperatorSet = false;
let isResultDisplayed = false;

let values = [];
let operators = [];
let result = 0;

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const symbol = button.dataset.symbol;
    const value = button.value;
    const displayedNumber = screen.textContent;

    if (value === 'AC') refreshCalculator();

    if (symbol && symbol !== '=') {
      if (displayedNumber === '') {
        handleError();
        return;
      }
      handleOperator(symbol, displayedNumber);
    }

    if (isOperatorSet && symbol === '=') {
      showResult();
    }

    if (value !== 'AC' && !symbol) {
      handleNumber(value);
    }
  });
});

function refreshCalculator() {
  values = [];
  operators = [];
  isOperatorSet = false;
  isResultDisplayed = false;

  screen.textContent = '';
  previewResult.textContent = '';
}

function handleNumber(value) {
  if (screen.textContent.length >= 10) {
    alert('ERROR: Number too large');
    return;
  }

  if (value === '.' && screen.textContent.includes('.')) return;

  screen.textContent += value;
}

function showResult() {
  if (screen.textContent === '') {
    handleError('Insert a number to calculate');
    return;
  }

  values.push(parseFloat(screen.textContent));
  result = calculateResult(values, operators);

  if (isNaN(result) || !isFinite(result)) {
    handleError('Math Error');
  } else {
    previewResult.textContent = formatExpression(values, operators);
    screen.textContent = result;
  }

  values = [];
  operators = [];
  isResultDisplayed = true;
}

function handleOperator(symbol, value) {
  if (isResultDisplayed) {
    values = [parseFloat(screen.textContent)];
    operators = [symbol];
    previewResult.textContent = `${values[0]} ${symbol}`;
    isResultDisplayed = false;
  } else {
    values.push(parseFloat(value));
    operators.push(symbol);
    previewResult.textContent = formatExpression(values, operators);
  }

  isOperatorSet = true;
  screen.textContent = '';
}

function handleError(message) {
  alert(message);
  refreshCalculator();
}

function calculateResult(values, operators) {
  let result = values[0];

  for (let i = 1; i < values.length; i++) {
    let currentValue = values[i];
    let operator = operators[i - 1];
    switch (operator) {
      case '+':
        result += currentValue;
        break;
      case '-':
        result -= currentValue;
        break;
      case '*':
        result *= currentValue;
        break;
      case '/':
        if (currentValue === 0) {
          return NaN;
        }
        result /= currentValue;
        break;
      case '**':
        result **= currentValue;
        break;
      default:
        return Nan;
    }
  }

  return result;
}

function formatExpression(values, operators) {
  let expression = values[0].toString();
  for (let i = 1; i < values.length; i++) {
    expression += ` ${operators[i - 1]} ${values[i]}`;
  }
  return expression;
}
