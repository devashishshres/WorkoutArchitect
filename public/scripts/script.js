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

document.getElementById("close-error").addEventListener("click", function () {hideElement(document.querySelector(".error-box"))});

