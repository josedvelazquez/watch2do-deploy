import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

async function isAdmin() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');

    if (!token) return false;

    try {
        const decoded = jwt.verify(token.value, JWT_SECRET) as { role?: number };
        return decoded.role === 1;
    } catch {
        return false;
    }
}

export async function GET() {
    if (!await isAdmin()) {
        return NextResponse.json({ message: 'No autorizado' }, { status: 403 });
    }

    try {
        const [users] = await pool.query<RowDataPacket[]>('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC');
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    if (!await isAdmin()) {
        return NextResponse.json({ message: 'No autorizado' }, { status: 403 });
    }

    try {
        const { id, role } = await request.json();

        if (!id || role === undefined || ![0, 1].includes(role)) {
            return NextResponse.json({ message: 'Datos inválidos' }, { status: 400 });
        }

        await pool.query('UPDATE users SET role = ? WHERE id = ?', [role, id]);

        return NextResponse.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}
