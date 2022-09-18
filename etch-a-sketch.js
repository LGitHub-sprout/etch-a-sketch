
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

// console.log(document.styleSheets[4].cssRules[0].style);
// const cssDeclaration = document.styleSheets[4].cssRules[0].style;
// console.log(typeof cssDeclaration.getPropertyValue('--rainbow-BgColor'), cssDeclaration.getPropertyValue('--rainbow-BgColor'))

let targetLen;
// dataset https://www.youtube.com/watch?v=On_WyUB1gOk 
// https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes#issues 
function setRandomBg(e) {
  const [red, green, blue] = makeRandomColors();
  // console.log(typeof [red, green, blue], [red, green, blue], Array.isArray([red, green, blue])); // array
  // console.log('red', red)
  // const rgbRed = red;
  // console.log('rgbRed', rgbRed)

  targetLen = e.target.style.length;
  // console.log('targetLen inside function', targetLen) // 0 but gets thrown away?

  if (targetLen === 0) {
    e.target.style.setProperty('--rainbow-BgColor', `rgb(${red}, ${green}, ${blue})`);

    computedStyle = window.getComputedStyle(e.target);
    // console.log(computedStyle.getPropertyValue('background-color'))
    computedStyleValue = computedStyle.getPropertyValue('background-color');
    console.log('first mouseover', computedStyleValue)



    // const cssDeclaration = document.styleSheets[4].cssRules[0].style;
    // const bgColor = cssDeclaration.getPropertyValue('--rainbow-BgColor');
    // console.log(e.target.style)
    // console.log(bgColor)

    // console.log(red)
  }
  if (targetLen === 1) {
    console.log('second mouseover', computedStyleValue)

    // console.log('red', red)
    // console.log('rgbRed', rgbRed)
    // console.log(rgbRed)
    // console.log('targetLen is', targetLen)
    e.target.style.setProperty('--rainbow-BgColor', `rgb(0,0,0)`);
  }
}
sketchContainerWrap.addEventListener('mouseover', setRandomBg);

sketchContainerWrap.addEventListener('mouseover', (e) => {
  // [red, green, blue] = makeRandomColors();

  // console.log(red)

  if (e.target.style.length === 1) {
    // console.log('target len:', targetLength)
    // e.target.style.setProperty('--rainbow-BgColor', `rgb(0,0,0)`);

    // subtract .10 from red, green, blue and reset the style property color
    // e.target.style.setProperty('--rainbow-Bg-color', `rgb(0, 0, 0)`)
  }
})