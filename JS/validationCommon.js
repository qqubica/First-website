function checkNumber(number){
    if(!value){
        return false;
    }
    if (isNaN(value)){
        return false;
    }
    return true;
}

function checkNumberBiggerThen(input, min){
    let value = parseFloat(input);
    if (value < min){
        return false;
    }
    return true;
}

function checkDate(value){
    if(!value){
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    return pattern.test(value);
}

function chceckDateAfter(date, after){
    const valueDate = new Date(date);
    const compareToDate = new Date(after);
    if(valueDate.getTime() < compareToDate.getTime()){
        return false;
    }
    return true;
}

function resetErrors(inputs, errorTexts, errorInfo) {
    for (let i = 0; i < inputs.length; i++){
        inputs[i].classList.remove("error-input");
    }
    for (let i = 0; i < errorTexts.length; i++){
        errorTexts[i].innerText = "";
    }
    errorInfo.innerText = "";
}

function checkRequired(value) {
    if (!value){
        return false;
    }
    value = value.toString().trim();
    if (value === ""){
        return false;
    }
    return true;
}

function checkTextLengthRange(value, min, max) {
    if (!value){
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    if (max && length > max){
        return false;
    }
    if (min && length < min){
        return false;
    }
    return true;
}