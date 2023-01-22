function validateForm() {

    const venueInput = document.getElementById('Venue');
    const startDateInput = document.getElementById('StartDate');
    const finishDateInput = document.getElementById('FinishDate');

    const errorVenue = document.getElementById('errorVenue');
    const errorStartDate = document.getElementById('errorStartDate');
    const errorFinishDate = document.getElementById('errorFinishDate');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([venueInput, startDateInput, finishDateInput], [errorVenue, errorStartDate, errorFinishDate, errorsSummary], errorsSummary);

    let valid = true;

    // validate venue
    if (!checkTextLengthRange(venueInput.value, 2,200)){
        valid = false;
        venueInput.classList.add("error-input");
        errorVenue.innerText = "Pole może mieć od 2 do 200 znaków";
    }
    if (!checkRequired(venueInput.value)) {
        valid = false;
        venueInput.classList.add("error-input");
        errorVenue.innerText = "Pole jest wymagane";
    }

    // validate startDate
    if (!checkRequired(startDateInput.value)) {
        console.log(startDateInput.value)

        valid = false;
        startDateInput.classList.add("error-input");
        errorStartDate.innerText = "Pole jest wymagane";
    }
    if (isNaN(Date.parse(startDateInput.value))) {
        console.log(startDateInput.value)

        valid = false;
        startDateInput.classList.add("error-input");
        errorStartDate.innerText = "To nie jest data"
    }

    // validate finishDate
    if (!checkRequired(finishDateInput.value)) {
        valid = false;
        finishDateInput.classList.add("error-input");
        errorFinishDate.innerText = "Pole jest wymagane";
    }
    if (isNaN(Date.parse(finishDateInput.value))) {
        valid = false;
        finishDateInput.classList.add("error-input");
        errorFinishDate.innerText = "To nie jest data"
    }


    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }
    return valid;
}