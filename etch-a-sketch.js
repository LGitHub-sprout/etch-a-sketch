
const wrapper = document.querySelector('.wrapper');
const gridSizeBtn = document.querySelector('.set-grid-size');
const sketchContainerWrap = document.querySelector('.sketch-container-wrapper');

const createElements = (element, className, appendTo) => {
  const el = document.createElement(element);
  el.classList.add(className);
  appendTo.appendChild(el);
  
  return el;
}

(function () {
  for (let r = 0; r < 28; r++) {
    const gridRow = createElements('div', 'grid-row', sketchContainerWrap);
    // console.log(sketchContainerWrap.children); // HTMLCollection
    for (let s = 0; s < 28; s++) {
      createElements('div', 'grid-square', gridRow);
    }
  }
})();

// const assembleGrid = () => {
//   for (let r = 0; r < 7; r++) {
//     const gridRow = createElements('div', 'grid-row', sketchContainerWrap);
//     // console.log(sketchContainerWrap.children); // HTMLCollection
//     for (let s = 0; s < 7; s++) {
//       createElements('div', 'grid-square', gridRow);
//     }
//   }
// }
// assembleGrid();

