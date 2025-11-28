const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

async function main() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'watch2do',
        multipleStatements: true
    });

    try {
        const sqlPath = path.join(__dirname, '../database/orders.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log('Executing SQL...');
        await connection.query(sql);
        console.log('Database updated successfully.');
    } catch (error) {
        console.error('Error updating database:', error);
    } finally {
        await connection.end();
    }
}

main();
