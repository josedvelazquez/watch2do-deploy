import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token');

        if (!token) {
            return NextResponse.json({ user: null }, { status: 200 });
        }

        const decoded = jwt.verify(token.value, JWT_SECRET) as { id?: number; userId?: number; email: string; name: string; role?: number };
        if (!decoded.id && decoded.userId) {
            decoded.id = decoded.userId;
        }
        const user = decoded as { id: number; email: string; name: string; role: number };

        try {
            // Try to fetch fresh user data
            const [users] = await pool.query<RowDataPacket[]>('SELECT id, name, email, role FROM users WHERE id = ?', [user.id]);

            if (users.length > 0) {
                return NextResponse.json({ user: users[0] }, { status: 200 });
            }
        } catch (dbError) {
            console.error('Error al obtener datos del usuario:', dbError);
            // Fallback to token data if DB fails
        }

        // Return decoded token data if DB query fails or returns no user (but token is valid)
        return NextResponse.json({ user: user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ user: null }, { status: 200 });
    }
}

export async function PUT(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token');

        if (!token) {
            return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
        }

        const decoded = jwt.verify(token.value, JWT_SECRET) as { id?: number; userId?: number };
        if (!decoded.id && decoded.userId) {
            decoded.id = decoded.userId;
        }
        const user = decoded as { id: number };
        const { name, email } = await request.json();

        if (!name || !email) {
            return NextResponse.json({ message: 'Nombre y correo electrónico son requeridos' }, { status: 400 });
        }

        await pool.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, user.id]);

        return NextResponse.json({ message: 'Perfil actualizado correctamente', user: { name, email } }, { status: 200 });
    } catch (error) {
        console.error('Update profile error:', error);
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}
