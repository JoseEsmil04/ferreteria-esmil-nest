import * as Joi from 'joi'


export const JoiSchema = Joi.object({
  PORT: Joi.string().default(4041),
  MONGODB_URI: Joi.string().required(),
  DEFAULT_LIMIT: Joi.number().default(4),
  JWT_KEY: Joi.string().required()
})