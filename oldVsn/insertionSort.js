
// Insertion sort algorithm
async function insertionSort() {
    disableButtons();
    resetButton = false;

    bars[0].classList.add("sorted-bar");

    for (let i = 1; i < bars.length; i++) {
        let current = parseInt(bars[i].style.height);
        let j = i - 1;
        bars[i].classList.add("active-bar");

        await new Promise(resolve => setTimeout(resolve, interval));

        while (j >= 0 && (parseInt(bars[j].style.height) > current)) {
            bars[j].classList.add("active-bar");
            bars[j+1].classList.add("active-bar");
            
            // check for reset
            if (resetButton) {
                bars[i].classList.remove("active-bar");
                bars[j].classList.remove("active-bar");
                bars[j+1].classList.remove("active-bar");
                bars[minIndex].classList.remove("active-bar");
                enableButtons();
                resetButton = false;
                return;
            }

            await new Promise(resolve => setTimeout(resolve, interval));
            
            // check for reset
            if (resetButton) { 
                enableButtons();
                resetButton = false;
                return; 
            }

            swapBars(j+1, j);
            j--;

            await new Promise(resolve =>
                setTimeout(() => {
                    for (let k = i; k > j + 1; k--) {
            
                        // check for reset
                        if (resetButton) { 
                            enableButtons();
                            resetButton = false;
                            return; 
                        }
            
                        bars[k].classList.remove("active-bar");
                        bars[k].classList.add("sorted-bar");
                    }
                    resolve();
                }, interval)
            );
        }
        bars[j + 1].style.height = `${current}px`;
        bars[j + 1].classList.remove("active-bar");
        bars[j + 1].classList.add("sorted-bar");
        bars[i].classList.remove("active-bar");
        bars[i].classList.add("sorted-bar");
    }
    enableButtons();
}