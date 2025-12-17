import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Truck, Shield } from "lucide-react";
import { Newsletter } from "@/components/ui/newsletter";
import { AddToCartButton } from "@/components/ui/add-to-cart-button";

import { supabase } from "@/lib/supabase";

interface Watch {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    category_name: string;
}

async function getWatch(id: string) {
    const { data, error } = await supabase
        .from('watches')
        .select(`
            *,
            categories (
                name
            )
        `)
        .eq('id', id)
        .single();

    if (error) {
        console.warn("Supabase query failed, using mock data:", error);
        const watches = [
            { id: 1, name: "Chronos Silver", price: 1299, image: "/images/watch1.png", description: "A masterpiece of engineering, the Chronos Silver features a precision automatic movement housed in a surgical-grade stainless steel case.", category_name: "Men" },
            { id: 2, name: "Midnight Leather", price: 899, image: "/images/watch2.png", description: "Elegant and understated, the Midnight Leather combines a minimalist black dial with a premium genuine leather strap for ultimate comfort.", category_name: "Men" },
            { id: 3, name: "Rose Elegance", price: 1499, image: "/images/watch3.png", description: "Radiating sophistication, the Rose Elegance features 18k rose gold plating and a mother-of-pearl dial, perfect for formal occasions.", category_name: "Women" },
            { id: 4, name: "Aviator Gold", price: 2100, image: "/images/hero.png", description: "Inspired by aviation history, this timepiece offers dual-time functionality and a rugged yet luxurious gold finish.", category_name: "Men" },
            { id: 5, name: "Diver Pro", price: 1050, image: "/images/watch1.png", description: "Built for the depths, the Diver Pro is water-resistant to 300m and features a rotating bezel and luminescent markers.", category_name: "Men" },
            { id: 6, name: "Classic Minimalist", price: 750, image: "/images/watch2.png", description: "Less is more. The Classic Minimalist strips away the unnecessary to reveal the pure beauty of timekeeping.", category_name: "Unisex" },
            { id: 7, name: "Royal Oak Style", price: 3500, image: "/images/watch3.png", description: "An homage to iconic design, featuring an octagonal bezel and integrated bracelet for a sporty yet elegant look.", category_name: "Men" },
            { id: 8, name: "Ceramic White", price: 1800, image: "/images/watch1.png", description: "Crafted from high-tech ceramic, this watch is scratch-resistant, hypoallergenic, and incredibly lightweight.", category_name: "Women" },
        ] as Watch[];
        return watches.find(w => w.id.toString() === id) || watches[0];
    }

    return {
        ...data,
        category_name: data.categories?.name
    } as Watch;
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const watch = await getWatch(id);

    if (!watch) {
        return <div className="text-white text-center py-20">Producto no encontrado</div>;
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-12">
                <Link href="/catalog" className="inline-flex items-center text-[#9CA3AF] dark:hover:text-primary hover:text-black mb-8 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Catalogo
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="relative aspect-square bg-white/5 rounded-lg overflow-hidden border border-white/10">
                            <Image
                                src={watch.image}
                                alt={watch.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="relative aspect-square bg-white/5 rounded cursor-pointer hover:border-primary border border-transparent transition-colors">
                                    <Image
                                        src={watch.image}
                                        alt={`View ${i}`}
                                        fill
                                        className="object-cover opacity-70 hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-[42px] font-bold text-black dark:text-white mb-2 font-serif">{watch.name}</h1>
                            <div className="flex items-center gap-4">
                                <span className="text-2xl text-primary font-bold">${Number(watch.price).toLocaleString()}</span>
                                <div className="flex items-center text-yellow-500 text-sm">
                                    <Star className="fill-current h-4 w-4" />
                                    <Star className="fill-current h-4 w-4" />
                                    <Star className="fill-current h-4 w-4" />
                                    <Star className="fill-current h-4 w-4" />
                                    <Star className="fill-current h-4 w-4" />
                                    <span className="text-[#6B7280] ml-2">(24 reseñas)</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-[#9CA3AF] max-w-2xl mx-auto text-[16px] leading-[24px] font-inter">
                            {watch.description}
                        </p>

                        <div className="space-y-4 pt-4 border-t dark:border-white/10 border-black/20">
                            <div className="flex items-center gap-3 text-sm text-[#6B7280]">
                                <Truck className="h-5 w-5 text-primary" />
                                <span>Envío asegurado gratuito a todo el mundo</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-[#6B7280]">
                                <Shield className="h-5 w-5 text-primary" />
                                <span>Garantía internacional de 5 años</span>
                            </div>
                        </div>

                        <div className="pt-8">
                            <AddToCartButton productId={watch.id} />
                        </div>
                    </div>
                </div>
            </main>

            <Newsletter />
            <Footer />
        </div>
    );
}
