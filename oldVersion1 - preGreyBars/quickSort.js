
async function quickSort() {
    const arr = getIntArrayFromBars();
    disableButtons();
    await quickSort1(arr, 0, arr.length - 1, bars); // the await makes it so anything after the quicksort1 call - such as enable buttons - wont execute until sorting is complete. this is necessary because there are recursive calls happening asyncly so its impossible to tell when it would be done
    enableButtons();
}

async function quickSort1(arr, low, high, bars) {
    if (low < high) {
      const pivotIndex = await partition(arr, low, high, bars);
      await Promise.all([
        quickSort1(arr, low, pivotIndex - 1, bars),
        quickSort1(arr, pivotIndex + 1, high, bars)
      ]);
    }
    if (low >= 0 && high < arr.length) {
        for (let i = low; i <= high; i++) {
          bars[i].classList.remove('rightArray');
          bars[i].classList.remove('leftArray');
          bars[i].classList.add('sorted-bar');
        }
      }
  }
  
async function partition(arr, low, high, bars) {
  const pivot = arr[high];
  bars[high].classList.remove('rightArray');
  bars[high].classList.remove('leftArray');
  bars[high].classList.add('pivotBar');
  // reset the section of the array thats about to be partitioned to unsorted
  for (let a = low; a < high; a++) {
    bars[a].classList.remove('leftArray');
    bars[a].classList.remove('rightArray');
  }
  let i = low - 1;
  for (let j = low; j < high; j++) {
    bars[j].classList.remove('rightArray');
    bars[j].classList.remove('leftArray');
    bars[j].classList.add('active-bar');
    await new Promise(resolve => setTimeout(resolve, interval));
    if (arr[j] < pivot) {
      i++;
      swapInts(arr, i, j);
      swapBars(i, j);
      bars[i].classList.remove('rightArray');
      bars[i].classList.add('leftArray');
    }
    bars[j].classList.remove('active-bar');
    if (j != i) {
      bars[j].classList.add('rightArray');
    }
  }
  bars[high].classList.remove('pivotBar');
  swapInts(arr, i + 1, high);
  swapBars(i + 1, high);
  bars[i + 1].classList.remove('rightArray');
  bars[i + 1].classList.add('sorted-bar');
  return i + 1;
}
