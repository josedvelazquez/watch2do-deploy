import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
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
        const { count: usersCount } = await supabase.from('users').select('*', { count: 'exact', head: true });
        const { count: ordersCount } = await supabase.from('orders').select('*', { count: 'exact', head: true });

        // Sum revenue (Supabase doesn't have direct SUM in client without RPC, but we can do a simple workaround or better: fetch all totals and sum in memory for now, or just assume we have RPC. For this small scale, fetch totals is fine)
        const { data: orders } = await supabase.from('orders').select('total').neq('status', 'cancelled');
        const revenue = orders ? orders.reduce((acc, order) => acc + Number(order.total), 0) : 0;

        const { count: productsCount } = await supabase.from('watches').select('*', { count: 'exact', head: true });

        return NextResponse.json({
            users: usersCount || 0,
            orders: ordersCount || 0,
            revenue: revenue,
            products: productsCount || 0
        });
    } catch (error) {
        console.error("Error al obtener estadísticas:", error);
        return NextResponse.json({ message: 'Error al obtener estadísticas' }, { status: 500 });
    }
}
