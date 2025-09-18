CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE IF NOT EXISTS users (
  id VARCHAR PRIMARY KEY DEFAULT LOWER(CAST(uuid_generate_v1mc() AS VARCHAR(50))),
  first_name CITEXT NULL,
  user_name CITEXT NULL,
  last_name CITEXT NULL,
  email CITEXT UNIQUE NULL,
  password VARCHAR(255) NULL,
  country_code VARCHAR NULL,
  phone_number VARCHAR UNIQUE NULL,
  interests JSONB DEFAULT '[]',
  interest_tags JSONB DEFAULT '[]',
  last_login TIMESTAMPTZ DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE categories (
    id VARCHAR PRIMARY KEY DEFAULT 'cat-' || REPLACE(CAST(uuid_generate_v4() AS VARCHAR(36)), '-', ''),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE courses (
    id VARCHAR PRIMARY KEY DEFAULT 'cou-' || REPLACE(CAST(uuid_generate_v4() AS VARCHAR(36)), '-', ''),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    tags JSONB DEFAULT '[]',
    category VARCHAR REFERENCES categories(id),
    popularity_score FLOAT DEFAULT 0,
    conversion_rate FLOAT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE user_engagement (
    id VARCHAR PRIMARY KEY DEFAULT 'engage-' || LOWER(REPLACE(CAST(uuid_generate_v4() AS VARCHAR(50)), '-', '')),
    user_id VARCHAR REFERENCES users(id),
    course_id VARCHAR REFERENCES courses(id), 
    view_count INTEGER DEFAULT 0,
    total_scroll_time INTEGER DEFAULT 0,
    last_viewed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, course_id)
);

CREATE TABLE enrollments (
    id VARCHAR PRIMARY KEY DEFAULT 'enroll-' || LOWER(REPLACE(CAST(uuid_generate_v4() AS VARCHAR(50)), '-', '')),
    user_id VARCHAR REFERENCES users(id), 
    course_id VARCHAR REFERENCES courses(id),
    progress_percentage FLOAT DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE,
    enrolled_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, course_id)
);

CREATE TABLE course_stats (
  id VARCHAR PRIMARY KEY DEFAULT LOWER(CAST(uuid_generate_v1mc() AS VARCHAR(50))),
  course_id VARCHAR REFERENCES courses(id), 
  views_count BIGINT DEFAULT 0,
  last_view_at TIMESTAMP,
  avg_scroll_time_ms FLOAT DEFAULT 0
);