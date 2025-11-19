"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export function CatalogControls() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
    const [sortValue, setSortValue] = useState(searchParams.get("sort") || "");

    // Sync state with URL params if they change externally
    useEffect(() => {
        setSearchTerm(searchParams.get("q") || "");
        setSortValue(searchParams.get("sort") || "");
    }, [searchParams]);

    // Debounce search term changes
    useEffect(() => {
        const timer = setTimeout(() => {
            const currentQ = searchParams.get("q") || "";
            if (currentQ === searchTerm) return;

            const params = new URLSearchParams(searchParams.toString());
            if (searchTerm) {
                params.set("q", searchTerm);
            } else {
                params.delete("q");
            }
            router.push(`/catalog?${params.toString()}`);
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [searchTerm, router, searchParams]);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSort = e.target.value;
        setSortValue(newSort);
        const params = new URLSearchParams(searchParams.toString());
        if (newSort) {
            params.set("sort", newSort);
        } else {
            params.delete("sort");
        }
        router.push(`/catalog?${params.toString()}`);
    };

    return (
        <div className="w-full max-w-4xl flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 flex items-center">
                <Search className="absolute left-4 h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar productos..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                />
            </div>

            <div className="w-full md:w-48">
                <select
                    value={sortValue}
                    onChange={handleSortChange}
                    className="w-full h-[50px] bg-white/5 border border-white/10 rounded-lg px-4 text-white hover:border-[#D4AF37] focus:outline-none focus:border-primary/50 appearance-none cursor-pointer"
                >
                    <option value="">Ordenar por</option>
                    <option value="price_asc">Precio: Menor a Mayor</option>
                    <option value="price_desc">Precio: Mayor a Menor</option>
                </select>
            </div>
        </div>
    );
}
