
async function mergeSortAlgo(integerArray, left, right) {
    if (left < right) {
        let middle = Math.floor((left + right) / 2);

        // visulaize the dividing process (this only really works with the await Promise.all version of the recursive call)
/*         barArray[middle].classList.add('activeBar');
        await new Promise(resolve => setTimeout(resolve, interval * 4));
        barArray[middle].classList.remove('activeBar'); */

        //await Promise.all([ // uncomment the await Promise.all and remove the await before each mergeSort1 call to see all of the merges happen simultaneously
        await mergeSortAlgo(integerArray, left, middle),
        await mergeSortAlgo(integerArray, middle + 1, right)
        //]);

        // check for reset
        if (resetButton) { 
            return; 
        }

        await merge(integerArray, left, middle, right);
    }
}

async function merge(integerArray, left, middle, right) {
    let i = left, j = middle + 1;
    
    while (i <= middle && j <= right) {

        // check for reset
        if (resetButton) { 
            return; 
        }

        // see if the first unsorted value on the right partition is larger than the first unsorted value on the left partition
        if (integerArray[i] <= integerArray[j]) {
            barArray[i].classList.add('activeBar');

            await new Promise(resolve => setTimeout(resolve, interval * 2));

            barArray[i].classList.remove('activeBar');
            i++;
        } 
        // if not, merge it over
        else {
            barArray[i].classList.add('activeBar');
            barArray[j].classList.add('activeBar');

            await new Promise(resolve => setTimeout(resolve, interval));

            barArray[j].classList.remove('activeBar');

            // Shift elements to the right to make space for the element being merged
            const temp = integerArray[j];
            for (let k = j - 1; k >= i; k--) {

                // check for reset
                if (resetButton) { 
                    return; 
                }

                integerArray[k + 1] = integerArray[k];

                // adjust bar height
                barHeight = barIntegerConversion * integerArray[k];
                barArray[k + 1].style.height = `${barHeight}vh`;
            }

            // adjust bar height
            integerArray[i] = temp;
            barHeight = barIntegerConversion * temp;
            barArray[i].style.height = `${barHeight}vh`;

            barArray[j].classList.remove('activeBar');

            await new Promise(resolve => setTimeout(resolve, interval));

            barArray[i].classList.remove('activeBar');

            i++, middle++, j++;
        }

        // if we're doing the final merge, mark bars as sorted
        if (right - left === (barArray.length - 1)) { // check if its the final merge
            if (i === 1) {
                barArray[i - 1].classList.add('sortedBar');
            }
            barArray[i].classList.add('sortedBar');
        }
    }
    if (right - left === (barArray.length - 1)) { // check if its the final merge
        while (i <= middle) {
            barArray[i].classList.add('sortedBar');

            await new Promise(resolve => setTimeout(resolve, interval));

            i++;
        }
        while (j <= right) {
            barArray[j].classList.add('sortedBar');
            
            await new Promise(resolve => setTimeout(resolve, interval));

            j++;
        }
    }
}
