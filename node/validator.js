function ValidateEmail(inputText) {

    const ErrValidation = "Invalid Email Address";
    
    const returnVal = {
        error: null,
        value: null
    }

    var mailformat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
    if (inputText.match(mailformat)) {
        return true;
    } else {
        returnVal.error = new Error(ErrValidation);
        return false;
    }
}

function ValidateRisks(riskOne, riskTwo) {

    const returnVal = {
        error: null,
        value: null
    }

    if (riskOne === riskTwo) {
        returnVal.error = new Error("Risks cannot be the same");
        return returnVal
    }

    if (riskOne === "ALL" && riskTwo === "DAMAGE") {
        returnVal.value = "High"
        return returnVal
    }

    returnVal.value = "Low"

    return returnVal

}

module.exports = {
    ValidateEmail,
    ValidateRisks
}