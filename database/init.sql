CREATE DATABASE IF NOT EXISTS watch2do;
USE watch2do;

-- Create categories table first (referenced by watches)
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(50) NOT NULL UNIQUE
);

-- Create watches table with foreign key
CREATE TABLE IF NOT EXISTS watches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description TEXT,
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Insert default categories
INSERT IGNORE INTO categories (name, slug) VALUES
('Men', 'men'),
('Women', 'women'),
('Unisex', 'unisex'),
('Limited Edition', 'limited-edition');

-- Insert watches (using subqueries to get category_ids)
INSERT INTO watches (name, price, image, description, category_id) VALUES
('Chronos Silver', 1299.00, '/images/watch1.png', 'A masterpiece of engineering, the Chronos Silver features a precision automatic movement housed in a surgical-grade stainless steel case.', (SELECT id FROM categories WHERE slug = 'men')),
('Midnight Leather', 899.00, '/images/watch2.png', 'Elegant and understated, the Midnight Leather combines a minimalist black dial with a premium genuine leather strap for ultimate comfort.', (SELECT id FROM categories WHERE slug = 'men')),
('Rose Elegance', 1499.00, '/images/watch3.png', 'Radiating sophistication, the Rose Elegance features 18k rose gold plating and a mother-of-pearl dial, perfect for formal occasions.', (SELECT id FROM categories WHERE slug = 'women')),
('Aviator Gold', 2100.00, '/images/hero.png', 'Inspired by aviation history, this timepiece offers dual-time functionality and a rugged yet luxurious gold finish.', (SELECT id FROM categories WHERE slug = 'men')),
('Diver Pro', 1050.00, '/images/watch1.png', 'Built for the depths, the Diver Pro is water-resistant to 300m and features a rotating bezel and luminescent markers.', (SELECT id FROM categories WHERE slug = 'men')),
('Classic Minimalist', 750.00, '/images/watch2.png', 'Less is more. The Classic Minimalist strips away the unnecessary to reveal the pure beauty of timekeeping.', (SELECT id FROM categories WHERE slug = 'unisex')),
('Royal Oak Style', 3500.00, '/images/watch3.png', 'An homage to iconic design, featuring an octagonal bezel and integrated bracelet for a sporty yet elegant look.', (SELECT id FROM categories WHERE slug = 'men')),
('Ceramic White', 1800.00, '/images/watch1.png', 'Crafted from high-tech ceramic, this watch is scratch-resistant, hypoallergenic, and incredibly lightweight.', (SELECT id FROM categories WHERE slug = 'women'));
