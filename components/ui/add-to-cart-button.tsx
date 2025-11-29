"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/cart-context";

interface AddToCartButtonProps {
    productId: number;
    className?: string;
    iconOnly?: boolean;
}

export function AddToCartButton({ productId, className, iconOnly = false }: AddToCartButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { updateCartCount } = useCart();
    const router = useRouter();

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation if inside a Link
        e.stopPropagation(); // Stop event bubbling

        setIsLoading(true);
        try {
            const res = await fetch("/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId })
            });

            if (res.status === 401) {
                router.push("/login");
                return;
            }

            if (res.ok) {
                await updateCartCount();
                router.push("/cart");
                router.refresh();
            }
        } catch (error) {
            console.error("Failed to add to cart", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (iconOnly) {
        return (
            <Button
                size="icon"
                variant="ghost"
                className={cn("rounded-full h-10 w-10 bg-[#D4AF37]/80 hover:bg-[#D4AF37]/80 hover:text-white text-black dark:hover:text-black dark:text-white transition-colors", className)}
                onClick={handleAddToCart}
                disabled={isLoading}
            >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" />}
            </Button>
        );
    }

    return (
        <Button
            size="lg"
            className={cn("w-full md:w-auto px-12 text-lg h-14 dark:hover:text-white dark:text-black", className)}
            onClick={handleAddToCart}
            disabled={isLoading}
        >
            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <ShoppingCart className="mr-2 h-5 w-5" />}
            Agregar al carrito
        </Button>
    );
}
