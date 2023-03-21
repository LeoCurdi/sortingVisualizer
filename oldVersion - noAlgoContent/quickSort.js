
async function quickSortAlgo(integerArray, low, high, barArray) {
    if (low < high) {
        const pivotIndex = await partition(integerArray, low, high, barArray);

        await Promise.all([
        quickSortAlgo(integerArray, low, pivotIndex - 1, barArray),
        quickSortAlgo(integerArray, pivotIndex + 1, high, barArray)
        ]);
    }
    if (low >= 0 && high < integerArray.length) {
        for (let i = low; i <= high; i++) {
            barArray[i].classList.remove('rightArray');
            barArray[i].classList.remove('leftArray');
            barArray[i].classList.add('sortedBar');
        }
    }
}
  
async function partition(integerArray, low, high, barArray) {
    // select the pivot value
    const pivot = integerArray[high];

    barArray[high].classList.remove('rightArray');
    barArray[high].classList.remove('leftArray');
    barArray[high].classList.add('pivotBar');

    // reset the section of the array thats about to be partitioned to unsorted
    for (let a = low; a < high; a++) {
        barArray[a].classList.remove('leftArray');
        barArray[a].classList.remove('rightArray');
    }

    let i = low - 1;

    for (let j = low; j < high; j++) {
        barArray[j].classList.remove('rightArray');
        barArray[j].classList.remove('leftArray');
        barArray[j].classList.add('activeBar');

        await new Promise(resolve => setTimeout(resolve, interval));

        if (integerArray[j] < pivot) {
            i++;

            // swap
            swapInts(i, j);
            swapBars(i, j);

            barArray[i].classList.remove('rightArray');
            barArray[i].classList.add('leftArray');
        }

        barArray[j].classList.remove('activeBar');

        if (j != i) {
            barArray[j].classList.add('rightArray');
        }

    }
    barArray[high].classList.remove('pivotBar');

    // swap
    swapInts(i + 1, high);
    swapBars(i + 1, high);

    barArray[i + 1].classList.remove('rightArray');
    barArray[i + 1].classList.add('sortedBar');

    return i + 1;
}
