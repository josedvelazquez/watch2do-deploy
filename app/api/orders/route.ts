import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
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

        // Fetch orders and items
        const { data: orders, error } = await supabase
            .from('orders')
            .select(`
                id,
                total,
                status,
                created_at,
                payment_method,
                order_items (
                    id,
                    quantity,
                    price,
                    watches (
                        name,
                        image
                    )
                )
            `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Formatted to match expected interface
        const formattedOrders = orders.map((order: any) => ({
            ...order,
            items: order.order_items.map((item: any) => ({
                id: item.id,
                quantity: item.quantity,
                price: item.price,
                name: item.watches?.name,
                image: item.watches?.image
            }))
        }));

        return NextResponse.json({ orders: formattedOrders });

    } catch (error) {
        console.error("Fetch orders error:", error);
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}
