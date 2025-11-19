const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

async function seed() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'watch2do',
        multipleStatements: true
    });

    try {
        console.log('Connected to database.');

        // Read watches from JSON
        const watchesData = JSON.parse(
            await fs.readFile(path.join(__dirname, 'watches.json'), 'utf8')
        );

        // Ensure categories exist
        const categories = [...new Set(watchesData.map(w => w.category))];
        console.log(`Found categories: ${categories.join(', ')}`);

        for (const category of categories) {
            await connection.execute(
                'INSERT IGNORE INTO categories (name, slug) VALUES (?, ?)',
                [category.charAt(0).toUpperCase() + category.slice(1), category]
            );
        }

        // Insert watches
        console.log('Inserting watches...');
        for (const watch of watchesData) {
            // Get category ID
            const [rows] = await connection.execute(
                'SELECT id FROM categories WHERE slug = ?',
                [watch.category]
            );

            if (rows.length > 0) {
                const categoryId = rows[0].id;
                await connection.execute(
                    'INSERT INTO watches (name, price, image, description, category_id) VALUES (?, ?, ?, ?, ?)',
                    [watch.name, watch.price, watch.image, watch.description, categoryId]
                );
            }
        }

        console.log('Seeding completed successfully!');

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await connection.end();
    }
}

seed();
