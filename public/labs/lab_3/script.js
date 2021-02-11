/* Put your javascript in here */
cIndex = 0; // Controlled by arrows
cCount = 1;
cWidth = 130; // The width of pixels to scroll
cPos = cWidth * cCount;
cLoc = 0;

// Array variables
let i = 0;
const imgArray = [];
const x = document.getElementsByClassName('images');

// Creates the array when the page loads
function initializeArray() {
  while (i < x.length) {
    imgArray.push(x[i]);
    i += 1;
  }
}

// Move the carousel based on the positive or negative number parameter
function arrowCon(n) {
  if (n > 0) {
    moveNext(); // Right arrow
  } else {
    movePrev(); // Left arrow
  }

  /* alert('cLoc: ' + cLoc + ' posIndex: ' + posIndex); */    // Debugging
}

// Move the carousel forward
function moveNext() {
  if (cIndex > -1 && cIndex < 4) {
    cLoc -= cPos;
    cIndex++;
    imgArray[0].style.marginLeft = cLoc +'px';
  }
}

// Move the carousel back
function movePrev() {
  if (cIndex > 0 && cIndex < 5) {
    cLoc += cPos;
    cIndex--;
    imgArray[0].style.marginLeft = cLoc + 'px';
  }
}
