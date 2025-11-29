import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Newsletter } from "@/components/ui/newsletter";
import { CategoryFilter } from "@/components/ui/category-filter";
import { AddToCartButton } from "@/components/ui/add-to-cart-button";
import { CatalogControls } from "@/components/ui/catalog-controls";
import { Suspense } from "react";

import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface Watch extends RowDataPacket {
    id: number;
    name: string;
    price: number;
    image: string;
    category_name: string;
    category_slug: string;
}

interface Category extends RowDataPacket {
    id: number;
    name: string;
    slug: string;
}

async function getWatches(categorySlug?: string, search?: string, sort?: string) {
    try {
        let query = `
            SELECT w.*, c.name as category_name, c.slug as category_slug 
            FROM watches w 
            LEFT JOIN categories c ON w.category_id = c.id
        `;
        const params: any[] = [];
        const conditions: string[] = [];

        if (categorySlug) {
            conditions.push("c.slug = ?");
            params.push(categorySlug);
        }

        if (search) {
            conditions.push("(w.name LIKE ? OR w.description LIKE ?)");
            params.push(`%${search}%`, `%${search}%`);
        }

        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        if (sort === 'price_asc') {
            query += " ORDER BY w.price ASC";
        } else if (sort === 'price_desc') {
            query += " ORDER BY w.price DESC";
        } else {
            query += " ORDER BY w.id DESC"; // Default sort
        }

        const [rows] = await pool.query<Watch[]>(query, params);
        return rows;
    } catch (error) {
        console.warn("conexión fallida, usando datos de prueba:", error);
        console.log("usando datos de prueba");
        let watches = [
            { id: 1, name: "Chronos Silver", price: 1299, image: "/images/watch1.png", category_name: "Men", category_slug: "men" },
            { id: 2, name: "Midnight Leather", price: 899, image: "/images/watch2.png", category_name: "Men", category_slug: "men" },
            { id: 3, name: "Rose Elegance", price: 1499, image: "/images/watch3.png", category_name: "Women", category_slug: "women" },
            { id: 4, name: "Aviator Gold", price: 2100, image: "/images/hero.png", category_name: "Men", category_slug: "men" },
            { id: 5, name: "Diver Pro", price: 1050, image: "/images/watch1.png", category_name: "Men", category_slug: "men" },
            { id: 6, name: "Classic Minimalist", price: 750, image: "/images/watch2.png", category_name: "Unisex", category_slug: "unisex" },
            { id: 7, name: "Royal Oak Style", price: 3500, image: "/images/watch3.png", category_name: "Men", category_slug: "men" },
            { id: 8, name: "Ceramic White", price: 1800, image: "/images/watch1.png", category_name: "Women", category_slug: "women" },
        ] as Watch[];

        if (categorySlug) {
            watches = watches.filter(w => w.category_slug === categorySlug);
        }
        if (search) {
            const lowerSearch = search.toLowerCase();
            watches = watches.filter(w => w.name.toLowerCase().includes(lowerSearch));
        }
        if (sort === 'price_asc') {
            watches.sort((a, b) => a.price - b.price);
        } else if (sort === 'price_desc') {
            watches.sort((a, b) => b.price - a.price);
        }

        return watches;
    }
}

async function getCategories() {
    try {
        const [rows] = await pool.query<Category[]>("SELECT * FROM categories");
        return rows;
    } catch (error) {
        return [
            { id: 1, name: "Men", slug: "men" },
            { id: 2, name: "Women", slug: "women" },
            { id: 3, name: "Unisex", slug: "unisex" },
        ] as Category[];
    }
}

export default async function CatalogPage({ searchParams }: { searchParams: Promise<{ category?: string, q?: string, sort?: string }> }) {
    const { category, q, sort } = await searchParams;
    const watches = await getWatches(category, q, sort);
    const categories = await getCategories();

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-12">
                {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-16 space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-6xl font-bold text-black dark:text-white tracking-tight font-serif">
                            Tu Tiempo, Tu Estilo
                        </h1>
                        <p className="text-[#9CA3AF] text-lg md:text-xl max-w-2xl mx-auto">
                            Encuentra el proximo reloj que se ajuste a tu persona.
                        </p>
                    </div>

                    {/* Search and Sort Controls */}
                    <CatalogControls />

                    {/* Category Pills */}
                    <div className="w-full overflow-x-auto pb-4">
                        <Suspense fallback={<div className="h-10 w-full bg-white/5 animate-pulse rounded-full" />}>
                            <CategoryFilter categories={categories} />
                        </Suspense>
                    </div>
                </div>

                {/* Products Grid */}
                {watches.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-[#9CA3AF] text-lg mb-6">No se encontraron productos que coincidan con tu búsqueda.</p>
                        <Button asChild className="bg-[#D4AF37] hover:bg-[#B59530] text-black">
                            <Link href="/catalog">Ver todos los productos</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {watches.map((watch) => (
                            <Link key={watch.id} href={`/product/${watch.id}`} className="group h-full block">
                                <Card className="border-white/10 bg-white/5 overflow-hidden hover:border-primary/50 hover:shadow-xl duration-300 h-full flex flex-col">
                                    <CardContent className="p-0 relative aspect-square">
                                        <Image
                                            src={watch.image}
                                            alt={watch.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </CardContent>
                                    <CardFooter className="flex flex-col items-start p-6 flex-1 justify-between">
                                        <div className="w-full">
                                            <div className="flex justify-between w-full items-center mb-2">
                                                <h3 className="text-lg font-semibold text-black dark:text-white group-hover:text-primary transition-colors">{watch.name}</h3>
                                            </div>
                                            <span className="text-primary font-bold block mb-4">${Number(watch.price).toLocaleString()}</span>
                                        </div>
                                        <div className="w-full flex justify-end">
                                            <AddToCartButton productId={watch.id} iconOnly />
                                        </div>
                                    </CardFooter>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </main>

            <Newsletter />
            <Footer />
        </div>
    );
}
