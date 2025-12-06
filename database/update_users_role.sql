ALTER TABLE users
ADD COLUMN role ENUM('user', 'admin') DEFAULT 'user';

UPDATE users SET role = 'admin' WHERE email = 'user@gmail.com';