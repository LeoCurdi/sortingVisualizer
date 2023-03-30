
// heap sort
async function heapSortAlgo() {
    // Build max heap (this isnt an actual binary tree data structure, just a specific rearrangement of the array to simulate one)
    for (let middle = Math.floor(integerArray.length / 2) - 1; middle >= 0; middle--) {
        await heapify(integerArray, middle, integerArray.length);
    }
    // we now have our heap in max form
  
    // Extract elements from heap one by one
    for (let i = integerArray.length - 1; i > 0; i--) {
        // Move current root to end
        [integerArray[0], integerArray[i]] = [integerArray[i], integerArray[0]];
        swapBars(0, i);

        // check for reset
        if (resetButton) { 
            return;
        }

        barArray[i].classList.add('sortedBar');

        await new Promise(resolve => setTimeout(resolve, interval));

        // re heapify reduced heap
        await heapify(integerArray, 0, i);
    }
    barArray[0].classList.add('sortedBar');
}
  
async function heapify(integerArray, root, heapSize) {

    // check for reset
    if (resetButton) { 
        return;
    }

    let largest = root;
    let left = 2 * root + 1; // if you draw out the tree, you can see that left is the left child of root and right is the right child of root
    let right = 2 * root + 2;

    barArray[largest].classList.add('activeBar');
    if (left < heapSize) {
        barArray[left].classList.add('activeBar');
    }
    if (right < heapSize) {
        barArray[right].classList.add('activeBar');
    }

    await new Promise(resolve => setTimeout(resolve, interval));
    
    // check for reset
    if (resetButton) {
        barArray[root].classList.remove('activeBar'); 
        if (left < heapSize) {
            barArray[left].classList.remove('activeBar');
        }
        if (right < heapSize) {
            barArray[right].classList.remove('activeBar');
        }
        return; 
    }
  
    if (left < heapSize && integerArray[left] > integerArray[largest]) { // if left points to an element inside the array (left child exists), and left child is greater than root
        barArray[root].classList.remove('activeBar'); 
        largest = left;
    }
    else if (left < heapSize) {
        barArray[left].classList.remove('activeBar'); 
    }
  
    if (right < heapSize && integerArray[right] > integerArray[largest]) { // if right points to an element inside the array (right child exists), and right child is greater than either left child or root
        barArray[largest].classList.remove('activeBar'); 
        largest = right;
    }
    else if (right < heapSize) {
        barArray[right].classList.remove('activeBar');
    }

    barArray[largest].classList.remove('activeBar'); 
  
    if (largest !== root) {
        [integerArray[root], integerArray[largest]] = [integerArray[largest], integerArray[root]] // javascript method for swapping root and largest. [a, b] = [b, a] swaps the values of a and b
        swapBars(root, largest);
        
        await new Promise(resolve => setTimeout(resolve, interval));
        
        await heapify(integerArray, largest, heapSize);
    }
}
  