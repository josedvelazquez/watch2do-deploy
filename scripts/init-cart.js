const mysql = require('mysql2/promise');
require('dotenv').config();

async function main() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'watch2do'
    });

    const sql = `
    CREATE TABLE IF NOT EXISTS cart_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES watches(id) ON DELETE CASCADE,
        UNIQUE KEY unique_cart_item (user_id, product_id)
    );
    `;

    try {
        await connection.execute(sql);
        console.log('Cart table created successfully');
    } catch (error) {
        console.error('Error creating cart table:', error);
    } finally {
        await connection.end();
    }
}

main();
