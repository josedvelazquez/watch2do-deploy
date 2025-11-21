"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AddToCartButton } from "@/components/ui/add-to-cart-button";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Watch {
    id: number;
    name: string;
    price: number;
    image: string;
    category_name: string;
}

interface RecommendedProductsProps {
    currentItems?: { product_id: number; category_id: number }[];
}

export function RecommendedProducts({ currentItems = [] }: RecommendedProductsProps) {
    const [products, setProducts] = useState<Watch[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const categoryIds = currentItems.map(item => item.category_id).join(",");
                const excludeIds = currentItems.map(item => item.product_id).join(",");

                const params = new URLSearchParams();
                if (categoryIds) params.append("category_ids", categoryIds);
                if (excludeIds) params.append("exclude_ids", excludeIds);

                const res = await fetch(`/api/recommendations?${params.toString()}`);
                if (res.ok) {
                    const data = await res.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error("Failed to fetch recommendations:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendations();
    }, [currentItems]);

    if (isLoading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37]" />
            </div>
        );
    }

    if (products.length === 0) return null;

    return (
        <section className="py-12 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white">También te podría interesar</h2>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => scroll('left')}
                            className="h-8 w-8 rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:text-white"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => scroll('right')}
                            className="h-8 w-8 rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:text-white"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-4 px-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {products.map((watch) => (
                        <div key={watch.id} className="min-w-[280px] md:min-w-[300px] snap-center">
                            <Link href={`/product/${watch.id}`} className="group h-full block">
                                <Card className="border-white/5 bg-white/5 overflow-hidden hover:border-primary/50 transition-colors duration-300 h-full flex flex-col">
                                    <CardContent className="p-0 relative aspect-square">
                                        <Image
                                            src={watch.image}
                                            alt={watch.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </CardContent>
                                    <CardFooter className="flex flex-col items-start p-4 flex-1 justify-between">
                                        <div className="w-full">
                                            <h3 className="text-base font-semibold text-white group-hover:text-primary transition-colors mb-1 truncate">{watch.name}</h3>
                                            <span className="text-primary font-bold block mb-4">${Number(watch.price).toLocaleString()}</span>
                                        </div>
                                        <div className="w-full flex justify-end">
                                            <AddToCartButton productId={watch.id} iconOnly />
                                        </div>
                                    </CardFooter>
                                </Card>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
