export default {
  fetchCategories: `
    SELECT
      id,
      name,
      description
    FROM categories
  `,

  userCheckByEmail: `
    SELECT
      id,
      phone_number,
      email,
      first_name,
      last_name,
      user_name
    FROM users
    WHERE email = $1;
  `,

  userSignup: `
    INSERT INTO users (
      phone_number,
      first_name,
      last_name,
      user_name,
      email,
      interests,
      password
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id, email;
  `,

  userLogin: `
    SELECT
      u.id,
      u.password,
      u.phone_number,
      u.first_name,
      u.last_name,
      u.user_name,
      u.email,
      u.interests
    FROM users u
    WHERE email = $1
  `,

};
