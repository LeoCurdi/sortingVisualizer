
/*
    Quicksort - O(n log n) average case, O(n log n) best case, O(n^2) worst case
    Merge sort - O(n log n) worst case, average case, and best case
    Heapsort - O(n log n) worst case, average case, and best case
    Insertion sort - O(n^2) worst case and average case, O(n) best case // i think the avg case for insertion is less than O(n^2) bc it doesnt travel through the entire sorted section each pass
    Selection sort - O(n^2) worst case, average case, and best case
    Bubble sort - O(n^2) worst case and average case, O(n) best case
*/
var barContainer = document.getElementById("barContainer");
var controls = document.getElementById("controls");
var algoButtons = document.querySelectorAll('.algoButton');
let size = document.querySelector('#sizeSlider');
var sizeValueDisplay = document.querySelector('#sizeValueDisplay'); // to modify size dipslay value
let speed = document.querySelector('#speedSlider');
var speedValueDisplay = document.querySelector('#speedValueDisplay');
var resetAndPauseButtons = document.querySelector('#resetAndPauseButtons');
var generateArrayButton = document.querySelector('#generateArrayButton');
const pauseButton1 = document.getElementById('pauseButton');

let interval, resetButton = false, pauseButton = false;
var barArray = [], integerArray = [];
var barHeight;
var lastAlgo = 'Home';


// Generate initial array on page load
generateArray();
// set initial speed on page load
adjustSpeed();


// update the array continuously when the user drags the size slider
size.addEventListener('input', () => {
    reset(), adjustSpeed();
});
// update the speed continuously when the user drags the speed slider
speed.addEventListener('input', () => {
    adjustSpeed();
});


// disable buttons when a sorting algorithm is called. Note: also toggles the left buttons
function disableButtons() {
    for (let i = 0; i < algoButtons.length; i++) {
        algoButtons[i].disabled = true;
    }
    toggleLeftButtons(1);
}
// enable buttons when a sorting algorithm is completed. Note: also toggles the left buttons
function enableButtons() {
    for (let i = 0; i < algoButtons.length; i++) {
        algoButtons[i].disabled = false;
    }
    toggleLeftButtons(0);
}

// toggle whether generate new array or both reset and pause button are displayed
function toggleLeftButtons(option) {
    if (option === 1) {
        generateArrayButton.style.display = 'none';
        resetAndPauseButtons.style.display = 'flex';
    }
    else {
        resetAndPauseButtons.style.display = 'none';
        generateArrayButton.style.display = 'flex';
    }
}


// set speed when user slides the speed slider
async function adjustSpeed() {
    interval = 10000 / (speed.value * size.value);
    // update the value that the user sees for size
    speedValueDisplay.innerHTML = speed.value;
}

// generate an integer array, and load the bar array concurrently
async function generateArray() {
    // update the value that the user sees for size
    sizeValueDisplay.innerHTML = size.value;
    // clear any bars from previously generated arrays (this prevents size from just adding to the current array each time the player adjusts size)
    while (barContainer.firstChild) {
        barContainer.removeChild(barContainer.firstChild);
    }
    barArray = [], integerArray = [];
    for (let i = 0; i < size.value; i++) {
        // generate the random integer array
        const height = Math.floor(Math.random() * 540) + 10;
        integerArray.push(height);

        // create the bar array concurrently
        barHeight = barIntegerConversion * height;
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${barHeight}vh`;
        if (size.value > 120) { // remove the gap between bars if theres mroe than 120 bars on the screen
            bar.style.margin = '0 0px';
        }
        barArray.push(bar);
        barContainer.appendChild(bar);
    }   
}
   
// Reset the array
async function reset() {
    if (pauseButton) {
        togglePause();
    }
    enableButtons();
    resetButton = true;
    for (let i = 0; i < barArray.length; i++) {
        barContainer.removeChild(barArray[i]);
    }
    barArray.length = 0;
    generateArray();
}

// pause the algorithm
async function togglePause() {
    pauseButton = !pauseButton;
    if (pauseButton) {
        pauseButton1.textContent = 'Resume';
    }
    else {
        pauseButton1.textContent = 'Pause';
    }
}

// wait for un pause
async function waitForUnPause() {
    console.log('Waiting for pause variable to be false...');

    // Create a Promise that resolves when the pause variable is true
    const pausePromise = new Promise((resolve) => {
        const checkPause = () => {
            if (!pauseButton) {
                resolve();
            } 
            else {
                setTimeout(checkPause, 50); // only recursively call the function to check if the button has been clicked every x milliseconds
            }
        };
        checkPause();
    });

    await pausePromise;
    console.log('Pause variable is false!');
}

// Swap two bars - helper function
function swapBars(i, j) {
    const temp = barArray[i].style.height;
    barArray[i].style.height = barArray[j].style.height;
    barArray[j].style.height = temp;
}
// swap two integers in the integer array
function swapInts(i, j) {
    const temp = integerArray[i];
    integerArray[i] = integerArray[j];
    integerArray[j] = temp;
}

// set info display to none for all algos except the selected one
function loadInfo(lastAlgo, curAlgo) {

    var info = document.getElementById(`infoSection${lastAlgo}`);
    if (info !== null) {
        info.style.display = 'none';
    }

    info = document.getElementById(`infoSection${curAlgo}`);
    info.style.display = 'flex';

}

// bubble sort
async function bubbleSort() {
    loadInfo(lastAlgo, 'Bubble');
    lastAlgo = 'Bubble';
    disableButtons();
    resetButton = false;
    await bubbleSortAlgo();
    toggleLeftButtons(0);
}

// selection sort
async function selectionSort() {
    loadInfo(lastAlgo, 'Selection');
    lastAlgo = 'Selection';
    disableButtons();
    resetButton = false;
    await selectionSortAlgo();
    toggleLeftButtons(0);
}

// insertion sort
async function insertionSort() {
    loadInfo(lastAlgo, 'Insertion');
    lastAlgo = 'Insertion';
    disableButtons();
    resetButton = false;
    await insertionSortAlgo();
    toggleLeftButtons(0);
}

// quick sort
async function quickSort() {
    loadInfo(lastAlgo, 'Quick');
    lastAlgo = 'Quick';
    disableButtons();
    await quickSortAlgo(integerArray, 0, integerArray.length - 1, barArray); // the await makes it so anything after the quicksortAlgo call - such as enable buttons - wont execute until sorting is complete. this is necessary because there are recursive calls happening asyncly so its impossible to tell when it would be done
    toggleLeftButtons(0);
}

// merge sort
async function mergeSort() {
    loadInfo(lastAlgo, 'Merge');
    lastAlgo = 'Merge';
    disableButtons();
    resetButton = false;
    await mergeSortAlgo(integerArray, 0, integerArray.length - 1);
    toggleLeftButtons(0);
}

// heap sort
async function heapSort() {
    loadInfo(lastAlgo, 'Heap');
    lastAlgo = 'Heap';
    disableButtons();
    resetButton = false;
    await heapSortAlgo();
    toggleLeftButtons(0);
}
