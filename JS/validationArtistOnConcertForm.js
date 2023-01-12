function validateForm() {
    const artistSelect = document.getElementById('Artysta');
    const locationSelect = document.getElementById('Venue');
    const durationInput = document.getElementById('Duration');
    const orderInput = document.getElementById('PerformanceId');

    const errorArtistSelect = document.getElementById('errorArtist');
    const errorLocationSelect = document.getElementById('errorVenue');
    const errorDurationInput = document.getElementById('errorDuration');
    const errorOrderInput = document.getElementById('errorPerformanceId');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([artistSelect, locationSelect, durationInput, orderInput],[errorArtistSelect, errorLocationSelect, errorDurationInput, errorOrderInput], errorsSummary);

    let valid = true;
    validateArtistSelect(artistSelect, valid, errorArtistSelect);
    validateLocationSelect(locationSelect, valid, errorLocationSelect);
    validateDurationInput(durationInput, valid, errorDurationInput);
    validteOrderInput(orderInput, valid, errorOrderInput);
    if (!valid){
        errorsSummary.innerText = "Formularz zwiera błędy";
    }
    return valid;
}

function validteOrderInput(orderInput, valid, error){
    if(!checkRequired(orderInput)){
        valid = false;
        orderInput.classList.add("error-input");
        error.innerText = "Pole jest wymagane";
        return;
    }
    if(!checkNumber(orderInput)){
        valid = false;
        orderInput.classList.add("errr-input");
        error.innerText = "Wartość musi być liczbą";
        return;
    }
    if(checkNumberBiggerThen(orderInput, 0)){
        valid = false;
        orderInput.classList.add("error-input");
        error.innerText = "Wartość musi być większa od 0"
        return;
    }
}

function validateDurationInput(durationInput, valid, error){
    if(!checkRequired(durationInput)){
        valid = false;
        durationInput.classList.add("error-input");
        error.innerText = "Pole jest wymagane";
        return;
    }
    if(!checkNumber(durationInput)){
        valid = false;
        durationInput.classList.add("error-input");
        error.innerText = "Wartość musi być liczbą";
        return;
    }
    if(checkNumberBiggerThen(durationInput, 0)){
        valid = false;
        durationInput.classList.add("error-input");
        error.innerText = "Wartość musi być większ od 0"
        return;
    }
}

function validateLocationSelect(locationSelect, valid, error){
    if(!checkRequired(locationSelect)){
        valid = false;
        locationSelect.classList.add("error-input");
        error.innerText = "Pole jest wymagane";
        return;
    }
}
function validateArtistSelect(artistSelect, valid, error){
    if(!checkRequired(artistSelect)){
        valid = false;
        artistSelect.classList.add("error-input");
        error.innerText = "Pole jet wymagane"
        return;
    }
}