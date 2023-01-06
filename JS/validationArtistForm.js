function validateForm(){
    const firstNameInput = document.getElementById('FirstName');
    const lastNameInput = document.getElementById('LastName');
    const pseudonymInput = document.getElementById('Pseudonym');
    const birthdateInput = document.getElementById('Birthdate');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorPseudonym = document.getElementById('errorPseudonym');
    const errorBirthdate = document.getElementById('errorBirthdate');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([firstNameInput, lastNameInput, pseudonymInput, birthdateInput],[errorFirstName, errorLastName, errorPseudonym, errorBirthdate], errorsSummary);

    let valid = true;

    validateFirstName(firstNameInput, valid, errorFirstName);

    validateLastName(lastNameInput, valid, errorLastName);

    validatePseudonym(pseudonymInput, valid, errorPseudonym);

    validateDate(birthdateInput, valid, errorBirthdate);

    if(!valid){
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}
function validatePseudonym(pseudonymInput, isFormValid, error) {
    let minimalLength = 2;
    let maximalLength = 50;

    if(!checkTextLengthRange(pseudonymInput, minimalLength, maximalLength)){
        isFormValid = false;
        pseudonymInput.classList.add("error-input");
        error.innerText = "Pole może mieć od " + minimalLength + " do " + maximalLength;
    }
}
function validateFirstName(firstNameInput, isFormValid, error) {
    let minimalLength = 2;
    let maximalLength = 50;

    if (!checkRequired(firstNameInput)){
        isFormValid = false;
        firstNameInput.classList.add("error-input");
        error.innerText = "Pole jest wymagane";
        return;
    }

    if (!checkTextLengthRange(firstNameInput, minimalLength, maximalLength)) {
        isFormValid = false;
        firstNameInput.classList.add("error-input");
        error.innerText = "Pole może mieć od " + minimalLength + " do " + maximalLength;
    }
}

function validateLastName(lastNameInput, isFormValid, error) {
    let minimalLength = 2;
    let maximalLength = 100;

    if (!checkRequired(lastNameInput)){
        isFormValid = false;
        lastNameInput.classList.add("error-input");
        error.innerText = "Pole jest wymagane"
        return;
    }

    if (!checkTextLengthRange(lastNameInput, minimalLength, maximalLength)){
        isFormValid = false;
        lastNameInput.classList.add("error-input");
        error.innerText = "Pole może mieć od " + minimalLength + " do " + maximalLength;
    }
}

function validateDate(date, isFormValid, error) {
    if (isNaN(Date.parse(date.toString()))){
        isFormValid = false;
        date.classList.add("error-input");
        error.innerText = "To nie jest data"
    }
}