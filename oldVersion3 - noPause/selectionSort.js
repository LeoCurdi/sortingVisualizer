
// Selection sort algorithm
async function selectionSortAlgo() {
    for (let i = 0; i < barArray.length - 1; i++) {
        let minIndex = i;
        barArray[minIndex].classList.add("activeBar");

        await new Promise(resolve => setTimeout(() => { resolve(); }, interval));

        for (let j = i + 1; j < barArray.length; j++) {
            barArray[j].classList.add("activeBar");

            // check for reset
            if (resetButton) {
                barArray[j].classList.remove("activeBar");
                barArray[minIndex].classList.remove("activeBar");
                return;
            }

            await new Promise(resolve => setTimeout(() => { resolve(); }, interval));

            // the comparison
            if (integerArray[j] < integerArray[minIndex]) {
                barArray[minIndex].classList.remove("activeBar");
                minIndex = j;
                barArray[minIndex].classList.add("activeBar");
            } else {
                barArray[j].classList.remove("activeBar");
            }
        }

        // the swap
        if (minIndex !== i) {
            swapBars(i, minIndex);
            swapInts(i, minIndex);
        }

        barArray[i].classList.add("sortedBar");
        barArray[minIndex].classList.remove("activeBar");
    }

    barArray[barArray.length - 1].classList.add("sortedBar");
}