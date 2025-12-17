import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const categoryId = searchParams.get('category_id');
        const currentWatchId = searchParams.get('current_watch_id');

        let query = supabase
            .from('watches')
            .select(`
                *,
                categories (
                    name,
                    slug
                )
            `)
            .limit(4);

        if (categoryId) {
            query = query.eq('category_id', categoryId);
        }

        if (currentWatchId) {
            query = query.neq('id', currentWatchId);
        }

        let { data: rows, error } = await query;

        if (error) throw error;

        // Fallback if not enough recommendations
        if (!rows || rows.length < 4) {
            const { data: fallbackRows } = await supabase
                .from('watches')
                .select(`
                    *,
                    categories (
                        name,
                        slug
                    )
                `)
                .neq('id', currentWatchId || -1)
                .limit(4 - (rows?.length || 0));

            if (fallbackRows) {
                rows = [...(rows || []), ...fallbackRows];
            }
        }

        // Format
        const formattedRows = rows?.map((watch: any) => ({
            ...watch,
            category_name: watch.categories?.name,
            category_slug: watch.categories?.slug
        })) || [];


        return NextResponse.json(formattedRows);
    } catch (error) {
        console.error('Recommendations error:', error);

        // Mock data fallback
        const mockWatches = [
            { id: 101, name: "Chronos Silver", price: 1299, image: "/images/watch1.png", category_name: "Men" },
            { id: 102, name: "Midnight Leather", price: 899, image: "/images/watch2.png", category_name: "Men" },
            { id: 103, name: "Rose Elegance", price: 1499, image: "/images/watch3.png", category_name: "Women" },
            { id: 104, name: "Aviator Gold", price: 2100, image: "/images/hero.png", category_name: "Men" },
            { id: 105, name: "Ocean Master", price: 1850, image: "/images/watch1.png", category_name: "Men" },
        ];

        return NextResponse.json(mockWatches.slice(0, 4));
    }
}
