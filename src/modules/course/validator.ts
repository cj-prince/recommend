import Joi from 'joi';


export const coursePayloadValidatorSchema = Joi.object({
  search: Joi.string().optional(),
  limit: Joi.string().optional(),
  page: Joi.string().optional(),
});


export const userEngagementPayloadValidatorSchema = Joi.object({
  course_id: Joi.string().required(),
  view_count: Joi.string().required(),
  last_viewed_at: Joi.string().required(),
});
