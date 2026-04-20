-- BrainQuest Database Schema
CREATE DATABASE IF NOT EXISTS brainquest;
USE brainquest;

-- Users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  icon VARCHAR(20) DEFAULT '',
  color VARCHAR(20) DEFAULT '#8b5cf6',
  description VARCHAR(255) DEFAULT '',
  is_kids TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Questions
CREATE TABLE IF NOT EXISTS questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  type ENUM('mcq', 'truefalse', 'fill', 'image') DEFAULT 'mcq',
  difficulty ENUM('Easy', 'Medium', 'Hard') DEFAULT 'Easy',
  text TEXT NOT NULL,
  options JSON,
  correct_answer VARCHAR(255) NOT NULL,
  explanation TEXT,
  image_url VARCHAR(500),
  is_kids TINYINT(1) DEFAULT 0,
  kids_category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quizzes
CREATE TABLE IF NOT EXISTS quizzes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  difficulty ENUM('Easy', 'Medium', 'Hard') DEFAULT 'Easy',
  type ENUM('quick', 'full', 'section', 'timed', 'kids', 'practice') DEFAULT 'quick',
  time_per_q INT DEFAULT 20,
  question_ids JSON,
  is_kids TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Attempts
CREATE TABLE IF NOT EXISTS attempts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  quiz_id INT NOT NULL,
  score INT DEFAULT 0,
  correct_count INT DEFAULT 0,
  wrong_count INT DEFAULT 0,
  total_count INT DEFAULT 0,
  time_taken INT DEFAULT 0,
  answers JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

-- Streaks
CREATE TABLE IF NOT EXISTS streaks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  quiz_date DATE NOT NULL,
  UNIQUE KEY unique_streak (user_id, quiz_date),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Achievements
CREATE TABLE IF NOT EXISTS achievements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  achievement_id VARCHAR(50) NOT NULL,
  unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_achievement (user_id, achievement_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bookmarks
CREATE TABLE IF NOT EXISTS bookmarks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  question_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_bookmark (user_id, question_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX idx_attempts_user ON attempts(user_id);
CREATE INDEX idx_attempts_quiz ON attempts(quiz_id);
CREATE INDEX idx_questions_category ON questions(category);
CREATE INDEX idx_quizzes_category ON quizzes(category);
CREATE INDEX idx_streaks_user ON streaks(user_id);

-- Seed admin user (password: admin123, hashed with bcrypt)
INSERT INTO users (name, email, password, role) VALUES
('Admin', 'admin@brainquest.com', '$2a$10$8K1p/a0dR1vW0v5F5q5O5O5O5O5O5O5O5O5O5O5O5O5O5O5O5O5O', 'admin')
ON DUPLICATE KEY UPDATE name = name;

-- Seed categories
INSERT INTO categories (name, icon, color, description, is_kids) VALUES
('General Knowledge', '🌍', '#4f8ef7', 'Facts about the world', 0),
('Science', '🔬', '#3ecfb2', 'Explore science & nature', 0),
('History', '🏛️', '#e05c8a', 'Journey through time', 0),
('Mathematics', '📐', '#48c78e', 'Numbers and logic', 0),
('Current Affairs', '📰', '#f5a623', 'What is happening now', 0),
('Technology', '💻', '#6366f1', 'Computers & innovation', 0),
('Geography', '🗺️', '#14b8a6', 'Countries & places', 0),
('Sports', '⚽', '#f97316', 'Games & athletics', 0),
('Entertainment', '🎬', '#a855f7', 'Movies, music & TV', 0),
('Literature', '📖', '#ec4899', 'Books & writing', 0),
('Programming', '👨‍💻', '#06b6d4', 'Code & algorithms', 0),
('Kids Zone', '🧒', '#f472b6', 'Fun quizzes for kids!', 1)
ON DUPLICATE KEY UPDATE description = VALUES(description);