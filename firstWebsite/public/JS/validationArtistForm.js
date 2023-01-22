function validateForm(){

    const firstNameInput = document.getElementById('firstName');
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

    // validate firstName
    if (!checkRequired(firstNameInput.value)){
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";
    }
    if (!checkTextLengthRange(firstNameInput.value, 2, 50)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole może mieć od " + 2 + " do " + 50;
    }

    // validate lastName
    if (!checkRequired(lastNameInput.value)){
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole jest wymagane"
    }
    if (!checkTextLengthRange(lastNameInput.value, 2, 100)){
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole może mieć od " + 2 + " do " + 100;
    }

    // validate pseudonym
    if(!checkTextLengthRange(pseudonymInput.value, 0, 50)){
        valid = false;
        pseudonymInput.classList.add("error-input");
        errorPseudonym.innerText = "Pole może mieć od " + 0 + " do " + 50;
    }

    // validate birthdate
    if (isNaN(Date.parse(birthdateInput.value))){
        valid = false;
        birthdateInput.classList.add("error-input");
        errorBirthdate.innerText = "To nie jest data"
    }

    if(!valid){
        errorsSummary.innerText = "Formularz zawiera błędy";
    }
    return valid;
}