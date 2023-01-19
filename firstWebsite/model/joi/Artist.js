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

const artistSchema = Joi.object({
    Id: Joi.number()
        .optional()
        .allow(''),
    FirstName: Joi.string()
        .min(2)
        .max(50)
        .required()
        .error(errMessages),
    LastName: Joi.string()
        .min(2)
        .max(100)
        .required()
        .error(errMessages),
    Pseudonym: Joi.string()
        .max(200)
        .optional()
        .error(errMessages),
    Birthdate: Joi.date()
        .optional()
        .error(errMessages),
})

module.exports = artistSchema;