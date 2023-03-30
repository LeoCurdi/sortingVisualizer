
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

let interval, resetButton = false;
var barArray = [], integerArray = [];
var barHeight;


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


// disable buttons when a sorting algorithm is called
function disableButtons() {
    for (let i = 0; i < algoButtons.length; i++) {
        algoButtons[i].disabled = true;
    }
}
// enable buttons when a sorting algorithm is completed
function enableButtons() {
    for (let i = 0; i < algoButtons.length; i++) {
        algoButtons[i].disabled = false;
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
        const height = Math.floor(Math.random() * 510) + 40;
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
    enableButtons();
    resetButton = true;
    for (let i = 0; i < barArray.length; i++) {
        barContainer.removeChild(barArray[i]);
    }
    barArray.length = 0;
    generateArray();
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

// bubble sort
async function bubbleSort() {
    disableButtons();
    resetButton = false;
    await bubbleSortAlgo();
    //enableButtons();
}

// selection sort
async function selectionSort() {
    disableButtons();
    resetButton = false;
    await selectionSortAlgo();
    //enableButtons();
}

// insertion sort
async function insertionSort() {
    disableButtons();
    resetButton = false;
    await insertionSortAlgo();
    //enableButtons();
}

// quick sort
async function quickSort() {
    disableButtons();
    await quickSortAlgo(integerArray, 0, integerArray.length - 1, barArray); // the await makes it so anything after the quicksortAlgo call - such as enable buttons - wont execute until sorting is complete. this is necessary because there are recursive calls happening asyncly so its impossible to tell when it would be done
    //enableButtons();
}

// merge sort
async function mergeSort() {
    disableButtons();
    resetButton = false;
    await mergeSortAlgo(integerArray, 0, integerArray.length - 1);
    //enableButtons();
}
