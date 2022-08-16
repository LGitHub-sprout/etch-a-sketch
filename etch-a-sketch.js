
const sketchContainerWrap = document.querySelector('.sketch-container-wrapper');
const gridSizeBtn = document.querySelector('.set-grid-size');

const gridFrag = new DocumentFragment();

for (let c = 0; c < 100; c++) {
  const gridRow = document.createElement('div');
  gridRow.classList.add('grid-row');
  sketchContainerWrap.appendChild(gridFrag);
  gridFrag.appendChild(gridRow);

  let r = 1;
  while (r < 100) {
    const gridSquare = document.createElement('div');
    gridSquare.classList.add('grid-square');
    gridRow.appendChild(gridSquare);
    
    r++;
  }
}
