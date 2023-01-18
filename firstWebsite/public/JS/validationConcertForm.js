function validateForm(){


    const venueInput = document.getElementById('Venue');
    const startDateInput = document.getElementById('StartDate');
    const finishDateInput= document.getElementById('FinishDate');

    const errorVenue = document.getElementById('errorVenue');
    const errorStartDate = document.getElementById('errorStartDate');
    const errorFinishDate = document.getElementById('errorFinishDate');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([venueInput, startDateInput, finishDateInput], [errorVenue, errorStartDate, errorFinishDate, errorsSummary], errorsSummary);

    let valid = true;

    validateVenue(venueInput, valid, errorVenue);

    validateStartDate(startDateInput, valid, errorStartDate);

    validateFinishDate(finishDateInput, valid, errorFinishDate);

    if (!valid){
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;

}

function validateVenue(venueInput, valid, error){
    if (!checkRequired(venueInput)){
        valid = false;
        venueInput.classList.add("error-input");
        error.innerText = "Pole jest wymagane";
        return;
    }
}

function  validateStartDate(startDateInput, valid, error){
    if (!checkRequired(startDateInput)) {
        valid = false;
        startDateInput.classList.add("error-input");
        error.innerText = "Pole jest wymagane";
        return;
    }
    if (isNaN(Date.parse(startDateInput.toString()))) {
        valid = false;
        startDateInput.classList.add("error-input");
        error.innerText = "To nie jest data"
        return;
    }
}

function  validateFinishDate(finishDateInput, valid, error) {
    if (!checkRequired(finishDateInput)) {
        valid = false;
        finishDateInput.classList.add("error-input");
        error.innerText = "Pole jest wymagane";
        return;
    }

    if (isNaN(Date.parse(finishDateInput.toString()))) {
        valid = false;
        finishDateInput.classList.add("error-input");
        error.innerText = "To nie jest data"
        return;
    }
}