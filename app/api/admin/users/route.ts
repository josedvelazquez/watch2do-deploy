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
        const { id, role, name, email } = await request.json();

        if (!id) {
            return NextResponse.json({ message: 'ID de usuario requerido' }, { status: 400 });
        }

        // Build dynamic query
        const updates = [];
        const values = [];

        if (role !== undefined) {
            if (![0, 1].includes(role)) {
                return NextResponse.json({ message: 'Rol inválido' }, { status: 400 });
            }
            updates.push('role = ?');
            values.push(role);
        }

        if (name) {
            updates.push('name = ?');
            values.push(name);
        }

        if (email) {
            updates.push('email = ?');
            values.push(email);
        }

        if (updates.length === 0) {
            return NextResponse.json({ message: 'Nada que actualizar' }, { status: 400 });
        }

        values.push(id); // For WHERE clause

        await pool.query(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, values);

        return NextResponse.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}
