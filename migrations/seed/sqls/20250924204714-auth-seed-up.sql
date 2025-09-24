-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Insert sample categories
INSERT INTO categories (id, name, description) VALUES
('4aa13364-89a6-11f0-905d-8b54e6b4ec6c', 'Web Development', 'Learn to build modern web applications'),
('4aa13364-89a6-11f0-9055-8b54e6b4ec7b', 'Data Science', 'Data analysis, machine learning, and AI'),
('4aa13364-89a6-11f0-9055-8b54e6b4ec7c', 'Mobile Development', 'iOS and Android app development'),
('4aa13364-89a6-11f0-9055-8b54e6b4ec7d', 'UI/UX Design', 'User interface and experience design'),
('4aa13364-89a6-11f0-9055-8b54e6b4ec7e', 'Business & Marketing', 'Business strategy and digital marketing');

-- Insert sample courses
INSERT INTO courses (id, title, description, tags, category, popularity_score, conversion_rate) VALUES
('1c5e9dbe-ca3d-11ed-9800-83b0e04a13de', 'Advanced React Development', 'Master React with hooks, context, and advanced patterns', '["react", "javascript", "frontend", "web development"]', '4aa13364-89a6-11f0-905d-8b54e6b4ec6c', 92.5, 0.15),
('1c5e9dbe-ca3d-11ed-9800-83b0e04a13df', 'Node.js Backend Mastery', 'Build scalable backend services with Node.js and Express', '["node.js", "javascript", "backend", "api", "express"]', '4aa13364-89a6-11f0-905d-8b54e6b4ec6c', 88.3, 0.12),
('1c5e9dbe-ca3d-11ed-9800-83b0e04a13dr', 'Python for Data Science', 'Learn data analysis and visualization with Python', '["python", "data science", "machine learning", "pandas", "numpy"]', '4aa13364-89a6-11f0-9055-8b54e6b4ec7b', 95.2, 0.18),
('1c5e9dbe-ca3d-11ed-9800-83b0e04a13rt', 'Flutter Mobile Development', 'Build cross-platform mobile apps with Flutter', '["flutter", "dart", "mobile", "android", "ios"]', '4aa13364-89a6-11f0-9055-8b54e6b4ec7c', 85.7, 0.11),
('1c5e9dbe-ca3d-11ed-9800-83b0e04a13ee', 'UX/UI Design Principles', 'Create beautiful and functional user interfaces', '["design", "ux", "ui", "figma", "prototyping"]', '4aa13364-89a6-11f0-9055-8b54e6b4ec7d', 82.1, 0.09),
('1c5e9dbe-ca3d-11ed-9800-83b0e04a13tr', 'Vue.js Complete Guide', 'From beginner to advanced Vue.js development', '["vue", "javascript", "frontend", "composition api"]', '4aa13364-89a6-11f0-9055-8b54e6b4ec7c', 79.8, 0.08),
('1c5e9dbe-ca3d-11ed-9800-83b0e04a13gg', 'SQL for Data Analysis', 'Master SQL for database management and analytics', '["sql", "database", "data analysis", "postgresql"]', '4aa13364-89a6-11f0-9055-8b54e6b4ec7b', 87.6, 0.14),
('1c5e9dbe-ca3d-11ed-9800-83b0e04a13bv', 'Digital Marketing Strategy', 'Grow your business with digital marketing', '["marketing", "seo", "social media", "business"]', '4aa13364-89a6-11f0-9055-8b54e6b4ec7e', 76.4, 0.07);

-- Insert sample users
INSERT INTO users (id, first_name, last_name, email, user_name, interests, interest_tags,  password) VALUES
('51f2103f-78f8-43d5-95b6-91d6c57de294', 'John', 'Smith', 'john.smith@email.com', 'john_dev', '["web development", "javascript", "react", "node.js"]', '["frontend", "backend", "fullstack"]','$2b$12$ekojXsE0MVjfP.3s59USE.GW7tRo88o8z0LH8AmOXsmWRi/Qh2Z/q'),
('51f2103f-78f8-43d5-95b6-91d6c57de244', 'Sarah', 'Johnson', 'sarah.j@email.com', 'sarah_data', '["data science", "python", "machine learning", "analytics"]', '["data", "ai", "analysis"]', '$2b$12$ekojXsE0MVjfP.3s59USE.GW7tRo88o8z0LH8AmOXsmWRi/Qh2Z/q'),
('51f2103f-78f8-43d5-95b6-91d6c57de200', 'Mike', 'Chen', 'mike.chen@email.com', 'mike_design', '["ui/ux design", "prototyping", "user research", "figma"]', '["design", "creative", "ux"]', '$2b$12$ekojXsE0MVjfP.3s59USE.GW7tRo88o8z0LH8AmOXsmWRi/Qh2Z/q'),
('51f2103f-78f8-43d5-95b6-91d6c57de222', 'Emma', 'Davis', 'emma.davis@email.com', 'emma_mobile', '["mobile development", "flutter", "react native", "ios"]', '["mobile", "apps", "cross-platform"]', '$2b$12$ekojXsE0MVjfP.3s59USE.GW7tRo88o8z0LH8AmOXsmWRi/Qh2Z/q'),
('51f2103f-78f8-43d5-95b6-91d6c57de233', 'David', 'Wilson', 'david.w@email.com', 'david_biz', '["business", "marketing", "entrepreneurship", "seo"]', '["business", "marketing", "strategy"]', '$2b$12$ekojXsE0MVjfP.3s59USE.GW7tRo88o8z0LH8AmOXsmWRi/Qh2Z/q');

