-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(50) NOT NULL UNIQUE
);

-- Create watches table
CREATE TABLE IF NOT EXISTS watches (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description TEXT,
    category_id INT REFERENCES categories(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role SMALLINT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES watches(id) ON DELETE CASCADE,
    quantity INT DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, product_id)
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    shipping_info JSONB,
    payment_method VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES orders(id),
    product_id INT NOT NULL REFERENCES watches(id),
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Insert default categories
INSERT INTO categories (name, slug)
VALUES 
    ('Hombre', 'men'),
    ('Mujer', 'women'),
    ('Unisex', 'unisex'),
    ('Edición Limitada', 'limited-edition')
ON CONFLICT (name) DO NOTHING;

-- Insert watches
INSERT INTO watches (name, price, image, description, category_id)
VALUES 
    ('Chronos Silver', 1299.00, '/images/watch1.png', 'Una maestria en ingeniería, el Chronos Silver tiene un movimiento automático de precisión que se almacena en una caja de acero inoxidable de grado quirúrgico.', (SELECT id FROM categories WHERE slug = 'men')),
    ('Midnight Leather', 899.00, '/images/watch2.png', 'Elegante y descripto, el Midnight Leather combina un reloj de muñeca minimalista con un cinta de cuero genuino premium para la máxima comodidad.', (SELECT id FROM categories WHERE slug = 'men')),
    ('Rose Elegance', 1499.00, '/images/watch3.png', 'Radiante sofisticación, la Rose Elegance tiene una placa de oro rosa de 18k y una placa de porcelana de madre porcelana, perfecta para ocasiones formales.', (SELECT id FROM categories WHERE slug = 'women')),
    ('Aviator Gold', 2100.00, '/images/hero.png', 'Inspirado por la historia de la aviación, este reloj ofrece una funcionalidad dual y una acabado de oro rudo pero lujoso.', (SELECT id FROM categories WHERE slug = 'men')),
    ('Diver Pro', 1050.00, '/images/watch1.png', 'Construido para las profundidades, el Diver Pro es resistente al agua hasta 300m y tiene un anillo rotante y marcadores luminosos.', (SELECT id FROM categories WHERE slug = 'men')),
    ('Classic Minimalist', 750.00, '/images/watch2.png', 'Menos es más. El Classic Minimalist elimina lo innecesario para revelar la belleza pura de la medición del tiempo.', (SELECT id FROM categories WHERE slug = 'unisex')),
    ('Royal Oak Style', 3500.00, '/images/watch3.png', 'Un homenaje al diseño icónico, caracterizado por un anillo octogonal y una correa integrada para un aspecto deportivo pero elegante.', (SELECT id FROM categories WHERE slug = 'men')),
    ('Ceramic White', 1800.00, '/images/watch1.png', 'Hecho de cerámica de alta tecnología, este reloj es resistente a las rayaduras, hipó allergénico y increíblemente ligero.', (SELECT id FROM categories WHERE slug = 'women'))
ON CONFLICT DO NOTHING;

-- RPC for Checkout Transaction
CREATE OR REPLACE FUNCTION create_order(
    p_user_id INT,
    p_total DECIMAL,
    p_shipping_info JSONB,
    p_payment_method TEXT,
    p_items JSONB
)
RETURNS INT
LANGUAGE plpgsql
AS $$
DECLARE
    v_order_id INT;
    v_item JSONB;
BEGIN
    -- Insert Order
    INSERT INTO orders (user_id, total, status, shipping_info, payment_method)
    VALUES (p_user_id, p_total, 'completed', p_shipping_info, p_payment_method)
    RETURNING id INTO v_order_id;

    -- Insert Order Items
    FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
    LOOP
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES (v_order_id, (v_item->>'product_id')::INT, (v_item->>'quantity')::INT, (v_item->>'price')::DECIMAL);
    END LOOP;

    -- Clear Cart
    DELETE FROM cart_items WHERE user_id = p_user_id;

    RETURN v_order_id;
END;
$$;
