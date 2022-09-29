
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
// dataset https://www.youtube.com/watch?v=On_WyUB1gOk
// https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes#issues

function getBgRGB(value) { 
  // value is a string 'rgb('###', '###', '###')'
  regEx = /()\d+/g;
  rgbValues = value.match(regEx) // Returns an array of strings

  console.log('getBgRGB value', value)
  console.log('getBgRGB rgbValues', rgbValues)


  // rgbValues.forEach(darkenColor, value) // this, and darkenColor(), is the problem likely.

  // console.log('rgbValues', rgbValues, typeof rgbValues, 'object array?', Array.isArray(rgbValues)) // An array of strings 
}
const darkenColor = (color) => {
  color = parseInt(color, 10); // color to base10 number
  
  tenPercentRed = color / 10; // number 
  // tenPercentGreen = color / 10;
  tenPercentBlue = color / 10;

  // tenPercentGreen = rgbValues[1] / 10;
  // color -= tenPercent;
  // console.log('rgbValues from darkenColor func ex', rgbValues)
  return rgbValues;
} 
// function darkenColor(color) {
//   // Loop over array doing expression for ea item.
//   color = parseInt(color, 10); // color to base10 number
//   tenPercent = color / 10; // number
//   color -= tenPercent;
  
//   console.log('darkenColor tenPercent', tenPercent, typeof tenPercent) // number
//   console.log('darkenColor() color', color, typeof color) // Now it's a number
//   console.log('rgbValues from darkenColor', rgbValues, typeof rgbValues, Array.isArray(rgbValues))
//   // return color -= tenPercent;
  
//   // color is a string 'rgb(###, ###, ##)
//   // console.log('color from darkenColor', color, typeof color, Array.isArray(color))
//   // color -= tenPercent;
//   // result = color -= tenPercent;
//   // console.log('result', result)
//   // return result;
// }


function setRandomBg(e, firstMouseover) {
  const [red, green, blue] = makeRandomColors();
  targetStyleLen = e.target.style.length;

  if (targetStyleLen === 0) {
    e.target.style.setProperty('--rainbow-BgColor', `rgb(${red}, ${green}, ${blue})`);
  }
  if (targetStyleLen === 1) {
    const computedStyle = window.getComputedStyle(e.target); // window, not document  
    const computedStyleValue = computedStyle.getPropertyValue('background-color');

    getBgRGB(computedStyleValue);
    console.log('event computed value', computedStyleValue)

    let [red, green, blue] = darkenColor(rgbValues)
    tenPercentGreen = rgbValues[1] / 10;
    tenPercentBlue = rgbValues[2] / 10;
    console.log('event red, green, blue:', red, green, blue);
    console.log('event tenPercents:', tenPercentRed, tenPercentGreen, tenPercentBlue)

    // console.log('event tenPercent', tenPercent);
    // console.log('event rgbValues', rgbValues)
    // console.log('event rgbValues[0]', rgbValues[0], typeof rgbValues[0])

    // darkenColor(rgbValues)
    // console.log('darkenColor returns:', typeof darkenColor(updatedColor), darkenColor(updatedColor)); // return result to make this work
    // console.log('event darkenColor() color', color, typeof color) // string   
    // console.log('updatedColor minus 10%', updatedColor -= tenPercent)

    // e.target.style.cssText = 'background-color: rgb(255,0,0)';
    // e.target.style.cssText = `background-color: rgb(${updatedColor -= tenPercent, updatedColor -= tenPercent, updatedColor -= tenPercent})`; // doesn't work 
    // e.target.style.cssText = `background-color: rgb(${updatedColor -= tenPercent, updatedColor -= tenPercent, updatedColor -= tenPercent})`; // doesn't work     
    // e.target.style.cssText = `background-color: #95A386`; // works but not what I want obv 
    // e.target.style.setProperty('--rainbow-BgColor', `rgb(0,0,0)`);
    e.target.style.setProperty('--rainbow-BgColor', `rgb(${red -= tenPercentRed}, ${green -= tenPercentGreen}, ${blue -= tenPercentBlue})`);

    // console.log('event rgbValues[0] - 10%', rgbValues[0] -= tenPercent)
    // console.log('log MOUSEOVER EVENT updatedColor: ', updatedColor)
    // console.log('getBgRGB original/sliced value:', anotherVar) // sometimes works, sometimes not

    // reduce a number by 10% until it's zero
    // https://stackoverflow.com/questions/5496576/increase-and-decrease-a-variable-until-a-number-is-reached-in-javascript
  }
}
sketchContainerWrap.addEventListener('mouseover', setRandomBg);
