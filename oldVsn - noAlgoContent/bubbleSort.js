
// Bubble sort algorithm
async function bubbleSortAlgo() {
    for (let i = 0; i < barArray.length - 1; i++) {

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

            await new Promise(resolve => setTimeout(() => { resolve(); }, interval));

            // the comparison and swap
            if (integerArray[j] > integerArray[j + 1]) {
                swapBars(j, j + 1);
                swapInts(j, j + 1);
            }

            await new Promise(resolve => setTimeout(() => { resolve(); }, interval));

            barArray[j].classList.remove("activeBar");
            barArray[j + 1].classList.remove("activeBar");
        }
        //await new Promise(resolve => setTimeout(() => { resolve(); }, interval));
        barArray[barArray.length - i - 1].classList.add("sortedBar");
    }
    barArray[0].classList.add("sortedBar"); // this line sets the leftmost bar to sorted at the end of the algorithm
}