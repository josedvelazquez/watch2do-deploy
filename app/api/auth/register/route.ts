import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { RowDataPacket } from 'mysql2';

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json({ message: 'Por favor, completa todos los campos' }, { status: 400 });
        }

        // Check if user already exists
        const [existingUsers] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return NextResponse.json({ message: 'El usuario ya existe' }, { status: 409 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

        return NextResponse.json({ message: 'Usuario creado exitosamente' }, { status: 201 });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}
