const Joi = require('joi');

const concertSchema = Joi.object({
    Id: Joi.number()
        .optional()
        .allow(''),
    Venue: Joi.number()
        .required(),
    StartDate: Joi.date()
        .required(),
    FinishDate: Joi.date()
        .required(),
})

module.exports = concertSchema;