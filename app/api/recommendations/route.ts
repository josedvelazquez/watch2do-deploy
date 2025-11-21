import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface Watch extends RowDataPacket {
    id: number;
    name: string;
    price: number;
    image: string;
    category_name: string;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const categoryIds = searchParams.get("category_ids")?.split(",").map(Number) || [];
    const excludeIds = searchParams.get("exclude_ids")?.split(",").map(Number) || [];

    try {
        let query = `
            SELECT w.*, c.name as category_name 
            FROM watches w 
            LEFT JOIN categories c ON w.category_id = c.id 
            WHERE 1=1
        `;
        const params: any[] = [];

        // If we have categories, prioritize them, but for now let's just get random or specific ones
        // If we have categories, we could filter by them OR just get random ones if none match
        if (categoryIds.length > 0) {
            query += ` AND w.category_id IN (?)`;
            params.push(categoryIds);
        }

        if (excludeIds.length > 0) {
            query += ` AND w.id NOT IN (?)`;
            params.push(excludeIds);
        }

        query += ` ORDER BY RAND() LIMIT 4`;

        const [rows] = await pool.query<Watch[]>(query, params);

        // If we didn't get enough recommendations (e.g. filtered too much), try getting random ones excluding the current items
        if (rows.length < 4) {
            let fallbackQuery = `
                SELECT w.*, c.name as category_name 
                FROM watches w 
                LEFT JOIN categories c ON w.category_id = c.id 
                WHERE 1=1
            `;
            const fallbackParams: any[] = [];

            if (excludeIds.length > 0) {
                fallbackQuery += ` AND w.id NOT IN (?)`;
                fallbackParams.push(excludeIds);
            }

            // Exclude already found rows
            const foundIds = rows.map(r => r.id);
            if (foundIds.length > 0) {
                fallbackQuery += ` AND w.id NOT IN (?)`;
                fallbackParams.push(foundIds);
            }

            fallbackQuery += ` ORDER BY RAND() LIMIT ?`;
            fallbackParams.push(4 - rows.length);

            const [fallbackRows] = await pool.query<Watch[]>(fallbackQuery, fallbackParams);
            rows.push(...fallbackRows);
        }

        return NextResponse.json(rows);

    } catch (error) {
        console.warn("Database connection failed or query error, using mock data:", error);

        // Mock data fallback
        const mockWatches = [
            { id: 101, name: "Chronos Silver", price: 1299, image: "/images/watch1.png", category_name: "Men" },
            { id: 102, name: "Midnight Leather", price: 899, image: "/images/watch2.png", category_name: "Men" },
            { id: 103, name: "Rose Elegance", price: 1499, image: "/images/watch3.png", category_name: "Women" },
            { id: 104, name: "Aviator Gold", price: 2100, image: "/images/hero.png", category_name: "Men" },
            { id: 105, name: "Ocean Master", price: 1850, image: "/images/watch1.png", category_name: "Men" },
        ];

        // Filter out excluded IDs from mock data
        const filteredMock = mockWatches.filter(w => !excludeIds.includes(w.id)).slice(0, 4);

        return NextResponse.json(filteredMock);
    }
}
