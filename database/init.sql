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
    FOREIGN KEY (category_id) REFERENCES categories (id)
);

-- Insert default categories
INSERT IGNORE INTO
    categories (name, slug)
VALUES ('Hombre', 'men'),
    ('Mujer', 'women'),
    ('Unisex', 'unisex'),
    (
        'Edición Limitada',
        'limited-edition'
    );

-- Insert watches (using subqueries to get category_ids)
INSERT INTO
    watches (
        name,
        price,
        image,
        description,
        category_id
    )
VALUES (
        'Chronos Silver',
        1299.00,
        '/images/watch1.png',
        'Una maestria en ingeniería, el Chronos Silver tiene un movimiento automático de precisión que se almacena en una caja de acero inoxidable de grado quirúrgico.',
        (
            SELECT id
            FROM categories
            WHERE
                slug = 'men'
        )
    ),
    (
        'Midnight Leather',
        899.00,
        '/images/watch2.png',
        'Elegante y descripto, el Midnight Leather combina un reloj de muñeca minimalista con un cinta de cuero genuino premium para la máxima comodidad.',
        (
            SELECT id
            FROM categories
            WHERE
                slug = 'men'
        )
    ),
    (
        'Rose Elegance',
        1499.00,
        '/images/watch3.png',
        'Radiante sofisticación, la Rose Elegance tiene una placa de oro rosa de 18k y una placa de porcelana de madre porcelana, perfecta para ocasiones formales.',
        (
            SELECT id
            FROM categories
            WHERE
                slug = 'women'
        )
    ),
    (
        'Aviator Gold',
        2100.00,
        '/images/hero.png',
        'Inspirado por la historia de la aviación, este reloj ofrece una funcionalidad dual y una acabado de oro rudo pero lujoso.',
        (
            SELECT id
            FROM categories
            WHERE
                slug = 'men'
        )
    ),
    (
        'Diver Pro',
        1050.00,
        '/images/watch1.png',
        'Construido para las profundidades, el Diver Pro es resistente al agua hasta 300m y tiene un anillo rotante y marcadores luminosos.',
        (
            SELECT id
            FROM categories
            WHERE
                slug = 'men'
        )
    ),
    (
        'Classic Minimalist',
        750.00,
        '/images/watch2.png',
        'Menos es más. El Classic Minimalist elimina lo innecesario para revelar la belleza pura de la medición del tiempo.',
        (
            SELECT id
            FROM categories
            WHERE
                slug = 'unisex'
        )
    ),
    (
        'Royal Oak Style',
        3500.00,
        '/images/watch3.png',
        'Un homenaje al diseño icónico, caracterizado por un anillo octogonal y una correa integrada para un aspecto deportivo pero elegante.',
        (
            SELECT id
            FROM categories
            WHERE
                slug = 'men'
        )
    ),
    (
        'Ceramic White',
        1800.00,
        '/images/watch1.png',
        'Hecho de cerámica de alta tecnología, este reloj es resistente a las rayaduras, hipó allergénico y increíblemente ligero.',
        (
            SELECT id
            FROM categories
            WHERE
                slug = 'women'
        )
    );