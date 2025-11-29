"use client";

import Link from "next/link"
import { ShoppingBag, Search, Menu, User, LogOut, LayoutDashboard } from "lucide-react"
import { Button } from "./button"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { useCart } from "@/context/cart-context"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

export function Navbar() {
    const [user, setUser] = useState<{ name: string } | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { itemCount } = useCart();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white dark:bg-black/50 backdrop-blur-md transition-colors duration-300">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tighter text-black dark:text-white">
                    {mounted ? (
                        <Image
                            src={theme === 'dark' ? "/images/logoW2D.png" : "/images/logoW2D.png"}
                            alt="Logo"
                            width={50}
                            height={50}
                            className="object-contain"
                        />
                    ) : (
                        <div className="w-[50px] h-[50px]" />
                    )}
                    <span className="font-bold font-serif">Watch2Do</span>
                </Link>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF]">
                    <Link href="/" className="hover:text-[#D4AF37] transition-colors">Inicio</Link>
                    <Link href="/catalog" className="hover:text-[#D4AF37] transition-colors">Catálogo</Link>
                    <Link href="/about" className="hover:text-[#D4AF37] transition-colors">Nosotros</Link>
                    <Link href="/contact" className="hover:text-[#D4AF37] transition-colors">Contacto</Link>
                </nav>

                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-2 text-sm text-[#6B7280] dark:text-[#9CA3AF] transition-colors focus:outline-none"
                            >
                                <User className="h-5 w-5" />
                                <span className="hidden md:inline font-medium hover:text-[#D4AF37] transition-colors">{user.name}</span>
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-black border border-white/10 rounded-md shadow-lg py-1 z-50">
                                    <Link
                                        href="/dashboard"
                                        className="flex items-center px-4 py-2 text-sm text-[#6B7280] dark:text-[#9CA3AF] dark:hover:bg-white/5 hover:bg-black/5 w-full"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        <LayoutDashboard className="h-4 w-4 mr-2" /> Dashboard
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center px-4 py-2 text-sm text-red-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-red-400 dark:hover:text-red-400 w-full text-left"
                                    >
                                        <LogOut className="h-4 w-4 mr-2" /> Cerrar Sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/login">
                            <Button variant="ghost" size="icon" className="text-[#9CA3AF] transition-colors">
                                <User className="h-5 w-5" />
                            </Button>
                        </Link>
                    )}
                    <Link href="/cart">
                        <Button variant="ghost" size="icon" className="relative text-[#9CA3AF] hover:text-[#D4AF37] transition-colors group">
                            <ShoppingBag className="h-5 w-5" />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-black text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    {itemCount}
                                </span>
                            )}
                        </Button>
                    </Link>

                    {mounted && (
                        <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-[#9CA3AF] hover:text-[#D4AF37] transition-colors">
                            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </Button>
                    )}

                    <Button variant="ghost" size="icon" className="md:hidden text-[#9CA3AF] hover:text-[#D4AF37] transition-colors">
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </header>
    )
}
