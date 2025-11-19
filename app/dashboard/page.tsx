"use client";

import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Package, LogOut, Loader2, Edit, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ name: "", email: "" });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetch("/api/auth/me")
            .then(res => res.json())
            .then(data => {
                if (data.user) {
                    setUser(data.user);
                    setEditForm({ name: data.user.name, email: data.user.email });
                } else {
                    router.push("/login");
                }
            })
            .catch(() => router.push("/login"))
            .finally(() => setIsLoading(false));
    }, [router]);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/login";
    };

    const handleSaveProfile = async () => {
        setIsSaving(true);
        try {
            const res = await fetch("/api/auth/me", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editForm)
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
                setIsEditing(false);
            }
        } catch (error) {
            console.error("Failed to update profile", error);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37]" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white font-serif">Mi Cuenta</h1>
                        <p className="text-gray-400">Bienvenido de nuevo, {user.name}</p>
                    </div>
                    <Button onClick={handleLogout} variant="outline" className="border-white/10 text-white hover:bg-white/5 hover:text-red-400">
                        <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Profile Card */}
                    <Card className="bg-zinc-900/50 border-white/10">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-white flex items-center gap-2">
                                <User className="h-5 w-5 text-[#D4AF37]" /> Perfil
                            </CardTitle>
                            {!isEditing ? (
                                <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)} className="text-gray-400 hover:text-white">
                                    <Edit className="h-4 w-4" />
                                </Button>
                            ) : (
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="icon" onClick={handleSaveProfile} disabled={isSaving} className="text-green-400 hover:text-green-300">
                                        {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)} className="text-red-400 hover:text-red-300">
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </CardHeader>
                        <CardContent className="space-y-4 pt-4">
                            {isEditing ? (
                                <>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-500">Nombre</label>
                                        <input
                                            type="text"
                                            value={editForm.name}
                                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-500">Email</label>
                                        <input
                                            type="email"
                                            value={editForm.email}
                                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <p className="text-sm text-gray-500">Nombre</p>
                                        <p className="text-white font-medium">{user.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="text-white font-medium">{user.email}</p>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Orders Card (Placeholder) */}
                    <Card className="bg-zinc-900/50 border-white/10 md:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Package className="h-5 w-5 text-[#D4AF37]" /> Mis Pedidos
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-12 text-gray-500">
                                <Package className="h-12 w-12 mx-auto mb-4 opacity-20" />
                                <p>No tienes pedidos recientes.</p>
                                <Button variant="link" className="text-[#D4AF37]" onClick={() => router.push('/catalog')}>
                                    Explorar Catálogo
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
}
