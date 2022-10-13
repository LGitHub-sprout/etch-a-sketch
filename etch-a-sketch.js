
const gridSizeBtn = document.querySelector('.set-grid-size');
const sketchContainerWrap = document.querySelector('.sketch-container-wrapper');
let userGrid; 

const getUserGrid = () => {
  return prompt('Enter a grid size 100 or LOWER.');
};

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
    return;
  }
  deleteGrid();
  assembleGrid(userGrid);
};
gridSizeBtn.addEventListener('click', getGridControls);

const assembleGrid = (defaultGrid) => {
  if (userGrid === undefined) {
    for (let r = 0; r < defaultGrid; r++) {
      gridRow = createElements('div', 'grid-row', sketchContainerWrap);
      
      for (let s = 0; s < defaultGrid; s++) {
        createElements('div', 'grid-square', gridRow).classList.add('data-');
        gridRow.firstElementChild.classList.add('data');
      }
    }
  } else {
    for (let r = 0; r < userGrid; r++) {
      userRow = createElements('div', 'user-row', sketchContainerWrap);
      
      for (let s = 0; s < defaultGrid; s++) {
        createElements('div', 'grid-square', userRow).classList.add('data-');
        userRow.firstElementChild.classList.add('data');
      }
    }
  }
};
assembleGrid(16);

// I'm not opposed to func expressions. Sometimes hoisting better organizes the code.
// createElements() posted by Learner on TOP whose name I forgot to get.
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
let getRandomNum = calcRandomNum(0, 255); // returns the function

const makeRandomColors = () => {
  // map() the random generated number from calcRandomNum
  // into the arr variable (spread an array of 3 digits)
  let arr = [...Array(3)].map(getRandomNum);

  return arr;
};

// Tried and tried for a better way to do this. Couldn't get it.
function getBgRGB(value) { 
  const regEx = /()\d+/g;
  rgbValues = value.match(regEx); // Returns an array of strings

  // console.log('getBgRGB value', value, typeof value)
  // console.log('getBgRGB rgbValues', rgbValues)
}
const makeDecimal = (value) => 
// () => 
{
  // loop array and divide ea element by 10
  for (let i = 0; i < value.length; i++) {
    console.log('value', value)
    value[i] = value[i] * .10;
    // value[i] / 10;
    console.log('value[i]', value[i])
    return value[i];
  }
}
// let tenPercent = makeDecimal();
// console.log(tenPercent)
// const decimal = tenPercent();
// console.log('decimal', decimal)

// can I just do the math inside darken and return?
const darkenColor = () => {
  const rgbValues2 = [...rgbValues]; // can spread 
  /* 
    New but still not working
    console.log('rgbValues inside darken', rgbValues)
    let arr = [...rgbValues].map(makeDecimal);
    console.log('arr inside darken', arr)
    return arr
    console.log('rgbValues from darken ', rgbValues)
    rgbValues = [0,0,0] // works
  */
  return rgbValues2; // need to return an array
}; 

function setRandomBg(e) {
  const [red, green, blue] = makeRandomColors();
  const targetStyleLen = e.target.style.length;

  if (targetStyleLen === 0) {
    e.target.style.setProperty('--rainbow-BgColor', `rgb(${red}, ${green}, ${blue})`);
  }
  if (targetStyleLen === 1) {
    const computedStyle = window.getComputedStyle(e.target); // window, not document  
    const computedStyleValue = computedStyle.getPropertyValue('background-color');

    getBgRGB(computedStyleValue);
    // console.log('event computed value', computedStyleValue);

    // https://stackoverflow.com/questions/5496576/increase-and-decrease-a-variable-until-a-number-is-reached-in-javascript
    let [redNew, greenNew, blueNew] = darkenColor(rgbValues)

    console.log('rgbValues from mouseover', rgbValues)
    let [one, two, three] = darkenColor();
    console.log('one, two, three from destructuring darkenColor()', one, two, three)
    // let whatever = darkenColor()
    // console.log('whatever from mouseover', whatever)

    // console.log('mouseover redNew', redNew, typeof redNew);
    const tenPercentRed = rgbValues[0] / 10;
    const tenPercentGreen = rgbValues[1] / 10;
    const tenPercentBlue = rgbValues[2] / 10;
    
    // console.log('event tenPercents:', tenPercentRed, tenPercentGreen, tenPercentBlue);

    e.target.style.setProperty('--rainbow-BgColor', `rgb(${redNew -= tenPercentRed}, ${greenNew -= tenPercentGreen}, ${blueNew -= tenPercentBlue})`);

    // const [tenRed, tenGreen, tenBlue] = makeRandomColors();
    // console.log('tenRed, tenGreen, tenBlue', tenRed, tenGreen, tenBlue);
    // const [color1, color2, color3] = makePercentage(rgbValues);  
    // console.log('event makePercentage', color1, color2, color3);
  }
}
sketchContainerWrap.addEventListener('mouseover', setRandomBg);

// Based on this S.O. and search "multiply array numbers by ten in javascript loop" 
// https://stackoverflow.com/questions/8454977/how-do-i-multiply-each-member-of-an-array-by-a-scalar-in-javascript
b = ['131', '162', '105'];
console.log('array b is an array of 3 strings which are 3 numbers', b)
const calcTenPercent = () => [...b].map(function (item) {
  // console.log(s / 10);
  // item = Number(item)
  // Number(item) += 100;
  Number(item) // Should I be sure to make it a number? 
  console.log('spread "b" array of 3 strings into "a" func expression and log each item:', item);
  return item / 10;
});
const [tenPercentRed, tenPercentGreen, tenPercentBlue] = calcTenPercent();
console.log('variable a destructured as percentages of ea of array b\'s original strings:', tenPercentRed, tenPercentGreen, tenPercentBlue)
// console.log('array calcTenPercent', calcTenPercent, 'typeof calcTenPercent', typeof calcTenPercent, 'is calcTenPercent an array?', Array.isArray(calcTenPercent))

// const makeRandomColors = () => {
//   // map() the random generated number from calcRandomNum
//   // into the arr variable (spread an array of 3 digits)
//   let arr = [...Array(3)].map(getRandomNum);

//   return arr;
// };