
// Selection sort algorithm
async function selectionSort() {
    disableButtons();
    resetButton = false;
    for (let i = 0; i < bars.length - 1; i++) {
        let minIndex = i;
        bars[minIndex].classList.add("active-bar");

        await new Promise(resolve => setTimeout(() => { resolve(); }, interval));

        for (let j = i + 1; j < bars.length; j++) {
            bars[j].classList.add("active-bar");

            // check for reset
            if (resetButton) {
                bars[j].classList.remove("active-bar");
                bars[minIndex].classList.remove("active-bar");
                enableButtons();
                resetButton = false;
                return;
            }

            await new Promise(resolve => setTimeout(() => { resolve(); }, interval));

            if (parseInt(bars[j].style.height) < parseInt(bars[minIndex].style.height)) {
                bars[minIndex].classList.remove("active-bar");
                minIndex = j;
                bars[minIndex].classList.add("active-bar");
            } else {
                bars[j].classList.remove("active-bar");
            }
        }

        if (minIndex !== i) {
            swapBars(i, minIndex);
        }

        bars[i].classList.add("sorted-bar");
        //sortedGradient(i);
        bars[minIndex].classList.remove("active-bar");
    }

    bars[bars.length - 1].classList.add("sorted-bar");
    //sortedGradient(bars.length - 1);
    enableButtons();
}