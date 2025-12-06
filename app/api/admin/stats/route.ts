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
        const [users] = await pool.query<RowDataPacket[]>('SELECT COUNT(*) as count FROM users');
        const [orders] = await pool.query<RowDataPacket[]>('SELECT COUNT(*) as count FROM orders');
        const [revenue] = await pool.query<RowDataPacket[]>('SELECT SUM(total) as total FROM orders WHERE status != "cancelled"');
        const [products] = await pool.query<RowDataPacket[]>('SELECT COUNT(*) as count FROM watches');

        return NextResponse.json({
            users: users[0].count,
            orders: orders[0].count,
            revenue: revenue[0].total || 0,
            products: products[0].count
        });
    } catch (error) {
        console.error("Error al obtener estadísticas:", error);
        return NextResponse.json({ message: 'Error al obtener estadísticas' }, { status: 500 });
    }
}
