-- Pixelcraft Armory MySQL Database Schema
CREATE DATABASE IF NOT EXISTS pixelcraft_armory;
USE pixelcraft_armory;

CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS competition_projects (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  competition_name VARCHAR(255) DEFAULT '',
  brief_prompt TEXT,
  current_version_id VARCHAR(64),
  current_version_number INT DEFAULT 1,
  theme VARCHAR(64) DEFAULT 'futuristic',
  selected_asset_ids JSON,
  required_features JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_updated_at (updated_at)
);

CREATE TABLE IF NOT EXISTS competition_briefs (
  id VARCHAR(64) PRIMARY KEY,
  project_id VARCHAR(64) NOT NULL,
  problem_statement TEXT NOT NULL,
  keywords JSON,
  required_sections JSON,
  target_audience VARCHAR(255),
  map_required BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES competition_projects(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS project_versions (
  id VARCHAR(64) PRIMARY KEY,
  project_id VARCHAR(64) NOT NULL,
  version_number INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  changelog TEXT,
  config JSON NOT NULL,
  diff_summary JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES competition_projects(id) ON DELETE CASCADE,
  INDEX idx_project_version (project_id, version_number)
);

CREATE TABLE IF NOT EXISTS design_configs (
  id VARCHAR(64) PRIMARY KEY,
  project_id VARCHAR(64) NOT NULL,
  version_id VARCHAR(64),
  config_json JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES competition_projects(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ai_sessions (
  id VARCHAR(64) PRIMARY KEY,
  project_id VARCHAR(64) NOT NULL,
  user_prompt TEXT NOT NULL,
  assistant_role VARCHAR(32) NOT NULL,
  response_summary TEXT,
  suggestions_count INT DEFAULT 0,
  applied_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES competition_projects(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ai_suggestions (
  id VARCHAR(64) PRIMARY KEY,
  session_id VARCHAR(64) NOT NULL,
  role VARCHAR(32) NOT NULL,
  title VARCHAR(255) NOT NULL,
  problem TEXT,
  recommendation TEXT,
  reason TEXT,
  severity VARCHAR(32) DEFAULT 'suggestion',
  confidence FLOAT DEFAULT 0.9,
  changes_json JSON,
  applied BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES ai_sessions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ai_research_results (
  id VARCHAR(64) PRIMARY KEY,
  project_id VARCHAR(64),
  query TEXT NOT NULL,
  topic VARCHAR(255),
  facts JSON,
  analysis TEXT,
  recommendations JSON,
  uncertainty TEXT,
  sources JSON,
  confidence FLOAT DEFAULT 0.9,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS selected_assets (
  id VARCHAR(64) PRIMARY KEY,
  project_id VARCHAR(64) NOT NULL,
  asset_id VARCHAR(64) NOT NULL,
  role VARCHAR(32) DEFAULT 'hero',
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES competition_projects(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS audit_results (
  id VARCHAR(64) PRIMARY KEY,
  project_id VARCHAR(64) NOT NULL,
  version_id VARCHAR(64),
  score_percentage INT NOT NULL,
  passed_count INT NOT NULL,
  warning_count INT NOT NULL,
  failed_count INT NOT NULL,
  total_count INT NOT NULL,
  overall_passed BOOLEAN DEFAULT TRUE,
  categories_json JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES competition_projects(id) ON DELETE CASCADE
);
