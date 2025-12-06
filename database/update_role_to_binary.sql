-- Add new column
ALTER TABLE users ADD COLUMN role_new TINYINT DEFAULT 0;

-- Migrate data
UPDATE users SET role_new = 1 WHERE role = 'admin';

-- Drop old column
ALTER TABLE users DROP COLUMN role;

-- Rename new column
ALTER TABLE users CHANGE COLUMN role_new role TINYINT DEFAULT 0;