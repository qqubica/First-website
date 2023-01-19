const Joi = require('joi');

const artistOnConcertSchema = Joi.object({
    Id: Joi.number()
        .optional()
        .allow(''),
    ArtistId: Joi.number()
        .required(),
    ConcertId: Joi.number()
        .required(),
    PerformanceNumber: Joi.number()
        .required(),
    PerformanceTime: Joi.number()
        .required(),
})

module.exports = artistOnConcertSchema;