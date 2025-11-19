import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RowDataPacket } from 'mysql2';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Por favor, completa todos los campos' }, { status: 400 });
        }

        // Find user
        const [users] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return NextResponse.json({ message: 'Credenciales inválidas' }, { status: 401 });
        }

        const user = users[0];

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return NextResponse.json({ message: 'Credenciales inválidas' }, { status: 401 });
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email, name: user.name },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Set Cookie
        const cookie = serialize('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        const response = NextResponse.json({ message: 'Inicio de sesión exitoso', user: { name: user.name, email: user.email } }, { status: 200 });
        response.headers.set('Set-Cookie', cookie);

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}
