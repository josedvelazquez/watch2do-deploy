"use client";

import Link from "next/link";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        if (searchParams.get("registered")) {
            setSuccess("Cuenta creada exitosamente. Por favor inicia sesión.");
        }
    }, [searchParams]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Error al iniciar sesión");
            }

            // Force a hard refresh to update Navbar state (since we're using cookies)
            window.location.href = "/";
        } catch (err: any) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    return (
        <main className="flex-1 container mx-auto px-4 py-24 flex items-center justify-center">
            <Card className="w-full max-w-md bg-white/5 dark:bg-zinc-900/50 border-white/10 shadow-xl">
                <CardContent className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-black dark:text-white font-serif mb-2">Bienvenido</h1>
                        <p className="text-[#9CA3AF]">Inicia sesión para continuar</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-md mb-6 text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-500/10 border border-green-500/50 text-green-500 px-4 py-3 rounded-md mb-6 text-sm">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-[#9CA3AF]">Email</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                <input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-black/10 dark:border-white/10 rounded-md py-3 pl-12 pr-4 text-black dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    placeholder="tu@email.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label htmlFor="password" className="text-sm font-medium text-[#9CA3AF]">Contraseña</label>
                                <Link href="#" className="text-xs text-primary hover:underline">¿Olvidaste tu contraseña?</Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                <input
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-black/10 dark:border-white/10 rounded-md py-3 pl-12 pr-4 text-black dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <Button disabled={isLoading} className="w-full text-lg py-6 bg-[#D4AF37] hover:bg-[#B5952F] text-black dark:text-white font-bold disabled:opacity-50">
                            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <><span className="mr-2">Iniciar Sesión</span> <ArrowRight className="h-5 w-5" /></>}
                        </Button>
                    </form>

                    <div className="mt-8 text-center text-sm text-[#9CA3AF]">
                        ¿No tienes una cuenta?{" "}
                        <Link href="/register" className="text-primary hover:underline font-medium">
                            Regístrate aquí
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <Suspense fallback={<div className="flex-1 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
                <LoginForm />
            </Suspense>
            <Footer />
        </div>
    );
}
