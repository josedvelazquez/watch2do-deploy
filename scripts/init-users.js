const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function run() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'watch2do',
    });

    const sql = fs.readFileSync(path.join(__dirname, '../database/users.sql'), 'utf8');

    try {
        await connection.query(sql);
        console.log('Users table created successfully');
    } catch (error) {
        console.error('Error creating table:', error);
    } finally {
        await connection.end();
    }
}

run();
