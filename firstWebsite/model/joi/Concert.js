const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code){
            case 'string empty':
                err.message = "Pole jest wymagane";
                break;
            case 'string.min':
                err.message = "Pole powinno zawierać min ${err.local.limit} znaki";
                break;
            case 'string.max':
                err.message = "Pole powinno zawierać max ${err.local.limit} znaki";
                break;
            default:
                console.log("Error code not know")
                console.error(err.message)
                console.log("Error code not know")
                break;
        }
    })

    return errors;
};

const concertSchema = Joi.object({
    Id: Joi.number()
        .optional()
        .allow(''),
    Venue: Joi.number()
        .required()
        .error(errMessages),
    StartDate: Joi.date()
        .required()
        .error(errMessages),
    FinishDate: Joi.date()
        .required()
        .error(errMessages),
})

module.exports = concertSchema;