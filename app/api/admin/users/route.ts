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
        const { data: users, error } = await supabase
            .from('users')
            .select('id, name, email, role, created_at')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json(users);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return NextResponse.json({ message: 'Error al obtener usuarios' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    if (!await isAdmin()) {
        return NextResponse.json({ message: 'No autorizado' }, { status: 403 });
    }

    try {
        const { id, name, email, role } = await request.json();

        if (!id) {
            return NextResponse.json({ message: 'ID de usuario requerido' }, { status: 400 });
        }

        const updates: any = {};
        if (name) updates.name = name;
        if (email) updates.email = email;
        if (role !== undefined) updates.role = role;

        if (Object.keys(updates).length === 0) {
            return NextResponse.json({ message: 'No hay datos para actualizar' }, { status: 400 });
        }

        const { error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        return NextResponse.json({ message: 'Error al actualizar usuario' }, { status: 500 });
    }
}
