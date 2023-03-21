
// Bubble sort algorithm
async function bubbleSort() {
    disableButtons();
    resetButton = false;
    for (let i = 0; i < bars.length - 1; i++) {

        for (let j = 0; j < bars.length - i - 1; j++) {
            bars[j].classList.add("active-bar");
            bars[j + 1].classList.add("active-bar");

            // check for reset
            if (resetButton) {
                bars[bars.length - i].classList.remove("sorted-bar");
                bars[j].classList.remove("active-bar");
                bars[j + 1].classList.remove("active-bar");
                enableButtons();
                resetButton = false;
                return;
            }

            await new Promise(resolve => setTimeout(() => { resolve(); }, interval));

            if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
                swapBars(j, j + 1);
            }

            await new Promise(resolve => setTimeout(() => { resolve(); }, interval));

            bars[j].classList.remove("active-bar");
            bars[j + 1].classList.remove("active-bar");
        }
        //await new Promise(resolve => setTimeout(() => { resolve(); }, interval));
        bars[bars.length - i - 1].classList.add("sorted-bar");
        //sortedGradient(bars.length - i - 1);
    }
    bars[0].classList.add("sorted-bar"); // this line sets the leftmost bar to sorted at the end of the algorithm
    //sortedGradient(0);
    console.log("bubble done");
    enableButtons();
}