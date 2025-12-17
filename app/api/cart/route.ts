import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

async function getUser(request: Request) {
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
    const user = await getUser(request);
    if (!user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { data: items, error } = await supabase
            .from('cart_items')
            .select(`
                id,
                quantity,
                product_id,
                watches (
                    id,
                    name,
                    price,
                    image,
                    category_id
                )
            `)
            .eq('user_id', user.id);

        if (error) throw error;

        // Flatten shape to match previous API
        const formattedItems = items.map((item: any) => ({
            id: item.id,
            quantity: item.quantity,
            product_id: item.product_id,
            name: item.watches.name,
            price: item.watches.price,
            image: item.watches.image,
            category_id: item.watches.category_id
        }));

        return NextResponse.json({ items: formattedItems }, { status: 200 });
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

        // Upsert approach (Supabase handles logic if unique constraint exists on user_id, product_id)
        // Check if exists first for simplicity to match previous increment logic
        const { data: existing } = await supabase
            .from('cart_items')
            .select('id, quantity')
            .eq('user_id', user.id)
            .eq('product_id', productId)
            .single();

        if (existing) {
            await supabase
                .from('cart_items')
                .update({ quantity: existing.quantity + quantity })
                .eq('id', existing.id);
        } else {
            await supabase
                .from('cart_items')
                .insert({ user_id: user.id, product_id: productId, quantity });
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

        let query = supabase.from('cart_items').delete().eq('user_id', user.id);

        if (itemId) {
            query = query.eq('id', itemId);
        }

        const { error } = await query;
        if (error) throw error;

        return NextResponse.json({ message: 'Cart updated' }, { status: 200 });
    } catch (error) {
        console.error('Delete cart error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
