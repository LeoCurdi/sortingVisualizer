

async function mergeSort() {
    const arr = getIntArrayFromBars();
    disableButtons();
    resetButton = false;
    await mergeSort1(arr, 0, arr.length - 1);
    enableButtons();
}

async function mergeSort1(arr, left, right) {
    if (left < right) {
    let mid = Math.floor((left + right) / 2);
    //await Promise.all([ // uncomment the await Promise.all and remove the await before each mergeSort1 call to see all of the merges happen simultaneously
      await mergeSort1(arr, left, mid),
      await mergeSort1(arr, mid + 1, right)
    //]);
    // check for reset
    if (resetButton) { return; }
    await merge(arr, left, mid, right);
  }
}

async function merge(arr, left, mid, right) {
    let i = left, j = mid + 1;

    while (i <= mid && j <= right) {

        // check for reset
        if (resetButton) { return; }

        if (arr[i] <= arr[j]) {
            bars[i].classList.add('active-bar');
            await new Promise(resolve => setTimeout(resolve, interval * 2));
            bars[i].classList.remove('active-bar');
            i++;
        } 
        else {
            bars[i].classList.add('active-bar');
            bars[j].classList.add('active-bar');
            await new Promise(resolve => setTimeout(resolve, interval));
            bars[j].classList.remove('active-bar');
            // Shift elements to the right to make space for the element being merged
            const temp = arr[j];
            for (let k = j - 1; k >= i; k--) {

                // check for reset
                if (resetButton) { return; }

                arr[k + 1] = arr[k];
                bars[k + 1].style.height = `${arr[k]}px`;
            }
            arr[i] = temp;
            bars[i].style.height = `${temp}px`;
            bars[j].classList.remove('active-bar');
            await new Promise(resolve => setTimeout(resolve, interval));
            bars[i].classList.remove('active-bar');
            i++;
            mid++;
            j++;
        }
        // if were doing the final merge, mark bars as sorted
        if (right - left === (bars.length - 1)) { // check if its the final merge
            if (i === 1) {
                bars[i - 1].classList.add('sorted-bar');
                //sortedGradient(i - 1);
            }
            bars[i].classList.add('sorted-bar');
            //sortedGradient(i);
        }
    }
    if (right - left === (bars.length - 1)) { // check if its the final merge
        while (i <= mid) {
            bars[i].classList.add('sorted-bar');
            //sortedGradient(i);
            await new Promise(resolve => setTimeout(resolve, interval));
            i++;
        }
        while (j <= right) {
            bars[j].classList.add('sorted-bar');
            //sortedGradient(j);
            await new Promise(resolve => setTimeout(resolve, interval));
            j++;
        }
    }
}
