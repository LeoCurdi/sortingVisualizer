
// Bubble sort algorithm (optimized)
async function bubbleSortAlgo() {
    let noSwaps // this valirable will store whether at least 1 swap has been performed in a pass
    for (let i = 0; i < barArray.length - 1; i++) {
        noSwaps = true // default it to true
        for (let j = 0; j < barArray.length - i - 1; j++) {
            barArray[j].classList.add("activeBar");
            barArray[j + 1].classList.add("activeBar");

            // check for reset
            if (resetButton) {
                if (i > 0) {
                    barArray[barArray.length - i].classList.remove("sortedBar");
                }
                barArray[j].classList.remove("activeBar");
                barArray[j + 1].classList.remove("activeBar");
                return;
            }
            // check for pause
            if (pauseButton) {
                await waitForUnPause();
                pauseButton = false;
            }

            await new Promise(resolve => setTimeout(() => { resolve(); }, interval));

            // the comparison and swap
            if (integerArray[j] > integerArray[j + 1]) {
                swapBars(j, j + 1);
                swapInts(j, j + 1);
                noSwaps = false // if a swap has been performed
            }

            await new Promise(resolve => setTimeout(() => { resolve(); }, interval));

            barArray[j].classList.remove("activeBar");
            barArray[j + 1].classList.remove("activeBar");
        }
        //await new Promise(resolve => setTimeout(() => { resolve(); }, interval));
        barArray[barArray.length - i - 1].classList.add("sortedBar");
        
        // if no swaps were performed, we know the array is sorted, so finish early
        if (noSwaps) {
            // mark all remaining bars as sorted
            for (let k = barArray.length - i - 2; k >= 0; k--) {
                barArray[k].classList.add('sortedBar')
            }
            break
        }
    }
    barArray[0].classList.add("sortedBar"); // this line sets the leftmost bar to sorted at the end of the algorithm
}