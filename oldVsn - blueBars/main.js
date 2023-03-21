
/*
    Quicksort - O(n log n) average case, O(n log n) best case, O(n^2) worst case
    Merge sort - O(n log n) worst case, average case, and best case
    Heapsort - O(n log n) worst case, average case, and best case
    Insertion sort - O(n^2) worst case and average case, O(n) best case // i think the avg case for insertion is less than O(n^2) bc it doesnt travel through the entire sorted section each pass
    Selection sort - O(n^2) worst case, average case, and best case
    Bubble sort - O(n^2) worst case and average case, O(n) best case
*/
const arrayContainer = document.getElementById("array-container");
const controls = document.getElementById("controls");
const buttons = document.querySelectorAll('#algoButton');
let speed = document.querySelector('#speedValue');
let size = document.querySelector('#sizeValue');
let interval;
var bars = [];
let resetButton = false;
var isPaused = false;

// declare a variable to modify size and speed display value
var sizeValueDisplay = document.querySelector('#sizeValueDisplay');
var speedValueDisplay = document.querySelector('#speedValueDisplay');

// update the array continuously when the user drags the size slider
size.addEventListener('input', () => {
    reset(), adjustSpeed();
});
// update the speed continuously when the user drags the speed slider
speed.addEventListener('input', () => {
    adjustSpeed();
});

// disable buttons when a sorting algorithm is called
function disableButtons() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }
}

// enable buttons when a sorting algorithm is completed
function enableButtons() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    }
}


// set speed when user slides the speed slider
async function adjustSpeed() {
    interval = 10000 / (speed.value * size.value);
    // update the value that the user sees for size
    speedValueDisplay.innerHTML = speed.value;
}

// Generate random array of bars when page is opened
async function generateArray() {
    // update the value that the user sees for size
    sizeValueDisplay.innerHTML = size.value;
    // clear any bars from previously generated arrays (this prevents size from just adding to the current array each time the player adjusts size)
    while (arrayContainer.firstChild) {
        arrayContainer.removeChild(arrayContainer.firstChild);
    }
    bars = [];

    for (let i = 0; i < size.value; i++) {
        const height = Math.floor(Math.random() * 450) + 50;
        const bar = document.createElement("div");
        bar.classList.add("array-bar");
        bar.style.height = `${height}px`;
        if (size.value > 120) { // remove the gap between bars if theres mroe than 120 bars on the screen
            bar.style.margin = '0 0px';
        }
        bars.push(bar);
        arrayContainer.appendChild(bar);
    }
}

// creates an array of integers from the heights of the bars
function getIntArrayFromBars() {
    const arr = [];
    for (let i = 0; i < bars.length; i++) {
        var height = parseInt(bars[i].style.height, 10);
        arr.push(height);
    }
    return arr;
}
   
// Reset the array
async function reset() {
    enableButtons();
    resetButton = true;
    for (let i = 0; i < bars.length; i++) {
        arrayContainer.removeChild(bars[i]);
    }
    bars.length = 0;
    generateArray();
}

// pause function. This is set up so that the pause button toggles the pause value each time. so you can click to pause, then click again to resume
async function pause() {
    if (!isPaused) { // if not paused, pause it
        isPaused = true;
    }
    else if (isPaused) { // if paused, unpause it
        isPaused = false;
    }
}

// the gradient effect for a sorted bar
async function sortedGradient(k) {
    // current color = [105, 30, 255]
    // target color = [157, 129, 255]
    let currentColor = [105, 30, 255];
    gradient(k, currentColor);
}
async function gradient(k, currentColor) {
    currentColor[0] += .52;
    currentColor[1] += .99;
    console.log("for fucks");
    if (currentColor[0] >= 157 || currentColor[1] >= 129) {
        return;
    }
    
    bars[k].style.backgroundColor = `rgb(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]})`;
    setTimeout(function() {
        gradient(k, currentColor);
      }, 5);   
}

// Swap two bars - helper function
function swapBars(index1, index2) {
    const temp = bars[index1].style.height;
    bars[index1].style.height = bars[index2].style.height;
    bars[index2].style.height = temp;
}
// swap two integers in the int version of the array
function swapInts(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// Generate initial array on page load
generateArray();

// set initial speed on page load
adjustSpeed();
