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

    if (button.dataset.symbol && button.dataset.symbol !== '=') {
      if (screen.textContent === '') {
        handleError();
        return;
      }
      handleOperator(button.dataset.symbol, screen.textContent);
    }

    if (isOperatorSet && button.dataset.symbol === '=') {
      showResult();
    }

    if (button.value !== 'AC' && !button.dataset.symbol) {
      handleNumber(button.value);
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

function handleNumber(value) {
  if (screen.textContent.length >= 10) {
    alert('WARNING: You are gonna break the poor machine');
    return;
  }

  if (value === '.' && screen.textContent.includes('.')) return;

  screen.textContent += value;
}

function showResult() {
  if (screen.textContent === '') {
    handleError();
    return;
  }

  if (screen.textContent.length >= 15) {
    alert('I told you :(');
  }

  values.push(parseFloat(screen.textContent));
  result = calculateResult(values, operator);
  previewResult.textContent = `${values.join(` ${operator} `)}`;
  screen.textContent = result;

  adjustFontSize();

  values = [result];
  isResultDisplayed = true;
}

function handleOperator(symbol, value) {
  if (isResultDisplayed) {
    values = [parseFloat(screen.textContent)];
    previewResult.textContent = `${values.join(' ')} ${symbol}`;
    isResultDisplayed = false;
  } else {
    values.push(parseFloat(value));
    previewResult.textContent = `${values.join(` ${operator} `)} ${symbol}`;
  }

  operator = symbol;
  isOperatorSet = true;

  screen.textContent = '';
}

function handleError() {
  alert('Please insert a correct number');
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
          return 'Math Error';
        }
        result /= currentValue;
        break;
      case 'exp':
        result **= currentValue;
        break;
      default:
        return 'Error';
    }
  }

  return result;
}