-- Insert user engagement data
INSERT INTO user_engagement (user_id, course_id, view_count, total_scroll_time, last_viewed_at) VALUES
-- John (web development interest)
('51f2103f-78f8-43d5-95b6-91d6c57de294', '1c5e9dbe-ca3d-11ed-9800-83b0e04a13de', 8, 650, NOW() - INTERVAL '1 day'),
('51f2103f-78f8-43d5-95b6-91d6c57de294', '1c5e9dbe-ca3d-11ed-9800-83b0e04a13df', 5, 420, NOW() - INTERVAL '3 days'),
('51f2103f-78f8-43d5-95b6-91d6c57de294', '1c5e9dbe-ca3d-11ed-9800-83b0e04a13tr', 3, 180, NOW() - INTERVAL '10 days'),
('51f2103f-78f8-43d5-95b6-91d6c57de294', '1c5e9dbe-ca3d-11ed-9800-83b0e04a13dr', 2, 90, NOW() - INTERVAL '15 days'),

-- Sarah (data science interest)
('51f2103f-78f8-43d5-95b6-91d6c57de244', '1c5e9dbe-ca3d-11ed-9800-83b0e04a13dr', 12, 890, NOW() - INTERVAL '6 hours'),
('51f2103f-78f8-43d5-95b6-91d6c57de244', '1c5e9dbe-ca3d-11ed-9800-83b0e04a13gg', 7, 520, NOW() - INTERVAL '2 days'),
('51f2103f-78f8-43d5-95b6-91d6c57de244', '1c5e9dbe-ca3d-11ed-9800-83b0e04a13de', 1, 45, NOW() - INTERVAL '20 days'),

-- Mike (design interest)
('51f2103f-78f8-43d5-95b6-91d6c57de200', '1c5e9dbe-ca3d-11ed-9800-83b0e04a13ee', 15, 1200, NOW() - INTERVAL '12 hours'),
('51f2103f-78f8-43d5-95b6-91d6c57de200', '1c5e9dbe-ca3d-11ed-9800-83b0e04a13de', 4, 210, NOW() - INTERVAL '5 days'),
('51f2103f-78f8-43d5-95b6-91d6c57de200', '1c5e9dbe-ca3d-11ed-9800-83b0e04a13rt', 6, 380, NOW() - INTERVAL '8 days'),

-- Emma (mobile development interest)
('51f2103f-78f8-43d5-95b6-91d6c57de222', '1c5e9dbe-ca3d-11ed-9800-83b0e04a13rt', 9, 720, NOW() - INTERVAL '1 day'),
('51f2103f-78f8-43d5-95b6-91d6c57de222', '1c5e9dbe-ca3d-11ed-9800-83b0e04a13de', 3, 150, NOW() - INTERVAL '7 days'),
('51f2103f-78f8-43d5-95b6-91d6c57de222', '1c5e9dbe-ca3d-11ed-9800-83b0e04a13df', 2, 120, NOW() - INTERVAL '14 days'),

-- David (business interest)
('51f2103f-78f8-43d5-95b6-91d6c57de233', '1c5e9dbe-ca3d-11ed-9800-83b0e04a13bv', 11, 950, NOW() - INTERVAL '4 hours'),
('51f2103f-78f8-43d5-95b6-91d6c57de233', '1c5e9dbe-ca3d-11ed-9800-83b0e04a13dr', 2, 85, NOW() - INTERVAL '25 days');

-- Insert enrollment data
INSERT INTO enrollments (user_id, course_id, progress_percentage, completed) VALUES
('51f2103f-78f8-43d5-95b6-91d6c57de294', '1c5e9dbe-ca3d-11ed-9800-83b0e04a13de', 85.5, false),
('51f2103f-78f8-43d5-95b6-91d6c57de294', '1c5e9dbe-ca3d-11ed-9800-83b0e04a13df', 45.2, false),
('51f2103f-78f8-43d5-95b6-91d6c57de244', '1c5e9dbe-ca3d-11ed-9800-83b0e04a13dr', 100.0, true),
('51f2103f-78f8-43d5-95b6-91d6c57de244', '1c5e9dbe-ca3d-11ed-9800-83b0e04a13gg', 72.8, false),
('51f2103f-78f8-43d5-95b6-91d6c57de200', '1c5e9dbe-ca3d-11ed-9800-83b0e04a13ee', 100.0, true),
('51f2103f-78f8-43d5-95b6-91d6c57de222', '1c5e9dbe-ca3d-11ed-9800-83b0e04a13rt', 68.3, false),
('51f2103f-78f8-43d5-95b6-91d6c57de233', '1c5e9dbe-ca3d-11ed-9800-83b0e04a13bv', 91.7, false);

-- Insert course statistics
INSERT INTO course_stats (course_id, views_count, last_view_at, avg_scroll_time_ms) VALUES
('1c5e9dbe-ca3d-11ed-9800-83b0e04a13de', 1250, NOW() - INTERVAL '2 hours', 225000),
('1c5e9dbe-ca3d-11ed-9800-83b0e04a13df', 890, NOW() - INTERVAL '5 hours', 198000),
('1c5e9dbe-ca3d-11ed-9800-83b0e04a13dr', 2100, NOW() - INTERVAL '1 hour', 287000),
('1c5e9dbe-ca3d-11ed-9800-83b0e04a13rt', 670, NOW() - INTERVAL '8 hours', 234000),
('1c5e9dbe-ca3d-11ed-9800-83b0e04a13ee', 540, NOW() - INTERVAL '3 hours', 312000),
('1c5e9dbe-ca3d-11ed-9800-83b0e04a13tr', 430, NOW() - INTERVAL '12 hours', 189000),
('1c5e9dbe-ca3d-11ed-9800-83b0e04a13gg', 980, NOW() - INTERVAL '6 hours', 256000),
('1c5e9dbe-ca3d-11ed-9800-83b0e04a13bv', 320, NOW() - INTERVAL '24 hours', 278000);