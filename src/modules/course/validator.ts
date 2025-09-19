import Joi from 'joi';


export const coursePayloadValidatorSchema = Joi.object({
  search: Joi.string().optional(),
  limit: Joi.string().optional(),
  page: Joi.string().optional(),
});


export const userEngagementPayloadValidatorSchema = Joi.object({
  course_id: Joi.string().required(),
  view_count: Joi.string().required(),
  scroll_time: Joi.number().required(),
});

export const recommendationPayloadValidatorSchema = Joi.object({
  limit: Joi.number().optional()
});
