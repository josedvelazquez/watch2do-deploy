import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json({ message: 'Por favor, completa todos los campos' }, { status: 400 });
        }

        // Check if user already exists
        const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (existingUser) {
            return NextResponse.json({ message: 'El usuario ya existe' }, { status: 409 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const { error } = await supabase
            .from('users')
            .insert([
                { name, email, password: hashedPassword }
            ]);

        if (error) {
            console.error('Registration error (supabase):', error);
            return NextResponse.json({ message: 'Error al registrar usuario' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Usuario creado exitosamente' }, { status: 201 });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}
