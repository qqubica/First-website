const Joi = require('joi');

const artistSchema = Joi.object({
    Id: Joi.number()
        .optional()
        .allow(''),
    FirstName: Joi.string()
        .min(2)
        .max(50)
        .required(),
    LastName: Joi.string()
        .min(2)
        .max(100)
        .required(),
    Pseudonym: Joi.string()
        .max(200)
        .optional(),
    Birthdate: Joi.date()
        .optional(),
})

module.exports = artistSchema;