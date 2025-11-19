import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Newsletter } from "@/components/ui/newsletter";
import { CategoryFilter } from "@/components/ui/category-filter";
import { AddToCartButton } from "@/components/ui/add-to-cart-button";
import { Search } from "lucide-react";
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

async function getWatches(categorySlug?: string) {
    try {
        let query = `
            SELECT w.*, c.name as category_name, c.slug as category_slug 
            FROM watches w 
            LEFT JOIN categories c ON w.category_id = c.id
        `;
        const params: any[] = [];

        if (categorySlug) {
            query += " WHERE c.slug = ?";
            params.push(categorySlug);
        }

        const [rows] = await pool.query<Watch[]>(query, params);
        return rows;
    } catch (error) {
        console.warn("Database connection failed, using mock data:", error);
        console.log("Using mock data");
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

export default async function CatalogPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
    const { category } = await searchParams;
    const watches = await getWatches(category);
    const categories = await getCategories();

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-12">
                {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-16 space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight font-serif">
                            Tu Tiempo, Tu Estilo
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                            Encuentra el proximo reloj que se ajuste a tu persona.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="w-full max-w-2xl relative">
                        <div className="relative flex items-center">
                            <Search className="absolute left-4 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                className="w-full bg-white/5 border border-white/10 rounded-l-lg py-3 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                            />
                            <Button className="rounded-l-none h-[50px] px-8 text-lg font-medium bg-[#D4AF37] hover:bg-[#B5952F] text-black">
                                Buscar
                            </Button>
                        </div>
                    </div>

                    {/* Category Pills */}
                    <div className="w-full overflow-x-auto pb-4">
                        <Suspense fallback={<div className="h-10 w-full bg-white/5 animate-pulse rounded-full" />}>
                            <CategoryFilter categories={categories} />
                        </Suspense>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {watches.map((watch) => (
                        <Link key={watch.id} href={`/product/${watch.id}`} className="group h-full block">
                            <Card className="border-white/5 bg-white/5 overflow-hidden hover:border-primary/50 transition-colors duration-300 h-full flex flex-col">
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
                                            <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">{watch.name}</h3>
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
            </main>

            <Newsletter />
            <Footer />
        </div>
    );
}
