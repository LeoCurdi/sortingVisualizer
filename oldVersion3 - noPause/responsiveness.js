

// check if we're on mobile (aka if we're on a vertical screen)
var screenWidth = window.innerWidth; // grab screen width
var screenHeight = window.innerHeight; // grab screen height
var mobileScreen = screenWidth * 0.65/* fudge it so it counts pc half tabs as mobile screen */ < screenHeight; // check if mobile screen. mobile screen is a bool that stores true or false

// grab stuff to modify
let speedSlider = document.querySelector('#speed');
let buttons = document.querySelector('#buttons');
let controlsR = document.querySelector('#controls');
let row1 = document.querySelector('.row1');
let row2 = document.querySelector('.row2');


// burner: was trying to make the height of bars adjust based on screen height
/* var percentage = 80;
var ctrlheight = controls.offsetHeight + parseInt(window.getComputedStyle(controls).getPropertyValue("padding-top")) + parseInt(window.getComputedStyle(controls).getPropertyValue("padding-bottom"));
var totalHeight = window.screen.height;
var remainingHeight = totalHeight - ctrlheight; // height in pixels available for bars
percentage = remainingHeight / totalHeight * 120; */
// burner ^^


var barIntegerConversion = 70 / 550;

// if we're on mobile. All of this only happens on page load / refresh
if (mobileScreen) {
    speedSlider.style.marginRight = '0.5em';
    buttons.style.display = 'block';
    controlsR.style.padding = '1rem 0';
    row1.style.marginBottom = '1.5em';
    row2.style.marginBottom = '1.5em';

    barContainer.style.height = '60vh';
    barIntegerConversion = 55 / 550;
}

// continuously check if the window size changed, and perform the rearranging if necessary
window.addEventListener('resize', function(event) {

    // burner
/*     var ctrlheight = controls.offsetHeight + parseInt(window.getComputedStyle(controls).getPropertyValue("padding-top")) + parseInt(window.getComputedStyle(controls).getPropertyValue("padding-bottom"));
    var totalHeight = window.screen.height;
    var remainingHeight = totalHeight - ctrlheight; // height in pixels available for bars
    percentage = remainingHeight / totalHeight * 100; */
    // burner ^^

    mobileScreen = window.innerWidth * 0.65 < window.innerHeight;

    // if we're on vertical screen.
    if (mobileScreen) {
        speedSlider.style.marginRight = '0.5em';
        buttons.style.display = 'block';
        controlsR.style.padding = '1rem 0';
        row1.style.marginBottom = '1.5em';
        row2.style.marginBottom = '1.5em';
    
/*         barContainer.style.height = '60vh';
        barIntegerConversion = 55 / 550; */
    }
    // if we're no longer on a vertical screen
    else {
        speedSlider.style.marginRight = '1.15em';
        buttons.style.display = 'flex';
        controlsR.style.padding = '1.9rem 0';
        row1.style.marginBottom = '0';
        row2.style.marginBottom = '0';
    
/*         barContainer.style.height = '80vh';
        barIntegerConversion = 80 / 550; */
    }
});