"use client";

import Link from "next/link"
import { ShoppingBag, Search, Menu, User, LogOut, LayoutDashboard } from "lucide-react"
import { Button } from "./button"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

export function Navbar() {
    const [user, setUser] = useState<{ name: string } | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch("/api/auth/me")
            .then(res => res.json())
            .then(data => {
                if (data.user) {
                    setUser(data.user);
                }
            })
            .catch(err => console.error("Failed to fetch user:", err));
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/login";
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tighter text-white">
                    <Image src="/images/logoW2D.png" alt="Logo" width={50} height={50} />
                    <span className="font-bold text-white font-serif">Watch2Do</span>
                </Link>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
                    <Link href="/" className="hover:text-[#D4AF37] transition-colors">Inicio</Link>
                    <Link href="/catalog" className="hover:text-[#D4AF37] transition-colors">Catálogo</Link>
                    <Link href="/contact" className="hover:text-[#D4AF37] transition-colors">Contacto</Link>
                </nav>

                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-2 text-sm text-white hover:text-[#D4AF37] transition-colors focus:outline-none"
                            >
                                <User className="h-5 w-5" />
                                <span className="hidden md:inline font-medium">{user.name}</span>
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-white/10 rounded-md shadow-lg py-1 z-50">
                                    <Link
                                        href="/dashboard"
                                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white w-full"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        <LayoutDashboard className="h-4 w-4 mr-2" /> Dashboard
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center px-4 py-2 text-sm text-red-400 hover:bg-white/5 hover:text-red-300 w-full text-left"
                                    >
                                        <LogOut className="h-4 w-4 mr-2" /> Cerrar Sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/login">
                            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                                <User className="h-5 w-5" />
                            </Button>
                        </Link>
                    )}
                    <Link href="/cart">
                        <Button variant="ghost" size="icon" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                            <ShoppingBag className="h-5 w-5" />
                        </Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="md:hidden text-gray-300">
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </header>
    )
}
