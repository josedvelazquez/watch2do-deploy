"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, Settings, LogOut, Package, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface User {
    role: number;
    name: string;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        fetch("/api/auth/me")
            .then((res) => res.json())
            .then((data) => {
                if (!data.user || data.user.role !== 1) {
                    router.push("/login?error=unauthorized");
                } else {
                    setUser(data.user);
                }
                setLoading(false);
            })
            .catch(() => router.push("/login"));
    }, [router]);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/login");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#D4AF37]"></div>
            </div>
        );
    }

    if (!user) return null;

    const navItems = [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/users", label: "Usuarios", icon: Users },
        { href: "/admin/products", label: "Productos", icon: ShoppingBag }, // Placeholder for future
        { href: "/admin/orders", label: "Pedidos", icon: Package }, // Placeholder for future
    ];

    return (
        <div className="min-h-screen bg-zinc-950 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-zinc-900 border-r border-white/5 flex flex-col fixed h-full z-10">
                <div className="p-6 border-b border-white/5">
                    <h1 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                        <span className="text-[#D4AF37]">Admin</span> Watch2Do
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? "bg-[#D4AF37]/20 text-[#D4AF37]"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <item.icon className="h-5 w-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-black font-bold">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium text-white truncate">{user.name}</p>
                            <p className="text-xs text-gray-400 truncate">Administrador</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        onClick={handleLogout}
                    >
                        <LogOut className="h-4 w-4 mr-2" /> Cerrar Sesión
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
