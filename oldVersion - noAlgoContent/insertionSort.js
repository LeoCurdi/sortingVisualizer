
// Insertion sort algorithm
async function insertionSortAlgo() {

    barArray[0].classList.add("sortedBar");

    for (let i = 1; i < barArray.length; i++) {
        let current = integerArray[i];
        let j = i - 1;
        barArray[i].classList.add("activeBar");

        await new Promise(resolve => setTimeout(resolve, interval));

        // comparison
        while (j >= 0 && integerArray[j] > current) {
            barArray[j].classList.add("activeBar");
            barArray[j+1].classList.add("activeBar");
            
            await new Promise(resolve => setTimeout(resolve, interval));
            
            // check for reset
            if (resetButton) {
                barArray[i].classList.remove("activeBar");
                barArray[j].classList.remove("activeBar");
                barArray[j+1].classList.remove("activeBar");
                return;
            }

            // swap
            swapBars(j + 1, j);
            swapInts(j + 1, j);
            j--;

            await new Promise(resolve =>
                setTimeout(() => {
                    for (let k = i; k > j + 1; k--) {
            
                        // check for reset
                        if (resetButton) {
                            return; 
                        }
            
                        barArray[k].classList.remove("activeBar");
                        barArray[k].classList.add("sortedBar");
                    }
                    resolve();
                }, interval));
        }
        barHeight = barIntegerConversion * current;
        barArray[j + 1].style.height = `${barHeight}vh`;

        barArray[j + 1].classList.remove("activeBar");
        barArray[j + 1].classList.add("sortedBar");
        barArray[i].classList.remove("activeBar");
        barArray[i].classList.add("sortedBar");
    }
}