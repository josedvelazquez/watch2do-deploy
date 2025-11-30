"use client";

import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Package, LogOut, Loader2, Edit, Save, X, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface OrderItem {
    id: number;
    quantity: number;
    price: string;
    name: string;
    image: string;
}

interface Order {
    id: number;
    total: string;
    status: string;
    created_at: string;
    payment_method: string;
    items: OrderItem[];
}

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ name: "", email: "" });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch User
                const authRes = await fetch("/api/auth/me");
                const authData = await authRes.json();

                if (authData.user) {
                    setUser(authData.user);
                    setEditForm({ name: authData.user.name, email: authData.user.email });

                    // Fetch Orders
                    const ordersRes = await fetch("/api/orders");
                    if (ordersRes.ok) {
                        const ordersData = await ordersRes.json();
                        setOrders(ordersData.orders || []);
                    }
                } else {
                    router.push("/login");
                }
            } catch (error) {
                console.error("Dashboard data fetch error", error);
                router.push("/login");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
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

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
            case 'cancelled': return <AlertCircle className="h-4 w-4 text-red-500" />;
            default: return <Clock className="h-4 w-4 text-gray-500" />;
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'completed': return 'Completado';
            case 'pending': return 'Pendiente';
            case 'cancelled': return 'Cancelado';
            default: return status;
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
                        <h1 className="text-3xl font-bold text-black dark:text-white font-serif">Mi Cuenta</h1>
                        <p className="text-[#9CA3AF] max-w-2xl mx-auto text-[16px] leading-[24px] font-inter">Bienvenido de nuevo, {user.name}</p>
                    </div>
                    <Button onClick={handleLogout} variant="outline" className="border-black/10 dark:border-white/10 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 dark:hover:text-red-500 hover:text-red-500 shadow-sm">
                        <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Profile Card */}
                    <Card className="h-full bg-white dark:bg-zinc-900/50 border-gray-200 dark:border-white/10 shadow-xl dark:shadow-none">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-black dark:text-white flex items-center gap-2">
                                <User className="h-5 w-5 text-[#D4AF37]" /> Perfil
                            </CardTitle>
                            {!isEditing ? (
                                <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)} className="text-[#9CA3AF]">
                                    <Edit className="h-4 w-4" />
                                </Button>
                            ) : (
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="icon" onClick={handleSaveProfile} disabled={isSaving} className="text-green-400 hover:text-green-500">
                                        {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)} className="text-red-400 hover:text-red-500">
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </CardHeader>
                        <CardContent className="space-y-4 pt-4">
                            {isEditing ? (
                                <>
                                    <div className="space-y-2">
                                        <label className="text-sm text-[#9CA3AF]">Nombre</label>
                                        <input
                                            type="text"
                                            value={editForm.name}
                                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                            className="w-full bg-white/5 border border-black/10 rounded px-3 py-2 text-black dark:text-white focus:outline-none focus:border-[#D4AF37]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-[#9CA3AF]">Email</label>
                                        <input
                                            type="email"
                                            value={editForm.email}
                                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                            className="w-full bg-white/5 border border-black/10 rounded px-3 py-2 text-black dark:text-white focus:outline-none focus:border-[#D4AF37]"
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <p className="text-sm text-[#9CA3AF]">Nombre</p>
                                        <p className="text-black dark:text-white font-medium">{user.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#9CA3AF]">Email</p>
                                        <p className="text-black dark:text-white font-medium">{user.email}</p>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Orders Card */}
                    <Card className="h-full bg-white dark:bg-zinc-900/50 border-gray-200 dark:border-white/10 shadow-xl dark:shadow-none md:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-black dark:text-white flex items-center gap-2">
                                <Package className="h-5 w-5 text-[#D4AF37]" /> Mis Pedidos
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {orders.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    <Package className="h-12 w-12 mx-auto mb-4 opacity-20" />
                                    <p>No tienes pedidos recientes.</p>
                                    <Button variant="link" className="text-[#D4AF37]" onClick={() => router.push('/catalog')}>
                                        Explorar Catálogo
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {orders.map((order) => (
                                        <div key={order.id} className="border border-gray-200 dark:border-white/10 rounded-lg p-4 bg-white/5 shadow-lg">
                                            <div className="flex flex-col md:flex-row justify-between pb-5 border-b border-white/5 gap-4">
                                                <div>
                                                    <p className="text-sm text-[#9CA3AF]">Pedido #{order.id}</p>
                                                    <p className="text-xs text-[#9CA3AF]">
                                                        {new Date(order.created_at).toLocaleDateString('es-MX', {
                                                            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                                        })}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-2 text-sm">
                                                        {getStatusIcon(order.status)}
                                                        <span className="capitalize text-[#4A4A4A] dark:text-white">{getStatusText(order.status)}</span>
                                                    </div>
                                                    <p className="font-bold text-[#D4AF37]">
                                                        ${Number(order.total).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-3 pt-4 border-t dark:border-white/10 border-black/20">
                                                {order.items.map((item) => (
                                                    <div key={item.id} className="flex items-center gap-4">
                                                        <div className="relative w-12 h-12 rounded bg-white/5 overflow-hidden flex-shrink-0">
                                                            <Image
                                                                src={item.image}
                                                                alt={item.name}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-sm text-black dark:text-white font-medium line-clamp-1">{item.name}</p>
                                                            <p className="text-xs text-[#9CA3AF]">Cant: {item.quantity}</p>
                                                        </div>
                                                        <p className="text-sm text-[#9CA3AF]">
                                                            ${Number(item.price).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
}
