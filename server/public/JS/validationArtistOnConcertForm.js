function validateForm() {

    const artistSelect = document.getElementById('Artysta');
    const locationSelect = document.getElementById('Venue');
    const durationInput = document.getElementById('Duration');
    const orderInput = document.getElementById('PerformanceId');

    const errorArtistSelect = document.getElementById('errorArtistId');
    const errorLocationSelect = document.getElementById('errorConcertId');
    const errorDurationInput = document.getElementById('errorDuration');
    const errorOrderInput = document.getElementById('errorPerformanceId');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([artistSelect, locationSelect, durationInput, orderInput], [errorArtistSelect, errorLocationSelect, errorDurationInput, errorOrderInput], errorsSummary);

    let valid = true;

    // validate artistSelect
    if (!checkRequired(artistSelect.value)) {
        valid = false;
        artistSelect.classList.add("error-input");
        errorArtistSelect.innerText = "Pole jet wymagane"
    }

    // validate locationSelect
    if (!checkRequired(locationSelect.value)) {
        valid = false;
        locationSelect.classList.add("error-input");
        errorLocationSelect.innerText = "Pole jest wymagane";
    }

    // validate durationInput
    if (!checkNumber(durationInput.value)) {
        valid = false;
        durationInput.classList.add("error-input");
        errorDurationInput.innerText = "Wartość musi być liczbą";
    }
    if (checkNumberBiggerThen(durationInput.value, 0)) {
        valid = false;
        durationInput.classList.add("error-input");
        errorDurationInput.innerText = "Wartość musi być większ od 0"
    }
    if (!checkRequired(durationInput.value)) {
        valid = false;
        durationInput.classList.add("error-input");
        errorDurationInput.innerText = "Pole jest wymagane";
    }

    // validate orderInput
    if (checkNumberBiggerThen(orderInput.value, 0)) {
        valid = false;
        orderInput.classList.add("error-input");
        errorOrderInput.innerText = "Wartość musi być większa od 0"
        console.log("small")
    }
    if (!checkNumber(orderInput.value)) {
        valid = false;
        orderInput.classList.add("error-input");
        errorOrderInput.innerText = "Wartość musi być liczbą";
        console.log("num")
    }
    if (!checkRequired(orderInput.value)) {
        valid = false;
        orderInput.classList.add("error-input");
        errorOrderInput.innerText = "Pole jest wymagane";
        console.log("req")
    }


    if (!valid) {
        errorsSummary.innerText = "Formularz zwiera błędy";
    }
    return valid;
}