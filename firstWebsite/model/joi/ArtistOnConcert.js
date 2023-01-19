const Joi = require('joi');

const errMessages = (error) => {
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

const artistOnConcertSchema = Joi.object({
    Id: Joi.number()
        .optional()
        .allow(''),
    ArtistId: Joi.number()
        .required()
        .error(errMessages),
    ConcertId: Joi.number()
        .required()
        .error(errMessages),
    PerformanceNumber: Joi.number()
        .required()
        .positive()
        .error(errMessages),
    PerformanceTime: Joi.number()
        .required()
        .positive()
        .error(errMessages),
})

module.exports = artistOnConcertSchema;