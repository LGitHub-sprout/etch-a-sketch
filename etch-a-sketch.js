
const gridSizeBtn = document.querySelector('.set-grid-size');
const sketchContainerWrap = document.querySelector('.sketch-container-wrapper');
let userGrid; 

const getUserGrid = () => {
  return prompt('Enter a grid size 100 or LOWER.');
}

const getGridControls = function () {
  userGrid = getUserGrid();
  if (userGrid > 100) {
    alert('Please enter a valid grid size (100 or LESS).');
    return;
  } else if (userGrid === null) {
    alert('Have another go, mate!');
    return;
  } else if (isNaN(userGrid)) {
    alert('Please enter only numbers.');
    return;
    // https://stackoverflow.com/questions/10232366/how-to-check-if-a-variable-is-null-or-empty-string-or-all-whitespace-in-javascri
  } else if (userGrid.match(/^ *$/) !== null) {
    alert('No spaces allowed.');
    return
  }
  deleteGrid();
  assembleGrid(userGrid);
}
gridSizeBtn.addEventListener('click', getGridControls);

// https://codepen.io/alecnissen/pen/oNqKBEE?editors=0010
const assembleGrid = (defaultGrid) => {
  if (userGrid === undefined) {
    for (let r = 0; r < defaultGrid; r++) {
      gridRow = createElements('div', 'grid-row', sketchContainerWrap);
      
      for (let s = 0; s < defaultGrid; s++) {
        createElements('div', 'grid-square', gridRow).classList.add('data-');
        gridRow.firstElementChild.classList.add('data')

      }
    }
  } else {
    for (let r = 0; r < userGrid; r++) {
      userRow = createElements('div', 'user-row', sketchContainerWrap);
      
      for (let s = 0; s < defaultGrid; s++) {
        createElements('div', 'grid-square', userRow).classList.add('data-');
        userRow.firstElementChild.classList.add('data')

      }
    }
  } 
}
assembleGrid(16);

// I'm not opposed to func expressions. Sometimes hoisting better organizes the code.
// createElements() posted by Learner on TOP whom I forgot to cite.
function createElements(element, className, appendTo) {
  const el = document.createElement(element);
  el.classList.add(className);
  appendTo.appendChild(el);
  
  return el;
}
// https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
// Option 2B 
// searched 'remove children'
function deleteGrid() {
  while (sketchContainerWrap.lastElementChild) { 
    sketchContainerWrap.removeChild(sketchContainerWrap.lastElementChild);
  }
}

function setBgBlack() {
  sketchContainerWrap.addEventListener('mouseover', (e) => {
    if (e.target.className === 'grid-square') e.target.classList.add('black');
  });
}

// Introduced by Toby @TOP and recoded by hand after studing it's contents:
  // currying, callbacks, destructuring 
const calcRandomNum = (min, max) => // {
  () => {
    return Math.floor(Math.random() * (max - min));
  };
  getRandomNum = calcRandomNum(0, 255);
  
const makeRandomColors = () => {
  let arr = [...Array(3)].map(getRandomNum);

  return arr;
}
// pattern, replacement
// const num = 222;
// const pattern = ! Number.isNaN(num);
// console.log('true or false', pattern)

// console.log(document.styleSheets[4].cssRules[0].style);
// const cssDeclaration = document.styleSheets[4].cssRules[0].style;
// console.log(typeof cssDeclaration.getPropertyValue('--rainbow-BgColor'), cssDeclaration.getPropertyValue('--rainbow-BgColor'))

// dataset https://www.youtube.com/watch?v=On_WyUB1gOk
// https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes#issues 
function getRGB(value, num) {
  console.log('this is the ', value + ' from getRGB function value')
  // return value = 255; 
  // num = 255;
  // console.log(num); // works
  // return num;
}
let calcTenPercent = (value) => {
  tenPercent = value / 10;
  console.log('calcTenPercent', tenPercent) // NaN 
  // return tenPercent;
  // return `${num} -= ${tenPercent}`; // guessing does not work CORRECT
  // return `${num -= tenPercent}`; // 
}
// let num = 255;  
// const tenPercent = num / 10;
function decrementNum(num, tenPercent, value, getRGB) {
  // console.log('getRGB from inside decrementNum', getRGB(value));
// let computedStyle, computedStyleValue;
  // ++num; // works
  // num += 100; // works
  // console.log(calcTenPercent(255, tenPercent)); // returns 25.5 CORRECT !!
  // console.log('calcTenPercent function', calcTenPercent(value)); // NaN
  // num -= tenPercent;
  // console.log('decrementNum in event listener num', num) // NaN
  // calcTenPercent(value)
  console.log('decrementNum ', value) // undefined
  // console.log(getRGB(value));
  // return value -= tenPercent;
}
function logComputedStyle(value, num) {
  getRGB(value) 
  calcTenPercent(value)
  decrementNum(value);
  // console.log(typeof value, value) 
  // decrementNum(getRGB, value);
}

function setRandomBg(e) {
  let targetStyleLen; // doesn't appear to have to be global 

  const [red, green, blue] = makeRandomColors();
  targetStyleLen = e.target.style.length;

  if (targetStyleLen === 0) {
    e.target.style.setProperty('--rainbow-BgColor', `rgb(${red}, ${green}, ${blue})`);
  }
  if (targetStyleLen === 1) {
    computedStyle = window.getComputedStyle(e.target); // has to be window
    computedStyleValue = computedStyle.getPropertyValue('background-color');
    // console.log('mouseover', computedStyleValue)

    // console.log('second mouseover', computedStyleValue, typeof computedStyleValue)
    // console.log(computedStyleValue.length) // 16
    // e.target.style.cssText = 'background-color: rgb(255,0,0)';
    e.target.style.cssText = `background-color: ${computedStyleValue}` 
    // e.target.style.setProperty('--rainbow-BgColor', `rgb(0,0,0)`);

    logComputedStyle(computedStyleValue);

    // reduce a number by 10% until it's zero
    // https://stackoverflow.com/questions/5496576/increase-and-decrease-a-variable-until-a-number-is-reached-in-javascript
    num2 = 1;
  }
}
sketchContainerWrap.addEventListener('mouseover', setRandomBg);
