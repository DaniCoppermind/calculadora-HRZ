const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

const buttons = $$('.button');
const previewResult = $('.preview-result');
const screen = $('#result');

let isOperatorSet = false;
let isResultDisplayed = false;

let values = [];
let operator = '';

let result = 0;

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.value === 'AC') refreshCalculator();

    if (isResultDisplayed) refreshCalculator();

    if (button.dataset.symbol && button.dataset.symbol !== '=') {
      handleOperator(button.dataset.symbol);
    }

    if (isOperatorSet && button.dataset.symbol === '=') {
      showResult();
    }

    if (button.value !== 'AC' && !button.dataset.symbol) {
      console.log(screen.textContent);
      screen.textContent += button.value;
    }
  });
});

function refreshCalculator() {
  values = [];
  operator = '';
  isOperatorSet = false;
  isResultDisplayed = false;

  screen.textContent = '';
  previewResult.textContent = '';
}

function showResult() {
  secondValue = screen.textContent;

  result = calculateResult(firstValue, operator, secondValue);
  previewResult.textContent = `${firstValue} ${operator} ${secondValue}`;
  screen.textContent = result;

  isResultDisplayed = true;
}

function handleOperator(symbol) {
  if (isOperatorSet) {
    values.push(parseFloat(screen.textContent));
    result = calculateResult(values, operator);
    screen.textContent = result;
    previewResult.textContent = values.join(` ${operator} `) + ` =`;
  }

  operator = symbol;
  isOperatorSet = true;
  screen.textContent = '';
  values.push(parseFloat(screen.textContent)); // firstvalue
}

function calculateResult(values, operator) {
  let result = values[0];

  for (let i = 1; i < values.length; i++) {
    let currentValue = values[i];
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
          return 'Math Error'; // Evitar dividir por 0
        }
        result /= currentValue;
        break;
      case 'exp':
        result **= currentValue;
        break;
      default:
        return 'Error'; // Operador no reconocido
    }
  }

  return result;
}
