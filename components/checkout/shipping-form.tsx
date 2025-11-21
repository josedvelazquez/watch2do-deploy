"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ShippingFormProps {
    onContinue: () => void;
}

export function ShippingForm({ onContinue }: ShippingFormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onContinue();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
                <h2 className="text-2xl font-serif font-bold text-white">Información de Envío</h2>
                <p className="text-muted-foreground">Ingresa los detalles de destino para tu pedido.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input id="firstName" className="bg-white/5 border-white/10" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input id="lastName" className="bg-white/5 border-white/10" required />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" className="bg-white/5 border-white/10" required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input id="address" className="bg-white/5 border-white/10" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="city">Ciudad</Label>
                    <Input id="city" className="bg-white/5 border-white/10" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="zip">Código Postal</Label>
                    <Input id="zip" className="bg-white/5 border-white/10" required />
                </div>
            </div>

            <div className="pt-4">
                <Button
                    type="submit"
                    className="w-full h-12 text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                >
                    Continuar al Pago
                </Button>
            </div>
        </form>
    );
}
