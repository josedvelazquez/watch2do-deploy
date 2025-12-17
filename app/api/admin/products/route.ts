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
        const { data: products, error } = await supabase
            .from('watches')
            .select(`
                *,
                categories (
                    id,
                    name
                )
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Flatten for easier consumption if needed, or just return as is
        const formattedProducts = products.map((p: any) => ({
            ...p,
            category_name: p.categories?.name
        }));

        return NextResponse.json(formattedProducts);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (!await isAdmin()) {
        return NextResponse.json({ message: 'No autorizado' }, { status: 403 });
    }

    try {
        const body = await request.json();
        const { name, price, image, description, category_id } = body;

        if (!name || !price || !image || !category_id) {
            return NextResponse.json({ message: 'Faltan campos obligatorios' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('watches')
            .insert([
                { name, price, image, description, category_id }
            ])
            .select();

        if (error) throw error;

        return NextResponse.json({ message: 'Producto creado exitosamente', product: data[0] }, { status: 201 });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ message: 'Error creating product' }, { status: 500 });
    }
}
