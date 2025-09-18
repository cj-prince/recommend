export default {
  fetchCourses: `
    SELECT
      id,
      title,
      description,
      category,
      popularity_score
    FROM courses
    WHERE (name ILIKE '%' || $3 || '%' OR $3 = '' OR $3 IS NULL)
    ORDER BY updated_at DESC
    OFFSET $1
    LIMIT $2
  `,


  fetchCourseById: `
    SELECT
      id,
      title,
      description,
      category,
      popularity_score
    FROM courses
    WHERE id = $1
  `,

  updateUserCourseEngagement: `
    UPDATE user_engagement
    SET
      view_count = view_count + 1,
      last_viewed_at = NOW()
    WHERE course_id = $1 AND user_id = $2
    RETURNING *
  `,

  updateCourseStats: `
    UPDATE course_stats
    SET
      views_count = view_count + 1,
      last_viewed_at = NOW()
    WHERE course_id = $1
    RETURNING *
  `,

};
