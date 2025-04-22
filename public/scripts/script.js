document.getElementById("exercise-search").addEventListener("submit", handleSearchSubmit);


// Helper Function
function showElement(element) {
    element.classList.remove("hidden");
}
// Helper Function
function hideElement(element) {
    element.classList.add("hidden");
}


function handleSearchSubmit(event) {
    event.preventDefault(); // Stops form from submitting so we can validate input

    const muscleIds = {
        "abs": 10,
        "arms": 8,
        "back": 12,
        "calves": 14,
        "cardio": 15,
        "chest": 11,
        "legs": 9,
        "shoulders": 13
    };

    const userInput = event.target.elements.searchExercise.value.trim().toLowerCase();

    if (!(userInput in muscleIds)) {
        showElement(document.querySelector(".error-box")); // show error message
        return;
    }
    event.target.submit();
}

// Close error message when clicking the X
document.getElementById("close-error").addEventListener("click", function () {hideElement(document.querySelector(".error-box"))});


// Handle server-side errors when page loads
document.addEventListener("DOMContentLoaded", function() {
    // If there's a server-side error message displayed, set up the close button
    const errorBox = document.querySelector(".error-box:not(.hidden)");
    if (errorBox) {
        document.getElementById("close-error").addEventListener("click", function() {
            hideElement(errorBox);
        });
    }
});


// Prevent user from going to download endpoint after pressing enter
document.getElementById("workout-name")
    .addEventListener("keydown", e => {
    if (e.key === "Enter") e.preventDefault();
});


document.addEventListener("DOMContentLoaded", function() {
    const workoutForm = document.getElementById("workout-header");
    const workoutNameInput = document.getElementById("workout-name");
    
    // Add the invalid class on form invalid attempt
    workoutForm.addEventListener("invalid", function(event) {
        // Add submit-attempted class when browser detects invalid input
        workoutForm.classList.add("submit-attempted");
    }, true); 
    
    // Add specific handler for the download button
    const downloadButton = workoutForm.querySelector("button[type='submit']");
    downloadButton.addEventListener("click", function(event) {
        // Add submit-attempted class when download button is clicked
        workoutForm.classList.add("submit-attempted");
    });

    // Clear the submit-attempted class when user starts typing again
    workoutNameInput.addEventListener("input", function() {
        workoutForm.classList.remove("submit-attempted");
    });
});