import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';

const joiPassword = Joi.extend(joiPasswordExtendCore);

export const passwordSchema = Joi.object({
  password: joiPassword
    .string()
    .min(8)
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .required()
    .messages({
      'password.minOfUppercase':
        '{#label} should contain at least {#min} uppercase character',
      'password.minOfSpecialCharacters':
        '{#label} should contain at least {#min} special character',
      'password.minOfLowercase':
        '{#label} should contain at least {#min} lowercase character',
      'password.minOfNumeric':
        '{#label} should contain at least {#min} numeric character',
      'password.noWhiteSpaces': '{#label} should not contain white spaces',
    }),
});

export const userGetStartedPayloadValidatorSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  user_name: Joi.string().optional(),
  email: Joi.string().required(),
  password: passwordSchema.extract('password'),
  interests: Joi.array().items(Joi.string()).min(3).required(),
  consent: Joi.boolean().valid(true).required(),
});


export const userLoginPayloadValidatorSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
