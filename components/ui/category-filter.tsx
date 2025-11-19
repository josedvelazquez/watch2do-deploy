"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface Category {
    id: number;
    name: string;
    slug: string;
}

export function CategoryFilter({ categories }: { categories: Category[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get("category");

    const handleCategoryChange = (slug: string | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (slug) {
            params.set("category", slug);
        } else {
            params.delete("category");
        }
        router.push(`/catalog?${params.toString()}`);
    };

    return (
        <div className="flex flex-wrap justify-center gap-3">
            <button
                onClick={() => handleCategoryChange(null)}
                className={cn(
                    "px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                    !currentCategory
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                )}
            >
                Todas
            </button>
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.slug)}
                    className={cn(
                        "px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                        currentCategory === cat.slug
                            ? "bg-primary/10 border-primary text-primary"
                            : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                    )}
                >
                    {cat.name}
                </button>
            ))}
        </div>
    );
}
