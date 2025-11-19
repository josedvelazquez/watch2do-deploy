"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CartContextType {
    itemCount: number;
    updateCartCount: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [itemCount, setItemCount] = useState(0);

    const updateCartCount = async () => {
        try {
            const res = await fetch("/api/cart");
            if (res.ok) {
                const data = await res.json();
                // Calculate total quantity of items
                const count = data.items.reduce((acc: number, item: any) => acc + item.quantity, 0);
                setItemCount(count);
            } else {
                setItemCount(0);
            }
        } catch (error) {
            console.error("Failed to fetch cart count:", error);
            setItemCount(0);
        }
    };

    useEffect(() => {
        updateCartCount();
    }, []);

    return (
        <CartContext.Provider value={{ itemCount, updateCartCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
