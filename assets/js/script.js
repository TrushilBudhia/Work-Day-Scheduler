// Step 1 - Display current day at the top of the calendar
// Step 2 - Display timeblocks for standard business hours - 9am - 5pm
// Step 3 - Each timeblock is colour coded for past, present and future hours
// Step 4 - Allow timeblock to take text - textarea
// Step 5 - Once save button is clicked the text typed is saved to local storage
// On page refresh the events entered persist

// VARIABLES
var containerSelect = $('.container');
var currentDay = $('#currentDay');
var currentHour = moment().format('H');
var currentTime = moment().format('LT')
console.log(currentHour);

var displayDate = moment();
currentDay.text(displayDate.format('dddd, MMMM Do YYYY'));

var workSchedulerHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

// Using a for loop to cycle through the length of the workSchedulerHours (9am - 5pm)
for(i = 0; i < workSchedulerHours.length; i++) {
    // Creating the Work Day Scheduler
    var hourRow = $('<div></div>');
    var hourColumnFirst = $('<div></div>');
    var hourColumnSecond = $('<div></div>');
    var hourForm = $('<form></form>');
    var hourTextArea = $('<textarea></textarea>');
    var hourColumnThird = $('<div></div>');
    var hourSaveButton = $('<button></button>');

    // Adding class attributes to the created elements - using bootstrap class names for the styling
    hourRow.attr('class', 'row d-flex text-center align-items-center');

    hourColumnFirst.attr('class', 'col text-center border border-right-0 border-secondary h-100 pt-4');
    hourColumnFirst.text(workSchedulerHours[i]);

    hourColumnSecond.attr('class', 'col-md-8 border border-secondary h-100');
    hourForm.attr('class', 'h-100 w-100');
    hourForm.attr('data-number', workSchedulerHours[i]);
    hourTextArea.attr('class', 'border h-100 w-100');
    hourTextArea.attr('id', 'textarea-' + workSchedulerHours[i]);
    hourTextArea.text(localStorage.getItem('enteredNote' + workSchedulerHours[i]));

    hourColumnThird.attr('class', 'col p-0');
    hourSaveButton.attr('class', 'saveButton btn-primary w-100 rounded-0-left rounded-right');
    hourSaveButton.attr('data-number', workSchedulerHours[i]);
    hourSaveButton.attr('style', 'height: 79px;');
    hourSaveButton.text('Save');

    // Appending the created elements to the html (to the div with the class of container)
    hourRow.append(hourColumnFirst);
    hourForm.append(hourTextArea);
    hourColumnSecond.append(hourForm);
    hourRow.append(hourColumnSecond);
    hourColumnThird.append(hourSaveButton);
    hourRow.append(hourColumnThird);
    containerSelect.append(hourRow);
    
    // Using an if and else statement to check what hours are in the past, present and future. Styling each block with different backgroud colours depending on whether they are in the past, present or future
    if(workSchedulerHours[i] < currentHour) {
        hourColumnSecond.attr('style', 'background: #d3d3d3');
        console.log('Past hours ' + workSchedulerHours[i]);
    } else if(workSchedulerHours[i] == currentHour) {
        hourColumnSecond.attr('style', 'background: #ff6869');
        console.log('Current hour ' + workSchedulerHours[i]);
    } else {
        hourColumnSecond.attr('style', 'background: #68ff80');
        console.log('Future hours ' + workSchedulerHours[i]);
    }

    // Using an if and else statement to display the correct am and pm times for the working day
    if(workSchedulerHours[i] < 12) {
        hourColumnFirst.text(workSchedulerHours[i] + ' am');
    } else if(workSchedulerHours[i] > 12) {
        hourColumnFirst.text(workSchedulerHours[i] - 12 + ' pm');
    } else {
        hourColumnFirst.text(workSchedulerHours[i] + ' pm');
    }
}

// Creating a function to add the inputed note from the user to the local storage
function saveUserInput() {
    var index = $(this).attr('data-number');
    var textareaIndexSelect = $('#textarea-' + index);
    var userInputNote = textareaIndexSelect.val();
    
    console.log(index);
    console.log(textareaIndexSelect);
    console.log(userInputNote);
    localStorage.setItem('enteredNote' + index, userInputNote);
}

// Adding a click event to the save button - saveUserInput function will be invoked
var saveButton = $('.saveButton');
saveButton.on('click', saveUserInput);


// Adding a keypress event (for the Enter key) in the the form - inputed note from the user will be saved to the local storage
var formSelect = $('form');
formSelect.keypress(function (event) {
    var key = event.which;
    if(key == 13) {
        console.log("Enter key pressed");
        var index = $(this).attr('data-number');
        var textareaIndexSelect = $('#textarea-' + index);
        var userInputNote = textareaIndexSelect.val();
        localStorage.setItem('enteredNote' + index, userInputNote);
    };
});


