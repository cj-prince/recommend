export default {
fetchCourses: `
  SELECT
    id,
    title,
    description,
    category,
    popularity_score,
    tags,
    conversion_rate
  FROM courses
  WHERE ($3 = '' OR $3 IS NULL OR title ILIKE '%' || $3 || '%' OR description ILIKE '%' || $3 || '%')
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

  userCourseEngagement:`
      INSERT INTO user_engagement (user_id, course_id, view_count, total_scroll_time, last_viewed_at)
      VALUES ($1, $2, 1, $3, NOW())
      ON CONFLICT (user_id, course_id)
      DO UPDATE SET
          view_count = user_engagement.view_count + 1,
          total_scroll_time = user_engagement.total_scroll_time + $3,
          last_viewed_at = NOW()
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

  fetchUserCourseData: `
    SELECT 
        u.id, u.email, u.user_name, u.interests, u.interest_tags,
        json_object_agg(
            ue.course_id, 
            json_build_object(
                'view_count', ue.view_count,
                'total_scroll_time', ue.total_scroll_time,
                'last_viewed_at', ue.last_viewed_at
            )
        ) as engagement
    FROM users u
    LEFT JOIN user_engagement ue ON u.id = ue.user_id
    WHERE u.id = $1
    GROUP BY u.id
  `,

  getCourses:`
      SELECT 
          id, title, description, tags, category, 
          popularity_score, conversion_rate
      FROM courses
      ORDER BY popularity_score DESC
  `,


  getMaxPopularity: `
      SELECT MAX(popularity_score) as max_popularity
      FROM courses
  `

};
