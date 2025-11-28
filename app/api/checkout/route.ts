import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";
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

export async function POST(request: Request) {
    try {
        const user = await getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { shippingData, paymentMethod, items } = body;

        if (!items || items.length === 0) {
            return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
        }

        // Calculate total
        const total = items.reduce((acc: number, item: any) => acc + (Number(item.price) * item.quantity), 0);

        // Start transaction
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
            // Insert Order
            const [orderResult] = await connection.query<ResultSetHeader>(
                `INSERT INTO orders (user_id, total, status, shipping_info, payment_method) VALUES (?, ?, ?, ?, ?)`,
                [user.id, total, 'completed', JSON.stringify(shippingData), paymentMethod]
            );

            const orderId = orderResult.insertId;

            // Insert Order Items
            const orderItemsValues = items.map((item: any) => [
                orderId,
                item.product_id,
                item.quantity,
                item.price
            ]);

            await connection.query(
                `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?`,
                [orderItemsValues]
            );

            // Clear Cart
            await connection.query(
                `DELETE FROM cart_items WHERE user_id = ?`,
                [user.id]
            );

            // Commit transaction
            await connection.commit();
            connection.release();

            return NextResponse.json({ success: true, orderId });

        } catch (error) {
            await connection.rollback();
            connection.release();
            throw error;
        }

    } catch (error) {
        console.error("Checkout error:", error);
        return NextResponse.json({ error: "Failed to process order" }, { status: 500 });
    }
}
