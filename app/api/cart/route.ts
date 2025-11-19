import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

async function getUser(request: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');

    if (!token) return null;

    try {
        const decoded = jwt.verify(token.value, JWT_SECRET) as { id: number };
        return decoded;
    } catch (error) {
        return null;
    }
}

export async function GET(request: Request) {
    const user = await getUser(request);
    if (!user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const [rows] = await pool.query<RowDataPacket[]>(`
            SELECT ci.id, ci.quantity, w.id as product_id, w.name, w.price, w.image, w.category_id
            FROM cart_items ci
            JOIN watches w ON ci.product_id = w.id
            WHERE ci.user_id = ?
        `, [user.id]);

        return NextResponse.json({ items: rows }, { status: 200 });
    } catch (error) {
        console.error('Fetch cart error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const user = await getUser(request);
    if (!user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { productId, quantity = 1 } = await request.json();

        if (!productId) {
            return NextResponse.json({ message: 'Product ID is required' }, { status: 400 });
        }

        // Check if item exists
        const [existing] = await pool.query<RowDataPacket[]>(
            'SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ?',
            [user.id, productId]
        );

        if (existing.length > 0) {
            // Update quantity
            await pool.query(
                'UPDATE cart_items SET quantity = quantity + ? WHERE id = ?',
                [quantity, existing[0].id]
            );
        } else {
            // Insert new item
            await pool.query(
                'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)',
                [user.id, productId, quantity]
            );
        }

        return NextResponse.json({ message: 'Item added to cart' }, { status: 200 });
    } catch (error) {
        console.error('Add to cart error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const user = await getUser(request);
    if (!user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const itemId = searchParams.get('id');

        if (itemId) {
            // Remove specific item
            await pool.query('DELETE FROM cart_items WHERE id = ? AND user_id = ?', [itemId, user.id]);
        } else {
            // Clear cart
            await pool.query('DELETE FROM cart_items WHERE user_id = ?', [user.id]);
        }

        return NextResponse.json({ message: 'Cart updated' }, { status: 200 });
    } catch (error) {
        console.error('Delete cart error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
