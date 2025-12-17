-- Insert additional watches from watches2.json
INSERT INTO watches (name, price, image, description, category_id)
VALUES 
    ('Luxury Stainless Steel Watch', 1999, '/images/watch9.jpeg', 'Reloj de acero inoxidable con diseño sobrio y elegante, ideal para ocasiones formales.', (SELECT id FROM categories WHERE slug = 'men')),
    ('Gold Crystal Face Watch', 3599, '/images/watch10.jpg', 'Reloj dorado con detalles premium y cristal reforzado.', (SELECT id FROM categories WHERE slug = 'women')),
    ('Black Sapphire Luxury Watch', 3999, '/images/watch11.jpg', 'Reloj negro con cristal de zafiro y diseño exclusivo.', (SELECT id FROM categories WHERE slug = 'men')),
    ('Rose Gold Elite Mesh', 2899, '/images/watch12.jpg', 'Reloj elegante con malla metálica en oro rosa.', (SELECT id FROM categories WHERE slug = 'women')),
    ('Midnight Blue Luxury', 3199, '/images/watch13.jpg', 'Reloj azul profundo con diseño elegante y contemporáneo.', (SELECT id FROM categories WHERE slug = 'men')),
    ('Classic Watch On Wrist Close-up', 3199, '/images/watch14.jpg', 'Reloj clásico visto en muñeca — ideal para mostrar uso real del producto.', (SELECT id FROM categories WHERE slug = 'men')),
    ('Silver Link Bracelet Analog Watch', 3499, '/images/watch15.jpg', 'Reloj analógico con eslabones metálicos plateados, diseño elegante.', (SELECT id FROM categories WHERE slug = 'unisex')),
    ('G-Shock', 3299, '/images/watch16.jpg', 'Reloj de muñeca con estética moderna en fotografía de estilo premium.', (SELECT id FROM categories WHERE slug = 'unisex')),
    ('Black Dial Premium Wristwatch', 3599, '/images/watch17.jpg', 'Reloj con correa metálica, sobrio y sofisticado.', (SELECT id FROM categories WHERE slug = 'men')),
    ('Luxury Watch On Hand Close-up', 3399, '/images/watch18.jpg', 'Detalle de reloj de muñeca, perfecto para catálogo minimalista y elegante.', (SELECT id FROM categories WHERE slug = 'limited-edition')),
    ('Metallic Watch On Black Background', 3299, '/images/watch19.jpg', 'Reloj metálico sobre fondo negro — estilo moderno y premium.', (SELECT id FROM categories WHERE slug = 'men')),
    ('Wristwatch Minimal Silver Dial', 2899, '/images/watch20.jpg', 'Diseño minimalista con esfera plateada — versátil y elegante.', (SELECT id FROM categories WHERE slug = 'limited-edition')),
    ('Elegant Watch On Wrist Fashion Shot', 3199, '/images/watch21.jpg', 'Reloj elegante usando estética de moda.', (SELECT id FROM categories WHERE slug = 'unisex')),
    ('Black Dial Luxury Watch Close-up', 3599, '/images/watch22.jpg', 'Reloj con esfera negra y correa oscura, diseño sobrio y elegante.', (SELECT id FROM categories WHERE slug = 'men')),
    ('Minimalist Silver Watch Close-up', 2899, '/images/watch23.jpg', 'Reloj minimalista con acabado plateado, ideal para vestimenta elegante o casual refinada.', (SELECT id FROM categories WHERE slug = 'unisex')),
    ('Minimalist Silver Watch Close-up', 2899, '/images/watch24.jpg', 'Reloj minimalista con acabado plateado, ideal para vestimenta elegante o casual refinada.', (SELECT id FROM categories WHERE slug = 'limited-edition'));
