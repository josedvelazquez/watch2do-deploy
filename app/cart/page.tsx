"use client";

import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2, Minus, Plus, ArrowLeft } from "lucide-react";
import { Newsletter } from "@/components/ui/newsletter";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";

interface CartItem {
    id: number;
    product_id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    category_id: number;
}

export default function CartPage() {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { updateCartCount } = useCart();

    const fetchCart = async () => {
        try {
            const res = await fetch("/api/cart");
            if (res.status === 401) {
                router.push("/login");
                return;
            }
            const data = await res.json();
            setItems(data.items || []);
        } catch (error) {
            console.error("Error fetching cart", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [router]);

    const updateQuantity = async (productId: number, quantity: number) => {
        // Optimistic update
        setItems(prev => prev.map(item =>
            item.product_id === productId ? { ...item, quantity: item.quantity + quantity } : item
        ));

        await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId, quantity })
        });
        await updateCartCount();
        fetchCart(); // Re-fetch to ensure sync
    };

    const removeItem = async (id: number) => {
        setItems(prev => prev.filter(item => item.id !== id));
        await fetch(`/api/cart?id=${id}`, { method: "DELETE" });
        await updateCartCount();
        fetchCart();
    };

    const subtotal = items.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-12">
                <Link href="/catalog" className="inline-flex items-center text-gray-400 hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Seguir comprando
                </Link>
                <h1 className="text-4xl font-bold text-white mb-8">Tu Carrito de Compras</h1>

                {items.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg mb-6">Tu carrito está vacío.</p>
                        <Button asChild className="bg-[#D4AF37] hover:bg-[#B59530] text-black">
                            <Link href="/catalog">Explorar Catálogo</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-6 p-6 bg-white/5 rounded-lg border border-white/10">
                                    <div className="relative w-24 h-24 bg-white/5 rounded overflow-hidden flex-shrink-0">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1 flex justify-between">
                                        <div>
                                            <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                                            <p className="text-gray-400 text-sm">ID: {item.product_id}</p>
                                            <div className="mt-4 flex items-center gap-4">
                                                <div className="flex items-center border border-white/10 rounded">
                                                    <button
                                                        onClick={() => updateQuantity(item.product_id, -1)}
                                                        disabled={item.quantity <= 1}
                                                        className="px-3 py-1 text-gray-400 hover:text-white disabled:opacity-50"
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </button>
                                                    <span className="px-2 text-white min-w-[1.5rem] text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.product_id, 1)}
                                                        className="px-3 py-1 text-gray-400 hover:text-white"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-between items-end">
                                            <span className="text-lg font-bold text-white">${Number(item.price).toLocaleString()}</span>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-gray-500 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white/5 rounded-lg border border-white/10 p-6 sticky top-24">
                                <h2 className="text-xl font-bold text-white mb-6">Resumen del Pedido</h2>
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-400">
                                        <span>Subtotal</span>
                                        <span className="text-white">${subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>Envío</span>
                                        <span className="text-white">Gratis</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>Impuestos (8%)</span>
                                        <span className="text-white">${tax.toLocaleString()}</span>
                                    </div>
                                    <div className="border-t border-white/10 pt-4 flex justify-between text-lg font-bold text-white">
                                        <span>Total</span>
                                        <span className="text-[#D4AF37]">${total.toLocaleString()}</span>
                                    </div>
                                </div>
                                <Button className="w-full h-12 text-lg bg-[#D4AF37] hover:bg-[#B59530] text-black" asChild>
                                    <Link href="/checkout">Proceder al Pago</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Newsletter />
            <Footer />
        </div>
    );
}
