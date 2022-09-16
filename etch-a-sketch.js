
const gridSizeBtn = document.querySelector('.set-grid-size');
const sketchContainerWrap = document.querySelector('.sketch-container-wrapper');
let userGrid; 

const getUserGrid = () => {
  return prompt('Enter a grid size');
}

const getGridControls = function () {
  userGrid = getUserGrid();
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
        createElements('div', 'grid-square', gridRow);
      }
    }
  } else {
    for (let r = 0; r < userGrid; r++) {
      userRow = createElements('div', 'user-row', sketchContainerWrap);
      
      for (let s = 0; s < defaultGrid; s++) {
        createElements('div', 'grid-square', userRow);
      }
    }   
  } 
}
assembleGrid(16);

// I'm not opposed to func expressions; I simply prefer to hoist which I think better organizes the code.
// createElements() posted by Learner on TOP who I forgot to cite.
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
// setBgBlack();
// Event Delegation
function setBgBlack() {
  sketchContainerWrap.addEventListener('mouseover', (e) => {
    if (e.target.className === 'grid-square') e.target.classList.add('black');
  });
}

// Shown by Toby @TOP and recoded by hand after studing it's contents:
// currying, callbacks, destructuring 
// Generate a random number btwn the range 0-255
const calcRandomNum = (min, max) => // {
  () => {
    // not sure but I think there was another set of parens here — the curried bit
    return Math.floor(Math.random() * (max - min));
  };
  getRandomNum = calcRandomNum(0, 255);
  
  const makeRandomColors = () => {
    let arr = [...Array(3)].map(getRandomNum);

    return arr;
  }
  
function setRandomBg(e) {
  const [red, green, blue] = makeRandomColors();
  
  if (e.target.className = 'grid-square') {
    e.target.style.setProperty('--rainbow-BgColor', `rgb(${red}, ${green}, ${blue})`);
    
    // if (! e.target.classList.contains('darken')) {
    //   console.log('poop')
    //   e.target.style.setProperty('background-color', 'black')
    // }
    
    // if (e.type) {
      // console.log(window.getComputedStyle(e.target))
      const targetStyles = window.getComputedStyle(e.target);
      // e.target.setAttribute('class', 'grid-square rainbow')
      // if (e.target.classList.contains('poop')) {
        // console.log('there is a poop class')
        // console.log('background-color', targetStyles.getPropertyValue('background-color'), typeof targetStyles.getPropertyValue('background-color'));
        // if (targetStyles.getPropertyValue('background-color')) {
          // e.target.style.setProperty('--rainbow-BgColor', `rgb(0 0 0)`);
          // }
          
          // console.log('target background-color', targetStyles.getPropertyValue('background-color'))
          // console.log(targetStyles)
        } // end if
        // darken(e);
        // if (e.target.hasAttribute('style')) console.log('poop');
        // console.log(e.target.getAttribute('style'))
        // console.log(e.target.style, typeof e.target.style)
        // console.log(window.getComputedStyle(e.target, null))
        // console.log('the event type', e.type)
        // console.log('target classList contains "grid-square" true or false', e.target.classList.contains('grid-square'))
        // console.log('target attributess', e.target.attributes)
          
          sketchContainerWrap.removeEventListener('mouseover', setRandomBg);
    }
sketchContainerWrap.addEventListener('mouseover', setRandomBg);
          
function darken(e) {
  e.target.style.setProperty('background-color', 'black');
}
          
          