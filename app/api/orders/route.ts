import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

async function getUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');

    if (!token) return null;

    try {
        const decoded = jwt.verify(token.value, JWT_SECRET) as { id?: number; userId?: number };
        if (!decoded.id && decoded.userId) {
            decoded.id = decoded.userId;
        }
        return decoded as { id: number };
    } catch (error) {
        return null;
    }
}

export async function GET(request: Request) {
    try {
        const user = await getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Fetch orders
        const [orders] = await pool.query<RowDataPacket[]>(
            `SELECT id, total, status, created_at, payment_method 
             FROM orders 
             WHERE user_id = ? 
             ORDER BY created_at DESC`,
            [user.id]
        );

        // Fetch items for each order
        const ordersWithItems = await Promise.all(orders.map(async (order) => {
            const [items] = await pool.query<RowDataPacket[]>(
                `SELECT oi.id, oi.quantity, oi.price, w.name, w.image 
                 FROM order_items oi
                 JOIN watches w ON oi.product_id = w.id
                 WHERE oi.order_id = ?`,
                [order.id]
            );
            return { ...order, items };
        }));

        return NextResponse.json({ orders: ordersWithItems });

    } catch (error) {
        console.error("Fetch orders error:", error);
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}
