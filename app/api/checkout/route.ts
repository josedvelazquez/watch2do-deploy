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

        // Call Supabase RPC
        const { data: orderId, error } = await supabase.rpc('create_order', {
            p_user_id: user.id,
            p_total: total,
            p_shipping_info: shippingData,
            p_payment_method: paymentMethod,
            p_items: items
        });

        if (error) throw error;

        return NextResponse.json({ success: true, orderId });

    } catch (error) {
        console.error("Checkout error:", error);
        return NextResponse.json({ error: "Failed to process order" }, { status: 500 });
    }
}
