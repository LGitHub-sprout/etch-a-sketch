
const sketchContainerWrap = document.querySelector('.sketch-container-wrapper');
const setGridSizeBtn = document.querySelector('.set-grid-size');  
let userChoice;

setGridSizeBtn.addEventListener('click', function (e) {

  userChoice = prompt('How many squares across should the grid be?');
  if ((userChoice > 100) || (userChoice === '') || Math.sign(userChoice) === -1) {
    alert('The maximum number of allowed squares is 100 and the minimum is 1.');
    return;
  }
  if (Math.sign(userChoice) === 0) {
    alert('Zero, really? S. M. H.');
    return;
  }
  //  || userChoice !== Number
  if (userChoice === null) return;

  calcGrid();
});

function calcGrid(squaresPerSide) {
  if (userChoice) {
    squaresPerSide = userChoice;
    sketchContainerWrap.replaceChildren();
  } else squaresPerSide = 16;

  const gridArea = Math.pow(squaresPerSide, 2);
  const gridHeight = Number(500 / squaresPerSide).toFixed(5);
  const gridWidth = Number(500 / squaresPerSide).toFixed(5);

  // const gridHeight = Number(100 / squaresPerSide).toFixed(5);
  // const gridWidth = Number(100 / squaresPerSide).toFixed(5);
  
  // https://dev.to/devcer/document-fragment-the-lesser-known-superpower-of-javascript-38ch
  const sketchContainerFragment = new DocumentFragment();
 
  // const sketchContainer = document.createElement('div');
  sketchContainerFragment.classList = 'sketch-container';
  sketchContainerWrap.appendChild(sketchContainerFragment);

  for (let i = 0; i < gridArea; i++) {

    const gridSquare = document.createElement('div');
    gridSquare.classList = 'grid-square';
    gridSquare.style.height = `${gridHeight}px`;
    gridSquare.style.width = `${gridWidth}px`;
    // gridSquare.style.cssText = `height:${gridHeight}%; flex: 0 0 ${gridWidth}%;`;

    sketchContainerFragment.appendChild(gridSquare);

    calcRandNum2(0, 255);

    let red = colorVals[0];
    let green = colorVals[1];
    let blue = colorVals[2];

    let tenPercentRed = red / 10;
    let tenPercentGreen = green / 10;
    let tenPercentBlue = blue / 10;

    gridSquare.addEventListener('mouseover', function (e) {
      e.target.style.backgroundColor = `rgb(${red -= tenPercentRed}, ${green -= tenPercentGreen}, ${blue -= tenPercentBlue})`;
    });
  } // for loop
  sketchContainerWrap.appendChild(sketchContainerFragment);
}
calcGrid();
// Can I do the mouseover event outside the calcGrid() function?
// const sketchContainer = sketchContainerWrap.lastElementChild;
// const sketchContainer = sketchContainerWrap.firstElementChild;
// console.log(sketchContainer)
// const gridSquares = sketchContainer.querySelectorAll('.grid-square')
// console.log('gridSquares', gridSquares) // NodeList
// // Loop through NodeList and add RGB background color.
// gridSquares.forEach(gridSquare => {
//   gridSquare.addEventListener('mouseover', (e) => {
//     e.target.style.backgroundColor = 'red';
//   })
// })

// const colors = ['red', 'green', 'blue'];
function calcRandNum2(min, max) {
  // const randNum = Math.ceil(Math.random() * 25);
  colorVals = [];
  const colors = ['red', 'green', 'blue'];
  colors.forEach((color) => {
    color = Math.floor(Math.random() * (max - min)); //  + randNum
    // if (color > 255) color -= (randNum * 2);
    colorVals.push(color);
  });
}
