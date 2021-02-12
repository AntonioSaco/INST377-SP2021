/* Put your javascript in here */
cIndex = 0; // Keeps track of carousel boundary
cWidth = 130; // The width of pixels to scroll
cMove = cWidth * 1; // How much the carousel will move
cLoc = 0; // Current position of carousel, influenced by cPos

const target = document.querySelector('#imgs'); // Unordered list location where array will be added as list items

// Create an array of images to add to the target
function injectArray() {
  const imgArray2 = ['images/onigiri_1.png', 'images/onigiri_2.png', 'images/onigiri_3.png', 'images/onigiri_4.png', 
  'images/roll_1.png', 'images/roll_2.png', 'images/roll_3.png'];

  // Add a <li> element with image HTML for each index of the array
  const addList = imgArray2.map(element => {
    const listItem = document.createElement('li');
    listItem.innerHTML = '<img src=' + element + '>';
    target.append(listItem);
  })
}

// Move the carousel forward
function moveNext() {
  if (cIndex > -1 && cIndex < 4) {
    cLoc -= cMove;
    cIndex += 1;
    target.style.marginLeft = cLoc + 'px';
  }
}

// Move the carousel back
function movePrev() {
  if (cIndex > 0 && cIndex < 5) {
    cLoc += cMove;
    cIndex -= 1;
    target.style.marginLeft = cLoc + 'px';
  }
}

// Move the carousel based on the positive or negative number parameter
function arrowCon(n) {
  if (n > 0) {
    moveNext(); // Right arrow
  } else {
    movePrev(); // Left arrow
  }
  // alert('cLoc: ' + cLoc + ', cIndex: ' + cIndex); // Debugging
}

// Load the images on click
function onStart(){
  document.addEventListener('click', (event) => {
    injectArray();
  })
}

window.onload = onStart; // Create the image array on page load