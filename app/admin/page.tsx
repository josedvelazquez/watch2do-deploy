"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ShoppingBag, DollarSign, Package, TrendingUp } from "lucide-react";

interface Stats {
    users: number;
    orders: number;
    revenue: number;
    products: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/stats")
            .then((res) => res.json())
            .then((data) => {
                setStats(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Falló al obtener estadísticas", err);
                setLoading(false);
            });
    }, []);

    const statCards = [
        {
            title: "Ingresos Totales",
            value: stats ? `$${Number(stats.revenue).toLocaleString('es-MX', { minimumFractionDigits: 2 })}` : "-",
            icon: DollarSign,
            color: "text-green-500",
        },
        {
            title: "Usuarios Registrados",
            value: stats?.users || "-",
            icon: Users,
            color: "text-blue-500",
        },
        {
            title: "Pedidos Totales",
            value: stats?.orders || "-",
            icon: Package,
            color: "text-purple-500",
        },
        {
            title: "Productos Activos",
            value: stats?.products || "-",
            icon: ShoppingBag,
            color: "text-orange-500",
        },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h2 className="text-3xl font-serif font-bold text-white mb-2">Dashboard</h2>
                <p className="text-gray-400">Resumen general de la tienda.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <Card key={index} className="bg-zinc-900 border-white/5">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">
                                {loading ? (
                                    <div className="h-8 w-24 bg-white/10 animate-pulse rounded"></div>
                                ) : (
                                    stat.value
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Placeholder for Recent Activity or Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-zinc-900 border-white/5">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-[#D4AF37]" /> Actividad Reciente
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-500 text-sm">No hay actividad reciente para mostrar.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
